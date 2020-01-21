import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import {getNotesForFolder} from '../notes-helpers';
import NoteContext from '../NoteContext';
import './NoteListMain.css';
import RemoveErrors from '../removeErrors'

export default class NoteListMain extends Component {
  static contextType = NoteContext;

  render () {
    const { notes } = this.context;
    const { folder_id } = this.props.match.params;
    const notesForFolder = getNotesForFolder(notes, Number(folder_id));
    console.log(folder_id)

  return (
    <section className='NoteListMain'>
      <ul>
        {notesForFolder.map(note =>
          <li key={note.id}>
            <RemoveErrors>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
            </RemoveErrors>
          </li>
        )}
      </ul>
      <div className='NoteListMain__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteListMain__add-note-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Note
        </CircleButton>
      </div>
    </section>
  )
}}

NoteListMain.defaultProps = {
  notes: [],
}
