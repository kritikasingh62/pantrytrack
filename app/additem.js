import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const AddItem = () => {
  const [name, setName] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);
  const [expiration, setExpiration] = React.useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add item logic
    history.push('/pantry');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Add Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Item Name"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <TextField
          label="Quantity"
          type="number"
          variant="outlined"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          required
        />
        <TextField
          label="Expiration Date"
          type="date"
          variant="outlined"
          value={expiration}
          onChange={(event) => setExpiration(event.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Item
        </Button>
      </form>
    </Container>
  );
};

export default AddItem;