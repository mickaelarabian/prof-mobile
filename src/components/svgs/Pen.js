import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const PenIcon = ({ color = THEME.colors.blueGray, size = 24 }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2">
		<Path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></Path>
	</Svg>
)