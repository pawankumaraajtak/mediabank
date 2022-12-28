import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

export default function UploadButton(props) {
  return (
    <div className='action__hero'>
    <div className='action__elem'>
    {/* <Link to={ (props?.folderId) ?  "/upload/"+props?.folderId : "/folders"}><button type="button" className="btn btn-warning">{ props?.text ?? "Upload" }</button></Link> */}
    <Link to="/upload"><span className='but__text'>Upload Media</span><span className='info__text'>jpeg, png, gif, pdf</span></Link>
    </div>
    </div>
  )
}
