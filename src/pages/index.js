import React from "react"

import "../components/reset.css"

import Container from "../components/Container"
import Header from "../components/Header"
import Hero from "../components/Hero"

function IndexPage() {
  return (
    <>
      <Container>
        <Header />
      </Container>
      <Container>
        <Hero />
      </Container>
    </>
  )
}

export default IndexPage
