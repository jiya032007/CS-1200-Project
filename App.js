import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image, // added missing import
} from 'react-native';


export default function App() {
  const [fontsLoaded] = useFonts({
    MoiraiOne: require('./assets/fonts/MoiraiOne-Regular.ttf'),
  });


  const [joinCode, setJoinCode] = useState('');
  const [screen, setScreen] = useState('join'); // 'join' | 'waiting' | 'home'


  // Moved out of conditional so hooks are called unconditionally
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


    // Simulate admin starting session after 3 seconds
    setTimeout(() => {
      setScreen('home');
    }, 3000);
  };


  if (!fontsLoaded) {
    return (
      <View style={styles.loadingScreen}>
        <View style={{ position: 'relative' }}>
          <Text style={[styles.loadingTitle, styles.loadingOutline]}>AI Decision Maker</Text>
          <Text style={styles.loadingTitle}>AI Decision Maker</Text>
        </View>
      </View>
    );
  }


  if (screen === 'waiting') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#001B58" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerWrap}>
            <View style={styles.titleContainer}>
              <View style={{ position: 'relative' }}>
                <Text style={[styles.title, styles.titleOutline]}>AI Decision Maker</Text>
                <Text style={styles.title}>AI Decision Maker</Text>
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


  if (screen === 'home') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#001B58" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerWrap}>
            <View style={styles.titleContainer}>
              <View style={{ position: 'relative' }}>
                <Text style={[styles.title, styles.titleOutline]}>AI Decision Maker</Text>
                <Text style={styles.title}>AI Decision Maker</Text>
              </View>
            </View>


            <Text style={styles.sessionCode}>Session Code: {joinCode}</Text>
          </View>


          {/* Custom Question Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Custom Question:</Text>
            <TextInput
              style={styles.input}
              value={customQuestion}
              onChangeText={setCustomQuestion}
              placeholder="Type your question"
              placeholderTextColor="#0b3597ff"
            />
          </View>


          {/* Categories */}
          <Text style={styles.label}>Choose a Category:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat && styles.categorySelected,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>


          {/* Pre-written Questions */}
          {selectedCategory && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Pre-written Questions:</Text>
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
    "https://router.huggingface.co/hf-inference/gpt2",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_HF_TOKEN_HERE",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: finalQuestion }),
    }
  );


  const text = await res.text();
  console.log("Raw Hugging Face response:", text);


  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Response was not JSON: " + text);
  }


  const aiText = Array.isArray(data)
    ? data[0]?.generated_text
    : data?.generated_text || "No answer returned.";


  setAiAnswer(aiText);
  setResponses(prev => [...prev, { user: "AI", text: aiText }]);
  setScreen("aiResponse");
} catch (error) {
  console.error("AI error:", error);
  setAiAnswer("Sorry, I couldn't fetch an AI answer.");
  setScreen("aiResponse");
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
  //ai waiting screen
  if (screen === 'aiWaiting') {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#001B58" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerWrap}>
        <View style={styles.titleContainer}>
          <View style={{ position: 'relative' }}>
            <Text style={[styles.title, styles.titleOutline]}>AI Decision Maker</Text>
            <Text style={styles.title}>AI Decision Maker</Text>
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

//ai response screen
if (screen === 'aiResponse') {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#001B58" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerWrap}>
        <View style={styles.titleContainer}>
          <View style={{ position: 'relative' }}>
            <Text style={[styles.title, styles.titleOutline]}>AI Decision Maker</Text>
            <Text style={styles.title}>AI Decision Maker</Text>
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
            {aiAnswer || "Waiting for AI response..."}
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
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#001B58" />
      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.titleContainer}>
            <View style={{ position: 'relative' }}>
              <Text style={[styles.title, styles.titleOutline]}>AI Decision Maker</Text>
              <Text style={styles.title}>AI Decision Maker</Text>
            </View>
          </View>


          {/* Spacer to push the session code input lower on the join page */}
          <View style={styles.joinSpacer} />


          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter Session code:</Text>
            <TextInput
              style={styles.input}
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


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#001B58',
  },
  keyboardWrapper: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#020111',
    padding: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerWrap: {
    alignItems: 'center',
    marginBottom: 40,
  },
  joinSpacer: {
    height: 80, // reduced spacing to move session code input less far down
  },
  titleContainer: {
    backgroundColor: '#0B1B3F',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 0,
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontFamily: 'MoiraiOne',
    color: '#2A6AFF',
    textAlign: 'center',
    textShadowColor: '#2A6AFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  titleOutline: {
  position: 'absolute',
  left: 0,
  top: 0,
  color: '#2A6AFF', // same color as main text
},
  sessionCode: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#A1CAFF',
    fontWeight: '600',
    alignSelf: 'center',
  },
  inputContainer: {
    backgroundColor: '#1E5AE6',
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
  },
  label: {
    color: '#A1CAFF',
    fontWeight: '600',
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#A1CAFF',
    padding: 12,
    borderRadius: 15,
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
  joinButton: {
    backgroundColor: '#0B1B3F',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
  joinButtonText: {
    color: '#2A6AFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#001B58',
    borderTopWidth: 1,
    borderColor: '#333',
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#020111',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingTitle: {
    fontSize: 50,
    fontFamily: 'MoiraiOne',
    color: '#2A6AFF',
    textAlign: 'center',
    textShadowColor: '#2A6AFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  loadingOutline: {
    position: 'absolute',
    left: 0.5,
    top: 0.5,
    color: '#000',
  },
  waitingContainer: {
    backgroundColor: '#0B1B3F',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  waitingText: {
    fontSize: 16,
    color: '#A1CAFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#1E5AE6',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  categorySelected: {
    backgroundColor: '#2A6AFF',
  },
  categoryText: {
    color: '#A1CAFF',
    fontWeight: '600',
  },
  dropdownScroll: {
    maxHeight: 150,
    marginTop: 10,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: '#A1CAFF',
    borderRadius: 10,
    marginBottom: 10,
  },
  dropdownSelected: {
    backgroundColor: '#2A6AFF',
  },
  dropdownText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
  },
  categoryIconWrap: {
  alignItems: 'center',
  marginRight: 15,
},
categoryCircle: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: '#1E5AE6',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 5,
},
categoryIcon: {
  width: 30,
  height: 30,
  resizeMode: 'contain',
},
categoryLabel: {
  color: '#A1CAFF',
  fontSize: 12,
  fontWeight: '600',
  textAlign: 'center',
},
});


