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
        searchLocal: []
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

    onSubmitSearchingBar = e => {
        e.preventDefault()
        this.props.fetchSearch(this.state.searching)
    }
    onClickSugest = (string) => {
        this.setState({searching : string})
        this.props.fetchSearch(string)
    }

    render(){
        const searchingbar = ConfigLocal.MISC.MaterialIcon + ' searchingbar-icon'
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
                                />
                                <span className={searchingbar} aria-hidden="true">
                                    search
                                </span>
                                <div className={this.state.searchSugest? "search-sugest-show": "search-sugest-hide"}>
                                    {this.state.searchLocal.map( (e,n) => {
                                        return (
                                            <button type="button" className="local-sugest-list" key={n} onClick={() => this.onClickSugest(e)} 
                                                onFocus={() => this.setState({searchSugest : true})}
                                                onBlur={() => this.setState({searchSugest : false})}
                                            >{e}</button>
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