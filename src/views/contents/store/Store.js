import React from 'react'
import Dummy from '../dummy';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigApi from '../../../config/ConfigApi';
import './Store.scss'
import ConfigLocal from '../../../config/ConfigLocal';
import Button from '../../../components/button'

class Store extends React.Component {
    state = {
        contentData : [],
        contentLoading : true,
        contentProps : {
            title : 'Store',
            icon : ConfigLocal.MISC.MaterialIcon + ' action-button-icon'
        },
        tableHover: {},
    }

    onMouseOverHandler = (e) => {
        let hotTableHover = this.state.tableHover
        for(let i in hotTableHover){
            if(i === e.toString()) {
                hotTableHover[i] = true
            }else{
                hotTableHover[i] = false
            }
        }
        this.setState({tableHover: hotTableHover})
    }

    onMouseLeaveHandler = () => {
        let hotTableHover = this.state.tableHover
        for(let i in hotTableHover){
            hotTableHover[i] = false
        }
        this.setState({tableHover: hotTableHover})
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
            let temp = {}
            for(let i in res.data) {
                temp[res.data[i].Id]=false
            } 
            this.setState({
                contentData : res.data,
                contentLoading : false,
                tableHover : temp
            })
        })
    }

    componentDidMount() {
        this.getStore()
    }

    render () {
        const { contentProps, contentData, tableHover } = this.state
        return (
            <React.Fragment>
                { this.state.contentLoading ?
                    <Dummy />:
                    <div className="content-wrapper">
                        <div className="content-title">{contentProps.title}</div>
                        <Button onClick={this.createStore} label="Create New Store" depressed blue /> 
                        <div className="table-holder">

                            <div className="row-hover-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th><th>Address</th><th>Telephone</th><th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { contentData.map( (el,n) => {
                                            return (
                                                <tr key={el.Id} onMouseEnter={() => this.onMouseOverHandler(el.Id)} onMouseLeave={this.onMouseLeaveHandler}>
                                                    <td >
                                                        <span>{el.Name}</span>
                                                        
                                                        {/* THIS IS HOVER ACTION BUTTONs */}
                                                        {tableHover[el.Id] ? 
                                                        <span className="row-hover-base">
                                                            <div className="row-hover-middle">
                                                                <div className="row-hover-socket">
                                                                    <div className="hover-button-base">
                                                                        <span className="button-sparator1">
                                                                            <span className={contentProps.icon} aria-hidden="true">
                                                                                info
                                                                            </span>
                                                                        </span>
                                                                        <span className="button-sparator2">
                                                                            <span className={contentProps.icon} aria-hidden="true">
                                                                                edit
                                                                            </span>
                                                                        </span>
                                                                        <span className="button-sparator3">
                                                                            <span className={contentProps.icon} aria-hidden="true">
                                                                                delete
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </span> : null  }

                                                    </td>
                                                    <td><span>{el.Address}</span>
                                                    </td><td>{el.Telephone}</td>
                                                    <td>
                                                        {el.Email}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default Store