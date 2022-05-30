import React from 'react'
import { IconButton, useColorMode } from '@chakra-ui/react'
import { FiSun, FiMoon } from 'react-icons/fi'


export const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = {
    light: "#fff",
    dark: "#000000"
  }

  return (
    <IconButton
      aria-label="toggle colormode"
      icon={colorMode === 'dark' ? <FiSun/> : <FiMoon/>}
      onClick={() => toggleColorMode()}
      color={iconColor[colorMode]}
    />
  )
}