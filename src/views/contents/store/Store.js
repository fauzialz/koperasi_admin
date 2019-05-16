import React from 'react'
import Dummy from '../dummy';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigApi from '../../../config/ConfigApi';
import './Store.scss'
import ConfigLocal from '../../../config/ConfigLocal';

class Store extends React.Component {
    state = {
        contentData : {},
        contentLoading : true,
        contentProps : {
            title : 'Store'
        }
    }

    componentDidMount() {
        this.setState({contentLoading : true})
        debugger
        HelperHttp.get(ConfigApi.ROUTE.STORE, (res)  => {
            this.setState({
                contentData : res,
                contentLoading : false
            })
        })
    }

    render () {
        const { contentProps } = this.state
        return (
            <React.Fragment>
                { this.state.contentLoading ?
                    <Dummy />:
                    <div className="content-wrapper">
                        <div className="content-title">{contentProps.title}</div>
                        <div className="table-holder">
                            {ConfigLocal.LOREMIPSUM}
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default Store