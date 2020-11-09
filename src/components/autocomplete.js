import React, { Component, Fragment } from "react"
import ReactAutoSuggestDropdown from 'react-autosuggest-dropdown-menu'
import players from './players.js'

export default class Autocomplete extends Component {
  constructor () {
    super()
    this.state = {
      chosenValue: '',
      searchValue: '',
      showDropdown: false,
      list: players

    }

    this.chooseDropdownItem = this.chooseDropdownItem.bind(this)
    this.updateSearchValue = this.updateSearchValue.bind(this)
    this.showDropdown = this.showDropdown.bind(this)
  }

  chooseDropdownItem (e, valueSelected, valueObject) {
    e.preventDefault()
    this.setState({ showDropdown: false, searchValue: valueSelected })
    this.props.valueCallback(valueObject)
  }



  updateSearchValue(e){
    e.preventDefault()
    this.setState({ searchValue: e.target.value })
    this.props.valueCallback(e.target.value)
  }

  showDropdown(){
    this.setState({ showDropdown: true })
  }

  clearSearchValue(){
    this.setState({
      searchValue: ''
    })
  }

  debounce(func, wait, immediate) {
    var timeout;
  
    return function executedFunction() {
      var context = this;
      var args = arguments;
        
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      var callNow = immediate && !timeout;
    
      clearTimeout(timeout);
  
      timeout = setTimeout(later, wait);
    
      if (callNow) func.apply(context, args);
    };
  };

  showDropdownDebounce = this.debounce(this.showDropdown, 250)

  /*componentDidUpdate(){
    this.props.checkAnswerCallback()
  }
*/
  render() {
    const me = this
    return (
      <div className='autocomplete'>
       <ReactAutoSuggestDropdown 
          list={this.state.list} 
          showDropdown={this.showDropdown} 
          displayDropdownMenu={this.state.showDropdown}
          chosenValue={this.state.chosenValue} 
          chooseDropdownItem={this.chooseDropdownItem} 
          updateSearchValue={this.updateSearchValue}
          searchValue={this.state.searchValue}
          highlightColour={"#ff9966"}
        />
       </div>
    );
  }
}