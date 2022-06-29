import React from 'react'
import Svg, { Line, Rect } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const CardIcon = ({ color = THEME.colors.blueGray, size = 24 }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-credit-card">
		<Rect x="1" y="4" width="22" height="16" rx="2" ry="2"></Rect>
		<Line x1="1" y1="10" x2="23" y2="10"></Line>
	</Svg>
)