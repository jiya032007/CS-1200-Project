// styles.js
import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

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
    height: 100, // breathing room so join input doesn't overlap title
  },
  titleContainer: {
    backgroundColor: '#0B1B3F',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: width * 0.9,
    alignSelf: 'center',
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
  sessionCode: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#0040ff',
    fontWeight: '600',
    alignSelf: 'center',
    fontFamily: 'MochiyPopOne',
  },
  // Big container for custom question
  inputContainer: {
    backgroundColor: '#1E5AE6',
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
    width: width * 0.9,
    alignSelf: 'center',
  },
  // Smaller container for session code
  inputContainerSmall: {
    backgroundColor: '#1E5AE6',
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
    width: width * 0.8, // narrower box
    alignSelf: 'center',
  },
  label: {
    color: '#A1CAFF',
    fontWeight: '600',
    marginBottom: 10,
    fontFamily: 'MochiyPopOne',
    fontSize: 16,
    textAlign: 'center',
  },
  labelStrip: {
    color: '#A1CAFF',
    fontWeight: '600',
    fontFamily: 'MochiyPopOne',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#0B1B3F',
    paddingVertical: 10,
    width: '100%',
    alignSelf: 'stretch',
    marginBottom: 20,
    marginTop: 10,
  },
  // Big input for custom question
  input: {
    backgroundColor: '#A1CAFF',
    padding: 12,
    borderRadius: 15,
    fontFamily: 'MochiyPopOne',
    fontSize: 16,
    textAlignVertical: 'top',
    color: '#0b3597ff',
    minHeight: 100,
  },
  // Small input for session code
  inputCode: {
    backgroundColor: '#A1CAFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    fontFamily: 'MochiyPopOne',
    fontSize: 16,
    textAlign: 'center',
    color: '#0b3597ff',
    minHeight: 40, // clearly smaller
  },
  joinButton: {
    backgroundColor: '#0B1B3F',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 30,
    width: width * 0.8,
    alignSelf: 'center',
  },
  joinButtonText: {
    color: '#2A6AFF',
    fontSize: 18,
    fontFamily: 'MochiyPopOne',
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
  waitingContainer: {
    backgroundColor: '#0B1B3F',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 10,
    alignItems: 'center',
    width: width * 0.9,
    alignSelf: 'center',
  },
  waitingText: {
    fontSize: 16,
    color: '#A1CAFF',
    textAlign: 'center',
    fontFamily: 'MochiyPopOne',
    fontWeight: '600',
  },
  categoryScroll: {
    marginBottom: 5,
    marginTop: 10,
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
    fontFamily: 'MochiyPopOne',
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
    fontFamily: 'MochiyPopOne',
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
    fontFamily: 'MochiyPopOne',
    fontWeight: '600',
    textAlign: 'center',
  },
  participantBubble: {
  backgroundColor: '#A1CAFF',
  padding: 12,
  borderRadius: 12,
  marginVertical: 6,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
},
subTitle: {
  fontFamily: 'MoiraiOne',
  fontSize: 46,
  fontWeight: '600',
  color: '#2A6AFF',
  textAlign: 'center',
  marginBottom: 10,
},
participantText: {
  fontSize: 12,
  color: '#001B58',
  fontFamily: 'MochiyPopOne',
  fontWeight: '500',
},
  notificationBubble: {
  backgroundColor: '#A1CAFF',
  padding: 12,
  borderRadius: 12,
  marginVertical: 6,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
},

notificationText: {
  fontSize: 12,
  fontFamily: 'MochiyPopOne',
  color: '#001B58',
},
settingsBubble: {
  backgroundColor: '#7BA3E8',
  padding: 12,
  borderRadius: 12,
  marginVertical: 6,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
},
settingsText: {
  fontSize: 12,
  color: '#FFFFFF',
  fontFamily: 'MochiyPopOne',
  fontWeight: '500',
}
});

export default styles;

function adjustBrightness(hexColor, percent) {
  // Convert hex to RGB
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Adjust brightness
  const adjusted = [r, g, b].map(val => {
    const newVal = Math.round(val + (255 - val) * (percent / 100));
    return Math.min(255, Math.max(0, newVal));
  });

  // Convert back to hex
  return '#' + adjusted.map(val => val.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export function themedStyles(theme) {
  return {
    safeArea: { backgroundColor: theme.backgroundColor },
    scrollContainer: { backgroundColor: theme.backgroundColor },
    titleContainer: { backgroundColor: theme.primary },
    inputContainer: { backgroundColor: theme.primary },
    inputContainerSmall: { backgroundColor: theme.primary },
    labelStrip: { backgroundColor: theme.primary, color: theme.textColor },
    input: { color: theme.textColor, backgroundColor: theme.backgroundColor },
    inputCode: { color: theme.textColor, backgroundColor: theme.backgroundColor },
    joinButton: { backgroundColor: theme.primary },
    joinButtonText: { color: theme.textColor },
    dropdownItem: { backgroundColor: theme.primary },
    dropdownText: { color: theme.textColor },
    participantBubble: { backgroundColor: theme.primary },
    participantText: { color: theme.textColor },
    notificationBubble: { backgroundColor: theme.primary },
    notificationText: { color: theme.textColor },
    categoryButton: { backgroundColor: theme.primary },
    categoryText: { color: theme.textColor },
    waitingContainer: { backgroundColor: theme.primary },
    waitingText: { color: theme.textColor },
    sessionCode: { color: theme.textColor },
    label: { color: theme.textColor },
    subTitle: { color: theme.textColor },
    title: { color: theme.textColor },
    participantBubble: { 
      backgroundColor: adjustBrightness(theme.primary, 50),
    },
    participantText: { color: theme.textColor },
    notificationBubble: { 
      backgroundColor: adjustBrightness(theme.primary, 50),
    },
    notificationText: { color: theme.textColor },
    settingsBubble: { 
      backgroundColor: adjustBrightness(theme.primary, 50),
    },
    settingsText: { color: theme.textColor },
  };
}