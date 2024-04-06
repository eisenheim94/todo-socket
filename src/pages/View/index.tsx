import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@hooks/useStores';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import TodoItem from '@components/TodoItem';
import { useNavigate, useParams } from 'react-router-dom';
import { ITodo } from '../../types/common.types';

const View = observer(() => {
  const { todoStore } = useStores();
  const { todos, isInit } = todoStore;
  const params = useParams();
  const [todo, setTodo] = useState<ITodo>();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };

  useEffect(() => {
    if (!isInit) return;
    if (params?.id && todos.length) {
      const todo = todos.find((todo) => todo._id === params.id);
      if (todo) {
        setTodo(todo);
      } else {
        handleNavigate();
      }
    } else {
      handleNavigate();
    }
  }, [isInit, params, todos]);

  if (!isInit || !todo) {
    return (
      <div className="container py-3 tx-center">
        <FontAwesomeIcon icon={faCircleNotch} className="me-2" spin />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div id="page-todo-view" className="ht-100p">
      <TodoItem item={todo} isQuickView={false} />
    </div>
  );
});

export default View;
