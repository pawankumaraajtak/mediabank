import React from 'react'
import UploadBox from '../components/UploadBox'
import MainLayout from '../layouts/MainLayout'
import UploadButton from '../components/UploadButton';
import { useLocation } from 'react-router-dom';
import RightNav from '../components/RightNav';
import DragBox from '../components/DragBox';

export default function DragDropFile(props) {

    const location = useLocation();
    //console.log("location", location)

  return (
    <MainLayout>
       <div className='upload__page'><RightNav /></div>
        <DragBox selectedFile={location?.state?.selectedFile} />
    </MainLayout>
  )
}
