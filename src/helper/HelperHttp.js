import axios from 'axios'
import config from '../config/ConfigApi'
import local from '../config/ConfigLocal'
import HelperCookie from './HelperCookie';

export default {
    request: (route, method, json, cb) => {
        let option = {
            url: config.API_URL + route,
            method: method,
            headers: {},
            data: json
        }
        if (route === config.ROUTE.SIGN_IN){
            option.headers = {
                "Content-Type": config.HEADERS.conten_type,
                "ApplicationCode": config.HEADERS.application_code
            }
        }else{
            // if not Sign in, do this
            option.headers = {
                'Authorization': 'Bearer ' + HelperCookie.get(local.TOKEN)
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