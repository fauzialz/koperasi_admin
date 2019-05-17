import ConfigApi from "../config/ConfigApi";
import HelperCookie from "../helper/HelperCookie";
import ConfigLocal from "../config/ConfigLocal";

class AxiosOption {
    /**
     * @param {string} url - API url. Get listed url in ConfigApi.ROUTE.
     * @param {string} method - HTTP Request Method.
     * @param {Object} json - Object data to send to API.
     * */
    constructor(url, method, json) {
        this.url =  url
        this.method = method
        this.headers = {}
        this.data = json
    }
}

class HeadersAppCode {
    /**
     * Return { Content-Type : "content type", ApplicationCode : "application code" }
     * */
    constructor() {
        this['Content-Type'] = ConfigApi.HEADERS.content_type
        this.ApplicationCode = ConfigApi.HEADERS.application_code
    }
}

class HeadersToken {
    /**
     * Return { Content-Type : "content type", Authorization : "Bearer TOKEN" }
     * */
    constructor() {
        this["Content-Type"] = ConfigApi.HEADERS.content_type
        this.Authorization = 'Bearer ' + HelperCookie.get(ConfigLocal.TOKEN)
    }
}

/**
 * @param {number} status - API response HTTP Status Code.
 * @param {boolean} success - Indicate bussines success or not. (false if null)
 * @param {Object} data - API response data. ('No data' if null)
 * @param {string} message - API response massage. ('No message' if null)
 * Create proper format for callback.
 * */
var callbackFormat = (status, success = false, data = 'No data.', message = 'No message.') => {
    let newFormat = {
        status : status,
        success : success,
        data : data,
        message: !status ? 'Fetching API data canceled due to internal evaluation.' : message
    }
    return newFormat
}

/**
 * @param {Object} res - API response object. (null if null)
 * @param {boolean} good - Is API give a good response or not. (true if null)
 * Build proper format for callback from API response object.
 * */
var callbackBuild = (res) => {
    if( !res ) {
        return callbackFormat()
    }
    return callbackFormat( res.status ,res.data.IsSuccess, ( res.data.Result || res ), res.data.Message)
} 

export {
    AxiosOption,
    HeadersAppCode,
    HeadersToken,
    callbackFormat,
    callbackBuild
}