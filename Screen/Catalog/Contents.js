import React from 'react'
import { StyleSheet,  Text,View} from 'react-native'
import {align, font, color, letting, viewport} from 'Hitract/UI'
import {Area, FeatureAction, Gradient, Hitract, Space} from 'Hitract/Component'
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
	featureContainer: {
		backgroundColor: color.white
	},
	featureText: {
		justifyContent: align.center,
		alignItems: align.start
	},
	featureTextComponent: {
		...font.variant.bold,
		textTransform: font.format.uppercase,
		fontSize: font.line,
		color: color.tint,
		marginLeft: letting.single
	},
	featureView: {alignItems: align.center}
})


export default class Contents extends React.Component{
	companies(){
		this.props.navigation.navigate('Companies')
	}
	courses(){
		this.props.navigation.navigate('Courses')
	}
	render(){
		return (<Gradient>
			<Area header={letting.triple} style={ui.content} transparent loading={false} activity={{color: color.white}}>
				<Hitract.Logo emblem inline></Hitract.Logo>
				<Space by='triple'/>
				<Space by='triple'/>
				<View style={ui.featureView}>
					<FeatureAction  style={ui.feature} containerStyle={ui.featureContainer} onPress={()=>this.companies()}>
						<Text style={ui.featureTextComponent}>Companies</Text>
					</FeatureAction>
					<Space  />
					<FeatureAction  style={ui.feature} containerStyle={ui.featureContainer} onPress={()=>this.universities()}>
						<Text style={ui.featureTextComponent}>Universities</Text>
					</FeatureAction>
					<Space />
					<FeatureAction style={ui.feature} containerStyle={ui.featureContainer} onPress={()=>this.courses()}>
						<Text style={ui.featureTextComponent}>Courses</Text>
					</FeatureAction>
				</View>
			</Area>
		</Gradient>)

	}
	universities(){
		this.props.navigation.navigate('Universities')
	}
}