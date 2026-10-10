import React from 'react';
import { AutrelLogo, AutrelLogoProps } from './AutrelLogo';

export interface TraveliciousLogoProps extends AutrelLogoProps {
  // Backwards compatibility alias for components referencing old prop names
}

/**
 * TraveliciousLogo — Alias for AutrelLogo
 * Renders the official AUTREL brand emblem and motto:
 * "Take the road less travelled."
 */
export const TraveliciousLogo: React.FC<TraveliciousLogoProps> = (props) => {
  return <AutrelLogo {...props} />;
};

export { AutrelLogo };
