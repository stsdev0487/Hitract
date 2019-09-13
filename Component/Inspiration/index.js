import React from 'react';
import {StyleSheet, View} from "react-native";
import {withNavigation} from 'react-navigation';
import Api, {EventsProtocol, Data, Type, Valid} from 'Hitract/Api';
import {align, color, font, layer, letting} from 'Hitract/UI';
import Card from '../Card';
import {Column, Dialog, BottomRow, TopRow, Row} from './Content';
import Model from './Model';
import Item from './Item';

const ui = StyleSheet.create({
	action: {
		paddingVertical: letting.single,
		paddingHorizontal: letting.medium,
		backgroundColor: color.tint,
		borderRadius: 25,
		...layer.shadow[2]
	},
	actionText: {
		color: color.white
	},
	component: Item.Frame,
	edit: {
		top: letting.medium, right: letting.medium,
		position: layer.absolute,
	},
	footer: {
		bottom: 0,
		alignItems: align.center,
		left: 0,
		marginBottom: letting.medium,
		position: layer.absolute,
		right: 0
	},
	frame: {paddingHorizontal: Item.Letting.x, paddingVertical: Item.Letting.y},
	header: {
		top: 0,
		alignItems: align.center,
		left: 0,
		marginBottom: letting.medium,
		position: layer.absolute,
		right: 0
	},
	image: {
		...Item.ImageFrame,
		backgroundColor: color.transparent,
		//overflow: layer.hidden
	},
	imageBottomLeft: {borderBottomLeftRadius: Item.Radius},
	imageBottomRight: {borderBottomRightRadius: Item.Radius},
	imageTopLeft: {borderTopLeftRadius: Item.Radius},
	imageTopRight: {borderTopRightRadius: Item.Radius},
	title: {
		backgroundColor: color.white,
		borderTopLeftRadius: letting.single,
		borderBottomRightRadius: letting.single,
		left: 0,
		paddingHorizontal: letting.median,
		paddingVertical: letting.standard,
		position: layer.absolute,
		top: 0
	}
})

//exports
export default withNavigation(class Inspiration extends EventsProtocol(React.Component){
	static Item = Item
	static Model = Model
	static propTypes = {
		slide: Type.object,
		editing: Type.bool.isRequired,
		single: Type.oneOf([0,1,2,3])
	}
	static defaultProps = {
		editing: false
	}
	componentDidMount(){

		this.on('create', this.onCreate.bind(this))
		this.on('edit', this.onEdit.bind(this))
		this.on('image', this.onImage.bind(this))
		this.on('uploadImage', this.onUploadImage.bind(this))
		this.didFocus = this.props.navigation.addListener('didFocus', ()=>{
			if(Api.mounted(this)){
				this.setState({date: new Date()})
			}
		})
		Api.mount(this)
	}
	componentWillUnmount(){
		if(this.didFocus) this.didFocus.remove()
		delete this.didFocus
		this.off('create', this.onCreate.bind(this))
		this.off('edit', this.onEdit.bind(this))
		this.off('image', this.onImage.bind(this))
		this.off('uploadImage', this.onUploadImage.bind(this))
		Api.unmount(this)
	}
	onCreate(slide){
		console.log({onCreate: slide})
	}

	onEdit(){
		if(!this.props.editing){
			this.navigate('Collage', {slide: this.props.slide})
		}
	}
	onImage(item){
		if(this.props.editing){
			if(typeof this.props.single !== 'number'){
				this.navigate('Inspiration', {item, slide: this.props.slide})
			}

		}
		else if(this.props.slide){
			this.navigate('Collage', {slide: this.props.slide})
		}
	}
	onUploadImage({item,response}){
		this.slide.items[item.index] = new Model.Item({
			image:{
				thumbnail: response.uri,
				small: response.uri,
				medium: response.uri,
				large: response.uri
			}
		}, item.index)
		this.setState({date:new Date()})
	}
	get item(){ return Valid.number(this.props.single) ? this.items[this.props.single]:null }
	get items(){ return Data.get(this,'props.slide.items') || [] }


	navigate(){ return this.navigation.navigate(...arguments) }
	get navigation(){ return this.props.navigation }
	render(){
		const items = this.items
		const isSingle = Valid.number(this.props.single)
		const grid = isSingle === false
		return (<Card.Frame ref={()=>this.card= this} style={ui.component} footer={0} collage>

			<Column>
				{isSingle && <Row component={this} item={this.item}/>}
				{grid && <TopRow component={this} items={items.slice(0, 2)}/>}
				{grid && <BottomRow component={this} items={items.slice(2, 4)}/>}
			</Column>
			<Dialog component={this} />
		</Card.Frame>)
	}
	get slide(){ return Data.get(this, 'props.slide')}
})