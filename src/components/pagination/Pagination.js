import React, { useState } from 'react'
import ConfigLocal from '../../config/ConfigLocal';
import HelperArray from '../../helper/HelperArray';
import './Pagination.scss'

const Pagination = (props) => {
    const [dropdown, setDropdown] = useState(false)
    const paginationArray = HelperArray.seqArray(props.pagination.TotalPages,1)
    const dropdownMargin = 5

    return (
        <React.Fragment>
            {isNaN(props.pagination.PageIndex) || props.pagination.TotalPages === 1? null:
                    <div className="pagination-wrapper">
                        <button className="arrow-active"
                            onClick={() => props.getTableData(false, props.pagination.PageIndex-1, props.pageSize, true)}
                            disabled={!props.pagination.HasPreviousPage}
                        >
                            <span className={ConfigLocal.MISC.MaterialIcon+' pagination-arrow'} aria-hidden="true">
                                keyboard_arrow_left
                            </span>
                        </button>
                        
                        <div className="page-socket">
                            <button className={dropdown? "page-button onHover" : "page-button"} 
                                onClick={() => {setDropdown(!dropdown)}}
                                onMouseOver={() => {setDropdown(true)}}
                                onMouseLeave={() => {setDropdown(false)}}
                            >
                                {dropdown? (props.pagination.PageIndex + 1)+' of '+ props.pagination.TotalPages: 'Page '+(props.pagination.PageIndex + 1)}
                            </button>
                            <div className={dropdown?"page-show" : "page-hide"}
                                onMouseEnter={() => {setDropdown(true)}}
                                onMouseLeave={() => {setDropdown(false)}}
                            >   
                                {paginationArray.map(e => {
                                    if( (props.pagination.PageIndex + 1) === e ) {
                                        return <div key={e}><span className="marked-page">{e}</span></div>
                                    }else if( e < ((props.pagination.PageIndex + 1) - dropdownMargin)) {
                                        return null
                                    }else if( e === ((props.pagination.PageIndex + 1) - dropdownMargin)) {
                                        return <div key={e} onClick={() => props.getTableData(false, 0, props.pageSize, true)}>{e === 1 ? e : 'First'}</div>
                                    }else if( e === ((props.pagination.PageIndex + 1) + dropdownMargin)) {
                                        return <div key={e} onClick={() => props.getTableData(false, props.pagination.TotalPages-1, props.pageSize, true)}>{e=== props.pagination.TotalPages? e : 'Last'}</div>
                                    }else if( e > ((props.pagination.PageIndex + 1) + dropdownMargin)) {
                                        return null
                                    }
                                    return <div key={e} onClick={() => props.getTableData(false, e-1, props.pageSize, true)}>{e}</div>
                                })}
                            </div>
                        </div>

                        <button className="arrow-active" 
                            onClick={() => props.getTableData(false, props.pagination.PageIndex+1, props.pageSize, true)}
                            disabled={!props.pagination.HasNextPage}
                        >
                            <span className={ConfigLocal.MISC.MaterialIcon+' pagination-arrow'} aria-hidden="true">
                                keyboard_arrow_right
                            </span>
                        </button>
                    </div>}
        </React.Fragment>
    )
}

export default Pagination