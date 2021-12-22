import {useState} from 'react';


//Returns value and the onChange function that can be used with a TextInput component
export const useTextInput = (initialValue) => {

    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
        setValue(event.target.value);
    }

    return [value,onChange];
} 