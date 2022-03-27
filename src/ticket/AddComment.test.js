import { fireEvent, getByTestId } from '@testing-library/react';
import React, { useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import AddComment from './AddComment';
let container = null;

const AddCommentWrapper = () => {
  const [value, setValue] = useState('initial value');

  return (
    <AddComment
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
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

it('shows the correct input value', () => {
  act(() => {
    render(<AddCommentWrapper />, container);
  });
  let x = getByTestId(container, 'add-comment');
  expect(x.value).toBe('initial value');
  fireEvent.change(x, { target: { value: 'new value' } });
  expect(x.value).toBe('new value');
});
