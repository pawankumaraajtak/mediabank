import React from 'react';
import Row from 'react-bootstrap/Row';
import MainLayout from '../layouts/MainLayout';
import SearchBox from './SearchBox';
import UploadBox from './UploadBox';

export default function Home() {
  return (
    <MainLayout>
        <UploadBox />
        <SearchBox />
    </MainLayout>
  )
}
