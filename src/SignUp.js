import React from "react";
import { signup } from "./service/ApiService";
import './App.css'; // Importing the styles

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        signup({ email: email, username: username, password: password }).then(
            (response) => {
                window.location.href = "/login";
            }
        );
    }

    render() {
        return (
            <div className="container container-custom">
                <form noValidate onSubmit={this.handleSubmit} className="box">
                    <h1 className="title form-title">계정 생성</h1>
                    <div className="field">
                        <label className="label">사용자 이름</label>
                        <div className="control">
                            <input
                                className="input text-field-custom"
                                type="text"
                                name="username"
                                placeholder="사용자 이름"
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">이메일 주소</label>
                        <div className="control">
                            <input
                                className="input text-field-custom"
                                type="email"
                                name="email"
                                placeholder="이메일 주소"
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">패스워드</label>
                        <div className="control">
                            <input
                                className="input text-field-custom"
                                type="password"
                                name="password"
                                placeholder="패스워드"
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button className="button is-primary button-custom" type="submit">
                            계정 생성
                        </button>
                    </div>
                    <div className="field">
                        <p className="has-text-centered">
                            <a href="/login">이미 계정이 있습니까? 로그인하세요.</a>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;
