import React, { useState , useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector} from 'react-redux'
import {createPosts,updatePost} from '../../actions/posts'
import {StyledCard} from '../../StyledCard'

function Form({currentId,setCurrentId} ) {
  const [postData, setPostData] = useState(
    { 
      title: '',   message: '',creator: '', tags:'', selectedFile: '' 
    }
    );

  const post = useSelector((state)=> currentId ? state.postsReducer.find((p)=>p._id === currentId) : null)

  const dispatch=useDispatch()

  useEffect(() =>{
   if(post) setPostData(post)
  }, [post])

  const handleSubmit=(e)=>{
    e.preventDefault() 
    if(postData.creator === null || postData.message === '' || postData.selectedFile === '' || postData.tags === '' || postData.title === ''  ) return
    if(currentId === 0){
      dispatch(createPosts(postData));
    }else{
      dispatch(updatePost(currentId,postData));
      console.log(postData)
    }
    clear()
  }
  const clear=()=>{
    setCurrentId(0)
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });

  }

  return (

  <StyledCard>
 <form onSubmit={(e)=>handleSubmit(e)}  className='card  mb-2 p-4 rounded-2'  >
        <div className='w-100 bg-dark text-light text-center p-3 rounded-2'> {currentId ? 'Edit Post' :'Create Post'} </div>
  <div className="mb-2">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" placeholder="title" className="form-control" value={postData.title} onChange={(e)=>setPostData({...postData, title: e.target.value})}/>
  </div>
  <div className="mb-2">
    <label htmlFor="message" className="form-label">Message</label>
    <input type="text" className="form-control" placeholder="Leave a message here" value={postData.message}  onChange={(e)=>setPostData({...postData, message: e.target.value})}/>
  </div>
  <div className="mb-2">
    <label htmlFor="creator" className="form-label">Creator</label>
    <input type="text" placeholder="creator" className="form-control" value={postData.creator} onChange={(e)=>setPostData({...postData, creator: e.target.value})}/>
  </div>
  <div className="mb-2">
    <label htmlFor="tags" className="form-label">Tags</label>
    <input type="text" placeholder="tags" className="form-control" value={postData.tags} onChange={(e)=>setPostData({...postData, tags:e.target.value})}/>
  </div>
  <div className='my-3'>
    <FileBase
      type='file'
      multiple={false}
      onDone={({base64})=> setPostData({...postData , selectedFile : base64})}
    />
  </div>
  <div className=' mb-1 d-flex  justify-content-center'>
  <button type="submit" className="btn me-1 text-color-light btn-dark ">Submit</button>
  <button  className="btn text-color-light btn-dark" onClick={()=>clear()}>Clear</button>
  </div>
      </form>
      </StyledCard>
  )
}

export default Form