import React, { useState, defaultProps } from 'react'


export default function Book(bookProps) {
    let { title, author, style, id, shelfLocation = 'none', onShelfUpdate } = bookProps.book;
    let { width, height, backgroundImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png" } = style;
    const[value, setValue] = useState(shelfLocation);


    return (
        <li>
            <div className="book" key={id} shelflocation={shelfLocation}>
                <div className="book-top">
                    <div className="book-cover" style={{ width, height, backgroundImage: `url(${backgroundImage})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={value} onChange={((e) => {
                            setValue(e.target.value);
                            onShelfUpdate(e.target.value, id);
                        })} >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading" >Currently Reading</option>
                            <option value="wantToRead" >Want to Read</option>
                            <option value="read" >Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{author}</div>
            </div>
        </li>
    )
};

Book.defaultProps = {
    title: 'No title available',
    author: 'None', 
    style: {
        width: "200px", 
        height: "200px", 
        backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
    }, 
    id: 'none',
    shelfLocation: 'none'
}
