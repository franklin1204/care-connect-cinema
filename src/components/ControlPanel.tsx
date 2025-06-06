
import { Play, Stop, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ControlPanelProps {
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
  currentVideo: string | null;
}

const ControlPanel = ({ isPlaying, onPlay, onStop, currentVideo }: ControlPanelProps) => {
  return (
    <Card className="p-6 bg-white shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Wifi className="w-5 h-5 mr-2 text-blue-500" />
        Remote Controls
      </h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Current Status:</p>
          <p className="font-medium text-gray-800">
            {currentVideo ? (isPlaying ? 'Playing' : 'Paused') : 'No video loaded'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button
            onClick={onPlay}
            disabled={!currentVideo}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg"
          >
            <Play className="w-6 h-6 mr-2" />
            Play Video
          </Button>
          
          <Button
            onClick={onStop}
            disabled={!currentVideo}
            variant="outline"
            className="w-full py-6 text-lg border-2"
          >
            <Stop className="w-6 h-6 mr-2" />
            Stop Video
          </Button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <strong>Tip:</strong> Your caregiver can control playback remotely. 
            You can also use these buttons if needed.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ControlPanel;
