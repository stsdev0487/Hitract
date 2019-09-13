const {dot} = require('fxy')
const entry = require('./entry')
const keyword_splitters = ['\n', ',']
const keywords_field = 'keywords'
const types_field = 'types'

class Inquiry{
	constructor(data){
		this.keywords = dot.has(data, keywords_field) ? inquiry_keywords(dot.get(data, keywords_field)):[]
		this.types = dot.has(data, types_field) ? inquiry_list(dot.get(data, types_field),...keyword_splitters):[]
		this.include = data.include
		//modules -> include project dependency modules
		//npm -> include all node modules - bin
		//package -> include all package.json node modules
		//react -> include node modules folders containing the word 'react'
	}
}

//exports
module.exports = inquiry

//scope actions
function inquiry(data){ return new Inquiry(data) }

function inquiry_list(text, ...splitters){
	return Array.from(new Set(splitters.reduce(reduce, []).reduce(join, []))).sort()

	//scope actions
	function join(list, split){ return list.concat(split) }
	function reduce(list, splitter){ return list.concat(text.split(splitter).map(entry.trim).filter(entry.empty)) }
}

function inquiry_keyword(keyword){
	const any = new RegExp(keyword, 'i')
	const exact = new RegExp(keyword)
	return {
		any(){ return any.test(arguments[0]) },
		exact(){ return exact.test(arguments[0]) },
		get file(){ return is_missing.bind({any}) },
		value: keyword
	}
}

function inquiry_keywords(text){ return inquiry_list(text, ...keyword_splitters).map(inquiry_keyword) }

function is_missing(file){
	if('text' in file === false) file.text = file.content
	return this.any.test(file.text)
}