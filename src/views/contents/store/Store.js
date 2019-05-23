import React from 'react'
import Dummy from '../dummy';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigApi from '../../../config/ConfigApi';
import './Store.scss'
import ContentHeader from '../../../components/content_header';
import ButtonTable from '../../../components/button_table/ButtonTable';
import ConfigLocal from '../../../config/ConfigLocal';

class Store extends React.Component {
    state = {
        contentData : [],
        contentLoading : true,
        contentProps : {
            title : 'Store'
        },
        tableHover: {},
        refTable : React.createRef()
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
            Name : ConfigLocal.MISC.LoremIpsum + d.getTime(),
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
    infoButton = () => {
        alert('Info button clicked!')
    }
    
    //*CRUD HANDLER
    editButton = () => {
        alert('Edit button clicked!')
    }
    
    //*CRUD HANDLER
    deleteButton = () => {
        alert('Delete button clicked!')
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
                <div className="content-wrapper">

                    <ContentHeader title={contentProps.title} addFunction={this.createStore} noAdd={contentData.length === 0}/>
                    
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
            </React.Fragment>
        )
    }
}

export default Store