import { useFormik } from 'formik';
import ITodoData from "../models/Todo.ts";
import { create } from '../api/todoApi.ts';
import * as Yup from "yup";

interface AddTodoFormProps {
  onAdd: (todo: ITodoData) => void; // Define the function signature here
}

export default function AddTodoForm({onAdd}:AddTodoFormProps)  {
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const formik = useFormik({
    initialValues: {
      task: '',
      status: ''
    },
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
    onSubmit: async (values, {resetForm}) => {
      const todo: ITodoData = {
        task: values.task,
        status: values.status
      };

      console.log(todo);
      try {
        create(todo);
        onAdd(todo);
        location.reload();
      } catch (err) {
        console.log(`error updating todo: ` + err);
      }
    },
  });
  return (
    <div className="flex flex-row h-22 items-center justify-center">
      <form onSubmit={formik.handleSubmit} className="flex flex-row items-center justify-center">
        <div className="mb-4">
          <input
            id="task"
            name="task"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.task}
            className="bg-gray-500 rounded px-3 py-2 w-64 m-3"
          />
          <input
            id="status"
            name="status"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.status}
            className=" bg-gray-500 rounded px-3 py-2 w-32 m-3"
          />
           <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black  ml-7 mr-32">Add</button>
           <div className=" text-black text-left w-[50px] m-3"></div>
        </div>
       
      </form>
    </div>
    
  );
};