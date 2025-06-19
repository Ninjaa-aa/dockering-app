import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
    const [task, setTask] = useState('');

    const createTask = () => {
        if (task.trim()) {
            axios.post(`${process.env.REACT_APP_API_URL}/add`, { task: task.trim() })
                .then(result => {
                    console.log(result.data);
                    setTask('');
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            createTask();
        }
    };

    return (
        <div className="create-form">
            <input
                type='text'
                placeholder='Enter a task'
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyPress={handleKeyPress}
                required
            />
            <button onClick={createTask}>ADD</button>
        </div>
    );
};

export default Create; 