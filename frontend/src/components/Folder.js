import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import FolderImage from './FolderImage';
import UploadButton from './UploadButton';

export default function Folder(props) {

    const params = useParams();
    let imagesArry = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
    
  return (
    <MainLayout>
        <UploadButton folderId={params?.folderId} text="Upload Here" />
        <Row className='col-md-10 offset-1 folderBreadcrumb'>
            <Col><div>{params?.folderId}</div></Col>            
        </Row>
        <Row className='col-md-10 offset-1 folderImages'>
          { imagesArry.map((image, key)=> {
            return <React.Fragment key={key}>
              <Col md={{ span: 3 }} className='folderCol'>
                <FolderImage image={image} />
              </Col>
            </React.Fragment>
          }) }
        </Row>
    </MainLayout>
  )
}
