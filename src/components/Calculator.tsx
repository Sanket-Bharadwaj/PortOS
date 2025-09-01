import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CalculatorProps {
  onClose?: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onClose }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performOperation();

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const performOperation = () => {
    const prev = previousValue || 0;
    const current = parseFloat(display);
    
    switch (operation) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return current !== 0 ? prev / current : 0;
      case '%':
        return prev % current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const newValue = performOperation();
      const calculation = `${previousValue} ${operation} ${display} = ${newValue}`;
      
      setHistory(prev => [...prev, calculation].slice(-10)); // Keep last 10 calculations
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleAllClear = () => {
    handleClear();
    setHistory([]);
  };

  const handlePlusMinus = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const buttons = [
    [
      { label: 'AC', action: handleAllClear, className: 'bg-gray-500 hover:bg-gray-400 text-white' },
      { label: 'C', action: handleClear, className: 'bg-gray-500 hover:bg-gray-400 text-white' },
      { label: '±', action: handlePlusMinus, className: 'bg-gray-500 hover:bg-gray-400 text-white' },
      { label: '÷', action: () => inputOperation('÷'), className: 'bg-orange-500 hover:bg-orange-400 text-white' }
    ],
    [
      { label: '7', action: () => inputNumber('7'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
      { label: '8', action: () => inputNumber('8'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
      { label: '9', action: () => inputNumber('9'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
      { label: '×', action: () => inputOperation('×'), className: 'bg-orange-500 hover:bg-orange-400 text-white' }
    ],
    [
      { label: '4', action: () => inputNumber('4'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
      { label: '5', action: () => inputNumber('5'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
      { label: '6', action: () => inputNumber('6'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
      { label: '-', action: () => inputOperation('-'), className: 'bg-orange-500 hover:bg-orange-400 text-white' }
    ],
    [
      { label: '1', action: () => inputNumber('1'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
      { label: '2', action: () => inputNumber('2'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
      { label: '3', action: () => inputNumber('3'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
      { label: '+', action: () => inputOperation('+'), className: 'bg-orange-500 hover:bg-orange-400 text-white' }
    ],
    [
      { label: '0', action: () => inputNumber('0'), className: 'bg-gray-700 hover:bg-gray-600 text-white col-span-2' },
      { label: '.', action: () => inputNumber('.'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
      { label: '=', action: handleEquals, className: 'bg-orange-500 hover:bg-orange-400 text-white' }
    ]
  ];

  return (
    <div className="h-full w-full bg-black text-white flex">
      {/* History Panel */}
      <div className="w-64 bg-gray-900 border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-medium text-gray-300">History</h3>
        </div>
        <ScrollArea className="h-[calc(100%-60px)]">
          <div className="p-2 space-y-1">
            {history.length === 0 ? (
              <p className="text-gray-500 text-xs p-2">No calculations yet</p>
            ) : (
              history.map((calc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-gray-300 p-2 hover:bg-gray-800 rounded cursor-pointer font-mono"
                  onClick={() => {
                    const result = calc.split(' = ')[1];
                    if (result) setDisplay(result);
                  }}
                >
                  {calc}
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Calculator */}
      <div className="flex-1 flex flex-col max-w-md mx-auto">
        {/* Display */}
        <div className="flex-1 bg-black p-6 flex items-end justify-end">
          <motion.div
            key={display}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="text-right text-5xl font-light text-white overflow-hidden"
          >
            {display.length > 10 ? parseFloat(display).toExponential(5) : display}
          </motion.div>
        </div>

        {/* Operation indicator */}
        {operation && (
          <div className="px-6 py-2 text-right text-orange-400 text-lg">
            {previousValue} {operation}
          </div>
        )}

        {/* Buttons */}
        <div className="p-4 grid grid-cols-4 gap-2">
          {buttons.map((row, rowIndex) =>
            row.map((button, colIndex) => (
              <motion.button
                key={`${rowIndex}-${colIndex}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={button.action}
                className={`
                  h-16 rounded-full text-xl font-medium transition-all duration-150
                  shadow-lg hover:shadow-xl active:shadow-inner
                  ${button.className}
                  ${button.label === '0' ? 'col-span-2' : ''}
                `}
              >
                {button.label}
              </motion.button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};