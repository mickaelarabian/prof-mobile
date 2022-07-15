import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const LessonIcon = ({ color = THEME.colors.nav, size = 20 }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book">
		<Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></Path>
		<Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></Path>
	</Svg>
)