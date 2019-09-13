import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView, TextInput, Alert, KeyboardAvoidingView, Platform, Dimensions} from 'react-native';
import styles from './profile_component_style';

export default class RatingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rating: props.rating,
        totalRating: props.totalRating
    };
  }

  componentDidMount(){}

  componentWillMount() {}

  componentWillReceiveProps(nextProps){
    this.setState({
        rating: nextProps.rating,
        totalRating: nextProps.totalRating
    })
  }

  render() {
    var totalStarsView = [];
    let rating = this.state.rating;
    let totalRating = this.state.totalRating;
    let totalViews = Math.ceil(totalRating/5);
    totalRating = totalRating - rating;

    for(let i = 0; i < totalViews; i++){
      var fillImages = [];
      var unfillImages = [];
      var counter1 = 10;
      while(rating > 0){
        fillImages.push(<Image style={styles.starImage} key={i} source={require('../../assets/images/star2.png')}/>)
        counter1--;
        rating--;
        if(counter1 == 0){
          break;
        }
      }  
      while(totalRating > 0){
        if(counter1 == 0){
          break;
        }
        unfillImages.push(<Image style={styles.starImage} key={i} source={require('../../assets/images/star.png')}/>)
        counter1--;
        totalRating--;
      }
      totalStarsView.push(<View style={styles.starView}>
        { fillImages }{unfillImages}
      </View>)
    } 
    
    return (
        <View style={styles.mainRatingView}>
            <View style={styles.mainStarView}>
              {totalStarsView}
            </View>
            <Text style={styles.ratingText}>({this.state.rating}/{this.state.totalRating})</Text>
        </View>
    );
  }
}