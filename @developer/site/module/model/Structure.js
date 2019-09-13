(async function define_module(...x){ const define = async (module, ...inputs)=>await window.modules.define('Structure', {value:await module(...inputs)}); return window.modules.has('Structure')?window.modules.get('Structure'):await (async ([module],asyncs,...inputs)=>await define(module, ...(await Promise.all(asyncs)).concat(inputs)))(x.splice(0, 1),(x=x.map(i=>i instanceof Promise?async ()=>await i:i).reduce((l, i)=>((typeof(i)==='function'&&i.constructor.name==='AsyncFunction')?l[0].push(i()):l.push(i),l),[[]]))[0], ...x.slice(1, x.length)); })
(async function export_module(graphql, StructureSchema){
	const {dot,is} = window.modules

	class Structure{
		static get create(){ return create }
		static get read(){ return read }
		constructor(assignment){
			this.assignment = assignment
		}
		context(context={}){ return Object.assign({}, context) }
		query(source, variables, context, operation=undefined){
			return instruct(this.schema, operation_source(source), this, this.context(context), variables, operation)
		}
		mutation(source, variables, context, operation = undefined){
			return instruct(this.schema, operation_source(source, 'mutation'), this, this.context(context), variables, operation)
		}
		get schema(){ return this.assignment.schema }
	}
	return Structure


	//scope actions
	async function create(sequence={}){
		if(is.not.data(sequence)) sequence = {}
		if(dot.has(sequence,'source') && is.array(dot.get(sequence, 'source'))){
			sequence.source = await read(...sequence.source)
		}
		if(dot.has(sequence, 'logic') && is.array(dot.get(sequence, 'logic'))){
			sequence.logic = await read(...sequence.logic)
		}
		sequence.schema = StructureSchema(sequence.source, sequence.logic)
		return new Structure(sequence)
	}

	function instruct(schema, source, root, context, variables, operation, fieldResolver, typeResolver){
		return graphql.graphql(schema, source, root, context, variables, operation)
	}

	async function load(url){
		const type = url.extension === 'graphql' ? 'content':'module'
		return await window.modules.http(url).then(response=>response[type])
	}

	function on_url(value){ return is.url(value) ? value:URL.get(value) }

	function operation_source(source, type='query'){
		if(is.text(source)){
			source = source.trim()
			if(source.startsWith(type) === false) source = `${type}{ ${source} }`
		}
		else source = graphql.instrospectiveQuery
		return source
	}

	async function read(...url){
		return (await Promise.all(url.map(on_url).map(load))).reduce(reduce, null)
		//scope actions
		function reduce(data, entry){
			const text = is.text(entry)
			if(is.nothing(data)) data = text ? '':{}
			return text ? data+entry:Object.assign(data, entry)
		}
	}



}, async function load_assets(){
	//schema: GraphQLSchema,
	//  source: Source | string,
	//  rootValue?: mixed,
	//  contextValue?: mixed,
	//  variableValues?: ?{ +[variable: string]: mixed, ... },
	//  operationName?: ?string,
	//  fieldResolver?: ?GraphQLFieldResolver<any, any>,
	//  typeResolver?: ?GraphQLTypeResolver<any, any>,
	window.modules.import.assets(URL.join('GraphQL.js'))
	await window.modules.wait('moment')
	return await window.modules.wait('modules.graphql', true)
}, function StructureSchema(source, logic={}){
	const {is} = window.modules
	return window.modules.graphql.tools.makeExecutableSchema({
		typeDefs: source,
		resolvers: {
			...logic,
			ISODate: new window.modules.graphql.GraphQLScalarType({
				name: 'ISODate',
				serialize: iso_date_value,
				parseValue: iso_date_value,
				parseLiteral(ast){ return iso_date_value(ast.value) }
			}),
			Date: new window.modules.graphql.GraphQLScalarType({
				name: 'Date',
				serialize: date_value,
				parseValue: date_value,
				parseLiteral(ast){ return date_value(ast.value) }
			}),
			Moment: new window.modules.graphql.GraphQLScalarType({
				name: 'Moment',
				serialize: moment_value,
				parseValue: moment_value,
				parseLiteral(ast){ return moment_value(ast.value) }
			}),
			Timestamp: new window.modules.graphql.GraphQLScalarType({
				name: 'Timestamp',
				serialize: timestamp_value,
				parseValue: timestamp_value,
				parseLiteral(ast){ return timestamp_value(ast.value) }
			}),
			Decimal: new window.modules.graphql.GraphQLScalarType({
				name: 'Decimal',
				serialize(value){
					if(is.number(value)) return value
					else if(is.nothing(value)) return null
					value = is.numeric(value) || is.text.decimal(value) ? parseFloat(value):value
					return is.number(value) ? value:null
				},
				parseValue(value){
					if(is.number(value)) return value
					else if(is.nothing(value)) return null
					value = is.numeric(value) || is.text.decimal(value) ? parseFloat(value):value
					return is.number(value) ? value:null
				},
				parseLiteral({value}){
					if(is.number(value)) return value
					else if(is.nothing(value)) return null
					value = is.numeric(value) || is.text.decimal(value) ? parseFloat(value):value
					return is.number(value) ? value:null
				}
			}),
			Number: new window.modules.graphql.GraphQLScalarType({
				name: 'Number',
				serialize(value){
					if(is.number(value)) return value
					else if(is.nothing(value)) return null
					value = is.numeric(value) || is.text.decimal(value) ? parseFloat(value):value
					return is.number(value) ? value:null
				},
				parseValue(value){
					if(is.number(value)) return value
					else if(is.nothing(value)) return null
					value = is.numeric(value) || is.text.decimal(value) ? parseFloat(value):value
					return is.number(value) ? value:null
				},
				parseLiteral({value}){
					if(is.number(value)) return value
					else if(is.nothing(value)) return null
					value = is.numeric(value) || is.text.decimal(value) ? parseFloat(value):value
					return is.number(value) ? value:null
				}
			}),
			Text: new window.modules.graphql.GraphQLScalarType({
				name: 'Text',
				serialize(value){
					if(is.text(value)) return value
					else if(is.nothing(value)) return null
					return JSON.stringify(value)
				},
				parseValue(value){
					if(is.text(value)) return value
					else if(is.nothing(value)) return null
					return JSON.stringify(value)
				},
				parseLiteral({value}){
					if(is.text(value)) return value
					else if(is.nothing(value)) return null
					return JSON.stringify(value)
				}
			}),
			TF: new window.modules.graphql.GraphQLScalarType({
				name: 'TF',
				serialize(value){
					if(is.TF(value)) return value
					else if(is.nothing(value)) return null
					return Boolean(value)
				},
				parseValue(value){
					if(is.TF(value)) return value
					else if(is.nothing(value)) return null
					return Boolean(value)
				},
				parseLiteral({value}){
					if(is.TF(value)) return value
					else if(is.nothing(value)) return null
					return Boolean(value)
				}
			}),
			Url: new window.modules.graphql.GraphQLScalarType({
				name: 'TF',
				serialize(value){
					if(is.url(value)) return value
					else if(is.nothing(value)) return null
					return URL.get(value)
				},
				parseValue(value){
					if(is.url(value)) return value
					else if(is.nothing(value)) return null
					return URL.get(value)
				},
				parseLiteral({value}){
					if(is.url(value)) return value
					else if(is.nothing(value)) return null
					return URL.get(value)
				}
			})
		}
	})
	//scope actions
	function iso_date_value(value){
		if(is.date.class(value)) return value
		else if(is.nothing(value)) return null
		let date = new Date(value)
		if(is.number(date.getTime())) return date
		return null
	}

	function date_value(value){
		value = iso_date_value(value)
		if(value) return window.moment(value).format('DD/MM/YYYY')
		return value
	}
	function moment_value(value){
		value = iso_date_value(value)
		if(value) return window.moment(value).from()
		return value
	}
	function timestamp_value(value){
		value = iso_date_value(value)
		return value ? value.getTime():null
	}
})