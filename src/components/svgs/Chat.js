import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const ChatIcon = ({ color = THEME.colors.blueGray, size = 20 }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square">
		<Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></Path>
	</Svg>
)