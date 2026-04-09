import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

function AddTodo() {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-x-3 mt-12 flex justify-center">
        <input
          className="text-white border p-2 rounded-sm"
          type="text"
          placeholder="Write todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg cursor-pointer">
          Add Todo
        </button>
      </form>
    </>
  );
}

export default AddTodo;
