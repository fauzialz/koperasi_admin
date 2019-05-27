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
                            <span className={icon2} aria-hidden="true">
                                storage
                            </span>
                            {props.rowsCount > 0 ?
                                <span className="data-status-number">{props.rowsCount}</span>:
                                <span className="data-status-loading" />
                            }
                            <span className="data-status-text">Rows</span>

                            <div className="data-status-wrapper">
                                <span className={icon2} aria-hidden="true">
                                    grid_on
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
        </div>
    )
}

export default ContentHeader