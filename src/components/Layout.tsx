import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Header from './Header';

const Container = styled.div`
  /* margin: auto; */
  margin-left: 200px;
  max-width: 1070px;
`;

const SideBar = styled.div`
  width: 200px;
  height: 100%;
  position: fixed;
  overflow-x: hidden;
  padding: 5px;
  left: 0;

  border: 1px solid grey;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  margin: .5rem;
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
          <Item>Recipes</Item>
          <Item>My recipes</Item>
          <Item>
            <Link to="/recipe/create">
              <span>Create new</span>
            </Link>
          </Item>
        </List>
      </SideBar>
      <Container>
        {children}
      </Container>
    </>
  )
}

export default Layout
