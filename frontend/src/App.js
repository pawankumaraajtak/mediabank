import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
// import Home from './components/Home';
import HomePage from './templates/HomePage';
import Folders from './templates/Folders';
import Folder from './components/Folder';
import Upload from './templates/Upload';
import SearchPage from './templates/SearchPage';
import Upload2 from './templates/Upload2';
import DragDropFile from './templates/DragDropFile';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/upload2",
      element: <Upload2 />,
    },
    {
      path: "/upload",
      element: <Upload />,
    },
    {
      path: "/upload-image",
      element: <DragDropFile />,
    },
    {
      path: "/upload-pdf",
      element: <DragDropFile />,
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
