import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            // JWT 토큰을 로컬 스토리지에 저장
            localStorage.setItem('jwtToken', token);
            // 이후 사용자를 홈이나 다른 보호된 페이지로 리다이렉트
            navigate('/');
        } else {
            // 토큰이 없을 경우 로그인 페이지로 리다이렉트
            navigate('/login');
        }
    }, [location, navigate]);

    return (
        <div>
            <h1>로그인 성공</h1>
            <p>잠시만 기다려 주세요...</p>
        </div>
    );
};

export default LoginSuccess;
