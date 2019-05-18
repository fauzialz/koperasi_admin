import React from 'react'
import Dummy from '../dummy';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigApi from '../../../config/ConfigApi';
import './Store.scss'
// import ConfigLocal from '../../../config/ConfigLocal';
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
            Name : 'Nama Kantor ' + d.getTime(),
            Address : 'Jl. Bulungan No. 9, Jakarta Selatan',
            Telephone : '081234234234' ,
            Email : 'emailkantor@gmail.com'
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
            console.log(res.data)
            this.setState({
                contentData : res.data,
                contentLoading : false
            })
        })
    }

    componentDidMount() {
        this.getStore()
    }

    render () {
        const { contentProps, contentData } = this.state
        return (
            <React.Fragment>
                { this.state.contentLoading ?
                    <Dummy />:
                    <div className="content-wrapper">
                        <div className="content-title">{contentProps.title}</div>
                        <Button onClick={this.createStore} label="Create New Store" depressed blue /> 
                        <div className="table-holder">

                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th><th>Address</th><th>Telephone</th><th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { contentData.map( (el) => {
                                        return (
                                            <tr key={el.Id}>
                                                <td>{el.Name}</td><td>{el.Address}</td><td>{el.Telephone}</td><td>{el.Email}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default Store