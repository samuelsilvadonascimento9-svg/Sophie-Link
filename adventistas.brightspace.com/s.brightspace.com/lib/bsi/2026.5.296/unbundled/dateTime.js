import {
    a as e,
    g as a,
    m as r
} from "./common.js";
const t = ["ca", "cy", "da", "de", "es", "fr", "nl", "pt", "sv", "tr", "zh"],
    M = ["ca", "cy", "da", "de", "fr", "hi", "mi", "nl", "sv", "tr"],
    d = {
        ACDT: "+1030",
        ACST: "+0930",
        ACT: "-0500",
        ACWST: "+0845",
        AEDT: "+1100",
        AEST: "+1000",
        AET: "+1000",
        AFT: "+0430",
        AKDT: "-0800",
        AKST: "-0900",
        ALMT: "+0600",
        ANAST: "+1200",
        ANAT: "+1200",
        AQTT: "+0500",
        ART: "-0300",
        AWDT: "+0900",
        AWST: "+0800",
        AZODT: "+0000",
        AZOST: "+0000",
        AZOT: "-0100",
        AZST: "+0500",
        AZT: "+0400",
        B: "+0200",
        BDST: "+0100",
        BIOT: "+0600",
        BIT: "-1200",
        BNT: "+0800",
        BOT: "-0400",
        BRST: "-0200",
        BRT: "-0300",
        BT: "-0300",
        BTT: "+0600",
        C: "+0300",
        CAST: "+0800",
        CAT: "+0200",
        CCT: "+0630",
        CEDT: "+0200",
        CEST: "+0200",
        CET: "+0100",
        CHADT: "+1345",
        CHAST: "+1245",
        CHOT: "+0800",
        CHODT: "+0900",
        CHODST: "+0900",
        CHOST: "+0900",
        CHST: "+1000",
        CHUT: "+1000",
        CIDST: "-0400",
        CIST: "-0500",
        CIT: "-0500",
        CKT: "-1000",
        CLDT: "-0300",
        CLST: "-0300",
        CLT: "-0400",
        COST: "-0400",
        COT: "-0500",
        CT: "-0600",
        CVT: "-0100",
        CWST: "+0845",
        CXT: "+0700",
        D: "+0400",
        DAVT: "+0700",
        DDUT: "+1000",
        DFT: "+0100",
        E: "+0500",
        EADT: "-0500",
        EASST: "-0500",
        EAST: "-0600",
        EAT: "+0300",
        ECST: "+0200",
        EEDT: "+0300",
        EEST: "+0300",
        EET: "+0200",
        EFATE: "+1100",
        EGST: "+0000",
        EGT: "-0100",
        EIT: "+0900",
        ET: "-0500",
        F: "+0600",
        FET: "+0300",
        FJDT: "+1300",
        FJST: "+1300",
        FJT: "+1200",
        FKDT: "-0300",
        FKST: "-0300",
        FKT: "-0400",
        FNT: "-0200",
        G: "+0700",
        GALT: "-0600",
        GAMT: "-0900",
        GET: "+0400",
        GFT: "-0300",
        GILT: "+1200",
        GIT: "-0900",
        GMT: "+0000",
        GT: "+0000",
        GYT: "-0400",
        HAC: "-0500",
        HAR: "-0600",
        HNA: "-0400",
        HNC: "-0600",
        HNP: "-0800",
        HNR: "-0700",
        H: "+0800",
        HAA: "-0300",
        HADT: "-0900",
        HAE: "-0400",
        HAEC: "+0200",
        HAP: "-0700",
        HAST: "-1000",
        HAT: "-0230",
        HDT: "-0900",
        HKT: "+0800",
        HLV: "-0400",
        HMT: "+0500",
        HNE: "-0500",
        HNT: "-0330",
        HOVDT: "+0800",
        HOVDST: "+0800",
        HOVST: "+0800",
        HOVT: "+0700",
        HST: "-1000",
        I: "+0900",
        ICT: "+0700",
        IDLW: "-1200",
        IOT: "+0600",
        IRDT: "+0430",
        IRKST: "+0900",
        IRKT: "+0800",
        IRST: "+0330",
        JST: "+0900",
        K: "+1000",
        KALT: "+0200",
        KGT: "+0600",
        KIT: "+0500",
        KOST: "+1100",
        KRAST: "+0800",
        KRAT: "+0700",
        KST: "+0900",
        KT: "+0900",
        KUYT: "+0400",
        L: "+1100",
        LHDT: "+1100",
        LHST: "+1030",
        LINT: "+1400",
        M: "+1200",
        MAGST: "+1200",
        MAGT: "+1100",
        MART: "-0930",
        MAWT: "+0500",
        MCK: "+0300",
        MEST: "+0200",
        MESZ: "+0200",
        MET: "+0100",
        MEZ: "+0100",
        MDST: "-0600",
        MDT: "-0600",
        MHT: "+1200",
        MIST: "+1100",
        MIT: "-0930",
        MMT: "+0630",
        MSD: "+0400",
        MSK: "+0300",
        MT: "-0700",
        MUT: "+0400",
        MVT: "+0500",
        MYT: "+0800",
        N: "-0100",
        NACDT: "-0500",
        NACST: "-0600",
        NAEDT: "-0400",
        NAEST: "-0500",
        NAMDT: "-0600",
        NAMST: "-0700",
        NAPDT: "-0700",
        NAPST: "-0800",
        NCT: "+1100",
        NDT: "-0230",
        NFDT: "+1200",
        NFT: "+1100",
        NOVST: "+0700",
        NOVT: "+0700",
        NPT: "+0545",
        NRT: "+1200",
        NST: "-0330",
        NT: "-0330",
        NUT: "-1100",
        NZDT: "+1300",
        NZST: "+1200",
        O: "-0200",
        OESZ: "+0300",
        OEZ: "+0200",
        OMSST: "+0700",
        OMST: "+0600",
        ORAT: "+0500",
        PDST: "-0700",
        PDT: "-0700",
        PET: "-0500",
        PETST: "+1200",
        PETT: "+1200",
        PGT: "+1000",
        PHOT: "+1300",
        PHT: "+0800",
        PKT: "+0500",
        PMDT: "-0200",
        PMST: "-0300",
        PONT: "+1100",
        PT: "-0800",
        PWT: "+0900",
        Q: "-0400",
        QYZT: "+0600",
        R: "-0500",
        RET: "+0400",
        ROTT: "-0300",
        S: "-0600",
        SAKT: "+1100",
        SAMST: "+0400",
        SAMT: "+0400",
        SAST: "+0200",
        SBT: "+1100",
        SCT: "+0400",
        SDT: "-1000",
        SGT: "+0800",
        SLST: "+0530",
        SRET: "+1100",
        SRT: "-0300",
        ST: "+1400",
        SYOT: "+0300",
        T: "-0700",
        TAHT: "-1000",
        THA: "+0700",
        TFT: "+0500",
        TJT: "+0500",
        TKT: "+1300",
        TLT: "+0900",
        TMT: "+0500",
        TOST: "+1400",
        TOT: "+1300",
        TRT: "+0300",
        TVT: "+1200",
        U: "-0800",
        ULAST: "+0900",
        ULAT: "+0800",
        UTC: "+0000",
        UYST: "-0200",
        UYT: "-0300",
        UZT: "+0500",
        V: "-0900",
        VET: "-0400",
        VLAST: "+1100",
        VLAT: "+1000",
        VOLT: "+0400",
        VOST: "+0600",
        VUT: "+1100",
        W: "-1000",
        WAKT: "+1200",
        WARST: "-0300",
        WAST: "+0200",
        WDT: "+0900",
        WEDT: "+0100",
        WEST: "+0100",
        WESZ: "+0100",
        WET: "+0000",
        WEZ: "+0000",
        WFT: "+1200",
        WGST: "-0200",
        WGT: "-0300",
        WIB: "+0700",
        WIT: "+0900",
        WITA: "+0800",
        WT: "+0000",
        X: "-1100",
        Y: "-1200",
        YAKST: "+1000",
        YAKT: "+0900",
        YAPT: "+1000",
        YEKST: "+0600",
        YEKT: "+0500",
        Z: "+0000"
    };

