const Search = require('./Search')
const http_server = Symbol.for('server')

class Project{
	constructor(){
		this.meta = require('./setting')
		this.search = new Search(this.folder, ...(this.meta.search.targets||[]))
		this.url = project_url(this)
	}

	get folder(){ return this.meta.folder.project }
	get host(){ return this.meta.data.project.host || 'localhost' }
	open(){ return project_open.apply(this,arguments) }
	get port(){ return this.meta.data.project.port || 8888 }
	get protocol(){ return this.meta.data.project.protocol || 'http' }
	async start(){ return await project_start.apply(this, arguments) }
	service(){ return project_service.apply(this,arguments) }
	get server(){ return project_server.call(this) }
	get website(){ return this.meta.folder.site }
}

//exports
module.exports = new Project()

//scope actions
function project_url({host, protocol, port}){
	const {URL} = require('url')
	const url = new URL(`${protocol}://${host}`)
	if(host === 'localhost') url.port = port
	return url.href
}
function is_running(port){
	let server = require('net').createServer()
	return new Promise(function on_running_promise(success, fail){
		server.once('error', on_error)
			  .once('listening', on_listening)
			  .listen(port)

		//scope actions
		function on_close(){ return (server = null, success(false)) }
		function on_error(error){ return (server = null, error.code !== 'EADDRINUSE' ? success(true):fail(error)) }
		function on_listening(){ server.once('close', on_close).close() }
	})
}

async function project_open(){
	//const Opener = require('open')
	try{
		const options = this.meta.data.project.opener || {}
		if('app' in options === false) options.app = 'google chrome'
		await project_open_browser(this.url, options)
	}
	catch(error){ console.warn('Developer: Peer dependency module: "open" is not installed.') }
}

function project_server(){ return http_server in this ? this[http_server]:this[http_server] = require('express').call(null) }

function project_service(instruction){ return (this.instruction = instruction, this) }

async function project_start(){
	if(await is_running(this.port)) return this
	if('instruction' in this) await this.instruction()
	return (delete this.instruction, await start_server(this), this)

	//scope actions
	function start_server({server, port}){ return new Promise(success=>server.listen(port, ()=>success(true))) }
}

async function project_open_browser(target, options){
	'use strict'
	const path = require('path')
	const childProcess = require('child_process')
	const fs = require('fs')

	const pAccess = require('util').promisify(fs.access)
	const pExecFile = require('util').promisify(childProcess.execFile)

	if(typeof target !== 'string') throw new TypeError('Expected a `target`')
	options = {
		android: process.platform === 'android',
		background: false,
		mac: process.platform === 'darwin',
		wait: false,
		...options
	}

	let appArguments = []
	const cliArguments = []
	const childProcessOptions = {}

	if(Array.isArray(options.app)){
		appArguments = options.app.slice(1)
		options.app = options.app[0]
	}

	let open_command = null
	if(options.mac) open_command =await mac()
	else if(options.windows) open_command = await windows()
	else open_command = await others()

	cliArguments.push(target)
	if(options.mac && appArguments.length > 0) cliArguments.push('--args', ...appArguments)
	if(open_command){
		const subprocess = childProcess.spawn(open_command, cliArguments, childProcessOptions)
		subprocess.unref()
		return subprocess
	}

	throw new Error('Developer: An error occurred. Could not open process.')

	//scope actions
	function mac(command = null){
		command = 'open'
		if(options.wait) cliArguments.push('--wait-apps')
		if(options.background) cliArguments.push('--background')
		if(options.app) cliArguments.push('-a', options.app)
		return command
	}

	async function others(command = null){
		if(options.app) command =  options.app
		else{

			// Path to included `xdg-open`
			const localXdgOpenPath = path.join(__dirname, 'xdg-open')
			// When bundled by Webpack, there's no actual package file path and no local `xdg-open`.
			const isBundled = !__dirname || __dirname === '/'

			// Check if local `xdg-open` exists and is executable.
			let exeLocalXdgOpen = false
			try{
				await pAccess(localXdgOpenPath, fs.constants.X_OK)
				exeLocalXdgOpen = true
			}
			catch(error){}

			const useSystemXdgOpen = process.versions.electron || process.platform === 'android' || isBundled || !exeLocalXdgOpen
			command = useSystemXdgOpen ? 'xdg-open':localXdgOpenPath
		}

		if(appArguments.length > 0){
			cliArguments.push(...appArguments)
		}

		// `xdg-open` will block the process unless stdio is ignored
		// and it's detached from the parent even if it's unref'd.
		childProcessOptions.stdio = 'ignore'
		childProcessOptions.detached = true
		return command
	}

	async function windows(command = null){
		try{
			const isWsl = require('is-wsl')
			if(process.platform === 'win32' || isWsl){
				command = 'cmd' + (isWsl ? '.exe':'')
				cliArguments.push('/c', 'start', '""', '/b')
				target = target.replace(/&/g, '^&')

				if(options.wait){
					cliArguments.push('/wait')
				}

				if(options.app){
					if(isWsl && options.app.startsWith('/mnt/')){
						const windowsPath = await wslToWindowsPath(options.app)
						options.app = windowsPath
					}

					cliArguments.push(options.app)
				}

				if(appArguments.length > 0){
					cliArguments.push(...appArguments)
				}
			}
		}
		catch(error){
			throw new Error('Developer: To open tool in a browser for "Windows" install "is-wsl" module from npm.')
		}
		return command

		//scope actions
		async function wslToWindowsPath(path){
			// Convert a path from WSL format to Windows format:
			// `/mnt/c/Program Files/Example/MyApp.exe` → `C:\Program Files\Example\MyApp.exe`
			const {stdout} = await pExecFile('wslpath', ['-w', path])
			return stdout.trim()
		}
	}
}








