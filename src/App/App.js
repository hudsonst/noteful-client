import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import NoteContext from '../NoteContext';
import './App.css';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import AddErrors from '../addErrors';
import RemoveErrors from '../removeErrors';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    deleteNoteFromState = noteId => {
    const newNotes = this.state.notes.filter(note =>
       note.id !== noteId)
    this.setState({
       notes: newNotes
    })}

    addFolder = folder => {
        this.setState({
          folders: [ ...this.state.folders, folder ],
        })
    }

    addNote = note => {
        this.setState({
          notes: [ ...this.state.notes, note ],
        })
      }

    componentDidMount() {

        fetch('http://localhost:9090/folders')
         .then(response => {
             if (!response.ok) {
                 throw new Error ('Something went wrong fetching folders');
             }
             return response
         })
         .then(response => response.json())
         .then(data => {
             this.setState({folders: data})
         })

         fetch('http://localhost:9090/notes')
         .then(response => {
             if (!response.ok) {
                 throw new Error ('Something went wrong fetching notes');
             }
             return response
         })
         .then(response => response.json())
         .then(data => {
             this.setState({notes: data})
         })
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                            />
                        )
                )}
                <Route
                    path="/note/:noteId"
                    component={NotePageNav}
                />
                <AddErrors>
                <Route path="/add-folder" component={AddFolder} />
                </AddErrors>
            </>
        );
    }

    renderMainRoutes() {

        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                                />
                ))}
                <RemoveErrors>
                <Route
                    path="/note/:noteId"
                    component={NotePageMain} />
                </RemoveErrors>
            <AddErrors>
            <Route path="/add-note" component={AddNote} />
            </AddErrors>
            </>
        );
    }

    render() {
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNoteFromState: this.deleteNoteFromState,
            addFolder: this.addFolder,
            addNote: this.addNote
            }
        return (
            <NoteContext.Provider value={contextValue}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </NoteContext.Provider>
        );
    }
}

export default App;
