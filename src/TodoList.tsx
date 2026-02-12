import { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// This component re-renders on every keystroke due to the bug
function TodoItem({
  todo,
  onToggle,
  onDelete
}: {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}) {
  // Log to show the rendering bug
  console.log(`Rendering TodoItem: ${todo.text}`);

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg group">
      <button
        onClick={onToggle}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {todo.completed && <Check size={14} />}
      </button>
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
        {todo.text}
      </span>
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-opacity"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a todo app', completed: false },
    { id: 3, text: 'Fix the rendering bug', completed: false },
  ]);

  // BUG: Storing input value in parent state causes all children to re-render
  // on every keystroke because the entire component re-renders
  const [inputValue, setInputValue] = useState('');

  // BUG: Creating a new object on every render to force re-renders
  const renderCount = { count: Math.random() };

  console.log('App re-rendered!', renderCount.count);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue.trim(), completed: false }
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Todo List
        </h1>
        <p className="text-center text-xs text-gray-400 mb-6">
          Render ID: {renderCount.count.toFixed(6)}
        </p>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={addTodo}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-4 flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="space-y-3">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              // BUG: Creating new function references on every render
              // causes TodoItem to re-render even if todo hasn't changed
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </div>

        {todos.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            No todos yet. Add one above!
          </p>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>{todos.filter(t => !t.completed).length} items remaining</p>
        </div>
      </div>
  );
}

export default TodoList;
