const project = require('./')
project.start().then(({url})=>{
	console.log(url)
	if(process.argv.includes('--open')) return project.open()

}).catch(error=>{
	console.error(error)
})