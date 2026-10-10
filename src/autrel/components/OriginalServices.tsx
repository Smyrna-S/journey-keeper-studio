import { AuthProvider, useAuth } from '../lib/authContext';
import { useCloudSync } from '../lib/cloudSync';
import { AuthModal } from './AuthModal';
import { VintagePostcardModal } from './VintagePostcardModal';
import { CaravanDepotModal } from './CaravanDepotModal';
import type { Destination } from '../types';

type Props = { authOpen: boolean; postcardOpen: boolean; depotOpen: boolean; destination: Destination; closeAuth: () => void; closePostcard: () => void; closeDepot: () => void };
function Services(props: Props) {
  const { user } = useAuth();
  useCloudSync(user);
  return <>
    <AuthModal isOpen={props.authOpen} onClose={props.closeAuth} />
    <VintagePostcardModal isOpen={props.postcardOpen} onClose={props.closePostcard} destination={props.destination} />
    <CaravanDepotModal isOpen={props.depotOpen} onClose={props.closeDepot} />
  </>;
}
export default function OriginalServices(props: Props) { return <AuthProvider><Services {...props} /></AuthProvider>; }
