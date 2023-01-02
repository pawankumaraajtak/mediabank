import React, { memo } from 'react'

function DetailForm(props) {

//   const closeTextBox=()=>{
//     let boxWrap = document.getElementById("imageProcessWrap");
//     if(boxWrap){
//         boxWrap.classList.remove("openBox");
//     }
// }

   console.count("detail form render");

  const openTextBox=()=>{
    let openMore = document.getElementById("open-more");
    if(openMore){
      if(openMore?.classList?.contains("open-more-formgroup")){
        openMore?.classList?.remove("open-more-formgroup");
      }
      else{
        openMore?.classList?.add("open-more-formgroup");
      }
    }
  }

  const copyUrl = (url)=>{
    navigator.clipboard.writeText(url);
  }

  return (
    <>
    <div className="imageProcessWrap" id="imageProcessWrap">
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

               <div className='open-more' id="open-more" onClick={openTextBox}><span className='opentext'>Other options</span></div>
              <div className='more-formgroup'>
              <div className="form-group"><input onChange={(event)=> props?.setImageKeyword(event.target.value)} type="text" className="form-control" id="imageKeywords" placeholder="Keywords"/></div>
                <div className="form-group"><input onChange={(event)=> props?.setImageSource(event.target.value)} type="text" className="form-control" id="imageSource" placeholder="Source"/></div>
                <div className="form-group"><input onChange={(event)=> props?.setImageAuthor(event.target.value)} type="text" className="form-control" id="imageAuthor" placeholder="Author"/></div>
                <div className="form-group"><input onChange={(event)=> props?.setImageCopyright(event.target.value)} type="text" className="form-control" id="imageCopyright" placeholder="Copyright"/></div>
                <div className="form-group"><input onChange={(event)=> props?.setImageRemarks(event.target.value)} type="text" className="form-control" id="imageRemarks" placeholder="Remarks"/></div>

              </div>
            <div className='button-set'>
            <button type="button" className={ "btn btn-primary " + ((props?.btnDisable) ? 'disabled' : '') } onClick={props?.fileUplaod}>Upload</button>
            </div>
            
            {/* <button type="button" className="btn btn-primary" onClick={props?.resetCropper}>Reset</button>
            <button type="button" className="btn btn-primary" onClick={props?.rotate}>Rotate</button>
            <button type="button" className="btn btn-primary" onClick={() => props?.flip("h")}>Flip H</button>
            <button type="button" className="btn btn-primary" onClick={() => props?.flip("v")}>Flip V</button> */}
        </form>

        {
          (props?.uploadSuccess && props?.uploadSuccess?.length>0) &&
          <div className='btAlertBox'>
            <h3>Media Successfully Uploaded</h3>
            <div className="alert alert-success" role="alert">
            {
              props?.uploadSuccess.map((result, key)=>{
                console.log("result", result)
                return <div className='copyimge-url'><span className='textretio'>{(result?.imageType) ? ( result?.imageType=='original' ? 'Ori' : result?.imageType) : ''}</span><span className="originalurl">{result?.s3_url} </span><span className='svg-copy' onClick={()=>copyUrl(result?.s3_url)} id=''><svg fill='#fff' viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg"><path d="M758 201.2H166c-35.3 0-64 28.7-64 64v592c0 35.3 28.7 64 64 64h592c35.3 0 64-28.7 64-64v-592c0-35.4-28.7-64-64-64zM504.8 664.5L411.3 758c-21.5 21.5-50.1 33.4-80.6 33.4s-59-11.8-80.6-33.4c-21.5-21.5-33.4-50.1-33.4-80.6 0-30.4 11.8-59 33.4-80.6l76.8-76.8c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-76.8 76.8c-9.4 9.4-14.6 22-14.6 35.3s5.2 25.9 14.6 35.3c9.4 9.4 22 14.6 35.3 14.6s25.9-5.2 35.3-14.6l93.5-93.5c17-17 19.5-43.7 6-63.4-10-14.6-6.3-34.5 8.3-44.5 14.6-10 34.5-6.3 44.5 8.3 30.9 45.2 25.2 106.2-13.5 144.9z m169-139L597 602.3c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l76.8-76.8c9.4-9.4 14.6-22 14.6-35.3s-5.2-25.9-14.6-35.3c-19.5-19.5-51.1-19.5-70.6 0l-93.5 93.5c-17 17-19.5 43.7-6 63.4 10 14.6 6.3 34.5-8.3 44.5-5.5 3.8-11.8 5.6-18 5.6-10.2 0-20.2-4.9-26.4-13.9-30.9-45.2-25.2-106.1 13.5-144.8l93.5-93.5c44.4-44.4 116.7-44.4 161.1 0 21.5 21.5 33.4 50.1 33.4 80.6 0 30.4-11.9 59-33.4 80.5z"  /><path d="M858 101.2H266c-35.3 0-64 28.7-64 64v16h576c35.3 0 64 28.7 64 64v576h16c35.3 0 64-28.7 64-64v-592c0-35.4-28.7-64-64-64z" /></svg></span></div>
              })
            }
            </div>
          </div>                
        }
       {/* <div className='btAlertBox'>
                                <div className="alert alert-success" role="alert">
                                   <div className='copyimge-url'>16:9 <span className="originalurl">https://akm-img-a-in.tosshub.com/sites/indiatoday/testing/festival/12-2022/nature-mountain-284804.jpeg </span><span className='svg-copy' id=''><svg fill='#fff' viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg"><path d="M758 201.2H166c-35.3 0-64 28.7-64 64v592c0 35.3 28.7 64 64 64h592c35.3 0 64-28.7 64-64v-592c0-35.4-28.7-64-64-64zM504.8 664.5L411.3 758c-21.5 21.5-50.1 33.4-80.6 33.4s-59-11.8-80.6-33.4c-21.5-21.5-33.4-50.1-33.4-80.6 0-30.4 11.8-59 33.4-80.6l76.8-76.8c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-76.8 76.8c-9.4 9.4-14.6 22-14.6 35.3s5.2 25.9 14.6 35.3c9.4 9.4 22 14.6 35.3 14.6s25.9-5.2 35.3-14.6l93.5-93.5c17-17 19.5-43.7 6-63.4-10-14.6-6.3-34.5 8.3-44.5 14.6-10 34.5-6.3 44.5 8.3 30.9 45.2 25.2 106.2-13.5 144.9z m169-139L597 602.3c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l76.8-76.8c9.4-9.4 14.6-22 14.6-35.3s-5.2-25.9-14.6-35.3c-19.5-19.5-51.1-19.5-70.6 0l-93.5 93.5c-17 17-19.5 43.7-6 63.4 10 14.6 6.3 34.5-8.3 44.5-5.5 3.8-11.8 5.6-18 5.6-10.2 0-20.2-4.9-26.4-13.9-30.9-45.2-25.2-106.1 13.5-144.8l93.5-93.5c44.4-44.4 116.7-44.4 161.1 0 21.5 21.5 33.4 50.1 33.4 80.6 0 30.4-11.9 59-33.4 80.5z"  /><path d="M858 101.2H266c-35.3 0-64 28.7-64 64v16h576c35.3 0 64 28.7 64 64v576h16c35.3 0 64-28.7 64-64v-592c0-35.4-28.7-64-64-64z" /></svg></span></div>
                                   <div className='copyimge-url'>16:9 <span className="originalurl">https://akm-img-a-in.tosshub.com/sites/indiatoday/testing/festival/12-2022/nature-mountain-284804.jpeg </span><span className='svg-copy' id=''><svg fill='#fff' viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg"><path d="M758 201.2H166c-35.3 0-64 28.7-64 64v592c0 35.3 28.7 64 64 64h592c35.3 0 64-28.7 64-64v-592c0-35.4-28.7-64-64-64zM504.8 664.5L411.3 758c-21.5 21.5-50.1 33.4-80.6 33.4s-59-11.8-80.6-33.4c-21.5-21.5-33.4-50.1-33.4-80.6 0-30.4 11.8-59 33.4-80.6l76.8-76.8c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-76.8 76.8c-9.4 9.4-14.6 22-14.6 35.3s5.2 25.9 14.6 35.3c9.4 9.4 22 14.6 35.3 14.6s25.9-5.2 35.3-14.6l93.5-93.5c17-17 19.5-43.7 6-63.4-10-14.6-6.3-34.5 8.3-44.5 14.6-10 34.5-6.3 44.5 8.3 30.9 45.2 25.2 106.2-13.5 144.9z m169-139L597 602.3c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l76.8-76.8c9.4-9.4 14.6-22 14.6-35.3s-5.2-25.9-14.6-35.3c-19.5-19.5-51.1-19.5-70.6 0l-93.5 93.5c-17 17-19.5 43.7-6 63.4 10 14.6 6.3 34.5-8.3 44.5-5.5 3.8-11.8 5.6-18 5.6-10.2 0-20.2-4.9-26.4-13.9-30.9-45.2-25.2-106.1 13.5-144.8l93.5-93.5c44.4-44.4 116.7-44.4 161.1 0 21.5 21.5 33.4 50.1 33.4 80.6 0 30.4-11.9 59-33.4 80.5z"  /><path d="M858 101.2H266c-35.3 0-64 28.7-64 64v16h576c35.3 0 64 28.7 64 64v576h16c35.3 0 64-28.7 64-64v-592c0-35.4-28.7-64-64-64z" /></svg></span></div>
                                   <div className='copyimge-url'>16:9 <span className="originalurl">https://akm-img-a-in.tosshub.com/sites/indiatoday/testing/festival/12-2022/nature-mountain-284804.jpeg </span><span className='svg-copy' id=''><svg fill='#fff' viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg"><path d="M758 201.2H166c-35.3 0-64 28.7-64 64v592c0 35.3 28.7 64 64 64h592c35.3 0 64-28.7 64-64v-592c0-35.4-28.7-64-64-64zM504.8 664.5L411.3 758c-21.5 21.5-50.1 33.4-80.6 33.4s-59-11.8-80.6-33.4c-21.5-21.5-33.4-50.1-33.4-80.6 0-30.4 11.8-59 33.4-80.6l76.8-76.8c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-76.8 76.8c-9.4 9.4-14.6 22-14.6 35.3s5.2 25.9 14.6 35.3c9.4 9.4 22 14.6 35.3 14.6s25.9-5.2 35.3-14.6l93.5-93.5c17-17 19.5-43.7 6-63.4-10-14.6-6.3-34.5 8.3-44.5 14.6-10 34.5-6.3 44.5 8.3 30.9 45.2 25.2 106.2-13.5 144.9z m169-139L597 602.3c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l76.8-76.8c9.4-9.4 14.6-22 14.6-35.3s-5.2-25.9-14.6-35.3c-19.5-19.5-51.1-19.5-70.6 0l-93.5 93.5c-17 17-19.5 43.7-6 63.4 10 14.6 6.3 34.5-8.3 44.5-5.5 3.8-11.8 5.6-18 5.6-10.2 0-20.2-4.9-26.4-13.9-30.9-45.2-25.2-106.1 13.5-144.8l93.5-93.5c44.4-44.4 116.7-44.4 161.1 0 21.5 21.5 33.4 50.1 33.4 80.6 0 30.4-11.9 59-33.4 80.5z"  /><path d="M858 101.2H266c-35.3 0-64 28.7-64 64v16h576c35.3 0 64 28.7 64 64v576h16c35.3 0 64-28.7 64-64v-592c0-35.4-28.7-64-64-64z" /></svg></span></div>
                                   <div className='copyimge-url'>16:9 <span className="originalurl">https://akm-img-a-in.tosshub.com/sites/indiatoday/testing/festival/12-2022/nature-mountain-284804.jpeg </span><span className='svg-copy' id=''><svg fill='#fff' viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg"><path d="M758 201.2H166c-35.3 0-64 28.7-64 64v592c0 35.3 28.7 64 64 64h592c35.3 0 64-28.7 64-64v-592c0-35.4-28.7-64-64-64zM504.8 664.5L411.3 758c-21.5 21.5-50.1 33.4-80.6 33.4s-59-11.8-80.6-33.4c-21.5-21.5-33.4-50.1-33.4-80.6 0-30.4 11.8-59 33.4-80.6l76.8-76.8c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-76.8 76.8c-9.4 9.4-14.6 22-14.6 35.3s5.2 25.9 14.6 35.3c9.4 9.4 22 14.6 35.3 14.6s25.9-5.2 35.3-14.6l93.5-93.5c17-17 19.5-43.7 6-63.4-10-14.6-6.3-34.5 8.3-44.5 14.6-10 34.5-6.3 44.5 8.3 30.9 45.2 25.2 106.2-13.5 144.9z m169-139L597 602.3c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l76.8-76.8c9.4-9.4 14.6-22 14.6-35.3s-5.2-25.9-14.6-35.3c-19.5-19.5-51.1-19.5-70.6 0l-93.5 93.5c-17 17-19.5 43.7-6 63.4 10 14.6 6.3 34.5-8.3 44.5-5.5 3.8-11.8 5.6-18 5.6-10.2 0-20.2-4.9-26.4-13.9-30.9-45.2-25.2-106.1 13.5-144.8l93.5-93.5c44.4-44.4 116.7-44.4 161.1 0 21.5 21.5 33.4 50.1 33.4 80.6 0 30.4-11.9 59-33.4 80.5z"  /><path d="M858 101.2H266c-35.3 0-64 28.7-64 64v16h576c35.3 0 64 28.7 64 64v576h16c35.3 0 64-28.7 64-64v-592c0-35.4-28.7-64-64-64z" /></svg></span></div>
                                </div>

                            </div> */}

    </div>
    </>
  )
}

export default memo(DetailForm);
