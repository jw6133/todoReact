import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class Clear extends React.Component {
    constructor(props) {
        super(props);
        this.delete = props.clearAll;
    }

    deleteEventHandler = () => {
        console.log("지운다. 모두.");
        this.delete();
    }

    render() {
        return (
            <div>다 사라져
                <IconButton
                    aria-label="일 안 해!"
                    onClick={this.deleteEventHandler}
                >
                    <DeleteOutlined />
                </IconButton>
            </div>
        );
    }
}
export default Clear;