import {Component, VNode} from "preact";
import WebSocketHolder from "./WebSocketHolder";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";

export interface User {
    id: string;
    username: string;
    discrim: string;
    globalAdmin: boolean;
    avatar_url: string;
}

export interface UserHolder {
    user?: User
}

export interface AppState extends LoadingInterface {
    user?: User;
    generalInfo: GeneralApiInfo;
    lang_strings: any;
    websocket?: WebSocketHolder;
    pluralRules: Intl.PluralRules;
    usernameCache?: UsernameMap;
}

export interface HeaderProps {
    user?: User;
}

export interface HeaderState {
    menuActive: boolean
}

export interface BasicGuildInfo {
    id: string
    name: string;
    permissions: number;
    icon: string;
}

export interface APIGuildInfo {
    id: string
    name: string;
    icon: string;
}

export interface GuildMap {
    readonly [guid: string]: BasicGuildInfo
}

export interface AllGuildMap {
    readonly [guid: string]: APIGuildInfo
}


export interface GuildProps {
    guild: BasicGuildInfo | APIGuildInfo;
    type: "SETTINGS" | "ADD";
}

export interface GuildRouteProps {
    gid: string;
    tab?: string;
}

export interface GuildUserPerms {
    user_dash_perms: number;
    user_level: number;
}

export interface GuildRouteState {
    loading: boolean;
    guild_info: DetailedGuildInfo;
    user_perms: GuildUserPerms;
}

export interface GuildListRouteState {
    guilds: GuildMap;
    all_guilds: AllGuildMap;
}

export interface Owner {
    id: string;
    name: string;
}

export interface Emoji {
    id: string;
    name: string;
    color: number
}

export interface Statuses {
    online: number;
    idle: number;
    dnd: number;
    offline: number;
}

export interface Role {
    id: string;
    name: string;
    color: string;
    members: number;
    is_admin: boolean;
    is_mod: boolean;
}

export interface Channel {
    name: string;
    can_log: boolean;
}

export interface ChannelMap {
    readonly [id: string]: Channel
}

export interface DetailedGuildInfo {
    id: string;
    name: string;
    icon: string;
    owner: Owner;
    members: number;
    text_channels: ChannelMap;
    additional_text_channels: ChannelMap
    voice_channels: number;
    creation_date: string;
    age_days: number;
    vip_features: readonly string[];
    role_list: Role[]
    emojis: Emoji[];
    member_statuses: Statuses;
}

export interface NavProps {
    tab: string;
    tabs: readonly string[]
}

export interface GeneralSettings {
    LANG: string;
    NEW_USER_THRESHOLD: number;
    PERM_DENIED_MESSAGE: boolean;
    PREFIX: string;
    TIMESTAMPS: boolean
    TIMEZONE: string
}

export interface LangMap {
    [code: string]: string
}

export interface LoggingMap {
    readonly [code: string]: string[];
}

export interface GeneralApiInfo {
    languages: LangMap;
    logging: LoggingMap
}

export interface LoadingInterface {
    loading: boolean
}

export interface GuildSettingsSectionState extends LoadingInterface {
    old_values: GeneralSettings;
    new_values: GeneralSettings;
    saving: boolean;
}


export interface ConfigField {
    name: string;
    info: string;
    Component: Component

    visible?(values): boolean;

    validator?(value): boolean | string;

    extra_props?: any;
}

export interface FieldMap {
    readonly [name: string]: ConfigField
}

export interface GuildSettingsSectionProps {
    name: string
    fields: readonly ConfigField[];
}

export interface SettingsComponentProps {
    value: any;
    setter: any;
    name: string;
    changed: boolean;
    disabled: boolean;

    validator?(value): boolean | string;

    all_values: any;
}

export interface GuildRoleSelectorProps extends SettingsComponentProps {
    extra_check?: string;
}

export interface BasicInputComponentProps extends SettingsComponentProps {
    type: string
}

export interface GuildLogoProps {
    link: string;
    size: SizeProp;
}

export interface RoleListProps extends SettingsComponentProps {
    type: string;
    extra_check: string;
}

export interface RoleComponentProps {
    role: Role;

    remover?(value: string): void;
}

export interface RolePickerComponents {
    roles: readonly Role[];
    selected?: string;
    button_text?: VNode | string;

    receiver(r: string): void;

    disabled: boolean;
    extra_check?: string;
}

export interface RolePickerState {
    selected?: string;
}

