import {createContext} from "preact";
import {DetailedGuildInfo, LangMap, User} from "../../utils/Interfaces";

export const AuthUser = createContext(null as User);
export const AuthUserSetter = createContext(null);
export const Guild = createContext(null as DetailedGuildInfo);
export const Languages = createContext(null as LangMap);
export const Value = createContext(null);
export const ValueSetter = createContext(null);
export const Error = createContext(null as string);