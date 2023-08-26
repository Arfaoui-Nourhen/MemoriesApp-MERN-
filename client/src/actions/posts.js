import * as api from '../api'
import * as actions from '../actionTypes'

//ActionCreators File contain the discription of the action 
export const getPosts=()=>async(dispatch)=>{
    try {
        const {data}=await api.fetchPosts();
        dispatch({type:actions.FETCH_ALL,payload:data})
        
    } catch (error) {
        console.log(error.message)
        
    }
}

export const createPosts=(newPost)=>async(dispatch)=>{
    try {
      const {data}=  await api.createPosts(newPost);
        dispatch({type:actions.CREATE,payload:data});

    } catch (error) {
        console.log(error.message)
    }
}
export const updatePost=(id,post)=>async(dispatch)=>{
    try {
      const {data}=  await api.updatePost(id,post);
        dispatch({type:actions.UPDATE,payload:data});

    } catch (error) {
        console.log(error)
    }
}

export const deletePost=(id)=>async(dispatch)=>{
try {
    await api.deletePost(id)
    dispatch({type:actions.DELETE,payload:id})
} catch (error) {
    console.log(error.message)

}
}
export const likePost=(id)=>async(dispatch)=>{
    try {
        const {data} =await api.likePost(id);
        dispatch({type:actions.LIKE_POST,payload:data})
    } catch (error) {
        console.log(error.message)
    }
}