import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero/PageHero';
import { OSKAR_INTRO } from '@/data/about';

export const metadata: Metadata = {
	title: 'About',
	description:
		'Meet Oskar Saks, a Colorado photographer capturing families, couples, events, and landscapes with thoughtful composition, beautiful light, and authentic moments.',
};

export default function AboutPage() {
	return (
		<PageHero
			eyebrow='About'
			title={
				<>
					Hi, I&apos;m <em>Oskar!</em>
				</>
			}
			lede={OSKAR_INTRO}
		/>
	);
}
