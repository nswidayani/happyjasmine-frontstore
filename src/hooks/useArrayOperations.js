import { useState } from 'react';

export function useArrayOperations(initialArray = []) {
  const [items, setItems] = useState(initialArray);

  const addItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: newItem.id || Date.now()
    };
    setItems(prev => [...prev, itemWithId]);
  };

  const removeItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index, updatedItem) => {
    setItems(prev => prev.map((item, i) =>
      i === index ? { ...item, ...updatedItem } : item
    ));
  };

  const moveItem = (fromIndex, toIndex) => {
    setItems(prev => {
      const newItems = [...prev];
      const [movedItem] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, movedItem);
      return newItems;
    });
  };

  const moveUp = (index) => {
    if (index > 0) {
      moveItem(index, index - 1);
    }
  };

  const moveDown = (index) => {
    if (index < items.length - 1) {
      moveItem(index, index + 1);
    }
  };

  const duplicateItem = (index) => {
    const itemToDuplicate = items[index];
    if (itemToDuplicate) {
      const duplicatedItem = {
        ...itemToDuplicate,
        id: Date.now(),
        name: itemToDuplicate.name ? `${itemToDuplicate.name} (Copy)` : undefined,
        title: itemToDuplicate.title ? `${itemToDuplicate.title} (Copy)` : undefined
      };
      addItem(duplicatedItem);
    }
  };

  const clearAll = () => {
    setItems([]);
  };

  const replaceAll = (newArray) => {
    setItems(newArray);
  };

  return {
    items,
    setItems,
    addItem,
    removeItem,
    updateItem,
    moveItem,
    moveUp,
    moveDown,
    duplicateItem,
    clearAll,
    replaceAll,
    count: items.length,
    isEmpty: items.length === 0,
    getItem: (index) => items[index],
    findIndex: (predicate) => items.findIndex(predicate)
  };
}