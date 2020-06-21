import React from 'react';
import { withRouter } from 'react-router-dom';
import './navigation.css';
import { listTypes } from '../../constants/constants.js';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: props.location.pathname.replace('/', '')
    };
    this.changeType = this.changeType.bind(this);
  }

  changeType(type) {
    this.setState({
      selectedType: type
    }, () => {
      this.props.history.push(`/${type}`);
    });
  }

  render() {
    return (<div className='navigator'>
      <ul className='list-type'>
        {listTypes.map((type, i) => {
          const count = this.props.counts[type];
          return <li className={`${this.state.selectedType === type ? 'selected' : ''}`} onClick={() => this.changeType(type)} key={i}>
              {`${type[0].toUpperCase()}${type.substring(1)}`}
              {count ? <span className='list-count'>{count}</span> : null}
          </li>
        })}
      </ul>
    </div>);
  }
}

export default withRouter(Navigation);