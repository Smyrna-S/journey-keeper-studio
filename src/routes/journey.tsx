import { createFileRoute } from '@tanstack/react-router';
import { JourneyJournal } from '@/autrel/components/JourneyJournal';
export const Route = createFileRoute('/journey')({
 head:()=>({meta:[{title:'My journey | AUTREL'},{name:'description',content:'Your collected AUTREL expeditions, photographs, and memories from the road less travelled.'},{property:'og:title',content:'My journey | AUTREL'},{property:'og:description',content:'Your collected AUTREL expeditions, photographs, and memories from the road less travelled.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:JourneyJournal,
});
