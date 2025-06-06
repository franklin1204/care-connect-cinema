
import { useState } from 'react';
import { Play, Stop, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface VideoPlayerProps {
  currentVideo: string | null;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
  onVolumeChange: (volume: number) => void;
}

const VideoPlayer = ({ currentVideo, isPlaying, onPlay, onStop, onVolumeChange }: VideoPlayerProps) => {
  const [volume, setVolume] = useState([75]);

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    onVolumeChange(newVolume[0]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Video Display Area */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 aspect-video flex items-center justify-center">
        {currentVideo ? (
          <div className="text-center text-white p-8">
            <div className="text-6xl mb-4">
              {isPlaying ? '▶️' : '⏸️'}
            </div>
            <h2 className="text-2xl font-semibold mb-2">{currentVideo}</h2>
            <p className="text-gray-300">
              {isPlaying ? 'Now Playing' : 'Paused'}
            </p>
            
            {/* Simulated progress bar */}
            {isPlaying && (
              <div className="mt-6 max-w-md mx-auto">
                <div className="bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full animate-pulse"
                    style={{ width: '35%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>8:45</span>
                  <span>25:30</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-400 p-8">
            <div className="text-6xl mb-4">📺</div>
            <h2 className="text-xl font-medium mb-2">Waiting for Video</h2>
            <p>Your caregiver will send you something to watch</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-6 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={onPlay}
              disabled={!currentVideo}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
            >
              <Play className="w-6 h-6 mr-2" />
              Play
            </Button>
            <Button
              onClick={onStop}
              disabled={!currentVideo}
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-2"
            >
              <Stop className="w-6 h-6 mr-2" />
              Stop
            </Button>
          </div>
          
          <div className="flex items-center space-x-3 min-w-[200px]">
            <Volume2 className="w-5 h-5 text-gray-600" />
            <Slider
              value={volume}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 min-w-[3ch]">{volume[0]}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
