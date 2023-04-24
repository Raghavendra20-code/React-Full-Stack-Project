import axios from 'axios';
import { useState } from 'react';
import useUser from '../hooks/useUser';

const AddComment = ({articleName,updateArticle}) =>{
    const [commentText,setCommentText] = useState('');
    //const [name,setName] = useState('');
    const {user} = useUser();

    const addComment = async () =>{
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        console.log('header:',headers);
        const response = await axios.post(`http://localhost:8000/api/articles/${articleName}/comments`,{
            text : commentText
        },{headers});
        updateArticle(response.data);
         setCommentText('');
    }
    return(
        <div id = 'add-comment-form'>
            <h3>Add a Comment</h3>
    {user&& <p>You are posting as a {user.email}</p>}
            <label>
                Comment:
                <textarea 
                value = {commentText}
                onChange = {e=> setCommentText(e.target.value)}
                rows = '4' 
                cols = '50'/>
            </label>
            <button onClick = {addComment}>Add Comment</button>
        </div>
    )
}

export default AddComment;
