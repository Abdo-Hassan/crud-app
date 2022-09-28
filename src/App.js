import React, { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './firebase-config';
import BooksTable from './components/BooksTable';
import { Typography } from '@material-ui/core';
import './App.css';

function App() {
  const [booklists, setBookLists] = useState([]);
  const booksRef = collection(db, 'books');

  const getData = async () => {
    onSnapshot(booksRef, async (snapshot) => {
      const data = await getDocs(booksRef);
      const dataRef = data?.docs?.map((doc) => ({
        ...doc.data(),
        id: doc?.id,
      }));
      setBookLists(dataRef);
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <Typography
        variant='h4'
        gutterBottom
        style={{ marginTop: 30, fontWeight: 'bold' }}>
        Add your favorite books to the table
      </Typography>

      <BooksTable data={booklists} />
    </div>
  );
}

export default App;
