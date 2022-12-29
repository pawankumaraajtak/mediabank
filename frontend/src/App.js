import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
// import Home from './components/Home';
import HomePage from './templates/HomePage';
import Folders from './templates/Folders';
import Folder from './components/Folder';
import Upload from './templates/Upload';
import SearchPage from './templates/SearchPage';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/upload",
      element: <Upload />,
    },
    {
      path: "/search",
      element: <SearchPage />,
    },
    {
      path: "/search/:keyword",
      element: <SearchPage />,
    },
    // {
    //   path: "/folders",
    //   element: <Folders />,
    // },
    // {
    //   path: "/folders/:folderId",
    //   element: <Folder />,
    // },
    // {
    //   path: "/upload/:folderId",
    //   element: <Upload />,
    // },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
