
export default class Code extends Number{
	constructor(code, name){
		console.log(code,name)
		super(`0x${code}`)
		this.code = code
		this.name = name
	}
	get character(){ return String.fromCharCode(this) }
	toString(){ return this.character }
}