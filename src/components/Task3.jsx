import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TodoList from "./TodoList";

const Task3 = () => {
    const [search, setSearch] = useState('')
    const [time, setTime] = useState(0);
    const todos = useMemo(() => {
        return [
            {
              id: 1,
              name: "Mua đồ ăn",
              desc: "Mua rau, thịt, và trái cây cho bữa tối",
            },
            {
              id: 2,
              name: "Học React",
              desc: "Xem lại hook useEffect và useCallback",
            },
            {
              id: 3,
              name: "Luyện tập thể dục",
              desc: "Chạy bộ 30 phút buổi sáng",
            },
            {
              id: 4,
              name: "Dọn dẹp nhà",
              desc: "Hút bụi và lau sàn phòng khách",
            },
            {
              id: 5,
              name: "Gọi điện cho mẹ",
              desc: "Hỏi thăm sức khỏe và kể về tuần vừa rồi",
            },
        ];
    },[])

    const filteredTodos = useMemo(() => {
        return todos.filter((todo) =>
          todo.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);
    

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((pre)=> pre + 1)
        },1000)

        return () => {
            clearInterval(timer)
        }
    },[])
    
    const demoUseCallback = useCallback(() => {
       return () => {
            console.log('this function is used for testing!!!1');
        }
    },[])

    return (
        <div className="max-w-xl mx-auto mt-10 px-4 dark">
            {time}
            <h1 className="text-2xl font-bold mb-6 text-center">Danh sách công việc</h1>
            <input
      type="text"
      placeholder="Tìm kiếm công việc..."
      className="w-full p-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
            />
            {filteredTodos.length === 0 ? (
        <p className="text-center text-gray-500">Không tìm thấy công việc nào.</p>
      ) : (
                    <TodoList todos={filteredTodos} demoUseCallback={demoUseCallback} />
      )}
        
      </div>
        
    );
};

export default Task3;