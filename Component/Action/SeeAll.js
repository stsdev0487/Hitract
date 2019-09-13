import React from 'react';
import Action from './Component';
import {align, color, font, layer, letting} from 'Hitract/UI';





//exports
export default class SeeAll extends Action{
	state = { text:'See alla' }
	press(){ this.open() }
}