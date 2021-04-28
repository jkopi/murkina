import React from 'react'
import Header from '../components/Header'

const FoodListView: React.FC = () => {
  return (
    <>
      <Header />
      <ul>
        <li>chiken</li>
        <li>broccoli</li>
        <li>onion</li>
        <li>mozzarella</li>
        <li>pasta</li>
      </ul>
    </>
  )
}

export default FoodListView;