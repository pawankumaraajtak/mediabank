import React, { memo } from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function CropperBox({image, imageWidth, imageHeight, cropperRef, setCropper, cropRatio}) {

  console.count("cropper render");

  return (
    <>
    {
        (image) &&
        <Cropper
            ref={cropperRef}
           // style={{ height: imageHeight, width: "100%",  }}
           style={{ maxWidth: "100%"  }}
            // zoomTo={0.5}
            //initialAspectRatio={cropRatio}
            aspectRatio={cropRatio}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            zoomable={false}
            // cropBoxMovable={false}
            // cropBoxResizable={false}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
                setCropper(instance);
            }}
            dragMode="none"
            restore={false}
            guides={false}
        />
    }
    </>
  )
}

export default memo(CropperBox);
