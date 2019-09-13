const fxy = require('fxy')
const setting = require('../setting')
const filter = require('./filter')
const skip_filter = Symbol.for('skip filter')


//exports
module.exports.folder = read_folder
module.exports.folder.files = read_folder_files
module.exports.folder.items = read_folder_items
module.exports.folder.items.filter = read_folder_items_filter
module.exports.folders = read_folders
module.exports.lines = read_lines
module.exports.locator = read_locator
module.exports.locators = read_locators
module.exports.reduce = read_reduce
module.exports.skip_filter = skip_filter

//scope actions
function read_folder(folder, ...types){ return fxy.tree(folder, ...types) }

function read_folder_files(folder, ...types){ return read_folder_items(folder, ...types).only }

function read_folder_items(folder, ...setting){ return read_folder(folder, ...setting).items }

function read_folder_items_filter(item){ return filter.folders(item) && filter.assets(item) && filter.developer(item) }

function read_folders(...folders){
	const total = folders.length
	folders = folders.filter(folder=>folder !== skip_filter)
	const skips_filter = folders.length < total
	return read_locators(...folders).map(read_folders_map,{skips_filter})
}

function read_folders_map(folder){
	folder = read_folder(folder)
	folder.targets = this.skips_filter ? folder.items:folder.items.filter(read_folder_items_filter)
	folder.read = read_targets
	return folder
}

function read_locators(...locations){ return locations.map(read_locator) }

function read_locator(location){
	if(fxy.isAbsolute(location) === false){
		location = fxy.join(setting.folder.project, location)
	}
	if(fxy.exists(location) === false) throw new Error(`read.get_locator ->\n\t location "${location}" does not exist.`)
	return location
}

function read_reduce(items, entry){ return items.concat(entry) }

function read_targets(...types){  return this.targets.map(read_targets_map, types).reduce(read_reduce, []) }

function read_targets_map(target){ return read_folder_files(target.get('path'), ...this) }


function read_lines(file){
	if('lines' in file) return file.lines
	return file.lines = file.text.split('\n').map(index_lines)
	//scope actions
	function index_lines(value, index){ return {value, index, line: index + 1} }
}