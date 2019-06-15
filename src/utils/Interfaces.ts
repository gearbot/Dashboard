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
}

export interface HeaderProps {
    user?: User;
}

export interface HeaderState {
    menuActive: boolean
}