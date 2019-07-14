import React from 'react'
import Button from '../button';
import ConfigLocal from '../../config/ConfigLocal';
import './ContentHeader.scss'
import Pagination from '../pagination/Pagination';
import { AppContext } from '../../global';

class ContentHeader extends React.Component {
    static contextType = AppContext
    state = {
        showpages : false,
        dropdownMargin: 5,
        searching : '',
        searchSugest : false,
        searchLocalPure : [],
        searchLocal: [],
        searchRef : React.createRef()
    }

    searchOnFocus = () => {
        this.setState({searchSugest : true})
        let local = JSON.parse(localStorage.getItem(`search${this.props.title}`))
        if(local != null && local.length > 0) {
            this.setState({searchLocalPure: local, searchLocal: local})
        }
    }
    searchOnBlur = () => {
        this.setState({searchSugest : false})
    }

    searchingbarInputHandler = e => {
        this.setState({searching : e.target.value})
        let search = this.state.searchLocalPure
        search = search.filter( string => string.includes(e.target.value))
        this.setState({searchLocal : search})
    }

    deleteLocalSugest = index => {
        /* this.setState({searchSugest : true}) */
        this.state.searchRef.current.focus()
        let temp = this.state.searchLocalPure
        try {
            temp.splice(index, 1)
            this.setState({searchLocalPure : temp, searchLocal : temp})
            localStorage.setItem(`search${this.props.title}`, JSON.stringify(temp))
        } catch (err) {
            throw err
        }
    }

    onSubmitSearchingBar = e => {
        e.preventDefault()
        if(this.state.searching === ''){
            this.props.fetchInit()
        }else this.props.fetchSearch(this.state.searching)
        setTimeout(() => {
            let local = JSON.parse(localStorage.getItem(`search${this.props.title}`))
            if(local != null && local.length > 0) {
                this.setState({searchLocalPure: local, searchLocal: local})
                debugger
            }
        }, 2000);
    }
    onClickSugest = (string) => {
        this.setState({searching : string})
        this.props.fetchSearch(string)
    }

    render(){
        const searchingbar = ConfigLocal.MISC.MaterialIcon + ' searchingbar-icon'
        const localSugestIcon = ConfigLocal.MISC.MaterialIcon + ' local-sugest-icon'
        const localSugestDel = ConfigLocal.MISC.MaterialIcon + ' local-sugest-del'
        const icon1 = ConfigLocal.MISC.MaterialIcon + ' title-icon'
        const icon3 = ConfigLocal.MISC.MaterialIcon + ' add-button-icon'
        return (
            <div className={this.props.showLine? "header-sticky header-line": "header-sticky"}>
                <div className="content-header">
                    <div className="content-info">
                        <div className="content-icon-base">
                            <span className={icon1} aria-hidden="true">
                                {this.props.icon || 'face'}
                            </span>
                        </div>
                        <div className="content-title">
                            {this.props.title}
                        </div>
                    </div>

                    <div className="util-wrapper" >

                        {/* PAGINATION */}
                        <Pagination pagination={this.props.pagination} fetchPage={this.props.fetchPage} />

                        {/* SEARCHING */}
                        {isNaN(this.props.pagination.PageIndex)? null :
                        <form className="searchingbar-base" onSubmit={this.onSubmitSearchingBar}>
                            <div className="searchingbar-socket">
                                <input value={this.state.searching} onChange={this.searchingbarInputHandler} className="searchingbar-input" placeholder={`Search ${this.props.title}`} 
                                    onFocus={this.searchOnFocus}
                                    onBlur={this.searchOnBlur}
                                    ref={this.state.searchRef}
                                />
                                <span className={searchingbar} aria-hidden="true"
                                    onClick={this.onSubmitSearchingBar}
                                >
                                    search
                                </span>
                                <div className={this.state.searchSugest? "search-sugest-show": "search-sugest-hide"}>
                                    {this.state.searchLocal.map( (e,n) => {
                                        /* if(n > 4) {return null} */
                                        return (
                                            <div className="local-sugest-list" key={n} >
                                                <button type="button" className="local-sugest-button" onClick={() => this.onClickSugest(e)} 
                                                    onFocus={() => this.setState({searchSugest : true})}
                                                    onBlur={() => this.setState({searchSugest : false})}
                                                >
                                                    <span className={localSugestIcon} aria-hidden="true">
                                                        history
                                                    </span>
                                                    {e}
                                                </button>
                                                <span className={localSugestDel} aria-hidden="true"
                                                    onClick={() => this.deleteLocalSugest(n)}
                                                >
                                                    clear
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </form>}
                        
                    </div>

                    {/* ADD BUTTON */}
                    { this.props.rowsCount > 0 ? 
                        <div className="content-add-button">
                            <Button onClick={this.props.addFunction} label={
                                <React.Fragment>
                                    <span className={icon3} aria-hidden="true">
                                        add
                                    </span>
                                    <span className="add-button-text">
                                        Add
                                    </span>
                                </React.Fragment>
                            } blue depressed /> 
                        </div>: null
                    }
                </div>

                {/* TABLE HEADER SHOW */}
                <div className="table-header-base">
                    <div className={this.props.showLine?"table-header-mask": "table-header-mask-off"}>
                        <div className={this.props.showLine?"table-header-show": "table-header-hide"}>
                            <table className="table-content table-header">
                                <thead>
                                    <tr>
                                        <th id="Name">Name</th><th id="Address">Address</th><th id="Telephone">Telephone</th><th>Email</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentHeader