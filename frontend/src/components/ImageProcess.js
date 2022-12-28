import React from 'react'

export default function ImageProcess(props) {
  return (
    <>
    <div className="imageProcessWrap">
       <button className='backbutn'>X</button>
        {/* <div className="imagePreview">
            <img src={ props?.selectedFile ? URL.createObjectURL(props?.selectedFile) : '' } />
        </div> */}
        <form className="imageProcess">
            <div className="form-group">
                <input onChange={(event)=> props?.setImageName(event.target.value)} type="text" className="form-control" id="imageName" placeholder="Name"/>
                {props?.imageNameError && <label className='showError'>Name is required</label>}
            </div>
                <div className="form-group"><input onChange={(event)=> props?.setImageAlt(event.target.value)} type="text" className="form-control" id="imageAlt" placeholder="Alt/Title"/></div>
                <div className="form-group"><input onChange={(event)=> props?.setImageCaption(event.target.value)} type="text" className="form-control" id="imageCaption" placeholder="Caption"/></div>
                <div className="form-group"><input onChange={(event)=> props?.setImageKeyword(event.target.value)} type="text" className="form-control" id="imageKeywords" placeholder="Keywords"/></div>
                <div className="form-group"><input onChange={(event)=> props?.setImageSource(event.target.value)} type="text" className="form-control" id="imageSource" placeholder="Source"/></div>
                <div className="form-group"><input onChange={(event)=> props?.setImageAuthor(event.target.value)} type="text" className="form-control" id="imageAuthor" placeholder="Author"/></div>
                <div className="form-group"><input onChange={(event)=> props?.setImageCopyright(event.target.value)} type="text" className="form-control" id="imageCopyright" placeholder="Copyright"/></div>
                <div className="form-group"><input onChange={(event)=> props?.setImageRemarks(event.target.value)} type="text" className="form-control" id="imageRemarks" placeholder="Remarks"/></div>
                <div className="form-group">
                <select className="form-select" id="imageSource" onChange={(event)=> props?.setImageSource(event.target.value)} value={props?.imageSource ?? ''} placeholder="Select Source">
                  <option value="">--Select Source--</option>
                  <option value="celebrity">Celebrity</option>
                  <option value="festival">Festival</option>
                  <option value="psi">PSI</option>
                </select>
                {props?.imageSourceError && <label className='showError'>Select a source</label>}
                </div>
                <div className="form-group">
                <select className="form-select" id="imageFolders" onChange={(event)=> props?.setImageFolders(event.target.value)} value={props?.imageFolders ?? ''} placeholder="Select Folder">
                  <option value="">--Select Folder--</option>
                  <option value="celebrity">Celebrity</option>
                  <option value="festival">Festival</option>
                  <option value="psi">PSI</option>
                </select>
                {props?.imageFoldersError && <label className='showError'>Select a folder</label>}
                </div>
            <div className='button-set'>
            <button type="button" className={ "btn btn-primary " + ((props?.btnDisable) ? 'disabled' : '') } onClick={props?.fileUplaod}>Upload</button>
            </div>
            
            {/* <button type="button" className="btn btn-primary" onClick={props?.resetCropper}>Reset</button>
            <button type="button" className="btn btn-primary" onClick={props?.rotate}>Rotate</button>
            <button type="button" className="btn btn-primary" onClick={() => props?.flip("h")}>Flip H</button>
            <button type="button" className="btn btn-primary" onClick={() => props?.flip("v")}>Flip V</button> */}
        </form>
    </div>
    </>
  )
}
