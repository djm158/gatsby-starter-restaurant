import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";

const IndexPage = ({ data }) => {
  console.log(data.allMarkdownRemark.group);
  const groups = data.allMarkdownRemark.group;
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <ul>
        {groups.map(g => {
          return (
            <li key={g.fieldValue}>
              <div>
                <h1>{g.fieldValue}</h1>
                {getStuff(g)}
              </div>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

const getStuff = thing => {
  return thing.edges.map(edge => {
    return (
      <div key={edge.node.id}>
        <h2>{edge.node.frontmatter.title}</h2>
        <p>{edge.node.frontmatter.description}</p>
      </div>
    );
  });
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      group(field: frontmatter___type) {
        fieldValue
        totalCount
        edges {
          node {
            frontmatter {
              title
              spicy
              sizes
              prices
              description
              categories
              type
            }
            id
          }
        }
      }
    }
  }
`;
