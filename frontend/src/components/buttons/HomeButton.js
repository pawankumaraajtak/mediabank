import React from 'react';
import { useNavigate } from "react-router-dom";

export default function HomeButton() {

    const navigate = useNavigate();
    
  return (
    <>
    <div onClick={()=> navigate("/")} className='upload_button back_button'><span className='but__text'><svg xmlns="http://www.w3.org/2000/svg" width='30' height='30' viewBox="0 0 48 48"  fill='#fff'><path d="M8 42V18L24 6l16 12v24H28V28h-8v14Z"/></svg></span></div>
    </>
  )
}
