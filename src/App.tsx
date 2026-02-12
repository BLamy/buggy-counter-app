import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

function App() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
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
    </div>
  );
}

export default App;
