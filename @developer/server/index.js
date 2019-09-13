const {project} = require('../')


//exports
module.exports = project.service(()=>{
	const express = require('express')
	const parser = require('body-parser')
	// parse application/x-www-form-urlencoded
	project.server.use(parser.urlencoded({extended: false}))
	// parse application/json
	project.server.use(parser.json())

	project.server.use(express.static(project.website))

	project.server.post('/search', on_search)
})


//scope actions
function on_search(request, response){
	try{ response.json(project.search.scan(request.body)) }
	catch(error){
		response.json({
			failed: true,
			error: `Node Error:<br>${error.message}<br><br>${error.stack}`
		})
	}
}

