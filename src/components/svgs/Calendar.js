import React from 'react'
import Svg, { Line, Rect } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const CalendarIcon = ({ color = THEME.colors.nav, size = 20 }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar">
		<Rect x="3" y="4" width="18" height="18" rx="2" ry="2"></Rect>
		<Line x1="16" y1="2" x2="16" y2="6"></Line>
		<Line x1="8" y1="2" x2="8" y2="6"></Line>
		<Line x1="3" y1="10" x2="21" y2="10"></Line>
	</Svg>
)