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

exports.fileNameWithImageType = (filename, type)=>{
    if(filename && type){
        if(type!='original'){
            let ext = filename.split(".");
            if(ext?.length>0){
                let extension = ext.pop();
                let imageName = ext.join(".");
                imageName = (imageName+'-'+type);
                imageName += ("."+extension);
                return imageName;
            }
        }
    }
    return filename;
}

exports.secureUrl = (url)=>{
    let baseDomain = "http://localhost:3005/";
    if(url){
        return baseDomain+url;
    }
    return url;
}