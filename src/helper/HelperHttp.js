import axios from 'axios'
import config from '../config/ConfigApi'
import local from '../config/ConfigLocal'
import HelperCookie from './HelperCookie';
import { AxiosOption, HeadersAppCode, HeadersToken, callbackBuild } from '../model/ModelHttp';

export default {
    /**
     * @param {string} route - API Endpoint. Get listed routes in ConfigApi.ROUTE.
     * @param {requestCallback} cb - Callback function that handle the response. common form : (res) => {...}
     * @callback requestCallback 
     * @param {Object} res - res contain status {boolean}, data {Object}, and message {string}
     */
    get: (route, cb) => {
        if(HelperCookie.get(local.TOKEN) === null) {
           cb ( callbackBuild() )
        }
        let setting = { headers : new HeadersToken() }
        axios.get(config.API_URL + route, setting)
        .then( res => {
            if( res.headers.etag ) {
                res.data.Result['Etag'] = res.headers.etag
            }
            cb ( callbackBuild(res) )
        })
        .catch(err => {
            let errResponse = err.response
            cb ( callbackBuild(errResponse, false))
        })
    },

    /**
     * @param {string} route - API Endpoint. Get listed routes in ConfigApi.ROUTE.
     * @param {string} method - HTTP Request method. Get listed methods in ConfigApi.METHOD.
     * @param {Object} json - Data in a form of Object to be sent to API.
     * @param {requestCallback} cb - Callback function that handle the response. common form : (success, response) => {...}
     * @callback requestCallback 
     * @param {boolean} success - Handle success response.
     * @param {Object} response - Handle response body data.
     */
    request: (route, method, json, cb) => {
        let option = new AxiosOption( route, method, json)
        if (route === config.ROUTE.SIGN_IN){
            option.headers = new HeadersAppCode()
        }else{
            // if not Sign in, do this
            option.headers = new HeadersToken()
            if (method === config.METHODS.PUT || method === config.METHODS.DEL) {
                option.url += '/' + json.Id
                option.headers['If-Match'] = json.Etag
            }
            delete option.data.Id
            delete option.data.Etag
            delete option.data.Code
            delete option.data.Order
        }
        axios(option)
        .then(res => {
            if(method === config.METHODS.GET && res.headers.etag) {
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
    },
}
