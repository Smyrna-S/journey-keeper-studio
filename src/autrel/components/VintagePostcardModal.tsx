import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  Share2,
  Copy,
  Check,
  Sparkles,
  Camera,
  Compass,
  Calendar,
  MapPin,
  RefreshCw,
  Printer,
  Upload,
  Layers,
  Heart,
  MessageCircle,
  Instagram
} from 'lucide-react';
import { Destination, JourneyEntry } from '../types';
import { useJourneyStore } from '../lib/journeyStore';
import { getDistrictCrest, DistrictCrestInfo } from '../lib/districtCrests';

interface VintagePostcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination | null;
  initialPhotoUri?: string;
  initialNote?: string;
}

type PostcardFormat = 'landscape' | 'portrait' | 'square';
type PostcardTheme = 'parchment' | 'terracotta' | 'indigo';

const NOTE_PRESETS = [
  "Greetings from Tamil Nadu! Stood beneath timeless granite pillars today. The evening light and ancient breeze here are truly unforgettable.",
  "Chasing the hidden gems of South India! The local filter coffee and warm smiles make this expedition pure magic.",
  "Off the beaten path in the Western Ghats. Pine-scented mist, roaring waterfalls, and serene mountain trails.",
  "Stamping my expedition passport with another wonder. Life is short and the world is wide—Tamil Nadu never ceases to amaze!",
];

