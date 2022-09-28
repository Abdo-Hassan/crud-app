import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db, signInWithGoogle } from './firebase-config';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import UsersTable from './components/UsersTable';
import { CircularProgress, Typography } from '@material-ui/core';
import Google from './assets/google.svg';
import './App.css';
import { onAuthStateChanged } from 'firebase/auth';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#fff',
    marginTop: theme.spacing(5),
  },
  googleImage: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [loadingUserData, setLoadingUserData] = useState(true);
  const usersRef = collection(db, 'users');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setIsLoggedIn(true);
        setLoadingUserData(false);
      } else {
        console.log('USER SIGNED OUT');
        setIsLoggedIn(false);
        setUserId('');
      }
    });
  }, []);

  const getUsers = async () => {
    const data = await getDocs(usersRef);
    setUsers(data?.docs?.map((doc) => ({ ...doc.data(), id: doc?.id })));
  };
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <Typography
        variant='h4'
        gutterBottom
        style={{ marginTop: 30, fontWeight: 'bold' }}>
        CRUD Application to handle Users
      </Typography>

      {isLoggedIn ? (
        users && users?.length > 0 ? (
          <UsersTable data={users} />
        ) : (
          <CircularProgress
            style={{ position: 'absolute', top: '50%', left: '50%' }}
          />
        )
      ) : (
        <Button
          variant='contained'
          onClick={() => signInWithGoogle()}
          color='default'
          className={classes.button}>
          <img src={Google} alt='google' className={classes.googleImage} />
          Sign in with google
        </Button>
      )}
    </div>
  );
}

export default App;
