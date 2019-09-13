import React from 'react';
import {FlatList, Picker, StyleSheet, TouchableOpacity as Touch, Text, View, ScrollView} from 'react-native';
import {align, color, font, letting, layer, viewport, Icon} from 'Hitract/UI';
import Api, {Data, Type} from 'Hitract/Api';
import {Action} from '../Action';
import {Box} from '../Content';

const ui = StyleSheet.create({
	component: {
		backgroundColor: color.whiteShade,
		borderRadius: letting.half,
		paddingHorizontal: letting.median,
		flex: 1
	},
	icon:{ fontSize: font.icon.medium },
	label: {fontSize: font.medium},
	list:{
		backgroundColor: color.whiteShade,
		borderRadius: letting.half,
		maxHeight: 150,
		marginTop: letting.median,
		flex: 1
	},
	picker:{
		borderColor: color.monochrome,
		borderRadius: letting.half * 0.82,
		borderWidth: 1,
		marginBottom: letting.double
	},
	placeholder: {
		color: color.monochrome
	},
	selected: {color: color.tint},
	selector:{
		paddingVertical: letting.single
	},

})



export default class MetadataSelect extends React.Component{
	static propTypes = {
		onSelect: Type.func.isRequired
	}
	state = {
		metadataList: [],
		index: -1,
		loading: false,
		opened:false
	};

	async componentDidMount(){
		try{

			const metadataList = await Api.get.metadataList({})
			this.setState({
				metadataList,
				loading: false
			})
		}
		catch(error){
			console.error(error)
			this.setState({
				metadataList: [],
				loading: false
			})
		}
	}
	get label(){ return Data.get(this.values[this.state.index], 'metadataName') }
	onSelect(){
		this.setState({
			opened: !this.state.opened
		})
	}
	onPress({metadataName}){
		this.setState({selected:metadataName,opened:false})
	}
	onValueChange(id, index){
		this.setState({index})
	}
	onToggle(){
		this.setState({opened:!this.state.opened})
	}

	render(){
		if(this.state.loading) return <View><Text style={{alignSelf: align.center}}>Loading...</Text></View>
		const state = this.state
		const symbolStyle = this.label ? ui.selected:ui.placeholder


		return (<View style={ui.component}>
			<Touch style={ui.selector} onPress={this.onToggle.bind(this)}>
				<Box x between style={{alignContent: align.center, justifyContent: align.between}}>
					<Text style={[ui.label, symbolStyle]}>{this.label || 'Välj kategori'}</Text>
					<Icon style={[ui.icon, symbolStyle]} name={state.opened ? 'arrow-upward':'arrow-downward'}/>
				</Box>
			</Touch>
			{state.opened &&
			<Picker style={ui.picker}
					onValueChange={this.onValueChange.bind(this)}
					selectedValue={this.value}>
				{this.values.map(createItem)}
			</Picker>}
		</View>)
	}
	get value(){ return Data.get(this.values[this.state.index], 'id') }
	get values(){ return this.state.metadataList || [] }
}


//scope actions
function createItem(item, index){
	return <Picker.Item key={index} label={item.metadataName} value={item.id} />
}
