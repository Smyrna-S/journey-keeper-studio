import { createFileRoute } from '@tanstack/react-router';
import { QuestsJournal } from '@/autrel/components/QuestsJournal';
export const Route = createFileRoute('/quests')({
 head:()=>({meta:[{title:'Field quests | AUTREL'},{name:'description',content:'Follow AUTREL’s original photo-proof quests across Tamil Nadu and earn Travel Coins and explorer stamps.'},{property:'og:title',content:'Field quests | AUTREL'},{property:'og:description',content:'Follow AUTREL’s original photo-proof quests across Tamil Nadu and earn Travel Coins and explorer stamps.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:QuestsJournal,
});
