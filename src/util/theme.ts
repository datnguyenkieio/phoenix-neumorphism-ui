// const defaultRootCSSVariables = {
//     '--light-bg': '#E4EBF5',
//     '--light-bg-dark-shadow': '#bec8e4',
//     '--light-bg-light-shadow': '#ffffff',
//     '--dark-bg': '#444444',
//     '--dark-bg-dark-shadow': '#363636',
//     '--dark-bg-light-shadow': '#525252',
//     '--white': '#ffffff',
//     '--black': '#000000',
//     '--primary': '#f71b94',
//     '--primary-dark': '#aa0660',
//     '--primary-light': '#fa7ac0',
//     '--g-text-color-light': 'rgba(0, 0, 0, 0.87)',
//     '--g-text-color-disabled-light': 'rgba(0, 0, 0, 0.38)',
//     '--g-text-color-secondary-light': 'rgba(0, 0, 0, 0.60)',
//     '--g-text-color-dark': 'rgba(255, 255, 255, 0.87)',
//     '--g-text-color-disabled-dark': 'rgba(255, 255, 255, 0.38)',
//     '--g-text-color-secondary-dark': 'rgba(255, 255, 255, 0.60)',
//     '--g-bg-color-disabled-light': '#dee5e8',
//     '--g-bg-color-disabled-dark': '#727272'
// }

export interface ThemeVariables {
    "--background-color": string
    "--color-primary": string
    "--box-shadow": string
    "--box-shadow-inset": string
}

export const lightTheme:ThemeVariables = {
    "--background-color":"#F0F0F3",
    "--color-primary": "#1D1C1A",
    "--box-shadow": "-3px -3px 5px rgba(255, 255, 255, 0.8), 3px 3px 5px rgba(0, 0, 0, 0.2)",
    "--box-shadow-inset": "inset -3px -3px 5px rgba(255, 255, 255, 0.8), inset 3px 3px 5px rgba(0, 0, 0, 0.2)",
    // "--box-shadow": "-6px -6px 10px rgba(255, 255, 255, 0.8),6px 6px 10px rgba(0, 0, 0, 0.2)",
    // "--box-shadow-inset": "inset -4px -4px 8px rgba(255, 255, 255, 0.5), inset 8px 8px 16px rgba(0, 0, 0, 0.1)",
} 
export const darkTheme:ThemeVariables = {
    "--background-color":"#212121",
    "--color-primary": "#feeeee",
    "--box-shadow": "-3px -3px 5px rgba(255, 255, 255, 0.1), 3px 3px 5px rgba(0, 0, 0, 0.9)",
    "--box-shadow-inset": "inset -3px -3px 5px rgba(255, 255, 255, 0.1), inset 3px 3px 5px rgba(0, 0, 0, 0.8)",
} 

