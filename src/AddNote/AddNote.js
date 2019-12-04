import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import ValidationError from '../ValidationError';
import './AddNote.css';
import Errors from '../addErrors';

class AddNote extends Component {
    static contextType = NoteContext;

state = {
    error: null,
    name: { 
      value: '',
      touched: false
    },
    content: '',
    folder: ''
  }

createFolderList() {
    return (this.context.folders.map(folder => 
    <option key={folder.id} value={folder.id}>{folder.name}</option>)
    );
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
    const {content, folder} = e.target

    const note = {
      name: this.state.name.value,
      modified: new Date(),
      folderId: folder.value,
      content: content.value,
    }
    this.setState({ error: null })

    fetch('http://localhost:9090/notes', {
      method: 'POST',
      body: JSON.stringify(note),
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
        this.context.addNote(data)
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
    const folderList = this.createFolderList();
    return (

     <section className='AddNotes'>
         <h2>Add a Note</h2>
         <Errors>
         <form className='AddNotes_Form' onSubmit={this.handleSubmit}>
            <div>
                <label htmlFor='name'>Name {' '}</label>
                <input type='text' id='name'
                onChange={ e => this.updateName(e.target.value)} />
                {!this.state.name.touched && (
                <ValidationError message={this.validateName()} />
                 )}
               <label htmlFor='content' id='content'>Content {' '}</label>
               <textarea id='content' rows='10' cols='30'/>
               <label htmlFor='folder' id='folder'>Choose a Folder {' '}</label>
               <select name='folder' id='folder'>
                  {folderList}
               </select>
            </div>
          <div className='AddNotes__buttons'>
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
         </Errors>
     </section>
    )
 }
}

 export default AddNote;
