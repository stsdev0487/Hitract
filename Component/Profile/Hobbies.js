import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native'
import Api,{Data,Type} from 'Hitract/Api';
import {Account, Screen} from 'Hitract/App';
import {align, color, letting} from 'Hitract/UI';
import {Space} from '../Design';
import {Edit, SeeMore} from '../Action';
import Card from '../Card';
import {GraphicBox, OverlayDetail} from '../Content';
import {GraphicBoxes} from '../List';

const ui = StyleSheet.create({
    label: {
        paddingLeft: letting.median,
        paddingRight: letting.median,
        color: color.grayLight,
        fontSize: 11
    },
    gridView:{
        paddingHorizontal: letting.median - letting.standard,
        flexDirection: align.row, flexWrap: align.wrap,

    }
})

export default class Hobbies extends React.Component {
    static defaultProps = {
        relatedHobbyStudents: [],
        studentHobbies: []
    };
    static identifier = 'Hobbies';
    static propTypes = {
        relatedHobbyStudents: Type.array,
        studentHobbies: Type.array
    };

    state = { show: false }
    onHobbyPressed(){

    }
    render() {
        const screen = Screen[this.constructor.identifier]
        const {relatedHobbyStudents, studentHobbies} = this.props
        return (<Card.Frame>
            <Card.Header>
                <Card.Title>{screen.label}</Card.Title>
                <Edit component={this} tab={screen.tab} />
            </Card.Header>
            <Text style={ui.label}>{Account.personal.like}</Text>
            <GraphicBoxes>
                {studentHobbies.map(createHobby,this)}
            </GraphicBoxes>
            <View footer bordered>
                <Text style={ui.label}>{Account.personal.similar.like}</Text>
            </View>
        </Card.Frame>)
    }
}


//scope actions
function createHobby(item,index){

    return <GraphicBox image={{uri: Api.url(item.image)}}
                       key={index}
                       data={item}
                       onPress={this.onHobbyPressed.bind(this)}>
        <OverlayDetail title={item.hobbyName} center description={item.description} />
    </GraphicBox>
}

