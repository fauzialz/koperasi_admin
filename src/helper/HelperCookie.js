// ref: https://www.w3schools.com/js/js_cookies.asp

export default {
    /**
     * @param {string} key - The name of the key that hold cookie's value. Get listed key in ConfigLocal.ROUTE.
     * @param {*} value - The value you want to store as cookies.
     * @param {*} expires - UTC data time for set cookie's expire data
     */
    set: (key, value, expires) => {
        var exp
        if(expires) {
            exp = new Date(expires)
        }else{
            exp = new Date()
            exp.setTime(exp.getTime() + ( 24 * 60 * 60 * 1000 )) // one day time.
            exp = exp.toUTCString()
        }
        document.cookie = key + '=' + value + ';expires=' + exp + ';path=/'
    },
    /**
     * @param {string} key - The name of the key that hold cookie's value. Get listed key in ConfigLocal.ROUTE.
     */
    get: (key) => {
        key += '='
        let bigCookie = decodeURIComponent(document.cookie)
        let fragCookies = bigCookie.split(';')
        for(var i = 0; i< fragCookies.length; i++){
            let cookie = fragCookies[i]
            while(cookie.charAt(0) === ' '){
                cookie = cookie.substring(1)
            }
            if(cookie.indexOf(key) === 0){
                return cookie.substring(key.length, cookie.length)
            }
        }
    },
    /**
     * @param {string} key - The name of the key that hold cookie's value. Get listed key in ConfigLocal.ROUTE.
     */
    delete: (key) => {
        var now = new Date()
        now.setTime(now.getTime() - (7*24*60*60*1000));
        document.cookie = key + '=;expires=' + now + ';path=/'
    }
}