import React from "react";
import Type from 'prop-types';
import {letting} from 'Hitract/UI';
import {Area,FeedPost} from 'Hitract/Component';
import {dataType} from 'Hitract/Bookmark';
import Api,{Data,not} from 'Hitract/Api';


export default class HitractFeed extends React.Component {
    static Posts = Posts
    static List = PostList
    state={
        dataSource: [],
        loading: true,
        error: null
    }
    componentDidMount(){ Api.mount(this)}
    componentWillUnmount(){Api.unmount(this)}
    refresh(reload=true){
        Posts(reload).then(response=>{
            if(Api.mounted(this)){
                this.setState({
                    dataSource: response,
                    loading: false
                })
            }
        })
    }
    render() {
        return (<Area header={letting.medium}
                      loading={this.state.loading}
                      refresh={this.refresh.bind(this)}>
            {PostList(this.state.dataSource)}
        </Area>);
    }
}

//scope actions
async function Posts(reload){
    let dataSource = null
    try{
        if(Api.authenticated) {
            dataSource = await Api.account.feed({reload})
        }
    }
    catch(error){ console.error(error) }
    return Array.isArray(dataSource) ? dataSource:[]
}

export function PostList(posts){
    if(Array.isArray(posts) === false) return null
    return posts.map(postCreate).filter(postFilter).map(postItem)
}

function postCreate(item){ return FeedPost.DataSource(item) }

function postFilter(item){ return dataType(item) !== null }

function postItem(item,index){
    return (<FeedPost {...item} type={dataType(item)}  key={`post-${index}`}></FeedPost>)
}


