import React from "react";
import { IconButton, Button } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import styled from "styled-components";

const StyledButton = styled(Button)`
    background-color: #9bbd77 !important;
    color: white !important;
    border-radius: 4px !important; // 모서리를 약간 둥글게
    padding: 8px 16px !important;
    margin-left : 20px;
    min-width: 180px !important;
    min-height:65px !important;
    &:hover {
        background-color: #8aa86a !important; // hover 시 버튼의 배경색
    }
`;

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
            <StyledButton
                aria-label="모두 지우기"
                onClick={this.deleteEventHandler}
                startIcon={<DeleteOutlined />}
            >
                모두 지우기
            </StyledButton>
        );
    }
}

export default Clear;