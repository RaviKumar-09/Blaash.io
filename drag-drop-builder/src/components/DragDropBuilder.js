import React, { useState } from 'react';
import { DndContext, useDroppable, useDraggable } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase'; // Ensure your firebase.js is correctly set up

function DraggableItem({ id, label }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="draggable-item">
      {label}
    </div>
  );
}

function DroppableArea({ children, id }) {
  const { setNodeRef } = useDroppable({
    id
  });

  return (
    <div ref={setNodeRef} className="droppable-area">
      {children}
    </div>
  );
}

export default function DragDropBuilder() {
  const [items, setItems] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      const newItems = arrayMove(items, active.id, over.id);
      setItems(newItems);
    }
  };

  const saveLayout = async (layout) => {
    const docRef = doc(db, "layouts", "myLayout");
    await setDoc(docRef, { layout });
  };

  const loadLayout = async () => {
    const docRef = doc(db, "layouts", "myLayout");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().layout;
    } else {
      return [];
    }
  };

  const handleSaveLayout = () => {
    saveLayout(items);
  };

  const handleLoadLayout = async () => {
    const loadedItems = await loadLayout();
    setItems(loadedItems);
  };

  const publishLayout = () => {
    const layoutWindow = window.open('', '_blank');
    layoutWindow.document.write('<html><head><title>Published Layout</title></head><body>');
    layoutWindow.document.write('<div class="layout-container">');

    items.forEach(item => {
      layoutWindow.document.write(`<div class="published-item">${item.label}</div>`);
    });

    layoutWindow.document.write('</div></body></html>');
    layoutWindow.document.close();
  };

  return (
    <div className="builder-container">
      <button onClick={handleSaveLayout}>Save Layout</button>
      <button onClick={handleLoadLayout}>Load Layout</button>
      <button onClick={publishLayout}>Publish Layout</button>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={sortableKeyboardCoordinates}>
          <DroppableArea id="droppable">
            {items.map((item) => (
              <DraggableItem key={item.id} id={item.id} label={item.label} />
            ))}
          </DroppableArea>
        </SortableContext>
      </DndContext>
    </div>
  );
}