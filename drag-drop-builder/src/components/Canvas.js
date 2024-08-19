import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const Canvas = ({ components }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'canvas',
  });

  return (
    <div ref={setNodeRef} className="canvas droppable">
      {components.map((component, index) => (
        <RenderComponent key={index} type={component.type} />
      ))}
    </div>
  );
};

const RenderComponent = ({ type }) => {
  switch (type) {
    case 'Label':
      return <label>Label</label>;
    case 'Input Box':
      return <input type="text" />;
    case 'Check Box':
      return <input type="checkbox" />;
    case 'Button':
      return <button>Button</button>;
    case 'Table':
      return (
        <table border="1">
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data 1</td>
              <td>Data 2</td>
            </tr>
          </tbody>
        </table>
      );
    default:
      return null;
  }
};

export default Canvas;