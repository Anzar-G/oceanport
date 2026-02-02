import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Download, Share2, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
  className?: string;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  url,
  size = 200,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      if (canvasRef.current && url) {
        try {
          await QRCode.toCanvas(canvasRef.current, url, {
            width: size,
            margin: 2,
            color: {
              dark: '#00D9FF', // Cyan glow color
              light: '#0A1628', // Navy base color
            },
          });
          
          // Also generate data URL for download
          const dataUrl = await QRCode.toDataURL(url, {
            width: size,
            margin: 2,
            color: {
              dark: '#00D9FF',
              light: '#0A1628',
            },
          });
          setQrDataUrl(dataUrl);
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      }
    };

    generateQR();
  }, [url, size]);

  const handleDownload = () => {
    if (qrDataUrl) {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = qrDataUrl;
      link.click();
      toast.success('QR Code downloaded!');
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('URL copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Link Hub',
          url: url,
        });
      } catch (error) {
        // Fallback to copy
        handleCopyUrl();
      }
    } else {
      handleCopyUrl();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-card rounded-xl p-6 ${className}`}
    >
      <div className="text-center">
        <h3 className="text-white text-lg font-bold mb-4">QR Code</h3>
        
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white rounded-xl">
            <canvas
              ref={canvasRef}
              className="block"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
        
        <p className="text-gray-cool text-sm mb-4">
          Scan to visit your link hub
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex-1"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex-1"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyUrl}
            className="flex-1"
          >
            <Copy className="w-4 h-4" />
            Copy URL
          </Button>
        </div>
      </div>
    </motion.div>
  );
};