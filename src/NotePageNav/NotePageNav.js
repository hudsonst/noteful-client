import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import {findNote, findFolder} from '../notes-helpers'
import NoteContext from '../NoteContext';
import './NotePageNav.css'

export default class NotePageNav extends Component {
  static contextType = NoteContext;

  render () {
    const { notes, folders } = this.context;
    const { note_id } = this.props.match.params;
    const note = findNote(notes, note_id) || {};
    const folder = findFolder(folders, note.folder_id);
  
  return (
    <div className='NotePageNav'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => this.props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {folder && (
        <h3 className='NotePageNav__folder-name'>
          {folder.name}
        </h3>
      )}
    </div>
  )
}}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}
