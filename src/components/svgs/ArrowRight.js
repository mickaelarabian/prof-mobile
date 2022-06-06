import React from 'react'
import Svg, { Path, Line, Polyline } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const ArrowRightIcon = (props) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={THEME.colors.white} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
		<Line x1="5" y1="12" x2="19" y2="12"></Line>
		<Polyline points="12 5 19 12 12 19"></Polyline>
	</Svg>
)