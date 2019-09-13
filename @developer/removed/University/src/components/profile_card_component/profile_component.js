import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView, TextInput, Alert, KeyboardAvoidingView, Platform, Dimensions} from 'react-native';
import styles from './profile_component_style';
import RatingComponent from './rating_component';

export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        university_name: props.university_name,
        title: props.title,
        description: props.description,
        rating: 7, // rating value must be smaller to the total rating number
        totalRating: 17 // totalRating value must be greaten then rating value
    };
  }

  componentDidMount(){}

  componentWillMount() {}

  componentWillReceiveProps(nextProps){
      this.setState({
        university_name: nextProps.university_name,
        title: nextProps.title,
        description: nextProps.description
      })
  }

  render() {    
    return (
        <View style={styles.mainCardView}>
            <View style={styles.innerCardView}>
                <View style={styles.imageView}>
                    <Image style={styles.universityLogo} source={require('../../assets/images/logoImage.png')}/>
                </View>
                <View style={styles.universityNameView}>
                    <Text style={[styles.nameText, styles.boldText]}>{this.state.university_name}</Text>
                    {this.state.rating <= this.state.totalRating ?
                       <RatingComponent 
                        rating={this.state.rating}
                        totalRating={this.state.totalRating}
                       /> : <View /> 
                    }
                </View>
                <View style={styles.descriptionView}>
                    <Text style={[styles.titleText, styles.boldText]}>{this.state.title}</Text>
                    <Text style={styles.descriptionText} numberOfLines={5}>{this.state.description}</Text>
                </View>
                <View style={styles.seeMoreView}>
                    <Image style={styles.downArrow} source={require('../../assets/images/down.png')}/>
                    <Text style={styles.seeMoreText}>See More</Text>
                </View>
            </View>
        </View>
    );
  }
}