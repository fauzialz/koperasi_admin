import React from 'react'
import './Navbar.scss'
import HelperHttp from '../../../helper/HelperHttp'
import ConfigApi from '../../../config/ConfigApi';
import Loading from '../../../components/loading';
import ButtonStatus from '../../../components/button_status';
import NavbarEditAuth from './NavbarEditAuth';
import NavbarEdit from './NavbarEdit';
import NavbarTiles from './NavbarTiles';
import { AppContext } from '../../../context_provider';
import Button from '../../../components/button';
import ConfigLocal from '../../../config/ConfigLocal';
import HelperModData from '../../../helper/HelperModData';
import HelperCookie from '../../../helper/HelperCookie';
import DummyNavbar from '../../../components/dummy_navbar';

class Navbar extends React.Component {
    static contextType = AppContext

    constructor(props) {
        super(props)
        this.state = {
            historyId : 0,
            navList : [],
            navObj  : {},
            editSession : false,
            loading : false,
            navbarLoading : false,
            openAuthModal: false,
            openEditModal: false,
            openAddModal: false,
            icon: 'material-icons MuiIcon-root-1 MuiIcon-colorAction-4 navbar-add-button',
            title: 'Setting Mode'
        }
    }
    
    /*  Switch loading on or off. */
    loadingSwitch = () => {
        this.setState({loading : !this.state.loading})
    }
    
    /*  Decide the Tiles to work normal or become button to edit navlist. */
    tileHandler = (id) => {
        if(!this.state.editSession){
            /* open menu */
            this.activeTileHandler(id)
        }else{
            /* edit menu show modal */
            this.openTileEdit(id)
        }
    }
    
    /*  Active a Neutral Tiles or Child Tiles by detecting navlist and
        param id. If navObj.Id equal id, inject true into navObj.Active,
        or navObj.Clicked if navObj have children (Parent Tiles). */
    activeTileHandler = (id, hotNavList = this.state.navList, onEditSession = false) => {
        let parentClicked = this.parentClickChecker(id)
        for(var i = 0; i< hotNavList.length; i++) {
            if(hotNavList[i].Children.length > 0 && hotNavList[i].Id === id) {
                hotNavList[i].Clicked = !hotNavList[i].Clicked
                hotNavList = this.unclickedHandler(id)
            }else{
                if(hotNavList[i].Id === id) {
                    hotNavList[i]['Active'] = true
                    this.setState({historyId : id})
                    //do something base with route
                }else if(!parentClicked) {
                    hotNavList[i]['Active'] = false
                }
            }
            if(hotNavList[i].Children.length > 0){
                for(var j = 0; j< hotNavList[i].Children.length; j++) {
                    if( hotNavList[i].Children[j].Id === id)  {
                        hotNavList[i].Children[j]['Active'] = true
                        this.setState({historyId : id})
                        //do something base with route
                    }else if(!parentClicked){
                        hotNavList[i].Children[j]['Active'] = false
                    } 
                }
            }
        }
        if(!onEditSession){
            this.setState({navList : hotNavList})
        }else{
            return hotNavList
        }
    }
    
    /*  Detect if along the Tiles there is a Parent Tile that clicked. */
    parentClickChecker = (id) => {
        let hotNavList = this.state.navList
        let parentClicked = false
        for(var i = 0; i< hotNavList.length; i++) {
            if(hotNavList[i].Children.length > 0 && hotNavList[i].Id === id) {
                parentClicked = true
            }
        }
        return parentClicked
    }
    
    /*  Make non-clicked Parent Tiles close. */
    unclickedHandler = (id = 10000) => {
        let hotNavList = this.state.navList
        for(var i = 0; i< hotNavList.length; i++) {
            if(hotNavList[i].Id !== id) {
                hotNavList[i].Clicked = false
            }
        }
        return hotNavList
    }
    
    /*  onClick function for Setting Mode. Decide if Auth Modal must
        show or not. Open Auth Modal if Setting Mode is off, call a function
        to turn off the Setting Mode off if it already on. */
    editSessionButton = () => {
        if(this.state.editSession === false){
            this.setState({openAuthModal:true})
        }else{
            this.editSessionSwitch()
        }
    }
    
    /*  Switch for turn Setting Mode on (with all the atribute, include call
        a function for open all Parent Tiles.) or off (with all the atribute,
        include call a function to make non-clicked Prent Tiles Close). */
    editSessionSwitch = () => {
        this.setState({
            editSession: !this.state.editSession,
        })
        if(this.state.title === "Setting Mode") {
            setTimeout(() => {
                this.setState({
                    title: "Setti...",
                    navList: this.clickedAllHandler()
                })
            }, 100);
        }else{
            setTimeout(() => {
                this.setState({
                    title: "Setting Mode",
                    navList: this.unclickedHandler()
                })
            }, 400);
        }
    }

