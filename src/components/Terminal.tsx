import React, { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  onClose?: () => void;
}

interface CommandHistory {
  command: string;
  output: string[];
  timestamp: Date;
}

export const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: [
        'Welcome to PortOS Terminal v1.0',
        'Type "help" to see available commands.',
        ''
      ],
      timestamp: new Date()
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    let output: string[] = [];

    switch (cmd) {
      case '':
        output = [''];
        break;
      case 'help':
        output = [
          'Available commands:',
          '  help        - Show this help message',
          '  clear       - Clear the terminal',
          '  ls          - List files and directories',
          '  pwd         - Print working directory',
          '  whoami      - Display current user',
          '  date        - Display current date and time',
          '  echo <text> - Display text',
          '  portfolio   - View portfolio information',
          '  skills      - Display technical skills',
          '  contact     - Show contact information',
          '  neofetch    - Display system information',
          ''
        ];
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'ls':
        output = [
          'Desktop/',
          'Documents/',
          'Downloads/',
          'Pictures/',
          'Portfolio/',
          'Projects/',
          'README.md',
          ''
        ];
        break;
      case 'pwd':
        output = ['/Users/sanket-bharadwaj', ''];
        break;
      case 'whoami':
        output = ['sanket-bharadwaj', ''];
        break;
      case 'date':
        output = [new Date().toString(), ''];
        break;
      case 'portfolio':
        output = [
          '🚀 Sanket Bharadwaj - Full Stack Developer',
          '',
          '📍 Portfolio: https://sanketbharadwaj.vercel.app',
          '💼 GitHub: https://github.com/Sanket-Bharadwaj',
          '🔗 LinkedIn: https://linkedin.com/in/sanket-bharadwaj',
          '',
          'Passionate about creating innovative web solutions',
          'and building scalable applications.',
          ''
        ];
        break;
      case 'skills':
        output = [
          '🛠️ Technical Skills:',
          '',
          'Frontend: React, TypeScript, Tailwind CSS, Next.js',
          'Backend: Node.js, Express, MongoDB, PostgreSQL',
          'Tools: Git, Docker, AWS, Vercel',
          'Languages: JavaScript, TypeScript, Python, Java',
          ''
        ];
        break;
      case 'contact':
        output = [
          '📧 Contact Information:',
          '',
          'Email: sanket@friday.com',
          'LinkedIn: https://linkedin.com/in/sanket-bharadwaj',
          'GitHub: https://github.com/Sanket-Bharadwaj',
          'Portfolio: https://sanketbharadwaj.vercel.app',
          ''
        ];
        break;
      case 'neofetch':
  output = [
    '                 ,--./,-.                      sanket-bharadwaj@PortOS',
    '                / #     \\                     ─────────────────────────',
    '               |         |                    OS: PortOS v1.0',
    '                \\       /                     Host: MacBook Pro (Web)',
    '                 `._,._.\'                     Kernel: React 18.3.1',
    '                                                Uptime: ' + Math.floor(performance.now() / 1000) + ' seconds',
    '                                                Packages: TypeScript, Vite, Tailwind',
    '                                                Shell: PortOS Terminal',
    '                                                Theme: Material Design 3',
    '                                                Terminal: PortOS Terminal v1.0',
    ''
  ];
  break;

      default:
        if (cmd.startsWith('echo ')) {
          output = [cmd.substring(5), ''];
        } else {
          output = [`Command not found: ${cmd}`, 'Type "help" for available commands.', ''];
        }
    }

    const newEntry: CommandHistory = {
      command,
      output,
      timestamp: new Date()
    };

    setHistory(prev => [...prev, newEntry]);
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic tab completion for common commands
      const commands = ['help', 'clear', 'ls', 'pwd', 'whoami', 'date', 'echo', 'portfolio', 'skills', 'contact', 'neofetch'];
      const matches = commands.filter(cmd => cmd.startsWith(currentInput.toLowerCase()));
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      }
    }
  };

  return (
    <div className="h-full bg-gray-900 text-green-400 font-mono text-sm overflow-hidden flex flex-col">
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 space-y-1"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, index) => (
          <div key={index}>
            {entry.command !== 'welcome' && (
              <div className="flex items-center">
                <span className="text-blue-400">sanket-bharadwaj@PortOS</span>
                <span className="text-white mx-1">:</span>
                <span className="text-yellow-400">~</span>
                <span className="text-white mx-1">$</span>
                <span className="text-white">{entry.command}</span>
              </div>
            )}
            {entry.output.map((line, lineIndex) => (
              <div key={lineIndex} className="text-gray-300 whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>
        ))}
        
        {/* Current input line */}
        <div className="flex items-center">
          <span className="text-blue-400">sanket-bharadwaj@PortOS</span>
          <span className="text-white mx-1">:</span>
          <span className="text-yellow-400">~</span>
          <span className="text-white mx-1">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-white flex-1 font-mono"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};
