import React,{useState} from 'react';
import styled from 'styled-components';
import ProjectURL from '../ProjectURL';
import TextInput from './TextInput';
import Button from './Button';

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

    const [name,setValue] = useState(props.projectName);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    return(
        <Container>
            <ProjectURL
                projectName={props.projectName}
            />
        <Title>
            Project Details
        </Title>
        <Text marginTop='50px'>Name
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
        <Button
            text="Save changes"
            bgColor="#0052cc"
            color="white"
            marginTop="30px"
            onClick={()=>props.onClick(name)}
            hoverColor="#005eeb"
        />
        </Container>
    );
}

export default Settings;