import { createFileRoute } from '@tanstack/react-router';
import { PassportJournal } from '@/autrel/components/PassportJournal';
export const Route = createFileRoute('/passport')({
 head:()=>({meta:[{title:'Explorer’s passport | AUTREL'},{name:'description',content:'Your AUTREL explorer level, Travel Coins, collected badges, and Tamil Nadu journey progress.'},{property:'og:title',content:'Explorer’s passport | AUTREL'},{property:'og:description',content:'Your AUTREL explorer level, Travel Coins, collected badges, and Tamil Nadu journey progress.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:PassportJournal,
});
