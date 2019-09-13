import React from "react";
import { ScrollView } from "react-native";
import {Type} from 'Hitract/Api';
import FilesWrapper from "./FilesWrapper";
import Card from '../Card';
import {Space} from '../Design';

export default class FileViewer extends React.Component{
    static propTypes = {
        header: Type.number.isRequired,
        footer: Type.number.isRequired
    }
    static defaultProps = {
        header: 18,
        footer: 30
    }
    viewAllFiles(){

    }
    render(){
        return  <Card.Frame header={this.props.header} footer={this.props.footer} style={this.props.style}>
            <Card.Title description='Shared course material'>Delat kursmaterial</Card.Title>
            <Space by='line' />
            <FilesWrapper title="Extentor..."/>
            <FilesWrapper title="Labbar..."/>
            <FilesWrapper title="Ovrigt..."/>
            <Card.Action label='Se alla filer' onPress={this.viewAllFiles.bind(this)} description='View all files' />
        </Card.Frame>
    }
}
