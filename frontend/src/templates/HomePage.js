import React from 'react';
import Row from 'react-bootstrap/Row';
import MainLayout from '../layouts/MainLayout';
import SearchBox from '../components/SearchBox';
import UploadBox from '../components/UploadBox';
import UploadButton from '../components/UploadButton';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <MainLayout>
      <UploadButton />
      <SearchBox />
    </MainLayout>
  )
}
