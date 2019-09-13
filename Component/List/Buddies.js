import React from 'react';
import {StyleSheet, Image, View} from 'react-native'
import {Data,Type} from 'Hitract/Api';
import {SeeAll} from '../Action';
import {container, icon, label} from 'Hitract/UI';

const ui = StyleSheet.create({
	thumbnail: {
		height: 33,
		width: 33,
		marginRight: 10,
		get borderRadius(){ return this.height / 2 }
	},
})

export default class Buddies extends React.Component{
	static propTypes = {
		buddies: Type.array.isRequired
	}
	constructor(){
		super(...arguments)
		this.state = {collapsedCount: 4}
	}
	items(){ return (Array.isArray(this.props.buddies) ? this.props.buddies:[]) }
	list(){ return this.state.seeAll === true ? this.items():this.items().slice(0, this.state.collapsedCount) }
	total(){ return this.items().length }
	render(){
		const total = this.total()
		return (total > 0 && <View>
			{label.title(`Buddies (${total})`)}
			<View {...container.horizontal}>
				{this.list().map(buddyListItem)}
				<SeeAll component={this} tab={this.props.tab}/>
			</View>
		</View>)
	}
}

//scope actions
function buddyListItem(item, index){
	return <Image key={index} source={{uri: item.pictureUrl || icon.avatar}} style={ui.thumbnail}/>
}