import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const LockIcon = ({ color = THEME.colors.nav, size = 24 }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock">
		<Rect x="3" y="11" width="18" height="11" rx="2" ry="2"></Rect>
		<Path d="M7 11V7a5 5 0 0 1 10 0v4"></Path>
	</Svg>
)