import React, { useState } from 'react'
import moment from 'moment'
import { useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp ,faDeleteLeft, faEllipsis} from '@fortawesome/free-solid-svg-icons';
import {deletePost, likePost} from '../../../actions/posts'


function Post({post  , setCurrentId , isUpdatePost , setIsUpdatePost,isCreatePost }) {

const dispatch = useDispatch();

const [isExpanded, setIsExpanded] = useState(false)
const [isZoomed, setIsZoomed] = useState(false)

const clickToggle=()=>{
  setIsExpanded(!isExpanded)
}

//expand Post
const togglePostExpand=()=>{ 
  setIsZoomed(!isZoomed)
}
// expand message 
const truncatedContent = (!isExpanded && post.message.length > 20 ) ?   (post.message.slice(0, 20) + '...') : post.message;

  return (
      <div className="card  rounded-1 text-start "  >
      <div  style={{height:'22vh'}}>
      <div className='position-absolute w-100 p-2' > 
        <div className=" d-flex justify-content-between  align-items-center   ">
          <h6 className='text-light me-0' style={{textShadow:" 0 0 2px black"}}>{post.creator}</h6>
          <button type='button' style={{background: 'none',border:' none'}} 
          onClick={
            ()=>{setCurrentId(post._id);
              if(isUpdatePost){
                setIsUpdatePost(!isCreatePost)
              }else 
              setIsUpdatePost(!isUpdatePost)
            }}
          >
            <FontAwesomeIcon icon={faEllipsis} size='xl' /></button>
        </div>
        <span className='text-light' style={{textShadow:" 0 0 2px black"}}>{moment(post.createdAt).fromNow()}</span>
      </div>
        <img src={post.selectedFile} className="card-img-top " alt="memo"   style={{maxHeight:'52vh'}} />
    
      </div>
        <div className="card-body bg-dark rounded-bottom-1 text-secondary " style={{height:'30vh'}} > 
      <h6 className="card-title " >{post.tags?.map((tag)=>`${tag} `)}</h6>
        <h5 className="card-title ">{post.title}</h5>
        <p className="card-text " onClick={()=>clickToggle()} >  {truncatedContent} </p>
        <div className="d-flex justify-content-around position-absolute bottom-0 "  >
          <button type='button' className=' btn btn-sm text-secondary'  onClick={()=>dispatch(likePost(post._id))}><FontAwesomeIcon icon={faThumbsUp} /> Like {post.likeCounter} </button>
          <button type='button'className=' btn btn-sm text-secondary' onClick={()=> dispatch(deletePost(post._id))}><FontAwesomeIcon icon={faDeleteLeft} /> Delete </button>
        </div>
        </div>
      
      </div>
  ) 
}

export default Post