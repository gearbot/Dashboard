export interface User {
    id: number
    name: string
    discriminator: string
    globalAdmin: boolean
}

export interface UserHolder {
    user?: User
}

export interface AppState {
    currentUrl: string;
    user: User;
}

export interface HeaderProps {
    user?: User;
}

export interface HeaderState {
    menuActive: boolean
}

export interface Guild {
    id: number
    name: string;
    permissions: number;
    icon: string;
}

export interface GuildMap {
    [guid: number]: Guild
}

export interface GuildProps {
    guild: Guild;
}