import React from 'react';
import Type from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {align, color, font, letting, viewport} from 'Hitract/UI';
import {Area} from 'Hitract/Component';
import Api,{Data} from 'Hitract/Api';
import App from 'Hitract/App';

import Navigator from 'Hitract/Screen/Navigator';

const ui = StyleSheet.create({
    title: {
        ...font.variant.bold,
        fontSize: font.press,
        textAlign: align.center,
        color: color.black,
        alignSelf: align.center,
    },
    view: {
        marginTop: letting.double
    }
})



export default class Notifications extends React.Component {

    static defaultProps = {
        ...this.attributes,
        style: {}
    }
    static propTypes = {
        navigation: Type.object.isRequired,
        style: Type.object
    }
    state = {loading: false}
    render(){
        return (<Area loading={this.state.loading} style={this.props.style}>
            <View style={ui.view}>
                <Text style={ui.title}>
                    {this.props.title}
                </Text>
            </View>
        </Area>)
    }
}




