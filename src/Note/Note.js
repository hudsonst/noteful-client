import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import config from '../config'
import NoteContext from '../NoteContext'
import PropTypes from 'prop-types';
import './Note.css'

function deleteNote(note_id, cb) {
  fetch(`${config.API_ENDPOINT}/api/notes/${note_id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
  })
 .then(response => {
     if (!response.ok) {
         throw new Error ('Something went wrong deleting this note');
     }})
 .then(cb(note_id))
 .catch(error => {
    console.error(error)})
}

export default function Note(props) {

  return (
    <NoteContext.Consumer>
    {(context) => (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={{
          pathname: `/note/${props.id}`,
          state: { id: props.id }}}>
          {props.name}
        </Link>
      </h2>
      <Link to='/'>
         <button className='Note__delete' type='button' 
           onClick={() => {
           deleteNote(
            props.id,
            context.deleteNoteFromState)}}>
         <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
          </button>
      </Link>
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

Note.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.instanceOf(Date).isRequired
}

