import { ThemeVariables } from './theme'

export const setCSSVariable = (
	element: HTMLElement | null,
	variable: string,
	value: string
) => {
	if (element && value) {
		element.style.setProperty(variable, String(value))
	}
}

export const overrideThemeVariables = (themeObject: ThemeVariables) => {
	const root = document.getElementById('root')
	const themeVariables = Object.keys(themeObject)
	if (root && themeObject) {
		themeVariables.forEach((themeVar) => {
			const varValue = themeObject[themeVar]
			if (varValue && themeVar.startsWith('--')) {
				setCSSVariable(root, themeVar, varValue)
			}
		})
	}
}
