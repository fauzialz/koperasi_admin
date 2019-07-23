import React from 'react'
import './SearchBar.scss'
import ConfigLocal from '../../config/ConfigLocal';
import HelperHttp from '../../helper/HelperHttp';

class SearchBar extends React.Component {
    state = {
        input : React.createRef(),
        query : '',
        showSugest : false,
        sugestLocalDirect : [],
        sugestLocalModif : [],
        sugestApi : [],
        cursor : 0
    }

    onFocusInput = e => {
        this.fetchSugestions(e.target.value)
        let sugestLocal = JSON.parse(localStorage.getItem(`search${this.props.title}`))
        if(sugestLocal && sugestLocal.length > 0) {
            this.setState({sugestLocalDirect : sugestLocal, sugestLocalModif : sugestLocal})
            let sugestTemp = JSON.parse(JSON.stringify(sugestLocal))
            sugestTemp = sugestTemp.filter( string => string.includes(e.target.value))
            this.setState({sugestLocalModif : sugestTemp })
            if( sugestTemp.length > 0 && e.target.value.length > 0) {
                this.setState({showSugest : true})
            }else this.setState({showSugest : false})
        }
    }

    onBlurInput = () => {
        this.setState({showSugest : false, cursor : 0})
    }

    onKeyDownInput = e => {
        const { cursor, sugestLocalModif } = this.state
        if(e.key === 'ArrowDown' && cursor < sugestLocalModif.length ) {
            this.setState( prevState => ({
                cursor: prevState.cursor + 1, query : this.state.sugestLocalModif[this.state.cursor], showSugest: true
            }))
        }else if(e.key === 'ArrowUp' && cursor > 0) {
            this.setState( prevState => ({
                cursor: prevState.cursor - 1, query : this.state.sugestLocalModif[this.state.cursor < 2 ? this.state.cursor - 1 : this.state.cursor - 2]
            }))
        }
    }

    // ! reset cursor when hover
    onHoverSugestLocal = () => {
        this.setState({cursor : 0})
    }
    
    fetchSugestions = async (string) => {
        if(string.length > 1 && string.length % 2 === 0){
            try {
                let res = await HelperHttp.get(`${this.props.url}?pageIndex=0&pageSize=150&search=${this.state.query}`)
                if(res.status === 200 && res.success) {
                    let data = res.data.slice(0,3)
                    this.setState({sugestApi :data})
                }else this.setState({sugestApi : []})
            } catch (err) {
                throw err
            }
        }else if(string.length === 0) {this.setState({sugestApi : []})}
    }
    
    onChangeInput = e => {
        this.setState({query : e.target.value})
        let sugestLocal = this.state.sugestLocalDirect
        sugestLocal = sugestLocal.filter( string => string.includes(e.target.value))
        this.setState({sugestLocalModif : sugestLocal})
        this.fetchSugestions(e.target.value)
        if(e.target.value.length > 0 && (sugestLocal.length > 0 || this.state.sugestApi.length > 0)) {
            this.setState({showSugest : true})
        }else this.setState({showSugest : false})
    }

    onSubmitForm = e => {
        e.preventDefault()
        this.state.input.current.blur()
        if(this.state.query === '') {
            this.props.fetchInit()
        }else this.props.fetchSearch(this.state.query)
        setTimeout(() => {
            let sugestLocal = JSON.parse(localStorage.getItem(`search${this.props.title}`))
            if(sugestLocal && sugestLocal.length > 0) {
                this.setState({sugestLocalDirect: sugestLocal, sugestLocalModif: sugestLocal})
            }
        }, 2000);
    }

    onClickSugestLocal = string => {
        this.setState({ showSugest : false, query : string})
        this.state.input.current.blur()
        this.props.fetchSearch(string)
    }

    onDeleteSugestLocal = string => {
        this.state.input.current.focus()
        let temp = this.state.sugestLocalDirect
        try {
            let index = temp.indexOf(string)
            temp.splice(index, 1)
            this.setState({ sugestLocalDirect : temp, sugestLocalModif : temp })
            localStorage.setItem(`search${this.props.title}`, JSON.stringify(temp))
        } catch (err) {
            throw err
        }
    }

    render() {
        const searchIcon = ConfigLocal.MISC.MaterialIcon + ' searchbar-icon'
        const sugestLocalIcon = ConfigLocal.MISC.MaterialIcon + ' local-sugest-icon'
        const sugestApiIcon = ConfigLocal.MISC.MaterialIcon + ' api-sugest-icon'
        const sugestLocalDel = ConfigLocal.MISC.MaterialIcon + ' local-sugest-del'
        return (
            <React.Fragment>
                {/* isNaN(this.props.pagination.PageIndex)? null : */ 
                <form className="searchbar-base" onSubmit={this.onSubmitForm}>
                    <div className="searchbar-socket">
                        <input value={this.state.query} onChange={this.onChangeInput} 
                            className={this.state.showSugest? "searchbar-input-showSugest" : "searchbar-input"} placeholder={`Search ${this.props.title}`} 
                            onFocus={this.onFocusInput}
                            onBlur={this.onBlurInput}
                            ref={this.state.input}
                            onKeyDown={this.onKeyDownInput}
                        />
                        <span className={searchIcon} aria-hidden="true"
                            onClick={this.onSubmitForm}
                        >
                            search
                        </span>
                        <div className={this.state.showSugest? "search-sugest-show": "search-sugest-hide"}>
                            {this.state.sugestLocalModif.map( (e,n) => {
                                /* if(n > 4) {return null} */
                                return (
                                    <div className="local-sugest-list" key={n} onMouseOver={this.onHoverSugestLocal}>
                                        <div className={this.state.cursor === n + 1 ? "local-sugest-tile-mark" : "local-sugest-tile"} onClick={() => this.onClickSugestLocal(e)} 
                                            onFocus={() => this.setState({showSugest : true})}
                                            onBlur={() => this.setState({showSugest : false})}
                                        >
                                            <span className={sugestLocalIcon} aria-hidden="true">
                                                history
                                            </span>
                                            <div className="local-sugest-text">{e}</div>
                                        </div>
                                        <span className={sugestLocalDel} aria-hidden="true"
                                            onClick={() => this.onDeleteSugestLocal(e)}
                                        >
                                            clear
                                        </span>
                                    </div>
                                )
                            })}
                            {this.state.sugestApi && this.state.sugestApi.length > 0 ?
                            this.state.sugestApi.map( (e, n) => {
                                return (
                                    <div className="local-sugest-list" key={n} onMouseOver={this.onHoverSugestLocal}>
                                        <div className={this.state.cursor === (this.state.sugestLocalModif.length + n) + 1 ? "local-sugest-tile-mark" : "local-sugest-tile"} onClick={() => this.onClickSugestLocal(e.Name)} 
                                            onFocus={() => this.setState({showSugest : true})}
                                            onBlur={() => this.setState({showSugest : false})}
                                        >
                                            <span className={sugestApiIcon} aria-hidden="true">
                                                list_alt
                                            </span>
                                            <div className="local-sugest-text">{e.Name}</div>
                                        </div>
                                    </div>
                                )
                            }): null}
                        </div>
                    </div>  
                </form> 
                }
            </React.Fragment>
        )
    }
}

export default SearchBar