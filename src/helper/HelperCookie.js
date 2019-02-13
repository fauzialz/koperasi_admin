export default {
    setItem: (key, value, expires) => {
        var exp = new Date(expires)
        let cookieString = key + '=' + value + ';expires=' + exp + ';path=/'
        document.cookie = cookieString
    },
}