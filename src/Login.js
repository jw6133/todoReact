import React from "react";
import { signin } from "./service/ApiService";
import './App.css'; // Importing the styles

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const password = data.get("password");

        // ApiService의 signin 메소드를 사용해 로그인
        signin({ email: email, password: password });
    }

    render() {
        return (
            <div className="container container-custom">
                <form noValidate onSubmit={this.handleSubmit} className="box">
                    <h1 className="title form-title">로그인</h1>
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
                            로그인
                        </button>
                    </div>
                    <div className="field">
                        <p className="has-text-centered">
                            <a href="/signup">계정이 없습니까? 여기서 가입하세요.</a>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
