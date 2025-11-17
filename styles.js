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
});

export default styles;
