import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import FolderImage from '../components/FolderImage';
import SearchForm from '../components/SearchForm'
import UploadButton from '../components/UploadButton'
import MainLayout from '../layouts/MainLayout';
import ImagebankLogo from '../svg/ImagebankLogo';

export default function SearchPage(props) {

    const params = useParams();
    const [imagesArray, setImageArray] = useState([]);

    useEffect(()=>{
      // console.log("params", params)
      setImageArray([]);
      let keyword = params?.keyword;
      if(keyword){
        searchKeyword(keyword);
      }else{
        searchKeyword();
      }
    }, [params]);

    const searchKeyword = async (keyword)=>{
      let apiUrl = process.env.REACT_APP_API_URL+'search';
      if(keyword){
        apiUrl += ("/"+keyword);
      }
      let response = await axios.get(apiUrl);
      //console.log("response?.data", response?.data)
      if(response?.data?.type=='success'){
        setImageArray(response?.data?.message);
      }
    }

    const searchLatest = async ()=>{
      let response = await axios.get(process.env.REACT_APP_API_URL+'searchlatest');
      if(response?.data?.type=='success'){
        setImageArray(response?.data?.message);
      }
      //console.log("response", response);
    }

  return (
    <MainLayout>
        <div className='searchbox__page'>
          <span className='searchpage-logo'><ImagebankLogo /></span><SearchForm keyword={params?.keyword} />
        </div>
        <div className='folderImages'>
          { imagesArray.map((image, key)=> {
            return <React.Fragment key={key}>
              <div className='folderCol'>
                <FolderImage image={image} />
                <div className='action__btn'>
                  <span title="visiable" className='visiable-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="48" width="48"><path d="M24 31.5q3.55 0 6.025-2.475Q32.5 26.55 32.5 23q0-3.55-2.475-6.025Q27.55 14.5 24 14.5q-3.55 0-6.025 2.475Q15.5 19.45 15.5 23q0 3.55 2.475 6.025Q20.45 31.5 24 31.5Zm0-2.9q-2.35 0-3.975-1.625T18.4 23q0-2.35 1.625-3.975T24 17.4q2.35 0 3.975 1.625T29.6 23q0 2.35-1.625 3.975T24 28.6Zm0 9.4q-7.3 0-13.2-4.15Q4.9 29.7 2 23q2.9-6.7 8.8-10.85Q16.7 8 24 8q7.3 0 13.2 4.15Q43.1 16.3 46 23q-2.9 6.7-8.8 10.85Q31.3 38 24 38Zm0-15Zm0 12q6.05 0 11.125-3.275T42.85 23q-2.65-5.45-7.725-8.725Q30.05 11 24 11t-11.125 3.275Q7.8 17.55 5.1 23q2.7 5.45 7.775 8.725Q17.95 35 24 35Z"/></svg></span>
                  <span  title="Download" className='download-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="48" width="48"><path d="M11 40q-1.2 0-2.1-.9Q8 38.2 8 37v-7.15h3V37h26v-7.15h3V37q0 1.2-.9 2.1-.9.9-2.1.9Zm13-7.65-9.65-9.65 2.15-2.15 6 6V8h3v18.55l6-6 2.15 2.15Z"/></svg></span>
                  <span  title="Copy URL" className='copyurl-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="48" width="48"><path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z"/></svg></span>
                </div>
              </div>
            </React.Fragment>
          }) }
        </div>
    </MainLayout>
  )
}
