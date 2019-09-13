import React from 'react';
import {StyleSheet, Modal, Text, TouchableOpacity as Touch, View} from 'react-native';
import {Data, Type, Valid, not} from 'Hitract/Api';
import Area from '../Area';
import {Space} from '../Design';
import {color, align, font, letting, layer, Icon} from 'Hitract/UI';

import {Icons} from 'Hitract/Bookmark';
import Header from 'Hitract/App/Navigation/NavigationStyle';

const HeaderFrame = {
	height: 44
}
const HeaderOffset= {
	height: 40
}

const ui = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		paddingHorizontal: letting.median,
		height: HeaderFrame.height + HeaderOffset.height,
		zIndex:10000
	},
	view:{
		height: HeaderFrame.height,
		flexDirection: align.column,
		justifyContent: align.center
	},
	toolbar: {
		...layer.shadow[4],
		position: layer.absolute,
		flexDirection: align.row,
		zIndex: 1000,
		backgroundColor: color.white,
		paddingTop: 40,
		paddingBottom: letting.half,
		paddingHorizontal: letting.standard,
		top: 0,
		width: '100%'

	},
	button: {
		flex: 0,
		paddingHorizontal: letting.median,
		height: 28
	}
});




export default class DetailModal extends React.Component{
	static propTypes = {
		onClose: Type.func.isRequired,
		show: Type.bool.isRequired
	}

	static defaultProps = {
		show: true
	}
	state = {}
	componentDidMount(){
		this.setState({show: this.props.show})
	}
	onClose(){
		this.props.onClose()
	}
	render(){
		return (<Modal animationType="slide" transparent={false} visible={this.props.show} onRequestClose={onRequestClose.bind(this)}>
			<View style={[Header.headerStyle, ui.header]}>
				<Space size={40}/>
				<View style={ui.view}>
					<Touch onPress={this.onClose.bind(this)}>
						<Icon style={{fontSize: font.icon.standard}} name='close'/>
					</Touch>
				</View>

			</View>
			<Area loading={false} footer={letting.triple}>

				{this.props.children}
			</Area>
		</Modal>)
	}
}

function onRequestClose(){

}