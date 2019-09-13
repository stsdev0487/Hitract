import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView, TextInput, Alert, KeyboardAvoidingView, Platform, Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    headerView: {},
    imageStyle: {
        width: '100%',
        height: 250,
        resizeMode: 'cover'
    },
    labelView: {
        zIndex: 111,
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
    },
    labelTextView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        borderRadius: 4,
        width: 185,
        height: 20,
        justifyContent: 'center',
        paddingLeft: 10,
        maxWidth: 185
    },
    locationText: {
        color: 'black'
    }
});
export default class GraphicMetadata extends Component {
  componentDidMount(){}

  componentWillMount() {}

  componentWillReceiveProps(nextProps){
      this.setState({
        pictureUrl: nextProps.pictureUrl,
        location: nextProps.location
      })
  }

  render() {    
    return (
        <View style={styles.headerView}>
            <View style={styles.labelView}>
                <View style={styles.labelTextView}>
                    <Text style={styles.locationText}>{this.state.location}</Text>
                </View>
            </View>
            <View>
              <Image
                  style={styles.imageStyle}
                  source={{uri: this.state.pictureUrl}}
              />
            </View>
        </View>
    );
  }
}