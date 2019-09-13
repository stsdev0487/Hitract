import Api, {Data, Valid} from 'Hitract/Api'
import {avatar,ApiSymbol,dataType} from 'Hitract/Bookmark';

const Post = {
	companyPost: {
		commentCount: 'object.comments',
		'content.created': 'object.created',
		author: 'object.postAuthor',
		[ApiSymbol.author]: {
			id: 'companyId',
			name: 'companyName',
			pictureUrl: 'pictureUrl'
		},
		'content.variant': 'object.postType',
		'content.description': 'object.postText',
		'content.id': 'object.companyPostId',
		'content.pictureUrl': ['object.image', 'object.resource'],
		likes: 'object.likes',
		'content.logo': 'object.logo',
		'content.source': 'object.source',
		'content.posted': 'object.createdAgoString',
		'content.title': 'object.header',
		'content.updated': 'object.updated',
		comments: 'objects',

	}
}

export const PostTypes = {
	companyPost: 'Company',
	studentPost: 'Student',
	institutionPost: 'University'
}

const PostDefault = {
	'author.pictureUrl': avatar,
	'commentCount': 0,
	comments: [],
	'likes': []
}

//exports
export default function DataSource(dataSource){ return createTypeData(dataSource) }
DataSource.Types = PostTypes
DataSource.type = data=>dataType(data)

//scope actions
function createTypeData(dataSource){
	const type = Data.get(dataSource, 'feedPostType')
	const map = type in Post ? Post[type]:null
	let dataset = mapData(dataSource, map, type)
	dataset = dataEntries(dataset)
	return defineDefaults(dataset,type)
}

function defineDefaults(data, type){
	for(const field in PostDefault){
		if(Data.has(data, field) === false){
			Data.set(data, field, PostDefault[field])
		}
	}
	if(type && type in PostTypes) data[ApiSymbol.type] = PostTypes[type]
	return data
}

function mapData(source, map, type, data = {}){
	data[ApiSymbol.source] = source
	if(Valid.data(source) && Valid.data(map)){
		for(let field in map){
			if(Valid.text(field)){
				const multiple = Valid.array(map[field])
				const aliases = multiple ? map[field]:[map[field]]
				for(const alias of aliases){
					const value = Data.get(source, alias)
					if(Valid(value)){
						if(Data.has(data, alias) && multiple){
							field = `field-${aliases.indexOf(alias) + 1}`
						}
						Data.set(data, field, value)
					}
				}
			}
		}
		if(type && type in PostTypes) data[ApiSymbol.type] = PostTypes[type]
		for(const field in data){
			const symbol = Symbol.for(field)
			if(symbol in map){
				data[field] = mapData(data[field], map[symbol], type)
			}
		}
	}

	return data
}

function dataEntries(data){
	for(const field in data){
		const value = dataValue(field, data[field])
		if(value === null) delete data[field]
		else data[field] = value
	}
	return data
}

function dataValue(field, value){
	if(Valid.data(value)) return dataEntries(value)
	if(Valid.text(field)){
		if(Valid(value)) switch(field){
			case 'created':
			case 'updated':
				value = new Date(value)
				if(Valid(value) === false) value = null
				break
			default:
				if(field.endsWith('Url')){
					if(Valid.text(field) && value.startsWith('http') === false){
						value = `${Api.url(value)}?size=medium`
					}
				}
				break
		}
	}
	return value
}
