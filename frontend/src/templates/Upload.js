import React from 'react'
import UploadBox from '../components/UploadBox'
import MainLayout from '../layouts/MainLayout'
import UploadButton from '../components/UploadButton';
export default function Upload(props) {

  return (
    <MainLayout>
       <div className='upload__page'><UploadButton/></div>
        <UploadBox />
    </MainLayout>
  )
}
