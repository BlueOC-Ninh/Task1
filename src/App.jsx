import { Component } from "react"
import { GrView } from "react-icons/gr";
import DeleteConfirmModal from "./components/deleteConfirmModal";
import { colors} from "./constants";
import Form from "./components/Form";
import { toast } from "react-toastify";
import Tabs from "./components/Tabs";


class App extends Component {
  constructor() {
    super()
    this.state = {
      form: {
        id: '',
        title: '',
        desc: '',
        time: '',
        status: 'pending'
      },
      todos: JSON.parse(localStorage.getItem("todos")) || [],
      isOpenForm: false,
      selectedTab: 'all',
      isEditing: false,
      editingId: null,
    }
  }
   filteredTodos = []

  handleChange = (event) => {
    const { id } = event.target;
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        status: id,
      },
    }));
  };

  handleChangeTab = (status) => {
    this.setState({
      selectedTab:status
    })
  }

  handleSubmitTask = () => {
    const { isEditing, editingId, form, todos } = this.state;
    if (form.title.trim() === "")
      return toast.warning("Title is required!")


    if (isEditing) {
      const updatedTodos = [...todos];
      
      const todoIndex = updatedTodos.findIndex((item) => item.id === editingId);
      updatedTodos.splice(todoIndex, 1)
      updatedTodos.splice(todoIndex,0,form)

      this.setState({
        todos: updatedTodos,
        isEditing: false,
        editingId: null,
        form: { id: '', title: '', desc: '', time: '', status: 'pending' },
        isOpenForm: false,
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      toast.success("Add task successfully!")
    } else {
      const newTodo = { ...form,id: Date.now() };

      const updatedTodos = [...todos, newTodo];
  
      this.setState({
        todos: updatedTodos,
        form: { id: '', title: '', desc: '', time: '', status: 'pending' },
        isOpenForm: false,
      });
    }
  };
  
  getFilteredTodos = () => {
    const { todos, selectedTab } = this.state;
  
    let filtered = selectedTab === 'all'
      ? todos
      : todos.filter(todo => todo.status === selectedTab);
  
    filtered.sort((a, b) => new Date(a.time) - new Date(b.time));
  
    return filtered;
  };
  
  handleCloseForm = () => {
    this.setState({ isOpenForm: false, isEditing: false, editingId: null, form: { id: '', title: '', desc: '', time: '', status: 'pending' }, })
  }

  componentDidUpdate(_, prevStates) {
    const todos = this.state.todos
    if (prevStates.todos.length !== todos.length) {
      const message =
        todos.length > prevStates.todos.length
          ? "Add task successfully!"
          : "Delete task successfully!";
  
      toast.success(message);
      localStorage.setItem("todos", JSON.stringify(todos));
    }

  }


  handleDelete = (id) => {
    const todos = [...this.state.todos]
    const newTodos = todos.filter((item) => item.id !== id)
    this.setState({todos: newTodos})
  }

  handleUpdate = (task) => {
    this.setState({
      isEditing: true,
      editingId: task.id,
      form: task,
      isOpenForm: true
    })
  }

  render() {
    const filteredTodos = this.getFilteredTodos()
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="p-10 flex flex-col gap-5 items-center">
          <h1 className="text-4xl font-bold text-blue-900">TODO LIST</h1>
        </div>
        <div className="flex justify-end mb-5">
        <button
            type="button"
            className="bg-[#e2ebfa] text-[#4b8ae9] rounded-lg w-fit px-6 py-3 cursor-pointer hover:bg-blue-200 "
            onClick={() => this.setState((pre) =>  ({isOpenForm: !pre.isOpenForm}))}
          >
            New task
          </button>
        </div>
        <Tabs handleChangeTab={ this.handleChangeTab} selectedTab={this.state.selectedTab} />
        <div className="flex flex-col gap-4">
          {filteredTodos.map((item,index) => 
            <div className="bg-[#f6f6f6] rounded-lg px-4 py-2  text-md text-slate-950 flex  gap-5 items-center" key={index}>
              <p className="">{item.title}</p>
              {item.time && <span className="text-sm text-slate-600">due: {item.time}</span>}
              <div className="flex-1 flex justify-end">
              <span className= {`${colors[item.status]} text-white rounded-lg px-3 w-[70px] justify-center py-1 text-sm flex items-center justify-cente`}>{item.status}</span>
             </div>
              <div className="flex gap-2  justify-end ">
                <GrView className="text-blue-400 cursor-pointer" onClick={()=>this.handleUpdate(item)} />
                <DeleteConfirmModal handleDelete={()=> this.handleDelete(item.id)} />
             </div>
            </div>
          )}
        </div>
        {this.state.isOpenForm && (
          <Form
          form={this.state.form}
          isEditing={this.state.isEditing}
          onClose={() => this.handleCloseForm()}
          onChangeField={(field, value) =>
            this.setState({ form: { ...this.state.form, [field]: value } })
          }
          onChangeStatus={this.handleChange}
          onSubmit={this.handleSubmitTask}
        />

      )}
      </div>
    )
  }
}

export default App;
