import React, { useState, useEffect } from "react";
import ITodoData from '../models/Todo.ts';
import AddTodoForm from "./AddTodo.tsx";
import { TodoItem }  from "./TodoItem.tsx";
import { getAll, remove, update } from "../api/todoApi.ts";
// import { ObjectId } from 'bson';

const TodoList: React.FC = () => {
    const [ todoList, setTodoList ] = useState<ITodoData[]>([]);

    const handleAddTodo = (newTodo:ITodoData) => {
      setTodoList(prevList => {
        return [
          ...prevList,
          newTodo
        ]
      });
    }

//   let todoList: ITodoData[] = [];
  const retrieveTodos = async () => {
    await getAll()
      .then((response: any) => {
        console.log(response.data);
        setTodoList(response.data);
      })
      .catch((e: Error) => {
        console.log('Get Todos Error: ' + e);
      });
  };

  useEffect( () => {
    console.log('Starting retrieve todo data...');
    retrieveTodos();
  }, []);
  
  const handleUpdate = (updateItem: ITodoData) => {
    if (updateItem?._id) {
      update(updateItem._id, updateItem);
    }
    setTodoList(
      todoList.map((todoItem: ITodoData) =>
        todoItem._id === updateItem._id ? updateItem : todoItem
      )
    );
  };

  // delete from the list
  const handleDelete = async (id: string) => {
    if (id) {
      console.log('[TodoList]Handle Delete Todos: ' + id);
      await remove(id).catch((e: Error) => {
        console.log('Delete Todos Error: ' + e);
      });
      setTodoList(
        todoList.filter((todoItem: ITodoData) => todoItem._id !== id)
      )
    } 
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="flex flex-row">
        <div className="flex w-64 text-2xl m-3 text-gray-300 text-left">Task</div>
        <div className="flex w-32 text-2xl text-gray-300 text-left m-3">Status</div>
        <div className=" text-black text-left w-[60px] m-3"> </div>
        <div className=" text-black text-left w-[110px] m-3"></div>
      </div>
      <div>
        {todoList &&
          todoList.map((todo, index) => (
            <div
              key={index}
            >
              <TodoItem 
                key={todo._id}
                todoItem={todo}
                onUpdate={(updatedTodo: ITodoData) => handleUpdate(updatedTodo)}
                onDelete={handleDelete}
              />
            </div>
          ))}

      </div>
        
        <AddTodoForm onAdd={handleAddTodo} />
    </div>
   )
};

export default TodoList;