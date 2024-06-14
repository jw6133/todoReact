import React from 'react';
import { ListItem, ListItemText, InputBase, IconButton } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import 'nes.css/css/nes.min.css'; // NES.css import
import './App.css'; // Style file import

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item, readOnly: true };  // Initialize state with item and readOnly
        this.delete = props.delete;
        this.update = props.update;
    }

    deleteEventHandler = () => {
        this.delete(this.state.item);
    }

    offReadOnlyMode = () => {
        this.setState({ readOnly: false }, () => {
            console.log("ReadOnly?", this.state.readOnly);
        });
    }

    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.setState({ readOnly: true });
            this.update(this.state.item);
        }
    }

    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
    }

    checkboxEventHandler = () => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({ readOnly: true });
        this.update(this.state.item);
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <label className="checkbox">
                    <input
                        type="checkbox"
                        checked={item.done}
                        onChange={this.checkboxEventHandler}
                    />

                </label>
                <ListItemText>
                    <InputBase
                        inputProps={{ "aria-label": "naked", readOnly: this.state.readOnly }}
                        type="text"
                        id={item.id}
                        name={item.id}
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                        onClick={this.offReadOnlyMode}
                        onChange={this.editEventHandler}
                        onKeyPress={this.enterKeyEventHandler}
                        className={item.done ? "strikethrough" : ""}
                    />
                </ListItemText>
                <IconButton aria-label="Delete" onClick={this.deleteEventHandler}>
                    <DeleteOutlined />
                </IconButton>
            </ListItem>
        );
    }
}

export default Todo;
