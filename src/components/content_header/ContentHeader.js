import React from 'react'
import Button from '../button';
import ConfigLocal from '../../config/ConfigLocal';
import './ContentHeader.scss'
import Pagination from '../pagination/Pagination';

class ContentHeader extends React.Component {
    state = {
        showpages : false,
        dropdownMargin: 5
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
                    <Pagination pagination={this.props.pagination} getTableData={this.props.getTableData} />

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