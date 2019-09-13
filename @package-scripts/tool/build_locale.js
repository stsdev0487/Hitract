const fxy = require('fxy')
const {dot,id,is} = fxy
const Annotate = require('./notate')

//exports
module.exports = build_locale_index

//scope actions
function build_locale_index(Project){
	Project.index = fxy.join(Project.locale, 'index.js')
	try{

		const file_content = create_index()
		if(file_content === null) return
		//console.log(Project.index)
		//const file_location = fxy.join(Project.locale, 'index.js')
		fxy.write_file_sync(Project.index, file_content, 'utf8')
	}
	catch(error){
		console.error(error)
	}

	//scope actions
	function create_index(){
		const stats = fxy.statSync(Project.locale)
		if(stats.atimeMs === stats.mtimeMs) return null
		const content = asset_content(Project)
		return `/*\n•••••••••••••••••••••\nLocale Vocabularies\n generated with "npm run build:locale" in "@package-script/build.locale.js"\n•••••••••••••••••••••\n*/\n\nexport default ${content};`
	}

}


function asset_content(Project){
	const assets = Array.from(asset_map(Project)).reduce(asset_dataset, {})
	const fields = new Set(Object.keys(Annotate(assets)).map(terminology_field))
	for(const field of Array.from(fields)) dot.set(assets, field, true)
	return JSON.stringify(object_index(assets), null, 2)
}

function asset_dataset(dataset, asset){
	for(const item of asset[1].sort(group_sort)){
		dot.set(dataset, item.notation, require(item.get('path')))
	}
	return dataset
}

function asset_map(Project){
	return fxy.tree(Project.locale, '.js').items.only
			  .filter(item=>item.get('path') !== Project.index)
			  .map(identify, Project)
			  .sort(identify_nest)
			  .reduce(group, new Map())
}


function group(groups, entry){
	if(groups.has(entry.module) === false) groups.set(entry.module, [])
	return (groups.get(entry.module).push(entry), groups)
}


function group_sort(){
	const a = dot.get(arguments[0], 'notation').split('.')
	const b = dot.get(arguments[1], 'notation').split('.')
	if(a.length > b.length) return 1
	if(a.length < b.length) return -1
	return 0
}

function identify(item){
	let locator = item.get('path')
	locator = locator.replace(this.locale, '')
	item.module = id.path(locator.replace(fxy.basename(locator), ''))
	item.nest = identify_sort(item)
	if(locator.endsWith('/index.js')) locator = locator.replace('index.js', '')
	else locator = locator.replace('.js','')
	return (item.notation = locator.split('/').filter(item=>item.length).join('.'), item)
}

function identify_nest(a,b){
	if(a.nest>b.nest) return 1
	if(a.nest<b.nest) return -1
	return 0
}

function identify_sort(item){ return item.module.split('/').length  }

function index_value(text){
	text = text.trim()
	text = text.slice(1, text.length)
	text = text.slice(0, text.length - 1)
	return text.trim()
}

function object_index(object){
	return Object.entries(object).sort(object_sort).map(object_map).reduce(object_reduce, {})
}

function object_map(entry){
	if(is.data(entry[1])) entry[1] = object_index(entry[1])
	return entry
}

function object_reduce(object, entry){ return Object.assign(object, {[entry[0]]: entry[1]}) }

function object_sort(a, b){
	if(a[0].toLowerCase() > b[0].toLowerCase()) return 1
	if(a[0].toLowerCase() < b[0].toLowerCase()) return -1
	return 0
}



function terminology_field(field){

	return field.split('.').reverse().slice(1).reverse().concat(['terminology']).join('.')
}

