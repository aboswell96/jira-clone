import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import PriorityTile from './PriorityTile';
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
it('renders with the correct text with low priority', () => {
  act(() => {
    render(<PriorityTile priority="low" />, container);
  });

  expect(container.textContent).toBe('Lowest');
});
it('renders with the correct text with medium priority', () => {
  act(() => {
    render(<PriorityTile priority="high" />, container);
  });

  expect(container.textContent).toBe('Medium');
});
it('renders with the correct text with sev1 priority', () => {
  act(() => {
    render(<PriorityTile priority="sev1" />, container);
  });

  expect(container.textContent).toBe('Higher');
});
it('renders with the correct text with sev2 priority', () => {
  act(() => {
    render(<PriorityTile priority="sev2" />, container);
  });

  expect(container.textContent).toBe('Highest');
});
