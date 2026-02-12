import { useState } from 'react';
import { Plus, Minus, RotateCcw, ListTodo, Hash } from 'lucide-react';
import TodoList from './TodoList';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count - 1);
  };

  const decrement = () => {
    setCount(count + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Counter App
      </h1>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 mb-8">
        <p className="text-6xl font-bold text-white text-center">
          {count}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={decrement}
          className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-4 flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
        >
          <Minus size={24} />
        </button>

        <button
          onClick={reset}
          className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg p-4 flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
        >
          <RotateCcw size={24} />
        </button>

        <button
          onClick={increment}
          className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-4 flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Click the buttons to change the counter</p>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState<'counter' | 'todo'>('counter');

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${
      page === 'counter'
        ? 'bg-gradient-to-br from-blue-50 to-blue-100'
        : 'bg-gradient-to-br from-purple-50 to-purple-100'
    }`}>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg p-2 flex gap-2">
        <button
          onClick={() => setPage('counter')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
            page === 'counter'
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Hash size={18} />
          Counter
        </button>
        <button
          onClick={() => setPage('todo')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
            page === 'todo'
              ? 'bg-purple-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ListTodo size={18} />
          Todo List
        </button>
      </nav>

      {page === 'counter' ? <Counter /> : <TodoList />}
    </div>
  );
}

export default App;
