import React from 'react'

import { Button, Icon,
    Header, Container,
    Left, Right, Body, Title, List, ListItem
} from 'native-base'

export default class ChatHeader extends React.Component {
    render() {
        return (
                <Header
                    noShadow
                    androidStatusBarColor='white'
                    iosBarStyle='light-content'
                    style={{backgroundColor: 'white'}}
                >
                    <Left>
                        <Button
                            transparent
                            dark
                            onPress={() => this.props.navigation.goBack(null)}
                        >
                             <Icon name='ios-arrow-back' />
                        </Button>
                    </Left>
                    <Body >
                        <Title
                            style={{
                                color: 'black',
                                fontSize: 24,
                                fontWeight: 'bold'
                            }}
                            uppercase={false}
                        >
                            Konversationer
                        </Title>
                    </Body>
            </Header>
        )
    }
}
