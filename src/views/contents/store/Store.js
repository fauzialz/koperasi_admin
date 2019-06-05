import React from 'react'
import Dummy from '../dummy';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigApi from '../../../config/ConfigApi';
import './Store.scss'
import ContentHeader from '../../../components/content_header';
import ButtonTable from '../../../components/button_table/ButtonTable';
import { StoreInfo, StoreAdd, StoreDelete, StoreEdit } from './store_components';
import HelperModData from '../../../helper/HelperModData';
import { AppContext } from '../../../global';
import ConfigLocal from '../../../config/ConfigLocal';

class Store extends React.Component {
    static contextType = AppContext
    constructor (props) {
        super (props) 
        this.refTable = React.createRef()
    }
    state = {
        showLine : false,
        contentData : [],
        dataKey : [],
        rowData: {},
        contentLoading : true,
        contentProps : {
            title : 'Store',
        },
        rowsCount : '',
        columnsCount : '',
        tableHover: {},
        openStoreAdd: false,
        openStoreInfo: false,
        openStoreEdit: false,
        openStoreDelete: false,
    }


    objAttributesCount = (objList) => {
        if ( objList.length === 0) {
            return;
        }
        let rows = objList.length
        let columns = Object.keys(objList[0]).length
        this.setState({
            rowsCount : rows,
            columnsCount : columns
        })
    }

    //!HEADER SCROLLING HANDLER
    onScrollHandler = () => {
        let topState = this.refTable.current.getBoundingClientRect().top
        if ( topState < this.refTable.current.offsetTop) {
            this.setState({showLine : true})
        }else{
            this.setState({showLine : false})
        }
    }

    //!TABLE HOVER HANDLER
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
    //!TABLE HOVER HANDLER
    onMouseLeaveHandler = () => {
        let hotTableHover = this.state.tableHover
        for(let i in hotTableHover){
            hotTableHover[i] = false
        }
        this.setState({tableHover: hotTableHover})
    }
    
    //*MODAL HANDLER
    modalClose = () => {
        this.setState({
            openStoreAdd: false,
            openStoreInfo: false,
            openStoreEdit: false,
            openStoreDelete: false,
        })
    }

    //*MODAL HANDLER
    addButton = () => {
       this.setState({
           openStoreAdd: true
       })
    }

    //*MODAL HANDLER
    infoButton = (rowData) => {
        this.setState({
            openStoreInfo: true,
            rowData: rowData
        })
    }
    
    //*MODAL HANDLER
    editButton = (id) => {
        this.context.loadingSwitch()
        HelperHttp.get(`${ConfigApi.ROUTE.STORE}/${id}`, (res) => {
            this.context.loadingSwitch()
            if(res.data.Etag) {
                this.setState({
                    openStoreEdit: true,
                    rowData: res.data
                })
            }else{
                console.log(res)
                this.context.setNotif(
                    res.message, ConfigLocal.NOTIF.Error
                )
            }
        })
    }
    
    //*MODAL HANDLER
    deleteButton = (id) => {
        this.context.loadingSwitch()
        HelperHttp.get(`${ConfigApi.ROUTE.STORE}/${id}`, (res) => {
            this.context.loadingSwitch()
            if(res.data.Etag) {
                this.setState({
                    rowData : res.data,
                    openStoreDelete : true
                })
            }else{
                console.log(res)
                this.context.setNotif(
                    res.message, ConfigLocal.NOTIF.Error
                )
            }
        })
    }

    getStore = () => {
        this.setState({contentLoading : true})
        HelperHttp.get(ConfigApi.ROUTE.STORE, (res)  => {
            let temp = {}
            let keys = HelperModData.getObjKeys(res.data[0])
            for(let i in res.data) {
                temp[res.data[i].Id]=false
            } 
            this.objAttributesCount(res.data)
            this.setState({
                contentData : res.data,
                contentLoading : false,
                tableHover : temp,
                dataKey : keys
            })
        })
    }

    componentDidMount() {
        this.getStore()
    }
    
    render () {
        const { dataKey, contentProps, contentData, tableHover, rowsCount, columnsCount, showLine, openStoreInfo, openStoreAdd, openStoreEdit, openStoreDelete, rowData } = this.state
        return (
                <React.Fragment>

                    <StoreAdd open={openStoreAdd} close={this.modalClose} reload={this.getStore} />
                    <StoreInfo open={openStoreInfo} close={this.modalClose} rowData={rowData} keys={dataKey}/>
                    <StoreEdit open={openStoreEdit} close={this.modalClose} rowData={rowData} reload={this.getStore} />
                    <StoreDelete open={openStoreDelete} close={this.modalClose} rowData={rowData} reload={this.getStore} />

                    <div className="content-base" onScroll={() => this.onScrollHandler()}>
                        <div className="content-square">
                            <div className="content-socket" ref={this.refTable} >

                                <div className="content-wrapper">

                                    <ContentHeader 
                                        title={contentProps.title} rowsCount={rowsCount}
                                        columnsCount={columnsCount} addFunction={this.addButton}
                                        showLine={showLine}
                                    />
                                    
                                    { contentData.length === 0 ? <Dummy />:
                                        <div className="table-holder">
                                            <div className="row-hover-wrapper">
                                                <table className="table-content">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th><th>Address</th><th>Telephone</th><th>Email</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        { contentData.map( el => {
                                                            return (
                                                                <tr key={el.Id} onMouseEnter={() => this.onMouseOverHandler(el.Id)} onMouseLeave={this.onMouseLeaveHandler}>
                                                                    <td >
                                                                        <span>{el.Name}</span>
                                                                        
                                                                        {/* THIS IS HOVER ACTION BUTTON MECHANISM */}
                                                                        {tableHover[el.Id] ? 
                                                                            <ButtonTable 
                                                                                infoButton={this.infoButton}
                                                                                editButton={this.editButton}
                                                                                deleteButton={this.deleteButton}
                                                                                rowData={el}
                                                                            /> : null
                                                                        }

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
                                    }
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </React.Fragment>
        )
    }
}

export default Store