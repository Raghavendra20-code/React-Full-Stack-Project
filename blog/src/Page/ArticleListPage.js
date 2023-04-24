import articles from "./ArticleContent";
import ArticlesList from "../Component/ArticlesList";
const ArticleListPage = () =>{
    return(
        <>
            <ArticlesList articles={articles}/>
        </>
    )
}

export default ArticleListPage;