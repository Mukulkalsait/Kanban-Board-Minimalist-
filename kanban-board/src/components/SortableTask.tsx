// src/components/SortableTask.tsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';

type Props = {
  id: string;
  task: string;
};

const SortableTask: React.FC<Props> = ({ id, task }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab', // Optional but improves UX
  };

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        p: 1,
        my: 1,
        opacity: isDragging ? 0.6 : 1,
        backgroundColor: isDragging ? '#b2dfdb' : '#3f3f3f',
        color: 'white',
        borderRadius: 1,
        boxShadow: 2,
        transition: 'all 0.2s ease',
      }}
      style={style} // 👈 Add this here
    >
      {task}
    </Box>
  );
};

export default SortableTask;
