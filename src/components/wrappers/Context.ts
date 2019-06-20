import {createContext} from "preact";
import {DetailedGuildInfo, User} from "../../utils/Interfaces";

export const AuthUser = createContext(null as User);
export const AuthUserSetter = createContext(null);
export const Guild = createContext(null as DetailedGuildInfo);
