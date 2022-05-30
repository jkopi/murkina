import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { Ingredient } from '../interfaces/Recipe'

interface Props {
  ingredients?: Ingredient[];
}

export const IngredientsTable = ({ ingredients }: Props) => {
  return (
    <Table colorScheme="orange" my="4">
      <Thead>
        <Tr>
          <Th textColor="facebook.900">amount</Th>
          <Th textColor="facebook.900">unit</Th>
          <Th textColor="facebook.900">ingredient</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ingredients?.map((ingredient) => (
          <Tr key={ingredient.name}>
            <Td>
              <span>{ingredient.amount}</span>
            </Td>
            <Td>
              <span>{ingredient.unit ?? '-'}</span>
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
