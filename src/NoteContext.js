import React from 'react'

const NoteContext = React.createContext({
  notes: [],
  folders: [],
  note: () => {},
  folder: () => {},
  notesForFolder: () => {},
  deleteNoteFromState: () => {},
  addFolder: () => {},
  addNote: () => {}
})

export default NoteContext