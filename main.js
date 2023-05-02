import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface Task {
  id: number;
  title: string;
}

interface Props {}

const initialTasks: Task[] = [
  { id: 1, title: 'Task 1' },
  { id: 2, title: 'Task 2' },
  { id: 3, title: 'Task 3' },
  { id: 4, title: 'Task 4' },
];

const App: React.FC<Props> = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const newTasks = [...tasks];
    const [removed] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, removed);
    setTasks(newTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd} backend={HTML5Backend}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {task.title}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
