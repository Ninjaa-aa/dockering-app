import React, { useEffect, useState } from 'react';
import Create from './Create';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsPencil, BsCheck2, BsPencilFill } from 'react-icons/bs';
import axios from 'axios';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [updatetask, setUpdatetask] = useState('');
    const [taskid, setTaskid] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/get`)
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    };

    const formatTimestamp = (timestamp) => {
        const now = new Date();
        const created = new Date(timestamp);
        const diffInSeconds = Math.floor((now - created) / 1000);
        
        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    };

    const toggleTaskStatus = (id) => {
        axios.put(`${process.env.REACT_APP_API_URL}/edit/${id}`)
            .then(result => {
                const updatedTodos = todos.map(todo => {
                    if (todo._id === id) {
                        return { ...todo, done: !todo.done };
                    }
                    return todo;
                });
                setTodos(updatedTodos);
            })
            .catch(err => console.log(err));
    };

    const updateTask = (id, updatedTask) => {
        axios.put(`${process.env.REACT_APP_API_URL}/update/${id}`, { task: updatedTask })
            .then(result => {
                const updatedTodos = todos.map(todo => {
                    if (todo._id === id) {
                        return { ...todo, task: updatedTask };
                    }
                    return todo;
                });
                setTodos(updatedTodos);
                setTaskid('');
                setUpdatetask('');
            })
            .catch(err => console.log(err));
    };

    const deleteTask = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/delete/${id}`)
            .then(result => {
                const updatedTodos = todos.filter(todo => todo._id !== id);
                setTodos(updatedTodos);
                setShowDeleteConfirm(null);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="home">
            <Create />
            {todos.length === 0 ? (
                <div className='task'>No tasks found</div>
            ) : (
                todos.map((todo) => (
                    <div className='task' key={todo._id}>
                        <div className='checkbox'>
                            {todo.done ? (
                                <BsFillCheckCircleFill className='icon' />
                            ) : (
                                <BsCircleFill className='icon' onClick={() => toggleTaskStatus(todo._id)} />
                            )}
                            {taskid === todo._id ? (
                                <div className='edit-container'>
                                    <input 
                                        type='text' 
                                        value={updatetask} 
                                        onChange={e => setUpdatetask(e.target.value)} 
                                        className='edit-input'
                                    />
                                    <BsCheck2 
                                        className='icon save-icon' 
                                        onClick={() => updateTask(todo._id, updatetask)} 
                                    />
                                </div>
                            ) : (
                                <div>
                                    <p className={todo.done ? 'through' : 'normal'}>{todo.task}</p>
                                    <small className='timestamp'>{formatTimestamp(todo.createdAt)}</small>
                                </div>
                            )}
                        </div>
                        <div>
                            <span>
                                {taskid === todo._id ? (
                                    <BsPencilFill 
                                        className='icon editing' 
                                        onClick={() => updateTask(todo._id, updatetask)} 
                                    />
                                ) : (
                                    <BsPencil 
                                        className='icon' 
                                        onClick={() => {
                                            setTaskid(todo._id);
                                            setUpdatetask(todo.task);
                                        }} 
                                    />
                                )}
                                <BsFillTrashFill 
                                    className='icon' 
                                    onClick={() => setShowDeleteConfirm(todo._id)} 
                                />
                            </span>
                        </div>
                        {showDeleteConfirm === todo._id && (
                            <div className='delete-confirm'>
                                <p>Are you sure you want to delete this task?</p>
                                <div className='confirm-buttons'>
                                    <button onClick={() => deleteTask(todo._id)}>Yes</button>
                                    <button onClick={() => setShowDeleteConfirm(null)}>No</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default Home; 