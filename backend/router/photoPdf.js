var router = require('express').Router();
const exiftool = require("exiftool-vendored").exiftool;
const multer  = require('multer');
const moment = require('moment');
const axios  = require('axios');
const fs = require('fs');
const { getImageType, secureUrl, fileNameWithImageType } = require('../helper');
const { uniqueFilename } = require('../lib/uniquefilename');
const { awsUpload } = require('../lib/awsupload');
const { renameImage } = require('../lib/renameimage');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/tmp/')
    },
    filename: function (req, file, cb) {
        let imgName = renameImage(file.originalname);
        cb(null, imgName);
    }
});

const upload = multer({ storage : storage });

router.post('/', upload.array('uploadImgInput', 1), async function (req, res, next) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    //console.log("req", req.body);
    console.log("req.file", req.files);

    let responseMsg = "Something went wrong";

    let bodyInfo = req.body;
    //console.log("bodyInfo", bodyInfo);
    let postData = {};
    postData['img_name'] = ((bodyInfo.img_name) ? bodyInfo.img_name : '');
    postData['img_title'] = ((bodyInfo.img_title) ? bodyInfo.img_title : '');
    postData['img_caption'] = ((bodyInfo.img_caption) ? bodyInfo.img_caption : '');
    postData['img_keywords'] = ((bodyInfo.img_keywords) ? bodyInfo.img_keywords : '');
    postData['img_folder'] = ((bodyInfo.img_folder) ? bodyInfo.img_folder : '');
    postData['img_source'] = ((bodyInfo.img_source) ? bodyInfo.img_source : '');
    postData['img_copyright'] = ((bodyInfo.img_copyright) ? bodyInfo.img_copyright : '');
    postData['img_type'] = ((bodyInfo.img_type) ? bodyInfo.img_type : '');
    postData['img_remark'] = ((bodyInfo.img_remark) ? bodyInfo.img_remark : '');
    postData['img_directory'] = "";
    postData['img_author'] = ((bodyInfo.img_author) ? bodyInfo.img_author : '');
    postData['img_dimensions'] = "";
    postData['img_iptc_info'] = "";
    postData['img_16x9'] = "";
    postData['img_sef'] = "";
    postData['img_height'] = "";
    postData['img_width'] = "";
    postData['img_updatedtime'] = "";
    postData['img_weight'] = "";
    postData['img_1x1'] = "";
    postData['img_size'] = "";
    postData['img_full_url'] = "";
    postData['img_path'] = "";
    postData['img_3x4'] = "";
    postData['img_9x16'] = "";


    let totalImageTypes = [];

    if((req.files.length>0) && bodyInfo.img_folder){

        let fileInfo = req.files[0];
        const today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        month++;
        
        let tmpPath = 'public/tmp/';
        let folderPath = 'public/'+bodyInfo.img_folder+'/'+month+'-'+year;

        postData['img_directory'] = ("/"+ (folderPath.replace("public/", "")));

        //for(let fileInfo of req.files){ 
            if(fileInfo.filename){
                if(month && year){

                    let fileSize = fileInfo.size;
                    let fileName = fileInfo.filename;
                    let tmpFilePath = (tmpPath+fileName);
                    //let imageType = getImageType(fileName);
                    let imgfolderPath = folderPath;

                    let newFilePath = folderPath+'/'+fileName;

                    [newFilePath, fileName] = uniqueFilename(folderPath, fileName);

                    console.log("newFilePath", newFilePath, fileName);

                    if(tmpFilePath && newFilePath && fileName && folderPath){
                        let cleanNewFilePath = ("/" + (newFilePath.replace("public/", "")));
                        postData['img_full_url'] = cleanNewFilePath;
                        postData['img_path'] = cleanNewFilePath;
                        postData['img_sef'] = cleanNewFilePath;

                        if(fs.existsSync(tmpPath)){
                            try{
                                let filePath = fs.readFileSync(tmpFilePath);
                                filePath = Buffer.from(filePath).toString('base64');

                                let cleanNewFilePathArray = cleanNewFilePath.split("/");
                                if(cleanNewFilePathArray?.length>0){
                                    let uploadFileName = cleanNewFilePathArray.pop();
                                    cleanNewFilePath = cleanNewFilePathArray.join("/");
                                    if(cleanNewFilePath && uploadFileName && filePath && fileSize){
                                        let awsResponse = await awsUpload(cleanNewFilePath, uploadFileName, filePath, fileSize);
                                        //console.log("awsResponse", awsResponse);
                                        if(!awsResponse?.error){
                                            let s3_url = awsResponse?.s3_response?.public_url
                                            if(s3_url){
                                                fs.unlinkSync(tmpFilePath);
                                                const response = await axios.post('http://localhost/esearch/esearch-simpleapi/httpdocs/put/image-bank/', postData);
                                                //console.log("responseData", response)
                                                if(response && response?.data){
                                                    let message = response?.data?.message;
                                                    if(!message.errors){
                                                        responseMsg = JSON.stringify(["pdf saved, url - "+s3_url]);
                                                    }
                                                    else{
                                                        responseMsg = JSON.stringify(message?.items);
                                                    }
                                                }
                                            }
                                        }
                                        // let result = fs.renameSync(tmpFilePath, newFilePath);
                                    }
                                }
                            }
                            catch(e){
                                console.log("fs rename error", e);
                            }
                        }
                    }
                }
            }
        //}
    }

    // if(totalImageTypes.length>0){
    //     const response = await axios.post('http://localhost/esearch/esearch-simpleapi/httpdocs/put/image-bank/', postData);
    //     console.log("response", response)
    //     if(response && response?.data){
    //         if(response?.data?.status){
    //             let message = response?.data?.message
    //             if(!message.errors){
    //                 responseMsg = JSON.stringify(totalImageTypes);
    //             }
    //             else{
    //                 responseMsg = JSON.stringify(message?.items);
    //             }
    //         }
    //         else{

    //         }
    //     }
    //     else{

    //     }
    // }
    
    res.status(200).end(responseMsg);
    return;
});

module.exports = router;