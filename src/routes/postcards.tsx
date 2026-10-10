import { createFileRoute } from '@tanstack/react-router';
import { PostcardsJournal } from '@/autrel/components/PostcardsJournal';
export const Route = createFileRoute('/postcards')({
 head:()=>({meta:[{title:'Postcards | AUTREL'},{name:'description',content:'Create and download personal AUTREL postcards from Tamil Nadu’s hidden destinations.'},{property:'og:title',content:'Postcards | AUTREL'},{property:'og:description',content:'Create and download personal AUTREL postcards from Tamil Nadu’s hidden destinations.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:PostcardsJournal,
});
