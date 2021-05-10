import React from 'react'
import styled from 'styled-components'
import { Ingredient } from '../interfaces/Recipe'

const Table = styled.table`
  width: 100%;
  table-layout: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  transition: 200ms;
  &:hover {
    background-color: #7c7c7c;
  }
`;

const TableCell = styled.td`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

interface Props {
  ingredients?: Ingredient[];
}

export const IngredientsTable: React.FC<Props> = ({ ingredients }) => {
  return (
    <Table>
      <TableBody>
        {ingredients?.map((ingredient) => (
          <TableRow key={ingredient.name}>
            <TableCell>
              <span>{ingredient.amount}</span>
            </TableCell>
            <TableCell>
              <span>{ingredient.name}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
