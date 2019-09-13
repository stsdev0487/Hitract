import React from 'react';
import Type from 'prop-types';
import Leaflet from './Leaflet';
import {OnBoard} from 'Hitract/App';
import {OnBoard as Graphic} from 'Hitract/Bookmark'
const Detail = OnBoard.Join.Items



//exports
export default function OnBoardCards(props){
	const items = Object.values(Detail)
	return (<Leaflet onChange={props.onChange}>{items.map(leafletItem,props)}</Leaflet>)
}
OnBoardCards.defaultProps = {dark: false}
OnBoardCards.propTypes = { dark: Type.bool.isRequired }


//scope actions
function leafletItem(item, index){
	const type = this.dark ? 'dark':'light'
	return (<Leaflet.Item
		graphic={Graphic[type][index].graphic}
		item={item}
		key={index}
		type={type}
	/>)
}

