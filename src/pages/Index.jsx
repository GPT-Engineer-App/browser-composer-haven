import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Waveform } from 'lucide-react';
import AudioWaveform from '../components/AudioWaveform';

const Index = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [pitch, setPitch] = useState(0);
  const [tempo, setTempo] = useState(100);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handlePitchChange = (value) => {
    setPitch(value[0]);
  };

  const handleTempoChange = (value) => {
    setTempo(value[0]);
  };

  const handleProcess = () => {
    // Here we would process the audio file
    console.log('Processing audio with pitch:', pitch, 'and tempo:', tempo);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Composers Desktop Project (Web Version)</h1>
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center space-x-2">
          <Waveform className="h-6 w-6" />
          <Input type="file" accept="audio/*" onChange={handleFileChange} />
        </div>
        {audioFile && <AudioWaveform audioFile={audioFile} />}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pitch Shift</label>
          <Slider
            min={-12}
            max={12}
            step={1}
            value={[pitch]}
            onValueChange={handlePitchChange}
          />
          <span className="text-sm text-gray-500">{pitch} semitones</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tempo Change</label>
          <Slider
            min={50}
            max={200}
            step={1}
            value={[tempo]}
            onValueChange={handleTempoChange}
          />
          <span className="text-sm text-gray-500">{tempo}%</span>
        </div>
        <Button onClick={handleProcess} disabled={!audioFile}>Process Audio</Button>
      </div>
    </div>
  );
};

export default Index;
