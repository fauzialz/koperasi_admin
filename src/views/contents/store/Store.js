import React from 'react'
import Dummy from '../dummy';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigApi from '../../../config/ConfigApi';

class Store extends React.Component {


    componentDidMount() {
        HelperHttp.get(ConfigApi.ROUTE.STORE, (res) => {
            alert(res.message)
        })
    }

    render () {
        return <Dummy />
    }
}

export default Store