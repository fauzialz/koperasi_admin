import React from 'react';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigApi from '../../../config/ConfigApi';
import ConfigLocal from '../../../config/ConfigLocal';
import Modal from '../../../components/modal';
import Input from '../../../components/input';
import { AppContext } from '../../../global';
import Select from '../../../components/select';
import './NavbarEdit.scss';
import Button from '../../../components/button';

class NavbarEdit extends React.Component {
    static contextType = AppContext

    constructor(props) {
        super(props)
        this.state = {
            data: {
                Name: ''
            },
            icon: 'material-icons MuiIcon-root-1 MuiIcon-colorAction-4 center-button-delete',
            names: ['Id', 'Code', 'Name', 'Description', 'Icon', 'Endpoint', 'Order', 'ParentId', 'Etag']
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.context.loadingSwitch()
        this.context.closeNotif()
        HelperHttp.request(ConfigApi.ROUTE.MENU, this.props.add ? ConfigApi.METHODS.POST : ConfigApi.METHODS.PUT, this.state.data,
            (success, response) => {
                this.context.loadingSwitch()
                if(success){
                    this.props.hotReload()
                    setTimeout(() => {
                        this.context.setNotif(
                            this.props.add? 'Data added.': 'Data edited.',
                            ConfigLocal.NOTIF.Success
                        )
                    }, 500);
                }else{
                    setTimeout(() => {
                        this.context.setNotif(
                            response.Message,
                            ConfigLocal.NOTIF.Error
                        )
                    }, 800)
                }
                this.clearInput()
                this.props.onClose()
            }    
        )
    }

    onDelete = () => {
        this.context.loadingSwitch()
        this.context.closeNotif()
        HelperHttp.request(ConfigApi.ROUTE.MENU, ConfigApi.METHODS.DEL,this.state.data,
            (success, response) => {
                this.context.loadingSwitch()
                if(success) {
                    setTimeout(() => {
                        this.context.setNotif(
                            'Data deleted',
                            ConfigLocal.NOTIF.Success
                        )
                        this.props.hotReload()
                    }, 500);
                }
                this.clearInput()
                this.props.onClose()
            })
    }

    textChange = e => {
        let tmp = this.state.data
        tmp[e.target.name] = e.target.value || null
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
        let tmp = JSON.parse(localStorage.getItem(ConfigLocal.LOCSTORE.Navbar))
        if( tmp ) {
            tmp = tmp.map(e=>{
                return ({value: e.Id, name: e.Name})
            })
            options = options.concat(tmp)
            if(!this.props.add) {
                options = options.filter(e=>{
                    return e.value !== this.state.data['Id']
                })
    
            }
        }
        return options
    }

    static getDerivedStateFromProps(props, state) {
        if(!props.add){
            return { data : props.dataNow }
        }else{
            return { data: state.data}
        }
    }

    render () {
        const { open, add } = this.props
        const { data, icon } = this.state
        const options = this.optionsAssembler()
        return (
            <React.Fragment>
                <Modal open={open} title="Navigation Menu Setting" onBtnL={this.onSubmit} onBtnR={this.closeHandler} btnL={add?"Add":"Edit"} form>
                    <div className="devider">
                        <div className="devided-left">
                            <Input name="Name" value={data.Name} fluid label="Name" focusEvery={open} autoFocus onChange={this.textChange} />
                        </div>
                        <div className="devided-right">
                            <Input name="Endpoint" value={data.Endpoint} fluid label="Endpoint" onChange={this.textChange} />
                        </div>
                    </div>
                    <Select name="ParentId" selected={data.ParentId} onChange={this.textChange} options={options} label="Parent" />
                    <Input name="Description" value={data.Description} fluid label="Description" onChange={this.textChange} />
                    <Input name="Icon" value={data.Icon} fluid label="Icon" onChange={this.textChange} />
                    <div className="description">
                        The system use icon from Material Design. <br />(<a href="https://material.io/tools/icons/" target="blank">See available icons</a>)
                    </div>
                    {!add ? 
                    <div className="center-button">
                        <Button
                            onClick={this.onDelete}
                            red
                            flat
                            circle
                            title={"Delete Navbar "+data.Name}
                            label={
                                <span className={icon} aria-hidden="true">
                                    delete
                                </span>
                            }/>
                    </div>: null}
                </Modal>
                
            </React.Fragment>
        )
    }
}

export default NavbarEdit