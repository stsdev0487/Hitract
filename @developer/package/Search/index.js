const fxy = require('fxy')
const read = require('./read')
const Result = require('./Result')
const Inquiry = require('./Inquiry')

class Search{
	constructor(project, ...targets){
		this.project = project
		this.targets = read.folders(project, ...targets)
	}
	files(...types){
		return this.targets.map(target_map).reduce(read.reduce, [])
		//scope actions
		function target_map(target){ return target.read(...types) }
	}

	scan(inquiry){
		inquiry = Inquiry(inquiry)
		if(inquiry.keywords.length || inquiry.types.length){
			inquiry.files = this.files(...inquiry.types)
		}
		else inquiry.files =[]
		if(inquiry.keywords.length){
			inquiry = include_files.call(this, inquiry)
		}
		return inquiry.keywords.length > 0 ? search_scan(inquiry):search_files(inquiry)
	}
}

//exports
module.exports = Search

//scope actions
function include_files(inquiry){
	const types = new Set()
	const folders = new Set()
	const node_modules = fxy.join(this.project, 'node_modules')
	switch(inquiry.include){
		case 'module':
			const {dependencies} = require(fxy.join(this.project, 'package.json'))
			for(const name in dependencies){
				const folder = fxy.join(node_modules, name)
				if(fxy.exists(folder)) folders.add(folder)
			}
			break
		case 'npm':
			folders.add(node_modules)
			types.add('.js','.jsx','.ts','tsx')
			break
		case 'os':
			folders.add(fxy.join(this.project, 'android'))
			folders.add(fxy.join(this.project, 'ios'))
			break
		case 'package':
			folders.add(node_modules)
			types.add('package.json')
			break
		case 'react':
			folders.add(node_modules)
			folders.filter = function filter_react_item(item){ return item.name.includes('react') }
			break

	}

	if(folders.size > 0){
		let additional_folders = read.folders(read.skip_filter, ...folders)
		if(folders.filter) additional_folders = additional_folders.filter(folders.filter)
		inquiry.files.push(...additional_folders.map(read_files).reduce(read.reduce, []))
	}
	return inquiry
	//scope actions
	function read_files(folder){ return folder.read(...types) }
}

function search_files(inquiry){
	const result = new Result()
	const graphics = ['png','jpg','jpeg','gif']
	for(const file of inquiry.files){
		const extension = fxy.extension(file.name).toLowerCase()
		const folder = fxy.folder_name(file.get('path'))
		const line = {scanned:false, line:folder, folder, value:`${file.name}`}
		if(graphics.includes(extension)){
			line.graphic = file.content
			result.add({value:'graphics'}, extension, file, line)
		}
		else result.add({value: 'files'}, extension, file, line)
	}
	return result
}

function search_scan(inquiry){

	const result = new Result()
	for(const keyword of inquiry.keywords){
		for(const file of inquiry.files.filter(keyword.file)){
			for(const line of read.lines(file)){
				if(keyword.exact(line.value)) result.add(keyword, 'exact', file, line)
				else if(keyword.any(line.value)) result.add(keyword, 'any', file, line)
			}
		}
	}
	return result
}


