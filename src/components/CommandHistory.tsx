
import { Clock, Radio } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Command {
  id: string;
  command: string;
  timestamp: Date;
  from: string;
}

interface CommandHistoryProps {
  commands: Command[];
}

const CommandHistory = ({ commands }: CommandHistoryProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getCommandIcon = (command: string) => {
    switch (command) {
      case 'play':
        return '▶️';
      case 'stop':
        return '⏹️';
      case 'volume':
        return '🔊';
      case 'video_received':
        return '📺';
      default:
        return '📡';
    }
  };

  return (
    <Card className="p-6 bg-white shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Radio className="w-5 h-5 mr-2 text-blue-500" />
        Recent Commands
      </h3>
      
      <div className="space-y-3">
        {commands.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No commands received yet</p>
          </div>
        ) : (
          commands.map((command) => (
            <div 
              key={command.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getCommandIcon(command.command)}</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {command.from}
                  </p>
                  <p className="text-xs text-gray-600 capitalize">
                    {command.command.replace('_', ' ')}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {formatTime(command.timestamp)}
              </span>
            </div>
          ))
        )}
      </div>

      {commands.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Commands are received in real-time from your caregiver
          </p>
        </div>
      )}
    </Card>
  );
};

export default CommandHistory;
