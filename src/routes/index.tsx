import { createBrowserRouter } from 'react-router-dom';
import Article from '../pages/Article';
import ArticleEditor from '../pages/ArticleEditor';
import Root from '../pages/Root';

const Router = createBrowserRouter([
  { path: '/', element: <Root /> },
  { path: '/article/:id', element: <Article /> },
  { path: '/new-article', element: <ArticleEditor /> },
]);

export default Router;
