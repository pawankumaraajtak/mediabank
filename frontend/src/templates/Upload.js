import React from 'react'
import UploadBox from '../components/UploadBox'
import MainLayout from '../layouts/MainLayout'
import { useLocation } from 'react-router-dom';
import RightNav from '../components/RightNav';

export default function Upload(props) {

    const location = useLocation();
    //console.log("location", location)

  return (
    <MainLayout>
       <div className='upload__page'><RightNav /></div>
        <UploadBox selectedFile={location?.state?.selectedFile} />
    </MainLayout>
  )
}
