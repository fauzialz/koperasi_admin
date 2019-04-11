import React from 'react';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigApi from '../../../config/ConfigApi';
import ConfigLocal from '../../../config/ConfigLocal';
import Modal from '../../../components/modal';
import Input from '../../../components/input';
import { AppContext } from '../../../context_provider';
import Select from '../../../components/select';
import './NavbarEdit.scss';

class NavbarEdit extends React.Component {
    static contextType = AppContext

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            names: ['Id', 'Code', 'Name', 'Description', 'Icon', 'Endpoint', 'Order', 'ParentId', 'Etag']
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.loading()
        this.context.closeNotif()
        HelperHttp.request(ConfigApi.ROUTE.MENU, ConfigApi.METHODS.PUT, this.state.data,
            (success, response) => {
                this.props.loading()
                if(success){
                    this.props.hotReload()
                    setTimeout(() => {
                        this.context.setNotif('Data edited.',ConfigLocal.NOTIF.Success)
                    }, 800);
                }else(
                    alert(this.state.data.Etag)
                )
                this.clearInput()
                this.props.onClose()
            }    
        )
    }

    textChange = e => {
        let tmp = this.state.data
        tmp[e.target.name] = e.target.value
        this.setState({ data : tmp })
    }

    clearInput = () => {
        let tmp = this.state.data
        for(let name of this.state.names){
            tmp[name] = ''
        }
        this.setState({
            data: tmp
        })
    }

    closeHandler = () => {
        this.clearInput()
        this.props.onClose()
    }

    /* 
    todo: In the future, I think this function must be in the HelperModData.js
    */
    optionsAssembler = () => {
        let options = [{value: "", name: "No Parent"}]
        let tmp = JSON.parse(localStorage.getItem(ConfigLocal.LOCSTORE.Navbar)).map(e=>{
            return ({value: e.Id, name: e.Name})
        })
        options = options.concat(tmp)
        debugger
        options = options.filter(e=>{
            return e.value !== this.state.data['Id']
        })
        debugger
        return options
    }

    static getDerivedStateFromProps(props, state) {
        return { data : props.dataNow }
    }

    render () {
        const { open } = this.props
        const { data } = this.state
        const options = this.optionsAssembler()
        return (
            <React.Fragment>
                <Modal open={open} title="Navigation Menu Setting" onBtnL={this.onSubmit} onBtnR={this.closeHandler} btnL="Edit" form>
                    <div className="devider">
                        <div className="devided-left">
                            <Input name="Name" value={data.Name} fluid label="Name" focusEvery={open} autoFocus onChange={this.textChange} />
                        </div>
                        <div className="devided-right">
                            <Input name="Endpoint" value={data.Endpoint} fluid label="Endpoint" onChange={this.textChange} />
                        </div>
                    </div>
                    <Select name="ParentId" selected={data.ParentId} onChange={this.textChange} options={options} />
                    <Input name="ParentId" value={data.ParentId} fluid label="Parent" onChange={this.textChange} />
                    <Input name="Description" value={data.Description} fluid label="Description" onChange={this.textChange} />
                    <Input name="Icon" value={data.Icon} fluid label="Icon" onChange={this.textChange} />
                    <div className="description">
                        The system use icon from Material Design. <br /><a href="https://material.io/tools/icons/" target="blank">See available icons</a>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

export default NavbarEdit