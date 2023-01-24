import React from 'react';
import { useLocation } from "react-router-dom";
import HomeButton from './buttons/HomeButton';
import HiddenForm from './HiddenForm';
import SearchButton from './SearchButton';
import UploadButton from './UploadButton';

export default function RightNav(props) {

    console.count("right nav");

  const location = useLocation();

  const selectFile = (type)=>{
    let uploadImgInput = document.getElementById("uploadImgInput");
    if(type=='pdf'){
      uploadImgInput = document.getElementById("uploadImgInput2");
    }
    if(uploadImgInput){
      uploadImgInput.click();
    }
  }

  let imageUploadType = "link";
  let pdfUploadType = "link";

  if(location?.pathname?.includes("/upload-image")){
    imageUploadType = "upload";
  }
  else if(location?.pathname?.includes("/upload-pdf")){
    pdfUploadType = "upload";
  }

  return (
    <>
    <div className='action__hero'>
    <div className='action__elem'>
    {
      (location?.pathname?.includes("/search")) && <HomeButton />
    }

    {
      (location?.pathname?.includes("/upload")) && <SearchButton />
    }

    <UploadButton selectFile={selectFile} type="pdf" text="Upload PDF" link="upload-pdf" uploadType={pdfUploadType} />
    <UploadButton selectFile={selectFile} type="image" text="Upload Media" link="upload-image" shortInfo="jpeg, png, gif" uploadType={imageUploadType} />

    </div>
    </div>

    {/* <HiddenForm /> */}
    </>
  )
}
