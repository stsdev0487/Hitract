import React from 'react';
import Type from 'prop-types';
import {StyleSheet} from 'react-native';
import {SectionView, align} from 'Hitract/UI';
import Activity from './Activity';
const ui = StyleSheet.create({
	componentSectionView: {
		flex: 1,
		alignItems: align.center,
		justifyContent: align.center
	}
});

export default class StateLoading extends React.Component{
	static propTypes = {loading:Type.bool.isRequired}
	static defaultProps = {loading:true}
	render(){
		return (<SectionView style={ui.componentSectionView}><Activity loading={this.props.loading} /></SectionView>)
	}
}