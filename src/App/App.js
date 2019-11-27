import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import NoteContext from '../NoteContext';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

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
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            }
        return (
        <NoteContext.Provider value={contextValue}>
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
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
      </NoteContext.Provider>
        );
    }

    renderMainRoutes() {
        const contextValue = {
            notes: this.state.notes,
            folder: this.state.folder
            }
        return (
        <NoteContext.Provider value={contextValue}>
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                                />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageMain} />
            </>
        </NoteContext.Provider>
        );
    }

    render() {
        return (
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
        );
    }
}

export default App;
