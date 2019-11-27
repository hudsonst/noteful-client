import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteContext from '../NoteContext'
import './Note.css'

function deleteNote(noteId, callback) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
  })
 .then(response => {
     if (!response.ok) {
         throw new Error ('Something went wrong deleting this note');
     }
     return response})
 .then(response => response.json())
 .then(callback(noteId))
 .catch(error => {
    console.error(error)})
}

export default function Note(props) {
  return (
    <NoteContext.Consumer>
    {(context) => (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' 
        onClick={() => {
           deleteNote(
            props.id,
            context.deleteNoteFromState)}}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>)}
  </NoteContext.Consumer>
  )
}
