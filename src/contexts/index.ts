import { createContext } from 'react';
import { TodoStore } from '@stores/todo-store';

export const storesContext = createContext({
  todoStore: new TodoStore(),
});
