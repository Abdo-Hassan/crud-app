import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db, handleSignOut, signInWithGoogle } from './firebase-config';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import BooksTable from './components/BooksTable';
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
  const [userBooks, setUserBooks] = useState([]);
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
        console.log('user is not logged in');
        setIsLoggedIn(false);
        setUserBooks([]);
        setUserId('');
      }
    });
  }, []);

  const getData = async () => {
    const data = await getDocs(usersRef);
    const dataRef = data?.docs?.map((doc) => ({ ...doc.data(), id: doc?.id }));
    const userBooks = dataRef?.filter((data) => data?.id === userId)[0]?.books;
    setUserBooks(userBooks);
  };

  useEffect(() => {
    if (userId) getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div className='App'>
      <Typography
        variant='h4'
        gutterBottom
        style={{ marginTop: 30, fontWeight: 'bold' }}>
        Add your favorite books to the table
      </Typography>

      {isLoggedIn ? (
        <BooksTable data={userBooks} userId={userId} />
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
