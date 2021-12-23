import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/project-details.module.css";
import { GatsbyImage } from "gatsby-plugin-image";

export default function ProjectDetails({ data }) {
	const { html } = data.markdownRemark;
	const { title, stack, featImg, github } = data.markdownRemark.frontmatter;

	return (
		<Layout>
			<div className={styles.details}>
				<div style={{ flexDirection: "row", marginTop: -50 }}>
					<div className={styles.backChevron} />
					<Link className={styles.backBtn} to="/projects">
						Tilbake
					</Link>
				</div>
				<h2>{title}</h2>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h3
						style={{
							padding: 0,
							margin: "0 8px 0 0",
						}}
					>
						{stack}
					</h3>
					<a href={github} target="_blank" rel="noreferrer">
						<img
							src="/github.png"
							style={{ width: 40, height: 40, color: "white" }}
							alt="github logo"
						></img>
					</a>
				</div>
				<div className={styles.imageContainer}>
					<GatsbyImage
						image={featImg.childImageSharp.gatsbyImageData}
					/>
				</div>
				<div className={styles.projectMd} dangerouslySetInnerHTML={{ __html: html }} />
			</div>
		</Layout>
	);
}

export const query = graphql`
	query ProjectDetails($slug: String) {
		markdownRemark(frontmatter: { slug: { eq: $slug } }) {
			html
			frontmatter {
				stack
				title
				featImg {
					childImageSharp {
						gatsbyImageData(layout: FULL_WIDTH)
					}
				}
				github
			}
		}
	}
`;
