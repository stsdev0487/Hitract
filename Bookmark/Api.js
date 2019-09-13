import * as Data from 'Hitract/Api/Data';
import Valid from 'Hitract/Api/Valid';
const ApiTypeDefinition = Symbol('ApiType')

export const ApiSymbol = {
	author: Symbol.for('author'),
	source: Symbol.for('source'),
	type: Symbol.for('data type')
}

export const ApiTypes = {
	Company: {
		Identity: {
			Post: [
				{"companyPostId": null}
			],
			Profile: [
				{"companyId": null},
				{"id": null}
			]
		},
		Type: {
			Post: [
				{"feedPostType": "companyPost"},
				{"type": "CompanyPostDTO"},
			],
			Profile: [
				{"type": "CompanyDTO"}
			]
		}
	},
	Course: {
		Identity: {
			Profile: [
				{"courseId": null},
				{"id": null}
			]
		},
		Type: {
			Profile: [
				{"type": "CourseDTO"}
			]
		}
	},
	Institution: {
		Identity: {
			Profile: [
				{"institutionId": null},
				{"id": null}
			]
		},
		Type: {
			Post: [
				{"feedPostType": "institutionPost"},
				{"type": "InstitutionPostDTO"},
			],
			Profile: [
				{"type": "InstitutionDTO"}
			],
			Search: [
				{"type": "InstitutionSearchDTO"}
			]
		}
	},
	Student: {
		Identity: {
			Post: [
				{"studentPostId": null}
			],
			Profile: [
				{"studentId": null},
				{"id": null}
			]
		},
		Type: {
			Post: [
				{"feedPostType": "studentPost"},
				{"type": "StudentPostDTO"},
			],
			Profile: [
				{"type": "StudentDTO"}
			]
		}
	}
}

export function ApiType(data){
	let type = getApiType(data)
	if(type === null) type = getApiType(getApiSymbolData(data))
	return type
}

export function ApiIdentity(data, type){
	if(Valid.data(type) === false) type = ApiType(type)
	if(Valid.data(type) === false) return null
	if(type.name in ApiTypes){
		const Identity = Data.get(ApiTypes, `${type.name}.${type.variant}.Identity`)
		if(Valid.array(Identity)){
			for(const property of Identity){
				const field = Object.keys(property)[0]
				const value = Data.get(data, field)
				if(Valid(value)) return value
			}
		}
	}
	return null
}


function getApiType(data){
	//if(Valid.array(data)) return (data.forEach(ApiType), data)
	if(Valid.data(data) === false) return null
	if(ApiTypeDefinition in data) return data[ApiTypeDefinition]
	for(const name in ApiTypes){
		const type = ApiTypes[name]
		for(const [variant, entries] of Object.entries(type)){
			for(const entry of entries){
				const property = Object.entries(entry)[0]
				if(property[1] !== null){
					if(Data.get(data, property[0]) === property[1]){
						return data[ApiTypeDefinition] = Object.freeze({name, variant})
					}
				}
			}
		}
	}
	return null
}

function getApiSymbolData(data){
	if(Valid.object(data) === false) return null
	for(const symbol of Object.values(ApiSymbol)){
		if(symbol in data) return data[symbol]
	}
	return null
}

export function dataType(data){ return Valid.object(data) && data[ApiSymbol.type] ? data[ApiSymbol.type]:null }

export function parameter(){
	const id = ApiIdentity(...arguments)
	return Valid(id) ? {id}:null
}
