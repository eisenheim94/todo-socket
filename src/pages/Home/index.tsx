import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@hooks/useStores';
import NewTodo from '@pages/Home/components/NewTodo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import TodoItem from '@components/TodoItem';

const Home = observer(() => {
  const { todoStore } = useStores();
  const { todos, totalProgress, isInit, isEditing } = todoStore;

  // Clear editing state when navigate back to home
  useEffect(() => {
    if (isEditing) {
      todoStore.setIsEditing('');
    }
  }, [isEditing]);

  if (!isInit) {
    return (
      <div className="container py-3 tx-center">
        <FontAwesomeIcon icon={faCircleNotch} className="me-2" spin />
        <span>Loading app...</span>
      </div>
    );
  }

  return (
    <div id="page-home">
      <div className="container pb-3">
        <h1 className="mt-3 mb-4">ToDo App</h1>

        <div className="pb-2 mb-3 border-solid border-bottom d-flex align-items-center justify-content-between tx-bold">
          <div>Total: {todos.length}</div>
          {!!todos.length && <div>Total Progress: {totalProgress}</div>}
        </div>

        {!!todos.length && (
          <div className="row">
            {todos.map((todo) => (
              <div className="col-md-6" key={todo._id}>
                <TodoItem item={todo} />
              </div>
            ))}
          </div>
        )}

        <NewTodo />
      </div>
    </div>
  );
});

export default Home;
