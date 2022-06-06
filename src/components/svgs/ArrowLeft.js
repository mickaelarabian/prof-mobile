import React from 'react'
import Svg, { Path, Line, Polyline } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const ArrowLeftIcon = ({color = THEME.colors.white, size = 24}) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left">
		<Line x1="19" y1="12" x2="5" y2="12"></Line>
		<Polyline points="12 19 5 12 12 5"></Polyline>
	</Svg>
)