const fs = require('fs');
const { removeExtension } = require("../helper");

exports.uniqueFilename = (dir, filename)=>{
    if(dir && filename){
        let ext = filename.split(".");
        if(ext?.length>0){
            ext = ext.pop();
            let number = 1;
            let imageName = removeExtension(filename);
            let finalFileName = imageName;
            let fullPath = (dir+'/'+imageName+'.'+ext);
            while(fs.existsSync(fullPath)) {
                finalFileName = (imageName+'-'+number);
                fullPath = (dir+'/'+finalFileName+'.'+ext);
                number++;
            }
            finalFileName += ('.'+ext);
            if(fullPath && finalFileName){
                return [fullPath, finalFileName];
            }
        }
    }
    return '';
}