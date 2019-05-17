import React from 'react'
import Dummy from '../dummy';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigApi from '../../../config/ConfigApi';
import './Store.scss'
import ConfigLocal from '../../../config/ConfigLocal';
import Button from '../../../components/button'

class Store extends React.Component {
    state = {
        contentData : {},
        contentLoading : true,
        contentProps : {
            title : 'Store'
        }
    }

    createStore = () => {
        let d = new Date()
        let dummyData = {
            Name : 'Mapan - PT RUMA ' + d.getTime(),
            Address : 'Jl. Bulungan No. 9, Jakarta Selatan '+ d.getTime(),
            Telephone : '081234234234 ' + d.getTime(),
            Email : 'mapan@gmail.com '+ d.getTime()
        }
        HelperHttp.post(ConfigApi.ROUTE.STORE, dummyData, (res) => {
            console.log(res)
            if ( res.status === 200 && res.success) {
                this.getStore()
            }
        })
    }

    getStore = () => {
        this.setState({contentLoading : true})
        HelperHttp.get(ConfigApi.ROUTE.STORE, (res)  => {
            console.log(res)
            this.setState({
                contentData : res,
                contentLoading : false
            })
        })
    }

    componentDidMount() {
        this.getStore()
    }

    render () {
        const { contentProps } = this.state
        return (
            <React.Fragment>
                { this.state.contentLoading ?
                    <Dummy />:
                    <div className="content-wrapper">
                        <div className="content-title">{contentProps.title}</div>
                        <Button onClick={this.createStore} label="Create New Store" depressed blue /> 
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