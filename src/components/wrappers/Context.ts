import {createContext} from "preact";
import {DetailedGuildInfo, GeneralApiInfo, LangMap, User} from "../../utils/Interfaces";

export const AuthUser = createContext(null as User);
export const AuthUserSetter = createContext(null);
export const Guild = createContext(null as DetailedGuildInfo);
export const GeneralInfo = createContext({} as GeneralApiInfo);
export const Value = createContext(null);
export const ValueSetter = createContext(null);
export const Error = createContext(null as string);