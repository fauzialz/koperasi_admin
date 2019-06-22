import ConfigApi from "./ConfigApi";

export default {
    STORE : {
        Name : 'Store',
        Icon : 'local_grocery_store',
        Url : ConfigApi.ROUTE.STORE,
        Input : ['Name', 'Address', 'Telephone', 'Email'],
    },
    MITRA : {
        Name : 'Mitra',
        Icon : 'people',
        Url : ConfigApi.ROUTE.MITRA,
        Input : ['Name', 'Address', 'Telephone', 'Email'],
    }
}