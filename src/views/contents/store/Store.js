import React from 'react'
import HelperHttp from '../../../helper/HelperHttp';
import ConfigApi from '../../../config/ConfigApi';
import './Store.scss'
import ContentHeader from '../../../components/content_header';
import { StoreInfo, StoreAdd, StoreEdit } from './store_components';
import HelperModData from '../../../helper/HelperModData';
import { AppContext } from '../../../global';
import ConfigLocal from '../../../config/ConfigLocal';
import ContentTable from '../../../components/content_table/ContentTable';
import { ModalDelete } from '../../../components/modal_content_packages';

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

    getStore = (loading = true) => {
        if(loading) { this.setState({contentLoading : true}) }
        HelperHttp.get(ConfigApi.ROUTE.STORE, (res)  => {
            let keys = HelperModData.getObjKeys(res.data[0])
            this.objAttributesCount(res.data)
            if( res.data[0].message ) {
                alert(res.data[0].message)
            }
            this.setState({
                contentData : res.data,
                contentLoading : false,
                dataKey : keys
            })
        })
    }

    componentDidMount() {
        this.getStore()
    }
    
    render () {
        const { dataKey, contentProps, contentData, rowsCount, columnsCount, showLine, openStoreInfo, openStoreAdd, openStoreEdit, openStoreDelete, rowData } = this.state
        return (
                <React.Fragment>

                    <StoreAdd open={openStoreAdd} close={this.modalClose} reload={this.getStore} />
                    <StoreInfo open={openStoreInfo} close={this.modalClose} rowData={rowData} keys={dataKey} marks={ConfigLocal.COMPONENTS.StoreInputNames}/>
                    <StoreEdit open={openStoreEdit} close={this.modalClose} rowData={rowData} reload={this.getStore} />

                    <ModalDelete open={openStoreDelete} close={this.modalClose} data={rowData} reload={this.getStore} tableName="Store" url={ConfigApi.ROUTE.STORE} />

                    <div className="content-base" onScroll={() => this.onScrollHandler()}>
                        <div className="content-square">
                            <div className="content-socket" ref={this.refTable} >

                                <div className="content-wrapper">

                                    <ContentHeader 
                                        title={contentProps.title} rowsCount={rowsCount}
                                        columnsCount={columnsCount} addFunction={this.addButton}
                                        showLine={showLine}
                                    />
                                    
                                    <ContentTable
                                        loading={this.state.contentLoading}
                                        tryAgain={this.getStore}
                                        names={ConfigLocal.COMPONENTS.StoreInputNames}
                                        data={contentData} parent="store"
                                        infoButton={this.infoButton}
                                        editButton={this.editButton}
                                        deleteButton={this.deleteButton}    
                                    />
                                    
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </React.Fragment>
        )
    }
}

export default Store