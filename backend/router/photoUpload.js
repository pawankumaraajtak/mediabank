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

router.post('/', upload.array('uploadImgInput', 5), async function (req, res, next) {
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

        // const today = new Date();
        // let month = today.getMonth();
        // let year = today.getFullYear();
        // month++;

        let monthYear = moment().format('MM-YYYY');
        
        let tmpPath = 'public/tmp/';
        let folderPath = bodyInfo.img_folder+'/'+monthYear;

        postData['img_directory'] = ("/"+ folderPath);

        for(let fileInfo of req.files){ 
            if(fileInfo.filename){
                if(monthYear){

                    let fileSize = fileInfo.size;
                    let fileName = fileInfo.filename;
                    let tmpFilePath = (tmpPath+fileName);
                    let imageType = getImageType(fileName);
                    // let imgfolderPath = (folderPath + (imageType ? ('/'+imageType) : ''));
                    //let imgfolderPath = folderPath;

                    fileName = fileName.replace("_16_9", "").replace("_9_16", "").replace("_3_4", "").replace("_1_1", "");

                    fileName = fileNameWithImageType(fileName, imageType);

                    let newFilePath = folderPath+'/'+fileName;

                    console.log("newFilePath", newFilePath, fileName);

                    if(tmpFilePath && newFilePath && fileName && imageType && folderPath){
                        let cleanNewFilePath = ("/" + (newFilePath.replace("public/", "")));
                        if(imageType=="original"){
                            postData['img_full_url'] = cleanNewFilePath;
                            postData['img_path'] = cleanNewFilePath;
                            postData['img_sef'] = cleanNewFilePath;

                            // let exifData = await exiftool.read(__dirname +'/public/psi/new_image.jpg');
                            // let exifData = await exiftool.read(__dirname +'/'+ tmpFilePath);
                            //let tmpFilePathNew = path.join(tmpFilePath);
                            let exifData = await exiftool.read(tmpFilePath);
                            //console.log("exifData", exifData);

                            let iptcData = {
                                FileSize: (exifData?.FileSize ? exifData?.FileSize : ''),
                                FileType: (exifData?.FileType ? exifData?.FileType : ''),
                                MIMEType: (exifData?.MIMEType ? exifData?.MIMEType : ''),
                                ExifByteOrder: (exifData?.ExifByteOrder ? exifData?.ExifByteOrder : ''),
                                CurrentIPTCDigest: (exifData?.CurrentIPTCDigest ? exifData?.CurrentIPTCDigest : ''),
                                ImageWidth: (exifData?.ImageWidth ? exifData?.ImageWidth : ''),
                                ImageHeight: (exifData?.ImageHeight ? exifData?.ImageHeight : ''),
                                EncodingProcess: (exifData?.EncodingProcess ? exifData?.EncodingProcess : ''),
                                BitsPerSample: (exifData?.BitsPerSample ? exifData?.BitsPerSample : ''),
                                ColorComponents: (exifData?.ColorComponents ? exifData?.ColorComponents : ''),
                                YCbCrSubSampling: (exifData?.YCbCrSubSampling ? exifData?.YCbCrSubSampling : ''),
                                JFIFVersion: (exifData?.JFIFVersion ? exifData?.JFIFVersion : ''),
                                ResolutionUnit: (exifData?.ResolutionUnit ? exifData?.ResolutionUnit : ''),
                                XResolution: (exifData?.XResolution ? exifData?.XResolution : ''),
                                YResolution: (exifData?.YResolution ? exifData?.YResolution : ''),
                                ImageDescription: (exifData?.ImageDescription ? exifData?.ImageDescription : ''),
                                Make: (exifData?.Make ? exifData?.Make : ''),
                                Model: (exifData?.Model ? exifData?.Model : ''),
                                Copyright: (exifData?.Copyright ? exifData?.Copyright : ''),
                                ExposureProgram: (exifData?.ExposureProgram ? exifData?.ExposureProgram : ''),
                                ISO: (exifData?.ISO ? exifData?.ISO : ''),
                                ExifVersion: (exifData?.ExifVersion ? exifData?.ExifVersion : ''),
                                DateTimeOriginal: (exifData?.DateTimeOriginal?.rawValue ? exifData?.DateTimeOriginal?.rawValue : ''),
                                CreateDate: (exifData?.CreateDate?.rawValue ? exifData?.CreateDate?.rawValue : ''),
                                MeteringMode: (exifData?.MeteringMode ? exifData?.MeteringMode : ''),
                                LightSource: (exifData?.LightSource ? exifData?.LightSource : ''),
                                Flash: (exifData?.Flash ? exifData?.Flash : ''),
                                SubSecTimeOriginal: (exifData?.SubSecTimeOriginal ? exifData?.SubSecTimeOriginal : ''),
                                SubSecTimeDigitized: (exifData?.SubSecTimeDigitized ? exifData?.SubSecTimeDigitized : ''),
                                WhiteBalance: (exifData?.WhiteBalance ? exifData?.WhiteBalance : ''),
                                FocalLengthIn35mmFormat: (exifData?.FocalLengthIn35mmFormat ? exifData?.FocalLengthIn35mmFormat : ''),
                                Contrast: (exifData?.Contrast ? exifData?.Contrast : ''),
                                Saturation: (exifData?.Saturation ? exifData?.Saturation : ''),
                                Sharpness: (exifData?.Sharpness ? exifData?.Sharpness : ''),
                                XPKeywords: (exifData?.XPKeywords ? exifData?.XPKeywords : ''),
                                Padding: (exifData?.Padding?.rawValue ? exifData?.Padding?.rawValue : ''),
                                Rights: (exifData?.Rights ? exifData?.Rights : ''),
                                AssetID: (exifData?.AssetID ? exifData?.AssetID : ''),
                                WebStatement: (exifData?.WebStatement ? exifData?.WebStatement : ''),
                                Creator: (exifData?.Creator?.[0] ? exifData?.Creator?.[0] : ''),
                                Description: (exifData?.Description ? exifData?.Description : ''),
                                Licensor: (exifData?.Licensor?.[0]?.['LicensorURL'] ? exifData?.Licensor?.[0]?.['LicensorURL'] : ''),
                                Subject: (exifData?.Subject?.[0] ? exifData?.Subject?.[0] : ''),
                                CameraSerialNumber: (exifData?.CameraSerialNumber ? exifData?.CameraSerialNumber : ''),
                                DateAcquired: (exifData?.DateAcquired?.rawValue ? exifData?.DateAcquired?.rawValue : ''),
                                FlashManufacturer: (exifData?.FlashManufacturer ? exifData?.FlashManufacturer : ''),
                                FlashModel: (exifData?.FlashModel ? exifData?.FlashModel : ''),
                                LensManufacturer: (exifData?.LensManufacturer ? exifData?.LensManufacturer : ''),
                                LensModel: (exifData?.LensModel ? exifData?.LensModel : ''),
                                LastKeywordXMP: (exifData?.LastKeywordXMP?.[0] ? exifData?.LastKeywordXMP?.[0] : ''),
                                LastKeywordIPTC: (exifData?.LastKeywordIPTC?.[0] ? exifData?.LastKeywordIPTC?.[0] : ''),
                                CodedCharacterSet: (exifData?.CodedCharacterSet ? exifData?.CodedCharacterSet : ''),
                                'By-line': (exifData?.['By-line'] ? exifData?.['By-line'] : ''),
                                'Caption-Abstract': (exifData?.['Caption-Abstract'] ? exifData?.['Caption-Abstract'] : ''),
                                CopyrightNotice: (exifData?.CopyrightNotice ? exifData?.CopyrightNotice : ''),
                                Credit: (exifData?.Credit ? exifData?.Credit : ''),
                                DateCreated: (exifData?.DateCreated?.rawValue ? exifData?.DateCreated?.rawValue : ''),
                                TimeCreated: (exifData?.TimeCreated?.rawValue ? exifData?.TimeCreated?.rawValue : ''),
                                Keywords: (exifData?.Keywords ? exifData?.Keywords : ''),
                                IPTCDigest: (exifData?.IPTCDigest ? exifData?.IPTCDigest : ''),
                                DateTimeCreated: (exifData?.DateTimeCreated?.rawValue ? exifData?.DateTimeCreated?.rawValue : ''),
                                CreateDate: (exifData?.CreateDate?.rawValue ? exifData?.CreateDate?.rawValue : ''),
                                DateTimeOriginal: (exifData?.DateTimeOriginal?.rawValue ? exifData?.DateTimeOriginal?.rawValue : ''),
                                ImageSize: (exifData?.ImageSize ? exifData?.ImageSize : ''),
                                Megapixels: (exifData?.Megapixels ? exifData?.Megapixels : ''),
                            }

                            //console.log("iptcData", iptcData);
    
                            postData['img_iptc_info'] = JSON.stringify(iptcData);
                            postData['img_weight'] = (iptcData?.FileSize ? parseInt(iptcData.FileSize) : '');
                            postData['img_height'] = (iptcData?.ImageHeight ? iptcData.ImageHeight : '');
                            postData['img_width'] = (iptcData.ImageWidth ? iptcData.ImageWidth : '');
                            postData['img_dimensions'] = (iptcData.ImageSize ? iptcData.ImageSize : '');
                        }
                        if(imageType=='16x9'){
                            postData['img_16x9'] = fileName;
                        }
                        if(imageType=='9x16'){
                            postData['img_9x16'] = fileName;
                        }
                        if(imageType=='3x4'){
                            postData['img_3x4'] = fileName;
                        }
                        if(imageType=='1x1'){
                            postData['img_1x1'] = fileName;
                        }

                        // if(!fs.existsSync(tmpPath)){
                        //     fs.mkdirSync(tmpPath, { recursive: true });
                        // }

                        // if(!fs.existsSync(imgfolderPath)){
                        //     fs.mkdirSync(imgfolderPath, { recursive: true });
                        // }
                        //if(fs.existsSync(tmpPath) && fs.existsSync(imgfolderPath)){

                        if(fs.existsSync(tmpPath)){
                            try{
                                // let filePath = fs.readFileSync(__dirname +'/'+ "public/new_image.jpg");
                                //let tmpFilePathNew = path.join(tmpFilePath);
                                let filePath = fs.readFileSync(tmpFilePath);
                                filePath = Buffer.from(filePath).toString('base64');

                                let cleanNewFilePathArray = cleanNewFilePath.split("/");
                                if(cleanNewFilePathArray?.length>0){
                                    let uploadFileName = cleanNewFilePathArray.pop();
                                    cleanNewFilePath = cleanNewFilePathArray.join("/");
                                    if(cleanNewFilePath && uploadFileName && filePath && fileSize){
                                        let awsResponse = await awsUpload(cleanNewFilePath, uploadFileName, filePath, fileSize);
                                        console.log("awsResponse", awsResponse)
                                        if(!awsResponse?.error){
                                            let s3_url = awsResponse?.s3_response?.public_url
                                            if(imageType && s3_url){
                                                fs.unlinkSync(tmpFilePath);
                                                // totalImageTypes.push(imageType+" image saved, url - "+s3_url);
                                                totalImageTypes.push({
                                                    imageType: imageType,
                                                    s3_url: s3_url
                                                });
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
        }
    }

    if(totalImageTypes.length>0){
        const response = await axios.post('http://localhost/esearch/esearch-simpleapi/httpdocs/put/image-bank/', postData);
        console.log("response", response.data)
        if(response && response?.data){
            if(response?.data?.status){
                let message = response?.data?.message
                if(!message.errors){
                    responseMsg = JSON.stringify(totalImageTypes);
                }
                else{
                    responseMsg = JSON.stringify(message?.items);
                }
            }
            else{

            }
        }
        else{

        }
    }
    
    res.status(200).end(responseMsg);
    return;
});

module.exports = router;