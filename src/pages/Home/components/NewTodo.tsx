import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { useStores } from '@hooks/useStores';
import { toast } from 'react-toastify';
import validateTodo from '@helpers/validateTodo';
import { TodoColor } from '../../../types/common.types';

const NewTodo = observer(() => {
  const { todoStore } = useStores();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [color, setColor] = useState(TodoColor.TEAL);

  const handleClear = () => {
    setName('');
    setDescription('');
  };

  const handleSave = () => {
    if (!validateTodo(name, true) || !validateTodo(description)) return;

    const id = Date.now().toString();

    setIsSaving(true);
    todoStore
      .addTodo({
        _id: `${color}-${id}`,
        name,
        description,
        progress: 0,
      })
      .then(() => {
        toast.success('Added new todo!');
        handleClear();
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <div className={`card bg-${color} tx-white`}>
      <div className="card-body">
        <div className="d-flex justify-content-end align-items-center">
          <h4 className="me-auto">New Todo</h4>
          {(!!description || !!name) && (
            <button
              className="btn btn-secondary me-2"
              onClick={handleClear}
              disabled={isSaving}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
              <span className="ms-2">Clear</span>
            </button>
          )}
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            <FontAwesomeIcon
              icon={!isSaving ? faPlus : faCircleNotch}
              spin={isSaving}
            />
            <span className="ms-2">Add</span>
          </button>
        </div>

        <div>Color</div>
        <div>
          {Object.values(TodoColor).map((c) => (
            <button
              key={c}
              className={`btn btn-sm btn-dark bg-${c} me-2 mb-2`}
              onClick={() => setColor(c)}
              disabled={isSaving}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="name">Title</label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Enter title..."
            disabled={isSaving}
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            placeholder="Enter description..."
            disabled={isSaving}
          />
        </div>
      </div>
    </div>
  );
});

export default NewTodo;
