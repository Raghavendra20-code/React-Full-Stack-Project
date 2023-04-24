//import {Link} from "react-router-dom";
import {Link} from 'react-router-dom';

const ArticlesList = ({articles}) =>{
    return(
        <>
        {articles.map((article,index) =>
                    <Link className='article-list-item' to={`/articles/${article.name}`} key ={index}>
                    <h2>{article.title}</h2>
                    <p>{article.content[0].substring(0,150)}...</p>
                    </Link>
                )}
        </>
    )
}

export default ArticlesList;

/*
<Link className='article-list-item' to={`/articles/${article.name}`}>
</Link>
*/