export interface MuteComponentState {
    cleaned: boolean;
    setup: boolean;
}

export interface PermLevelSelectorProps extends SettingsComponentProps {
    min: number;
    min_value?: string;
}

export interface UserMenuState {
    theme: "light" | "dark";
    open: boolean;
}

export interface LogChannelInfo {
    channel: string;
    CATEGORIES: readonly string[];
    DISABLED_KEYS: readonly string[];
}

export interface LogChannelProps {
    info: LogChannelInfo;
    selectedChannels: readonly string[];
    disabled: boolean;
    index: string;

    infoSetter(i: LogChannelInfo): void;

    remover();

}

export interface LogCategoryProps {
    info: LogChannelInfo;
    channel: string;
    index: string;

    infoSetter(i: LogChannelInfo): void;
}

export interface ChannelSelectorProps {
    selected?: string;
    selectedChannels: readonly string[];
    disabled: boolean;
    requirement?: string;

    setter(new_value: string): void;

    remover();

}

export interface InfoTooltipProps {
    name: string
    placeholder?: string;
}

export interface CollapsibleCardProps {
    header: any;
    body: any;
    style?: any;
}

export interface CollapsibleCardState {
    expanded: boolean;
}

export interface LogChannelSectionState {
    loading: boolean;
    old_values?: readonly any[]
    new_values?: readonly any[]
    saving: boolean;
}

export interface StatProps {
    name: string;
    value: string;
}

interface Stats {
    start_time: string;
    user_mesages: string;
    bot_messages: string;
    own_messages: string;
    total_members: string;
    unique_members: string;
    taco_count: string;
    random_number: number;
    commands_executed: string;
    custom_commands_executed: string;
    guilds: number;
}

export interface StatsRouteState extends LoadingInterface {
    stats: Stats;
    uptime_parts: readonly Component[];
    interval;
}

export interface Infraction {
    id: number;
    guild_id: string;
    user_id: string;
    mod_id: string;
    type: string;
    reason: string;
    start: string;
    end?: string;
    active: boolean;
}

export interface InfractionsRouteState extends LoadingInterface {
    selected_infraction?: Infraction;
    page: number;
    infraction_count: number;
    filter: Filter;
    infraction_list: readonly Infraction[];
    order_by: readonly string[];
    per_page: number;
    updating: boolean;
    validFilter: boolean;
}

export interface InfractionsRouteProps {
    selection?: number;
    filter?: string;
    page?: number
}

export interface InfractionTableProps {
    infractions: readonly Infraction[]
}

export interface UsernameMap {
    readonly [id: string]: string
}

export interface UsernameProps {
    id: string;
    hideId?: boolean
}

export interface SortTitleProps {
    name: string;
    sorting: readonly string[];
    langPrefix: string;

    setter(newSorting: string[]): void;
}

export interface GearIconProps {
    name: string;
    size?: number;
}

export interface PaginationProps {
    page: number;
    pages: number;

    mover(newPage: number): void;
}

export interface Command {
    name: string;
    syntax: string;
    example: string;
}

export interface CommandGroup {
    name: string;
    permRequirement: number;
    commands: readonly Command[];
}

export interface CommandsState {
    info: readonly CommandGroup[];
}

export interface CommandGroupProps {
    group: CommandGroup;
}

export interface CommandProps {
    command: Command;
}

export interface DropDownOptions {
    readonly [name: string]: string | number | VNode
}

export interface DropdownProps {
    options: DropDownOptions | readonly string[] | readonly number[]
    selected?: string | number;
    direction?: "UP" | "DOWN";

    setter(newValue: any): void
}

export interface DropdownState {
    open: boolean;
}

export interface FilterProperties {
    field: string;
    type?: string;
    value?: string;
}

export interface CheckedInput {
    value?: string | number;

    setter(value: string | number): void;

    validator(value: string | number): boolean;
}

export interface FilterOptions {
    readonly [name: string]: readonly string[]
}


export interface Filter {
    mode: "AND" | "OR";
    set: readonly FilterProperties[];
    subFilters: readonly Filter[];
}

export interface FilterProps {
    filter: Filter;
    level: number;

    setter(newFilter): void;

    remover?(): void;

}

export interface FilterRowProps {
    field: string;
    type: string;
    value: string;

    setter(override): void;

    remover(): void;
}

export interface FilterRowFieldProps {
    value: string;

    validator(value: string): boolean;

    setter(value: string): void;
}