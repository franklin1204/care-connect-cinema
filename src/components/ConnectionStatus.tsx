
import { Wifi, WifiOff, User } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
}

const ConnectionStatus = ({ isConnected }: ConnectionStatusProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
        isConnected 
          ? 'bg-green-100 text-green-700 border border-green-200' 
          : 'bg-red-100 text-red-700 border border-red-200'
      }`}>
        {isConnected ? (
          <Wifi className="w-4 h-4" />
        ) : (
          <WifiOff className="w-4 h-4" />
        )}
        <span className="text-sm font-medium">
          {isConnected ? 'Connected' : 'Connecting...'}
        </span>
      </div>
      
      {isConnected && (
        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full border border-blue-200">
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">Caregiver</span>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;
