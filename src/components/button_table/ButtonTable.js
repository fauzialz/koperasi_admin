import React from'react';
import ConfigLocal from '../../config/ConfigLocal';
import './ButtonTable.scss';

const ButtonTable = (props) => {
    const icon = ConfigLocal.MISC.MaterialIcon + ' action-button-icon'
    return (
        <span className="row-hover-base">
            <div className="row-hover-middle">
                <div className="row-hover-socket">
                    <div className="hover-button-base">
                        <span className="button-sparator1">
                            <span id="button-see" className={icon} aria-hidden="true" onClick={() => props.infoButton(props.rowData)} title="See all attribute">
                                find_in_page
                            </span>
                        </span>
                        <span className="button-sparator2">
                            <span className={icon} aria-hidden="true" onClick={() => props.editButton(props.rowData.Id)} title="Edit row">
                                edit
                            </span>
                        </span>
                        <span className="button-sparator3">
                            <span className={icon} aria-hidden="true" onClick={() => props.deleteButton(props.rowData.Id)} title="Delete row">
                                delete
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </span>
    )
}

export default ButtonTable