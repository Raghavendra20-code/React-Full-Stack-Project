import './App.css';
import HomePage from './Page/HomePage';
import AboutPage from "./Page/AboutPage";
import ArticleListPage from "./Page/ArticleListPage";
import ArticlePage from "./Page/ArticlePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./NavBar";
import NotFoundPage from "./Page/NotFoundPage";
import LoginPage from './Page/LoginPage';
import CreateAccountPage from './Page/CreateLoginPage';


function App() {
  return (
    <BrowserRouter><div className="App">
          <NavBar/>
           <div id = 'page-body'>
              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path='/about' element={<AboutPage/>}/>
                  <Route path='/articles' element={<ArticleListPage/>}/>
                  <Route path='/articles/:articleid' element={<ArticlePage/>}/>
                  <Route path = '/login' element={<LoginPage/>}/>
                  <Route path = '/create-account' element = {<CreateAccountPage/>}/>
                  <Route path='*' element={<NotFoundPage/>}/>
              </Routes>
          </div> 
      </div>
</BrowserRouter>
  );
}

export default App; 
