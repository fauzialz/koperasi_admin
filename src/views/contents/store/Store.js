import React from 'react'
import Dummy from '../dummy';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigApi from '../../../config/ConfigApi';
import './Store.scss'
import ContentHeader from '../../../components/content_header';
import ButtonTable from '../../../components/button_table/ButtonTable';

class Store extends React.Component {
    constructor (props) {
        super (props) 
        this.refTable = React.createRef()
    }
    state = {
        top : 0,
        showLine : false,
        contentData : [],
        contentLoading : true,
        contentProps : {
            title : 'Store',
        },
        rowsCount : '',
        columnsCount : '',
        tableHover: {}
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
        let scrollState = this.refTable.current.getBoundingClientRect().bottom
        if ( scrollState < this.state.top) {
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

    //?CRUD HANDLER
    createStore = () => {
        alert('Add button clicked!')
        let d = new Date()
        let dummyData = {
            Name : 'Nama Kantor' + d.getTime(),
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
    
    //*CRUD HANDLER
    infoButton = (rowData) => {
        console.table(rowData)
        console.log('Info button clicked!')
    }
    
    //*CRUD HANDLER
    editButton = () => {
        alert('Edit button clicked!')
    }
    
    //*CRUD HANDLER
    deleteButton = (id) => {
        HelperHttp.get(`${ConfigApi.ROUTE.STORE}/${id}`, (res1) => {
            if(res1.data.Etag) {
                HelperHttp.delete(ConfigApi.ROUTE.STORE, res1.data.Id, res1.data.Etag, (res2) => {
                    if(res2.status === 200 && res2.success){
                        alert(`${res1.data.Name} berhasil dihapus.`)
                        this.getStore()
                    }
                })
            }
        })
    }

    setTop = () => {
        let top = this.refTable.current.getBoundingClientRect().bottom - 3
        this.setState({top : top})
    }

    getStore = () => {
        this.setState({contentLoading : true})
        HelperHttp.get(ConfigApi.ROUTE.STORE, (res)  => {
            let temp = {}
            for(let i in res.data) {
                temp[res.data[i].Id]=false
            } 
            this.objAttributesCount(res.data)
            this.setState({
                contentData : res.data,
                contentLoading : false,
                tableHover : temp
            })
            this.setTop()
        })
    }

    componentDidMount() {
        this.setTop()
        this.getStore()
    }

    render () {
        const { contentProps, contentData, tableHover, rowsCount, columnsCount, showLine } = this.state
        return (
                <React.Fragment>
                    <div className="content-base" onScroll={() => this.onScrollHandler()}>
                        <div className="content-square">
                            <div className="content-socket" ref={this.refTable} >

                                <div className="content-wrapper">

                                    <ContentHeader title={contentProps.title} rowsCount={rowsCount} columnsCount={columnsCount} addFunction={this.createStore} showLine={showLine} />
                                    
                                    { contentData.length === 0 ? <Dummy />:
                                        <div className="table-holder">
                                            <div className="row-hover-wrapper">
                                                <table>
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