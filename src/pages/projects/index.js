import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../components/Layout";
import ProjectCard from "../../components/ProjectCard";
import styles from "../../styles/projects.module.css";

export default function Projects({ data }) {
	const projects = data.allMarkdownRemark.nodes;
	return (
		<Layout>
			<div className={styles.header}>
				<h2>Portfolio</h2>
				<h3>
					Prosjekter jeg har vært med på & nettsider jeg har laget
				</h3>
			</div>
			<div className={styles.cards}>
				{projects.map(project => (
					<Link
						to={"/projects/" + project.frontmatter.slug}
						key={project.id}
						style={{ margin: "0 5px 0 5px" }}
					>
						<ProjectCard project={project} />
					</Link>
				))}
			</div>
		</Layout>
	);
}

export const query = graphql`
	query ProjectsPage {
		allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
			nodes {
				frontmatter {
					slug
					stack
					title
					thumb
					color
				}
				id
			}
		}
	}
`;
