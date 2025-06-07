import React, { useState } from 'react';
import { CssBaseline, Container, Typography, Box, Paper } from '@mui/material';
import { DndContext, closestCenter, useDroppable, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTask from './components/SortableTask';

// ✅ Droppable Column Component
const DroppableColumn = ({ columnId, tasks }: { columnId: string; tasks: string[] }) => {
  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        flex: 1,
        p: 2,
        bgcolor: isOver ? '#e3f2fd' : '#f4f5f7',
        minHeight: '400px',
        transition: 'background-color 0.2s ease',
      }}
      elevation={3}
    >
      <Typography variant="h6" gutterBottom>
        {columnId.toUpperCase()}
      </Typography>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            transition: 'all 0.3s ease',
          }}
        >
          {tasks.length > 0 ? (
            tasks.map((task) => <SortableTask key={task} id={task} task={task} />)
          ) : (
            <Box
              sx={{
                height: '60px',
                border: '2px dashed #ccc',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#aaa',
                transition: 'all 0.3s ease',
              }}
            >
              Drop here
            </Box>
          )}
        </Box>
      </SortableContext>
    </Paper>
  );
};

// ✅ Main App Component
function App() {
  const [columns, setColumns] = useState({
    todo: ['Task 1', 'Task 2'],
    inprogress: ['Task 3'],
    review: ['Task 4'],
    done: ['Task 5'],
  });

  const [activeId, setActiveId] = useState<string | null>(null); // 👈 Track dragged item

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    let sourceColId = '';
    let destColId = '';

    for (const colId in columns) {
      if (columns[colId].includes(active.id)) sourceColId = colId;
      if (colId === over.id || columns[colId].includes(over.id)) destColId = colId;
    }

    if (!sourceColId || !destColId) return;

    if (sourceColId === destColId) {
      const columnTasks = [...columns[sourceColId]];
      const oldIndex = columnTasks.indexOf(active.id);
      const newIndex = columnTasks.indexOf(over.id);

      const reordered = arrayMove(columnTasks, oldIndex, newIndex);

      setColumns({
        ...columns,
        [sourceColId]: reordered,
      });
    } else {
      const sourceTasks = [...columns[sourceColId]];
      const destTasks = [...columns[destColId]];

      const taskIndex = sourceTasks.indexOf(active.id);
      const [movedTask] = sourceTasks.splice(taskIndex, 1);

      if (columns[destColId].includes(over.id)) {
        const destIndex = destTasks.indexOf(over.id);
        destTasks.splice(destIndex + 1, 0, movedTask);
      } else {
        destTasks.push(movedTask);
      }

      setColumns({
        ...columns,
        [sourceColId]: sourceTasks,
        [destColId]: destTasks,
      });
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Kanban Board
        </Typography>

        <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {Object.entries(columns).map(([columnId, tasks]) => (
              <DroppableColumn key={columnId} columnId={columnId} tasks={tasks} />
            ))}
          </Box>

          {/* ✅ Drag Overlay */}
          <DragOverlay>{activeId ? <SortableTask id={activeId} task={activeId} /> : null}</DragOverlay>
        </DndContext>
      </Container>
    </>
  );
}

export default App;
