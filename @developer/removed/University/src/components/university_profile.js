import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView, TextInput, Alert, KeyboardAvoidingView, Platform, Dimensions} from 'react-native';
import styles from './university_profile_style';
import ProfileHeader from './profile_header_image_component/profile_header';
import ProfileComponent from './profile_card_component/profile_component';


export default class UniversityProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        //pictureUrl: 'https://images2.minutemediacdn.com/image/upload/c_crop,h_930,w_2000,x_0,y_195/f_auto,q_auto,w_1280/v1563393414/shape/mentalfloss/588724-youtube.jpg',
        pictureUrl: 'https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=60 100w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=60 200w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60 300w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60 400w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60 500w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60 600w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60 700w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60 800w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60 900w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60 1000w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60 1100w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=60 1200w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1296&q=60 1296w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60 1400w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=60 1600w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1800&q=60 1800w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60 2000w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2200&q=60 2200w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2400&q=60 2400w, https://images.unsplash.com/photo-1564121612411-92ec6d6509ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2592&q=60 2592w',
        location: 'Universitestshuset, Lund',

        university_name: 'Universitestshuset, Lund',
        title: 'Om Lunds Universitet',
        description: 'Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point. It might describe a place, character, or process; narrate a series of events; compare or contrast two or more things; classify items into categories; or describe causes and effects. Regardless of the kind of information they contain, all paragraphs share certain characteristics. One of the most important of these is a topic sentence.'
    };
  }

  componentDidMount(){}

  componentWillMount() {}

  render() {    
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
            <View>
                <ProfileHeader 
                    pictureUrl={this.state.pictureUrl}
                    location={this.state.location}
                />
                <ProfileComponent 
                    university_name={this.state.university_name}
                    title={this.state.title}
                    description={this.state.description}
                />
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}