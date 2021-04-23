import React, { useState, useEffect } from 'react'
import './App.css'
import Shelf from './BookShelves'
import { Route, Link } from 'react-router-dom'
import { getAll, update, search } from './BooksAPI'



export default function BooksApp() {
    const [listOfBooks, setListOfBooks] = useState([]);
    const [searchedBooks, setSearchedBooks] = useState('');
    const shelfNames = [{ id: 'currentlyReading', title: 'My Reads' }, { id: 'wantToRead', title: 'To Read' }, { id: 'read', title: 'Read' }];


    const searchForBooks = (query) => {
        console.log(query);
        search(query)
            .then(res => {
                res.length > 0 ?
                    setSearchedBooks(res) : <div>nothing</div>
            })
            .catch((e) => {
                console.log('Oopsies, there\'s been an error!', e)
            })
    }

    const onShelfUpdate = (updatedShelfName, currentBookID) => {
        update(currentBookID, updatedShelfName)
            .then(() => getAll().then(res => setListOfBooks(res))
            )
    };

    useEffect(() => {
        getAll()
            .then(data => setListOfBooks(data))
    }, [listOfBooks.length])

    if (listOfBooks.length <= 0) {
        return null
    }

    return (
        <div className="app">
            <Route exact path='/search' render={() => (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to="/" />
                        <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author" onChange={(e) => {
                                if (e.target.value != '') { searchForBooks(e.target.value) }
                                setSearchedBooks([])
                            }} />
                        </div>
                    </div>
                    {
                        (searchedBooks != undefined && searchedBooks != null && searchedBooks.length != 0) ?
                            <Shelf shelfName="Searched Books" onShelfUpdate={onShelfUpdate} books={searchedBooks} />
                            : null
                    }
                </div>
            )} />
            <Route exact path="/" render={() => (
                <div>
                    <ol className="books-grid">
                        {shelfNames.map(shelf =>
                            <Shelf key={shelf.title} shelfName={shelf.title} onShelfUpdate={onShelfUpdate}
                                books={listOfBooks.filter(book => book.shelf === shelf.id)} />)}
                    </ol>
                    <div className="open-search">
                        <Link
                            to="/search">
                            <button>Add a book</button>
                        </Link>
                    </div>
                </div>
            )} />
        </div>
    )
}

