import React from 'react'

export default function FolderImage(props) {
  return (
    <img className='folderImage' src={ (props?.image) ? process.env.REACT_APP_API_URL+'celebrity/'+props?.image : '' } />
  )
}
