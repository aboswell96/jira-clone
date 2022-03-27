import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import IssueTypeTile from './IssueTypeTile';
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
it('renders with the correct text with story type', () => {
  act(() => {
    render(<IssueTypeTile issueType="story" />, container);
  });
  expect(container.textContent).toBe('Story');
});
it('renders with the correct text with in Task type', () => {
  act(() => {
    render(<IssueTypeTile issueType="task" />, container);
  });
  expect(container.textContent).toBe('Task');
});
it('renders with the correct text with in bug type', () => {
  act(() => {
    render(<IssueTypeTile issueType="bug" />, container);
  });
  expect(container.textContent).toBe('Bug');
});
