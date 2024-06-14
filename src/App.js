import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Container, Grid, AppBar, Toolbar, Typography, Paper, List, IconButton, TextField, Button } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Pagination from '@mui/material/Pagination';
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
            <div className="lists">
                <List>
                    {paginatedItems.map((item, idx) => (
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
                            <Typography variant="h6" style={{ margin: 16 }}>Main Tasks</Typography>
                            <List>
                                {mainTasks.map((item, idx) => (
                                    <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
                                ))}
                            </List>
                        </Paper>
                        <Paper style={{ margin: 16 }}>
                            <Typography variant="h6" style={{ margin: 16 }}>Tasks for {date.toDateString()}</Typography>
                            {todoItems}
                            <Pagination
                                count={Math.ceil(filteredItems.length / itemsPerPage)}
                                page={page}
                                onChange={this.handlePageChange}
                                color="primary"
                                style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}
                            />
                        </Paper>
                    </div>
                </Container>
                <DeleteDoneAll clearAllDonelist={this.clearAllDonelist} />
                <Clear clearAll={this.clearAll} />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Start Date"
                        value={this.state.startDate}
                        onChange={this.handleStartDateChange}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                    <DatePicker
                        label="End Date"
                        value={this.state.endDate}
                        onChange={this.handleEndDateChange}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </LocalizationProvider>
                <Button onClick={this.exportTodos}>Export Todos</Button>
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
