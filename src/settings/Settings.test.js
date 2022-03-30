import { fireEvent, getByTestId } from '@testing-library/react';
import React, { useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Settings from './Settings';
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

it('shows the correct display strings', () => {
  act(() => {
    render(<Settings />, container);
  });
  let textContent = container.textContent;
  expect(textContent.includes('Project Details')).toBe(true);
  expect(textContent.includes('Project Name')).toBe(true);
  expect(textContent.includes('Project Description')).toBe(true);
  expect(textContent.includes('Save changes')).toBe(true);
});
