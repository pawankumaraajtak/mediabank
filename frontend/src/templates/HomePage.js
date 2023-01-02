import React from 'react';
import Row from 'react-bootstrap/Row';
import MainLayout from '../layouts/MainLayout';
import SearchBox from '../components/SearchBox';
import UploadBox from '../components/UploadBox';
import UploadButton from '../components/UploadButton';
import { Link } from 'react-router-dom';
import RightNav from '../components/RightNav';

export default function HomePage() {

  console.count("home template render");

  return (
    <MainLayout>
      <RightNav />
      {/* <UploadButton /> */}
      <SearchBox />
    </MainLayout>
  )
}
