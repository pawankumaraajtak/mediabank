import React from 'react';
import { useNavigate } from "react-router-dom";

export default function UploadButton(props) {

  const navigate = useNavigate();

  const handleClick = ()=>{
    if(props?.uploadType=="link"){
      let link = props?.link;
      if(link){
        navigate('/'+link);
      }
    }
    else{
        props?.selectFile(props?.type);
    }
  }

  return (
    <>
    <div className='upload_button' onClick={()=> handleClick()}>
      <span className='but__text'>{props?.text}</span>
      {
        props?.shortInfo && <span className='info__text'>{props?.shortInfo}</span>
      }
    </div>
    </>
  )
}
