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
                'Authorization': 'Bearer ' + HelperCookie.get(local.TOKEN),
                "Content-Type": config.HEADERS.conten_type
            }
            if (method === config.METHODS.PUT) {
                option.url += '/' + json.Id
                option.headers['If-Match'] = json.Etag
                delete option.data.Id
                delete option.data.Etag
            }
        }
        axios(option)
        .then(res => {
            if (res.headers.etag) {
                res.data.Result['Etag'] = res.headers.etag
            }
            cb(res.data.IsSuccess, res.data)
        })
        .catch(err => {
            if(err.response === undefined){  
                cb(false, { Message: 'Lost connection with server.' })
            }else{
                cb(false, err.response.data)
            }
        })
    }
}