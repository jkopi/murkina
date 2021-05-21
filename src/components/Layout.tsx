import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { auth } from '../config/firebase';
import Header from './Header';

const Container = styled.div`
  /* margin: auto; */
  margin-left: 200px;
  max-width: 1070px;
`;

const SideBar = styled.div`
  width: 200px;
  height: 100%;
  float: left;
  overflow-x: hidden;
  padding-right: 5px;
  left: 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  margin: .5rem;
  padding: .5rem;
  border-bottom: 1px solid grey;
`;

const StyledLink = styled(Link)`
  color: black;
  padding: 2px;
  text-decoration: none;

  &&:hover {
    /* border: 1px solid grey; */
    border-radius: 5px;
    background-color: #ffaa64;
    transition: 200ms linear;
  }
`;

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <SideBar>
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
      </SideBar>
      <Container>
        {children}
      </Container>
    </>
  )
}

export default Layout
