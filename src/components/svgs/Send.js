import React from 'react'
import Svg, { G, Path } from 'react-native-svg'
import { THEME } from '../../styles/theme.style'

export const SendIcon = ({ color = THEME.colors.nav, size = 24 }) => (
	<Svg width={size} height={size} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
		<G id="navigation_24px">
			<Path id="icon/maps/navigation_24px" fill-rule="evenodd" clip-rule="evenodd" d="M4.19587 5.51659L22.4999 12.9822L4.22405 20.5166L3.51272 19.8079L6.49996 13.0123L3.48721 6.22793L4.19587 5.51659ZM6.80799 17.2917L17.2299 12.9921L6.79192 8.73172L8.32843 12.1988L8.68995 13.0082L8.33147 13.8188L6.80799 17.2917Z" fill={color} fill-opacity="0.54" />
		</G>
	</Svg>
)