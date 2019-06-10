import React from 'react'
import Button from '../button';
import ConfigLocal from '../../config/ConfigLocal';
import './ContentHeader.scss'

const ContentHeader = (props) => {
    const icon1 = ConfigLocal.MISC.MaterialIcon + ' title-icon'
    const icon2 = ConfigLocal.MISC.MaterialIcon + ' data-status-icon'
    const icon3 = ConfigLocal.MISC.MaterialIcon + ' add-button-icon'
    return (
        <div className={props.showLine? "header-sticky header-line": "header-sticky"}>
            <div className="content-header">
                <div className="content-info">
                    <div className="content-icon-base">
                        <span className={icon1} aria-hidden="true">
                            local_grocery_store
                        </span>
                    </div>
                    <div className="content-title">
                        {props.title}
                    </div>

                    {/* CONTENT STATUS */}
                    {props.rowsCount > 0 && props.columnsCount > 0 ?
                        <div className="content-data-status">
                            <div className="data-status-rows">
                                <span className={icon2} aria-hidden="true">
                                    view_agenda
                                </span>
                                {props.rowsCount > 0 ?
                                    <span className="data-status-number">{props.rowsCount}</span>:
                                    <span className="data-status-loading" />
                                }
                                <span className="data-status-text">Rows</span>
                            </div>
                            <div className="data-status-attributes">
                                <span className={icon2} aria-hidden="true">
                                    description
                                </span>
                                {props.columnsCount > 0 ?
                                    <span className="data-status-number">{props.columnsCount}</span>:
                                    <span className="data-status-loading" />
                                }
                                <span className="data-status-text">Attributes</span>
                            </div>
                        </div>: null
                    }

                </div>

                {/* ADD BUTTON */}
                { props.rowsCount > 0 ? 
                    <div className="content-add-button">
                        <Button onClick={props.addFunction} label={
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
                <div className={props.showLine?"table-header-mask": "table-header-mask-off"}>
                    <div className={props.showLine?"table-header-show": "table-header-hide"}>
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

export default ContentHeader