function n(e) {
    let a = "",
        r = "";
    for (let t = 0; t < e.length; t++) a += r + e.substr(0, t + 1), r = "|";
    return new RegExp(a, "i")
}

function y(e) {
    const a = s(e).match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})( |, )([0-9]{1,2}):([0-9]{2}):([0-9]{2})/);
    return a && 8 === a.length ? {
        month: parseInt(a[1]),
        date: parseInt(a[2]),
        year: parseInt(a[3]),
        hours: parseInt(a[5]),
        minutes: parseInt(a[6]),
        seconds: parseInt(a[7])
    } : null
}

function s(a) {
    const r = e().timezone.identifier,
        t = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hourCycle: "h23"
        };
    r && (t.timeZone = r, t.timeZoneName = "short");
    return new Intl.DateTimeFormat("en-US", t).format(a)
}

function i(e, a) {
    let r = `${e.month}/${e.date}/${e.year}, ${e.hours}:${e.minutes}:${e.seconds} ${a}`;
    if (a.includes("-") || a.includes("+")) {
        const t = /([A-Z]{3})?(\+|-)([0-9]{1,2})(:)?([0-9]{2})?/,
            M = a.match(t);
        if (M && 6 === M.length) {
            const a = M[5] ? c(M[5], 2) : "00";
            r = `${e.year}-${e.month}-${e.date}T${e.hours}:${e.minutes}:${e.seconds}${M[2]}${c(M[3],2)}:${a}`
        }
    }
    return r
}
const o = new RegExp("\\W");

