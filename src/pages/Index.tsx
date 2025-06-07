
import { useState, useEffect, useRef } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import ControlPanel from '@/components/ControlPanel';
import ConnectionStatus from '@/components/ConnectionStatus';
// import CommandHistory from '@/components/CommandHistory';
import CaregiverInput from '@/components/CaregiverInput';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStop, setIsStop] = useState(false);
  const [commands, setCommands] = useState<Array<{id: string, command: string, timestamp: Date, from: string}>>([]);

  useEffect(() => {
    // This effect will run whenever isPlaying changes
    if (isStop) {
      addCommand("stop", "Stop command from caregiver");
    } else {
      if(isPlaying) addCommand("play", "Play command from caregiver");
      else addCommand("Pause", "Pause command from caregiver");
    }
  }, [isPlaying, isStop]);

  const addCommand = (command: string, description: string) => {
    const newCommand = {
      id: Date.now().toString(),
      command,
      timestamp: new Date(),
      from: description
    };
    setCommands(prev => [newCommand, ...prev.slice(0, 4)]);
  };

  const handleSendVideo = (videoTitle: string) => {
    setCurrentVideo(videoTitle);
    setIsPlaying(false);
    addCommand("video_received", `Video link received: ${videoTitle}`);
  };

  const handleVolumeChange = (volume: number) => {
    addCommand("volume", `Volume set to ${volume}% by caregiver`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">CC</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Care Connect Cinema</h1>
              <p className="text-sm text-gray-600">Remote Media Control System</p>
            </div>
          </div>
          <ConnectionStatus isConnected={isConnected} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <VideoPlayer 
              currentVideo={currentVideo}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              isStop={isStop}
              currentPosition={0}
              setIsStop={setIsStop}
              isConnected={isConnected}
              setIsConnected={setIsConnected}
              onVolumeChange={handleVolumeChange}
            />
          </div>
          
          {/* Control Panel & Command History */}
          <div className="space-y-6">
            <CaregiverInput onSendVideo={handleSendVideo} />
            <ControlPanel 
              isPlaying={isPlaying}
              isStop={isStop}
              currentVideo={currentVideo}
            />
            {/* <CommandHistory commands={commands} /> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/50 backdrop-blur-sm border-t border-blue-100 px-6 py-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            Connected to Caregiver Network • Secure & Private
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
