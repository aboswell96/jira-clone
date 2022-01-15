import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import ProjectURL from '../ProjectURL';
import TextInput from './TextInput';
import Button from './Button';
import { readFromDB } from '../../firebase/firebase';

const Container = styled.div`
    margin-left: 40px;
    margin-top: 30px;
`

const Title = styled.div`
    white-space: nowrap;
    margin-top: 15px;
    font-size: 24px;
    font-family: CircularStdMedium;
`

const TextInputWrapper = styled.div`
    margin-top: 10px;
`

const Text = styled.div`
    white-space: nowrap;
    font-family: CircularStdBook;
    color: rgb(94, 108, 132);
    margin-top: ${props => props.marginTop};
`

const Settings = (props) => {

    useEffect(() => {
        readFromDB('projectDescription', setDescription);
        readFromDB('title',setValue);
    },[])

    const [name,setValue] = useState("");
    const [description, setDescription] = useState("");

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    return(
        <Container>
            <ProjectURL
                projectName={props.projectName}
                pageName="Project Details"
            />
        <Title>
            Project Details
        </Title>
        <Text marginTop='50px'>Project Name
        </Text>
        <TextInputWrapper>
            <TextInput
                value={name}
                onChange={onChange}
                width="640px"
                height="30px"
                pt="1px"
            />
        </TextInputWrapper>
        <Text marginTop='15px'>Project Description
        </Text>
        <TextInputWrapper>
            <TextInput
                value={description}
                onChange={onDescriptionChange}
                width="640px"
                height="30px"
                pt="1px"
            />
        </TextInputWrapper>
        <Button
            text="Save changes"
            bgColor="#0052cc"
            color="white"
            marginTop="30px"
            onClick={()=>props.onClick(name, description)}
            hoverColor="#005eeb"
        />
        </Container>
    );
}

export default Settings;