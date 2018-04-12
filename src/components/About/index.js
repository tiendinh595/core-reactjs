import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import WindowTitle from 'Components/Layput/WindowTitle'

export default ()=>  {
    alert('about')
    return (
        <Fragment>
            <WindowTitle title="about" />
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <h1>About page</h1>
        </Fragment>
    )
}
