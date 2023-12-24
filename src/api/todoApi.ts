import http from "./http-common.ts";
import ITodoData from "../models/Todo.ts";

export const getAll = async () => {
    console.log(http);
    return http.get<Array<ITodoData>>("/");
  }

export const create = async (data: ITodoData) => {
  return http.post<ITodoData>("/", data);
}

export const update = async (id: string, data: ITodoData) => {
  return http.put<string, ITodoData>(`/${id}`, data);
}

export const remove = async (id: string) => {
  return http.delete<string>(`/${id}`);
}