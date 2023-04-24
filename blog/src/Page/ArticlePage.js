
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import articles from "./ArticleContent";
import NotFoundPage from "./NotFoundPage";
import axios from 'axios';
import Comments from '../Component/Comments';
import AddComment from '../Component/AddComment';
import useUser from '../hooks/useUser'

const ArticlePage = () =>{
    const {articleid} = useParams();
    const [articleInfo,setArticleInfo] = useState({upvote:0,commments:[], canUpvote: false});
    const {canUpvote} = articleInfo;
  //  const {articleid} = param.articleid;

  const {user,isLoading} = useUser();
    useEffect(()=>{
        const getData = async () =>{                  //this function is used because we can't make useEffect callback direct async
            const token = user && user.getIdToken();
            let tokenId;
            await token.then(d=>{
                tokenId = d;
            });
            const headers = tokenId ? {authtoken:tokenId}:{};
         const response = await axios.get(`http://localhost:8000/api/articles/${articleid}`,{headers});
         setArticleInfo(response.data)
            
        }
        if(!isLoading){
            getData();
        }
        
        
    },[isLoading,user,articleid])
    const article = articles.find(article => articleid === article.name);
    if(!article){
        return <NotFoundPage/>
    }

    const upVote = async () =>{
        const token = user && user.getIdToken();
        let tokenId;
            await token.then(d=>{
                tokenId = d;
            });
            const headers = tokenId ? {authtoken:tokenId}:{};
        const response = await axios.put(`http://localhost:8000/api/articles/${articleid}/upvote`,null,{headers});
        setArticleInfo(response.data);
    }
    return(
        <>
            <h1>{article.title}</h1>
            <div className='upvotes-section'>
    {user ? <button onClick={upVote}>{canUpvote?'upVote':'Already upVoted'}</button>:
                <button>Log In to upVote</button>}
                <p> It has {articleInfo.upvote} upvote(s)</p>
            </div>
            {article.content.map((content,index) => (
                <p key = {index}>{content}</p>
            ))}
            {user ?
            <AddComment
            articleName = {articleid}
            updateArticle = {data => setArticleInfo(data)}/>
            :
            <button>Log In to add a comment</button>
            }
            <Comments comment = {articleInfo.commments}/>
        </>
    )
}

export default ArticlePage;