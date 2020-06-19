import React from 'react';
import './list.css';
import getData from '../../utils/getData';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      listType: props.match.params.listType,
      selectedItem: null
    };
    this.getData = this.getData.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  getData() {
    getData(this.state.listType).then(data => this.setState({ data }));
  }

  selectItem(item) {
    this.setState({
      selectedItem: item
    });
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.listType !== this.state.listType) {
      this.setState({
        listType: nextProps.match.params.listType,
        selectedItem: null
      }, this.getData);
    }
  }

  render() {
    return (
      <div className='list-container'>
        <div className='list'>
          <ul>
            {this.state.data.map(item => (<li key={item.mId} onClick={() => this.selectItem(item)}>
              <div>{item.subject}</div>
              <div className='list-content' dangerouslySetInnerHTML={{
                __html: item.content
              }} />
            </li>))}
          </ul>
        </div>
        <div className='content'>
          {this.state.selectedItem && <div dangerouslySetInnerHTML={{
            __html: this.state.selectedItem.content
          }}></div>}
        </div>
      </div>
    );
  }
}

export default List;