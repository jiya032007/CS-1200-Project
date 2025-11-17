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
import styles, { themedStyles } from './styles';


export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

function MainApp() {
  const { theme, setThemeName } = useTheme();
  const th = themedStyles(theme);
  const [fontsLoaded] = useFonts({
    MoiraiOne: require('./assets/fonts/MoiraiOne-Regular.ttf'),
    MochiyPopOne: require('./assets/fonts/MochiyPopOne-Regular.ttf'),
  });

  const [joinCode, setJoinCode] = useState('');
  const [screen, setScreen] = useState('join'); // navigation state
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
    }, 2000);
  };

  // Fonts not loaded yet
  if (!fontsLoaded) {
    return (
      <View style={[styles.loadingScreen, th.loadingScreen]}>
        <Text style={[styles.loadingTitle, th.title]}>AI Decision Maker</Text>
      </View>
    );
  }

  // Waiting screen
  if (screen === 'waiting') {
    return (
      <SafeAreaView style={[styles.safeArea, th.safeArea]}>
<ThemedStatusBar theme={theme} />
        <ScrollView contentContainerStyle={[styles.scrollContainer, th.scrollContainer]}>
          <View style={styles.headerWrap}>
            <View style={[styles.titleContainer, th.titleContainer]}>
              <Text style={[styles.title, th.title]}>AI Decision Maker</Text>
            </View>
            <Text style={[styles.sessionCode, th.sessionCode]}>Session Code: {joinCode}</Text>
          </View>
          <View style={[styles.waitingContainer, th.waitingContainer]}>
            <Text style={[styles.waitingText, th.waitingText]}>Waiting for admin to start session.</Text>
            <ActivityIndicator size="large" color={theme.textColor} style={{ marginTop: 20 }} />
          </View>
        </ScrollView>
        <TabBar setScreen={setScreen} />
      </SafeAreaView>
    );
  }

  // Home screen
  if (screen === 'home') {
    return (
      <SafeAreaView style={[styles.safeArea, th.safeArea]}>
<ThemedStatusBar theme={theme} />
        <ScrollView contentContainerStyle={[styles.scrollContainer, th.scrollContainer]}>
          <View style={styles.headerWrap}>
            <View style={[styles.titleContainer, th.titleContainer]}>
              <Text style={[styles.subTitle, th.subTitle]}>Home</Text>
            </View>
            <Text style={[styles.sessionCode, th.sessionCode]}>Session Code: {joinCode}</Text>
          </View>

          {/* Custom Question */}
          <Text style={[styles.labelStrip, th.labelStrip]}>Custom Question:</Text>
          <View style={[styles.inputContainer, th.inputContainer]}>
            <TextInput
              style={[styles.input, th.input]}
              value={customQuestion}
              onChangeText={setCustomQuestion}
              placeholder="Type your question"
              placeholderTextColor={theme.textColor}
              multiline
            />
          </View>

          {/* Categories */}
          <Text style={[styles.labelStrip, th.labelStrip]}>Choose a Category:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat && styles.categorySelected,
                  th.categoryButton,
                ]}
                onPress={() => {
                  setSelectedCategory(cat);
                  setSelectedQuestion('');
                }}
              >
                <Text style={[styles.categoryText, th.categoryText]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Pre-written Questions */}
          {selectedCategory && (
            <>
              <Text style={[styles.label, th.label]}>Pre-written Questions:</Text>
              <View style={[styles.inputContainer, th.inputContainer]}>
                <ScrollView style={styles.dropdownScroll}>
                  {questions[selectedCategory].map((q) => (
                    <TouchableOpacity
                      key={q}
                      style={[
                        styles.dropdownItem,
                        selectedQuestion === q && styles.dropdownSelected,
                        th.dropdownItem,
                      ]}
                      onPress={() => setSelectedQuestion(q)}
                    >
                      <Text style={[styles.dropdownText, th.dropdownText]}>{q}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.joinButton, th.joinButton]}
            onPress={() => {
              const finalQuestion = customQuestion || selectedQuestion;
              if (!finalQuestion) {
                alert('Please enter or select a question first!');
                return;
              }
              setSubmittedQuestion(finalQuestion);
              setScreen('aiWaiting');

              // Mock AI response
              setTimeout(() => {
                const aiText = `AI suggests: "${finalQuestion}" might be worth considering carefully.`;
                setAiAnswer(aiText);
                setResponses((prev) => [...prev, { user: 'AI', text: aiText }]);
                setScreen('aiResponse');
              }, 2000);
            }}
          >
            <Text style={[styles.joinButtonText, th.joinButtonText]}>Submit Question</Text>
          </TouchableOpacity>
        </ScrollView>
        <TabBar setScreen={setScreen} />
      </SafeAreaView>
    );
  }

  // AI waiting screen
  if (screen === 'aiWaiting') {
    return (
      <SafeAreaView style={[styles.safeArea, th.safeArea]}>
<ThemedStatusBar theme={theme} />
        <ScrollView contentContainerStyle={[styles.scrollContainer, th.scrollContainer]}>
          <View style={styles.headerWrap}>
            <View style={[styles.titleContainer, th.titleContainer]}>
              <Text style={[styles.title, th.title]}>AI Decision Maker</Text>
            </View>
            <Text style={[styles.sessionCode, th.sessionCode]}>Session Code: {joinCode}</Text>
          </View>
          <Text style={[styles.waitingText, th.waitingText]}>Waiting for AI to respond…</Text>
          <ActivityIndicator size="large" color={theme.textColor} style={{ marginTop: 20 }} />
        </ScrollView>
        <TabBar setScreen={setScreen} />
      </SafeAreaView>
    );
  }

  // AI response screen
  if (screen === 'aiResponse') {
    return (
      <SafeAreaView style={[styles.safeArea, th.safeArea]}>
<ThemedStatusBar theme={theme} />
        <ScrollView contentContainerStyle={[styles.scrollContainer, th.scrollContainer]}>
          <View style={styles.headerWrap}>
            <View style={[styles.titleContainer, th.titleContainer]}>
              <Text style={[styles.title, th.title]}>AI Decision Maker</Text>
            </View>
            <Text style={[styles.sessionCode, th.sessionCode]}>Session Code: {joinCode}</Text>
          </View>

          <View style={[styles.inputContainer, th.inputContainer]}>
            <Text style={[styles.label, th.label]}>Your Submission:</Text>
            <Text style={[styles.dropdownText, th.dropdownText]}>{submittedQuestion}</Text>
          </View>

          <View style={[styles.inputContainer, th.inputContainer]}>
            <Text style={[styles.label, th.label]}>AI Response:</Text>
            <Text style={[styles.dropdownText, th.dropdownText]}>{aiAnswer}</Text>
          </View>

                    <View style={[styles.inputContainer, th.inputContainer]}>
            <Text style={[styles.label, th.label]}>Other’s Responses:</Text>
            {responses.length === 0 ? (
              <Text style={[styles.dropdownText, th.dropdownText]}>No responses yet.</Text>
            ) : (
              responses.map((r, i) => (
                <Text key={i} style={[styles.dropdownText, th.dropdownText]}>
                  {r.user}: {r.text}
                </Text>
              ))
            )}
          </View>

          <TouchableOpacity
            style={[styles.joinButton, th.joinButton]}
            onPress={() => {
              setCustomQuestion('');
              setSelectedCategory(null);
              setSelectedQuestion('');
              setSubmittedQuestion('');
              setScreen('home');
            }}
          >
            <Text style={[styles.joinButtonText, th.joinButtonText]}>Ask Another Question</Text>
          </TouchableOpacity>
        </ScrollView>
        <TabBar setScreen={setScreen} />
      </SafeAreaView>
    );
  }

  // People screen
  if (screen === 'people') {
    return (
      <SafeAreaView style={[styles.safeArea, th.safeArea]}>
<ThemedStatusBar theme={theme} />
        <ScrollView contentContainerStyle={[styles.scrollContainer, th.scrollContainer]}>
          <View style={styles.headerWrap}>
            <View style={[styles.titleContainer, th.titleContainer]}>
              <Text style={[styles.subTitle, th.subTitle]}>Participants</Text>
            </View>
          </View>

          <View style={[styles.inputContainer, th.inputContainer]}>
            <Text style={[styles.label, th.label]}>People in Session:</Text>
            <View style={[styles.participantBubble, th.participantBubble]}>
              <Text style={[styles.participantText, th.participantText]}>Alice</Text>
            </View>
            <View style={[styles.participantBubble, th.participantBubble]}>
              <Text style={[styles.participantText, th.participantText]}>Bob</Text>
            </View>
            <View style={[styles.participantBubble, th.participantBubble]}>
              <Text style={[styles.participantText, th.participantText]}>Charlie</Text>
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
      <SafeAreaView style={[styles.safeArea, th.safeArea]}>
<ThemedStatusBar theme={theme} />
        <ScrollView contentContainerStyle={[styles.scrollContainer, th.scrollContainer]}>
          <View style={styles.headerWrap}>
            <View style={[styles.titleContainer, th.titleContainer]}>
              <Text style={[styles.subTitle, th.subTitle]}>Notifications</Text>
            </View>
          </View>

          <View style={[styles.inputContainer, th.inputContainer]}>
            <Text style={[styles.label, th.label]}>Recent Notifications:</Text>
            <View style={[styles.notificationBubble, th.notificationBubble]}>
              <Text style={[styles.notificationText, th.notificationText]}>Alice asked a question</Text>
            </View>
            <View style={[styles.notificationBubble, th.notificationBubble]}>
              <Text style={[styles.notificationText, th.notificationText]}>Bob submitted a response</Text>
            </View>
            <View style={[styles.notificationBubble, th.notificationBubble]}>
              <Text style={[styles.notificationText, th.notificationText]}>Session will end in 10 minutes</Text>
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
      <SafeAreaView style={[styles.safeArea, th.safeArea]}>
<ThemedStatusBar theme={theme} />
        <ScrollView contentContainerStyle={[styles.scrollContainer, th.scrollContainer]}>
          <View style={styles.headerWrap}>
            <View style={[styles.titleContainer, th.titleContainer]}>
              <Text style={[styles.subTitle, th.subTitle]}>Settings</Text>
            </View>
          </View>

          <View style={[styles.inputContainer, th.inputContainer]}>
            <Text style={[styles.label, th.label]}>Options:</Text>
            <TouchableOpacity
              style={[styles.settingsBubble, th.settingsBubble]}
              onPress={() => setThemeModalVisible(true)}
            >
              <Text style={[styles.settingsText, th.settingsText]}>Change Theme</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.settingsBubble, th.settingsBubble]}
              onPress={() => alert('Manage Account coming soon!')}
            >
              <Text style={[styles.settingsText, th.settingsText]}>Manage Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.settingsBubble, th.settingsBubble]}
              onPress={() => alert('Privacy Settings coming soon!')}
            >
              <Text style={[styles.settingsText, th.settingsText]}>Privacy Settings</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TabBar setScreen={setScreen} />

        {/* Theme Modal */}
        <Modal
          visible={themeModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setThemeModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <View style={[styles.inputContainerSmall, th.inputContainerSmall, { width: '85%', padding: 20 }]}>
              <Text style={[styles.label, th.label, { marginBottom: 12 }]}>Choose a Theme</Text>
              <TouchableOpacity
                style={[styles.dropdownItem, th.dropdownItem]}
                onPress={() => { setThemeName('default'); setThemeModalVisible(false); }}
              >
                <Text style={[styles.dropdownText, th.dropdownText]}>Dark</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dropdownItem, th.dropdownItem]}
                onPress={() => { setThemeName('blue'); setThemeModalVisible(false); }}
              >
                <Text style={[styles.dropdownText, th.dropdownText]}>Blue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dropdownItem, th.dropdownItem]}
                onPress={() => { setThemeName('green'); setThemeModalVisible(false); }}
              >
                <Text style={[styles.dropdownText, th.dropdownText]}>Green</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingVertical: 8, marginTop: 8 }} onPress={() => setThemeModalVisible(false)}>
                <Text style={{ color: theme.textColor, textAlign: 'right',fontFamily: 'MochiyPopOne' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  // Default Join screen
  return (
    <SafeAreaView style={[styles.safeArea, th.safeArea]}>
<ThemedStatusBar theme={theme} />
      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContainer, th.scrollContainer]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.titleContainer, th.titleContainer]}>
            <Text style={[styles.title, th.title]}>AI Decision Maker</Text>
          </View>

          <View style={styles.joinSpacer} />

          <View style={[styles.inputContainerSmall, th.inputContainerSmall]}>
            <Text style={[styles.label, th.label]}>Enter Session code:</Text>
            <TextInput
              style={[styles.inputCode, th.inputCode]}
              value={joinCode}
              onChangeText={setJoinCode}
              placeholder="Enter code"
              placeholderTextColor={theme.textColor}
            />
          </View>

          <TouchableOpacity style={[styles.joinButton, th.joinButton]} onPress={handleJoin}>
            <Text style={[styles.joinButtonText, th.joinButtonText]}>Join Session</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// TabBar component
function TabBar({ setScreen }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.tabBar, { backgroundColor: theme.primary }]}>
      <TouchableOpacity onPress={() => setScreen('home')}>
        <Ionicons name="home-outline" size={24} color={theme.textColor} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('people')}>
        <Ionicons name="people-outline" size={24} color={theme.textColor} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('notifications')}>
        <Ionicons name="notifications-outline" size={24} color={theme.textColor} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('menu')}>
        <Ionicons name="menu-outline" size={24} color={theme.textColor} />
      </TouchableOpacity>
    </View>
  );
}
function ThemedStatusBar({ theme }) {
  return (
    <View style={{ height: StatusBar.currentHeight, backgroundColor: theme.primary }}>
      <StatusBar barStyle={theme.statusBarStyle} />
    </View>
  );
}