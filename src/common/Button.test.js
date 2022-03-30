import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Button from './Button';
let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it('renders with display text', () => {
  act(() => {
    render(<Button text="TestText" />, container);
  });
  expect(container.textContent).toBe('TestText');
});
it('successfully runs onClick', () => {
  let x = 0;
  const onClick = () => {
    x = x + 1;
  };
  act(() => {
    render(<Button onClick={onClick} />, container);
    const button = document.querySelector('[data-testid=button]');
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(x).toBe(1);
});
