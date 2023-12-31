import React, { useState } from 'react'
import useTaskStore from '../app/taskStore'
import { Edit, Trash } from 'lucide-react'
const TaskList = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [id, setId] = useState("")
    const { tasks, removeTask, toggleTaskStatus, editTask } = useTaskStore(
        (state) => ({
            tasks: state.tasks,
            removeTask: state.removeTask,
            toggleTaskStatus: state.toggleTaskStatus,
            editTask: state.editTask
        })
    )
    const openModal = (task) => {
        setTitle(task.title)
        setDescription(task.description)
        setId(task.id)
        document.getElementById('my_modal_3').showModal()
    }
    const handleTaskSubmit = () => {
        if (!title || !description || !id) return
        editTask({
            id: id,
            title: title,
            description: description,
        })
        setTitle("")
        setDescription("")
        setId("")
        document.getElementById('my_modal_3').close()
    }
    return (
        <>
            <ul className='flex flex-wrap  mt-5 m-auto h-ful w-full justify-center'>
                {tasks.length === 0 ? (<h1 class="m-auto mt-10 mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">No Task</span> Found !!</h1>)
                    : tasks.map((task, i) => (
                        <React.Fragment key={i} className="flex-shrink-0">
                            <div class="max-w-sm rounded overflow-hidden shadow-lg m-3 border border-gray-100"
                                style={{
                                    backgroundColor: task.completed ? "#05e52f17" : ""
                                }}
                            >
                                <div class="px-6 py-4">
                                    <div
                                        class="font-bold text-xl mb-2  flex justify-between"

                                    >
                                        <span className='w-96'>{task.title}</span>
                                        <input
                                            checked={task.completed}
                                            className="cursor-pointer w-6 h-6 text-blue-600 bg-red-600 border-gray-300 rounded"
                                            onChange={(e) => { toggleTaskStatus(task.id) }}
                                            type="checkbox" />
                                        <Edit
                                            onClick={() => openModal(task)}
                                            className='w-6 h-6 ml-3 cursor-pointer text-zinc-500'
                                        />
                                        <Trash
                                            onClick={(e) => { removeTask(task.id) }}
                                            className='w-6 h-6 text-rose-600 ml-3 cursor-pointer' />
                                    </div>
                                    <p class="text-gray-700 text-base">
                                        {task.description}
                                    </p>
                                </div>
                                <div class="px-6 pt-4 pb-2">
                                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{task.priority}Priority</span>

                                </div>
                            </div>
                        </React.Fragment>
                    ))}
            </ul>
            <dialog id="my_modal_3" className="modal border rounded-lg w-96">
                <div className="modal-box p-5">
                    <form method="dialog" >
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Title
                        </label>
                        <input
                            required
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter task title" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Description
                        </label>
                        <textarea
                            required
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            id="message" rows="4" class="block p-2.5 w-full text-sm  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write about your task here..."></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => {
                                handleTaskSubmit()
                            }}
                            className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Edit Task <Edit className='w-4 h-4 ml-2' />
                        </button>

                    </div>
                </div>
            </dialog>
        </>
    )
}

export default TaskList