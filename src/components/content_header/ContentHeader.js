import React from 'react'
import Button from '../button';
import ConfigLocal from '../../config/ConfigLocal';
import './ContentHeader.scss'

class ContentHeader extends React.Component {
    state = {
        showpages : false
    }

    render(){
        const icon1 = ConfigLocal.MISC.MaterialIcon + ' title-icon'
        const icon2 = ConfigLocal.MISC.MaterialIcon + ' data-status-icon'
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

                        {/* CONTENT STATUS */}
                        {this.props.rowsCount > 0 && this.props.columnsCount > 0 ?
                            <div className="content-data-status">
                                <div className="data-status-rows">
                                    <span className={icon2} aria-hidden="true">
                                        view_agenda
                                    </span>
                                    {this.props.rowsCount > 0 ?
                                        <span className="data-status-number">{this.props.rowsCount}</span>:
                                        <span className="data-status-loading" />
                                    }
                                    <span className="data-status-text">Rows</span>
                                </div>
                                <div className="data-status-attributes">
                                    <span className={icon2} aria-hidden="true">
                                        description
                                    </span>
                                    {this.props.columnsCount > 0 ?
                                        <span className="data-status-number">{this.props.columnsCount}</span>:
                                        <span className="data-status-loading" />
                                    }
                                    <span className="data-status-text">Attributes</span>
                                </div>
                            </div>: null
                        }

                    </div>

                    {/* PAGINATION */}
                    <div className="pagination-wrapper">
                        <button className="arrow-active"
                            onClick={() => this.props.getTableData(false, this.props.pagination.PageIndex-1)}
                            disabled={!this.props.pagination.HasPreviousPage}
                        >
                            <span className={ConfigLocal.MISC.MaterialIcon+' pagination-arrow'} aria-hidden="true">
                                keyboard_arrow_left
                            </span>
                        </button>

                        <div className="page-socket">
                            <button className={this.state.showpages? "page-button onHover" : "page-button"} 
                                onClick={() => {this.setState({showpages : !this.state.showpages})}}
                                onMouseEnter={() => {this.setState({showpages : true})}}
                                onMouseLeave={() => {this.setState({showpages : false})}}
                            >
                                Page {this.props.pagination.PageIndex + 1}
                            </button>
                            <div className={this.state.showpages?"page-show" : "page-hide"}
                                onMouseEnter={() => {this.setState({showpages : true})}}
                                onMouseLeave={() => {this.setState({showpages : false})}}
                            >   
                                {this.props.paginationArray.map(e => {
                                    return ((this.props.pagination.PageIndex + 1) === e?
                                        <div key={e}><span className="marked-page">{e}</span></div> :
                                        <div key={e} onClick={() => this.props.getTableData(false, e-1)}>{e}</div>)
                                })}
                            </div>
                        </div>

                        <button className="arrow-active" 
                            onClick={() => this.props.getTableData(false, this.props.pagination.PageIndex+1)}
                            disabled={!this.props.pagination.HasNextPage}
                        >
                            <span className={ConfigLocal.MISC.MaterialIcon+' pagination-arrow'} aria-hidden="true">
                                keyboard_arrow_right
                            </span>
                        </button>
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