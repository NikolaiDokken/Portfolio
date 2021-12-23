import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/about.module.css";
import jobs from "../experience/jobs.json";
import education from "../experience/education.json";
import moment from "moment";

export default function About() {
	return (
		<Layout>
			<div className={styles.about}>
				<h2>
					Dette er meg{" "}
					<span role="img" aria-label="me">
						👨🏼‍💼
					</span>
				</h2>
				<section>
					<h3>
						Erfaring -{" "}
						<span role="img" aria-label="work-experience">
							💼
						</span>
					</h3>
					<div className={styles.divider} />
					{jobs
						.sort((a, b) => {
							return new Date(b.start) - new Date(a.start);
						})
						.map((job, index) => (
							<div key={index}>
								<JobRow job={job} />
								{index !== jobs.length - 1 ? (
									<div className={styles.subdivider} />
								) : (
									""
								)}
							</div>
						))}
				</section>
				<section>
					<h3>
						Utdanning -{" "}
						<span role="img" aria-label="education">
							🎓
						</span>
					</h3>
					<div className={styles.divider} />
					{education
						.sort((a, b) => {
							return new Date(b.start) - new Date(a.start);
						})
						.map((edu, index) => (
							<div key={index}>
								<JobRow job={edu} />
								{index !== education.length - 1 ? (
									<div className={styles.subdivider} />
								) : (
									""
								)}
							</div>
						))}
				</section>
				<section className={styles.hobbies}>
					<h3>
						Hobbyer og interesser -{" "}
						<span role="img" aria-label="hobbies and interests">
							🎿
						</span>
					</h3>
					<div className={styles.divider} />
					<ul>
						<li>
							Ski: På vinteren elsker jeg å stå utenfor løypene
						</li>
						<li>
							Båt: Som stolt snekke-eier, trives jeg på sjøen, men
							også med å pusse båt{" "}
						</li>
						<li>
							IT: Har alltid vært en stor interesse. Uten den
							hadde ikke denne siden eksistert
						</li>
						<li>
							F1: Liker både å se på Formel 1 og å delta på online races
						</li>
					</ul>
				</section>
				<section>
					<h3>
						Favoritt operativsystem -{" "}
						<span role="img" aria-label="favourite os">
							💻
						</span>
					</h3>
					<div className={styles.divider} />
					<p>
						Alt går. Om jeg skulle valgt én til programmering, hadde
						jeg valgt macOS. I tillegg til å være ekstremt
						brukervennlig kombinerer den det beste fra Windows og
						linux.
					</p>
					<p>Fun fact: Denne nettsiden bruker ubuntu-fonten</p>
				</section>
			</div>
		</Layout>
	);
}

function JobRow({ job }) {
	const getFromToDateString = position => {
		return (
			moment(position.start).format("MMM YYYY") +
			" - " +
			(position.end ? moment(position.end).format("MMM YYYY") : "Nå")
		);
	};
	const getDuration = () => {
		var minDate = moment(job.positions[0].start);
		var maxDate = moment(job.positions[0].end);
		job.positions.forEach(position => {
			if (moment(position.start).diff(minDate) < 0) {
				minDate = moment(position.start);
			}
			if (!position.end) {
				maxDate = moment();
			}
			if (moment(position.end).diff(maxDate) > 0) {
				maxDate = moment(position.end);
			}
		});
		const months = maxDate.diff(minDate, "months");
		return Math.floor(months / 12) > 0
			? Math.floor(months / 12) + " år" + (months %12 > 0 ? ", " + (months % 12) + " mnd":"")
			: months > 0 ? months + " mnd":"";
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					marginBottom: 8,
				}}
			>
				<img
					src={job.logo}
					alt="Infiniwell logo"
					style={{
						maxWidth: 50,
						maxHeight: 50,
						borderRadius: 5,
						marginRight: 16,
					}}
				/>
				<div>
					{job.positions.length === 1 ? (
						<div>
							<h4>{job.positions[0].title}</h4>
							<p>{job.company}</p>
							<p style={{ fontSize: 14 }}>
								{job.positions[0].type}
							</p>
							<p style={{ fontSize: 14 }}>
								{getFromToDateString(job.positions[0])} &#x2E31;{" "}
								{getDuration()}
							</p>
						</div>
					) : (
						<div>
							<h4 style={{ fontSize: 18 }}>{job.company}</h4>
							<p>{getDuration()}</p>
						</div>
					)}
				</div>
			</div>
			{job.positions.length > 1
				? job.positions
						.sort((a, b) => {
							return new Date(b.start) - new Date(a.start);
						})
						.map((position, index) => (
							<div className={styles.experience} key={index}>
								{index < job.positions.length - 1 ? (
									<div className={styles.trail} />
								) : (
									""
								)}
								<h4>{position.title}</h4>
								<p>{position.type}</p>
								<p>{getFromToDateString(position)}</p>
							</div>
						))
				: ""}
		</div>
	);
}
