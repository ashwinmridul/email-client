import React from 'react';
import {Link} from 'react-router-dom';
import './navigation.css';

const Navigation = () => (
    <div className='navigator'>
        <ul>
            <li><Link to='/inbox'>Inbox</Link></li>
            <li><Link to='/spam'>Spam</Link></li>
            <li><Link to='/deleted'>Deleted</Link></li>
            <li><Link to='/custom'>Custom</Link></li>
        </ul>
    </div>
);

export default Navigation;