import React from 'react'

export default function CropperTabs({cropRatio, setCropRatio}) {
  return (
    <div className='navTabs'>
    <ul className="nav nav-tabs">
        <li className="nav-item">
            <a className={"nav-link"+' '+(cropRatio=='16/9' ? 'active' : '')} href="#" onClick={(e)=> {e.preventDefault();setCropRatio('16/9')}}>16:9</a>
        </li>
        <li className="nav-item">
            <a className={"nav-link"+' '+(cropRatio=='9/16' ? 'active' : '')} href="#" onClick={(e)=>{e.preventDefault();setCropRatio('9/16')}} >9:16</a>
        </li>
        <li className="nav-item">
            <a className={"nav-link"+' '+(cropRatio=='3/4' ? 'active' : '')} href="#" onClick={(e)=>{e.preventDefault();setCropRatio('3/4')}}>3:4</a>
        </li>
        <li className="nav-item">
            <a className={"nav-link"+' '+(cropRatio=='1/1' ? 'active' : '')} href="#" onClick={(e)=>{e.preventDefault();setCropRatio('1/1')}}>1:1</a>
        </li>
    </ul>
    </div>
  )
}
