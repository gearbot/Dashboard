const THEME_COLORS = {
    light: {
    },
    dark: {

    }
};

export const set_theme_colors = (theme, transition=true) => {
    const root = document.documentElement;

    if (transition)
        root.style.setProperty("--transition-speed", "all .5s");

    const colors = THEME_COLORS[theme];
    for (let name in colors) {
        root.style.setProperty(`--${name}`, colors[name])
    }
    if (transition)
        setTimeout(() => root.style.setProperty("--transition-speed", "none 0"), 500);
};
