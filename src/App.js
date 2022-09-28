import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db, signInWithGoogle } from './firebase-config';
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
  userImage: {
    width: 60,
    height: 60,
    borderRadius: '50%',
  },
}));

function App() {
  const classes = useStyles();
  const [userId, setUserId] = useState('');
  const [userBooks, setUserBooks] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingUserBooks, setLoadingUserBooks] = useState(true);
  const usersRef = collection(db, 'users');

  console.log('userInfo', userInfo);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
        setUserId(user.uid);
        setIsLoggedIn(true);
      } else {
        console.log('user is not logged in');
        setIsLoggedIn(false);
        setUserBooks([]);
        setUserId('');
        setUserInfo({});
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

      {userInfo && (
        <Typography
          variant='subtitle2'
          gutterBottom
          style={{ marginTop: 5, fontWeight: 'bold' }}>
          {userInfo?.displayName}
        </Typography>
      )}

      {userInfo && (
        <Typography
          variant='subtitle2'
          gutterBottom
          style={{ marginTop: 5, fontWeight: 'bold' }}>
          {userInfo?.email}
        </Typography>
      )}

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
