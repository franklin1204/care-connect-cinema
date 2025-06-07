import { useState, useRef, useEffect} from 'react';
import { Play, Pause, Square, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { timeStamp } from 'console';

interface VideoPlayerProps {
  currentVideo: string | null;
  setIsPlaying: (isPlaying) => void;
  isPlaying: boolean;
  isStop: boolean;
  setIsStop: (isStop) => void;
  isConnected: boolean
  setIsConnected: (isConnected) => void;
  currentPosition: number;
  onVolumeChange: (volume: number) => void;
}

const VideoPlayer = ({ currentVideo, isPlaying, setIsPlaying, isStop, setIsStop, onVolumeChange, currentPosition, setIsConnected }: VideoPlayerProps) => {
  const [volume, setVolume] = useState([75]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ws = useRef<WebSocket | null>(null)  
  const websocket_server = import.meta.env.VITE_WEBSOCKET_SERVER;
  console.log("websocker_server:", websocket_server);
  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket(websocket_server);

    ws.current.onopen = () => {
      console.log('WebSocket Connection Opened');
      setIsConnected(true);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket Error', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket Connection Closed');
      setIsConnected(false);
    };

    return () => {
      // Cleanup: close WebSocket connection when component unmounts
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);
  

  useEffect(() => {
    const message = {
      isPlaying,
      isStop,
      videoLink: currentVideo,
      currentPosition: videoRef.current ? videoRef.current.currentTime : 0,
    }
    console.log("send message: ", message);
    const sendData = (data: any) => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(data));
      }
    };
    sendData(message);
  }, [isPlaying, isStop, currentVideo]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setIsStop(false);
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsStop(!isStop);
      // onStop();
      // setIsPlaying(false);
    }
    
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    onVolumeChange(newVolume[0]);
    if (videoRef.current) {
      videoRef.current.volume = newVolume[0] / 100;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Video Display Area */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 aspect-video flex items-center justify-center">
        {currentVideo ? (
          <video 
            ref={videoRef}
            src={currentVideo} 
            // controls 
            // autoPlay={isPlaying}
            className="w-full h-full object-cover"
            // style={{ display: isPlaying ? 'block' : 'none' }}
          >
            Your browser does not support the video tag.
          </video>
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
              onClick={handlePlayPause}
              disabled={!currentVideo}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-6 h-6 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 mr-2" />
                  Play
                </>
              )}

            </Button>
            <Button
              onClick={handleStop}
              disabled={!currentVideo}
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-2"
            >
              <Square className="w-6 h-6 mr-2" />
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
