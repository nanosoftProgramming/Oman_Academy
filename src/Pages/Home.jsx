import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import HeroSection from '../components/HeroSection/HeroSection'
import Features from '../components/Features/Features'

export default function Home() {
  return (
  <div style={{backgroundColor:"#0f172a"}}>
      <Navbar/>
      <HeroSection/>
      <Features/>
    </div>
  )
}
