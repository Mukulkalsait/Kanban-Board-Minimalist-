import { useState } from 'react';
import { startBoardData } from '../data/startData';
import { BoardData } from '../types/kanban';

import { Container, Typography } from '@mui/material';

const Board = () => {
  const [boardData, setBoardData] = useState<BoardData>(startBoardData);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Kanban Board
      </Typography>

      {/*Collumn rendering place.*/}
      <pre>{JSON.stringify(boardData, null, 2)}</pre>
    </Container>
  );
};

export default Board;
