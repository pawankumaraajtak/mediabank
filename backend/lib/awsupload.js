const axios = require('axios');

exports.awsUpload = async (folder, filename, filePath, fileSize)=>{

    let form = {
        site: "indiatoday",
        type: "story",
        added_by: "1",
        folder: "testing"+folder,
        file_name: filename,
        size: fileSize,
        is_public: "Y",
        file: filePath
    }

    let response = await axios.post("http://feeds.intoday.in/s3_uploader/", form,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    //console.log("response", response)

    if(response?.data){
        return response.data;
    }
    return "";
}