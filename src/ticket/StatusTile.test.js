import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import StatusTile from './StatusTile';
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
it('renders with the correct text with backlog status', () => {
  act(() => {
    render(<StatusTile status="backlog" />, container);
  });

  expect(container.textContent).toBe('Backlog');
});
it('renders with the correct text with in development status', () => {
  act(() => {
    render(<StatusTile status="inDevelopment" />, container);
  });

  expect(container.textContent).toBe('In Development');
});
it('renders with the correct text with in progress status', () => {
  act(() => {
    render(<StatusTile status="inProgress" />, container);
  });

  expect(container.textContent).toBe('In Progress');
});
it('renders with the correct text with done status', () => {
  act(() => {
    render(<StatusTile status="done" />, container);
  });

  expect(container.textContent).toBe('Done');
});
