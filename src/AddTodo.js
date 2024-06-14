import React from "react";
import { TextField, Paper, Button, Grid, Checkbox, FormControlLabel } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: { title: "", isMainTask: false, date: new Date() } // 메인 할 일 여부 및 날짜 추가
        };
        this.add = props.add; // props 의 함수를 this.add 에 연결, props에는 상위 컴포넌트(App.js)의 함수, 매개변수가 들어 있음.
    }

    onInputChange = (e) => {
        const thisItem = { ...this.state.item, title: e.target.value };
        console.log("Updated title:", thisItem.title); // 로그 추가
        this.setState({ item: thisItem });
    }

    onCheckboxChange = (e) => {
        const thisItem = { ...this.state.item, isMainTask: e.target.checked };
        console.log("Updated isMainTask:", thisItem.isMainTask); // 로그 추가
        this.setState({ item: thisItem });
    }

    onDateChange = (date) => {
        const thisItem = { ...this.state.item, date: date };
        console.log("Updated date:", thisItem.date); // 로그 추가
        this.setState({ item: thisItem });
    }

    onButtonClick = () => {
        console.log("Todo item being added:", this.state.item); // 로그 추가
        this.add(this.state.item);
        this.setState({ item: { title: "", isMainTask: false, date: new Date() } }); // text 값을 추가하고 입력 필드는 초기화시킨다.
    }

    enterKeyEventHandler = (e) => {
        if (e.key === 'Enter') {
            this.onButtonClick();
        }
    }

    render() {
        return (
            <Paper style={{ margin: 16, padding: 16 }}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={3} md={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Select Date"
                                value={this.state.item.date}
                                onChange={this.onDateChange}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField
                            placeholder="Add Todo here"
                            fullWidth
                            onChange={this.onInputChange}
                            value={this.state.item.title}
                            onKeyPress={this.enterKeyEventHandler}
                        />
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.item.isMainTask}
                                    onChange={this.onCheckboxChange}
                                    id="isMainTask"
                                    color="primary"
                                />
                            }
                            label="Main"
                        />
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="outlined"
                            onClick={this.onButtonClick}
                        >
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default AddTodo;
