import { action, computed, makeAutoObservable, observable } from 'mobx';
import { ITodo } from '../types/common.types';
import { socket } from '../socket';
import { ISocketTodoProgressData, SOCKET_EVENTS } from '../types/socket.types';
import api from '@helpers/api';
import { toast } from 'react-toastify';
import { IDefaultResponse, IErrorResponse } from '../types/server.types';

export class TodoStore {
  @observable
  private _isInit = false;

  @observable
  private _todos: ITodo[] = [];

  @observable
  private _isEditing = '';

  constructor() {
    makeAutoObservable(this);

    socket.on(
      SOCKET_EVENTS.UPDATE_TODO_PROGRESS,
      ({ _id, progress }: ISocketTodoProgressData) => {
        this.updateProgress(_id, progress);
      },
    );

    this.getTodos();
  }

  get todos() {
    return this._todos;
  }

  get isInit() {
    return this._isInit;
  }

  get isEditing() {
    return this._isEditing;
  }

  @action
  setIsEditing(value: string) {
    this._isEditing = value;
  }

  @computed
  get totalProgress() {
    return this._todos.reduce((acc, todo) => acc + todo.progress, 0);
  }

  @action
  getTodos() {
    api<ITodo[]>({
      method: 'get',
      path: '/todos',
    })
      .then((response) => {
        this._todos = response;
      })
      .catch((error) => {
        toast.error(error);
        console.error(error);
      })
      .finally(() => {
        this._isInit = true;
      });
  }

  @action
  addTodo = (todo: ITodo) => {
    return api<ITodo>({
      method: 'post',
      path: '/todos',
      data: todo,
    })
      .then((response) => {
        this._todos.push(response);
      })
      .catch((error) => {
        toast.error(error);
        console.error(error);
      });
  };

  @action
  updateTodo = (todo: ITodo) => {
    return api<ITodo[]>({
      method: 'put',
      path: '/todos',
      data: todo,
    })
      .then((response) => {
        this.setIsEditing('');
        this._todos = response;
      })
      .catch((error) => {
        toast.error(error);
        console.error(error);
      });
  };

  @action
  deleteTodo = (_id: string) => {
    return api<IDefaultResponse | IErrorResponse>({
      method: 'delete',
      path: `/todos/${_id}`,
    })
      .then((response) => {
        if ((response as IDefaultResponse).success) {
          this._todos = this._todos.filter((todo) => todo._id !== _id);
        } else {
          toast.error((response as IErrorResponse).error);
        }
      })
      .catch((error) => {
        toast.error(error);
        console.error(error);
      });
  };

  @action
  private updateProgress(_id: string, progress: number) {
    const todo = this._todos.findIndex((todo) => todo._id === _id);
    if (todo === -1) return;
    this._todos[todo].progress = progress;
  }
}
