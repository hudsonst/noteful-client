import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import config from '../config';
import ValidationError from '../ValidationError'


class AddFolder extends Component {
    static contextType = NoteContext;

state = {
    error: null,
    name: { 
      value: '',
      touched: false
    },
  }

updateName(name) {
    this.setState({name: {value: name},
        touched: true
    });
  }

validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Name is required';
    } 
  }

handleSubmit = e => {
    e.preventDefault()
    const folder = {
       name: this.state.name.value,
    }
    this.setState({ error: null })
    fetch(`${config.API_ENDPOINT}/api/folders`, {
      method: 'POST',
      body: JSON.stringify(folder),
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        //id value added by the server
        this.context.addFolder(data)
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  }

 render() {
    return (
     <section className='AddFolder'>
         <h2>Add a Folder</h2>
         <form className='AddFolder_Form' onSubmit={this.handleSubmit}>
            <div>
                <label htmlFor='name'>Name {' '}</label>
                <input type='text' id='name' onChange={ e => this.updateName(e.target.value)}/>
                {!this.state.name.touched && (
                <ValidationError message={this.validateName()} />
                 )}
            </div>
          <div className='AddFolder__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit' disabled={
              this.validateName()}>
              Add
            </button>
         </div>
         </form>
     </section>
    )
 }
}

 export default AddFolder;

