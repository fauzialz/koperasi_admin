import React, { useState } from 'react'
import ConfigLocal from '../../config/ConfigLocal';
import HelperArray from '../../helper/HelperArray';
import './Pagination.scss'

const Pagination = (props) => {
    const [dropdown, setDropdown] = useState(false)
    const [row, setRow] = useState(12)
    const [oldrow, setOldrow] = useState(12)
    const [focus, setFocus] = useState(false)
    const [change, setChange] = useState(false)
    const paginationArray = HelperArray.seqArray(props.pagination.TotalPages,1)
    const dropdownMargin = 5

    const onFocus = () => {
        setFocus(true)
    }
    const onChange = (e) => {
        setRow(e.target.value)
        if(Number(e.target.value) === oldrow) {
            setChange(false)
        }else setChange(true)
        /* if(Number(e.target.value) > props.pagination.TotalCount) {
            setRow(props.pagination.TotalCount)
        }if(isNaN(Number(e.target.value))){
            setRow(oldrow)
        } */
    }
    const onBlur = () => {
        if(row === '') {
            setRow(oldrow)
            setChange(false)
        }
        if(row === oldrow) {
            setChange(false)
        }
        if(row > props.pagination.TotalCount) {
            setRow(props.pagination.TotalCount)
        }if(isNaN(row)){
            setRow(oldrow)
        }
        setFocus(false)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let pageSize = row
        if(!isNaN(pageSize) && pageSize <= props.pagination.TotalCount && pageSize !== oldrow) {
            setOldrow(pageSize)
            props.getTableData(false,0,pageSize,true)
        }else{
            setRow(oldrow)
        }
        setChange(false)
    }

    return (
        <React.Fragment>
            {isNaN(props.pagination.PageIndex) || props.pagination.TotalPages === 1? null:
                    <div className="pagination-wrapper">

                        <div className="show-row-base">
                            <form className="show-row-input-wrapper" 
                                onSubmit={onSubmit}
                            >
                                <input className="show-row-input" value={row} onFocus={onFocus} onChange={onChange} onBlur={onBlur} />
                                <button type="submit" className={focus? "show-row-button-focus" : "show-row-button"}
                                    disabled={!change}
                                >
                                    <span className={change? ConfigLocal.MISC.MaterialIcon+ ' show-row-icon-change':ConfigLocal.MISC.MaterialIcon+' show-row-icon'} aria-hidden="true">
                                        {change? "refresh" : "edit"}
                                    </span>
                                </button>
                            </form>
                            <div className="show-row-text">{`Rows/Page`}</div> 
                        </div>


                        <button className="arrow-active"
                            onClick={() => props.getTableData(false, props.pagination.PageIndex-1, row, true)}
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
                                        return <div key={e} onClick={() => props.getTableData(false, 0, row, true)}>{e === 1 ? e : 'First'}</div>
                                    }else if( e === ((props.pagination.PageIndex + 1) + dropdownMargin)) {
                                        return <div key={e} onClick={() => props.getTableData(false, props.pagination.TotalPages-1, row, true)}>{e=== props.pagination.TotalPages? e : 'Last'}</div>
                                    }else if( e > ((props.pagination.PageIndex + 1) + dropdownMargin)) {
                                        return null
                                    }
                                    return <div key={e} onClick={() => props.getTableData(false, e-1, row, true)}>{e}</div>
                                })}
                            </div>
                        </div>

                        <button className="arrow-active" 
                            onClick={() => props.getTableData(false, props.pagination.PageIndex+1, row, true)}
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