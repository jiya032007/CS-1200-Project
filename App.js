import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';


export default function App() {
  const [fontsLoaded] = useFonts({
    MoiraiOne: require('./assets/fonts/MoiraiOne-Regular.ttf'),
    MochiyPopOne: require('./assets/fonts/MochiyPopOne-Regular.ttf'),
  });


  const [joinCode, setJoinCode] = useState('');
  const [screen, setScreen] = useState('join'); // 'join' | 'waiting' | 'home' | 'aiWaiting' | 'aiResponse'


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


        <View style={styles.tabBar}>
          <Ionicons name="home-outline" size={24} color="#0077FF" />
          <Ionicons name="people-outline" size={24} color="#0077FF" />
          <Ionicons name="notifications-outline" size={24} color="#0077FF" />
          <Ionicons name="menu-outline" size={24} color="#0077FF" />
        </View>
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
                <Text style={[styles.title, styles.titleOutline]}>AI Decision Maker</Text>
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


        <View style={styles.tabBar}>
          <Ionicons name="home-outline" size={24} color="#0077FF" />
          <Ionicons name="people-outline" size={24} color="#0077FF" />
          <Ionicons name="notifications-outline" size={24} color="#0077FF" />
          <Ionicons name="menu-outline" size={24} color="#0077FF" />
        </View>
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


        <View style={styles.tabBar}>
          <Ionicons name="home-outline" size={24} color="#0077FF" />
          <Ionicons name="people-outline" size={24} color="#0077FF" />
          <Ionicons name="notifications-outline" size={24} color="#0077FF" />
          <Ionicons name="menu-outline" size={24} color="#0077FF" />
        </View>
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


        <View style={styles.tabBar}>
          <Ionicons name="home-outline" size={24} color="#0077FF" />
          <Ionicons name="people-outline" size={24} color="#0077FF" />
          <Ionicons name="notifications-outline" size={24} color="#0077FF" />
          <Ionicons name="menu-outline" size={24} color="#0077FF" />
        </View>
      </SafeAreaView>
    );
  }


  // Join screen
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

    <View style={styles.tabBar}>
      <Ionicons name="home-outline" size={24} color="#0077FF" />
      <Ionicons name="people-outline" size={24} color="#0077FF" />
      <Ionicons name="notifications-outline" size={24} color="#0077FF" />
      <Ionicons name="menu-outline" size={24} color="#0077FF" />
    </View>
  </SafeAreaView>
);
}




