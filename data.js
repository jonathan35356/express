// data.js

let data = [];

function addItem(item) {
  data.push(item);
}

function getAllItems() {
  return data;
}

function getItemById(id) {
  return data.find(item => item.id === id);
}

function updateItem(id, updatedItem) {
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
  }
}

function deleteItem(id) {
  data = data.filter(item => item.id !== id);
}

module.exports = {
  addItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
