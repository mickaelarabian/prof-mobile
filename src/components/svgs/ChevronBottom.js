import React from 'react'
import Svg, { Polyline } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const ChevronBottomIcon = ({ color = THEME.colors.nav, size = 20 }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
		<Polyline points="6 9 12 15 18 9"></Polyline>
	</Svg>
)