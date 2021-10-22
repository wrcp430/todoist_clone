import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import CreateTask from '../components/CreateTask';
import Header from '../components/Header';
import {
  ListBox,
  DateHeader,
  DateToday,
  TasksList,
  Task,
  TaskButton,
  TaskButtonOuter,
  TaskButtonInner,
  TaskContent,
  TaskActions,
  TaskTitle,
  TaskDescription,
  TaskProject,
  Wrapper,
  Message,
  StyledAside,
  AsideTitle,
  ProjectsList,
  ListItem,
  Project,
} from '../components/styles/Home.styled';

const Home = () => {
  const [data, setData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAsideVisible, setIsAsideVisible] = useState(true);
  const [createMessage, setCreateMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [project, setProject] = useState('Today');

  useEffect(() => {
    fetchTasks();
  }, []);

  const user = localStorage.getItem('user');
  const user_id = localStorage.getItem('user_id');

  let history = useHistory();

  if (!user) {
    history.push('/user/login');
  }

  const fetchTasks = async (filter) => {
    try {
      const url = filter
        ? `${process.env.REACT_APP_API_URL}/tasks/${filter}`
        : `${process.env.REACT_APP_API_URL}`;
      const { data } = await axios.get(url, { headers: { user, user_id } });

      if (data) {
        console.log(data);
        setData(data);
      }
    } catch (error) {
      history.push('/user/login');
    }
  };

  const filterHandler = (query) => {
    if (query) {
      fetchTasks(query);
      setProject(query);
    } else {
      fetchTasks();
      setProject('All tasks');
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    history.push('/user/login');
  };

  const deleteTask = async (e) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/task/${e.currentTarget.parentNode.dataset.id}`,
      { headers: { user, user_id } }
    );
    createMessage && setCreateMessage(false);
    setDeleteMessage(true);
    setTimeout(() => {
      setDeleteMessage(false);
    }, 3000);
    filterHandler();
  };

  return (
    <>
      <Header
        showModal={toggleModal}
        logoutHandler={logoutHandler}
        isAsideVisible={isAsideVisible}
        toggleAside={toggleAside}
        fetchTasks={fetchTasks}
      />
      <Wrapper>
        <StyledAside isAsideVisible={isAsideVisible}>
          <AsideTitle
            title='Select all tasks'
            onClick={() => {
              filterHandler();
            }}
          >
            Projects
          </AsideTitle>
          <ProjectsList>
            <ListItem>
              <Project
                onClick={() => {
                  filterHandler('Inbox');
                }}
              >
                Inbox
              </Project>
            </ListItem>
            <ListItem>
              <Project
                onClick={() => {
                  filterHandler('Work');
                }}
              >
                Work
              </Project>
            </ListItem>
            <ListItem>
              <Project
                onClick={() => {
                  filterHandler('Study');
                }}
              >
                Study
              </Project>
            </ListItem>
            <ListItem>
              <Project
                onClick={() => {
                  filterHandler('Free time');
                }}
              >
                Free time
              </Project>
            </ListItem>
          </ProjectsList>
        </StyledAside>
        <ListBox>
          <DateHeader>
            {project} <DateToday>{new Date().toDateString()}</DateToday>
          </DateHeader>
          <TasksList>
            {data && data.length
              ? data.map((task) => {
                  return (
                    <Task data-id={task._id} key={task._id}>
                      <TaskButton>
                        <TaskButtonOuter
                          onClick={() => {
                            console.log('clik');
                          }}
                          completed={task.completed}
                          color={
                            (task.priority === 'Priority 1' && '255,0,0') ||
                            (task.priority === 'Priority 2' && '0,0,255') ||
                            (task.priority === 'Priority 3' && '255,165,0') ||
                            (task.priority === 'Priority 4' && '128,128,128')
                          }
                        >
                          <TaskButtonInner />
                        </TaskButtonOuter>
                      </TaskButton>
                      <TaskContent>
                        <TaskTitle>{task.title}</TaskTitle>
                        <TaskDescription>{task.description}</TaskDescription>
                        <Wrapper>
                          <div></div>
                          <TaskProject>{task.project}</TaskProject>
                        </Wrapper>
                      </TaskContent>
                      <TaskActions title='Delete' onClick={deleteTask}>
                        <AiOutlineDelete />
                      </TaskActions>
                    </Task>
                  );
                })
              : "You're all done for the week! #TodoistZero "}
          </TasksList>
        </ListBox>
      </Wrapper>
      {isModalVisible ? (
        <CreateTask
          fetchTasks={fetchTasks}
          hideModal={toggleModal}
          setCreateMessage={setCreateMessage}
        />
      ) : null}
      {createMessage ? (
        <Message>
          Task successfully created for {new Date().toLocaleDateString()}{' '}
        </Message>
      ) : null}
      {deleteMessage ? <Message>Task successfully deleted</Message> : null}
    </>
  );
};

export default Home;
