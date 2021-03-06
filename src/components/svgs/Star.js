import React from 'react'
import Svg, { Polygon } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const StarIcon = ({ color = THEME.colors.nav, size = 24 }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
		<Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></Polygon>
	</Svg>
)