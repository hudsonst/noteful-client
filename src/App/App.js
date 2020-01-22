import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import config from '../config';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    deleteNoteFromState = note_id => {
        const newNotes = this.state.notes.filter(note =>
            note.id !== note_id)
        this.setState({
            notes: newNotes
        })
    }

    addFolder = folder => {
        this.setState({
            folders: [...this.state.folders, folder],
        })
    }

    addNote = note => {
        this.setState({
            notes: [...this.state.notes, note],
        })
    }

    componentDidMount() {

        fetch(`${config.API_ENDPOINT}/api/folders`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong fetching folders');
                }
                return response
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ folders: data })
            })

        fetch(`${config.API_ENDPOINT}/api/notes`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong fetching notes');
                }
                return response
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ notes: data })
            })
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folder_id'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                )
                )}
                <Route
                    path="/note/:note_id"
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
                {['/', '/folder/:folder_id'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={(props) => <NoteListMain {...props} folder_id={props.folder_id}/>}
                    />
                ))}
                <RemoveErrors>
                    <Route
                        path="/note/:note_id" component={NotePageMain} />
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
