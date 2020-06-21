import React from 'react';
import './list.css';
import getData from '../../utils/getData';
import setFlag from '../../utils/setFlag';
import Delete from '../../icons/Delete.jsx';
import Flagged from '../../icons/Flagged.jsx';
import UnFlagged from '../../icons/UnFlagged.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      listType: props.match.params.listType,
      showFlagged: false
    };
    this.getData = this.getData.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.toggleFlag = this.toggleFlag.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.toggleFlagged = this.toggleFlagged.bind(this);
  }

  getData() {
    getData(this.state.listType).then(data => this.setState({ data }));
  }

  selectItem(item) {
    this.props.onSelect(this.state.listType, item);
  }

  toggleFlag(item) {
    const data = this.state.data;
    const match = data.find(email => email.mId === item.mId);
    match.flagged = !match.flagged;
    this.setState({
      data
    });
    setFlag(this.state.listType, item.mId, item.flagged);
  }

  toggleFlagged() {
    this.setState({
      showFlagged: !this.state.showFlagged
    });
  }

  deleteMessage(item) {
    this.setState({
      data: this.state.data.filter(email => email.mId !== item.mId)
    }, () => this.props.onDelete(this.state.listType, item));
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.listType !== this.state.listType) {
      this.setState({
        listType: nextProps.match.params.listType
      }, () => {
        this.props.onSelect(this.state.listType, null);
        this.getData();
      });
    }
  }

  render() {
    const filteredData = this.state.data.filter(item => !this.state.showFlagged || (this.state.showFlagged && item.flagged));
    const containsFlagged = this.state.data.some(item => item.flagged);

    return (
      <div className='list-container'>
        <div className='list'>
          {containsFlagged ? <div className='filter-container'>
            <input type='checkbox' onChange={this.toggleFlagged} value={this.state.showFlagged} /> Display only flagged messages
          </div> : null}
          <ul>
            {filteredData.length ? filteredData.map(item => (<li className={`${item.unread ? '' : 'read'} ${this.props.selectedItem && item.mId === this.props.selectedItem.mId ? 'selected' : ''}`} key={item.mId}>
              <span className='icon' onClick={() => this.toggleFlag(item)}>
                {item.flagged ? <Flagged /> : <UnFlagged />}
              </span>
              <div onClick={() => this.selectItem(item)} className='list-item'>
                <div className='email-subject'>{item.subject}</div>
                <div className='list-content' dangerouslySetInnerHTML={{
                  __html: item.content
                }} />
              </div>
              <span className='icon' onClick={() => this.deleteMessage(item)}>
                <Delete />
              </span>
            </li>)) : <div className='no-messages'>No messages found</div>}
          </ul>
        </div>
        <div className='content'>
          {this.props.selectedItem && filteredData.some(item => item.mId === this.props.selectedItem.mId) ? <div className='email-container'>
            <div className='email-content-subject'>{this.props.selectedItem.subject}</div>
            <div className='email-content' dangerouslySetInnerHTML={{
              __html: this.props.selectedItem.content
            }}></div>
          </div> : <div className='no-content'>Please select a message to display it's content</div>}
        </div>
      </div>
    );
  }
}

export default List;