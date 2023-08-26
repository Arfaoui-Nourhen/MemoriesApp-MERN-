import React,{useEffect, useState} from "react";
import make_memories from "./images/make_memories.jpg";
import Form from "./components/Form/Form.js";
import Posts from "./components/Posts/Posts.js";
import {useDispatch} from 'react-redux';
import {getPosts} from './actions/posts'
export default function App() {
 const [currentId, setCurrentId] = useState(null)
 const [isCreatePost, setIsCreatePost] = useState(false)
 const [isUpdatePost, setIsUpdatePost] = useState(false)
  const dispatch = useDispatch(); 
  
    useEffect(() => {
      dispatch(getPosts())
    }, [currentId ,  dispatch])
    
  return (
    <div className="container-fluid " style={{backgroundColor:'whitesmoke'}}  >
      <div
        className="w-auto shadow p-1 my-1 bg-white rounded-3 text-center" 
      >
        <span className="fst-italic fw-semibold fs-3 pe-2" style={{fontFamily: 'Monomaniac One', sansSerif:'true'}}>Memories</span>
        <img
          src={make_memories}
          className="img"
          alt="memories"
          style={{width:'4%',height:'8%'}}
        />
        </div>
        <nav className="navbar navbar-dark bg-dark">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>
<div className="collapse" id="navbarToggleExternalContent">
  <div className="bg-dark p-4">
  </div>
</div>
<button className="btn btn-primary m-2" type="button"
 onClick={()=>{
  if(isCreatePost){
    setIsCreatePost(!isCreatePost);
  } else   setIsUpdatePost(!isUpdatePost)}}
  >
   create post 
    </button>
        <div className={ isCreatePost || isUpdatePost ? 'd-lg-flex flex-lg-row-reverse  justify-content-between' : 'd-lg-flex flex-lg-row-reverse justify-content-center '}>
     { (isCreatePost || isUpdatePost) &&  (<div className="collapse show" >

          <div className="p-1 " >
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </div>   
          </div>) }  
       
    
          <div className="">
            <Posts  setCurrentId={setCurrentId} setIsUpdatePost={setIsUpdatePost} isUpdatePost={isUpdatePost} setIsCreatePost={setIsCreatePost} isCreatePost={isCreatePost}/>
          </div>
   
        </div>

    </div>
  );
}