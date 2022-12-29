import React from 'react'

export default function FolderImage(props) {
  return (
    <img className='folderImage' src={ (props?.image?.img_sef
      ) ? process.env.REACT_APP_AKM_PATH+props?.image?.img_sef : '' } />
  )
}
