import React from 'react';
import { TextField, Checkbox, FormControlLabel, Button, Grid, Paper } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: { title: "", isMainTask: false, date: new Date() }
        };
        this.add = props.add;
    }

    onInputChange = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
    }

    onCheckboxChange = (e) => {
        const thisItem = this.state.item;
        thisItem.isMainTask = e.target.checked;
        this.setState({ item: thisItem });
    }

    onDateChange = (date) => {
        const thisItem = this.state.item;
        thisItem.date = date;
        this.setState({ item: thisItem });
    }

    onButtonClick = () => {
        this.add(this.state.item);
        this.setState({ item: { title: "", isMainTask: false, date: new Date() } });
    }

    enterKeyEventHandler = (e) => {
        if (e.key === 'Enter') {
            this.onButtonClick();
        }
    }

    render() {
        return (
            <Paper className="p-4 my-4">
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
                                    name="isMainTask"
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
