import { createBrowserRouter } from 'react-router-dom';
import Article from '../pages/Article';
import Root from '../pages/Root';

const Router = createBrowserRouter([
  { path: '/', element: <Root /> },
  { path: '/article', element: <Article /> },
]);

export default Router;
