import React from 'react'
import MainLayout from '../layouts/MainLayout'
import UploadButton from '../components/UploadButton';
import UploadBox2 from '../components/UploadBox2';
export default function Upload2(props) {

  return (
    <MainLayout>
       <div className='upload__page'><UploadButton/></div>
        <UploadBox2 />
    </MainLayout>
  )
}
