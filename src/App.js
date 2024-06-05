import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import './App.css';
import { call, signout } from './service/ApiService';
import DeleteDoneAll from './DeleteDoneAll';
import Clear from './Clear';
import WeatherWidget from './WeatherWidget.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
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

  render() {
    const todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );

    const navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={signout}>logout</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    const todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <WeatherWidget /> {/* Add the weather widget component here */}
          <AddTodo add={this.add} />
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
