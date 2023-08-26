import mongoose from "mongoose";
import PostMessage from "../modals/postMessage.js"

export const getPosts=async (req,res)=>{
   try {
    const postMessages=await PostMessage.find();

    res.status(200).json(postMessages)  ;
   } catch (error) {
    res.status(400).json({message:error.message });
   }
}

export const createPost = async (req,res) => {
        const { title, message, selectedFile, creator, tags } = req.body;
        const newPost=new PostMessage({ title, message, selectedFile, creator, tags });
        try {
            await newPost.save();
            res.status(201).json(newPost );
    } catch(error) {
             res.status(401).json({ message: error.message })

    }
}

export const updatePost =async (req,res)=>{
    const {id:_id} = req.params;
    const post =req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('update action is failed ')

    const updatedPost= await PostMessage.findByIdAndUpdate(_id , post , {new:true})
    res.json(updatedPost);
}
export const deletePost =async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('delete action is failed :( ! ')

    const deletedPost= await PostMessage.findByIdAndRemove(id);
    res.json({message : 'Post deleted successfully'});
}

export const likePost = async(req,res) =>{
    const {id} = req.params;
    const post = await PostMessage.findById(id);
    if(!mongoose.Types.ObjectId.isValid(id)) return  res.status(404).send("Post's ID doesn't exist :( ! ");
    const likedPost =await PostMessage.findByIdAndUpdate(id , {likeCounter : post.likeCounter+1} , {new:true} );
    res.json(likedPost);

}
