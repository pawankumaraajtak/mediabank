import React from 'react'
import Loader from './Loader'

export default function CheckBoxPreview({id, type, value, previewUrl}) {
  return (
    <>
        <div className="form-check form-check-inline col-md-2">
            {previewUrl 
            ? 
            <>
            <div className='checkbox'><input className="form-check-input" type="checkbox" id={id} value={value} defaultChecked />
            <label className="form-check-label" htmlFor={id}>{type}</label></div>
            <div className='cropCheckBox'><img className='checkBoxImage' src={previewUrl} /></div> 
            </>
            : 
            <Loader count={3} />
            }
        </div>
    </>
  )
}
