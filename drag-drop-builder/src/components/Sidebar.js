import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const controls = ['Label', 'Input Box', 'Check Box', 'Button', 'Table'];

const Sidebar = ({ addComponent }) => {
  return (
    <div className="sidebar">
      <h3>Controls to Drag n Drop</h3>
      {controls.map((control) => (
        <Draggable key={control} id={control} addComponent={addComponent} />
      ))}
    </div>
  );
};

const Draggable = ({ id, addComponent }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
  });

  const handleDrop = () => {
    addComponent({ type: id });
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="draggable"
      onDragEnd={handleDrop}
    >
      {id}
    </div>
  );
};

export default Sidebar;