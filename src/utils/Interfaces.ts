export interface User {

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