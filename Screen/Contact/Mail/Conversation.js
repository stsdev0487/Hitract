import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Container, View, Text } from 'native-base'
import ChatList from '../components/ChatComponents/ChatList'
import SingleUserChat from '../components/ChatComponents/SingleUserChat'
import { createStackNavigator } from 'react-navigation'
import ChatHeader from '../components/ChatComponents/ChatHeader'


class Conversation extends React.Component {
    static navigationOptions = {
        header: null // !!! Hide Header
    }
    render() {
        return (
            <Container style={{backgroundColor: '#E6ECF0'}}>
                <ChatHeader {...this.props} />
                {/* <View style={{flex: 1}}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}
                        style={{ height: 35, marginTop: 20, alignSelf: "flex-start", marginLeft: 10 }}
                    >
                        <Image
                            source={{ uri: "http://cdn.onlinewebfonts.com/svg/img_343367.png" }}
                            style={{ width: 30, height: 27 }} />
                    </TouchableOpacity>
                </View> */}
                {/* <UserHeader {...this.props} /> */}
                <ChatList {...this.props}/>
            </Container>
        )
    }
}

export default createStackNavigator({
    Conversation: Conversation,
    SingleUserChat: SingleUserChat
})

// export default createStackNavigator({
//     Conversation: Chat,
//     // SingleUserChat: SingleUserChat,
//     // Profile: Profile,
//     // Search: Search,
//     // Favorites: Favorites,
//     // AreaInsights: AreaInsights
// })

