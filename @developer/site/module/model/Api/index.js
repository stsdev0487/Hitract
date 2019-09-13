(async (Export, ...x)=>await Export(...(await Promise.all(x.map(i=>typeof (i) === 'function' && i.constructor.name === 'AsyncFunction' ? i():i)))))
(async function Index(){
	const {dot, id} = window.modules
	const {data} = await window.modules.http(URL.join('api.json'))
	const notate = await window.modules.import.function('notate')
	const convert_tabs = await window.modules.import.function('convert.tabs')
	const {definitions} = data
	const properties = notate(definitions)

	const references = new Map()
	const enums = new Map()
	const information = new Map()
	const type_map = {
		'date-time': 'ISODate',
		int64: 'Int',
		int32: 'Int',
		float: 'Float',
		integer: 'Int',
		number: 'Int',
		string: 'String',
		boolean: 'Boolean',
		byte: 'ID',
		double: 'Float'

	}

	const types = {}
	const schema = []
	const formats = new Map()

	for(const field in properties){
		if(field.endsWith('$ref')){
			let fieldset = field.replace('.$ref', '')
			if(fieldset.includes('.properties.')){
				fieldset = fieldset.split('.properties.').join('.')
				references.set(fieldset, properties[field].replace('#/definitions/', ''))
				delete properties[field]
			}

		}
		else if(field.endsWith('.enum')){
			let fieldset = field.split('.enum')
			fieldset[0] = fieldset[0].split('.properties.').join('.')
			if(enums.has(fieldset[0]) === false){
				enums.set(fieldset[0], [])
			}
			delete properties[field]
		}
		else if(field.includes('.enum.')){
			let fieldset = field.split('.enum.')
			fieldset[0] = fieldset[0].split('.properties.').join('.')

			if(fieldset[1]){
				dot.set(enums.get(fieldset[0]), fieldset[1], properties[field])
			}
			delete properties[field]
		}
		else if(field.endsWith('.title')){
			information.set(properties[field], {
				field
			})
			delete properties[field]
		}

	}


	for(const entry of Object.entries(properties)){
		if(entry[0].endsWith('.format')){
			if(formats.has(entry[0])){
				console.log({duplicate: 'format', entry})
			}
			else formats.set(...entry)
		}
	}

	for(const [name, data] of Object.entries(properties).filter(filter_format)){
		let assigned = false
		if(name.includes('.properties.')){
			let field = name.split('.properties.').join('.')
			let type = type_map[data] || data
			field = field.replace('.type', '').replace('.format', '')

			switch(data){
				case 'array':
					let enumerator = `${field}.items`
					if(references.has(enumerator)){
						dot.set(types, field, `[${references.get(enumerator)}]`)
						assigned = true
					}
					else if(references.has(field)){
						dot.set(types, field, `[${references.get(field)}]`)
						assigned = true
					}
					else if(references.has(`${field}.type`)){
						dot.set(types, field, `[${references.get(`${field}.type`)}]`)
						assigned = true
					}

					break
				case 'undefined':
				case undefined:
					console.log({undefined: true, data, name})
					break
				default:
					dot.set(types, field, type)
					assigned = true
					break
			}
		}

		if(assigned) delete properties[name]
		else{
			if(name.endsWith('.type')){
				let field = name.replace('.type', '')
				if(information.has(field) === false) information.set(field, {})
				information.get(field).name = name
				information.get(field).data = data
				delete properties[name]
			}
			else console.log({name, data})
		}

	}

	for(const [field, values] of enums){
		schema.push(convert_tabs(`
				enum ${id.class(field)}{
					${values.join('\n\t')}
				}
			`))

	}

	for(const [field, definition] of Object.entries(types)){
		//if(field.includes('«') === false && field.includes('»') === false){
		schema.push(convert_tabs(`
				type ${field}{
					${Object.entries(definition).map(entry=>`${entry[0]}: ${entry[1]}`).join('\n\t')}
				}
			`))
		//}
	}

	schema.push(`\nscalar ISODate\n`)

	//exports
	const Api = window.Api = {
		definitions: types,
		instruction: {
			enums,
			formats,
			information,
			references
		},
		structure: schema.join('\n\n')
	}
	for(const field in Api.instruction){
		Api.instruction[field] = Array.from(Api.instruction[field])
	}
	Api.instruction.type = type_map
	Api.instruction = window.modules.meta.text(Api.instruction)
	Api.definitions = window.modules.meta.text(Api.definitions)
	return Api


	//scope actions
	function filter_format(entry){ return formats.has(entry[0]) === false }

})