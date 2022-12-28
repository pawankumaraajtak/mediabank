import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as Icon from 'react-bootstrap-icons';
import SearchIcon from '../svg/SearchIcon';
import ImagebankLogo from '../svg/ImagebankLogo'; 
//import { BsImages } from 'react-icons/bs';
import SearchForm from './SearchForm';

export default function SearchBox() {
  return (
    <div className='hp__searchbox'>
        <div className='search__container'>
        <div className='searchTextWrap'>
            <div className='searchTextImg'><ImagebankLogo /></div>
            <div className='searchText'>Media Bank</div>
        </div>
        <SearchForm />
        </div>
        <div className='search__note'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
    </div>
  )
}
