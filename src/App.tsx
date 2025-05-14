import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import TodoList from './features/todos/TodoList';

function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default App;