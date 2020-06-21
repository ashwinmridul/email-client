import React from 'react';
import {Redirect, Switch, Route, BrowserRouter} from 'react-router-dom';
import './app.css';
import Header from './components/header/Header.jsx';
import Navigation from './components/navigation/Navigation.jsx';
import List from './components/list/List.jsx';
import { listTypes } from './constants/constants.js';
import getData from './utils/getData';
import setUnread from './utils/setUnread';
import deleteMessage from './utils/deleteMessage';

class App extends React.Component {
  constructor() {
    super();
    const counts = {};
    listTypes.forEach(type => {
      counts[type] = 0;
    })
    this.state = {
      counts,
      selectedItem: null
    };
    this.onRead = this.onRead.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onDelete = this.onDelete.bind(this);
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

  onSelect(listType, item) {
    const isUnread = item && item.unread;
    if (item) {
      item.unread = false;
    }
    this.setState({ selectedItem: item }, () => isUnread && this.onRead(listType, item.mId));
  }

  onDelete(listType, item) {
    let { counts, selectedItem } = this.state;

    if (item.unread) {
      counts[listType]--;
      counts['deleted']++;
    }
    if (item.mId === selectedItem.mId) {
      selectedItem = null;
    }

    this.setState({
      counts,
      selectedItem
    });

    deleteMessage(listType, item.mId);
  }

  onRead(listType, mId) {
    setUnread(listType, mId).then(() => {
      const counts = this.state.counts;
      counts[listType]--;
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
              {listTypes.length ? <Redirect exact from='/' to={`/${listTypes[0]}`} /> : null}
              <Route path={`/:listType(${listTypes.join('|')})`} component={(props) => <List onSelect={this.onSelect} onDelete={this.onDelete} selectedItem={this.state.selectedItem} {...props} />} />
              <Route path='*' component={() => (<div className='page-not-found'>
                Oops! The page you are trying to access does not exist
              </div>)} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;