export const VintagePostcardModal: React.FC<VintagePostcardModalProps> = ({
  isOpen,
  onClose,
  destination,
  initialPhotoUri,
  initialNote,
}) => {
  const { journey, stats } = useJourneyStore();

  // Find latest entry for destination to get any custom user photo proof
  const latestEntry = destination
    ? journey.slice().reverse().find((j) => j.id === destination.id)
    : null;

  const defaultPhoto = initialPhotoUri || latestEntry?.photoUri || destination?.image || '';

  const [activePhoto, setActivePhoto] = useState<string>(defaultPhoto);
  const [format, setFormat] = useState<PostcardFormat>('landscape');
  const [theme, setTheme] = useState<PostcardTheme>('parchment');
  const [explorerNote, setExplorerNote] = useState<string>(
    initialNote ||
      (destination
        ? `Greetings from ${destination.destination}! Exploring the heart of ${destination.district} District—the architectural mastery and serene atmosphere here are beyond words.`
        : NOTE_PRESETS[0])
  );
  const [expeditionDate, setExpeditionDate] = useState<string>(() => {
    const d = latestEntry?.timestamp ? new Date(latestEntry.timestamp) : new Date();
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  });
  const [showAirmailBorder, setShowAirmailBorder] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync destination updates
  useEffect(() => {
    if (destination) {
      const photo = initialPhotoUri || latestEntry?.photoUri || destination.image || '';
      setActivePhoto(photo);
      if (!initialNote) {
        setExplorerNote(
          `Greetings from ${destination.destination}! Exploring the heart of ${destination.district} District—the architectural mastery and serene atmosphere here are beyond words.`
        );
      }
    }
  }, [destination, initialPhotoUri, latestEntry?.photoUri]);

  const crestInfo: DistrictCrestInfo = destination
    ? getDistrictCrest(destination.district)
    : getDistrictCrest('Tamil Nadu');

  // Trigger feedback toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Helper to load image safely
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => {
        // Try without crossOrigin if base64 or relative
        const fallback = new Image();
        fallback.onload = () => resolve(fallback);
        fallback.onerror = (e) => reject(e);
        fallback.src = src;
      };
      img.src = src;
    });
  };

  // Render High-Resolution Postcard onto Canvas
  const renderCanvas = useCallback(async (): Promise<HTMLCanvasElement | null> => {
    if (!destination) return null;
    setIsGenerating(true);

    try {
      // Dimensions
      let width = 1200;
      let height = 800; // Landscape 3:2
      if (format === 'portrait') {
        width = 1080;
        height = 1350; // Instagram Portrait 4:5
      } else if (format === 'square') {
        width = 1080;
        height = 1080; // 1:1 Square
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Color palette based on theme
      const colors = {
        parchment: {
          bgFrom: '#FAF4EB',
          bgTo: '#F0E5D4',
          border: '#D8C6B0',
          textDark: '#3A281E',
          textMuted: '#785A48',
          accent: '#C1512F',
          stampBg: '#FFFDF9',
          inkBlue: '#1E3A8A',
          inkRed: '#991B1B',
        },
        terracotta: {
          bgFrom: '#FCF5EE',
          bgTo: '#EED9C7',
          border: '#C1512F',
          textDark: '#2C1B14',
          textMuted: '#6E4532',
          accent: '#C1512F',
          stampBg: '#FFFDF9',
          inkBlue: '#2A4365',
          inkRed: '#C1512F',
        },
        indigo: {
          bgFrom: '#F4F7FA',
          bgTo: '#DFE8F1',
          border: '#4A6572',
          textDark: '#1E293B',
          textMuted: '#475569',
          accent: '#0D9488',
          stampBg: '#FFFFFF',
          inkBlue: '#1E40AF',
          inkRed: '#B91C1C',
        },
      }[theme];

      // 1. BASE PARCHMENT BACKGROUND & PAPER TEXTURE
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, colors.bgFrom);
      bgGrad.addColorStop(1, colors.bgTo);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Fine aged paper grain overlay
      ctx.fillStyle = 'rgba(120, 90, 70, 0.025)';
      for (let i = 0; i < width; i += 8) {
        for (let j = 0; j < height; j += 8) {
          if ((i + j) % 16 === 0) {
            ctx.fillRect(i, j, 4, 4);
          }
        }
      }

      // Vignette shadow around outer edge
      const vigGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.4,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      vigGrad.addColorStop(0, 'transparent');
      vigGrad.addColorStop(1, 'rgba(80, 50, 30, 0.08)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. AIRMAIL PARALLELOGRAM BORDER (Classic 1950s Postal Edge)
      if (showAirmailBorder) {
        const stripeWidth = 26;
        const stripeHeight = 16;
        const borderPadding = 12;

        const drawAirmailEdge = () => {
          ctx.save();
          // Top & Bottom strips
          const countX = Math.floor((width - borderPadding * 2) / (stripeWidth * 2));
          for (let i = 0; i < countX; i++) {
            const x = borderPadding + i * (stripeWidth * 2);
            // Red top
            ctx.fillStyle = '#BA2D2D';
            ctx.beginPath();
            ctx.moveTo(x + 10, borderPadding);
            ctx.lineTo(x + stripeWidth + 10, borderPadding);
            ctx.lineTo(x + stripeWidth, borderPadding + stripeHeight);
            ctx.lineTo(x, borderPadding + stripeHeight);
            ctx.closePath();
            ctx.fill();

            // Blue top
            ctx.fillStyle = '#1D4ED8';
            ctx.beginPath();
            ctx.moveTo(x + stripeWidth + 10, borderPadding);
            ctx.lineTo(x + stripeWidth * 2 + 10, borderPadding);
            ctx.lineTo(x + stripeWidth * 2, borderPadding + stripeHeight);
            ctx.lineTo(x + stripeWidth, borderPadding + stripeHeight);
            ctx.closePath();
            ctx.fill();

            // Red bottom
            ctx.fillStyle = '#BA2D2D';
            ctx.beginPath();
            ctx.moveTo(x + 10, height - borderPadding - stripeHeight);
            ctx.lineTo(x + stripeWidth + 10, height - borderPadding - stripeHeight);
            ctx.lineTo(x + stripeWidth, height - borderPadding);
            ctx.lineTo(x, height - borderPadding);
            ctx.closePath();
            ctx.fill();

            // Blue bottom
            ctx.fillStyle = '#1D4ED8';
            ctx.beginPath();
            ctx.moveTo(x + stripeWidth + 10, height - borderPadding - stripeHeight);
            ctx.lineTo(x + stripeWidth * 2 + 10, height - borderPadding - stripeHeight);
            ctx.lineTo(x + stripeWidth * 2, height - borderPadding);
            ctx.lineTo(x + stripeWidth, height - borderPadding);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        };

        drawAirmailEdge();
      }

      // Inner double border frame
      const innerMargin = 34;
      ctx.strokeStyle = colors.border;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2);

      ctx.strokeStyle = colors.border;
      ctx.lineWidth = 1;
      ctx.strokeRect(innerMargin + 5, innerMargin + 5, width - (innerMargin + 5) * 2, height - (innerMargin + 5) * 2);

      // CORNER ORNAMENTS
      const drawCornerFlourish = (cx: number, cy: number, rot: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(16, 0);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 16);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(6, 6, 3, 0, Math.PI * 2);
        ctx.fillStyle = colors.accent;
        ctx.fill();
        ctx.restore();
      };

      drawCornerFlourish(innerMargin + 10, innerMargin + 10, 0);
      drawCornerFlourish(width - innerMargin - 10, innerMargin + 10, Math.PI / 2);
      drawCornerFlourish(width - innerMargin - 10, height - innerMargin - 10, Math.PI);
      drawCornerFlourish(innerMargin + 10, height - innerMargin - 10, (Math.PI * 3) / 2);

      // LAYOUT SPECIFICS ACCORDING TO FORMAT
      if (format === 'landscape') {
        // =====================================================================
        // LANDSCAPE POSTCARD (Classic 1200 x 800)
        // Left Half: Framed Explorer Photograph
        // Right Half: Postcard Header, Perforated Stamp, Notes & Addressee
        // =====================================================================

        // Vertical Center Divider Line with Postal Dashes
        const dividerX = 640;
        ctx.save();
        ctx.strokeStyle = colors.border;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 6]);
        ctx.beginPath();
        ctx.moveTo(dividerX, 55);
        ctx.lineTo(dividerX, height - 55);
        ctx.stroke();
        ctx.restore();

        // 3. LEFT SIDE: EXPLORER'S PHOTOGRAPH
        const photoX = 55;
        const photoY = 55;
        const photoW = 550;
        const photoH = 600;

        // Vintage Photo White Matting / Mount
        ctx.fillStyle = '#FFFDF9';
        ctx.shadowColor = 'rgba(60, 40, 30, 0.18)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 4;
        ctx.fillRect(photoX, photoY, photoW, photoH);
        ctx.shadowColor = 'transparent';

        ctx.strokeStyle = '#E2D5C5';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(photoX, photoY, photoW, photoH);

        // Photo Image area inside matting
        const imgInset = 16;
        const imgW = photoW - imgInset * 2;
        const imgH = photoH - 90; // room for caption below

        if (activePhoto) {
          try {
            const img = await loadImage(activePhoto);
            ctx.save();
            ctx.beginPath();
            ctx.rect(photoX + imgInset, photoY + imgInset, imgW, imgH);
            ctx.clip();

            // Aspect fit/cover
            const imgAspect = img.width / img.height;
            const targetAspect = imgW / imgH;
            let drawW = imgW;
            let drawH = imgH;
            let drawX = photoX + imgInset;
            let drawY = photoY + imgInset;

            if (imgAspect > targetAspect) {
              drawW = imgH * imgAspect;
              drawX = photoX + imgInset - (drawW - imgW) / 2;
            } else {
              drawH = imgW / imgAspect;
              drawY = photoY + imgInset - (drawH - imgH) / 2;
            }

            ctx.drawImage(img, drawX, drawY, drawW, drawH);

            // Subtle warm sepia tone overlay on the photo
            ctx.fillStyle = 'rgba(180, 110, 60, 0.08)';
            ctx.fillRect(photoX + imgInset, photoY + imgInset, imgW, imgH);
            ctx.restore();
          } catch {
            // Fallback decorative graphic if image fails to load
            ctx.fillStyle = '#EBE1D2';
            ctx.fillRect(photoX + imgInset, photoY + imgInset, imgW, imgH);
            ctx.fillStyle = colors.textMuted;
            ctx.font = 'bold 20px serif';
            ctx.textAlign = 'center';
            ctx.fillText(destination.destination, photoX + photoW / 2, photoY + imgH / 2);
          }
        }

        // Photo Caption in typewriter font
        ctx.fillStyle = colors.textDark;
        ctx.font = 'bold 15px "Courier New", Courier, monospace';
        ctx.textAlign = 'left';
        ctx.fillText(
          `FIG. 1: ${destination.destination.toUpperCase()}`,
          photoX + imgInset + 4,
          photoY + photoH - 45
        );

        ctx.fillStyle = colors.textMuted;
        ctx.font = 'italic 12px serif';
        ctx.fillText(
          `${destination.district} District · Verified Proof Stamp #${destination.coins} Coins`,
          photoX + imgInset + 4,
          photoY + photoH - 24
        );

        // Brass Photo Corner Mounts
        const drawPhotoCorner = (cx: number, cy: number, rot: number) => {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rot);
          ctx.fillStyle = '#9C784C';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(22, 0);
          ctx.lineTo(0, 22);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        };
        drawPhotoCorner(photoX + imgInset, photoY + imgInset, 0);
        drawPhotoCorner(photoX + imgInset + imgW, photoY + imgInset, Math.PI / 2);
        drawPhotoCorner(photoX + imgInset + imgW, photoY + imgInset + imgH, Math.PI);
        drawPhotoCorner(photoX + imgInset, photoY + imgInset + imgH, (Math.PI * 3) / 2);

        // 4. RIGHT SIDE: POSTCARD HEADER
        const rightX = 665;
        const rightW = width - rightX - 55;

        // Postcard Header Bar
        ctx.fillStyle = colors.textDark;
        ctx.font = '900 24px "Plus Jakarta Sans", serif';
        ctx.letterSpacing = '5px';
        ctx.textAlign = 'left';
        ctx.fillText('POST CARD', rightX, 85);

        ctx.fillStyle = colors.accent;
        ctx.font = 'bold 10px "Courier New", monospace';
        ctx.fillText('CARTE POSTALE · UNIVERSAL EXPEDITION UNION', rightX, 102);

        // 5. PERFORATED VINTAGE POSTAGE STAMP (Top Right of Right Half)
        const stampW = 120;
        const stampH = 150;
        const stampX = width - 55 - stampW - 10;
        const stampY = 55;

        // Draw Perforated Stamp
        ctx.save();
        ctx.fillStyle = colors.stampBg;
        ctx.fillRect(stampX, stampY, stampW, stampH);

        // Perforated scalloped teeth holes
        const holeRadius = 3.5;
        ctx.fillStyle = colors.bgFrom;
        // Top and bottom teeth
        for (let x = stampX + 8; x <= stampX + stampW - 8; x += 11) {
          ctx.beginPath();
          ctx.arc(x, stampY, holeRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, stampY + stampH, holeRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        // Left and right teeth
        for (let y = stampY + 8; y <= stampY + stampH - 8; y += 11) {
          ctx.beginPath();
          ctx.arc(stampX, y, holeRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(stampX + stampW, y, holeRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Stamp Inner Frame
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(stampX + 8, stampY + 8, stampW - 16, stampH - 16);

        // Stamp Header
        ctx.fillStyle = colors.textDark;
        ctx.font = 'bold 7.5px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('TAMIL NADU POST', stampX + stampW / 2, stampY + 22);

        // Stamp Center Emblem (Crest / Gopuram / Mountain)
        ctx.fillStyle = colors.accent;
        ctx.font = '32px serif';
        ctx.fillText(crestInfo.symbolEmoji, stampX + stampW / 2, stampY + 70);

        ctx.fillStyle = colors.textDark;
        ctx.font = '900 13px serif';
        ctx.fillText('₹ 50', stampX + stampW / 2, stampY + 98);

        ctx.fillStyle = colors.textMuted;
        ctx.font = 'bold 7px "Courier New", monospace';
        ctx.fillText(crestInfo.name.toUpperCase(), stampX + stampW / 2, stampY + 115);
        ctx.fillText('OFFICIAL CODEX', stampX + stampW / 2, stampY + 128);
        ctx.restore();

        // 6. RUBBER CANCELLATION STAMP (Postmark) Overlaid
        const postmarkX = stampX - 25;
        const postmarkY = stampY + 60;
        ctx.save();
        ctx.strokeStyle = colors.inkBlue;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.78;

        // Circular postmark rings
        ctx.beginPath();
        ctx.arc(postmarkX, postmarkY, 44, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(postmarkX, postmarkY, 40, 0, Math.PI * 2);
        ctx.stroke();

        // Circular date & district in postmark
        ctx.fillStyle = colors.inkBlue;
        ctx.font = '900 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(crestInfo.name.toUpperCase() + ' G.P.O.', postmarkX, postmarkY - 24);
        ctx.fillText(expeditionDate, postmarkX, postmarkY + 4);
        ctx.fillText('EXPEDITION POST', postmarkX, postmarkY + 24);

        // Wavy cancellation lines extending across the stamp
        ctx.beginPath();
        ctx.lineWidth = 1.8;
        for (let waveY = -18; waveY <= 18; waveY += 12) {
          ctx.moveTo(postmarkX + 44, postmarkY + waveY);
          for (let wx = postmarkX + 44; wx <= stampX + stampW + 10; wx += 20) {
            ctx.quadraticCurveTo(
              wx + 5,
              postmarkY + waveY - 5,
              wx + 10,
              postmarkY + waveY
            );
            ctx.quadraticCurveTo(
              wx + 15,
              postmarkY + waveY + 5,
              wx + 20,
              postmarkY + waveY
            );
          }
        }
        ctx.stroke();
        ctx.restore();

        // 7. DISTRICT CREST & MOTTO (Below Header)
        const crestY = 135;
        ctx.save();
        ctx.strokeStyle = colors.border;
        ctx.fillStyle = colors.bgFrom;
        ctx.lineWidth = 1.2;

        // Circular Seal Box
        ctx.beginPath();
        ctx.arc(rightX + 30, crestY + 20, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.font = '20px serif';
        ctx.textAlign = 'center';
        ctx.fillText(crestInfo.symbolEmoji, rightX + 30, crestY + 27);

        ctx.fillStyle = colors.textDark;
        ctx.font = '900 13px serif';
        ctx.textAlign = 'left';
        ctx.fillText(crestInfo.name.toUpperCase() + ' DISTRICT CREST', rightX + 64, crestY + 14);

        ctx.fillStyle = colors.accent;
        ctx.font = 'bold 8.5px "Courier New", monospace';
        ctx.fillText(`“${crestInfo.motto}”`, rightX + 64, crestY + 28);

        ctx.fillStyle = colors.textMuted;
        ctx.font = 'bold 8px monospace';
        ctx.fillText(`COORDINATES: ${crestInfo.coordinates} · PIN ${crestInfo.pinPrefix}`, rightX + 64, crestY + 42);
        ctx.restore();

        // 8. EXPLORER'S HANDWRITTEN NOTES AREA
        const notesY = 205;
        const notesW = 280;
        ctx.fillStyle = colors.textDark;
        ctx.font = 'italic 15px Georgia, serif';
        ctx.textAlign = 'left';

        // Word wrap explorer note
        const words = explorerNote.split(' ');
        let currentLine = '';
        let lineY = notesY + 20;
        const maxNoteLines = 8;
        let linesCount = 0;

        for (const word of words) {
          const testLine = currentLine + word + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > notesW && currentLine !== '') {
            ctx.fillText(currentLine, rightX, lineY);
            currentLine = word + ' ';
            lineY += 24;
            linesCount++;
            if (linesCount >= maxNoteLines) {
              currentLine += '...';
              break;
            }
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) {
          ctx.fillText(currentLine, rightX, lineY);
          lineY += 26;
        }

        // Explorer Signature
        ctx.fillStyle = colors.accent;
        ctx.font = 'bold 12px "Courier New", monospace';
        ctx.fillText(`— Explorer ${stats.rankTitle}`, rightX, lineY + 10);

        // 9. ADDRESSEE SECTION (Right Column of Right Half)
        const addrX = rightX + 300;
        const addrY = 250;
        const addrW = width - addrX - 60;

        // 4 Addressee horizontal writing lines
        ctx.strokeStyle = colors.border;
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(addrX, addrY + i * 36);
          ctx.lineTo(addrX + addrW, addrY + i * 36);
          ctx.stroke();
        }

        ctx.fillStyle = colors.textDark;
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('TO: Fellow Adventurers & Dreamers', addrX + 6, addrY - 6);
        ctx.font = '11px sans-serif';
        ctx.fillText('c/o AUTREL Expedition Codex', addrX + 6, addrY + 30);
        ctx.fillText(`${destination.destination}, ${destination.district}`, addrX + 6, addrY + 66);
        ctx.fillText('Tamil Nadu 600 001, INDIA', addrX + 6, addrY + 102);

        // 10. BOTTOM OFFICIAL STAMP BARCODE & EMBLEM
        ctx.fillStyle = colors.textMuted;
        ctx.font = 'bold 8.5px "Courier New", monospace';
        ctx.fillText(
          `EXPEDITION CODEX № TN-${destination.id}-2026 · VERIFIED STAMP · AUTREL`,
          rightX,
          height - 65
        );
      } else {
        // =====================================================================
        // PORTRAIT / SQUARE FORMAT (Instagram Story 4:5 or 1:1)
        // Top: Header & Stamp
        // Middle: Framed Photograph
        // Bottom: District Crest & Explorer Notes
        // =====================================================================

        // Top Banner
        ctx.fillStyle = colors.textDark;
        ctx.font = '900 24px "Plus Jakarta Sans", serif';
        ctx.textAlign = 'left';
        ctx.fillText('POST CARD', 60, 85);
        ctx.fillStyle = colors.accent;
        ctx.font = 'bold 10px monospace';
        ctx.fillText('CARTE POSTALE · TAMIL NADU EXPEDITION', 60, 102);

        // Stamp in Top Right
        const stampW = 100;
        const stampH = 120;
        const stampX = width - 60 - stampW;
        const stampY = 55;

        ctx.fillStyle = colors.stampBg;
        ctx.fillRect(stampX, stampY, stampW, stampH);
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(stampX + 6, stampY + 6, stampW - 12, stampH - 12);

        ctx.fillStyle = colors.accent;
        ctx.font = '24px serif';
        ctx.textAlign = 'center';
        ctx.fillText(crestInfo.symbolEmoji, stampX + stampW / 2, stampY + 45);
        ctx.fillStyle = colors.textDark;
        ctx.font = '900 12px serif';
        ctx.fillText('₹ 50', stampX + stampW / 2, stampY + 70);
        ctx.font = 'bold 7px sans-serif';
        ctx.fillText(crestInfo.name.toUpperCase(), stampX + stampW / 2, stampY + 86);

        // Postmark
        ctx.strokeStyle = colors.inkBlue;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(stampX - 15, stampY + 50, 36, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = colors.inkBlue;
        ctx.font = 'bold 7px sans-serif';
        ctx.fillText(expeditionDate, stampX - 15, stampY + 52);

        // Photo Area in Middle
        const pMargin = 60;
        const pWidth = width - pMargin * 2;
        const pHeight = format === 'portrait' ? 620 : 480;
        const pY = 190;

        ctx.fillStyle = '#FFFDF9';
        ctx.fillRect(pMargin, pY, pWidth, pHeight);
        ctx.strokeStyle = '#D8C6B0';
        ctx.strokeRect(pMargin, pY, pWidth, pHeight);

        if (activePhoto) {
          try {
            const img = await loadImage(activePhoto);
            ctx.save();
            ctx.beginPath();
            ctx.rect(pMargin + 14, pY + 14, pWidth - 28, pHeight - 70);
            ctx.clip();
            ctx.drawImage(img, pMargin + 14, pY + 14, pWidth - 28, pHeight - 70);
            ctx.restore();
          } catch {
            ctx.fillStyle = '#EBE1D2';
            ctx.fillRect(pMargin + 14, pY + 14, pWidth - 28, pHeight - 70);
          }
        }

        // Photo Caption
        ctx.fillStyle = colors.textDark;
        ctx.font = 'bold 15px "Courier New", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(destination.destination.toUpperCase(), pMargin + 20, pY + pHeight - 34);
        ctx.fillStyle = colors.textMuted;
        ctx.font = 'italic 11px serif';
        ctx.fillText(`${destination.district} District · Verified Proof`, pMargin + 20, pY + pHeight - 16);

        // Bottom Notes Area
        const bY = pY + pHeight + 35;
        ctx.fillStyle = colors.accent;
        ctx.font = 'bold 9px monospace';
        ctx.fillText(`“${crestInfo.motto}” · GPS ${crestInfo.coordinates}`, 60, bY);

        ctx.fillStyle = colors.textDark;
        ctx.font = 'italic 14px Georgia, serif';
        ctx.fillText(`"${explorerNote}"`, 60, bY + 30);

        ctx.fillStyle = colors.textMuted;
        ctx.font = 'bold 11px "Courier New", monospace';
        ctx.fillText(`— Explorer ${stats.rankTitle} · ${expeditionDate}`, 60, bY + 65);
      }

      setIsGenerating(false);
      return canvas;
    } catch (err) {
      console.error('Canvas generation error:', err);
      setIsGenerating(false);
      return null;
    }
  }, [destination, activePhoto, format, theme, explorerNote, expeditionDate, showAirmailBorder, crestInfo, stats.rankTitle]);

  // Update preview image
  const updatePreview = useCallback(async () => {
    const canvas = await renderCanvas();
    if (canvas) {
      setPreviewDataUrl(canvas.toDataURL('image/png', 0.95));
    }
  }, [renderCanvas]);

  useEffect(() => {
    if (isOpen && destination) {
      updatePreview();
    }
  }, [isOpen, destination, updatePreview]);

  // Handle local user photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setActivePhoto(result);
          showToast('Proof photo updated in postcard!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Download High-Resolution Postcard
  const handleDownload = async () => {
    const canvas = await renderCanvas();
    if (!canvas || !destination) return;

    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `AUTREL_Postcard_${destination.destination.replace(/\s+/g, '_')}.png`;
    link.href = dataUrl;
    link.click();
    showToast('High-res vintage postcard downloaded!');
  };

  // Share to WhatsApp
  const handleShareWhatsApp = async () => {
    const canvas = await renderCanvas();
    if (!canvas || !destination) return;

    const caption = `📬 *Vintage Travel Postcard from Tamil Nadu!*
📍 *${destination.destination}* (${destination.district} District)
✨ "${explorerNote}"
🧭 Explored with *AUTREL* — Take the road less travelled.`;

    // Try Web Share API with image file if supported
    canvas.toBlob(async (blob) => {
      if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], 'postcard.png', { type: 'image/png' })] })) {
        try {
          const file = new File([blob], `${destination.destination}_Postcard.png`, { type: 'image/png' });
          await navigator.share({
            title: `Postcard from ${destination.destination}`,
            text: caption,
            files: [file],
          });
          showToast('Shared via device sheet!');
          return;
        } catch {
          // fallback to whatsapp web url
        }
      }

      // WhatsApp URL fallback
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(caption)}`;
      window.open(waUrl, '_blank');
      // Also download photo so user can attach to chat
      handleDownload();
      showToast('Opening WhatsApp! Postcard downloaded for your message attachment.');
    }, 'image/png', 0.95);
  };

  // Share to Instagram
  const handleShareInstagram = async () => {
    if (!destination) return;
    const igCaption = `Postcard from ${destination.destination}, ${destination.district} 🏛️✨
"${explorerNote}"

Explored on @AUTREL · Tamil Nadu Expedition
#AUTREL #TakeTheRoadLessTravelled #TamilNadu #IncredibleIndia #${destination.district.replace(/\s+/g, '')} #HiddenGems #TravelPostcard`;

    try {
      await navigator.clipboard.writeText(igCaption);
      setCopyFeedback('Instagram caption copied!');
      setTimeout(() => setCopyFeedback(null), 3000);
    } catch {
      // ignore
    }

    // Download image
    await handleDownload();
    showToast('Postcard downloaded & Instagram caption copied to clipboard!');
  };

  // Copy Image to Clipboard
  const handleCopyImage = async () => {
    const canvas = await renderCanvas();
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopyFeedback('Postcard image copied to clipboard!');
        setTimeout(() => setCopyFeedback(null), 3000);
      } catch (err) {
        console.warn('Clipboard write image failed, copying text instead', err);
        await navigator.clipboard.writeText(`AUTREL Postcard - ${destination?.destination}`);
        setCopyFeedback('Link copied to clipboard!');
        setTimeout(() => setCopyFeedback(null), 3000);
      }
    }, 'image/png', 0.95);
  };

  // Print Postcard
  const handlePrint = async () => {
    const canvas = await renderCanvas();
    if (!canvas) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }
    const dataUrl = canvas.toDataURL('image/png', 1.0);
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Vintage Postcard - ${destination?.destination}</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #fff; }
            img { max-width: 100%; height: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
            @media print {
              body { background: transparent; }
              img { width: 100%; box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" onload="window.print();window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (!isOpen || !destination) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#241710]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-[#FFFDF9] rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border-2 border-[#E5D7C6] my-6 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FAF5EE] via-[#FFFDF9] to-[#FAF5EE] border-b border-[#E8DFD5] flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8A4A2B] to-[#C1512F] text-white flex items-center justify-center shadow-md shadow-[#C1512F]/20">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-[#38281E] font-display">
                    Vintage Travel Postcard Generator
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#C1512F]/10 text-[#C1512F] text-[10px] font-black uppercase tracking-wider border border-[#C1512F]/20">
                    High-Res Studio
                  </span>
                </div>
                <p className="text-xs text-[#6E5A4E]">
                  Export printable vintage postcards with your photo proof, district crest &amp; explorer notes
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#8A7568] hover:text-[#38281E] hover:bg-[#FAF0E6] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body: Left Controls, Right Preview */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#FAF6F0]/50">
            {/* LEFT COLUMN: CONTROLS & CUSTOMIZATION */}
            <div className="lg:col-span-5 space-y-5">
              {/* 1. Format Selector */}
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E5D7C6] shadow-2xs space-y-2.5">
                <label className="text-xs font-black uppercase text-[#8A7568] tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#C1512F]" />
                  <span>Postcard Format</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'landscape', label: '6x4 Print', sub: 'Landscape 3:2' },
                    { id: 'portrait', label: 'Story / Reel', sub: 'Portrait 4:5' },
                    { id: 'square', label: 'Square Post', sub: 'Square 1:1' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFormat(f.id as PostcardFormat)}
                      className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                        format === f.id
                          ? 'bg-[#FDF2EE] border-[#C1512F] text-[#C1512F] font-black shadow-xs'
                          : 'bg-[#FAF6F0] border-[#DFD5CB] text-[#6E5A4E] hover:bg-white font-bold'
                      }`}
                    >
                      <div className="text-xs">{f.label}</div>
                      <div className="text-[10px] text-[#8A7568]">{f.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Theme & Airmail Border */}
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E5D7C6] shadow-2xs space-y-3">
                <label className="text-xs font-black uppercase text-[#8A7568] tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C1512F]" />
                  <span>Vintage Theme</span>
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'parchment', name: 'Aged Parchment', color: '#F0E5D4' },
                    { id: 'terracotta', name: 'Royal Heritage', color: '#EED9C7' },
                    { id: 'indigo', name: 'Coromandel Sea', color: '#DFE8F1' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id as PostcardTheme)}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                        theme === t.id
                          ? 'border-[#C1512F] bg-[#FDF2EE] text-[#C1512F]'
                          : 'border-[#DFD5CB] bg-[#FAF6F0] text-[#5C483D] hover:bg-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: t.color }}
                      />
                      <span className="truncate">{t.name}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#F0E6DA] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#5C483D]">1950s Airmail Edge Border</span>
                  <input
                    type="checkbox"
                    checked={showAirmailBorder}
                    onChange={(e) => setShowAirmailBorder(e.target.checked)}
                    className="w-4 h-4 accent-[#C1512F] cursor-pointer"
                  />
                </div>
              </div>

              {/* 3. Photo Proof Selection & Upload */}
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E5D7C6] shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase text-[#8A7568] tracking-wider flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#C1512F]" />
                    <span>Postcard Photo</span>
                  </label>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-bold text-[#C1512F] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload New Photo</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[#DFD5CB] bg-[#FAF6F0] shrink-0">
                    <img
                      src={activePhoto}
                      alt="Selected Postcard"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs text-[#6E5A4E] space-y-1">
                    <p className="font-bold text-[#38281E]">
                      {latestEntry?.photoUri === activePhoto ? '✓ Using Your Uploaded Photo Proof' : 'Destination Hero Photograph'}
                    </p>
                    <p className="text-[11px]">
                      Framed with authentic brass photo-corner mounts and vintage caption.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Explorer Notes & Date */}
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E5D7C6] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase text-[#8A7568] tracking-wider">
                    Explorer Field Note
                  </label>
                  <span className="text-[10px] text-[#8A7568]">
                    {explorerNote.length}/180
                  </span>
                </div>

                <textarea
                  value={explorerNote}
                  onChange={(e) => setExplorerNote(e.target.value.slice(0, 180))}
                  rows={3}
                  className="w-full p-2.5 text-xs rounded-xl border border-[#DFD5CB] bg-[#FAF6F0] text-[#38281E] focus:outline-none focus:border-[#C1512F] focus:bg-white resize-none"
                  placeholder="Write a personal note for your postcard..."
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-bold text-[#8A7568] self-center mr-1">
                    Presets:
                  </span>
                  {NOTE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setExplorerNote(preset)}
                      className="px-2 py-0.5 rounded-lg bg-[#FAF5EE] hover:bg-[#FDF2EE] text-[10px] font-bold text-[#6E5A4E] hover:text-[#C1512F] border border-[#DFD5CB] transition cursor-pointer"
                    >
                      Note {idx + 1}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#F0E6DA] flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#5C483D] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8A7568]" />
                    <span>Postmark Date</span>
                  </span>
                  <input
                    type="text"
                    value={expeditionDate}
                    onChange={(e) => setExpeditionDate(e.target.value)}
                    maxLength={15}
                    className="w-32 px-2.5 py-1 text-xs font-mono font-bold text-center rounded-lg border border-[#DFD5CB] bg-[#FAF6F0] text-[#38281E]"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE POSTCARD PREVIEW & EXPORT ACTIONS */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              {/* Preview Container */}
              <div className="flex-1 min-h-[360px] sm:min-h-[440px] flex items-center justify-center p-3 sm:p-5 rounded-3xl bg-gradient-to-b from-[#EFE5D7] via-[#EAE0D1] to-[#E2D5C3] border-2 border-[#D8C7B3] relative shadow-inner overflow-hidden">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-2 text-xs font-bold text-[#C1512F]">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    <span>Rendering high-res vintage stamp &amp; crest...</span>
                  </div>
                ) : previewDataUrl ? (
                  <div className="relative group max-w-full max-h-full">
                    <img
                      src={previewDataUrl}
                      alt="Vintage Travel Postcard"
                      className="max-h-[460px] w-auto object-contain rounded-xl shadow-2xl transition-transform group-hover:scale-[1.01]"
                    />
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono tracking-wider font-bold">
                      {format === 'landscape' ? '1200 × 800 (3:2 Print)' : format === 'portrait' ? '1080 × 1350 (Story)' : '1080 × 1080 (Square)'}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Toast Feedback */}
              <AnimatePresence>
                {(toastMessage || copyFeedback) && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="p-3 rounded-xl bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-md"
                  >
                    <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>{toastMessage || copyFeedback}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ACTION BUTTONS ROW */}
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E5D7C6] shadow-sm space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* 1. Download High-Res PNG */}
                  <button
                    onClick={handleDownload}
                    className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#C1512F] to-[#D95328] hover:brightness-105 text-white text-xs font-black shadow-md shadow-[#C1512F]/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </button>

                  {/* 2. Share to WhatsApp */}
                  <button
                    onClick={handleShareWhatsApp}
                    className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  {/* 3. Share to Instagram */}
                  <button
                    onClick={handleShareInstagram}
                    className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-105 text-white text-xs font-black shadow-md shadow-pink-600/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </button>

                  {/* 4. Copy / Print */}
                  <div className="flex gap-1.5">
                    <button
                      onClick={handleCopyImage}
                      title="Copy postcard image to clipboard"
                      className="flex-1 py-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#FDF2EE] text-[#5C483D] hover:text-[#C1512F] border border-[#DFD5CB] text-xs font-bold transition flex items-center justify-center cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handlePrint}
                      title="Print high-res postcard"
                      className="flex-1 py-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#FDF2EE] text-[#5C483D] hover:text-[#C1512F] border border-[#DFD5CB] text-xs font-bold transition flex items-center justify-center cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-[#8A7568] flex items-center justify-between pt-1">
                  <span>✨ 300 DPI print-ready canvas with authentic district crest seal</span>
                  <span className="font-bold text-[#38281E]">AUTREL Postcard Studio</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