    /*  Make all Parent Tiles open */
    clickedAllHandler = (hotNavList = this.state.navList) => {
        for(var i = 0; i< hotNavList.length; i++) {
            if(hotNavList[i].Children.length > 0) {
                hotNavList[i]['Clicked'] = true
            }
        }
        return hotNavList
    }

    /*  Fetch navList data from API and update it in localStorage. */
    getNavigationList = () => {
        this.setState({navbarLoading:true})
        HelperHttp.request(ConfigApi.ROUTE.GET_MENU, ConfigApi.METHODS.GET, {},
            (success, response) => {
                this.setState({navbarLoading:false})
                if(success){
                    let list = response.Result
                    if(this.state.editSession) {
                        let listEdited = JSON.parse(JSON.stringify(list)) //This method use to deep copy list of object.
                        listEdited = this.clickedAllHandler(listEdited)
                        listEdited = this.activeTileHandler(this.state.historyId, listEdited, true)
                        list = JSON.parse(JSON.stringify(listEdited))
                        this.setState({
                            navList : listEdited
                        })
                    }else{
                        this.setState({
                            navList : list
                        })
                    }
                    list = HelperModData.pushObjBulk(list,'Active',false)
                    list = HelperModData.pushObjBulk(list,'Clicked',false)
                    localStorage.setItem(ConfigLocal.LOCSTORE.Navbar,JSON.stringify(list))
                    HelperCookie.set(ConfigLocal.NAVBAR, true)
                }
            }
        )
    }

    /*  Open modal for edit tile. Fetch navObj data
        from id to get eTag, then open modal. */
    openTileEdit = (id) => {
        this.loadingSwitch()
        let route = ConfigApi.ROUTE.MENU + '/' +id
        HelperHttp.request(route, ConfigApi.METHODS.GET, {}, 
            (success, response) => {
                this.loadingSwitch()
                if(success) {
                    this.setState({
                        navObj: response.Result,
                        openEditModal: true
                    })
                }
            }
        )
    }

    openAddModal = () => {
        // ! I OPEN THE GATE, BUT BUGS STILL INSIDE !
        this.setState(
            {openAddModal: !this.state.openAddModal}
        )
    }

    /*  To close all modal. */
    onClose = () => {
        this.setState({
            openAuthModal: false,
            openEditModal: false,
            openAddModal: false
        })
    }

    /*  LifeCircle. Detect if navlist has been stored in LocalStorege or not.
        If yes, use it immediately. If not, call function to fect the data. */
    componentDidMount() {
        let list = JSON.parse(localStorage.getItem(ConfigLocal.LOCSTORE.Navbar))
        if(list != null && HelperCookie.get(ConfigLocal.NAVBAR)){
            if(list.length > 0){
                this.setState({
                    navList : list
                })
            }else{
                this.getNavigationList()
            }
        }else{
            this.getNavigationList()
        }
    }

    render() {
        const { navbarLoading, navList, openAuthModal, openEditModal, openAddModal,loading, icon } = this.state

        return (
            <React.Fragment>

                <NavbarEditAuth
                    open={openAuthModal}    editSession={this.editSessionSwitch}
                    onClose={this.onClose}  loading={this.loadingSwitch}
                />
                <NavbarEdit 
                    open={openEditModal}
                    dataNow={this.state.navObj}
                    onClose={this.onClose}
                    loading={this.loadingSwitch}
                    hotReload={this.getNavigationList}
                />
                <NavbarEdit 
                    open={openAddModal}
                    onClose={this.onClose}
                    loading={this.loadingSwitch}
                    hotReload={this.getNavigationList}
                    add
                />

                {loading && <Loading />}

                <div className={this.props.open ? "open-navbar": "close-navbar"}> 
                        <div className="navbar-base">
                            <div className= "navbar-overflow-superadmin">
                            {navbarLoading?
                                <DummyNavbar navList={navList} />:
                                <NavbarTiles navList={navList} onClick={this.tileHandler} />
                            }
                            </div>
                            <div className= "edit-tile">
                                <div className={this.state.editSession? "navbar-add-on": "navbar-add-off"}>
                                    <Button
                                        onClick={this.openAddModal}
                                        blue
                                        flat
                                        circle
                                        title="Add new navigation menu"
                                        label={
                                            <span className={icon} aria-hidden="true">
                                                add
                                            </span>
                                        }/>
                                </div>
                                <ButtonStatus
                                    title={this.state.title}
                                    onClick={this.editSessionButton}
                                    active={this.state.editSession}
                                />
                            </div>
                        </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Navbar