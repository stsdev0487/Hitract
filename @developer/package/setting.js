const fxy = require('fxy')

const developer = fxy.join(__dirname,'../')
const project = fxy.join(developer, '../')
const site = fxy.join(developer,'site')

//exports
module.exports = {
	folder:{
		developer,
		project,
		site
	},
	data: fxy.meta.file.read(fxy.join(site, 'package.meta')),
	get search(){ return this.data.project.search }
}
