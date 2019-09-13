/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


const { width, height } = Dimensions.get('window');

const App = () => {
  return (
    <Fragment>
      <SafeAreaView>
        <ImageBackground source={require('./assets/wallpaper.jpg')} style={styles.backgroundImage}>
          <View style={styles.bgCard}>
            <View style={styles.logoView}>
              <Image source={require('./assets/logo.png')} style={styles.logoImage}/>
            </View>
            <Text style={styles.title}>Ericsson</Text>
            <Text style={styles.subTitlte}>Fakata</Text>
            <View>
              <Text style={styles.text}>Bransch: <Text style={styles.subText}>Telekom, Telekomtillverkare</Text></Text>
              <Text style={styles.text}>Anstallda: <Text style={styles.subText}>>250</Text></Text>
              <Text style={styles.text}>Omsattning: <Text style={styles.subText}>>500 MSEK</Text></Text>
              <Text style={styles.text}>Huvudkontor: <Text style={styles.subText}>Stockholm, Sverige</Text></Text>
              <Text style={styles.text}>Grundat: <Text style={styles.subText}>1876</Text></Text>
              <Text style={styles.text}>Hemsida: <Text style={styles.link} onPress={() => Linking.openURL("http://ericsson.se")}>http://ericsson.se</Text></Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  logoView: {
    position: 'absolute',
    top: -56,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImage: {
    width: 113,
    height: 112,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.white
  },
  bgCard: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    margin: 10,
    padding: 20,
    paddingTop: 70,
    backgroundColor: Colors.white,
    borderRadius: 14,
    height: height/2,
    shadowColor: Colors.shadow,
    shadowOffset:	{					
      width:	0,
      height:	2			
    },			
    shadowRadius:	5,			
    shadowOpacity:	1,
    elevation: 1
  },
  title: {
    fontFamily: Fonts.family.robotoRegular,
    fontSize: Fonts.size.large,
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: 10
  },
  subTitlte: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.robotoSlabRegular,
    lineHeight:	18,
    letterSpacing: 0,
    color: Colors.dark,
    marginBottom: 10
  },
  text: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.robotoSlabRegular,
    lineHeight: 16,
    letterSpacing: 0,
    color: Colors.gray
  },
  subText: {
    color: Colors.dark,
  },
  link: {
    color: Colors.lightBlue,
  }
});

export default App;
