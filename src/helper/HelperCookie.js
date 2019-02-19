// ref: https://www.w3schools.com/js/js_cookies.asp

export default {
    set: (key, value, expires) => {
        var exp = new Date(expires)
        document.cookie = key + '=' + value + ';expires=' + exp + ';path=/'
    },
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
    delete: (key) => {
        var now = new Date()
        now.setTime(now.getTime() - (7*24*60*60*1000));
        document.cookie = key + '=;expires=' + now + ';path=/'
    }
}