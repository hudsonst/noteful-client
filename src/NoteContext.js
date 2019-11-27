import React from 'react'

const NoteContext = React.createContext({
  notes: [],
  folders: [],
  note: () => {},
  folder: () => {},
  notesForFolder: () => {},
})

export default NoteContext