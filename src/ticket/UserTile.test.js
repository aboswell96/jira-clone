import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import UserTile from './UserTile';

let container = null;
let users = {
  64980: {
    firstName: 'Joey',
    lastName: 'Tribbiani',
    photo: 'https://i.ibb.co/vhJVFpQ/joey-tribbiani-3.jpg',
  },
  71653: {
    firstName: 'Ross',
    lastName: 'Geller',
    photo: 'https://i.ibb.co/gts0j76/ross-geller-2.jpg',
  },
  86862: {
    firstName: 'Monica',
    lastName: 'Geller',
    photo: 'https://i.ibb.co/b636CY2/monica-geller-2.jpg',
  },
};
const Unassigned = [
  '-1',
  { firstName: 'Unassigned', lastName: '', photo: 'https://ibb.co/M9PdhH9' },
];
let testUser = Object.entries(users)[0];

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it('renders with display text and profile photo', () => {
  act(() => {
    render(
      <UserTile
        user={testUser}
        users={Object.entries(users).concat([Unassigned])}
        field="assignee"
      />,
      container
    );
  });

  let photo = document.querySelector('[data-testid=user-photo]');
  let imgSrc = window.getComputedStyle(photo).backgroundImage;
  expect(container.textContent).toBe('Joey Tribbiani');
  expect(imgSrc).toBe('url(https://i.ibb.co/vhJVFpQ/joey-tribbiani-3.jpg)');
});
// it('displays the other users when clicked on', () => {
//   act(() => {
//     render(
//       <UserTile
//         user={testUser}
//         users={Object.entries(users).concat([Unassigned])}
//         field="assignee"
//       />,
//       container
//     );
//     //const userTile = document.querySelector('[data-testid=user-tile]');
//     //userTile.dispatchEvent(new MouseEvent('click', { bubbles: true }));
//     fireEvent(
//       getByText(container, 'Joey Tribbiani'),
//       new MouseEvent('click', {
//         bubbles: true,
//         cancelable: true,
//       })
//     );
//     expect(container.textContent).toBe('d');
//   });
// });
