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

export const getQueryString = (url)=>{
    let queryString = [];
    if(url){
        url = url?.replace("?", "");
        url = url?.split("&");
        if(url && url?.length>0){
            for(let query of url){
                query = query.split("=");
                if(query && query?.length>0){
                    if(query?.[0] && query?.[1]){
                        queryString[query[0]] = query[1];
                    }
                }
            }
        }
    }
    return queryString;
}