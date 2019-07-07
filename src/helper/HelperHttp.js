import axios from 'axios'
import config from '../config/ConfigApi'
import local from '../config/ConfigLocal'
import HelperCookie from './HelperCookie';
import { HeadersAppCode, HeadersToken, callbackBuild } from '../model/ModelHttp';

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
            let res = await axios.post(url, data, { headers : url === config.ROUTE.SIGN_IN? new HeadersAppCode() : new HeadersToken() })
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
            return callbackBuild(res)
        } catch (err) {
            console.log(err)
            let errResponse = err.response || err.message
            return  callbackBuild(errResponse)
        }
    }
}