function u() {
    const e = A(),
        a = o.exec(e.formats.dateFormats.short);
    return null !== a ? a[0] : "/"
}

function T(a) {
    const r = e().timezone.identifier;
    switch (a) {
        case "ADST":
            return "America/Anchorage" === r || "America/Juneau" === r || "America/Nome" === r || "America/Sitka" === r || "America/Yakutat" === r ? "-0800" : "-0300";
        case "ADT":
            return r.includes("America") || r.includes("Atlantic") ? "-0300" : "+0400";
        case "AMT":
            return r.includes("Asia") ? "+0400" : "-0400";
        case "AMST":
            return r.includes("Asia") ? "+0500" : "-0300";
        case "AST":
            return r.includes("America") || r.includes("Atlantic") ? "-0400" : "+0300";
        case "AT":
            return "America/Anchorage" === r || "America/Juneau" === r || "America/Nome" === r || "America/Sitka" === r || "America/Yakutat" === r ? "-0900" : "-0400";
        case "BDT":
            return r.includes("Asia") ? "+0800" : "+0100";
        case "BST":
            return r.includes("Asia") ? "+0600" : r.includes("Pacific") ? "+1100" : r.includes("Europe") ? "+0100" : "-0200";
        case "CDST":
            return r.includes("Australia") ? "+1030" : "-0500";
        case "CDT":
            return "America/Havana" === r ? "-0400" : r.includes("Australia") ? "+1030" : "-0500";
        case "CST":
            return "America/Havana" === r ? "-0500" : r.includes("Asia") ? "+0800" : r.includes("Australia") ? "+0930" : "-0600";
        case "ECT":
            return r.includes("America") ? "-0500" : "+0100";
        case "EDT":
        case "EDST":
            return r.includes("Antarctica") || r.includes("Australia") ? "+1100" : "-0400";
        case "EST":
            return r.includes("Australia") ? "+1000" : "-0500";
        case "GST":
            return r.includes("Atlantic") ? "-0200" : r.includes("Pacific") ? "+1000" : "+0400";
        case "IDT":
            return "Asia/Tehran" === r ? "+0430" : "+0300";
        case "IST":
            return "Asia/Calcutta" === r || "Asia/Colombo" === r ? "+0530" : r.includes("Asia") ? "+0200" : "+0100";
        case "MST":
            return r.includes("Asia") ? "+0800" : "-0700";
        case "PST":
            return r.includes("Asia") ? "+0800" : "-0800";
        case "PYST":
            return r.includes("Asia") ? "+0830" : "-0300";
        case "PYT":
            return r.includes("Asia") ? "+0830" : "-0400";
        case "SST":
            return r.includes("Pacific") ? "-1100" : "+0800";
        case "WAT":
            return r.includes("Australia") ? "+0800" : "+0100";
        case "WST":
            return r.includes("Pacific") ? "+1400" : r.includes("Australia") ? "+0800" : "+0100";
        default:
            throw new Error(`Invalid timezone: unable to retrieve timezone offset for ${r}`)
    }
}

