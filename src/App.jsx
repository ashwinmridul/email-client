import React from 'react';
import {Redirect, Switch, Route, BrowserRouter} from 'react-router-dom';
import './app.css';
import Header from './components/header/Header.jsx';
import Navigation from './components/navigation/Navigation.jsx';
import List from './components/list/List.jsx';
import { listTypes } from './constants/constants.js';
import getData from './utils/getData';

class App extends React.Component {
  constructor() {
    super();
    const counts = {};
    listTypes.forEach(type => {
      counts[type] = 0;
    })
    this.state = {
      counts
    };
  }

  componentDidMount() {
    const counts = {};
    Promise.all(listTypes.map(type => getData(type))).then(responses => {
      responses.forEach((response, index) => {
        counts[listTypes[index]] = response.filter(item => item.unread).length;
      });
      this.setState({
        counts
      });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className='mainContent'>
            <Navigation counts={this.state.counts} />
            <Switch>
              <Redirect exact from='/' to='/inbox' />
              <Route path={`/:listType(${listTypes.join('|')})`} component={List} />
              <Route path='*' component={() => (<div>
                Not Found
              </div>)} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;