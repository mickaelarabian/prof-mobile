import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const PositionIcon = ({ color = THEME.colors.nav, size = 24 }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin">
		<Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></Path>
		<Circle cx="12" cy="10" r="3"></Circle>
	</Svg>
)