import React from 'react'

export default function PdfPreview({pdf}) {
  return (
    <div className='pdfPreview'>
        <embed  
            src={ URL.createObjectURL(pdf) }
            width="100%"
            height="550"
       >
       </embed>
    </div>
  )
}
