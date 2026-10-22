'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './adminNav.module.scss';

const LINKS = [
	{ href: '/admin/home', label: 'Home' },
	{ href: '/admin/about', label: 'About' },
	{ href: '/admin', label: 'Gallery' },
	{ href: '/admin/services', label: 'Services' },
];

export default function AdminNav() {
	const pathname = usePathname();
	return (
		<nav className={styles.nav} aria-label='Admin sections'>
			{LINKS.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					prefetch={false}
					aria-current={pathname === link.href ? 'page' : undefined}
					className={pathname === link.href ? styles.active : styles.link}
				>
					{link.label}
				</Link>
			))}
		</nav>
	);
}
