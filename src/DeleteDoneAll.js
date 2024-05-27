import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class DeleteDoneAll extends React.Component {
    constructor(props) {
        super(props);
        this.delete = props.clearAllDonelist;
    }

    deleteEventHandler = () => {
        console.log("지운다. 완료한 일.");
        this.delete();
    }

    render() {
        return (
            <div>달성지우개
                <IconButton
                    aria-label="달성한 일을 지우세요!"
                    onClick={this.deleteEventHandler}
                >
                    <DeleteOutlined />
                </IconButton>
            </div>
        );
    }
}
export default DeleteDoneAll;