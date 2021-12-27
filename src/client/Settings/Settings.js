import React from 'react';
import styled from 'styled-components';
import ProjectURL from '../ProjectURL';
import TextInput from '../utils/TextInput';
import Button from '../utils/Button';

import {useTextInput} from '../utils/helpers';

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

    const [name,onChange] = useTextInput(props.projectName);

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
            />
        </TextInputWrapper>
        <Button
            text="Save changes"
            marginTop="30px"
            onClick={()=>props.onClick(name)}
        />
        </Container>
    );
}

export default Settings;