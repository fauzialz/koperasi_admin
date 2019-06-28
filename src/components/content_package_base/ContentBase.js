import React from 'react'
import { AppContext } from '../../global';
import HelperHttp from '../../helper/HelperHttp';
import ConfigLocal from '../../config/ConfigLocal';
import HelperObject from '../../helper/HelperObject';
import { ModalAdd, ModalInfo, ModalEdit, ModalDelete } from '../content_package_modals';
import ContentHeader from '../content_header';
import ContentTable from '../content_table/ContentTable';
import './ContentBase.scss'

class ContentBase extends React.Component {
    static contextType = AppContext
    constructor (props) {
        super (props)
        this.refTable = React.createRef()
        this.state = {
            showHeader : false,
            tableData : [],
            tableDataKey : [],
            rowData : {},
            tableLoading : false,
            tableRows : 0,
            tableColumns : 0,
            thisPageRows : 0,
            openAddModal : false,
            openInfoModal : false,
            openEditModal : false,
            openDeleteModal : false,
            pagination : {},
            paginationArray : [],
            fetchMessage: ''
        }
    }

    getPageRows = (nowPage, tableRows, pageSize = 10) => {
        let temp
        if (tableRows%(pageSize*(nowPage+1)) !== 1) {
            temp = tableRows - (pageSize*(nowPage))
        }else temp = pageSize
        this.setState({ thisPageRows : temp })
    }

    getRowsAndColumns = (objList, rowsCount = 0) => {
        if ( !objList.length ) {
            this.setState({tableRows: 0})
            return;
        }
        let rows = rowsCount !== 0 ? rowsCount : objList.length
        let columns = Object.keys(objList[0]).length
        this.setState({
            tableRows : rows,
            tableColumns : columns
        })
    } 
    getPaginationArray = (length) => {
        let arr = []
        for( let i = 0; i < length; i++) {
            arr.push(i+1)
        }
        this.setState({paginationArray:arr})
    }

    onScrollHandler = () => {
        let topState = this.refTable.current.getBoundingClientRect().top
        if (topState < this.refTable.current.offsetTop) {
            this.setState({showHeader : true})
        }else{
            this.setState({showHeader: false})
        }
    }

    closeModalsHandler = () => {
        this.setState({
            openAddModal: false,
            openInfoModal: false,
            openEditModal: false,
            openDeleteModal: false
        })
    }

    openAddModalHandler = () => {
        this.setState({
            openAddModal: true
        })
    }

    openInfoModalHandler = (rowData) => {
        this.setState({
            openInfoModal: true,
            rowData: rowData
        })
    }

    openEditModalHandler = (id) => {
        this.context.loadingSwitch()
        HelperHttp.get(`${this.props.config.Url}/${id}`, (res) => {
            this.context.loadingSwitch()
            if(res.data.Etag) {
                this.setState({
                    openEditModal: true,
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

    openDeleteModalHandler = (id) => {
        this.context.loadingSwitch()
        HelperHttp.get(`${this.props.config.Url}/${id}`, (res) => {
            this.context.loadingSwitch()
            if(res.data.Etag) {
                this.setState({
                    rowData: res.data,
                    openDeleteModal: true
                })
            }else{
                console.log(res)
                this.context.setNotif(
                    res.message, ConfigLocal.NOTIF.Error
                )
            }
        })
    }

    getTableData = (loading = true, pageIndex = 0, pageSize = 12) => {
        if(loading) { this.setState({ tableLoading : true }) }
        HelperHttp.get(`${this.props.config.Url}?pageIndex=${pageIndex}&pageSize=${pageSize}`, (res) => {
            let keys = HelperObject.getObjKeys(res.data[0])
            this.getRowsAndColumns(res.data,res.pagination.TotalCount)
            this.getPaginationArray(res.pagination.TotalPages)
            this.getPageRows(res.pagination.PageIndex, res.pagination.TotalCount, pageSize)
            this.setState({
                tableData : res.data,
                tableLoading : false,
                tableDataKey : keys,
                pagination : res.pagination,
                fetchMessage: res.message
            })
        })
    }

    componentDidMount() {
        this.getTableData()
    }

    render() {
        const {
            showHeader,
            tableData,
            tableDataKey,
            rowData,
            tableLoading,
            tableRows,
            tableColumns,
            openAddModal,
            openInfoModal, 
            openEditModal, 
            openDeleteModal,
            fetchMessage
        } = this.state
        const {
            config
        } = this.props
        return (
            <React.Fragment>

                <ModalAdd 
                    tableName={config.Name}
                    url={config.Url}
                    open={openAddModal}
                    close={this.closeModalsHandler}
                    names={config.Input}
                    reload={this.getTableData}
                    currentPage={this.state.pagination.PageIndex}
                />
                <ModalInfo
                    tableName={config.Name}
                    open={openInfoModal}
                    close={this.closeModalsHandler}
                    keys={tableDataKey}
                    marks={config.Input}
                    data={rowData}
                />
                <ModalEdit 
                    tableName={config.Name}
                    url={config.Url}
                    open={openEditModal}
                    close={this.closeModalsHandler}
                    names={config.Input}
                    data={rowData}
                    reload={this.getTableData}
                    currentPage={this.state.pagination.PageIndex}
                />
                <ModalDelete 
                    tableName={config.Name}
                    url={config.Url}
                    open={openDeleteModal}
                    close={this.closeModalsHandler}
                    data={rowData}
                    reload={this.getTableData}
                    currentPage={this.state.pagination.PageIndex}
                    pageRows={this.state.thisPageRows}
                />

                <div className="content-base" onScroll={() => this.onScrollHandler()}>
                    <div className="content-square">
                        <div className="content-socket" ref={this.refTable}>
                            <div className="content-wrapper">

                                <ContentHeader
                                    title={config.Name}
                                    icon={config.Icon}
                                    rowsCount={tableRows}
                                    columnsCount={tableColumns}
                                    addFunction={this.openAddModalHandler}
                                    showLine={showHeader}
                                    pagination={this.state.pagination}
                                    paginationArray={this.state.paginationArray}
                                    getTableData={this.getTableData}
                                />

                                <ContentTable
                                    loading={tableLoading}
                                    tryAgain={this.getTableData}
                                    addNew={this.openAddModalHandler}
                                    names={config.Input}
                                    data={tableData}
                                    message={fetchMessage}
                                    parent={config.Name}
                                    infoButton={this.openInfoModalHandler}
                                    editButton={this.openEditModalHandler}
                                    deleteButton={this.openDeleteModalHandler}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ContentBase