import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import styles from './styles';


export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

function MainApp() {
  const { theme, setThemeName } = useTheme();
  const [fontsLoaded] = useFonts({
    MoiraiOne: require('./assets/fonts/MoiraiOne-Regular.ttf'),
    MochiyPopOne: require('./assets/fonts/MochiyPopOne-Regular.ttf'),
  });


  const [joinCode, setJoinCode] = useState('');
  const [screen, setScreen] = useState('join'); // 'join' | 'waiting' | 'home' | 'aiWaiting' | 'aiResponse'
  const [themeModalVisible, setThemeModalVisible] = useState(false);


  const [customQuestion, setCustomQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [responses, setResponses] = useState([]);


  const categories = ['School', 'Events', 'Sports', 'Food'];
  const questions = {
    School: ['What subject is hardest?', 'How do I study better?', 'Should I drop a class?'],
    Events: ['Should I go to the party?', 'Is this event worth attending?', 'Will it be fun?'],
    Sports: ['Should I join the team?', 'Is this sport right for me?', 'How do I improve?'],
    Food: ['What should I eat?', 'Is this healthy?', 'Should I try something new?'],
  };


  const handleJoin = () => {
    setScreen('waiting');
    setTimeout(() => {
      setScreen('home');
    }, 3000);
  };


  if (!fontsLoaded) {
    return (
      <View style={styles.loadingScreen}>
        <View style={{ position: 'relative' }}>
          <Text style={[styles.loadingTitle, styles.loadingOutline]}>AI Decision Maker</Text>
        </View>
      </View>
    );
  }


  // Waiting screen
  if (screen === 'waiting') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#001B58" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerWrap}>
            <View style={styles.titleContainer}>
              <View style={{ position: 'relative' }}>
                <Text style={[styles.title, styles.titleOutline]}>AI Decision Maker</Text>
              </View>
            </View>
            <Text style={styles.sessionCode}>Session Code: {joinCode}</Text>
          </View>


          <View style={styles.waitingContainer}>
            <Text style={styles.waitingText}>Waiting for admin to start session.</Text>
            <ActivityIndicator size="large" color="#2A6AFF" style={{ marginTop: 20 }} />
          </View>
        </ScrollView>


        <TabBar setScreen={setScreen} />
      </SafeAreaView>
    );
  }


  // Home screen
  if (screen === 'home') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#001B58" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerWrap}>
            <View style={styles.titleContainer}>
              <View style={{ position: 'relative' }}>
