import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Pagination from '@mui/material/Pagination';
import { call, signout } from './service/ApiService';
import DeleteDoneAll from './DeleteDoneAll';
import Clear from './Clear';
import WeatherWidget from './WeatherWidget';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
                <ul>
                    {paginatedItems.map((item, idx) => (
                        <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
                    ))}
                </ul>
            </div>
        ) : (
            <p>선택한 날짜에 할일이 없습니다.</p>
        );

        const navigationBar = (
            <nav className="navbar is-primary">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <h1 className="title has-text-white">Today quest</h1>
                    </a>
                </div>
                <div className="navbar-end">
                    <a className="navbar-item has-text-white" onClick={signout}>로그아웃</a>
                </div>
            </nav>
        );

        const todoListPage = (
            <div>
                {navigationBar}
                <div className="container mt-4">
                    <WeatherWidget />
                    <div className="field is-grouped is-grouped-centered my-4">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Select Date"
                                value={this.state.date}
                                onChange={this.handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <AddTodo add={this.add} />
                    <div className="TodoList">
                        {/* 메인 할 일을 항상 표시 */}
                        <div className="box">
                            <h2 className="title is-5">Main Tasks</h2>
                            <ul>
                                {mainTasks.map((item, idx) => (
                                    <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
                                ))}
                            </ul>
                        </div>
                        <div className="box">
                            <h2 className="title is-5">Tasks for {date.toDateString()}</h2>
                            {todoItems}
                            <Pagination
                                count={Math.ceil(filteredItems.length / itemsPerPage)}
                                page={page}
                                onChange={this.handlePageChange}
                                color="primary"
                                className="pagination is-centered"
                            />
                        </div>
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
                        <Button variant="contained" color="primary" onClick={this.exportTodos}>Export Todos</Button>
                    </div>
                </div>
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
