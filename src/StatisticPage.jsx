import React from 'react';
import styled from 'styled-components';
import { call, signout } from './service/ApiService';
import NavigationBar from './components/NavigationBar';
// import { Line, Doughnut } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';

const colors = {
  baseColor: '#ADD285',
  lightBackground: '#E6F1DA',
  navBar: '#8AA86A',
  buttonColor: '#9BBD77',
  cardBackground: '#D1E3B5',
  textColor: '#228B22',
  boxBorderColor: 'black',
};

// 원형 차트 데이터
const doughnutData = {
  labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
  datasets: [
    {
      data: [300, 50, 100, 150],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    },
  ],
};

// 원형 차트 옵션
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

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
  justify-content: space-between;
  align-items: center;

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

const LogoutButton = styled.button`
  background-color: #6d8f4b;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  margin:0;
  &:hover {
    background-color: #5c7d3a;
  }
`;

const StatisticsPage = () => {

  return (
    <Container>
      <NavigationBar/>
      <div className="container mt-4">
        <ContentWrapper>
          <TaskSection>
            <Title>자주 설정한 Task</Title>
            <TaskTable>
              <tbody>
                <tr>
                  <td>1. 운동하기</td>
                </tr>
                <tr>
                  <td>2. 외출하기</td>
                </tr>
                <tr>
                  <td>3. 커밋하기</td>
                </tr>
                <tr>
                  <td>4. 백준 1문제 이상</td>
                </tr>
              </tbody>
            </TaskTable>

            {/* 두 번째 GraphContainer를 TaskSection 내에 배치 */}
            <GraphContainer className="graph-container">
              <h2>Task Distribution</h2>
              <img src='https://cdn.imweb.me/upload/S202105159ce8646407e94/003303865dd0c.jpg' alt="Task Distribution Chart"/>
            </GraphContainer>
          </TaskSection>

          <MainContent>
            <GreetingBox>
              <GreetingText>
                <span>안녕하세요,</span> <NameText>백지웅</NameText>님
              </GreetingText>
              <HabitText>현재 <Highlight>n</Highlight>일째 습관 진행중!</HabitText>
            </GreetingBox>

            <GraphContainer>
              <h2>달성률 추이 (chart.js 시도중)</h2>
              <img src='https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/9lsS/image/m-w8FpKXmi2HqvWdeyIwJzTOVF8' alt="Achievement Trend Chart"/>
            </GraphContainer>
          </MainContent>
        </ContentWrapper>
      </div>
    </Container>
  );
};

export default StatisticsPage;

const Container = styled.div`
  background-color: ${colors.lightBackground};
  padding-top: 120px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 2rem;
`;

const TaskSection = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;

  .graph-container {
    margin-top: auto;
    width: 100%;
    height: 370px;
  }
`;


const Title = styled.h2`
  color: ${colors.textColor};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const TaskTable = styled.table`
  width: 100%;
  background-color: white; 
  border-collapse: collapse;
  border-radius: 12px; 
  overflow: hidden; 
  border: 1px solid ${colors.boxBorderColor};

  td {
    border: 1px solid ${colors.boxBorderColor};
    padding: 10px;
    font-size: 1.2rem;
    color: ${colors.textColor};
    text-align: left;
  }
`;

const MainContent = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
`;

const GreetingBox = styled.div`
  background-color: ${colors.cardBackground};
  border-radius: 34px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  width: 100%;
`;

const GreetingText = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const NameText = styled.span`
  color: ${colors.textColor};
`;

const HabitText = styled.div`
  font-size: 2rem;
`;

const Highlight = styled.span`
  color: red;
`;

const GraphContainer = styled.div`
  background-color: ${colors.cardBackground};
  border-radius: 34px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  width: 100%;
  height: 100%; 
  text-align: center;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }
`;
