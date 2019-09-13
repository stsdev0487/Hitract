import * as Text from 'Hitract/Api/Text';
const Variants = ['type', 'dash', 'underscore']

export default class Book extends String{
	static expressions(){ return createExpressions(...arguments) }
	constructor(value, identity){
		super(Text.clean(value))
		this.identity = identity
		this.type = Text.type(value)
		this.dash = Text.dash(value)
		this.underscore = Text.underscore(value)
	}
	matches(text){
		if(text === this.toString()) return true
		for(const variant of Variants){
			if(text === this[variant]) return true
			const symbol = Symbol.for(variant)
			if(symbol in this === false) this[symbol] = new RegExp(this[variant],'i')
			if(this[symbol].test(text)) return true
		}
		return false
	}
}


function createExpressions([identity, entries]){
	return [identity, entries.concat([identity]).map(createExpression)]
	//scope actions
	function createExpression(entry){ return new Book(entry, identity) }
}


