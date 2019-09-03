import {createContext} from "preact";
import {DetailedGuildInfo, GeneralApiInfo, GuildUserPerms, User} from "../../utils/Interfaces";
import WebSocketHolder from "../../utils/WebSocketHolder";

export const AuthUser = createContext(null as User);
export const AuthUserSetter = createContext(null);
export const Guild = createContext(null as DetailedGuildInfo);
export const UserPerms = createContext(null as GuildUserPerms);
export const GeneralInfo = createContext({} as GeneralApiInfo);
export const WS = createContext(null as WebSocketHolder);