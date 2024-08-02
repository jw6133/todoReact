import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { googleAuth, signin } from './service/ApiService'; // googleAuth는 서버에 토큰을 전송하는 메서드
import './App.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoogleSuccess = this.handleGoogleSuccess.bind(this);
        this.handleGoogleFailure = this.handleGoogleFailure.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const password = data.get("password");

        // ApiService의 signin 메소드를 사용해 로그인
        signin({ email: email, password: password });
    }

    handleGoogleSuccess(response) {
        const token = response.credential;
        googleAuth(token)
            .then(res => {
                localStorage.setItem('ACCESS_TOKEN', res.token);
                window.location.href = '/';
            })
            .catch(error => {
                console.error("Google authentication failed:", error);
            });
    }

    handleGoogleFailure(error) {
        console.error("Google authentication failed:", error);
    }

    render() {
        return (
            <GoogleOAuthProvider clientId="139796939141-l9nb08r81e2cmgj51ml18fg5btf4tsn9.apps.googleusercontent.com">
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
                            <GoogleLogin
                                onSuccess={this.handleGoogleSuccess}
                                onFailure={this.handleGoogleFailure}
                                buttonText="Google로 로그인"
                            />
                        </div>
                        <div className="field">
                            <p className="has-text-centered">
                                <a href="/signup">계정이 없습니까? 여기서 가입하세요.</a>
                            </p>
                        </div>
                    </form>
                </div>
            </GoogleOAuthProvider>
        );
    }
}

export default Login;
