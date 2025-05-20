import { memo } from "react";
 
const TodoList = ({ todos,demoUseCallback }) => {
    console.log('rerender');
    return (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="border rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-blue-600">{todo.name}</h2>
              <p className="text-gray-700">{todo.desc}</p>
            </li>
          ))}
        </ul>
    );
};
 
export default memo(TodoList);