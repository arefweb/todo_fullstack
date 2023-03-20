import {api } from "./http.config";
import {
  ICreateTodoReq,
  ICreateTodoRes,
  IDeleteTodoRes,
  ITodoData,
  IUpdateTodoReq,
  IUpdateTodoRes
} from "src/types/services/todos.type";
import {IResponse} from "../types/services/IResponse";

class TodosService {
  getTodos(sort?: string): IResponse<Array<ITodoData>> {
    return api.get<Array<ITodoData>>("/todos" + `${sort ? `?sort=${sort}` : ""}`);
  }

  deleteTodo(id: number): IResponse<IDeleteTodoRes> {
    return api.delete<IDeleteTodoRes>(`/todo/${id}`);
  }

  createTodo(data: ICreateTodoReq): IResponse<ICreateTodoRes> {
    return api.post<ICreateTodoRes>("/addTodo", data);
  }

  updateTodo(id: number, data: IUpdateTodoReq): IResponse<IUpdateTodoRes> {
    return api.put<IUpdateTodoRes>(`/todo/${id}`, data);
  }

}

export default new TodosService();