import React from 'react';
import {align, color, font,letting, viewport} from 'Hitract/UI';
import {Data,Type} from 'Hitract/Api';
import {StyleSheet, Text, View} from 'react-native';
import {Gradient} from '../Design';
const Cluster = {
    scales:[
        {
            minimum: 18,
            maximum: 40,
            words: 10,
            increment: 6
        },
        {
            minimum: 17,
            maximum: 34,
            words: 20,
            increment: 5
        },
        {
            minimum: 16,
            maximum: 33,
            words: 30,
            increment: 5
        },
        {
            minimum: 16,
            maximum: 30,
            words: 40,
            increment: 2
        },
        {
            minimum: 12,
            maximum: 24,
            words: 50,
            increment: 1
        }
    ],
    scale(words){
        for(const scale of this.scales){
            if(words.length <= scale.words) return scale
        }
        return this.scales[this.scales.length-1]
    }
}

const ComponentFrame = {
    minHeight: 116,
    width: viewport.width
}

const ui = StyleSheet.create({

    clusterView:{
        flexDirection: align.row,
        justifyContent: align.center,
        flexWrap: align.wrap,
        paddingTop: letting.standard,
        paddingHorizontal: letting.standard,
        paddingBottom: 112,
    },
    component: {...ComponentFrame},
    word:{
        color: color.white,
        textAlign: align.center,
        flexGrow: 8,
        flexShrink: 12,
        minWidth:'20%',
        margin: letting.small
    }
})


//exports
export default class MetadataNames extends React.Component{
    static propTypes = {  metadataNames:Type.array.isRequired  }
    static defaultProps = { metadataNames:[] }
    render(){
        const cluster = wordCluster(this.props.metadataNames || [])
        return (<View style={ui.component}>
            <Gradient type={'diagonal'} style={StyleSheet.absoluteFill}></Gradient>
            <View style={ui.clusterView}>{cluster.words.map(wordClusterText, cluster)}</View>
       </View>)
    }
}


//scope actions

function wordCluster(values){
    return {
        count(value){ return this.values.filter(word=>word===value).length   },

        get increment(){ return this.scale.increment },
        get minimum(){ return this.scale.minimum },
        get maximum(){ return this.scale.maximum },
        scale: Cluster.scale(values),
        size(word){
            const count = this.count(word)
            const increment = count > 1 ? (count * this.increment):0
            const size = this.minimum + increment
            return size >= this.maximum ? this.maximum:size
        },
        values,
        get words(){ return Array.from(new Set(this.values.sort())) }
    }
}

function wordClusterText(item, index){
    return (<Text key={index} style={[ui.word,{fontSize:this.size(item)}]}>{item}</Text>)
}

