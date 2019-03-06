import React from 'react'
import './Navbar.scss'
import HelperHttp from '../../../helper/HelperHttp'
import ConfigApi from '../../../config/ConfigApi';
import Icon from '../../../components/icon';
import Loading from '../../../components/loading';
import ButtonStatus from '../../../components/button_status';
import ModalFrame from '../../../components/modal_frame';
import Input from '../../../components/input';
import HelperCookie from '../../../helper/HelperCookie';
import ConfigLocal from '../../../config/ConfigLocal';

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navList : [],
            editSession : false,
            loading : false,
            openModal: false,
            password: ''
        }
    } 

    editSessionSwitch = () => {
        this.setState({
            editSession: !this.state.editSession
        })
    }

    editSessionHendler = () => {
        if(this.state.editSession === false){
            this.setState({openModal:true})
        }else{
            this.editSessionSwitch()
        }
    }

    buttonHendler = (index) => {
        if(this.state.editSession){
            //edit menu show modal
            alert(this.state.navList[index].Icon + "\n" + this.state.navList[index].Description)
        
            //ready to deliver the value to crud
        }else{
            //run menu
        }
    }

    getNavigationList = () => {
        this.setState({loading : true})
        HelperHttp.request(ConfigApi.ROUTE.GET_MENU, ConfigApi.METHODS.GET, {},
            (success, response) => {
                if(success){
                    let list = response.Result
                    debugger
                    this.setState({
                        navList : list,
                        loading : false
                    })
                }
            }
        )
    }

    //METHOD FOR MODAL====================
    onSubmit = () => {
        this.setState({loading : true})
        let formdata = {
            username : HelperCookie.get(ConfigLocal.USERNAME),
            password : this.state.password
        }
        debugger
        HelperHttp.request(ConfigApi.ROUTE.SIGN_IN, ConfigApi.METHODS.POST, formdata,
        (success, response) => {
            this.setState({loading : false})
            if(success){
                this.editSessionSwitch()
            }
            this.onClose()
        })
    }
    onClose = () => {
        this.setState({openModal:false, password:''})
    }
    textChange= e => {
        this.setState({password:e.target.value})
    }
    //==================================

    componentDidMount() {
        this.getNavigationList()
    }

    render() {
        const { navList, openModal, loading, password } = this.state

        return (
            <React.Fragment>

                <ModalFrame title="Authentication" open={openModal} onBtnR={this.onClose} onBtnL={this.onSubmit}>
                    Enter your password to edit the navigation menu.
                    <Input
                        passVisibility
                        fluid
                        name="password"
                        value={password}
                        onChange={this.textChange}
                    />
                </ModalFrame>

                {loading && <Loading />}

                <div className="grid-navbar">
                    {this.props.open ? 
                        <div className="navbar-show">
                           <div className= "navbar-edit">
                                {navList.map( (e,n) => {
                                        return (
                                            <div key= {e.Code} className="navbar-tile">
                                                <div className= "navbar-icon">
                                                    <Icon 
                                                        iconName="face"
                                                        onClick={ () => this.buttonHendler(n)}
                                                        title= "Navbar Settings"
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className= "edit-tile">
                                    <ButtonStatus
                                        onClick={this.editSessionHendler}
                                        active={this.state.editSession}
                                    />
                                </div>
                            </div>
                        </div>
                        :
                        <div className="navbar-hide" />
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Navbar