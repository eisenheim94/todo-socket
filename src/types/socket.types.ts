export enum SOCKET_EVENTS {
  UPDATE_TODO_PROGRESS = 'update-todo-progress',
}

export interface ISocketTodoProgressData {
  _id: string;
  progress: number;
}
