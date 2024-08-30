import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { DatePicker, LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Pagination from '@mui/material/Pagination';
import { call, signout } from './service/ApiService';
import DeleteDoneAll from './DeleteDoneAll';
import Clear from './Clear';
import WeatherWidget from './WeatherWidget';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';


const colors = {
  baseColor: '#ADD285',    // 기준색
  lightBackground: '#E6F1DA', // 아주 엷은 색(배경용)
  navBar: '#8AA86A',       // 네비게이션 바 색상
  buttonColor: '#9BBD77',  // 버튼 색상
  cardBackground: '#D1E3B5', // 카드 배경색 (기준색을 약간 연하게)
};

// 네비게이션 바 스타일
const Navbar = styled.nav`
  background-color: ${colors.navBar};
  color: white;
  padding: 1rem;
  width: 100%;
  height:100px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  .navbar-brand h1 {
    color: white;
  }

  .navbar-item {
    color: white;
    &:hover {
      background-color: ${colors.baseColor};
    }
  }
`;

// 배경 스타일
const Container = styled.div`
  background-color: ${colors.lightBackground};
  padding: 2rem;
  margin-top: 4rem; /* 네비게이션 바와의 간격 확보 */
`;

// 카드 스타일
const Card = styled.div`
  background-color: ${colors.cardBackground};
  border-radius: 34px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

// 버튼 스타일
const StyledButton = styled(Button)`
  background-color: ${colors.buttonColor} !important;
  color: white !important;
  border-radius: 34px !important; /* 버튼에도 모서리 둥글게 적용 */
  &:hover {
    background-color: ${colors.navBar} !important;
  }
`;

// 할 일 목록 스타일
const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    background-color: ${colors.cardBackground};
    border-radius: 34px;
    padding: 0.75rem;
    margin-bottom: 0.75rem;
  }
`;

// 날씨 위젯 스타일
const WeatherContainer = styled.div`
  margin-top: 5.5rem; /* 네비게이션 바와의 간격 */
  display: flex;
  justify-content: center;
  width: 100%;
`;

const WeatherWidgetWrapper = styled.div`
  width: 100%;
  max-width: 1140px; /* container의 최대 넓이와 맞춤 */
  padding: 0 1rem;
`;

const newTheme = createTheme({
  components: {
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          color: '#1565c0',
          borderRadius: '2px',
          borderWidth: '1px',
          borderColor: '#2196f3',
          border: '1px solid',
          backgroundColor: '#90caf9',
        }
      }
    }
  }
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            date: new Date(),
            page: 1,
            itemsPerPage: 5,
            startDate: new Date(),
            endDate: new Date(),
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

    handlePageChange = (event, value) => {
        this.setState({ page: value });
    }

    handleStartDateChange = (startDate) => {
        this.setState({ startDate });
    }

    handleEndDateChange = (endDate) => {
        this.setState({ endDate });
    }

    exportTodos = () => {
        const { startDate, endDate } = this.state;
        const filePath = 'todos.txt';
        const start = startDate.toISOString().split('T')[0];
        const end = endDate.toISOString().split('T')[0];
        call(`/todo/export?startDate=${start}&endDate=${end}&filePath=${filePath}`, "POST", null)
            .then(() => console.log('Todos exported'))
            .catch(error => console.error('Error exporting todos:', error));
    }

    render() {
        const { items, date, page, itemsPerPage, startDate, endDate } = this.state;

        // 메인 할 일 필터링
        const mainTasks = items.filter(item => item.isMainTask);

        // 선택한 날짜의 할일만 필터링
        const filteredItems = items.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.toDateString() === date.toDateString();
        });

        // 페이지네이션을 위한 항목 분할
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

        const todoItems = paginatedItems.length > 0 ? (
            <TodoList>
                {paginatedItems.map((item) => (
                    <li key={item.id}>
                        <Todo item={item} delete={this.delete} update={this.update} />
                    </li>
                ))}
            </TodoList>
        ) : (
            <p>선택한 날짜에 할일이 없습니다.</p>
        );

        const navigationBar = (
            <Navbar>
                <div className="navbar-brand">
                    <a className="navbar-item" href="#">
                        <h1 className="title has-text-white">Today quest</h1>
                    </a>
                </div>
                <div className="navbar-end">
                    <button className="navbar-item has-text-white" onClick={signout}>로그아웃</button>
                </div>
            </Navbar>
        );

        const todoListPage = (
            <Container>
                {navigationBar}
                <WeatherContainer>
                    <WeatherWidgetWrapper>
                        <WeatherWidget />
                    </WeatherWidgetWrapper>
                </WeatherContainer>
                <div className="container mt-4">
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <ThemeProvider theme={newTheme}>
                                    <StaticDatePicker
                                        orientation="portrait"
                                        openTo="day"
                                        value={this.state.date}
                                        onChange={this.handleDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </ThemeProvider>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={9}>
                            <AddTodo add={this.add} />
                            <div className="TodoList">
                                <Card>
                                    <h2 className="title is-5">Main Tasks</h2>
                                    <ul>
                                        {mainTasks.map((item) => (
                                            <li key={item.id}>
                                                <Todo item={item} delete={this.delete} update={this.update} />
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                                <Card>
                                    <h2 className="title is-5">Tasks for {date.toDateString()}</h2>
                                    {todoItems}
                                    <Pagination
                                        count={Math.ceil(filteredItems.length / itemsPerPage)}
                                        page={page}
                                        onChange={this.handlePageChange}
                                        color="primary"
                                        className="pagination is-centered"
                                    />
                                </Card>
                            </div>
                            <div className="field is-grouped is-grouped-centered my-4">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Start Date"
                                        value={this.state.startDate}
                                        onChange={this.handleStartDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <DatePicker
                                        label="End Date"
                                        value={this.state.endDate}
                                        onChange={this.handleEndDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <StyledButton variant="contained" color="primary" onClick={this.exportTodos}>Export Todos</StyledButton>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <DeleteDoneAll clearAllDonelist={this.clearAllDonelist} />
                <Clear clearAll={this.clearAll} />
            </Container>
        );

        const loadingPage = <h1>Loading...</h1>;

        return (
            <div className="App">
                {this.state.loading ? loadingPage : todoListPage}
            </div>
        );
    }
}

export default App;
