import React, { memo } from 'react'

function PdfPreview({pdf}) {

  console.count("PDF preview form render");

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

export default memo(PdfPreview);
