import React from 'react';
import Type from 'prop-types';
import Api from 'Hitract/Api'

export default class CardComponent extends React.Component{
	static propTypes = {api:Type.object}
	static defaultProps = {api: Api}
}

