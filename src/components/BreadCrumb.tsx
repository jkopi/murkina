import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  recipeName: string;
}

export const BreadCrumb: React.FC<Props> = ({ recipeName }) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/">Recipes</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>{recipeName}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}