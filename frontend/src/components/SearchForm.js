import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../svg/SearchIcon';

export default function SearchForm(props) {

    console.count("search form component render");
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const searchQuery = (e)=>{
        e.preventDefault();
        let keyword = inputRef?.current?.value;
        if(keyword){
            navigate("/search/"+keyword);
        }
    }

  return (
        <form action="" method="GET" role="search" onSubmit={searchQuery}>
        <div className='searchBox'>
            <div className='searchTextBox'>
            <input ref={inputRef} type="search" className="inputSearchTextBox" title="Search" defaultValue={props?.keyword} placeholder="Search image...." />
            </div>
            <button type="submit" className='searchBtn'>
                <div className='searchIcon'>
                    <span className='searchIconSpan'>
                        <SearchIcon />
                    </span>
                </div>
            </button>
        </div>
        </form>
  )
}
