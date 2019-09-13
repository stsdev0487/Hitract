import React from 'react'
import {StyleSheet, View} from 'react-native'
import {align, font, color, letting, viewport} from 'Hitract/UI'
import {Area, Card, Gradient, Hitract, Space, Items, UniversityDataset} from 'Hitract/Component'
import Api from 'Hitract/Api'

const ui = StyleSheet.create({
	content: {
		backgroundColor: color.transparent,
		width: viewport.width,
		flexDirection: 'column',
		alignItems: align.center,
		alignContent: align.center
	},
	emblem: {
		height: 190,
		width: 150,
		resizeMode: align.center
	},
	feature: {
		marginTop: letting.standard,
		marginBottom: letting.press
	},
	featureText: {
		justifyContent: align.center,
		alignItems: align.start
	},
	featureTextComponent: {
		fontSize: font.line,
		color: color.white,
		marginLeft: letting.single
	},
	featureView: {alignItems: align.center}
})

export default class Universities extends React.Component{
	state = {loading: true }
	onItem(item){
		this.props.navigation.navigate('University', {university:item.data})
	}

	async refresh(reload = true){
		try{
			this.setState(await authorizedState(this, ()=>Api.get.universityList({}, {reload})))
		}
		catch(error){
			console.error(error)
			this.props.navigation.goBack()
		}
	}

	render(){
		return (<Gradient>
			<Area header={letting.double}
				  refresh={this.refresh.bind(this)}
				  style={ui.content}
				  transparent
				  loading={this.state.loading} activity={{color: color.white}}>
				<Hitract.Logo inline></Hitract.Logo>
				<Space by='double'/>
				<Items title='Universities'
					   maximum={Infinity}
					   onItem={this.onItem.bind(this)}
					   items={this.state.items}
					   renderItem={renderItem}/>
			</Area>
		</Gradient>)

	}
}

//scope actions
function authorizedState(component, loader){
	if(Api.authenticated) return loadStateDataSource(loader)
	return {loading: true}
}

async function loadStateDataSource(loader){
	let items = null
	try{
		items = new UniversityDataset(await loader())
	}
	catch(error){
		items = null
		console.error(error)
	}
	return {loading: items === null, items}
}

function mapFieldValue(entry, index){
	let value = entry[1]
	if(Valid.object(value)){
		try{
			value = JSON.stringify(value, null, 2)
		}
		catch(error){
			value = null
		}

	}
	return (<View key={index} style={{borderBottomWidth: 1, borderBottomColor: 'gray'}}><Text style={{color: 'gray'}}>{entry[0]}: </Text><Text>{value}</Text></View>)
}

function renderItem({institutionName, topics}){
	const count = topics.length
	return `${institutionName} - ${count}`
}