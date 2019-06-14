import ConfigApi from "./ConfigApi";

export default {
    STORE : {
        Name : 'Store',
        Url : ConfigApi.ROUTE.STORE,
        Input : ['Name', 'Address', 'Telephone', 'Email'],
    }
}