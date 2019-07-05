const THEME_COLORS = {
    light: {
        "body-background": "#f9f9f9",
        "navbar-background": "#f2f2f2",
        "nav-item-hover-background": "#fafafa",
        "body-color": "hsl(0, 0%, 29%)",
        "text-color": "hsl(0, 0%, 21%)",
        "link-color": "hsl(217, 71%, 53%)",
        "navbar-item-hover-background-color": "hsl(0, 0%, 98%)",
        "navbar-item-active-color": "hsl(0, 0%, 4%)",
        "navbar-dropdown-background-color": "hsl(0, 0%, 100%)",
        "navbar-dropdown-item-hover-color": "hsl(0, 0%, 4%)",
        "navbar-dropdown-item-hover-background-color": "hsl(0, 0%, 96%)",
        "navbar-dropdown-item-active-background-color": "hsl(0, 0%, 96%)",
        "navbar-divider-background-color": "hsl(0, 0%, 96%)",
        "button-background-color": "hsl(0, 0%, 100%)",
        "button-hover-border-color": "hsl(0, 0%, 71%)",
        "button-static-color": "hsl(0, 0%, 48%)",
        "button-static-background-color": "hsl(0, 0%, 96%)",
        "button-static-border-color": "hsl(0, 0%, 86%)",
        "button-disabled-background-color": "hsl(0, 0%, 100%)",
        "button-disabled-border-color": "hsl(0, 0%, 86%)",
        "card-background-color": "hsl(0, 0%, 98%)",
        "border-color": "hsl(0, 0%, 86%)",
        "switch-background": "hsl(0, 0%, 71%)",
        "border-hover-color": "hsl(0, 0%, 71%)",
        "link-active-color": "#fff",
        "link-hover-color": "hsl(0, 0%, 96%)",
        "text-light": "hsl(0, 0%, 48%)",
        "input-background": "hsl(0, 0%, 100%)",
        "input-color": "hsl(0, 0%, 21%)",
        "input-hover-color": "hsl(0, 0%, 5%)",
        "background-opacity": "0.3",
        "shadow-color": "hsl(0, 0%, 0%)",
    },
    dark: {
        "body-background": "#2c2f35",
        "navbar-background": "#23272a",
        "nav-item-hover-background": "#0f1215",
        "body-color": "hsl(0, 0%, 80%)",
        "text-color": "hsl(0, 0%, 75%)",
        "link-color": "hsl(217, 55%, 47%)",
        "navbar-item-hover-background-color": "hsl(0, 0%, 7.5%)",
        "navbar-item-active-color": "hsl(0, 0%, 7.5%)",
        "navbar-dropdown-item-hover-color": "hsl(0, 0%, 96%)",
        "navbar-dropdown-item-hover-background-color": "hsl(0, 0%,10%)",
        "navbar-dropdown-item-active-background-color": "hsl(0, 0%, 7.5%)",
        "navbar-divider-background-color": "hsl(0, 0%, 4%)",
        "button-background-color": "hsl(0, 0%, 0%)",
        "button-hover-border-color": "hsl(0, 0%, 29%)",
        "button-static-color": "hsl(0, 0%, 52%)",
        "button-static-background-color": "hsl(0, 0%, 7.5%)",
        "button-static-border-color": "hsl(0, 0%, 14%)",
        "button-disabled-background-color": "hsl(0, 0%, 15%)",
        "button-disabled-border-color": "hsl(0, 0%, 14%)",
        "card-background-color": "hsl(0, 0%, 15%)",
        "border-color": "hsl(0, 0%, 31%)",
        "switch-background": "hsl(0, 0%, 29%)",
        "border-hover-color": "hsl(0, 0%, 40%)",
        "link-active-color": "#1c1c1c",
        "link-hover-color": "hsl(0, 0%, 4%)",
        "text-light": "hsl(0, 0%, 68%)",
        "input-background": "hsl(0, 0%, 12%)",
        "input-color": "hsl(0, 0%, 79%)",
        "input-hover-color": "hsl(0, 0%, 90%)",
        "background-opacity": "0.25",
        "shadow-color": "hsl(0, 0%, 100%)",
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
