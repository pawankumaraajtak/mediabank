var router = require('express').Router();
const axios  = require('axios');

router.get('/', async function (req, res, next) {
    let {keyword} = req.params;
    let result = {
        type: 'error',
        message: 'Something went wrong'
    }
    let apiUrl = 'http://localhost/esearch/esearch-simpleapi/httpdocs/search_image_bank.php';
    if(keyword){
        apiUrl += ("?keyword="+keyword);
    }
    const response = await axios.get(apiUrl);
    if(response){
        //console.log("response", response)
        if(response?.data?.data){
            //console.log("response", response.data)
            result = {
                type: 'success',
                message: response?.data?.data
            }
            res.send(result);
            return;
        }
    }
    res.send(result);
});

module.exports = router;