<Text style={[styles.subTitle, styles.titleOutline]}>Home</Text>
              </View>
            </View>
            <Text style={styles.sessionCode}>Session Code: {joinCode}</Text>
          </View>


          {/* Custom Question strip outside the input container */}
          <Text style={[styles.labelStrip, { marginTop: -10 }]}>Custom Question:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={customQuestion}
              onChangeText={setCustomQuestion}
              placeholder="Type your question"
              placeholderTextColor="#0b3597ff"
              multiline={true}
            />
          </View>


          {/* Categories */}
          <Text style={styles.labelStrip}>Choose a Category:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat && styles.categorySelected,
                ]}
                onPress={() => {
                  setSelectedCategory(cat);
                  setSelectedQuestion(''); // reset selected question when category changes
                }}
              >
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>


          {/* Pre-written Questions */}
          {selectedCategory && (
            <>
              <Text style={styles.label}>Pre-written Questions:</Text>
              <View style={styles.inputContainer}>
                <ScrollView style={styles.dropdownScroll}>
                  {questions[selectedCategory].map((q) => (
                    <TouchableOpacity
                      key={q}
                      style={[
                        styles.dropdownItem,
                        selectedQuestion === q && styles.dropdownSelected,
                      ]}
                      onPress={() => setSelectedQuestion(q)}
                    >
                      <Text style={styles.dropdownText}>{q}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          )}


          {/* Submit Button */}
          <TouchableOpacity
            style={styles.joinButton}
            onPress={async () => {
              const finalQuestion = customQuestion || selectedQuestion;


              if (!finalQuestion) {
                alert('Please enter or select a question first!');
                return;
              }


              setSubmittedQuestion(finalQuestion);
              setScreen('aiWaiting');


              try {
                const res = await fetch(
                  'https://router.huggingface.co/hf-inference/gpt2',
                  {
                    method: 'POST',
                    headers: {
                      Authorization: 'Bearer YOUR_HF_TOKEN_HERE',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ inputs: finalQuestion }),
                  }
                );


                const text = await res.text();
                console.log('Raw Hugging Face response:', text);


                let data;
                try {
                  data = JSON.parse(text);
                } catch {
                  throw new Error('Response was not JSON: ' + text);
                }


                const aiText = Array.isArray(data)
                  ? data[0]?.generated_text
                  : data?.generated_text || 'No answer returned.';


                setAiAnswer(aiText);
                setResponses((prev) => [...prev, { user: 'AI', text: aiText }]);
                setScreen('aiResponse');
              } catch (error) {
                console.error('AI error:', error);
                setAiAnswer("Sorry, I couldn't fetch an AI answer.");
                setScreen('aiResponse');
              }
            }}
          >
            <Text style={styles.joinButtonText}>Submit Question</Text>
          </TouchableOpacity>
        </ScrollView>


        <TabBar setScreen={setScreen} />
      </SafeAreaView>
    );
  }


  // AI waiting screen
  if (screen === 'aiWaiting') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#001B58" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerWrap}>
            <View style={styles.titleContainer}>
              <View style={{ position: 'relative' }}>
                <Text style={[styles.title, styles.titleOutline]}>AI Decision Maker</Text>
              </View>
            </View>
            <Text style={styles.sessionCode}>Session Code: {joinCode}</Text>
          </View>


          <Text style={styles.waitingText}>Waiting for AI to respond…</Text>
          <ActivityIndicator size="large" color="#2A6AFF" style={{ marginTop: 20 }} />
        </ScrollView>


        <TabBar setScreen={setScreen} />
      </SafeAreaView>
    );
  }


  // AI response screen
  if (screen === 'aiResponse') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#001B58" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerWrap}>
            <View style={styles.titleContainer}>
              <View style={{ position: 'relative' }}>
                <Text style={[styles.title, styles.titleOutline]}>AI Decision Maker</Text>
              </View>
            </View>
            <Text style={styles.sessionCode}>Session Code: {joinCode}</Text>
          </View>


          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Submission:</Text>
            <Text style={styles.dropdownText}>{submittedQuestion}</Text>
          </View>


          <View style={styles.inputContainer}>
            <Text style={styles.label}>AI Response:</Text>
            <Text style={styles.dropdownText}>
              {aiAnswer || 'Waiting for AI response...'}
            </Text>
          </View>


          <View style={styles.inputContainer}>
            <Text style={styles.label}>Other’s Responses:</Text>
            {responses.length === 0 ? (
              <Text style={styles.dropdownText}>No responses yet.</Text>
            ) : (
              responses.map((r, i) => (
                <Text key={i} style={styles.dropdownText}>
                  {r.user}: {r.text}
                </Text>
              ))
            )}
          </View>


          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => {
              setCustomQuestion('');
              setSelectedCategory(null);
              setSelectedQuestion('');
              setSubmittedQuestion('');
              setScreen('home');
            }}
          >
            <Text style={styles.joinButtonText}>Ask Another Question</Text>
          </TouchableOpacity>
        </ScrollView>


        <TabBar setScreen={setScreen} />
      </SafeAreaView>
    );
  }
  // People screen
