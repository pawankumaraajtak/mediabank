import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import UploadIcon from '../svg/UploadIcon';

export default function DragBox(props) {

    const navigate = useNavigate();
    const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const [fileTypeError, setFileTypeError] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles?.[0]){
            //console.log("acceptedFiles", acceptedFiles);
            if(validFileTypes.includes(acceptedFiles?.[0]?.type)){
                navigate("/upload", {state:{selectedFile: acceptedFiles?.[0]}});
            }else{
                setFileTypeError(true);
            }
        }
        // Do something with the files
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: (
            (props?.type=='image') ? 
            {
                'image/png': [],
                'image/jpeg': [],
                'image/jpg': [],
            }
            : 
            {
                'application/pdf': []
            }
        ),
    });

  return (
    <div className='drag__upload__cont'>
        <div className='wrap'>
            <div className="uploadBoxWrap">
                <div className="uploadBox" {...getRootProps()}>
                    <div className="uploadIcons">
                        <div className='uploadIcon'><UploadIcon /></div>
                        <div className='uploadText'>Drag an { (props?.type=='image') ? 'image' : 'pdf' } here or
                        <span className='uploadTextBlue'> upload a file</span></div>
                    </div>
                </div>
            </div>
            { fileTypeError && <label className='showError'>Only jpeg, png, pdf are supported</label> }
            <div className='uploadForm'>
                <form name="uploadImageFrm" encType="multipart/form-data" method="POST" action="">
                    <input {...getInputProps()} id="uploadImgInput" name="uploadImgInput" type="file" accept="image/jpeg,image/png, image/gif"/>
                    <input {...getInputProps()} id="uploadImgInput2" name="uploadImgInput" type="file" accept="application/pdf"/>
                </form>
            </div>
        </div>
    </div>
  )
}
