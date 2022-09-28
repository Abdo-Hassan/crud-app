import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import './App.css';
import { db } from './firebase-config';

function App() {
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersRef);
      setUsers(data?.docs?.map((doc) => ({ ...doc.data(), id: doc?.id })));
    };
    getUsers();
  }, []);

  console.log('users', users);

  return (
    <div className='App'>
      <h1>Crud App</h1>
    </div>
  );
}

export default App;