if (screen === 'people') {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={theme.statusBarStyle} backgroundColor={theme.primary} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerWrap}>
          <View style={styles.titleContainer}>
            <Text style={styles.subTitle}>Participants</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>People in Session:</Text>

          {/* Bubble participants */}
          <View style={styles.participantBubble}>
            <Text style={styles.participantText}>Alice</Text>
          </View>
          <View style={styles.participantBubble}>
            <Text style={styles.participantText}>Bob</Text>
          </View>
          <View style={styles.participantBubble}>
            <Text style={styles.participantText}>Charlie</Text>
          </View>
        </View>
      </ScrollView>

      <TabBar setScreen={setScreen} />
    </SafeAreaView>
  );
}

// Notifications screen
if (screen === 'notifications') {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#001B58" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerWrap}>
          <View style={styles.titleContainer}>
            <Text style={styles.subTitle}>Notifications</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Recent Notifications:</Text>

          {/* Bubble notifications */}
          <View style={styles.notificationBubble}>
            <Text style={styles.notificationText}>Alice asked a question</Text>
          </View>
          <View style={styles.notificationBubble}>
            <Text style={styles.notificationText}>Bob submitted a response</Text>
          </View>
          <View style={styles.notificationBubble}>
            <Text style={styles.notificationText}>Session will end in 10 minutes</Text>
          </View>
        </View>
      </ScrollView>

      <TabBar setScreen={setScreen} />
    </SafeAreaView>
  );
}
// Menu (Settings) screen
if (screen === 'menu') {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#001B58" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerWrap}>
          <View style={styles.titleContainer}>
            <Text style={styles.subTitle}>Settings</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Options:</Text>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => setThemeModalVisible(true)}>
            <Text style={styles.dropdownText}>Change Theme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Manage Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Privacy Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TabBar setScreen={setScreen} />

      <Modal
        visible={themeModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setThemeModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ width: '80%', borderRadius: 8, padding: 16, backgroundColor: theme.backgroundColor }}>
            <Text style={{ color: theme.textColor, fontSize: 18, marginBottom: 12 }}>Choose a Theme</Text>
            <TouchableOpacity
              style={{ paddingVertical: 10 }}
              onPress={async () => { await setThemeName('default'); setThemeModalVisible(false); }}
            >
              <Text style={{ color: theme.textColor }}>Default</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: 10 }}
              onPress={async () => { await setThemeName('blue'); setThemeModalVisible(false); }}
            >
              <Text style={{ color: theme.textColor }}>Blue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: 10 }}
              onPress={async () => { await setThemeName('green'); setThemeModalVisible(false); }}
            >
              <Text style={{ color: theme.textColor }}>Green</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: 8, marginTop: 8 }}
              onPress={() => setThemeModalVisible(false)}
            >
              <Text style={{ color: theme.textColor, textAlign: 'right' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

  // Join screen
return (
  <SafeAreaView style={styles.safeArea}>
    <StatusBar barStyle="light-content" backgroundColor="#001B58" />
    <KeyboardAvoidingView
      style={styles.keyboardWrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.titleContainer}>
          <View style={{ position: 'relative' }}>
            <Text style={[styles.title, styles.titleOutline]}>AI Decision Maker</Text>
          </View>
        </View>

        {/* Spacer to push the session code input lower on the join page */}
        <View style={styles.joinSpacer} />

        {/* Use the smaller container + input for session code */}
        <View style={styles.inputContainerSmall}>
          <Text style={styles.label}>Enter Session code:</Text>
          <TextInput
            style={styles.inputCode}
            value={joinCode}
            onChangeText={setJoinCode}
            placeholder="Enter code"
            placeholderTextColor="#0b3597ff"
          />
        </View>

        <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
          <Text style={styles.joinButtonText}>Join Session</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>

  </SafeAreaView>
);
}
function TabBar({ setScreen }) {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity onPress={() => setScreen('home')}>
        <Ionicons name="home-outline" size={24} color="#0077FF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('people')}>
        <Ionicons name="people-outline" size={24} color="#0077FF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('notifications')}>
        <Ionicons name="notifications-outline" size={24} color="#0077FF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('menu')}>
        <Ionicons name="menu-outline" size={24} color="#0077FF" />
      </TouchableOpacity>
    </View>
  );
}

