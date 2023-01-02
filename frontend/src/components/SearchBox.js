import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as Icon from 'react-bootstrap-icons';
import SearchIcon from '../svg/SearchIcon';
import ImagebankLogo from '../svg/ImagebankLogo'; 
//import { BsImages } from 'react-icons/bs';
import SearchForm from './SearchForm';

export default function SearchBox() {

  console.count("searchbox component render");

  return (
    <div className='hp__searchbox'>
        <div className='search__container'>
        <div className='searchTextWrap'>
            <div className='searchTextImg'><ImagebankLogo /></div>
            <div className='searchText'>Media Bank</div>
        </div>
        <SearchForm />
        </div>
        <div className='search__note'>Search and Download Media, Graphics & Documents from India Today Group’s Repository.</div>
    </div>
  )
}
