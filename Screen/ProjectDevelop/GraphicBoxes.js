import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {Area, Card, GraphicBoxes, GraphicBox, OverlayDetail} from 'Hitract/Component';
import {align, color, font, layer, letting} from 'Hitract/UI';
import Api,{Type} from 'Hitract/Api';



export default class GraphicBoxesTest extends React.Component{

	render(){

		console.log('HELLO')
		return (<Area loading={false}>
			<Card.Frame>
				<GraphicBoxes>
					<GraphicBox>
						<OverlayDetail large title='3.9'  right description='davinci' />
					</GraphicBox>
					<GraphicBox>
						<OverlayDetail title='Fest & nöje' center description='Nattliv och underhållning är kul'/>
					</GraphicBox>
					<GraphicBox></GraphicBox>
					<GraphicBox></GraphicBox>
					<GraphicBox></GraphicBox>
				</GraphicBoxes>
			</Card.Frame>
		</Area>)
	}
}

//scope actions
