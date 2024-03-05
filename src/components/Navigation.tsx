'use client'
import { Padding, Row, TextLink } from '#/atoms'

export const Navigation: React.FC = () => {
  return (
    <Padding p={20}>
      <Row justifyContent='space-between'>
        <TextLink href='/'>Home</TextLink>
      </Row>
    </Padding>
  )
}
