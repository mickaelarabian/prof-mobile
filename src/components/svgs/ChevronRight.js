import React from 'react'
import Svg, { Polyline } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const ChevronRightIcon = ({ color = THEME.colors.nav, size = 20 }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right">
		<Polyline points="9 18 15 12 9 6"></Polyline>
	</Svg>
)