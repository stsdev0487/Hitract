const entry = require('./entry')
const assets = ['assets','android', 'ios', 'node_modules', 'images']
const developer = ['.', '@', '__']


const filter = {
	folders(){ return arguments[0].get('type').folder },
	files(){ return arguments[0].get('type').file },
	developer(){
		const value = entry.clean(entry.locator(arguments[0]))
		for(const prefix of developer){
			if(value.startsWith(prefix)) {
				return false
			}
		}
		return true
	},
	assets(){ return assets.includes(arguments[0].name) === false }
}

//exports
module.exports = filter