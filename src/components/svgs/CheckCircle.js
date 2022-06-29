import React from 'react'
import Svg, { Path, Line, Polyline } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const CheckCircleIcon = ({ color = THEME.colors.white, size = 24 }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle">
		<Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></Path>
		<Polyline points="22 4 12 14.01 9 11.01"></Polyline>
	</Svg>
)