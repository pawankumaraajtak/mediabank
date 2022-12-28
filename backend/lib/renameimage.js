const moment = require('moment');
const { removeExtension } = require('../helper');

exports.renameImage = (image)=>{
    let imagename = "";
    if(image){
        let encodeString = moment().format('DDmmss');
        let ext = image.split(".").pop();
        removeExtension
        let imgNameAfterSplit = removeExtension(image);
        if(imgNameAfterSplit && ext){
            imagename = imgNameAfterSplit + '-' + encodeString;
            //imagename = imgNameAfterSplit;
            imagename += ("."+ext);
            imagename = imagename.toLowerCase();
        }
    }
    return imagename;
}