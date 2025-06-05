/* R: subtaks State:
 * 1. unique-Id
 * 2. subtaskName
 * 3. status(true/false)
 * */
export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

/* R: single task card State:
 * 1. unique-Id
 * 2. taksName
 * B:
 * 3. optional text.
 * 4. optional date. ISO.
 * 5. list of subtak | Optional
 * Y: ? = optional
 * */
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  subtasks?: Subtask[];
}

/* Y2: ENUMS for Collumn.id ∴
 * 1. This are the ids that limit drag drop.
 * 2. Type-safe alternative to string.
 */
export type ColumnType = 'not_started' | 'in_progress' | 'blocked' | 'done';

/* R: Collumn State:
 * 1. unique-Id
 * 2. lables => notStarted,started,inprogress.
 * 3. taskIDs => array of Task.id for mentaining order.
 */
export interface Column {
  id: ColumnType;
  title: string;
  taskIds: string[];
}

/* R: Board State:
 * 1. All Tasks stored as = {taskId: task}
 * 2. All 4 cols, Each with LIST OF TASK ID to render
 */
export interface BoardData {
  tasks: { [key: string]: Task };
  columns: { [key in ColumnType]: Column };
}
