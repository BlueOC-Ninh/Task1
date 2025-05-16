import { Component } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { options } from "../constants";

class Form extends Component {
  render() {
    const { form,  onClose, onChangeField, onChangeStatus, onSubmit, isEditing } = this.props;

    return (
      <>
        <div className="fixed inset-0 bg-black opacity-60 z-50 flex justify-center items-center" />
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <form className="w-full max-w-lg p-6 flex flex-col gap-8 bg-white rounded-lg z-[100]">
            <IoCloseOutline
              className="ml-auto cursor-pointer size-5"
              onClick={onClose}
            />
            <h2 className="text-sm font-medium text-blue-500">
              *Add something you want to do
            </h2>

            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm text-[#666666] font-semibold">Title</label>
              <input
                type="text"
                id="title"
                value={form.title}
                onChange={(e) => onChangeField("title", e.target.value)}
                className="text-[#666666] focus:border-[#bdceec] border border-[#CCCCCC] rounded-lg px-4 py-1 font-normal outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="time" className="text-sm text-[#666666] font-semibold">Due</label>
              <input
                type="datetime-local"
                id="time"
                value={form.time}
                onChange={(e) => onChangeField("time", e.target.value)}
                className="text-[#666666] focus:border-[#bdceec] border border-[#CCCCCC] rounded-lg px-4 py-1 font-normal outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="desc" className="text-sm text-[#666666] font-semibold">Description</label>
              <textarea
                id="desc"
                value={form.desc}
                onChange={(e) => onChangeField("desc", e.target.value)}
                className="min-h-[150px] text-[#666666] focus:border-[#bdceec] border border-[#CCCCCC] rounded-lg px-4 py-1 font-normal outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-[#666666] font-semibold">Status</label>
              <div className="flex gap-10">
                {options.map((option) => (
                  <div key={option.id} className="inline-flex items-center">
                    <label
                      htmlFor={option.id}
                      className="relative flex cursor-pointer items-center rounded-full p-3"
                    >
                      <input
                        type="radio"
                        id={option.id}
                        name="status"
                        checked={form.status === option.id}
                        onChange={(e) => onChangeStatus(e)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-300 checked:border-blue-500 transition-all bg-blue-100"
                      />
                      <span className="absolute bg-blue-400 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                    </label>
                    <label htmlFor={option.id} className="text-[#666666] cursor-pointer text-sm">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={onSubmit}
              className="bg-[#e2ebfa] text-[#4b8ae9] rounded-lg w-fit px-6 py-3 cursor-pointer hover:bg-blue-200 ml-auto"
            >
              {isEditing ? "Update Task" : "New Task"}
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Form;
