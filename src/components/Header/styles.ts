import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  content: {
    height: 44,
    paddingHorizontal: 20,
    backgroundColor: '#0c5d7be6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
  backIcon: {
    width: 26,
    height: 17,
    resizeMode: 'contain',
    margin: 6,
  },
  btnBack: {
    position: 'absolute',
    left: 20,
    width: 48
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  largeTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 70,
  },
  subTitle: {
    marginTop: 10,
    color: 'rgba(175,176,175,1)',
    fontSize: 12,
    marginBottom: 10,
  },
  icon: {
    width: 26,
    height: 17,
    resizeMode: 'contain',
  },
  rightButton: {
    position: 'absolute',
    right: 20,
    padding: 16,
    margin: -16,
  },
  rightTitle: {
    fontSize: 16,
  },
  rewardIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 12,
  },
  myAIALogo: {
    width: 76,
    height: 28,
  },
  rightText: {
    fontSize: 14,
    color: "#ffffff",
  }
});
