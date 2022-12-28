import React from 'react'
import MainLayout from '../layouts/MainLayout';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FolderIcon from '../components/FolderIcon';

export default function Folders() {
  return (
    <MainLayout>
        <Row className='col-md-10 offset-1'>
            <Col md={{ span:1 }} className='folderColumn'><FolderIcon name="Celebrity" link="celebrity" /></Col>
            <Col md={{ span:1 }} className='folderColumn'><FolderIcon name="Festival" link="festival" /></Col>
            <Col md={{ span:1 }} className='folderColumn'><FolderIcon name="PTI" link="pti" /></Col>
        </Row>
    </MainLayout>
  )
}
