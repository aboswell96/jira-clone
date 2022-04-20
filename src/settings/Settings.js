import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectURL from '../common/ProjectURL';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import { readFromDB } from '../firebase/firebase';
import { ThemeContext } from '../nav/Project';

const Container = styled.div`
  margin-left: 40px;
  margin-top: 30px;
`;

const Title = styled.div`
  white-space: nowrap;
  margin-top: 10px;
  font-size: 24px;
  font-family: CircularStdMedium;
  color: ${(props) => (props.darkTheme ? 'white' : 'black')};
`;

const Text = styled.div`
  white-space: nowrap;
  font-family: CircularStdBook;
  color: rgb(94, 108, 132);
  margin-top: ${(props) => props.marginTop};
`;

const Settings = (props) => {
  const darkTheme = useContext(ThemeContext);
  useEffect(() => {
    readFromDB('projectDescription', setDescription);
    readFromDB('title', setValue);
  }, []);

  const [name, setValue] = useState('');
  const [description, setDescription] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Container>
      <ProjectURL projectName={props.projectName} pageName="Project Details" />
      <Title darkTheme={darkTheme}>Project Details</Title>
      <Text marginTop="30px">Project Name</Text>
      <TextInput
        value={name}
        onChange={onChange}
        width="40%"
        minWidth="375px"
        height="30px"
        pt="1px"
        mt="10px"
        darkTheme={darkTheme}
      />
      <Text marginTop="30px">Project Description</Text>
      <TextInput
        value={description}
        onChange={onDescriptionChange}
        width="40%"
        minWidth="375px"
        height="30px"
        pt="1px"
        mt="10px"
        darkTheme={darkTheme}
      />
      <br />
      <Button
        text="Save changes"
        bgColor="#0052cc"
        color="white"
        marginTop="30px"
        onClick={() => props.onClick(name, description)}
        hoverColor="#005eeb"
      />
    </Container>
  );
};

export default Settings;
