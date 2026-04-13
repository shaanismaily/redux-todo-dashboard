import { useDispatch, useSelector } from "react-redux";
import { removeTodo, updateTodo, toggleTodo } from "../features/todo/todoSlice";
import { useState, useRef, useEffect } from "react";

function Todos() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    if (editingId !== null && inputRef.current) inputRef.current.focus();
  }, [editingId]);

  const handleEdit = (todo) => {
    setEditText(todo.text);
    setEditingId(todo.id);
  };

  const handleSave = () => {
    dispatch(updateTodo({ id: editingId, text: editText }));
    setEditText("");
    setEditingId(null);
  };


  return (
    <>
      <h1 className="text-white font-bold text-center mt-4 text-3xl">Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li
            className={`max-w-3xl mt-4 m-auto flex justify-between items-center px-4 py-2 rounded ${todo.completed ? "bg-[#27272a]" : "bg-[#283242]"}`}
            key={todo.id}
          >
            <input type="checkbox" id={todo.id} checked={todo.completed} className="cursor-pointer"
            onChange={() => {dispatch(toggleTodo(todo.id))}}/>
            <label htmlFor={todo.id} className={`text-white cursor-pointer w-full ml-2 ${todo.completed ? "line-through" : ""}`}>
              {editingId === todo.id ? (
                <input
                  ref={inputRef}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-[90%]"
                />
              ) : (
                todo.text
              )}
            </label>
            <div className="flex gap-2 align-middle">
              <button
                onClick={
                  editingId === todo.id ? handleSave : () => handleEdit(todo)
                }
                className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md cursor-pointer"
              >
                {editingId === todo.id ?

                // save icon
                <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="w-6 h-6 text-white"
>
  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
  <polyline points="17 21 17 13 7 13 7 21" />
  <polyline points="7 3 7 8 15 8" />
</svg>
                 :

                 // pencil icon
                 <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 64 64"
  className="w-6 h-6 text-white"
  fill="currentColor"
>
  <g>
    <path d="M50.94,50.5H12a1.5,1.5,0,0,0,0,3H50.94A1.5,1.5,0,0,0,50.94,50.5Z"/>
    <path d="M51.68,12.38h0c-2.83-2.83-7.88-2.39-11.26,1L20.24,33.55a1.47,1.47,0,0,0-.39.67l-3,11.16a1.51,1.51,0,0,0,1.84,1.83l11.15-3a1.4,1.4,0,0,0,.67-.38L47.86,26.46l2.83-2.83C53.75,20.71,54.75,15.4,51.68,12.38Z"/>
  </g>
</svg>
                }
              </button>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
