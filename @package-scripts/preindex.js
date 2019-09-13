const fs = require('fs')
const path = require('path')
const folder = {
	base: path.dirname(path.join(__dirname,'../')),
	locale: path.join(__dirname,'../Locale')
}

build_locale_index()

//scope actions
function build_locale_index(){
	try{

		const file_content = create_index()
		if(file_content === null) return
		const file_location = path.join(folder.locale,'index.js')
		fs.writeFileSync(file_location, file_content, 'utf8')
	}
	catch(error){
		console.error(error)
	}


	//scope actions
	function create_index(){
		const index_content = get_folders().map(folder_export).join('\n')
		return `/*\n•••••••••••••••••••••\nLocale Vocabularies\n  - File automatically generated in @package-script -> build_locale_index\n•••••••••••••••••••••\n*/\n\n${index_content}`
	}
	function folder_export(folder){ return folder.rule }
	function get_folders(){
		const stats = fs.statSync(folder.locale)
		if(stats.atimeMs === stats.mtimeMs) return null



		return fs.readdirSync(folder.locale).filter(valid_folder_name).map(folder_export)
		//scope actions
		function file_export(item){
			const file_content = item.name === 'index' ? index_value(item.value):`'${item.name}': ${item.value}`
			return `\n/* ${item.filename} from "${item.location.replace(folder.base,'')}" */\n${file_content}`
		}

		function folder_export(name){
			return {
				location: path.join(folder.locale, name),
				name,
				get rule(){
					const export_rule = `\nexport const ${this.name} = ${this.value}`
					return `/* ${this.name} from "${this.location.replace(folder.base, '')}" */${export_rule}`
				},
				get value(){
					const body = read_files(this).map(file_export).join(',\n')
					return `{${body}\n};\n\n`
				}
			}
		}

		function valid_folder_name(name){ return path.extname(name).length === 0 }
	}
	function index_value(text){
		text = text.trim()
		text = text.slice(1,text.length)
		text = text.slice(0, text.length-1)
		return text.trim()
	}
	function read_files(definition){
		return fs.readdirSync(definition.location).filter(valid_file_name).map(file_export)
		//scope actions
		function file_export(filename){
			const location = path.join(definition.location, filename)
			const name = filename.replace(path.extname(filename), '')
			return {
				filename,
				location,
				name,
				value: JSON.stringify(require(location), null, 4 ),
			}
		}
		function valid_file_name(name){ return path.extname(name).length > 0 }
	}

}