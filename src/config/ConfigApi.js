const MAIN_API = 'https://beemart-development.azurewebsites.net/api'

export default {
    API_URL: MAIN_API,
    ROUTE: {
        SIGN_IN:    MAIN_API + '/authentication',
        MENU:       MAIN_API + '/menu',
        GET_MENU:   MAIN_API + '/menu/navbar',
        STORE:      MAIN_API + '/store'
    },
    HEADERS : {
        content_type: 'application/json',
        application_code: '6D7668B6-919B-4BEA-81E4-71E090339D8C'
    },
    METHODS : {
        GET : 'get',
        POST : 'post',
        PUT : 'put',
        DEL : 'delete'
    }
    
}