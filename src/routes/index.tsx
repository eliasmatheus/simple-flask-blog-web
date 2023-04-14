import { createBrowserRouter } from 'react-router-dom';
import Article from '../pages/Article';
import ArticleEditor from '../pages/ArticleEditor';
import Root from '../pages/Root';
import Authors from '../pages/Authors';
import AuthorForm from '../pages/AuthorForm';

const Router = createBrowserRouter([
  { path: '/', element: <Root /> },
  { path: '/article/:id', element: <Article /> },
  { path: '/new-article', element: <ArticleEditor /> },
  { path: '/edit-article/:id', element: <ArticleEditor /> },

  { path: '/authors', element: <Authors /> },
  { path: '/new-author', element: <AuthorForm /> },
  { path: '/edit-author/:id', element: <AuthorForm /> },
  { path: '/authors', element: <Authors /> },
]);

export default Router;
