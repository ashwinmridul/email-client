import React from 'react';
import {Redirect, Switch, Route, BrowserRouter} from 'react-router-dom';
import './app.css';
import Header from './components/header/Header.jsx';
import Navigation from './components/navigation/Navigation.jsx';
import List from './components/list/List.jsx';

const App = () => (
    <BrowserRouter>
        <div>
            <Header />
            <div className='mainContent'>
                <Navigation />
                <Switch>
                    <Redirect exact from='/' to='/inbox' />
                    <Route path='/:listType(inbox|spam|deleted|custom)' component={List} />
                    <Route path='*' component={() => (<div>
                        Not Found
                    </div>)} />
                </Switch>
            </div>
        </div>
    </BrowserRouter>
);

export default App;