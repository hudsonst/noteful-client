import React, { Component } from 'react';
import NoteContext from '../NoteContext';


class AddFolder extends Component {
    static contextType = NoteContext;

state = {
    error: null,
  }


handleSubmit = e => {
    e.preventDefault()
    const { name } = e.target
    const folder = {
      name: name.value
    }
    this.setState({ error: null })
    fetch('http://localhost:9090/folders', {
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
                <input type='text' id='name' />
            </div>
          <div className='AddFolder__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Add
            </button>
         </div>
         </form>
     </section>
    )
 }
}

 export default AddFolder;

