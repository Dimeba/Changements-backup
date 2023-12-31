// styles
import styles from '@/styles/Dashboard.module.scss'

// components
import Image from 'next/image'

// hooks
import { useDocument } from '@/hooks/useDocument'
import { useCollection } from '@/hooks/useCollection'
import { useFirestore } from '@/hooks/useFirestore'

const NgoProgramCard = ({
	name,
	fundsRequired,
	// fundsFulfilled,
	fundsSeeking,
	description,
	user,
	photoUrl,
	id,
	openEditForm,
	currency,
	showProgram
}) => {
	const { document: activeProgram } = useDocument('programs', id)
	const { deleteDocument } = useFirestore('programs')

	// Pledges
	const { documents: pledges } = useCollection(`programs/${id}/pledges`)

	// Calculating all fulfilled pledges from all donors to get a total funds fullfiled
	const fundsFulfilled =
		pledges &&
		pledges.reduce(
			(accumulator, pledge) => accumulator + pledge.fulfilledAmount,
			0
		)

	return (
		<div className={styles.card}>
			<div
				className={styles.cardPhoto}
				onClick={() => showProgram(activeProgram)}
			>
				<Image
					src={photoUrl ? photoUrl : '/indian-girl.jpg'}
					fill
					quality={80}
					sizes='(max-width: 768px) 100vw, 768px'
					style={{ objectFit: 'cover' }}
					alt='Section Image'
					priority={true}
					as='img'
				/>
			</div>

			<div className={styles.cardContent}>
				<div className={styles.cardTitle}>
					<h4 onClick={() => showProgram(activeProgram)}>{name}</h4>
					<div className={styles.cardButtons}>
						<button
							className='button-simple'
							onClick={() => openEditForm(activeProgram)}
						>
							Edit
						</button>
						<button
							style={{ color: '#9A031E' }}
							className='button-simple'
							onClick={() => deleteDocument(id)}
						>
							Delete
						</button>
					</div>
				</div>

				<div className={styles.cardText}>
					<p className={styles.description}>{description.slice(0, 40)}...</p>

					<div className={styles.projectHighlights}>
						<div className={styles.projectHighlight}>
							<h2 style={{ color: '#FB8B24' }}>
								{Number(fundsRequired)
									.toLocaleString('en-US', {
										style: 'currency',
										currency: currency
									})
									.slice(0, -3)}
							</h2>
							<p>Funds Required</p>
						</div>
						<div className={styles.projectHighlight}>
							<h2 style={{ color: '#E36414' }}>
								{Number(fundsFulfilled)
									.toLocaleString('en-US', {
										style: 'currency',
										currency: currency
									})
									.slice(0, -3)}
							</h2>
							<p>Funds Fulfilled</p>
						</div>
						<div className={styles.projectHighlight}>
							<h2 style={{ color: '#9A031E' }}>
								{Number(fundsRequired - fundsFulfilled)
									.toLocaleString('en-US', {
										style: 'currency',
										currency: currency
									})
									.slice(0, -3)}
							</h2>
							<p>Funds Fulfilled</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NgoProgramCard
