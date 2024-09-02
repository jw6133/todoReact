import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { signout } from '../service/ApiService';

const colors = {
    baseColor: '#ADD285',    // 기준색
    lightBackground: '#E6F1DA', // 아주 엷은 색(배경용)
    navBar: '#8AA86A',       // 네비게이션 바 색상
    buttonColor: '#9BBD77',  // 버튼 색상
    cardBackground: '#D1E3B5', // 카드 배경색 (기준색을 약간 연하게)
    textColor : '#2E3823'
  };

function NavigationBar() {
    const navigate= useNavigate();
        const goToStat = () => {
            navigate('/stat');
        }
        const goToHome=()=>{
            navigate('/');
        }

    return (
        <>
            <Navbar>
                <div className="navbar-brand">
                    <a className="navbar-item" href="#">
                        <h1 className="title has-text-white" onClick={goToHome}>Today quest</h1>
                    </a>
                </div>
                <div className="navbar-end">
                    <NavButton onClick={goToStat}>통계</NavButton>
                    <NavButton onClick={signout}>로그아웃</NavButton>
                </div>
            </Navbar>
        </>
    )
}

export default NavigationBar

const Navbar = styled.nav`
  background-color: ${colors.navBar};
  color: white;
  padding: 1rem;
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between; /* 수평으로 공간 분배 */
  align-items: center; /* 수직 중앙 정렬 */

  .navbar-brand h1 {
    color: white;
  }

  .navbar-item {
    color: white;
    &:hover {
      background-color: ${colors.baseColor};
    }
  }
`;

const NavButton = styled.button`
  background-color: #6d8f4b;  /* 네비게이션 바보다 조금 더 짙은 색상 */
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;  /* 버튼의 모서리를 약간 둥글게 */
  width:100%;
  margin:0;
  margin-right:6%;
  min-width: 100px !important;
  min-height:65px !important;
  &:hover {
    background-color: #5c7d3a;  /* hover 시 더 짙은 배경색 */
  }

`;

export const SButton = styled(Button)`
  background-color: ${colors.buttonColor} !important;
  color: white !important;
  width:200px;
`;