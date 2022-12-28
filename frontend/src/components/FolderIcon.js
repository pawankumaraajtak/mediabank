import React from 'react';
import { FcOpenedFolder } from 'react-icons/fc';
import { Link } from 'react-router-dom';

export default function FolderIcon(props) {
  return (
    <Link to={ props?.link ? "/folders/"+props?.link : ''}>
    <div className='folder'>
        <FcOpenedFolder />
        <div className='folderName'>{props?.name}</div>
    </div>
    </Link>
  )
}
