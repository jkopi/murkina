import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { Ingredient } from '../interfaces/Recipe'

interface Props {
  ingredients?: Ingredient[];
}

export const IngredientsTable: React.FC<Props> = ({ ingredients }) => {
  return (
    <Table colorScheme="orange">
      <Thead>
        <Tr>
          <Th>amount</Th>
          <Th>ingredient</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ingredients?.map((ingredient) => (
          <Tr key={ingredient.name}>
            <Td>
              <span>{ingredient.amount}</span>
            </Td>
            <Td>
              <span>{ingredient.name}</span>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
