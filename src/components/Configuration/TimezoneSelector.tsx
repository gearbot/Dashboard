import {Component} from "preact";
import {SettingsComponentProps} from "../../utils/Interfaces";

const zones = [
    {"name": "(GMT-12:00) International Date Line West", "zone": "Etc/GMT+12"},
    {"name": "(GMT-11:00) Midway Island, Samoa", "zone": "Pacific/Midway"},
    {"name": "(GMT-10:00) Hawaii", "zone": "Pacific/Honolulu"},
    {"name": "(GMT-09:00) Alaska", "zone": "US/Alaska"},
    {"name": "(GMT-08:00) Pacific Time (US & Canada)", "zone": "America/Los_Angeles"},
    {"name": "(GMT-08:00) Tijuana, Baja California", "zone": "America/Tijuana"},
    {"name": "(GMT-07:00) Arizona", "zone": "US/Arizona"},
    {"name": "(GMT-07:00) Chihuahua, La Paz, Mazatlan", "zone": "America/Chihuahua"},
    {"name": "(GMT-07:00) Mountain Time (US & Canada)", "zone": "US/Mountain"},
    {"name": "(GMT-06:00) Central America", "zone": "America/Managua"},
    {"name": "(GMT-06:00) Central Time (US & Canada)", "zone": "US/Central"},
    {"name": "(GMT-06:00) Guadalajara, Mexico City, Monterrey", "zone": "America/Mexico_City"},
    {"name": "(GMT-06:00) Saskatchewan", "zone": "Canada/Saskatchewan"},
    {"name": "(GMT-05:00) Bogota, Lima, Quito, Rio Branco", "zone": "America/Bogota"},
    {"name": "(GMT-05:00) Eastern Time (US & Canada)", "zone": "US/Eastern"},
    {"name": "(GMT-05:00) Indiana (East)", "zone": "US/East-Indiana"},
    {"name": "(GMT-04:00) Atlantic Time (Canada)", "zone": "Canada/Atlantic"},
    {"name": "(GMT-04:00) Caracas, La Paz", "zone": "America/Caracas"},
    {"name": "(GMT-04:00) Manaus", "zone": "America/Manaus"},
    {"name": "(GMT-04:00) Santiago", "zone": "America/Santiago"},
    {"name": "(GMT-03:30) Newfoundland", "zone": "Canada/Newfoundland"},
    {"name": "(GMT-03:00) Brasilia", "zone": "America/Sao_Paulo"},
    {"name": "(GMT-03:00) Buenos Aires, Georgetown", "zone": "America/Argentina/Buenos_Aires"},
    {"name": "(GMT-03:00) Greenland", "zone": "America/Godthab"},
    {"name": "(GMT-03:00) Montevideo", "zone": "America/Montevideo"},
    {"name": "(GMT-02:00) Mid-Atlantic", "zone": "America/Noronha"},
    {"name": "(GMT-01:00) Cape Verde Is.", "zone": "Atlantic/Cape_Verde"},
    {"name": "(GMT-01:00) Azores", "zone": "Atlantic/Azores"},
    {"name": "(GMT+00:00) Casablanca, Monrovia, Reykjavik", "zone": "Africa/Casablanca"},
    {"name": "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London", "zone": "Etc/Greenwich"},
    {"name": "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna", "zone": "Europe/Amsterdam"},
    {"name": "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague", "zone": "Europe/Belgrade"},
    {"name": "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris", "zone": "Europe/Brussels"},
    {"name": "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb", "zone": "Europe/Sarajevo"},
    {"name": "(GMT+01:00) West Central Africa", "zone": "Africa/Lagos"},
    {"name": "(GMT+02:00) Amman", "zone": "Asia/Amman"},
    {"name": "(GMT+02:00) Athens, Bucharest, Istanbul", "zone": "Europe/Athens"},
    {"name": "(GMT+02:00) Beirut", "zone": "Asia/Beirut"},
    {"name": "(GMT+02:00) Cairo", "zone": "Africa/Cairo"},
    {"name": "(GMT+02:00) Harare, Pretoria", "zone": "Africa/Harare"},
    {"name": "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius", "zone": "Europe/Helsinki"},
    {"name": "(GMT+02:00) Jerusalem", "zone": "Asia/Jerusalem"},
    {"name": "(GMT+02:00) Minsk", "zone": "Europe/Minsk"},
    {"name": "(GMT+02:00) Windhoek", "zone": "Africa/Windhoek"},
    {"name": "(GMT+03:00) Kuwait, Riyadh, Baghdad", "zone": "Asia/Kuwait"},
    {"name": "(GMT+03:00) Moscow, St. Petersburg, Volgograd", "zone": "Europe/Moscow"},
    {"name": "(GMT+03:00) Nairobi", "zone": "Africa/Nairobi"},
    {"name": "(GMT+03:00) Tbilisi", "zone": "Asia/Tbilisi"},
    {"name": "(GMT+03:30) Tehran", "zone": "Asia/Tehran"},
    {"name": "(GMT+04:00) Abu Dhabi, Muscat", "zone": "Asia/Muscat"},
    {"name": "(GMT+04:00) Baku", "zone": "Asia/Baku"},
    {"name": "(GMT+04:00) Yerevan", "zone": "Asia/Yerevan"},
    {"name": "(GMT+04:30) Kabul", "zone": "Asia/Kabul"},
    {"name": "(GMT+05:00) Yekaterinburg", "zone": "Asia/Yekaterinburg"},
    {"name": "(GMT+05:00) Islamabad, Karachi, Tashkent", "zone": "Asia/Karachi"},
    {"name": "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi", "zone": "Asia/Calcutta"},
    {"name": "(GMT+05:30) Sri Jayawardenapura", "zone": "Asia/Calcutta"},
    {"name": "(GMT+05:45) Kathmandu", "zone": "Asia/Katmandu"},
    {"name": "(GMT+06:00) Almaty, Novosibirsk", "zone": "Asia/Almaty"},
    {"name": "(GMT+06:00) Astana, Dhaka", "zone": "Asia/Dhaka"},
    {"name": "(GMT+06:30) Yangon (Rangoon)", "zone": "Asia/Rangoon"},
    {"name": "(GMT+07:00) Bangkok, Hanoi, Jakarta", "zone": "Asia/Bangkok"},
    {"name": "(GMT+07:00) Krasnoyarsk", "zone": "Asia/Krasnoyarsk"},
    {"name": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi", "zone": "Asia/Hong_Kong"},
    {"name": "(GMT+08:00) Kuala Lumpur, Singapore", "zone": "Asia/Kuala_Lumpur"},
    {"name": "(GMT+08:00) Irkutsk, Ulaan Bataar", "zone": "Asia/Irkutsk"},
    {"name": "(GMT+08:00) Perth", "zone": "Australia/Perth"},
    {"name": "(GMT+08:00) Taipei", "zone": "Asia/Taipei"},
    {"name": "(GMT+09:00) Osaka, Sapporo, Tokyo", "zone": "Asia/Tokyo"},
    {"name": "(GMT+09:00) Seoul", "zone": "Asia/Seoul"},
    {"name": "(GMT+09:00) Yakutsk", "zone": "Asia/Yakutsk"},
    {"name": "(GMT+09:30) Adelaide", "zone": "Australia/Adelaide"},
    {"name": "(GMT+09:30) Darwin", "zone": "Australia/Darwin"},
    {"name": "(GMT+10:00) Brisbane", "zone": "Australia/Brisbane"},
    {"name": "(GMT+10:00) Canberra, Melbourne, Sydney", "zone": "Australia/Canberra"},
    {"name": "(GMT+10:00) Hobart", "zone": "Australia/Hobart"},
    {"name": "(GMT+10:00) Guam, Port Moresby", "zone": "Pacific/Guam"},
    {"name": "(GMT+10:00) Vladivostok", "zone": "Asia/Vladivostok"},
    {"name": "(GMT+11:00) Magadan, Solomon Is., New Caledonia", "zone": "Asia/Magadan"},
    {"name": "(GMT+12:00) Auckland, Wellington", "zone": "Pacific/Auckland"},
    {"name": "(GMT+12:00) Fiji, Kamchatka, Marshall Is.", "zone": "Pacific/Fiji"},
    {"name": "(GMT+13:00) Nuku'alofa", "zone": "Pacific/Tongatapu"}
];

export default class TimezoneSelector extends Component<SettingsComponentProps, {}> {

    render() {
        const {value, setter, name, info, api_name, changed, disabled} = this.props;
        const assembed = [];
        for (let key in zones) {
            const {name, zone} = zones[key];
            assembed.push(<option value={value} selected={zone == value}>{name}</option>)
        }
        return (
            <div class="field">
                <label class="label">{name}</label>
                <div class={changed ? "select is-success" : "select"}>
                    <select onchange={(event) => setter(api_name, event.target.value)} title={info} disabled={disabled}>
                        {assembed}
                    </select>
                </div>
            </div>

        );
    }
}