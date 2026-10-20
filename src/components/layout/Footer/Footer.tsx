import Link from 'next/link';
import {
	COPYRIGHT_YEAR,
	INSTAGRAM_HANDLE,
	INSTAGRAM_URL,
	NAV_LINKS,
	PHOTOGRAPHER,
} from '@/lib/siteConfig';
import styles from './footer.module.scss';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<svg
					className={styles.mark}
					viewBox='0 0 545 84'
					aria-hidden='true'
					focusable='false'
				>
					<defs>
						<linearGradient
							id='footer-mark-gradient'
							gradientUnits='userSpaceOnUse'
							x1='115'
							y1='-115'
							x2='430'
							y2='199'
						>
							<stop offset='0' stopColor='hsl(218, 32%, 17%)' />
							<stop offset='0.22' stopColor='hsl(228, 80%, 30%)' />
							<stop offset='0.38' stopColor='hsl(219, 84%, 44%)' />
							<stop offset='0.6' stopColor='hsl(204, 88%, 62%)' />
							<stop offset='0.62' stopColor='hsl(219, 84%, 44%)' />
							<stop offset='0.78' stopColor='hsl(228, 80%, 30%)' />
							<stop offset='1' stopColor='hsl(218, 32%, 17%)' />
						</linearGradient>
					</defs>
					<text x='2' y='80' className={styles.markText}>
						{PHOTOGRAPHER}
					</text>
				</svg>
				<div className={styles.row}>
					<nav aria-label='Footer'>
						<ul>
							{NAV_LINKS.map(({ id, label, href }) => (
								<li key={id}>
									<Link href={href}>{label}</Link>
								</li>
							))}
						</ul>
					</nav>
					<a
						href={INSTAGRAM_URL}
						target='_blank'
						rel='noopener noreferrer'
						className={styles.social}
					>
						{INSTAGRAM_HANDLE}
					</a>
				</div>
				<p className={styles.legal}>
					&copy; {COPYRIGHT_YEAR} {PHOTOGRAPHER}. All photographs are protected
					by copyright.
				</p>
			</div>
		</footer>
	);
}
