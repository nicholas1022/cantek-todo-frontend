import { useState } from "react";
import * as Yup from "yup";
import ITodoData from "../models/Todo.ts";
import { useFormik } from "formik";

type todoItemType = {
  todoItem: ITodoData;
  onUpdate: (e: ITodoData) => void;
  // onStatusUpdate: (e: any) => void;
  onDelete: (e: string) => void;
};

export const TodoItem = ({
  todoItem,
  onUpdate,
  // onStatusUpdate,
  onDelete,
}: todoItemType) => {
  const { _id, task, status } = todoItem;
  const [edit, setEdit] = useState<boolean>(false);
  // const [todoUpdateTask, setTodoUpdateTask] = useState<string>(todoItem.task);
  // const [todoUpdateStatus, setTodoUpdateStatus] = useState<string>(todoItem.status);

  const formik = useFormik({
    initialValues: { ...todoItem },
    validationSchema: Yup.object({
      task: Yup.string()
        .min(1, "Must be 1 characters or more")
        .max(200, "Must be 200 characters or less")
        .required(),
      status: Yup.string()
        .min(1, "Must be 1 characters or more")
        .max(200, "Must be 200 characters or less")
        .required(),
    }),
    onSubmit: async (values) => {
      console.log(`values:: ${values}`);
      try {
        if (values?._id) {
          const updatedTodo: ITodoData = {
            _id: values._id,
            task: values.task,
            status: values.status
          };
          onUpdate(updatedTodo);
          setEdit(false);
        }
        
      } catch (err) {
        console.log(`error updating todo`);
      }
    },
  });

  const handleDelete = () => {
    if (_id) {
      onDelete(_id);
    } else {
      console.log("[DELETE TODO] Todo item's id is null.")
    }
  }

  console.log("Todo Item Re-render");
  return (
    <div
      key={_id}
      className="border-2 border-b-gray-800 border-t-black border-x-black text-slate-500 items-center "
    >
      {edit ? (
        <form
          className="flex flex-row h-22 items-center justify-center "
          onSubmit={formik.handleSubmit}
        >
          <div className="flex">
            <input
              id="task"
              name="task"
              type="text"
              placeholder={formik.values.task}
              value={formik.values.task}
              onChange={formik.handleChange}
              className="bg-gray-500 rounded px-3 py-2 w-64 m-3"
            />
            <input
              id="status"
              name="status"
              type="text"
              placeholder={formik.values.status}
              value={formik.values.status}
              onChange={formik.handleChange}
              className=" bg-gray-500 rounded px-3 py-2 w-32 m-3"
            />
          </div>
          
          <div className="flex gap-2">
            <button type="submit" 
              className="bg-gray-700 text-white px-4 py-2 rounded  hover:bg-gray-900 m-3"
            >
              Confirm
            </button>
            <button
              onClick={() => setEdit(false)}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 my-3 mr-10"
              type="button"
            >
              close
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col h-22 items-center ">
         
          <div className="flex flex-row mx-3 h-20 items-center ">
            <div
              className="flex w-64 text-slate-500 m-3 text-left "
            >
              {task}
            </div>
            <div
              className="flex w-32 mx-3 text-slate-500 items-center text-left"
            >
              <p className="text-center">{status}</p>
            </div>
            <div className={`${edit ? `hidden` : `flex`} mx-3`}>
              <button
                onClick={() => setEdit(true)}
                className="bg-gray-700 text-white px-4 py-2 rounded w-[60px] hover:bg-gray-900 m-3"
              >
              edit
              </button>
              <button onClick={handleDelete} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 m-3">
                delete
              </button>
            </div>  

          </div>
          
        </div>
      )}
    </div>
  );
};