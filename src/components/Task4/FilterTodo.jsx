import { useDispatch, useSelector } from 'react-redux';
import { filterTodoByName, filterTodoByStatus, markAllTodo } from '../../redux/actions/todos';

const FilterTodo = () => {
    const dispatch = useDispatch()
    const { search, status } = useSelector((state) => state.todos)

    const handleSearch = (e) => {
        dispatch(filterTodoByName(e.target.value))
    }

    const handleMarkAll = () => {
        dispatch(markAllTodo())
    }

    const handleChangeStatus = (e) => {
        dispatch(filterTodoByStatus(e.target.value))
    }
    return (
        <div className="flex gap-20 justify-between w-full mb-20 px-8">

            <div className="flex gap-5 items-center">
                <div className="w-full max-w-sm min-w-[150px]">
                    <div className="relative">
                        <select
                            defaultValue={status}
                            onChange={(e) => handleChangeStatus(e)}
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                            <option value="all">All</option>
                            <option value="done">Done</option>
                            <option value="todo">Todo</option>
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </div>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded min-w-[200px] cursor-pointer" onClick={handleMarkAll}>
                    Mark all completed
                </button>
            </div>
            <input type="text" placeholder="Enter task name..." value={search} onChange={(e) => handleSearch(e)} className="bg-white px-4 py-2 flex-1 outline-none border border-white focus:border-pink-300" />
        </div>
    );
};

export default FilterTodo;