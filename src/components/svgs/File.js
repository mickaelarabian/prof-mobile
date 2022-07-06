import React from 'react'
import Svg, { Line, Path, Polyline } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const FileIcon = ({ color = THEME.colors.blueGray, size = 24 }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text">
		<Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></Path>
		<Polyline points="14 2 14 8 20 8"></Polyline>
		<Line x1="16" y1="13" x2="8" y2="13"></Line>
		<Line x1="16" y1="17" x2="8" y2="17"></Line>
		<Polyline points="10 9 9 9 8 9"></Polyline>
	</Svg>
)