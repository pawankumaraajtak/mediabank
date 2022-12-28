// export const getFileExtension = (filename)=>{
//     if(filename){
//         return filename.split('.').pop();
//     }
//     return "";
// }

export const getFileExtension = (fileExtension)=>{
    if(fileExtension){
        fileExtension = fileExtension.split("/");
        if(fileExtension.length>0){
            fileExtension = fileExtension[1];
            return fileExtension;
        }
    }
    return "";
}

export const cleanImageName = (imageName)=>{
    if(imageName){
        imageName = imageName.replace(/\s/g, '-');
    }
    return imageName;
}