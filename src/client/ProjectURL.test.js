import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ProjectURL from './ProjectURL';
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
it('renders without a name', () => {
  act(() => {
    render(<ProjectURL />, container);
  });
  expect(container.textContent).toBe('Projects /  / ');
});
it('renders with a name', () => {
  act(() => {
    render(
      <ProjectURL projectName="TestProjectName" pageName="TestPageName" />,
      container
    );
  });
  expect(container.textContent).toBe(
    'Projects / TestProjectName / TestPageName'
  );
});