function c(e, a) {
    e = e.toString();
    for (; e.length < a;) e = "0" + e;
    return e
}

function m(e, a) {
    let r = "";
    Object.keys(a).forEach(e => {
        r += ("" === r ? "" : "|") + e
    });
    const t = new RegExp(r, "g"),
        M = function(e) {
            return e.replace(t, e => a[e])
        };
    let d = !1,
        n = "",
        y = "";
    for (let a = 0; a < e.length; a++) {
        const r = e.charAt(a);
        "'" === r ? (d || (y += M(n), n = ""), d = !d) : d ? y += r : n += r
    }
    return y += M(n), y
}

function l(a) {
    if (!e().timezone.identifier) return a;
    const r = new Date(a.year, a.month - 1, a.date, a.hours, a.minutes, a.seconds),
        t = {
            year: a.year,
            month: c(a.month, 2),
            date: c(a.date, 2),
            hours: c(a.hours, 2),
            minutes: c(a.minutes, 2),
            seconds: c(a.seconds, 2)
        };
    let M = s(r).split(" ")[2],
        n = i(t, M),
        y = new Date(Date.parse(n));
    isNaN(y.getTime()) && (M = d[M] || T(M), n = i(t, M), y = new Date(Date.parse(n)));
    let o = s(y).split(" ")[2],
        u = i(t, o),
        m = new Date(Date.parse(u));
    return isNaN(m.getTime()) && (o = d[o] || T(o), u = i(t, o), m = new Date(Date.parse(u))), {
        month: m.getUTCMonth() + 1,
        date: m.getUTCDate(),
        year: m.getUTCFullYear(),
        hours: m.getUTCHours(),
        minutes: m.getUTCMinutes(),
        seconds: m.getUTCSeconds()
    }
}

function S(a) {
    if (!e().timezone.identifier) return a;
    return y(new Date(Date.UTC(a.year, a.month - 1, a.date, a.hours, a.minutes, a.seconds))) || a
}

