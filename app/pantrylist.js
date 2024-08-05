// components/PantryList.js
import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const handleEdit = (item) => {
  onEdit(item);
};

const PantryList = ({ items, onEdit, onDelete, searchTerm }) => {
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <List>
      {filteredItems.map((item, index) => (
        <ListItem key={item.id} dense>
          <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={() => onEdit(item)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default PantryList;