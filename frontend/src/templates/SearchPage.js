import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import FolderImage from '../components/FolderImage';
import SearchForm from '../components/SearchForm'
import UploadButton from '../components/UploadButton'
import MainLayout from '../layouts/MainLayout'

export default function SearchPage(props) {

    const params = useParams();
    let imagesArry = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

  return (
    <MainLayout>
        <Row className='col-md-8 offset-1'>
        <SearchForm keyword={params?.keyword} />
        </Row>
        <Row>
            <Col>&nbsp;</Col>
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
