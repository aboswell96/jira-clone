import { fireEvent, getByTestId } from '@testing-library/react';
import React, { useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import TextInput from './TextInput';
let container = null;

const TextInputWrapper = () => {
  const [value, setValue] = useState('initial value');
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <TextInput
      value={value}
      onChange={onChange}
      height="35px"
      width="100%"
      fontSize="15px"
      mt="1px"
      placeholder={'Enter a description here...'}
    />
  );
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it('renders with the correct initial text and after onchange event', () => {
  act(() => {
    render(<TextInputWrapper />, container);
  });
  let x = getByTestId(container, 'text-input');
  expect(x.value).toBe('initial value');
  fireEvent.change(x, { target: { value: 'new value' } });
  expect(x.value).toBe('new value');
});
