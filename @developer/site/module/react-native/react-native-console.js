(async function(...x){const define = async (component, ...inputs)=>await (window.customElements.define('react-native-console', await component(...inputs)), window.customElements.whenDefined('react-native-console')); return typeof(window.customElements.get('react-native-console'))==='undefined'?await (async ([component], asyncs, ...inputs)=>await define(component,...(await Promise.all(asyncs)).concat(inputs)))(x.splice(0, 1),(x=x.map(i=>i instanceof Promise ? async ()=>await i:i).reduce((l,i)=>((typeof(i)==='function'&&i.constructor.name==='AsyncFunction')?l[0].push(i()):l.push(i),l),[[]]))[0],...x.slice(1, x.length)):true})
(async function ReactNativeConsoleComponent(){
	const {is} = window.modules

     //ReactNativeConsole.source_code
    class ReactNativeConsole extends HTMLElement{
        constructor(){
            super()
            this.attachShadow({mode:'open'}).innerHTML = `
                <style>
                	:host{
                		display:none;
                		position: absolute;
                		font-family: Helvetica, Verdana, sans-serif;
						margin: 0;
						padding: 0;
						z-index: 1000;
						height: 50vh;
						max-height: 50vh;
						width: 100vw;;
						max-width: 100vw;
						bottom: 0px;
						overflow: hidden;
						
                	}
                    #view{
                        display: flex;
                        flex:1;
                        position: absolute;
                        top:0;
                        left:0;
                    }
                   
					  .shortcut {
						border-radius: 4px;
						color: #eee;
						background-color: #333;
						font-family: "Monaco", monospace;
						font-size: medium;
						letter-spacing: 3px;
						padding: 4px;
					  }
					  .content {
						padding: 10px;
					  }
					  :host([dark]) {
						background-color: #242424;
						color: #afafaf;
					  }
					  :host([dark]) .shortcut {
						color: #c1c1c1;
					  }
					  :host([dark]) a {
						color: #3b99fc;
					  }
					  input[type=checkbox] {
						vertical-align: middle;
					  }
                </style>
                <style>
                	#logs{
                		position: absolute;
                		top:0;right:0;left:0;bottom:0;
                		overflow: auto;
                		z-index: 100000;
                		background: black;
                		width: 100%;
                		height: 100%;
                		max-height: 100%;
                		
                		
                		font-family: monospace;
                	}
                	#logs > [log]{
                		font-size:12px;
                		color: white;
                		display: block;
                		position: relative;
                		max-width: calc(100% - 20px);
                		margin:20px;
                	}
                	#logs > [log] > code{
                		white-space: pre;
                		padding:2px 7px 2px 7px;
                		overflow: hidden;
                		display: block;
                		position: relative;
                		max-width: calc(100% - 14px);
                	}
                	[log]{
                		color: royalblue;
                	}
                	[error]{
                		color: orange;
                	}
				</style>
                 <div id="logs"></div>
                <div class="content">
					<label for="dark">
					  <input type="checkbox" id="dark"> Dark Theme
					</label>
					<label for="maintain-priority">
					  <input type="checkbox" id="maintain-priority"> Maintain Priority
					</label>
					<p>
					  React Native JS code runs as a web worker inside this tab.
					</p>
					<p>Press <kbd id="shortcut" class="shortcut">⌘⌥I</kbd> to open Developer Tools. Enable <a href="https://stackoverflow.com/a/17324511/232122" target="_blank">Pause On Caught Exceptions</a> for a better debugging experience.</p>
					<p>You may also install <a href="https://github.com/facebook/react-devtools/tree/master/packages/react-devtools" target="_blank">the standalone version of React Developer Tools</a> to inspect the React component hierarchy, their props, and state.</p>
					<p>Status: <span id="status">Loading...</span></p>
			  </div>
			 

            `
        }
        async connectedCallback(){
			const ReactNative = await window.modules.wait('modules.ReactNative', 'modules.ReactNative.connect', true)
        	console.log('connectedCallback');

        	ReactNative.connect()
		}
		add(message){
        	const content = message.input.map(input_map).filter(input_filter).map(input=>{
        		return `<code ${message.type}>${window.modules.meta.text(input)}</code>`
			}).join('')

			this.gui.logs.insert(`<div log>${content}</div>`).start()

			function input_map(value){
        		if(is.array(value)) {
        			value= value.map(input_map).filter(input_filter)
				}
				if(is.data(value)){
					for(const entry in Object.entries(value)){
						if(is.array(entry[0])){
							value[entry[0]] = entry[1].map(input_map).filter(input_filter)
						}
					}
				}

				return value
			}
			function input_filter(value){
        		if(is.array(value)) return value.length > 0
        		return is.not.number(value)
			}
		}
		clear(){
        	this.gui.logs.innerHTML = ''
		}

    }

    //exports
    return ReactNativeConsole

	//scope actions
	function create_frame(component){
		const port = window.modules.project.at('react-native.port')
		const domain = window.modules.project.at('react-native.domain')
		const pathname = window.modules.project.at('react-native.debugger-ui.pathname')
		const url = new URL(domain)
		url.port = port
		url.pathname = pathname
		return window.modules.element.create('iframe',{
			id: 'view',
			onload:on_load,
			onerror:on_error,
			src: url
		})

		//scope actions
		async function on_load(event){
			try{ on_ready(event, await window.modules.wait(event, 'target.contentView', true)) }
			catch(error){ on_error(error) }
		}

		function on_error(error){ component.dispatch('error', {error}) }
		function on_ready(event, content){ component.dispatch('ready', {event, content}) }
	}


})



