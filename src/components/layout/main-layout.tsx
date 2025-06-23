import React, { FC, ReactNode } from 'react'
import Box from '@mui/material/Box'
// >>> FINAL CORRECTED IMPORTS: Both Header and Footer must be NAMED imports <<<
import { Footer } from '@/components/footer' // Use curly braces
import { Header } from '@/components/header' // Use curly braces

interface Props {
  children: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Box component="main">
      <Header />
      {children}
      <Footer />
    </Box>
  )
}

export default MainLayout