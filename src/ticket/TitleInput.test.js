import { fireEvent, getByTestId } from '@testing-library/react';
import React, { useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import TitleInput from './TitleInput';
let container = null;

const TitleInputWrapper = () => {
  const [v, setv] = useState('initial value');
  const onChange = (e) => {
    console.log(e.target.value);
    setv(e.target.value);
  };
  return (
    <TitleInput
      value={v}
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
    render(<TitleInputWrapper />, container);
  });
  let x = getByTestId(container, 'title-input');
  expect(x.value).toBe('initial value');
  fireEvent.change(x, { target: { value: 'alex' } });
  expect(x.value).toBe('alex');
});
