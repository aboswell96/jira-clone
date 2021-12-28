import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set} from "firebase/database";

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
        console.log(JSON.stringify(snapshot.val()));
        f(snapshot.val());
        return(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    }));
};

export const writeToDB = (path,data) => {
    const db = getDatabase();
    set(ref(db, path), data);
  
}

export const setupFirebaseInitialData = () => {

    const tickets = [
    {
        'title':'Add Drag n Drop',
        'type':'bug',
        'priority':'sev2',
        'assignee': -1,
        'id': 26377,
        'lane': 'backlog',

    },
    {
        'title':'Add backend',
        'type':'story',
        'priority':'sev1',
        'assignee': -1,
        'id': 34891,
        'lane': 'backlog',
    },
    {
        'title':'Add ticket search',
        'type':'story',
        'priority':'high',
        'assignee': 64980,
        'id': 31232,
        'lane': 'inDevelopment',
    },
    {
        'title':'Add ticket filters by status',
        'type':'task',
        'priority':'low',
        'assignee': 71653,
        'id': 31236,
        'lane': 'inDevelopment',
    },
    {
        'title':'Add description and project type to settings',
        'type':'story',
        'priority':'sev2',
        'assignee': 86862,
        'id': 31239,
        'lane': 'inDevelopment',
    },
    {
        'title':'Add BoardView',
        'type':'story',
        'priority':'low',
        'assignee': 64980,
        'id': 56343,
        'lane': 'inProgress',
    },
    {
        'title':'add routes',
        'type':'story',
        'priority':'sev1',
        'assignee': 64980,
        'id': 76866,
        'lane': 'done',
    }];

    const users = [
    {
        'firstName': 'Joey',
        'lastName': 'Tribbiani',
        'photo': 'https://i.ibb.co/vhJVFpQ/joey-tribbiani-3.jpg',
        'id': 64980,
    },
    {
        'firstName': 'Monica',
        'lastName': 'Geller',
        'photo':'https://i.ibb.co/b636CY2/monica-geller-2.jpg',
        'id': 86862,
    },
    {
        'firstName': 'Ross',
        'lastName': 'Geller',
        'photo': 'https://i.ibb.co/gts0j76/ross-geller-2.jpg',
        'id': 71653,
    }
]

    writeToDB('tickets',tickets);
    writeToDB('users',users);
    writeToDB('title',"Central Perk Project");
    const dbRef = ref(getDatabase());
    get(child(dbRef, `/`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(JSON.stringify(snapshot.val()));
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}