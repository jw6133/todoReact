import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class Clear extends React.Component {
    constructor(props) {
        super(props);
        this.delete = props.clearAll;
    }

    deleteEventHandler = () => {
        this.delete();
    }

    render() {
        return (
            <div>모두 지우기
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