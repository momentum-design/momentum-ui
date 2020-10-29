# Theme Toggle wrapper component

This component serves to control the applied CSS Variables that effect which visual theme is applied to all child components. 

To use, wrap the content you want to be theme-changeable with `<md-theme>` tags. Then use whatever method you prefer to control the presence or absence of the component's boolean theme values, `darkTheme` and `lumos`.

`<md-theme>` will by default apply color tokens for Momentum Light. 

Adding `lumos` will activate Lumos color theme.

Adding `darkTheme` will toggle colors to the dark theme hues for whichever color system is currently active.

To make edits to the colors used in any theme, access the `tokens` settings files found in the individual components' directories.