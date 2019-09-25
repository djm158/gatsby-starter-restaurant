import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import styled from "styled-components";
import { Box, Flex, Text } from "rebass";

const GroupTitle = styled.h2`
  color: #b31e29; /* TOOD: get from theme */
  letter-spacing: 1.2px;
  margin-bottom: 24px;
  text-transform: capitalize;
`;

const GroupList = styled.ul`
  list-style: none;
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 600px;
`;

const IndexPage = ({ data }) => {
  const groups = data.allMarkdownRemark.group;
  return (
    <Layout>
      <SEO title="Home" />
      <FoodGroups groups={groups} />
    </Layout>
  );
};

export const MenuItem = props => {
  const { description, title, prices } = props;
  return (
    <>
      <Flex>
        <Box width={2 / 3}>
          <Text>{title}</Text>
        </Box>
        <Box width={1 / 3}>
          <Flex>
            {prices.map((price, index) => (
              <Box key={index} p={1}>
                <Text fontWeight="bold">{price}</Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
      {description ? <Text>{description}</Text> : null}
    </>
  );
};

const FoodGroups = ({ groups }) => (
  <GroupList>
    {groups.map(group => {
      return (
        <li key={group.fieldValue}>
          <div>
            <GroupTitle>{group.fieldValue}</GroupTitle>
            <MenuList>
              {group.edges.map(edge => {
                return (
                  <li key={edge.node.id}>
                    <MenuItem {...edge.node.frontmatter}></MenuItem>
                  </li>
                );
              })}
            </MenuList>
          </div>
        </li>
      );
    })}
  </GroupList>
);

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
