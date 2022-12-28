const moment = require('moment');

exports.renameImage = (image)=>{
    let imagename = "";
    if(image){
        let date = Date.now();
        let dd = date.getDate();
        let mm = date.getMonth();
        mm++;
        let ss = date.getSeconds(); 
        let encodeString = moment().format('dd-mm-ss');
        let ext = image.split(".").pop();
        let imgNameAfterSplit = this.removeExtension(image);
        if(imgNameAfterSplit && ext){
            imagename = imgNameAfterSplit + '-' + encodeString;
            imagename = imgNameAfterSplit;
            imagename += ("."+ext);
            imagename = imagename.toLowerCase();
        }
    }
    return imagename;
}

exports.removeExtension = (filename) =>{
    if(filename){
        return filename.substring(0, filename.lastIndexOf('.')) || filename;
    }
    return false;
}

exports.getImageType = (filename)=>{
    if(filename.includes("_16_9")){
        return "16x9";
    }
    else if(filename.includes("_9_16")){
        return "9x16";
    }
    else if(filename.includes("_3_4")){
        return "3x4";
    }
    else if(filename.includes("_1_1")){
        return "1x1";
    }
    return "original";
}

exports.secureUrl = (url)=>{
    let baseDomain = "http://localhost:3005/";
    if(url){
        return baseDomain+url;
    }
    return url;
}