function A() {
    const d = e();
    return d.getCacheItem("dateTimeDescriptor", () => {
        const e = a(),
            n = e.split("-")[0];
        let y = t.indexOf(n) > -1;
        "zh-tw" === e && (y = !1), d.overrides.date && void 0 !== d.overrides.date.hour24 && (y = d.overrides.date.hour24);
        const s = function(e, a, r) {
            if (e && "fr" === r) return "HH' h 'mm";
            let t = e ? "HH:mm" : "h:mm";
            return e && ("ca" === r || "ja" === r || "pt-br" === a || "zh" === r && "zh-tw" !== a) ? t = "H:mm" : e || "zh-tw" !== a || (t = "hh:mm"), e || (t = "ko" === r || "zh" === r ? `tt ${t}` : `${t} tt`), t
        }(y, e, n);
        let i = ["dddd, MMMM d, yyyy", "MMM d, yyyy", "M/d/yyyy", "MMMM yyyy", "MMMM d", "MMM d"];
        const o = "zh" === n && "zh-tw" !== e ? `ZZZ ${s}` : `${s} ZZZ`;
        let u = ["AM", "PM"],
            T = [
                ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            ],
            c = [
                ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                ["S", "M", "T", "W", "T", "F", "S"]
            ],
            m = M.indexOf(n) > -1 ? 1 : 0,
            l = 6,
            S = 0;
        switch (n) {
            case "ar":
                i = ["dddd, d MMMM, yyyy", "dd MMMM, yyyy", "dd/MM/yyyy", "MMMM, yyyy", "d MMMM", "d MMM"], u = ["ص", "م"], T[0] = T[1] = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], c = [
                    ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
                    ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
                    ["أ", "إ", "ث", "أر", "خ", "ج", "س"]
                ], m = 6, l = 4, S = 5;
                break;
            case "ca":
                i = ["dddd, d' de 'MMMM' del 'yyyy", "d' de 'MMMM' del 'yyyy", "d/M/yy", "MMMM' del 'yyyy", "d' de 'MMMM", "d' de 'MMM"], u = ["a. m.", "p. m."], T = [
                    ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
                    ["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des."]
                ], c = [
                    ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
                    ["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."],
                    ["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."]
                ];
                break;
            case "cy":
                i = ["dddd, d MMMM yyyy", "dd MMMM yyyy", "dd/MM/yyyy", "MMMM yyyy", "d MMMM", "d MMM"], T = [
                    ["Ionawr", "Chwefror", "Mawrth", "Ebrill", "Mai", "Mehefin", "Gorffennaf", "Awst", "Medi", "Hydref", "Tachwedd", "Rhagfyr"],
                    ["Ion", "Chwe", "Maw", "Ebr", "Mai", "Meh", "Gor", "Awst", "Medi", "Hyd", "Tach", "Rhag"]
                ], c = [
                    ["Dydd Sul", "Dydd Llun", "Dydd Mawrth", "Dydd Mercher", "Dydd Iau", "Dydd Gwener", "Dydd Sadwrn"],
                    ["Sul", "Llun", "Maw", "Mer", "Iau", "Gwe", "Sad"],
                    ["Su", "Ll", "Ma", "Me", "Ia", "Gw", "Sa"]
                ];
                break;
            case "da":
                i = ["dddd 'den' d. MMMM yyyy", "d. MMM. yyyy", "dd.MM.yyyy", "MMMM yyyy", "d. MMMM", "d. MMM"], T = [
                    ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"],
                    ["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."]
                ], c = [
                    ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
                    ["søn.", "man.", "tir.", "ons.", "tor.", "fre.", "lør."],
                    ["S", "M", "T", "O", "T", "F", "L"]
                ];
                break;
            case "de":
                i = ["dddd d. MMMM yyyy", "d. MMMM yyyy", "dd.MM.yyyy", "MMMM yyyy", "d. MMMM", "d. MMM"], T = [
                    ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                    ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez."]
                ], c = [
                    ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                    ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
                    ["S", "M", "D", "M", "D", "F", "S"]
                ];
                break;
            case "es":
                i = ["dddd d' de 'MMMM' de 'yyyy", "d' de 'MMMM' de 'yyyy", "dd/MM/yyyy", "MMMM yyyy", "d' de 'MMMM", "d' de 'MMM"], u = ["a. m.", "p. m."], T = [
                    ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
                    ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."]
                ], c = [
                    ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
                    ["dom.", "lun.", "mar.", "mié.", "jue.", "vie.", "sáb."],
                    ["D", "L", "M", "M", "J", "V", "S"]
                ];
                break;
            case "fr":
                i = ["dddd d MMMM yyyy", "d MMM yyyy", "dd/MM/yyyy", "MMMM yyyy", "d MMMM", "d MMM"], T = [
                    ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
                    ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
                ], c = [
                    ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
                    ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
                    ["D", "L", "M", "M", "J", "V", "S"]
                ];
                break;
            case "haw":
                i = ["dddd, d MMMM yyyy", "d MMM yyyy", "d/M/yyyy", "yyyy MMMM", "d MMMM", "d MMM"], T = [
                    ["Ianuali", "Pepeluali", "Malaki", "ʻApelila", "Mei", "Iune", "Iulai", "ʻAukake", "Kepakemapa", "ʻOkakopa", "Nowemapa", "Kekemapa"],
                    ["Ian.", "Pep.", "Mal.", "ʻAp.", "Mei", "Iun.", "Iul.", "ʻAu.", "Kep.", "ʻOk.", "Now.", "Kek."]
                ], c = [
                    ["Lāpule", "Poʻakahi", "Poʻalua", "Poʻakolu", "Poʻahā", "Poʻalima", "Poʻaono"],
                    ["LP", "P1", "P2", "P3", "P4", "P5", "P6"],
                    ["S", "M", "T", "W", "T", "F", "S"]
                ];
                break;
            case "hi":
                i = ["dddd, d MMMM yyyy", "d MMMM yyyy", "dd-MM-yyyy", "MMMM yyyy", "d MMMM", "d MMM"], u = ["पूर्वाह्न", "अपराह्न"], T = [
                    ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"],
                    ["जन", "फर", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अग", "सितं", "अक्टू", "नवं", "दिसं"]
                ], c = [
                    ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरूवार", "शुक्रवार", "शनिवार"],
                    ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
                    ["र", "सो", "मं", "बु", "गु", "शु", "श"]
                ];
                break;
            case "ja":
                i = ["yyyy年M月d日", "yyyy年M月d日", "yyyy/MM/dd", "yyyy年M月", "M月d日", "M月d日"], u = ["午前", "午後"], T[0] = T[1] = ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月"], c[0] = c[1] = c[2] = ["日", "月", "火", "水", "木", "金", "土"];
                break;
            case "ko":
                i = ["yyyy년 M월 d일 dddd", "yyyy년 M월 d일", "yyyy-MM-dd", "yyyy년 M월", "M월 d일", "MMM d일"], u = ["오전", "오후"], T[0] = T[1] = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], c[0] = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"], c[1] = c[2] = ["일", "월", "화", "수", "목", "금", "토"];
                break;
            case "mi":
                i = ["dddd, d MMMM y", "d MMMM y", "dd-MM-y", "MMMM yyyy", "d MMMM", "d MMM"], T = [
                    ["Kohitātea", "Huitanguru", "Poutūterangi", "Paengawhāwhā", "Haratua", "Pipiri", "Hōngongoi", "Hereturikōkā", "Mahuru", "Whiringa-ā-nuku", "Whiringa-ā-rangi", "Hakihea"],
                    ["Kohi", "Hui", "Pou", "Pae", "Hara", "Pipi", "Hōngo", "Here", "Mahu", "Nuku", "Rangi", "Haki"]
                ], c = [
                    ["Rātapu", "Rāhina", "Rātū", "Rāapa", "Rāpare", "Rāmere", "Rāhoroi"],
                    ["Tap", "Hin", "Tū", "Apa", "Par", "Mer", "Hor"],
                    ["T", "H", "T", "A", "P", "M", "H"]
                ];
                break;
            case "nl":
                i = ["dddd d MMMM yyyy", "d MMMM yyyy", "dd-MM-yyyy", "MMMM yyyy", "d MMMM", "d MMM"], u = ["a.m.", "p.m."], T = [
                    ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
                    ["jan.", "feb.", "mrt.", "apr.", "mei", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."]
                ], c = [
                    ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
                    ["zo", "ma", "di", "wo", "do", "vr", "za"],
                    ["Z", "M", "D", "W", "D", "V", "Z"]
                ];
                break;
            case "pt":
                i = ["dddd, d' de 'MMMM' de 'yyyy", "d' de  'MMMM' de 'yyyy", "dd/MM/yyyy", "MMMM' de 'yyyy", "dd' de 'MMMM", "dd' de 'MMM"], T = [
                    ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
                    ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
                ], c = [
                    ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
                    ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
                    ["D", "S", "T", "Q", "Q", "S", "S"]
                ];
                break;
            case "sv":
                i = ["dddd 'den' d MMMM yyyy", "d MMMM yyyy", "yyyy-MM-dd", "MMMM yyyy", "dd MMMM", "dd MMM"], u = ["fm", "em"], T = [
                    ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"],
                    ["jan.", "feb.", "mars", "apr.", "maj", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "dec."]
                ], c = [
                    ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
                    ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
                    ["S", "M", "T", "O", "T", "F", "L"]
                ];
                break;
            case "tr":
                i = ["dd MMMM yyyy dddd", "dd MMMM yyyy", "dd.MM.yyyy", "MMMM yyyy", "dd MMMM", "dd MMM"], u = ["ÖÖ", "ÖS"], T = [
                    ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
                    ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Ek", "Kas", "Ara"]
                ], c = [
                    ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
                    ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
                    ["P", "P", "S", "Ç", "P", "C", "C"]
                ];
                break;
            case "zh":
                i = ["yyyy年M月d日", "yyyy年M月d日", "yyyy/M/d", "yyyy年M月", "M月d日", "M月d日"], u = ["上午", "下午"], T[0] = T[1] = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], c[0] = c[1] = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"], c[2] = ["日", "一", "二", "三", "四", "五", "六"]
        }
        switch (e) {
            case "en-gb":
                i = ["dddd, d MMMM yyyy", "dd MMMM yyyy", "dd/MM/yyyy", "MMMM yyyy", "d MMMM", "d MMM"];
                break;
            case "fr-ca":
                i[1] = "MMM d yyyy", i[2] = "yyyy-MM-dd", i[4] = "MMMM d", i[5] = "MMM d", m = 0;
                break;
            case "fr-on":
                i[0] = "dddd' le 'd MMMM yyyy", i[1] = "MMM d yyyy", i[2] = "yyyy-MM-dd", m = 0;
                break;
            case "zh-tw":
                c[0] = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
        }
        const A = {
            hour24: y,
            formats: {
                dateFormats: {
                    full: i[0],
                    medium: i[1],
                    short: i[2],
                    monthYear: i[3],
                    monthDay: i[4],
                    shortMonthDay: i[5],
                    longDayOfWeek: "dddd",
                    shortDayOfWeek: "ddd",
                    longMonth: "MMMM",
                    shortMonth: "MMM"
                },
                timeFormats: {
                    full: o,
                    medium: s,
                    short: s
                }
            },
            calendar: {
                firstDayOfWeek: m,
                weekendStartDay: l,
                weekendEndDay: S,
                months: {
                    short: T[1],
                    long: T[0]
                },
                days: {
                    narrow: c[2],
                    short: c[1],
                    long: c[0]
                },
                dayPeriods: {
                    am: u[0],
                    pm: u[1]
                }
            }
        };
        return d.overrides.date && r(A, d.overrides.date), A
    })
}

