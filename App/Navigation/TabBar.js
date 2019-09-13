import React from 'react';
import {createBottomTabNavigator} from "react-navigation";
import {Account, Network, Contact, Media} from 'Hitract/Screen';
import * as Option from './Option';

//TabBarController
export default createBottomTabNavigator({
	Network,
	Media,
	Contact,
	Account
}, Option.App({

}))
