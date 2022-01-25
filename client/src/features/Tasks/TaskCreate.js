import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProjects } from '../projects/projectsSlice';
import { addNewTask } from './tasksSlice';
import styled from 'styled-components';
import Button from '../../components/Button';
import { AiOutlineFundProjectionScreen, AiOutlineFlag } from 'react-icons/ai';

const TaskContent = styled.div`
  padding: ${(props) => (props.modal ? '16px 16px 0' : '10px')};
  border: ${(props) => (props.modal ? 'none' : '1px solid #ddd')};
  margin-top: ${(props) => (props.modal ? 'none' : '4px')};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.textarea`
  font-size: 14px;
  line-height: 21px;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui,
    helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;
  color: #808080;
  font-size: ${(props) => (props.primary ? '14px' : '13px')};
  font-weight: ${(props) => (props.primary ? '500' : '300')};
  height: ${(props) => (props.primary ? '25px' : '60px')};
  margin: ${(props) => (props.primary ? '0' : '4px 0')};

  &::placeholder {
    color: #aaa;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  ul {
    position: absolute;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
    list-style: none;
    top: 35px;
    width: 275px;
    border-radius: 5px;
  }
`;

const ActionButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  color: #555;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 4px 8px;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

const ProjectList = styled.ul`
  left: 0;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const PriorityList = styled.ul`
  right: 0;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const ListItem = styled.li`
  display: flex;
  grid-gap: 8px;
  align-items: center;
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    background: #ddd;
  }
`;

const FlagIcon = styled(AiOutlineFlag)`
  width: 20px;
  height: auto;
  color: ${(props) => props.color};
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 1fr;
  grid-gap: 10px;
  padding: 16px;
  border-top: ${(props) => (props.modal ? '1px solid #ddd' : 'none')};
`;

const TaskCreate = ({ isModal, hideModal, handleCancel, setCreateMessage }) => {
  const [isProjectVisible, setIsProjectVisible] = useState(false);
  const [isPriorityVisible, setIsPriorityVisible] = useState(false);

  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('Today');
  const [priority, setPriority] = useState('Priority 4');
  const [completed] = useState(false);
  const [user, setUser] = useState(null);
  const [user_id, setUserId] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      setUser(user);
      setUserId(user_id);
    }
  }, []);

  const handleProject = (event) => {
    setProject(event.target.innerText);
    setIsProjectVisible(false);
  };

  const handlePriority = (event) => {
    setPriority(event.target.innerText);
    setIsPriorityVisible(false);
  };

  const taskCreate = async (event) => {
    event.preventDefault();
    dispatch(
      addNewTask({
        title,
        description,
        project,
        priority,
        completed,
        user,
        user_id,
      })
    );
    setTitle('');
    setDescription('');
    setProject('Today');
    setPriority('Priority 4');
    hideModal && hideModal();
    setTimeout(() => {
      setCreateMessage(true);
    }, 500);
    setTimeout(() => {
      setCreateMessage(false);
    }, 3000);
  };

  return (
    <form onSubmit={taskCreate}>
      <TaskContent modal={isModal}>
        <Input
          required
          primary
          placeholder='e.g., Family lunch on Sunday at 11am'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Input
          required
          placeholder='Description'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Actions>
          <ActionButton
            onClick={() => {
              setIsPriorityVisible(false);
              setIsProjectVisible(!isProjectVisible);
            }}
            title='Select a project'
            type='button'
          >
            <AiOutlineFundProjectionScreen />
            {project}
          </ActionButton>
          {projects.length ? (
            <ProjectList visible={isProjectVisible}>
              {projects.map((project) => {
                return (
                  <ListItem key={project._id} onClick={handleProject}>
                    {project.name}
                  </ListItem>
                );
              })}
            </ProjectList>
          ) : null}
          <ActionButton
            onClick={() => {
              setIsProjectVisible(false);
              setIsPriorityVisible(!isPriorityVisible);
            }}
            title='Set the priority p1, p2, p3, p4'
            type='button'
          >
            <AiOutlineFlag />
            {priority}
          </ActionButton>
          <PriorityList visible={isPriorityVisible}>
            <ListItem onClick={handlePriority}>
              <FlagIcon color={'red'} />
              Priority 1
            </ListItem>
            <ListItem onClick={handlePriority}>
              <FlagIcon color={'orange'} />
              Priority 2
            </ListItem>
            <ListItem onClick={handlePriority}>
              <FlagIcon color={'blue'} />
              Priority 3
            </ListItem>
            <ListItem onClick={handlePriority}>
              <FlagIcon />
              Priority 4
            </ListItem>
          </PriorityList>
        </Actions>
      </TaskContent>
      <ButtonsWrapper>
        <Button type='submit' primary>
          Add task
        </Button>
        <Button clickHandler={handleCancel} type='button'>
          Cancel
        </Button>
      </ButtonsWrapper>
    </form>
  );
};

export default TaskCreate;
