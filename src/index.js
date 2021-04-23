import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import BooksApp from './App'
import './index.css'

ReactDOM.render(<BrowserRouter>
<BooksApp />
</BrowserRouter>, document.getElementById('root'))
