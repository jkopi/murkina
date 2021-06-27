import { Container, Link, List, ListItem } from '@chakra-ui/react';
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import Header from './Header';

// const SideBar = styled.div`
//   width: 200px;
//   height: 100%;
//   float: left;
//   overflow-x: hidden;
//   padding-right: 5px;
//   left: 0;
// `;

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {/* <Container>
        <List>
          <Item>
            <StyledLink to="/">
              <span>All recipes</span>
            </StyledLink>
          </Item>
          <Item>
            <StyledLink to="/recipe/create">
              <span>Create new</span>
            </StyledLink>
          </Item>
          {!!auth.currentUser && (
            <>
              <Item>
                <StyledLink to="/">
                  <span>My recipes</span>
                </StyledLink>
              </Item>
              <Item>
                <StyledLink to="/sign-out">
                  <span>Logout</span>
                </StyledLink>
              </Item>
            </>
          )}
        </List>
      </Container> */}
      <List>
        <ListItem>
          <Link as={RouterLink} to="/recipe/create">
            <span>Create new</span>
          </Link>
        </ListItem>
      </List>
      <Container maxW="container.xl">
        {children}
      </Container>
    </>
  )
}

export default Layout
