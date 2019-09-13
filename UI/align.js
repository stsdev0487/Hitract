export const axis = {
	horizontal: 'row',
	vertical: 'column'
}

export const direction = {
	center: 'center',
	justify: 'justify',
	left: 'left',
	right: 'right',
	inherit: 'inherit',
	//textDirection
	leftToRight: 'ltr',
	rightToLeft: 'rtl'
}

export const flex = {
	center: direction.center,
	end: 'flex-end',
	start: 'flex-start',
	stretch: 'stretch'
}

export const flow = {
	inline: 'nowrap',
	row: axis.horizontal,
	rowReverse: 'row-reverse',
	column: axis.vertical,
	columnReverse: 'column-reverse',
	wrap: 'wrap'
}

export const items = {
	...flex,
	around: 'space-around',
	between: 'space-between',
	evenly: 'space-evenly', //justifyContent only
	baseline: 'baseline', //alignItems only
	auto: 'auto' //justifySelf only
}


//export
export default {
	...axis,
	...direction,
	...flex,
	...flow,
	...items
}