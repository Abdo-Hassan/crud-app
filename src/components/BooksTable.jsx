import React, { forwardRef } from 'react';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import { Button } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { db, handleSignOut } from '../firebase-config';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

var columns = [
  { title: 'id', field: 'id', hidden: true },
  { title: 'Book Name', field: 'name' },
  { title: 'Book Author', field: 'author' },
  { title: 'Book Country', field: 'country' },
];

const BooksTable = ({ data, userId }) => {
  const handleRowAdd = async (newData, resolve) => {
    const usersRef = doc(db, `users/${userId}`);
    await addDoc(usersRef, newData);
    resolve();
  };
  const handleRowUpdate = async (newData, oldData, resolve) => {
    const userDoc = doc(db, `users/${userId}`, oldData?.id);
    await updateDoc(userDoc, {
      name: newData?.name ? newData?.name : oldData?.name,
      author: newData?.author ? newData?.author : oldData?.author,
      country: newData?.country ? newData?.country : oldData?.country,
    });
    resolve();
  };

  const handleRowDelete = async (oldData, resolve) => {
    console.log('~ oldData', oldData);
    const userDoc = doc(db, 'users', oldData?.id);
    // await deleteDoc(userDoc);
    // resolve();
  };

  return (
    <>
      <MaterialTable
        style={{ margin: '30px 100px 0px' }}
        title='List of user information'
        columns={columns}
        data={data}
        icons={tableIcons}
        options={{ search: false, emptyRowsWhenPaging: false }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve);
            }),

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),

          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve);
            }),
        }}
      />

      <Button
        style={{ marginTop: 20 }}
        variant='outlined'
        onClick={() => handleSignOut()}
        color='secondary'>
        Sign Out
      </Button>
    </>
  );
};

export default BooksTable;
