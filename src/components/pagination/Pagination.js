import React, { useState, useContext, useRef } from 'react'
import ConfigLocal from '../../config/ConfigLocal';
import HelperArray from '../../helper/HelperArray';
import './Pagination.scss'
import { AppContext } from '../../global';

const Pagination = (props) => {
    const context = useContext(AppContext)
    const inputRef = useRef(null)
    const [dropdown, setDropdown] = useState(false)
    const [oldrow, setOldrow] = useState(context.pageSize)
    const [focus, setFocus] = useState(false)
    const [change, setChange] = useState(false)
    const paginationArray = HelperArray.seqArray(props.pagination.TotalPages,1)
    const dropdownMargin = 5

    const onFocus = () => {
        setOldrow(context.pageSize)
        setFocus(true)
    }
    const onChange = (e) => {
        context.setPageSize(e.target.value)
        if(Number(e.target.value) === oldrow) {
            setChange(false)
        }else{
            setChange(true)
        }
    }
    const onBlur = () => {
        if(context.pageSize === '') {
            context.setPageSize(oldrow)
            setChange(false)
        }
        if(context.pageSize === oldrow) {
            setChange(false)
        }
        if(context.pageSize > props.pagination.TotalCount) {
            context.setPageSize(props.pagination.TotalCount)
        }if(isNaN(context.pageSize)){
            context.setPageSize(oldrow)
        }
        setFocus(false)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        let pageSize = context.pageSize
        if(!isNaN(pageSize) && pageSize <= props.pagination.TotalCount && pageSize !== oldrow && pageSize !== '') {
            setOldrow(pageSize)
            props.getTableData(false,0,pageSize,true)
            inputRef.current.blur()
        }else{
            context.setPageSize(oldrow)
        }
        setChange(false)
    }

    return (
        <React.Fragment>
            <div className="pagination-wrapper">

                {/* PAGE SIZE CHANGER */}
                {!props.pagination.TotalPages? null :
                <div className="show-row-base">
                    <form className="show-row-input-wrapper" 
                        onSubmit={onSubmit}
                    >
                        <input ref={inputRef} className="show-row-input" value={context.pageSize} onFocus={onFocus} onChange={onChange} onBlur={onBlur} />
                        <button type="submit" className={focus? "show-row-button-focus" : "show-row-button"}
                            disabled={!change}
                        >
                            <span className={change? ConfigLocal.MISC.MaterialIcon+ ' show-row-icon-change':ConfigLocal.MISC.MaterialIcon+' show-row-icon'} aria-hidden="true">
                                {change? "refresh" : "edit"}
                            </span>
                        </button>
                    </form>
                    <div className="show-row-text">{focus? `of ${props.pagination.TotalCount} Rows` : `Rows/Page`}</div> 
                </div>}

                {/* PAGE NAVIGATOR */}
                {isNaN(props.pagination.PageIndex) || props.pagination.TotalPages === 1? null:
                <React.Fragment>
                    <button className="arrow-active"
                        onClick={() => props.getTableData(false, props.pagination.PageIndex-1, context.pageSize, true)}
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
                                if( (props.pagination.PageIndex + 1) <= dropdownMargin) {
                                    if( (props.pagination.PageIndex + 1) === e ) {
                                        return <div key={e}><span className="marked-page">{e}</span></div>
                                    }else if( e === ((props.pagination.PageIndex + 1) + dropdownMargin + (dropdownMargin - props.pagination.PageIndex))) {
                                        return <div key={e} onClick={() => props.getTableData(false, props.pagination.TotalPages-1, context.pageSize, true)}>{e=== props.pagination.TotalPages? e : 'Last'}</div>
                                    }else if( e > ((props.pagination.PageIndex + 1) + dropdownMargin + (dropdownMargin - props.pagination.PageIndex))) {
                                        return null
                                    }
                                }else if ((props.pagination.PageIndex +1) >= (props.pagination.TotalPages - dropdownMargin)){
                                    if( (props.pagination.PageIndex + 1) === e ) {
                                        return <div key={e}><span className="marked-page">{e}</span></div>
                                    }else if( e === ((props.pagination.PageIndex + 1) - (dropdownMargin + (((props.pagination.PageIndex + 1) + dropdownMargin) - props.pagination.TotalPages)))) {
                                        return <div key={e} onClick={() => props.getTableData(false, 0, context.pageSize, true)}>{e === 1 ? e : 'First'}</div>
                                    }else if( e < ((props.pagination.PageIndex + 1) - (dropdownMargin + (((props.pagination.PageIndex + 1) + dropdownMargin) - props.pagination.TotalPages)))) {
                                        return null
                                    }
                                }else{
                                    if( (props.pagination.PageIndex + 1) === e ) {
                                        return <div key={e}><span className="marked-page">{e}</span></div>
                                    }else if( e < ((props.pagination.PageIndex + 1) - dropdownMargin)) {
                                        return null
                                    }else if( e === ((props.pagination.PageIndex + 1) - dropdownMargin)) {
                                        return <div key={e} onClick={() => props.getTableData(false, 0, context.pageSize, true)}>{e === 1 ? e : 'First'}</div>
                                    }else if( e === ((props.pagination.PageIndex + 1) + dropdownMargin)) {
                                        return <div key={e} onClick={() => props.getTableData(false, props.pagination.TotalPages-1, context.pageSize, true)}>{e=== props.pagination.TotalPages? e : 'Last'}</div>
                                    }else if( e > ((props.pagination.PageIndex + 1) + dropdownMargin)) {
                                        return null
                                    }
                                }
                                return <div key={e} onClick={() => props.getTableData(false, e-1, context.pageSize, true)}>{e}</div>
                            })}
                        </div>
                    </div>

                    <button className="arrow-active" 
                        onClick={() => props.getTableData(false, props.pagination.PageIndex+1, context.pageSize, true)}
                        disabled={!props.pagination.HasNextPage}
                    >
                        <span className={ConfigLocal.MISC.MaterialIcon+' pagination-arrow'} aria-hidden="true">
                            keyboard_arrow_right
                        </span>
                    </button>
                </React.Fragment  >}
            </div>
        </React.Fragment>
    )
}

export default Pagination