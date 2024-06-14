import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Container, Grid, AppBar, Toolbar, Typography, Paper, List, IconButton, TextField } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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

    // 메인 할 일 필터링
    const mainTasks = items.filter(item => item.isMainTask);

    const todoItems = filteredItems.length > 0 ? (
      <div className="lists">
        <List>
          {filteredItems.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </List>
      </div>
    ) : (
      <p>선택한 날짜에 할일이 없습니다.</p>
    );

    const navigationBar = (
      <AppBar position="static" style={{ height: 60 }}>
        <Toolbar style={{ minHeight: 50 }}>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant="h6">Today quest</Typography>
            </Grid>
            <Grid item>
              <IconButton color="inherit" onClick={signout}>로그아웃</IconButton>
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={this.state.date}
              onChange={this.handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
          <AddTodo add={this.add} />
          <div className="TodoList">
            {/* 메인 할 일을 항상 표시 */}
            <Paper style={{ margin: 16 }}>
              <List>
                {mainTasks.map((item, idx) => (
                  <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
                ))}
              </List>
            </Paper>
            {todoItems}
          </div>
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
