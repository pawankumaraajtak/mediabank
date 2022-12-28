import React from 'react';
//import Container from 'react-bootstrap/Container';

export default function MainLayout(props) {
    return (
        <div className='outerBody' fluid>
          {props?.children}
          {/*<div className='footer'></div>*/}
        </div>
    );
}
