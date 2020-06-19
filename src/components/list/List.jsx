import React from 'react';
import './list.css';
import {useParams} from 'react-router-dom';

const List = () =>  {
    const { listType } = useParams();
    return (
        <div className='list-container'>
            <div className='list'>
                {listType}<br />
                left
            </div>
            <div className='content'>right</div>
        </div>
    );
};

export default List;