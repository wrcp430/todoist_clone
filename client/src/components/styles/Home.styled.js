import styled from 'styled-components';
import { Link } from 'react-router-dom';

const colors = {
  'Priority 1': '209, 69, 59',
  'Priority 2': '235, 137, 9',
  'Priority 3': '36, 111, 224',
  'Priority 4': '128,128,128',
};

export const ListBox = styled.div`
  flex-grow: 1;
  padding: 16px 45px 0;
`;

export const DateHeader = styled.h1`
  font-size: 20px;
  margin-bottom: 24px;
  padding-left: 14px;
`;

export const DateToday = styled.span`
  color: #808080;
  font-size: 12px;
  font-weight: 400;
`;

export const TasksList = styled.ul`
  list-style: none;
`;

export const Task = styled.li`
  display: flex;
  padding: 10px 10px;
  border-bottom: 1px solid #f0f0f0;
  gap: 6px;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
    border-radius: 5px;
    box-shadow: inset 0 0 0 1px rgb(31 96 194 / 40%);
  }
`;

export const ButtonWrapper = styled.div`
  min-width: 26px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  display: ${(props) => (props.isEditingMode ? `none` : 'flex')};
`;

export const TaskButton = styled.button`
  min-width: 18px;
  height: 18px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const TaskButtonOuter = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgb(${(props) => colors[props.color]});
  background: ${(props) =>
    props.completed
      ? `rgb(${colors[props.color]})`
      : `rgba(${colors[props.color]}, 0.1)`};

  &:hover {
    background: ${(props) =>
      props.completed
        ? `rgb(${colors[props.color]})`
        : `rgba(${colors[props.color]}, 0.2)`};

    & > * {
      display: flex;
    }
  }
`;

export const TaskButtonInner = styled.span`
  display: ${(props) => (props.completed ? 'flex' : 'none')};
  color: ${(props) =>
    props.completed ? '#fff' : `rgb(${colors[props.color]})`};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const TaskContent = styled.div`
  flex-grow: 1;
`;

export const TaskLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

export const TaskTitle = styled.p`
  color: #202020;
  margin: 0;
  font-size: 14px;
  line-height: 16px;
  word-wrap: break-word;
  word-break: break-word;
`;
export const TaskDescription = styled.p`
  margin: 0;
  font-size: 12px;
  word-wrap: break-word;
  word-break: break-all;
  color: #808080;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TaskProject = styled.a`
  font-size: 12px;
  color: grey;
`;

export const TaskActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 40px;
  cursor: pointer;
`;

export const Message = styled.div`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const StyledAside = styled.div`
  height: calc(100vh - 44px);
  width: ${(props) => (props.isAsideVisible ? '300px' : '0')};
  min-width: ${(props) => (props.isAsideVisible ? '300px' : '0')};
  background: #fafafa;
  padding: ${(props) =>
    props.isAsideVisible ? '30px 0 0 35px' : '30px 0 0 0 '};
  transform: ${(props) =>
    props.isAsideVisible ? 'translate(0)' : 'translate(-305px)'};
  transition: all 0.3s ease-in-out;
  z-index: 2;

  @media (max-width: 767px) {
    position: absolute;
    box-shadow: ${(props) =>
      props.isAsideVisible ? ' 0 2px 10px rgb(0 0 0 / 30%)' : 'none'};
  }
`;

export const Overlay = styled.div`
  @media (max-width: 767px) {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: ${(props) => (props.isAsideVisible ? '1' : '0')};
    visibility: ${(props) => (props.isAsideVisible ? 'visible' : 'hidden')};
  }
`;

export const AsideTitle = styled.button`
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: #333;
  font-weight: 700;
  padding: 10px 0;
  cursor: pointer;
`;

export const ProjectsList = styled.ul`
  list-style: none;
`;

export const ListItem = styled.li``;

export const Project = styled.button`
  display: inline-block;
  width: 100%;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  line-height: normal;
  height: 35px;
  line-height: 35px;
  padding: 0;
  padding-left: 20px;
  cursor: pointer;
  background: transparent;
  text-align: left;

  &:hover {
    background: #eee;
  }
`;
