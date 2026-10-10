import React from 'react';
import { AutrelMapleLeaf, AutrelMapleLeafProps } from './AutrelMapleLeaf';

export interface AutumnLeafProps extends AutrelMapleLeafProps {
  // Supports all maple leaf variants
}

/**
 * AutumnLeaf — The signature AUTREL emblem.
 * Features the iconic autumn maple leaf in rich chestnut, caramel, and amber tones
 * with natural leaf lobes, delicate vein structure, and gentle tilted stem.
 */
export const AutumnLeaf: React.FC<AutumnLeafProps> = (props) => {
  return <AutrelMapleLeaf {...props} />;
};
