import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  query,
  push,
  update,
  onValue,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAzsxJkZBNIVjO5ps1EAiFu09VrDo3L7hY',
  authDomain: 'jira-clone-94734.firebaseapp.com',
  databaseURL: 'https://jira-clone-94734-default-rtdb.firebaseio.com',
  projectId: 'jira-clone-94734',
  storageBucket: 'jira-clone-94734.appspot.com',
  messagingSenderId: '213738596941',
  appId: '1:213738596941:web:cae43115eef773e95c0a04',
  measurementId: 'G-S5TBDSJ5P8',
};

initializeApp(firebaseConfig);

export const readFromDB = (path, f) => {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(JSON.stringify(snapshot.val()));
        f(snapshot.val());
        return snapshot.val();
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const writeToDB = (path, data, cb) => {
  const db = getDatabase();

  if (cb) {
    set(ref(db, path), data).then(() => {
      cb();
    });
  } else {
    set(ref(db, path), data);
  }
};

export const updateDB = (path, data, cb) => {
  const db = getDatabase();
  const updates = {};
  updates[path] = data;
  update(ref(db), updates).then(() => {
    if (cb) cb();
  });
};

export const deleteNodeDB = (path, cb) => {
  updateDB(path, null, cb);
};

export const addDBListener = (cb) => {
  const db = getDatabase();
  const ticketsRef = ref(db, 'tickets');
  onValue(ticketsRef, (snapshot) => {
    const data = snapshot.val();
    // console.log("update..." + JSON.stringify(data));
    cb(data);
  });
};

export const saveComment = (ticketId, commentMsg) => {
  const db = getDatabase();
  const postListRef = ref(db, 'comments/' + ticketId);
  const newPostRef = push(postListRef);
  set(newPostRef, {
    msg: commentMsg,
    timestamp: new Date().getTime(),
    userId: '64980',
  });
};

//TODO: refactor these 2 functions
export const queryCommentsDB = (ticketId, cb) => {
  const db = getDatabase();
  const x = query(ref(db, 'comments/' + ticketId.toString()));
  get(x).then((snapshot) => {
    cb(snapshot.val());
    // console.log(JSON.stringify(snapshot.val()));
  });
};

export const queryTicketDB = (ticketId, cb) => {
  const db = getDatabase();
  const x = query(ref(db, 'tickets/' + ticketId.toString()));
  get(x).then((snapshot) => {
    cb(snapshot.val());
    console.log(JSON.stringify(snapshot.val()));
  });
};

export const setupFirebaseInitialData = () => {
  const tickets = [
    {
      26377: {
        title: 'This is an issue of type Story',
        type: 'story',
        priority: 'sev2',
        assignee: -1,
        lane: 'backlog',
        description: 'Users can add descriptions to their issue here',
        reporter: -1,
        lastUpdated: 1642198609473 - 1000 * 60 * 60 * 24,
      },
    },
    {
      34891: {
        title:
          'Try dragging issues around to different columns to transition their status',
        type: 'story',
        priority: 'sev1',
        assignee: -1,
        lane: 'backlog',
        description: 'Users can add descriptions to their issue here',
        reporter: -1,
        lastUpdated: 1642198609473 - 1000 * 60 * 60 * 24,
      },
    },
    {
      31232: {
        title: 'Try clicking on an Issue to see more information',
        type: 'story',
        priority: 'high',
        assignee: 64980,
        lane: 'inDevelopment',
        description: 'Users can add descriptions to their issue here',
        reporter: -1,
        lastUpdated: 1642198609473 - 1000 * 60 * 60 * 24,
      },
    },
    {
      31236: {
        title:
          'Try using the board filters to search issues by assignee or title',
        type: 'task',
        priority: 'low',
        assignee: 71653,
        lane: 'inDevelopment',
        description: 'Users can add descriptions to their issue here',
        reporter: -1,
        lastUpdated: 1642198609473 - 1000 * 60 * 60 * 24,
      },
    },
    {
      31239: {
        title:
          'Users can also leave comments on an issue - Try Leaving a comment on an issue',
        type: 'story',
        priority: 'sev2',
        assignee: 86862,
        lane: 'inDevelopment',
        description: 'Users can add descriptions to their issue here',
        reporter: -1,
        lastUpdated: 1642198609473 - 1000 * 60 * 60 * 24,
      },
    },
    {
      56343: {
        title:
          'Issues can be assigned a priority (lowest to highest) and a type (Bug,Task,Story)',
        type: 'story',
        priority: 'low',
        assignee: 64980,
        lane: 'inProgress',
        description: 'Users can add descriptions to their issue here',
        reporter: -1,
        lastUpdated: 1642198609473 - 1000 * 60 * 60 * 24,
      },
    },
    {
      76866: {
        title: 'Each Issue has one reporter and one assignee',
        type: 'story',
        priority: 'sev1',
        assignee: 64980,
        lane: 'done',
        description: 'Users can add descriptions to their issue here',
        reporter: -1,
        lastUpdated: 1642198609473 - 1000 * 60 * 60 * 24,
      },
    },
    {
      89432: {
        title:
          'Issues can be deleted by clicking on the issue and using the Delete button',
        type: 'story',
        priority: 'low',
        assignee: 64980,
        lane: 'backlog',
        description: 'Users can add descriptions to their issue here',
        reporter: -1,
        lastUpdated: 1642198609473 - 1000 * 60 * 60 * 24,
      },
    },
  ];

  const users = [
    {
      64980: {
        firstName: 'Joey',
        lastName: 'Tribbiani',
        photo: 'https://i.ibb.co/vhJVFpQ/joey-tribbiani-3.jpg',
      },
    },
    {
      86862: {
        firstName: 'Monica',
        lastName: 'Geller',
        photo: 'https://i.ibb.co/b636CY2/monica-geller-2.jpg',
      },
    },
    {
      71653: {
        firstName: 'Ross',
        lastName: 'Geller',
        photo: 'https://i.ibb.co/gts0j76/ross-geller-2.jpg',
      },
    },
  ];

  const oneDay = 1000 * 60 * 60 * 24;
  const comments = [
    {
      26377: [
        {
          msg: 'Nice work on this!',
          timestamp: new Date().getTime(),
          userId: '64980',
        },
        {
          msg: 'Is this in the scope for this release',
          timestamp: new Date().getTime() - oneDay,
          userId: '86862',
        },
        {
          msg: 'Do we need this for this release?',
          timestamp: new Date().getTime() - 2 * oneDay,
          userId: '71653',
        },
        {
          msg: 'Kicked out of current sprint due to escalations',
          timestamp: new Date().getTime() - 3 * oneDay,
          userId: '64980',
        },
      ],
    },
    {
      31239: [
        {
          msg: 'Nice work on this Monica!',
          timestamp: new Date().getTime(),
          userId: '64980',
        },
      ],
    },
    {
      31232: [
        {
          msg: 'Users can change information on the ticket such as the title, description, or any of the attributes on the right side',
          timestamp: new Date().getTime(),
          userId: '64980',
        },
      ],
    },
    {
      56343: [
        {
          msg: 'Users can change priority or the issue type',
          timestamp: new Date().getTime(),
          userId: '64980',
        },
      ],
    },
  ];

  writeToDB('title', 'Central Perk Project');
  writeToDB(
    'projectDescription',
    'A tool used to track and coordinate work within a team'
  );

  //write Tickets to DB
  tickets.forEach((ticket) => {
    // console.log(Object.keys(ticket)[0] + " " + JSON.stringify(Object.values(ticket)));
    writeToDB('tickets/' + Object.keys(ticket)[0], ...Object.values(ticket));
  });

  //write users to DB
  users.forEach((user) => {
    // console.log(Object.keys(user)[0] + " " + JSON.stringify(Object.values(user)));
    writeToDB('users/' + Object.keys(user)[0], ...Object.values(user));
  });

  //write comments to DB
  comments.forEach((comment) => {
    // console.log(Object.keys(comment)[0] + " " + JSON.stringify(Object.values(comment)));
    writeToDB('comments/' + Object.keys(comment)[0], ...Object.values(comment));
  });

  // const dbRef = ref(getDatabase());
  // get(child(dbRef, `/`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(JSON.stringify(snapshot.val()));
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });
};
