import React from 'react';
import Todo from './Todo';
import { Container, Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import 'nes.css/css/nes.min.css';
import './App.css';
import DatePicker from 'react-datepicker'; // react-datepicker 임포트
import 'react-datepicker/dist/react-datepicker.css'; // react-datepicker CSS 임포트
import { call, signout } from './service/ApiService';
import DeleteDoneAll from './DeleteDoneAll';
import Clear from './Clear';
import WeatherWidget from './WeatherWidget';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      date: new Date(), // 날짜 상태 추가
    };
  }

  add = (item) => {
    item.date = this.state.date;
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  }

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  }

  clearAllDonelist = () => {
    const thisItems = this.state.items;
    thisItems.forEach((tdl) => {
      if (tdl.done === true) {
        call("/todo", "DELETE", tdl).then((response) =>
          this.setState({ items: response.data })
        );
      }
    });
  }

  clearAll = () => {
    const thisItems = this.state.items;
    thisItems.forEach((tdl) => {
      call("/todo", "DELETE", tdl).then((response) =>
        this.setState({ items: response.data })
      );
    });
  }

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  }

  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  }

  handleDateChange = (date) => {
    this.setState({ date });
  }

  render() {
    const { items, date } = this.state;
    
    // 선택한 날짜의 할일만 필터링
    const filteredItems = items.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.toDateString() === date.toDateString();
    });

    const todoItems = filteredItems.length > 0 ? (
      <div className="lists">
        <ul className="nes-list is-disc">
          {filteredItems.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </ul>
      </div>
    ) : (
      <p className="nes-text">선택한 날짜에 할일이 없습니다.</p>
    );

    const navigationBar = (
      <AppBar position="static" className="nes-container is-dark" style={{ height: 60 }}>
        <Toolbar style={{ minHeight: 50 }}>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant="h6" className="nes-text is-primary">Today quest</Typography>
            </Grid>
            <Grid item>
              <button className="nes-btn is-error" onClick={signout}>로그아웃</button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    const todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <WeatherWidget />
          <div className="nes-field" style={{ display: 'flex', alignItems: 'center' }}>
            <DatePicker
              selected={this.state.date}
              onChange={this.handleDateChange}
              dateFormat="yyyy/MM/dd"
              className="nes-input"
            />
            <input type="text" id="add_todo" className="nes-input nes-text" placeholder="새 할 일을 입력하세요..." style={{ flex: 1, marginLeft: '10px' }} />
            <button className="nes-btn is-primary" onClick={() => this.add({ title: document.getElementById('add_todo').value, done: false })} style={{ marginLeft: '10px' }}>추가</button>
          </div>
          <div className="TodoList">{todoItems}</div>
        </Container>
        <DeleteDoneAll clearAllDonelist={this.clearAllDonelist} />
        <Clear clearAll={this.clearAll} />
      </div>
    );

    const loadingPage = <h1>Loading...</h1>
    const content = this.state.loading ? loadingPage : todoListPage;

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
