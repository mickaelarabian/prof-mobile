import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const ProfileIcon = ({ color = THEME.colors.blueGray, size = 20 }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
		<Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></Path>
		<Circle cx="12" cy="7" r="4"></Circle>
	</Svg>
)