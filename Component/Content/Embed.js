import React from 'react';
import {WebView} from 'react-native-webview';

const wrapCSS = `
<style>
	[question-text]{
	
		font-size:14pt;
		font-weight: bold; color: black; 
		background-color:red;
		marginTop: 5pt;
		height:200px;
	}
</style>`



export default class Embed extends React.Component{
	render(){
		return <WebView injectedJavaScript={createMetadata()} source={{html: wrapHTML(this.props.type, this.props.content)}} scalesPageToFit={false}/>
	}
}


function createMetadata(){
	return `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); true;`
}
function wrapHTML(type,content){
	return `${wrapCSS}<div ${type}>${content}</div>`
}