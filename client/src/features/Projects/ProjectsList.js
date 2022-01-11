import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, selectProjects } from './projectsSlice';
import {
  ListItem,
  ProjectContent,
  Project,
  ProjectColor,
  ProjectDots,
} from '../../components/styles/Home.styled';
import { AiOutlineEllipsis } from 'react-icons/ai';
import styled from 'styled-components';

const Message = styled.li`
  list-style: none;
  font-size: 13px;
  color: #808080;
  padding: 4px 0 4px 16px;
`;

const ProjectsList = ({ filterHandler }) => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const projectsStatus = useSelector((state) => state.projects.status);

  const user = localStorage.getItem('user');
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    if (projectsStatus === 'idle') {
      dispatch(fetchProjects({ user, user_id }));
    }
  }, [dispatch, projects, user, user_id, projectsStatus]);

  return (
    <ul>
      {projects.length ? (
        projects.map((project) => {
          return (
            <ListItem
              onClick={() => {
                filterHandler(project.name);
              }}
              key={project._id}
            >
              <ProjectColor color={project.color} />
              <ProjectContent>
                <Project>{project.name}</Project>
                <ProjectDots>
                  <AiOutlineEllipsis
                    style={{ width: '100%', height: '100%' }}
                  />
                </ProjectDots>
              </ProjectContent>
            </ListItem>
          );
        })
      ) : (
        <Message>Your list of projects will show up here.</Message>
      )}
    </ul>
  );
};

export default ProjectsList;