import { useEffect, useRef } from 'react';

const AudioWaveform = ({ audioFile }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (audioFile) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      const reader = new FileReader();
      reader.onload = async (e) => {
        const audioBuffer = await audioContext.decodeAudioData(e.target.result);
        const data = audioBuffer.getChannelData(0);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        const step = Math.ceil(data.length / canvas.width);
        for (let i = 0; i < canvas.width; i++) {
          const x = i;
          const y = (1 + data[i * step]) * canvas.height / 2;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = '#3b82f6';
        ctx.stroke();
      };

      reader.readAsArrayBuffer(audioFile);
    }
  }, [audioFile]);

  return <canvas ref={canvasRef} className="w-full h-32 bg-gray-200 rounded" />;
};

export default AudioWaveform;
