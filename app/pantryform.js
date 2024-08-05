// components/PantryForm.js
import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs'; // Ensure TensorFlow.js is imported
import { storage } from './firebase';
import { ref, uploadBytes } from 'firebase/storage';

const PantryForm = ({ addItem, itemToEdit, updateItem, clearEdit }) => {
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1); // Default quantity

  useEffect(() => {
    if (itemToEdit) {
      setItemName(itemToEdit.name);
      setQuantity(itemToEdit.quantity);
    } else {
      setItemName('');
      setQuantity(1);
    }
  }, [itemToEdit]);

  useEffect(() => {
    const loadModel = async () => {
      if (typeof window !== 'undefined') {
        const model = await cocoSsd.load();
        window.objectDetectionModel = model; // Store the model in the window object
      }
    };
    loadModel();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);

      img.onload = async () => {
        const model = window.objectDetectionModel;
        if (!model) {
          alert('Model not loaded yet. Please try again.');
          return;
        }

        const predictions = await model.detect(img);
        
        // Check if any predictions match common pantry items
        const pantryItems = ['apple', 'banana', 'orange', 'bread', 'milk', 'egg', 'carrot']; // Extend this list as needed
        const recognizedItem = predictions.find(pred => pantryItems.includes(pred.class));

        if (recognizedItem) {
          // Prepare the image for upload
          const imageRef = ref(storage, `images/${file.name}`);
          await uploadBytes(imageRef, file);

          // Construct the image URL
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/pantry-tracker-8ef56.appspot.com/o/images%2F${file.name}?alt=media`;

          // Automatically add the item with quantity 1
          await addItem({ name: recognizedItem.class, quantity: 1, image: imageUrl });
          clearEdit(); // Clear edit mode
          alert(`Added ${recognizedItem.class} to pantry with quantity 1.`);
        } else {
          alert('No recognizable pantry item found in the image.');
        }
      };

      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemToEdit) {
      updateItem({ id: itemToEdit.id, name: itemName, quantity }); // Update existing item
    } else {
      addItem({ name: itemName, quantity }); // Add new item
    }
    clearEdit(); // Clear edit mode
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!itemName || quantity < 1) {
      alert('Please enter a valid item name and quantity.');
      return;
    }
    await addItem({ name: itemName, quantity: parseInt(quantity), image: '' });
    clearEdit(); // Clear edit mode
    alert(`Added ${itemName} to pantry.`);
    setItemName('');
    setQuantity(1); // Reset quantity
  };

  return (
    <form className="flex flex-col space-y-4">
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">{itemToEdit ? 'Edit Item' : 'Add Item'}</Typography>
      
      <TextField
        label="Item Name"
        variant="outlined"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
        sx={{ backgroundColor: 'white' }} // Ensures text field is visible
      />
      <TextField
        label="Quantity"
        type="number"
        variant="outlined"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        inputProps={{ min: 1 }}
        required
        sx={{ backgroundColor: 'white' }} // Ensures text field is visible
      />
      <Button variant="contained" color="primary" onClick={handleManualSubmit} type="submit">{itemToEdit ? 'Update Item' : 'Add Item'}
       
      </Button>

      <Typography variant="h6">Or Upload Image</Typography>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="border p-2 rounded"
      />
      <Button variant="contained" color="primary" onClick={() => setImage(null)}>
        Upload
      </Button>
    </form>
    </form>
  );
};

export default PantryForm;