import type { Metadata } from 'next';
import About from '@/components/sections/About/About';
import PageHero from '@/components/ui/PageHero/PageHero';
import { pageMetadata } from '@/lib/seo';
import { getAboutContent, renderTitle } from '@/lib/siteContent';

export const metadata: Metadata = pageMetadata({
	title: 'About',
	description:
		'Meet Oskar Saks, a Colorado photographer capturing families, couples, events, and landscapes with thoughtful composition, beautiful light, and authentic moments.',
	path: '/about',
});

export default async function AboutPage() {
	const content = await getAboutContent();
	return (
		<>
			<PageHero
				eyebrow='About'
				title={renderTitle(content.pageTitle)}
				lede={content.intro}
				portrait={{ src: '/images/oskar.webp', alt: 'Portrait of photographer Oskar Saks' }}
			/>
			<About onAboutPage />
		</>
	);
}
