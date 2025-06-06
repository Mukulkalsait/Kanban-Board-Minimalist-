import React from 'react';
import { CssBaseline, Container, Box, Paper, Typography } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const columns = [
  { id: 'todo', title: 'To Do', tasks: ['Task 1', 'Task 2'] },
  { id: 'inprogress', title: 'In Progress', tasks: ['Task 3'] },
  { id: 'done', title: 'Done', tasks: ['Task 4'] },
];

function App() {
  const onDragEnd = (result) => {
    console.log(result);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ gap: 2 }}>
        <Typography variant="h4" gutterBottom>
          Kanban Board
        </Typography>

        <DragDropContext onDragEnd={onDragEnd}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {columns.map((column) => (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <Paper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      flex: 1,
                      p: 2,
                      bgcolor: '#f4f5f7',
                      minHeight: '400px',
                    }}
                    elevation={3}
                  >
                    <Typography variant="h6" gutterBottom>
                      {column.title}
                    </Typography>

                    {column.tasks.map((task, index) => (
                      <Draggable key={task} draggableId={task} index={index}>
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              p: 1,
                              my: 1,
                              bgcolor: '#3f3f3f',
                              color: 'white',
                              borderRadius: 1,
                              boxShadow: 1,
                            }}
                          >
                            {task}
                          </Box>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            ))}
          </Box>
          ;
        </DragDropContext>
      </Container>
    </>
  );
}

export default App;