function h(a, r) {
    const t = A(),
        M = e(),
        d = (r = r || {}).timezone || M.timezone.name,
        n = t.formats.timeFormats[r.format] || r.format || t.formats.timeFormats.short,
        y = a.getHours();
    let s = y % 12;
    0 === s && (s = 12);
    return m(n, {
        HH: c(a.getHours(), 2),
        H: a.getHours().toString(),
        hh: c(s, 2),
        h: s,
        mm: c(a.getMinutes(), 2),
        tt: y > 11 ? t.calendar.dayPeriods.pm : t.calendar.dayPeriods.am,
        ZZZ: d
    })
}

function g(e, a) {
    if (null == e || "" === e) return null;
    const r = A(),
        t = new RegExp("(\\d+)", "g"),
        M = e.match(t);
    if (null === M) return null;
    const d = (a = a || {}).nowProvider || function() {
            return new Date
        },
        y = n(r.calendar.dayPeriods.am),
        s = n(r.calendar.dayPeriods.pm),
        i = d(),
        o = i.getHours() < 12,
        u = M.join(""),
        T = "0" === u.substr(0, 1);
    let c = 0,
        m = 0;
    switch (u.length) {
        case 1:
            c = u.substr(0, 1);
            break;
        case 2:
            c = u.substr(0, 2);
            break;
        case 3:
            c = u.substr(0, 1), m = u.substr(1, 2);
            break;
        default:
            c = parseInt(u.substr(0, 2)), m = parseInt(u.substr(2, 2))
    }
    if (c = Math.min(Math.max(parseInt(c, 10), 0), 23), m = Math.min(Math.max(parseInt(m, 10), 0), 59), !r.hour24 && c < 13) {
        const a = e.match(s),
            r = e.match(y);
        null !== a || null === r && null === a && !o && !T ? (c += 12, 24 === c && (c = 12)) : 12 === c && (c = 0)
    }
    return new Date(i.getFullYear(), i.getMonth(), i.getDate(), c, m, 0)
}

