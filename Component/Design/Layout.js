/*Grid layout functions to render component view*/
import React from 'react';
import {ScrollView} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Data,Valid,Id} from 'Hitract/Api';


//Grid layout with columns for horizontally displayed content in a flex-ing container
export function columnLayout(property){
	property = layoutProperty('grid', property)
	return (<Grid key={property.identifier}>{property.items.map(onColumn, property)}</Grid>)
}

//Configures property for type of layout
function layoutProperty(type, property){
	property = Valid.data(property) ? property:{attributes: {}, children: []}
	property.attributes = Data.get(property, 'attributes') || {}
	property.identifier = property.identifier || Id(`${type}-`)
	property.layoutProperty = type
	return property
}

//Grid layout with rows for vertically displayed content in a flex-ing container
export function rowLayout(property){
	property = layoutProperty('grid', property)
	return (<Grid id={property.identifier}>{property.items.map(onRow, property)}</Grid>)
}


//Single column of a columnLayout (requires binding of grid property)

function onColumn(column, index){
	column.identifier = column.identifier || `${this.identifier}-column-${index}`
	return (<Col key={column.identifier} {...column.attributes}>{column.children}</Col>)
}

//Single row of a rowLayout (requires binding of grid property)
function onRow(row, index){
	row.identifier = row.identifier || `${this.identifier}-row-${index}`
	return (<Row key={row.identifier} {...row}></Row>)
}


/*ScrollView layout for components*/
/*alwaysBounceHorizontal
	alwaysBounceVertical
	automaticallyAdjustContentInsets
	bounces
	bouncesZoom
	canCancelContentTouches
	centerContent
	contentContainerStyle
	contentInset
	contentInsetAdjustmentBehavior
	contentOffset
	decelerationRate
	directionalLockEnabled
	disableIntervalMomentum
	disableScrollViewPanResponder
	endFillColor
	horizontal
	indicatorStyle
	invertStickyHeaders
	keyboardDismissMode
	keyboardShouldPersistTaps
	maintainVisibleContentPosition
	maximumZoomScale
	minimumZoomScale
	nestedScrollEnabled
	onContentSizeChange
	onMomentumScrollBegin
	onMomentumScrollEnd
	onScroll
	onScrollBeginDrag
	onScrollEndDrag
	onScrollToTop
	overScrollMode
	pagingEnabled
	persistentScrollbar
	pinchGestureEnabled
	refreshControl
	removeClippedSubviews
	scrollBarThumbImage
	scrollEnabled
	scrollEventThrottle
	scrollIndicatorInsets
	scrollPerfTag
	scrollToOverflowEnabled
	scrollsToTop
	DEPRECATED_sendUpdatedChildFrames
	showsHorizontalScrollIndicator
	showsVerticalScrollIndicator
	snapToAlignment
	snapToEnd
	snapToInterval
	snapToOffsets
	snapToStart
	stickyHeaderIndices
	zoomScale
	flashScrollIndicators
	scrollTo
	scrollToEnd
	scrollWithoutAnimationTo
	*/
export function scrollLayout(property){
	property = layoutProperty('scroll', property)
	return (<ScrollView {...attributes}>{property.children}</ScrollView>)
}





//TESTING SNIPPETS

export function testDynamicLayout(count = 5, on_row){
	return (<Grid>{new Array(count).map((item, index)=>({index, type: 'row', container: {}, text: {attributes: {}, value: ''}}))
								   .map(on_row)
								   .map(item=>{
									   if(item.type === 'heading'){
										   return (<Row style={{fontWeight: 'bold', height: 20}} {...item.container} >
											   <Text {...item.text.attributes}>{item.text.value}</Text>
										   </Row>)
									   }
									   else if(item.type === 'row'){
										   return (<Row {...item.container}>
											   <Text {...item.text.attributes}>{item.text.value}</Text>
										   </Row>)
									   }
									   else if(item.type === 'column'){
										   return (<Col {...item.container}></Col>)
									   }
									   return null
								   })
	}</Grid>)

}

export function testGridLayout(grid){
	grid.identifier = grid.identifier || Id('grid')
	return (<Grid key={grid.identifier}>{rows(grid.rows, grid)}</Grid>)

	function columns(items, grid, row){
		if(Array.isArray(items) === false) return null
		return items.map((column, index)=>{
			column.identifier = `${row.identifier}-${index}`
			return (<Col key={column.identifier} {...column} grid={grid} row={row}>{column.rows && rows(column.rows, grid, column)}</Col>)
		})
	}

	function rows(items, grid, column){
		if(Array.isArray(items) === false) return null
		return items.map((row, index)=>{
			row.identifier = `${grid.identifier}-${index}`
			return (<Row key={row.identifier} {...row} grid={grid} column={column}>{row.columns && columns(row.columns, grid, row)}</Row>)
		})
	}
}
