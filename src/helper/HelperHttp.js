import axios from 'axios'
import config from '../config/ConfigApi'


export default {
    request: (route, method, json, cb) => {
        let option = {
            url: config.API_URL + config.ROUTE[route],
            method: method,
            headers: {},
            data: json
        }
        if (route === 'SIGN_IN'){
            option.headers = {
                "Content-Type": config.HEADERS.conten_type,
                "ApplicationCode": config.HEADERS.application_code
            }
        }else{
            // if not Sign in, do this
            option.headers = {
                'Authorization': 'TOKEN'//soon change this
            }
        }

        axios(option)
        .then(res => {
            cb(true, res.data)
        })
        .catch(err => {
            if(err.response === undefined){
                cb(false, 'Lost connection with server.')
            }else{
                cb(false, err.response.data.Message)
            }
        })
    }
}