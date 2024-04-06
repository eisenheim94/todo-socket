import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ITodo, TodoColor } from '../types/common.types';
import { useStores } from '@hooks/useStores';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { toast } from 'react-toastify';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import validateTodo from '@helpers/validateTodo';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { useNavigate } from 'react-router-dom';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';

interface ITodoItemProps {
  item: ITodo;
  isQuickView?: boolean;
}

const TodoItem = observer(({ item, isQuickView = true }: ITodoItemProps) => {
  const { todoStore } = useStores();
  const { _id, name, description, progress } = item;
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const isProcessing = useMemo(
    () => isSaving || isDeleting,
    [isSaving, isDeleting],
  );

  const isEditing = useMemo(() => {
    return todoStore.isEditing === _id;
  }, [todoStore.isEditing, _id]);

  const startEditing = () => {
    if (todoStore.isEditing) {
      toast.error('Please save or cancel the current editing todo.');
      return;
    }
    setNewDescription(description);
    todoStore.setIsEditing(_id);
  };

  const handleCancelEdit = () => {
    if (!isEditing) return;
    todoStore.setIsEditing('');
  };

  const handleSave = () => {
    if (!validateTodo(name, true) || !validateTodo(newDescription)) return;

    setIsSaving(true);
    todoStore
      .updateTodo({
        _id,
        name: newName,
        description: newDescription,
        progress,
      })
      .then(() => {
        toast.success('Updated todo!');
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleDelete = () => {
    if (confirm('Are you sure?')) {
      setIsDeleting(true);
      todoStore
        .deleteTodo(_id)
        .then(() => {
          toast.success('Deleted todo!');
          navigate('/');
        })
        .finally(() => {
          setIsDeleting(false);
        });
    }
  };

  const handleNavigate = () => {
    if (!isQuickView) return;
    navigate(`/view/${_id}`);
  };

  const badgeColor = useMemo(() => {
    if (progress < 10) return 'danger';
    if (progress < 20) return 'warning';
    return 'success';
  }, [progress]);

  const bgColor = useMemo(() => {
    const parts = _id.split('-');
    if (
      parts.length > 1 &&
      Object.values(TodoColor).includes(parts[0] as TodoColor)
    ) {
      return parts[0];
    }
    return TodoColor.TEAL;
  }, [_id]);

  return (
    <div
      className={`${isQuickView ? 'card cur-pointer' : 'ht-100p p-3'} mb-3 bg-${bgColor} tx-white ${isEditing && 'border-warning'}`}
      onClick={handleNavigate}
    >
      <div className="card-body">
        {!isQuickView && (
          <button
            className="btn btn-outline-light tx-white btn-sm mb-4"
            onClick={() => navigate('/')}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className="ms-2">Back to Home</span>
          </button>
        )}
        <div className="d-flex justify-content-end align-items-center">
          {!isEditing && <h4 className="me-auto">{name}</h4>}
          {isEditing && (
            <div className="me-auto wd-100p pe-3">
              <input
                type="text"
                className="form-control wd-100p"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                disabled={isProcessing}
                placeholder="Title..."
              />
            </div>
          )}

          {!isEditing && (
            <>
              {isQuickView && (
                <button
                  className="btn btn-primary btn-sm tx-12"
                  onClick={startEditing}
                  disabled={isProcessing}
                >
                  <FontAwesomeIcon icon={faEye} />
                  <span className="ms-2">View</span>
                </button>
              )}
              {!isQuickView && (
                <button
                  className="btn btn-primary btn-sm wd-30 tx-12"
                  onClick={startEditing}
                  disabled={isProcessing}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              )}
              <button
                className="btn btn-danger btn-sm wd-30 tx-12 ms-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isProcessing}
              >
                <FontAwesomeIcon
                  icon={!isDeleting ? faTrash : faCircleNotch}
                  spin={isDeleting}
                />
              </button>
            </>
          )}
          {isEditing && (
            <>
              <button
                className="btn btn-primary btn-sm wd-30 tx-12"
                onClick={handleSave}
                disabled={isProcessing}
              >
                <FontAwesomeIcon
                  icon={!isSaving ? faSave : faCircleNotch}
                  spin={isSaving}
                />
              </button>
              <button
                className="btn btn-secondary btn-sm wd-30 tx-12 ms-2"
                onClick={() => {
                  handleCancelEdit();
                  setNewDescription(description);
                }}
                disabled={isProcessing}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </>
          )}
        </div>

        <div className={`px-2 badge my-2 bg-${badgeColor}`}>
          Progress: {progress}
        </div>

        {!isEditing && !isQuickView && <div>{description}</div>}
        {isEditing && (
          <textarea
            className="form-control"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            disabled={isProcessing}
            placeholder="Description..."
          />
        )}
      </div>
    </div>
  );
});

export default TodoItem;
