import { BoardData } from '../types/kanban';

export const initialBoardData: BoardData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'File Taxes',
      dueDate: '2025-06-10',
      description: 'Prepare and submit tax returns',
      subtasks: [
        { id: 'subtask-1', title: 'Collect receipts', completed: false },
        { id: 'subtask-2', title: 'Fill Form 16', completed: true },
      ],
    },
    'task-2': {
      id: 'task-2',
      title: 'Design UI for dashboard',
    },
    'task-3': {
      id: 'task-3',
      title: 'Book flight tickets',
    },
  },
  columns: {
    not_started: {
      id: 'not_started',
      title: 'Not Started',
      taskIds: ['task-1'],
    },
    in_progress: {
      id: 'in_progress',
      title: 'In Progress',
      taskIds: ['task-2'],
    },
    blocked: {
      id: 'blocked',
      title: 'Blocked',
      taskIds: [],
    },
    done: {
      id: 'done',
      title: 'Done',
      taskIds: ['task-3'],
    },
  },
};
