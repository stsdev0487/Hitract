(async function define_module(...x){ const define = async (module, ...inputs)=>await window.modules.define('applet', {value:await module(...inputs)}); return window.modules.has('applet')?window.modules.get('applet'):await (async ([module],asyncs,...inputs)=>await define(module, ...(await Promise.all(asyncs)).concat(inputs)))(x.splice(0, 1),(x=x.map(i=>i instanceof Promise?async ()=>await i:i).reduce((l, i)=>((typeof(i)==='function'&&i.constructor.name==='AsyncFunction')?l[0].push(i()):l.push(i),l),[[]]))[0], ...x.slice(1, x.length)); })
(async function export_module(){
	window.modules.import('font').then(font=>font.load('san-francisco')).catch(console.error)


	return {
		body: window.document.body,
		get console(){ return this.body.gui.console },
		get search(){ return this.body.gui.search }
	}


})