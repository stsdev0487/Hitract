(async function(...x){const define = async (component, ...inputs)=>await (window.customElements.define('search-form', await component(...inputs)), window.customElements.whenDefined('search-form')); return typeof(window.customElements.get('search-form'))==='undefined'?await (async ([component], asyncs, ...inputs)=>await define(component,...(await Promise.all(asyncs)).concat(inputs)))(x.splice(0, 1),(x=x.map(i=>i instanceof Promise ? async ()=>await i:i).reduce((l,i)=>((typeof(i)==='function'&&i.constructor.name==='AsyncFunction')?l[0].push(i()):l.push(i),l),[[]]))[0],...x.slice(1, x.length)):true})
(async function SearchFormComponent(){

	const escape = await window.modules.import.function('convert.xml')

    //
     //SearchForm.source_code
    class SearchForm extends HTMLElement{
        constructor(){
            super()
            this.attachShadow({mode:'open'}).innerHTML = `
                <style>
                    :host{
                   		--x-letting:10px;
                    	--y-letting:5px;
                        display: block;
                        position: absolute;
                        flex-direction: column;
                        flex:1;
                        top:0;
                        left:0;
                        right:0;
                        bottom:0;
                        min-height:100vh;
                        width:100vw;
                        opacity: 1;
                        transition: opacity 180ms ease-in-out;
                        font-family: sans-serif;
                        overflow: hidden;
                        overflow: auto;
                        max-width: 100vw;
                        z-index: 100;
                        background:white;
                    }
                    :host[loading]{
                    	pointer-events: none;
                    	opacity: 0.8;
                    }
                    *{ box-sizing: border-box; }
                    textarea{
                    	display: flex;
                    	flex:1;
                    	width: 100%;
                    	outline: none;
                    	position: relative;
                    	font-size:12px;
                    	font-family: monospace;
                    	background: transparent;
                    	resize: none;
                    	border: 1px solid whitesmoke;
                    	border-radius: 7px;
                    	padding:var(--y-letting) var(--x-letting) var(--y-letting) var(--x-letting);
                    	height: calc(100% - (var(--y-letting) * 2));
                    	max-height: calc(100% - (var(--y-letting) * 2));
                    	margin-top: 3px;
                    }
                    
                    input[type=submit]{  cursor: pointer; }
                    
                    input[type=submit],
                    [include-box] > div{
                    	font-weight: 900;
                    	text-transform: uppercase;
                    	border-radius:7px;
                    	display: flex;
                    	height: auto;
                    	justify-items: center;
     					align-items: center;
     					justify-content: center;
                    	color: #00ee8e;
                    	border: 1px solid whitesmoke;
                    	flex: 1;
                    	outline: none;
                    	height: calc(100% - (var(--y-letting) * 2));
                    	max-height: calc(100% - (var(--y-letting) * 2));
     					padding:0;
     					
                    }
                    
                    input[type=submit]:hover{
                    	background: mediumspringgreen;
                    	border: 1px solid #00d97e;
                    	color: #007247;
                    }
                    
                    input[type=submit]{
                    	margin-top: 3px;
                    	margin-bottom: 3px;
     					font-size: 14px;
     					min-width: 100px;
     					flex-basis: 27px;
                    }
                    [include-box]{
                    	justify-content: space-between;
                    	
                    }
                   
                    [include-box] > space{
                    	height: 10px;
                    	width: 5px;
                    	display:block;
                    }
                    [include-box] > div{
     					font-size: 10px;
     					padding:1px 5px 2px 5px;
     					color: #484a57;
                    }
                     [include-box] > div > label{ 
						   margin-right: 5px;
						  align-content: center;
						  justify-items: center;
						  display: flex;
						  justify-content: center;
						  align-items: center;
                     }
                    
                    
                    form{
                    	display: flex;
                    	flex-direction: column;
                    	width: 100vw;
                    	position: sticky;
                    	top:0;
                    	left:0;
                    	z-index: 2;
                    	background:white;
                    	border-bottom: 1px solid whitesmoke;
                    }
                    [fieldsets]{
                    	display: flex;
                    	padding:10px;
                    	flex:1;
                    	position: relative;
                    	height: 80px;
                    }
                    legend{
                    	font-size:10px;
                    	font-weight: 900;
                    	letter-spacing: 3px;
      
                    	border:none;
                    	color: #e1e0e8;
                    }
                    fieldset{
                    	position: relative;
                    	flex:1;
                    	border: none;
                    	padding:0;
                    	margin:0;
                    	margin-right:10px;
                    }
                    fieldset:nth-of-type(1){ flex:5; }
                    fieldset:nth-of-type(2){ flex:1; }
                    fieldset:nth-of-type(3){ flex:2.8; }
                    
                    [results]{
                    	display: flex;
                    	flex-direction: column;
                    	position: relative;
                    	flex:1;
                    	min-height: 100%;
                    }
                    
                    [keyword]{ font-size: 12px; }
                    [keyword] > [keyword-label]{
                    	background: white;
                    	font-weight: bold;
                    	font-size:14px;
                    	position: sticky;
                    	top:76px;
                    	z-index: 1;
                    	border-bottom: whitesmoke 1px solid;
                    	padding: 3px 5px 3px 8px;
                    	display: flex;
                    	overflow: hidden;
                    }
                    
                    
                    
                    
                    code{ 
                    	display:block;
                    	position: relative;
                    	font-family: monospace;
                    	padding: 4px 4px 4px 8px;
                    	background: #f2f2f2;
                    	border-radius: 7px;
                    	font-size: 10px;
                    
                    	white-space: pre-wrap;
                    	
                    	flex: 1;
                    	max-width: 100%;
                    	overflow: hidden;
                     }
                     
                     [message]{
                     	justify-self: center;
                     	align-self: center;
                     	font-size:23px;
                     	color: #4a1fd2;
                     }
                     
                     
                     [heading]{
                     	display: flex;
                     	justify-content: flex-end;
                     	
                     }
                     number{
                     	font-weight: bold;
                     	font-size:10px;
                     	text-align: left;
                     	display: flex;
                     	align-self: flex-start;
                     	opacity: 0.8;
                     }
          
          
          			code span[any]{ color: #4a1fd2; font-weight: bold; }
                    code span[exact]{ color: #ff5061; font-weight: bold; }
                    
                     
                     [line]{
                     	margin: 3px 10px 3px 10px;
                     }
                     
                     
               
                     [file-label]{
                     	background: transparent;
                     	font-family: monospace;
                     	
                    	font-size:12px;
                    	position: sticky;
                    	top:78px;
                    	padding: 3px 5px 3px 8px;
                    	display: flex;
                    	overflow: hidden;
                    	color: lightslategray;
                    	text-align: right;
                    	justify-content: flex-end;
                    	z-index: 1;
                    	
                    	
                     }
                     
                     [error]{
                     	color:crimson;
                     	margin:20px;
                     	font-size:14px;
                     	font-family: monospace;
                     	border-radius: 7px;
                     	background: rgba(238,21,60,0.09);
                     	border: 1px solid rgba(238,21,60,0.39);
                     	padding:14px;
                     	white-space: pre;
                     	overflow: auto;
                     }
                     
                     img{
                     	max-height: 120px;
                     	object-fit: contain;
                     }
                     [submit-box]{
                     	display: flex;
                     	flex-direction: column;
                     }
                     [include-box]{
                     	display: flex;
                     	flex-direction: row;
                     	align-content: space-between;
                     	justify-content: space-between;
                     	align-items: center;
                     }
                    
                </style>
                <form id="search">
                	<div fieldsets>
						<fieldset>
							<legend>KEYWORDS</legend>
							<textarea name="keywords" id="keywords"></textarea>
						</fieldset>
						<fieldset>
							<legend>TYPES</legend>
							<textarea name="types" id="types"></textarea>
						</fieldset>
						<fieldset>
							<legend><br></legend>
							<div submit-box>
								<input type="submit" value="Search">
								<div include-box>
									<div><label for="modules">module</label> <input id="modules" value="modules" name="include" type="radio"></div>
									<space></space>
									<div><label for="npm">npm</label> <input id="npm" value="npm" name="include" type="radio"></div>
									<space></space>
									<div><label for="os">os</label> <input id="os" value="os" name="include" type="radio"></div>
									<space></space>
									<div><label for="package">package</label> <input id="package" value="package" name="include" type="radio"></div>
									<space></space>
									<div><label for="react">react</label> <input id="react" value="react" name="include" type="radio"></div>
								</div>
							</div>
						</fieldset>
					</div>
				</form>
				
				<div results> 
					<div style="text-align: center;margin-top:60px;font-size: 28px;font-weight: 900;color: #00ee8e;">
					FILE SEARCH
					</div>
				</div>
            `
        }
		get body(){
			return Array.from(this.data).reduce(reduce, {})
			function reduce(data, entry){ return Object.assign(data, {[entry[0]]: entry[1]})}
		}
        connectedCallback(){
        	this.gui.search.onsubmit = async event=>{
        		event.preventDefault()
				await this.search()
			}
		}
		get data(){ return new FormData(this.gui.search) }
		async search(){
        	this.xml.loading = true
			this.results.innerHTML = '<div message><br>Searching project...</div>'
        	const url = new URL('/search', window.location.href)
			try{
				const {data} = await window.modules.http.data(url, this.body)
				if(data.failed) this.results.innerHTML = `<div error>${data.error}</div>`
				else add_results(this, data)
			}
			catch(error){
        		this.results.innerHTML = `<div error>Error:<br>${error.message}</div>`
			}
			this.xml.loading=false
			return this
		}
		get results(){ return this.gui('[results]') }

    }

    //exports
    return SearchForm

    //scope actions
	function add_results(component, data){
		const results = component.results
		if(data.length === 0){
			results.innerHTML = `<div message>
				<br>
				No matches found in contents of project
			</div>`
		}
		else results.innerHTML = data.map(keyword_item).join('')
	}

	function keyword_item([keyword, files]){
		const replacer = (token, type='any')=>`<span ${type}>${escape(token)}</span>`
		const any = new RegExp(keyword, 'i')
		const exact = new RegExp(keyword)
		const tag = new RegExp(escape(keyword), 'i')
		return `<div keyword><div keyword-label>${keyword}</div>${Object.entries(files).map(keyword_file).join('')}<div style="height:80px"></div></div>`
		//scope actions
		function keyword_file([file_name, lines]){
			lines = lines.map(line=>(line.value = escape(line.value), line))
			for(const line of lines){
				if(line.scanned !== false){

					if(exact.test(line.value)){
						for(const token of line.value.match(exact)){
							line.value = line.value.replace(token, replacer(token, 'exact'))
						}
					}
					else{
						const type = any.test(line.value) ? 'any':'tag'
						const expression = type === 'any' ? any:tag
						for(const token of line.value.match(expression)){
							line.value = line.value.replace(token, replacer(token, type))
						}
					}


				}
			}
			return file_item(file_name, lines)
		}
	}
	function file_item(file, lines){
		return `<div file> <div file-label>${file}</div> ${lines.map(line_item).join('')} <div style="height:40px"></div></div>`
	}
	function line_item(item){
		if(item.scanned === false){
			if(item.graphic){
				return `<div line><div heading><number line>FOLDER: ${item.folder}</number></div><img src="${item.graphic}"><br><code>${item.value}</code></div>`
			}
			return `<div line><div heading><number line>FOLDER: ${item.folder}</number></div><code>${item.value}</code></div>`
		}
		return `<div line><div heading><number line>LINE: ${item.line}</number></div><code>${item.value}</code></div>`
	}

})