// pages/index.js
'use client'
import React,{ useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import PantryForm from './pantryform';
import PantryList from './pantrylist';
import Login from './login';
import SignUp from './signup';
import GoogleLogin from './googlelogin';
import { Container, Typography, Button, TextField } from '@mui/material';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Home = () => {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchItems = async () => {
    const itemsCollection = collection(db, 'pantryItems');
    const itemsSnapshot = await getDocs(itemsCollection);
    const itemsList = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(itemsList);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchItems(); // Fetch items only if user is authenticated
      }
    });
  return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const addItem = async (item) => {
    const docRef = await addDoc(collection(db, 'pantryItems'), item);
    setItems((prevItems) => [...prevItems, { id: docRef.id, ...item }]);
  };

  const updateItem = async (updatedItem) => {
    await updateDoc(doc(db, 'pantryItems', updatedItem.id), updatedItem);
    setItems((prevItems) =>
      prevItems.map(item => (item.id === updatedItem.id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteItem = async (index) => {
    const itemToDelete = items[index];
    await deleteDoc(doc(db, 'pantryItems', itemToDelete.id));
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleEdit = (item) => {
    setItemToEdit(item);
  };

  const handleLogout = async () => {
    await signOut(auth); // Sign out the user
    setUser(null); // Reset user state
  };

  const clearEdit = () => {
    setItemToEdit(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        padding: 4, 
        backgroundColor: '#778899', // Set the background color
        borderRadius: 2,
        boxShadow: 2
      }}
    >
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Pantry Tracker
      </Typography>
      
      {user ? (
        <>
          <Typography align="right">
            Welcome, {user.displayName || user.email} <Button onClick={handleLogout}>Logout</Button>
          </Typography>
          <TextField
            label="Search"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ marginBottom: 2 }}
              />
              <PantryForm addItem={addItem} itemToEdit={itemToEdit} updateItem={updateItem} clearEdit={clearEdit} />
              <PantryList items={items} onEdit={handleEdit} onDelete={deleteItem} searchTerm={searchTerm}
  onSearch={handleSearch} />
          </>
      ) : (
        <>
          {showLogin && <Login onLogin={() => fetchItems()} />}
          {showSignUp && <SignUp onSignUp={() => fetchItems()} />}
          <Button
            variant="outlined"
            onClick={() => {
              setShowLogin(!showLogin);
              setShowSignUp(!showSignUp);
            }}
          >
            {showLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </Button>
          <GoogleLogin onLogin={() => fetchItems()} />
        </>
      )}
    </Container>
  );
};

export default Home;