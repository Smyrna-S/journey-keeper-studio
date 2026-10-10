import { createFileRoute } from '@tanstack/react-router';
import { HomeJournal } from '@/autrel/components/HomeJournal';
export const Route = createFileRoute('/')({
  head: () => ({ meta: [ { title: 'AUTREL — Take the road less travelled' }, { name: 'description', content: 'Open your explorer’s journal. Discover Tamil Nadu’s hidden destinations, take field quests, and collect stories with AUTREL.' }, { property: 'og:title', content: 'AUTREL — Take the road less travelled' }, { property: 'og:description', content: 'A living explorer’s journal for the hidden corners of Tamil Nadu.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' } ] }),
  component: HomeJournal,
});
