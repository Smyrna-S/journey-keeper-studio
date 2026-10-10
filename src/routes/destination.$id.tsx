import { createFileRoute, notFound } from '@tanstack/react-router';
import { DESTINATIONS } from '@/autrel/data/destinations';
import { DestinationJournal } from '@/autrel/components/DestinationJournal';
export const Route = createFileRoute('/destination/$id')({
 loader:({params})=>{const destination=DESTINATIONS.find(d=>d.id===params.id);if(!destination) throw notFound(); return {destination};},
 head:({loaderData})=>{const title=`${loaderData?.destination.destination || 'Field note'} | AUTREL`;const description=loaderData?.destination.description || 'Discover a hidden gem in Tamil Nadu with AUTREL.';return {meta:[{title},{name:'description',content:description},{property:'og:title',content:title},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]};},
 component:()=>{const {destination}=Route.useLoaderData();return <DestinationJournal destination={destination}/>;},
});
