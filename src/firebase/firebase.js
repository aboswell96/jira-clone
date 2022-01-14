import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set, query, push, update, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAzsxJkZBNIVjO5ps1EAiFu09VrDo3L7hY",
    authDomain: "jira-clone-94734.firebaseapp.com",
    databaseURL: "https://jira-clone-94734-default-rtdb.firebaseio.com",
    projectId: "jira-clone-94734",
    storageBucket: "jira-clone-94734.appspot.com",
    messagingSenderId: "213738596941",
    appId: "1:213738596941:web:cae43115eef773e95c0a04",
    measurementId: "G-S5TBDSJ5P8"
};

const app = initializeApp(firebaseConfig);

export const readFromDB = (path,f) => {
    const dbRef = ref(getDatabase());
    return (get(child(dbRef, path)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(JSON.stringify(snapshot.val()));
        f(snapshot.val());
        return(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    }));
};

export const writeToDB = (path,data, cb) => {
    const db = getDatabase();

    if(cb) {
      set(ref(db, path), data)
      .then(() => {
        cb();
      });
    }else {
      set(ref(db, path), data);
    }
}

export const updateDB = (path, data, cb) => {
  const db = getDatabase();
  const updates = {};
  updates[path] = data;
  update(ref(db), updates)
  .then(() => {
    if(cb) cb();
  })
}

export const deleteNodeDB = (path, cb) => {
  updateDB(path,null,cb);
}

export const addDBListener = (cb) => {
  const db = getDatabase();
  const ticketsRef = ref(db, 'tickets');
  onValue(ticketsRef, (snapshot) => {
    const data = snapshot.val();
    console.log("update..." + JSON.stringify(data));
    cb(data);
  });
}

export const saveComment = (ticketId, commentMsg) => {
  const db = getDatabase();
  const postListRef = ref(db, 'comments/' + ticketId);
  const newPostRef = push(postListRef);
  set(newPostRef, {
    'msg':commentMsg,
    'timestamp': new Date().getTime(),
    'userId': '64980',
  });
}

//TODO: refactor these 2 functions
export const queryCommentsDB = (ticketId, cb) => {
  const db = getDatabase();
  const x = query(ref(db, 'comments/' + ticketId.toString()));
  get(x).then((snapshot)=> {
    cb(snapshot.val());
    // console.log(JSON.stringify(snapshot.val()));
  })
}

export const queryTicketDB = (ticketId, cb) => {
  const db = getDatabase();
  const x = query(ref(db, 'tickets/' + ticketId.toString()));
  get(x).then((snapshot)=> {
    cb(snapshot.val());
    console.log(JSON.stringify(snapshot.val()));
  })
}

export const setupFirebaseInitialData = () => {

    const tickets = [
    {
      '26377':
      {
        'title':'Add Drag n Drop',
        'type':'bug',
        'priority':'sev2',
        'assignee': -1,
        'lane': 'backlog',
        'description': 'temp Description 2',
        'reporter': -1,
        'lastUpdated': 1642198609473,
      }
    },
    {
      '34891':
      {
        'title':'Add backend',
        'type':'story',
        'priority':'sev1',
        'assignee': -1,
        'lane': 'backlog',
        'description': 'temp Description 2',
        'reporter': -1,
        'lastUpdated': 1642198609473,
      }
    },
    {
      '31232':
      {
        'title':'Add ticket search',
        'type':'story',
        'priority':'high',
        'assignee': 64980,
        'lane': 'inDevelopment',
        'description': 'temp Description 2',
        'reporter': -1,
        'lastUpdated': 1642198609473,
      }
    },
    {
      '31236':
      {
        'title':'Add ticket filters by status',
        'type':'task',
        'priority':'low',
        'assignee': 71653,
        'lane': 'inDevelopment',
        'description': 'temp Description 2',
        'reporter': -1,
        'lastUpdated': 1642198609473,
      }
    },
    {
      '31239':
      {
        'title':'Add description and project type to settings',
        'type':'story',
        'priority':'sev2',
        'assignee': 86862,
        'lane': 'inDevelopment',
        'description': 'temp Description 2',
        'reporter': -1,
        'lastUpdated': 1642198609473,
      }
    },
    {
      '56343':
      {
        'title':'Add BoardView',
        'type':'story',
        'priority':'low',
        'assignee': 64980,
        'lane': 'inProgress',
        'description': 'temp Description 2',
        'reporter': -1,
        'lastUpdated': 1642198609473,
      }
    },
    {
      '76866':
      {
        'title':'add routes',
        'type':'story',
        'priority':'sev1',
        'assignee': 64980,
        'lane': 'done',
        'description': 'temp Description 2',
        'reporter': -1,
        'lastUpdated': 1642198609473,
      }
    }];

    const users = [
    {
      '64980':
      {
        'firstName': 'Joey',
        'lastName': 'Tribbiani',
        'photo': 'https://i.ibb.co/vhJVFpQ/joey-tribbiani-3.jpg',
      }
    },
    {
      '86862':
      {
        'firstName': 'Monica',
        'lastName': 'Geller',
        'photo':'https://i.ibb.co/b636CY2/monica-geller-2.jpg',
      }
    },
    {
      '71653': 
      {
        'firstName': 'Ross',
        'lastName': 'Geller',
        'photo': 'https://i.ibb.co/gts0j76/ross-geller-2.jpg',
      }
    }];

    const oneDay = 1000*60*60*24;
    const comments = [
      {
        26377 : [
        {
            'msg': "Nice work on this!",
            'timestamp': new Date().getTime(),
            'userId': '64980',
        },
        {
            'msg': "Is this still in progress?",
            'timestamp': new Date().getTime() - oneDay,
            'userId': '86862',
        },
        {
          'msg': "Do we need this for this release?",
          'timestamp': new Date().getTime() - 2*oneDay,
          'userId': '71653',
        },
        {
          'msg': "Kicked out of current sprint due to escalations",
          'timestamp': new Date().getTime() - 3*oneDay,
          'userId': '64980',
        }
      ]
    }
  ]

    writeToDB('title',"Central Perk Project");


    //write Tickets to DB
    tickets.forEach(ticket => {
      // console.log(Object.keys(ticket)[0] + " " + JSON.stringify(Object.values(ticket)));
      writeToDB('tickets/' + Object.keys(ticket)[0], ...Object.values(ticket));
    });

    //write users to DB
    users.forEach(user => {
      // console.log(Object.keys(user)[0] + " " + JSON.stringify(Object.values(user)));
      writeToDB('users/' + Object.keys(user)[0], ...Object.values(user));
    });

    //write comments to DB
    comments.forEach(comment => {
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
}