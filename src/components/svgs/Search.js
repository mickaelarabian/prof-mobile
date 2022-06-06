import React from 'react'
import Svg, { Line, Circle } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const SearchIcon = ({ color = THEME.colors.nav, size = 20 }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
		<Circle cx="11" cy="11" r="8"></Circle>
		<Line x1="21" y1="21" x2="16.65" y2="16.65"></Line>
	</Svg>
)