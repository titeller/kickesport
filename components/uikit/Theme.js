import React from 'react'
import styled, { css } from 'styled-components'

const sizeSm = '4px'
const sizeMd = '8px'
const sizeLg = '16px'

const Margin = css`
  ${props => props.auto && `margin: auto;`}
  ${props => props.sm && `margin: ${sizeSm};`}
  ${props => props.md && `margin: ${sizeMd};`}
  ${props => props.lg && `margin: ${sizeLg};`}
`

const Card = styled.div`
  background: #ffffff;
  border: solid 1px #e9e9e9;
  padding: 12px;
  margin: 8px 0;
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.padding && `padding: ${props.padding};`}
`

export {
  Card,
}