import React from 'react';
//import Container from 'react-bootstrap/Container';

export default function MainLayout(props) {

  console.count("main layout render");

    return (
        <div className='outerBody'>
          {props?.children}
          {/*<div className='footer'></div>*/}
        </div>
    );
}
