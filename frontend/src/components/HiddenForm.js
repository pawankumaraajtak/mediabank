import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function HiddenForm(props) {

  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (e)=>{
    if(e?.target?.files?.[0]){
      setSelectedFile(e.target.files[0]);
    }
  }

  useEffect(()=>{
    if(selectedFile){
      navigate("/upload", {state:{selectedFile: selectedFile}});
    }
  }, [selectedFile]);

  return (
    <>
    <div className='uploadForm'>
    <form name="uploadImageFrm" encType="multipart/form-data" method="POST" action="">
        <input id="uploadImgInput" onChange={onFileChange} name="uploadImgInput" type="file" accept="image/jpeg,image/png, image/gif"/>
        <input id="uploadImgInput2" onChange={onFileChange} name="uploadImgInput" type="file" accept="application/pdf"/>
    </form>
    </div>
    </>
  )
}
