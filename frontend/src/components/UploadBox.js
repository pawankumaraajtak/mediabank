import React, { useEffect, useState, useRef, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useDropzone} from 'react-dropzone';
import UploadIcon from '../svg/UploadIcon';
import axios from 'axios';
import ImageProcess from './ImageProcess';
import { dataURItoBlob } from "../utils";
import CropperBox from './CropperBox';
import CropperTabs from './CropperTabs';
import Loader from './Loader';
import CheckBoxPreview from './CheckBoxPreview';
import { cleanImageName, getFileExtension } from '../helpers/Helper';
import PdfProcess from './PdfProcess';

export default function UploadBox(props) {

    const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const [fileTypeError, setFileTypeError] = useState(null);
    const [selectedFile, setSelectedFiles] = useState(null);
    const [imageName, setImageName] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [imageCaption, setImageCaption] = useState('');
    const [imageKeyword, setImageKeyword] = useState('');
    const [imageRemarks, setImageRemarks] = useState('');
    const [imageFolders, setImageFolders] = useState('');
    const [imageSource, setImageSource] = useState('');
    const [imageAuthor, setImageAuthor] = useState('');
    const [imageCopyright, setImageCopyright] = useState('');
    const [imageFoldersError, setImageFoldersError] = useState('');
    const [imageSourceError, setImageSourceError] = useState('');
    const [imageNameError, setImageNameError] = useState(null);
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [cropper, setCropper] = useState(null);
    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);
    const [uploadSuccess, setUploadSuccess] = useState(null);
    const [btnDisable, setBtnDisable] = useState(null);
    const [cropRatio, setCropRatio] = useState("16/9");
    const [image16_9_Preview, setImage16_9_Preview] = useState(null);
    const [image9_16_Preview, setImage9_16_Preview] = useState(null);
    const [image3_4_Preview, setImage3_4_Preview] = useState(null);
    const [image1_1_Preview, setImage1_1_Preview] = useState(null);
    const [startUploading, setStartUploading] = useState(null);
    const cropperRef_16_9 = useRef(null);
    const cropperRef_9_16 = useRef(null);
    const cropperRef_3_4 = useRef(null);
    const cropperRef_1_1 = useRef(null);

    useEffect(()=>{
        if(image && cropper){
            let img_16_9 = getImageUrlFromCropper(cropperRef_16_9);
            let img_9_16 = getImageUrlFromCropper(cropperRef_9_16);
            let img_3_4 = getImageUrlFromCropper(cropperRef_3_4);
            let img_1_1 = getImageUrlFromCropper(cropperRef_1_1);
            if(img_16_9){
                setImage16_9_Preview(img_16_9);
            }
            if(img_9_16){
                setImage9_16_Preview(img_9_16);
            }
            if(img_3_4){
                setImage3_4_Preview(img_3_4);
            }
            if(img_1_1){
                setImage1_1_Preview(img_1_1);
            }
        }
    }, [image, cropper]);

    useEffect(()=>{
        if(startUploading){
            // this is done because UI was freezing if we upload with timeout because everything will go in main thread.
            const timer = setTimeout(()=>{ uploadProcessing()}, 1000);
            return ()=>{
                clearTimeout(timer);
            }
        }
    }, [startUploading]);

    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles?.[0]){
            //console.log("acceptedFiles", acceptedFiles);
            if(validFileTypes.includes(acceptedFiles?.[0]?.type)){
                resetState();
                setSelectedFiles(acceptedFiles[0]);
                if(acceptedFiles?.[0]?.type=='application/pdf'){
                    setPdf(acceptedFiles[0]);
                }
                else{
                    fixImageToCanvas(acceptedFiles[0]);
                }
            }else{
                setFileTypeError(true);
            }
        }
        // Do something with the files
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/png': [],
            'image/jpeg': [],
            'image/jpg': [],
            'application/pdf': []
        }
    });

    const resetState = ()=>{
        setImageName('');
        setImageAlt('');
        setImageCaption('');
        setImageKeyword('');
        setImageFolders('');
        setImage(null);
        setCropper(null);
        setScaleX(1);
        setScaleY(1);
        setUploadSuccess(null);
        setBtnDisable(null);
        setCropRatio("16/9");
        setImage16_9_Preview(null);
        setImage9_16_Preview(null);
        setImage3_4_Preview(null);
        setImage1_1_Preview(null);
        setStartUploading(null);
        removeErrorMessages();
    }

    const fixImageToCanvas =(fileData)=>{
        if(fileData){
            let canvas = document.getElementById("imageCanvas_16_9");
            let context = canvas.getContext('2d');
            var reader = new FileReader();
            reader.readAsDataURL(fileData);
            reader.addEventListener("loadend", function(arg) {
                var src_image = new Image();
                src_image.onload = function() {
                    var hRatio = canvas.width  / src_image.width;
                    var vRatio =  canvas.height / src_image.height;
                    var ratio  = Math.min (hRatio, vRatio);
                    var centerShift_x = ( canvas.width - src_image.width*ratio ) / 2;
                    var centerShift_y = ( canvas.height - src_image.height*ratio ) / 2;
                    context.clearRect(0,0,canvas.width, canvas.height);
                    context.drawImage(src_image, 0, 0, src_image.width, src_image.height,
                    centerShift_x,centerShift_y,src_image.width*ratio, src_image.height*ratio);
                    setImage(reader.result);
                }
                src_image.src = this.result;
            });
        }
    }

    const flip = (type) => {
        const imageElement = cropperRef_16_9?.current;
        const cropper = imageElement?.cropper;
        if (type === "h") {
          cropper.scaleX(scaleX === 1 ? -1 : 1);
          setScaleX(scaleX === 1 ? -1 : 1);
        } else {
          cropper.scaleY(scaleY === 1 ? -1 : 1);
          setScaleY(scaleY === 1 ? -1 : 1);
        }
    }

    const rotate = () => {
        const imageElement = cropperRef_16_9?.current;
        const cropper = imageElement?.cropper;
        cropper.rotate(90);
    }

    const removeErrorMessages =()=>{
        setImageFoldersError(null);
        setImageSourceError(null);
        setImageNameError(null);
        setFileTypeError(null);
    }

    // const singleFileUploads = async ()=>{
    //     const imageElement = cropperRef_16_9?.current;
    //     const cropper = imageElement?.cropper;
    //     const imageDataUrl = cropper.getCroppedCanvas().toDataURL();
    //     const img = dataURItoBlob(imageDataUrl);
    //     if(!imageFolders){
    //         setImageFoldersError(true);
    //     }
    //     if(img && imageFolders){
    //         const formData = new FormData();
    //         let extension = "png";
    //         let imageNewName = "output.png";
    //         if(extension && imageName){
    //             imageNewName = imageName+"."+extension;
    //         }
    //         formData.append("uploadImgInput", img, imageNewName);
    //         formData.append("imageName", imageName);
    //         formData.append("imageAlt", imageAlt);
    //         formData.append("imageTitle", imageTitle);
    //         formData.append("imageKeyword", imageKeyword);
    //         formData.append("folderId", imageFolders);
    //         let response = await axios.post(process.env.REACT_APP_API_URL+'upload/photos', formData);
    //         console.log("response", response)
    //         if(response?.status=="200"){
    //             setUploadSuccess(true);
    //         }
    //     }
    // }

    // const getImageFromCropper = (cropperRef)=>{
    //     const imageDataUrl = getImageUrlFromCropper(cropperRef);
    //     if(imageDataUrl){
    //         const img = dataURItoBlob(imageDataUrl);
    //         return img;
    //     }
    //     return '';
    // }

    const getImageUrlFromCropper = (cropperRef)=>{
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        if(cropper){
            const imageDataUrl = cropper?.getCroppedCanvas()?.toDataURL();
            return imageDataUrl;
        }
        return '';
    }

    const getImageFromCropper = async (cropperRef)=>{
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        if(cropper){
            const imageDataUrl = await new Promise(resolve => cropper?.getCroppedCanvas().toBlob(resolve));
            return imageDataUrl;
        }
        return [];
    }

    const fileUplaod = ()=>{
        removeErrorMessages();
        setUploadSuccess(null);
        setBtnDisable(true);
        if(!imageFolders){
            setImageFoldersError(true);
            setBtnDisable(null);
        }
        if(!imageSource){
            setImageSourceError(true);
            setBtnDisable(null);
        }
        if(!imageName){
            setImageNameError(true);
            setBtnDisable(null);
        }
        if(imageFolders && imageName){
            setStartUploading(true);
        }
    }

    const uploadProcessing = async ()=>{
        if(selectedFile && imageName && imageFolders){
            if(pdf){
                console.log("pdf", pdf);

                let extension = getFileExtension(selectedFile?.type);
                let newImageName = cleanImageName(imageName);
                let originalFileName = newImageName+"."+extension;
                
                const formData = new FormData();
                formData.append("img_name", imageName);
                formData.append("img_title", imageAlt);
                formData.append("img_caption", imageCaption);
                formData.append("img_keywords", imageKeyword);
                formData.append("img_folder", imageFolders);
                formData.append("img_source", imageSource);
                formData.append("img_copyright", imageCopyright);
                formData.append("img_type", extension);
                formData.append("img_remark", imageRemarks);
                formData.append("img_author", imageAuthor);
                formData.append("uploadImgInput", selectedFile, originalFileName);

                //console.log("formData", ...formData)
                let response = await axios.post(process.env.REACT_APP_API_URL+'upload/pdf', formData);
                console.log("response", response)
                if(response?.status=="200"){
                    setUploadSuccess(response?.data);
                }
                setBtnDisable(null);
                setStartUploading(null);

            }
            else if(image){
                let extension = getFileExtension(selectedFile?.type);

                let inlineCheckbox_16_9 = document?.getElementById("inlineCheckbox_16_9")?.checked;
                let inlineCheckbox_9_16 = document?.getElementById("inlineCheckbox_9_16")?.checked;
                let inlineCheckbox_3_4 = document?.getElementById("inlineCheckbox_3_4")?.checked;
                let inlineCheckbox_1_1 = document?.getElementById("inlineCheckbox_1_1")?.checked;
    
                let img_16_9 = "";
                let img_9_16 = "";
                let img_3_4 = "";
                let img_1_1 = "";
        
                if(inlineCheckbox_16_9){
                    img_16_9 = await getImageFromCropper(cropperRef_16_9);
                }
                if(inlineCheckbox_9_16){
                    img_9_16 = await getImageFromCropper(cropperRef_9_16);
                }
                if(inlineCheckbox_3_4){
                    img_3_4 = await getImageFromCropper(cropperRef_3_4);
                }
                if(inlineCheckbox_1_1){
                    img_1_1 = await getImageFromCropper(cropperRef_1_1);
                }
        
                if((img_16_9) || (img_9_16) || (img_3_4) || (img_1_1)){
                    const formData = new FormData();
                    let newImageName = cleanImageName(imageName);
                    let originalFileName = newImageName+"."+extension;
                    let img_16_9_filename = '';
                    let img_9_16_filename = '';
                    let img_3_4_filename = '';
                    let img_1_1_filename = '';
        
                    img_16_9_filename = ((img_16_9) ? (newImageName+"_16_9."+extension) : '');
                    img_9_16_filename = ((img_9_16) ? (newImageName+"_9_16."+extension) : '');
                    img_3_4_filename = ((img_3_4) ? (newImageName+"_3_4."+extension) : '');
                    img_1_1_filename = ((img_1_1) ? (newImageName+"_1_1."+extension) : '');
        
                    formData.append("uploadImgInput", selectedFile, originalFileName);
                    if(img_16_9 && img_16_9_filename){
                        formData.append("uploadImgInput", img_16_9, img_16_9_filename);
                    }
                    if(img_9_16 && img_9_16_filename){
                        formData.append("uploadImgInput", img_9_16, img_9_16_filename);
                    }
                    if(img_3_4 && img_3_4_filename){
                        formData.append("uploadImgInput", img_3_4, img_3_4_filename);
                    }  
                    if(img_1_1 && img_1_1_filename){
                        formData.append("uploadImgInput", img_1_1, img_1_1_filename);
                    }        
                    
                    formData.append("img_name", imageName);
                    formData.append("img_title", imageAlt);
                    formData.append("img_caption", imageCaption);
                    formData.append("img_keywords", imageKeyword);
                    // formData.append("folderId", imageFolders);
                    formData.append("img_folder", imageFolders);
                    formData.append("img_source", imageSource);
                    formData.append("img_copyright", imageCopyright);
                    formData.append("img_type", extension);
                    formData.append("img_remark", imageRemarks);
                    formData.append("img_author", imageAuthor);
    
                    //console.log("formData", ...formData)
                    let response = await axios.post(process.env.REACT_APP_API_URL+'upload/photos', formData);
                    console.log("response", response)
                    if(response?.status=="200"){
                        setUploadSuccess(response?.data);
                    }
                    setBtnDisable(null);
                    setStartUploading(null);
                }
            }
        }
    }

    const resetCropper=()=>{
        const imageElement = cropperRef_16_9?.current;
        const cropper = imageElement?.cropper;
        cropper.reset();
    }

  return (
    <div className='drag__upload__cont'>
        <div className='wrap'>
            <div className={ image ? "uploadBoxImageWrap" : "uploadBoxWrap" }>
                <div className={ image ? "uploadBoxImage" : "uploadBox" } {...getRootProps()}>
                    <div className={ image ? "uploadImageIcons" : "uploadIcons" }>
                        {
                            (!image) && <div className='uploadIcon'><UploadIcon /></div>
                        }
                        <div className='uploadText'>Drag an image here or
                        <span className='uploadTextBlue'> upload a file</span></div>
                    </div>
                </div>
            </div>
            { fileTypeError && <label className='showError'>Only jpeg, png, pdf are supported</label> }
            <div className='uploadForm'>
                <form name="uploadImageFrm" encType="multipart/form-data" method="POST" action="">
                    <input {...getInputProps()} id="uploadImgInput" name="uploadImgInput" type="file" accept="image/bmp,image/heic,image/heif,image/jpeg,image/png,image/tiff,image/webp,image/x-icon"/>
                </form>
            </div>

            <canvas id="imageCanvas_16_9" className='imageCanvas' width="650" height="300"></canvas>
            <canvas id="imageCanvas_9_16" className='imageCanvas' width="650" height="300"></canvas>
            <canvas id="imageCanvas_3_4" className='imageCanvas' width="650" height="300"></canvas>
            <canvas id="imageCanvas_1_1" className='imageCanvas' width="650" height="300"></canvas>

            {
                image &&
                <CropperTabs cropRatio={cropRatio} setCropRatio={setCropRatio}/>
            }
            <div className='cropper__preview'>
            <div className='cropperBoxWrapper'>
            <div className={ ( cropRatio=='16/9' ? 'cropperBoxShow' : 'cropperBoxWrapHide' ) }>
                <CropperBox image={image} cropperRef={cropperRef_16_9} setCropper={setCropper} cropRatio={16/9} />  
            </div>
            <div className={ ( cropRatio=='9/16' ? 'cropperBoxShow' : 'cropperBoxWrapHide' ) }>
                <CropperBox image={image} cropperRef={cropperRef_9_16} setCropper={setCropper} cropRatio={9/16} />
            </div>
            <div className={ ( cropRatio=='3/4' ? 'cropperBoxShow' : 'cropperBoxWrapHide' ) }>
                <CropperBox image={image} cropperRef={cropperRef_3_4} setCropper={setCropper} cropRatio={3/4} />
            </div>
            <div className={ ( cropRatio=='1/1' ? 'cropperBoxShow' : 'cropperBoxWrapHide' ) }>
                <CropperBox image={image} cropperRef={cropperRef_1_1} setCropper={setCropper} cropRatio={1/1} />
            </div>
            </div>

            {
                image &&
                <div className='cropCheckBoxes row'>
                    <CheckBoxPreview id="inlineCheckbox_16_9" value="option1" type="16:9" previewUrl={image16_9_Preview}/>
                    <CheckBoxPreview id="inlineCheckbox_9_16" value="option2" type="9:16" previewUrl={image9_16_Preview}/>
                    <CheckBoxPreview id="inlineCheckbox_3_4" value="option3" type="3:4" previewUrl={image3_4_Preview}/>
                    <CheckBoxPreview id="inlineCheckbox_1_1" value="option4" type="1:1" previewUrl={image1_1_Preview}/>
                </div>
            }
            </div>
            {
                (image || pdf) && <ImageProcess resetCropper={resetCropper} flip={flip} rotate={rotate} setImageName={setImageName} setImageAlt={setImageAlt} setImageCaption={setImageCaption} setImageKeyword={setImageKeyword} imageFolders={imageFolders} setImageFolders={setImageFolders} imageNameError={imageNameError} setImageRemarks={setImageRemarks} imageFoldersError={imageFoldersError} imageSourceError={imageSourceError} imageSource={imageSource} setImageSource={setImageSource} setImageAuthor={setImageAuthor} setImageCopyright={setImageCopyright} btnDisable={btnDisable} selectedFile={selectedFile} fileUplaod={fileUplaod} />
            }

            {
                (uploadSuccess && uploadSuccess?.length>0) &&
                uploadSuccess.map((result, key)=>{
                    return <div key={key} className='btAlertBox'>
                                <div className="alert alert-success" role="alert">
                                    {result}
                                </div>
                            </div>
                })
            }
        </div>
    </div>
  )
}
