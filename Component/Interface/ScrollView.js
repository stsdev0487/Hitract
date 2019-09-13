import React from 'react';
import Api, {Data} from 'Hitract/Api';
const timer = Symbol('timer')
const duration = 400

export default function ScrollViewInterface(Component){
	return class extends Component{
		constructor(properties){
			super(properties)
			this.scrollView = React.createRef()
		}
		attributes(){ return scrollViewAttributes.apply(this, arguments) }
		componentDidMount(){
			Api.mount(this)
			requestAnimationFrame(()=>this.on('mount'))
		}
		componentWillUnmount(){
			Api.unmount(this)
			stop.call(this)
		}
		on(type, event){

		}
		to(position){
			if(Api.mounted(this)){
				this.scrollView.scrollTo(...arguments)
			}
			return this
		}
	}
}

//scope actions
function scrollViewAttributes(){
	return Data.copy({
		ref:(scrollView)=>this.scrollView=scrollView,
		onContentSizeChange:(...size)=>onContentSizeChange.call(this, ...size),
		onScrollBeginDrag:event=>onScroll.call(this, event, 'begin'),
		onScrollEndDrag: event=>onScroll.call(this, event, 'end'),
		onMomentumScrollEnd:event=>onScroll.call(this, event, 'stop')
	}, ...arguments)
}

function onContentSizeChange(width, height){ this.on('size', this.size = {width, height}) }

function onScroll(event, type){
	if(stop.call(this)){
		const message = event.nativeEvent
		switch(type){
			case 'stop':
				this.on('stop', message)
				break
			case 'begin':
				this.on('scrolling', message)
				break
			case 'end':
				start.call(this, ()=>this.on('idle', message))
				break
		}
	}

}

function stop(){
	if(typeof this[timer] === 'number'){
		clearTimeout(this[timer])
		delete this[timer]
	}
	return true
}

function start(onIdle){
	if(stop.call(this)){
		this[timer] = setTimeout(onIdle, duration)
	}
}