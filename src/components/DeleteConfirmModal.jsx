import { Component } from "react";
import { MdOutlineDelete } from "react-icons/md";


export default class DeleteConfirmModal extends Component {
    state = {
        isOpen: false
    }

    handleOpen = () => {
        this.setState({ isOpen: true })
    }

    handleConfirm = () => {
        this.props.handleDelete()
        this.setState({ isOpen: false })
    }

    handleClose = () => {
        this.setState({ isOpen: false })
    }

    render() {
        return (
            <div className={` ${this.props.className ? this.props.className : ''}`}>
                <MdOutlineDelete onClick={this.handleOpen} className={`text-red-400 cursor-pointer`} />


                {this.state.isOpen && <>
                    <div className="fixed inset-0 bg-black opacity-60 z-40"></div>
                    <div className="fixed inset-0 z-50 flex justify-center items-center ">
                        <div className="w-full max-w-lg bg-white p-4 rounded-lg text-black">
                            <h2 className="text-xl font-semibold mb-5">Confirm to delete</h2>
                            <p className="text-sm">Are you sure to delete this task!</p>
                            <p className="text-sm">It will can't be restored</p>
                            <div className="flex justify-end gap-5">

                                <button
                                    className="bg-[#dd4a4a] text-white rounded-lg w-fit px-4 py-2 text-sm cursor-pointer"
                                    onClick={this.handleClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-[#e2ebfa] text-[#4b8ae9] rounded-lg w-fit px-4 py-2 text-sm cursor-pointer hover:bg-blue-200 "
                                    onClick={this.handleConfirm}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </>}
            </div>
        );

    }
}