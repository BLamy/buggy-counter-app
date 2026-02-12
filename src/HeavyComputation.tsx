import { useState } from 'react';
import { Play, Loader2 } from 'lucide-react';

function HeavyComputation() {
  const [result, setResult] = useState<number | null>(null);
  const [isComputing, setIsComputing] = useState(false);

  // BUG: This runs on the main thread and blocks the UI
  // causing dropped frames and unresponsive interface
  const fibonacci = (n: number): number => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  const runHeavyCalculation = () => {
    setIsComputing(true);
    setResult(null);

    // BUG: Synchronous heavy computation blocks the main thread
    // The spinning animation will freeze during calculation
    const startTime = performance.now();
    const fib = fibonacci(44); // This takes several seconds
    const endTime = performance.now();

    console.log(`Calculation took ${(endTime - startTime).toFixed(2)}ms`);
    setResult(fib);
    setIsComputing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
        Heavy Calc
      </h1>
      <p className="text-center text-sm text-gray-500 mb-8">
        Watch the spinner freeze when calculating
      </p>

      {/* This animation should be smooth but will freeze during calculation */}
      <div className="flex justify-center mb-8">
        <div className="relative w-32 h-32">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>

          {/* Inner spinning ring (opposite direction) */}
          <div className="absolute inset-4 border-4 border-orange-100 rounded-full"></div>
          <div
            className="absolute inset-4 border-4 border-transparent border-t-orange-400 rounded-full animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '0.75s' }}
          ></div>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isComputing ? (
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            ) : (
              <span className="text-2xl font-bold text-orange-500">
                {result !== null ? '✓' : 'fib'}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={runHeavyCalculation}
        disabled={isComputing}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg p-4 flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl mb-6"
      >
        <Play size={24} />
        Calculate Fibonacci(44)
      </button>

      {result !== null && (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-center">
          <p className="text-sm text-orange-100 mb-1">Result</p>
          <p className="text-2xl font-bold text-white font-mono">
            {result.toLocaleString()}
          </p>
        </div>
      )}

      {result === null && (
        <div className="bg-gray-100 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">
            Click the button to start a heavy calculation.
            <br />
            Notice how the spinners freeze!
          </p>
        </div>
      )}

      <div className="mt-6 text-center text-xs text-gray-400">
        <p>The UI freezes because the calculation runs on the main thread</p>
      </div>
    </div>
  );
}

export default HeavyComputation;