function f(e, a) {
    const r = A();
    (a = a || {}).format = a.format || "short";
    let t = r.formats.dateFormats[a.format];
    void 0 === t && (t = a.format);
    return m(t, {
        dddd: r.calendar.days.long[e.getDay()],
        ddd: r.calendar.days.short[e.getDay()],
        dd: c(e.getDate(), 2),
        d: e.getDate().toString(),
        MMMM: r.calendar.months.long[e.getMonth()],
        MMM: r.calendar.months.short[e.getMonth()],
        MM: c(e.getMonth() + 1, 2),
        M: (e.getMonth() + 1).toString(),
        yyyy: e.getFullYear().toString(),
        yy: e.getFullYear().toString().substr(2, 2)
    })
}

function b(e) {
    null == e && (e = ""), e = e.toString().trim();
    let a = null,
        r = null,
        t = null;
    const M = u(),
        d = function() {
            const e = A(),
                a = [],
                r = u(),
                t = e.formats.dateFormats.short.split(r);
            for (let e = 0; e < t.length; e++) switch (t[e].trim()) {
                case "dd":
                case "d":
                    a.push("d");
                    break;
                case "MM":
                case "M":
                    a.push("M");
                    break;
                case "yyyy":
                case "yy":
                    a.push("yyyy")
            }
            return 3 !== a.length ? ["M", "d", "yyyy"] : a
        }(),
        n = e.split(M);
    if (n.length !== d.length) throw new Error("Invalid input date: not enough parts");
    for (let e = 0; e < d.length; e++) {
        const M = d[e],
            y = parseInt(n[e]);
        if (isNaN(y)) throw new Error("Invalid input date: part number value");
        switch (M) {
            case "yyyy":
                a = y;
                break;
            case "M":
                r = y;
                break;
            case "d":
                t = y
        }
    }
    if (! function(e, a, r) {
            if (isNaN(e) || e < 1753 || e > 9999) return !1;
            if (isNaN(a) || a < 1 || a > 12) return !1;
            if (isNaN(r) || r < 1 || r > 31) return !1;
            let t = 31;
            return 2 === a ? t = e % 4 != 0 || e % 100 == 0 && e % 400 != 0 ? 28 : 29 : 4 !== a && 6 !== a && 9 !== a && 11 !== a || (t = 30), !(r > t)
        }(a, r, t)) throw new Error("Invalid input date: part range value");
    return new Date(a, r - 1, t, 0, 0, 0)
}

function D(e, a) {
    switch ((a = a || {}).format || "short") {
        case "full":
        case "medium":
        case "short":
            return `${f(e,a)} ${h(e,a)}`
    }
    return f(e, a)
}

function p(e) {
    const a = new Date(e),
        r = y(a);
    return r ? new Date(r.year, r.month - 1, r.date, r.hours, r.minutes, r.seconds) : a
}

function H(e, a) {
    return D(p(e), a)
}

function E(e, a) {
    return f(p(e), a)
}

function k(e, a) {
    return h(p(e), a)
}
export {
    l as a, D as b, S as c, H as d, E as e, f, A as g, h, g as i, k as j, b as p
};