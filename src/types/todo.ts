export interface TodoItem{
  id: string;
  content:string; // Description of the todo item
  isDone: boolean; 
  deadline?: string; // ISO date string
}

export type FilterType = 'all' | 'completed' | 'pending';