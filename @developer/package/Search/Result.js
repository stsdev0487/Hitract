const {folder} = require('../setting')
class Result extends Map{
	add(){ return result_add.apply(this, arguments) }
	copy(){ return result_copy.apply(this,arguments) }
	file(){ return result_file.apply(this, arguments) }
	keyword(){ return result_keyword.apply(this,arguments) }
	line(){ return result_line.apply(this, arguments) }
	toJSON(){ return Array.from(this) }
}

//exports
module.exports = Result


//scope actions
function result_add(keyword, type, file, line){ return this.line(keyword, file, this.copy(line, {type})) }

function result_copy(line, ...extensions){ return Object.assign(Object.assign({}, ...extensions), line) }

function result_file(keyword, file){
	if('identifier' in file === false) file.identifier = file.get('path').replace(folder.project, '')
	keyword = this.keyword(keyword)
	if(file.identifier in keyword === false) keyword[file.identifier] = []
	return keyword[file.identifier]
}

function result_keyword(keyword){
	if(this.has(keyword.value) === false) this.set(keyword.value, {})
	return this.get(keyword.value)
}

function result_line(keyword, file, line){ return this.file(keyword, file).push(line) }