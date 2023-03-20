export interface ITodoData {
  id: number,
  todoName: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTodoReq {
  todoName: string;
  done: boolean;
  id?: number;
}

export interface ICreateTodoRes {
  message: string;
  payload: ITodoData;
}

export interface IDeleteTodoRes {
  message: string;
  payload: ITodoData;
}

export interface IUpdateTodoReq {
  todoName: string;
  done: boolean;
}

export interface IUpdateTodoRes {
  message: string;
  payload: ITodoData;
}
