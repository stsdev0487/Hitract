import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Content, Title, Container, Right, Left } from 'native-base'
import { GiftedChat } from 'react-native-gifted-chat'

const sampleMessages = [
    {
        isSender: true,
        message: "Test which is a new approach to have all solutions",
        timeDate: "11:01 AM | June 9"
    },

];

export default class Example extends React.Component {
    state = {
      messages: [],
    }

    componentWillMount() {
      this.setState({
        messages: [
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
          {
            _id: 3,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 3,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any'
            },
          },
        ],
      })
    }

    onSend(messages = []) {
        console.log(messages)
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
    }

    render() {
      return (
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
        //   inverted ={false}
          user={{
            _id: 3,
          }}
        />
      )
    }
  }

// const styles = StyleSheet.create({
//     receiverChatMessage: {
//         minHeight: 50,
//         width: '70%',
//         paddingRight: 10,
//         paddingLeft: 10,
//         paddingTop: 10,
//         marginTop: 10,
//         borderRadius: 100
//     },
//     senderChatMessage: {
//         minHeight: 50,
//         width: '70%',
//         alignSelf: 'flex-end',
//         paddingRight: 10,
//         paddingLeft: 10,
//         paddingTop: 10,
//         marginTop: 10,
//         borderRadius: 100
//     },
//     receivedMessageStyle: {
//         color: 'black',
//         textAlign: 'right',
//         fontSize: 16
//     },
//     sentMessageStyle: {
//         color: 'black',
//         textAlign: 'left',
//         fontSize: 16
//     }
// })

// const styles = StyleSheet.create({
//     primary: {
//       color: 'white'
//     },
//     receivedMessageDiv: {
//       display: "inline-block",
//       padding: "0 0 0 10px",
//       verticalAlign: "top",
//       width: "92%"
//     },
//     receivedMessage: {
//       width: "57%"
//     },
//     receivedMessageText: {
//       borderRadius: "20px 20px 20px 0px",
//       fontSize: "14px",
//       margin: 0,
//       color: "#fff",
//       padding: "10px 10px 10px 12px",
//       width: "100%",
//       backgroundColor: "#4F69A2"
//       // backgroundColor: "#DBA83B"
//     },
//     receiverTimeDate: {
//       color: "#747474",
//       display: "block",
//       fontSize: "12px",
//       margin: "8px 0 0px",
//       float: "right"
//     },
//     senderMessageDiv: {
//       overflow: "hidden",
//       margin: "26px 0 26px"
//     },
//     sentMessage: {
//       float: "right",
//       width: "46%"
//     },
//     sentMessageText: {
//       borderRadius: "20px 20px 20px 0px",
//       fontSize: "14px",
//       margin: 0,
//       color: "white",
//       padding: "10px 10px 10px 12px",
//       width: "100%",
//       backgroundColor: "#2196f3"
//     },
//     senderTimeDate: {
//       color: "#747474",
//       display: "block",
//       fontSize: "12px",
//       margin: "8px 0 0"
//     }
//   })
