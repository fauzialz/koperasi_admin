import axios from 'axios'
import config from '../config/ConfigApi'
import local from '../config/ConfigLocal'
import HelperCookie from './HelperCookie';
import { AxiosOption, HeadersAppCode, HeadersToken, callbackBuild } from '../model/ModelHttp';

export default {
    /**
     * @param {string} url - API url. Get listed url in ConfigApi.ROUTE.
     */
    get: async (url) => {
        if(HelperCookie.get(local.TOKEN) === null) {
           return callbackBuild() 
        }
        try {
            let res = await axios.get(url, { headers : new HeadersToken() })
            if( res.headers.etag ) {
                res.data.Result['Etag'] = res.headers.etag
            }
            return callbackBuild(res)
        } catch (err) {
            console.log(err)
            let errResponse = err.response || err.message
            return callbackBuild(errResponse)
        }
    },

     /**
     * @param {string} url - API url. Get listed url in ConfigApi.ROUTE.
     * @param {Object} data - Some data to post.
     */
    post: async (url, data) => {
        if(HelperCookie.get(local.TOKEN) === null) {
            return callbackBuild()
        }
        try {
            let res = await axios.post(url, data, { headers : new HeadersToken() })
            return callbackBuild(res)
        } catch (err) {
            console.log(err)
            let errResponse = err.response || err.message
            return  callbackBuild(errResponse)
        }
    },

    /**
     * @param {string} url - API url. Get listed url in ConfigApi.ROUTE.
     * @param {Number} id - Row data Id.
     * @param {String} Etag - Etag string for row data. Get it when find by id.
     * @param {Object} data - Edited data.
     */
    put: async (url, id, Etag, data) => {
        if(HelperCookie.get(local.TOKEN) === null || !data || !url || !Etag | !id) {
            return callbackBuild()
        }
        try {
            let setting = { headers : new HeadersToken() }
            setting.headers['If-Match'] = Etag
            let res = await axios.put(`${url}/${id}`, data, setting)  
            return callbackBuild(res)
        } catch (err) {
            console.log(err)
            let errResponse = err.response || err.message
            return  callbackBuild(errResponse)
        }
    },

    /**
     * @param {string} url - API url. Get listed url in ConfigApi.ROUTE.
     * @param {Number} id - Row data Id.
     * @param {String} Etag - Etag string for row data. Get it when find by id.
     */
    delete: async (url, id, Etag) => {
        if(HelperCookie.get(local.TOKEN) === null || !id || !url || !Etag) {
            return callbackBuild()
        }
        try {
            let setting = { headers : new HeadersToken() }
            setting.headers['If-Match'] = Etag
            let res = await axios.delete(`${url}/${id}`, setting)
            debugger
            return callbackBuild(res)
        } catch (err) {
            console.log(err)
            let errResponse = err.response || err.message
            return  callbackBuild(errResponse)
        }
    },

    /**
     * @param {string} url - API url. Get listed url in ConfigApi.ROUTE.
     * @param {string} method - HTTP Request method. Get listed methods in ConfigApi.METHOD.
     * @param {Object} json - Data in a form of Object to be sent to API.
     * @param {requestCallback} cb - Callback function that handle the response. common form : (success, response) => {...}
     * @callback requestCallback 
     * @param {boolean} success - Handle success response.
     * @param {Object} response - Handle response body data.
     */
    request: (url, method, json, cb) => {
        let option = new AxiosOption( url, method, json)
        if (url === config.ROUTE.SIGN_IN){
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
