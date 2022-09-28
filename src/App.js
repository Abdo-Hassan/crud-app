import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import UsersTable from './components/UsersTable';
import { CircularProgress, Typography } from '@mui/material';
import './App.css';

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

  return (
    <div className='App'>
      <Typography
        variant='h4'
        gutterBottom
        style={{ marginTop: 30, fontWeight: 'bold' }}>
        CRUD Application to add | edit | delete users
      </Typography>

      {users && users?.length > 0 ? (
        <UsersTable data={users} />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default App;
