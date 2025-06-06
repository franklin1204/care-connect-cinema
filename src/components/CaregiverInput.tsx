
import { useState } from 'react';
import { Send, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface CaregiverInputProps {
  onSendVideo: (videoTitle: string) => void;
}

const CaregiverInput = ({ onSendVideo }: CaregiverInputProps) => {
  const [videoLink, setVideoLink] = useState('');

  const handleSendVideo = () => {
    if (videoLink.trim()) {
      // Extract a title from the URL or use the URL itself
      const videoTitle = extractVideoTitle(videoLink);
      onSendVideo(videoTitle);
      setVideoLink('');
    }
  };

  const extractVideoTitle = (url: string) => {
    // Simple title extraction logic
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'YouTube Video';
    } else if (url.includes('netflix.com')) {
      return 'Netflix Show';
    } else if (url.includes('vimeo.com')) {
      return 'Vimeo Video';
    } else {
      return url.length > 30 ? url.substring(0, 30) + '...' : url;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendVideo();
    }
  };

  return (
    <Card className="p-6 bg-white shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Link className="w-5 h-5 mr-2 text-blue-500" />
        Send Video Link
      </h3>
      
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <strong>Caregiver Mode:</strong> Enter a video link to send to the elder's device
          </p>
        </div>

        <div className="flex space-x-3">
          <Input
            type="url"
            placeholder="Enter video URL (YouTube, Netflix, etc.)"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            onClick={handleSendVideo}
            disabled={!videoLink.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6"
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>

        <div className="text-xs text-gray-500">
          Supported: YouTube, Netflix, Vimeo, or any video URL
        </div>
      </div>
    </Card>
  );
};

export default CaregiverInput;
