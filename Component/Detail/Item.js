import React from 'react';
import {Text} from 'react-native';
import {Container,Layout} from '../Design';
import ui from './ui';


//Detail item with support to trigger navigation sequences into detail views
export class DetailItem extends React.Component{
	static defaultProps = { attributes: ui.detail.component }
	view(){
		return Layout.columnLayout({
			items:[
				{
					attributes: {size: 2},
					children: [<Text key={'left'} {...ui.detail.left}>{this.props.left} - </Text>]
				}, {
					attributes: {size: 6},
					children: [<Text key={'center'} {...ui.detail.center}> {this.props.center}</Text>]
				}, {
					attributes: {size: 1},
					children: [<Text key={'right'} {...ui.detail.right}>{this.props.right}</Text>]
				}
			]
		})
	}
}