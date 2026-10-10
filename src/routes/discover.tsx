import { createFileRoute } from '@tanstack/react-router';
import { DiscoverJournal } from '@/autrel/components/DiscoverJournal';
export const Route = createFileRoute('/discover')({
 head:()=>({meta:[{title:'Field atlas | AUTREL'},{name:'description',content:'Explore the complete AUTREL collection of Tamil Nadu hidden gems by category, district, and map.'},{property:'og:title',content:'Field atlas | AUTREL'},{property:'og:description',content:'Explore the complete AUTREL collection of Tamil Nadu hidden gems by category, district, and map.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:DiscoverJournal,
});
