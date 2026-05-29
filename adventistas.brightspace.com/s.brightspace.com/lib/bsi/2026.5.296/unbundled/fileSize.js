import {
    v as e,
    g as t
} from "./common.js";
import {
    f as b
} from "./number.js";

function s(s) {
    const a = function() {
        const e = t(),
            b = {
                gigabyte: "GB",
                megabyte: "MB",
                kilobyte: "KB",
                bytes: "bytes",
                byte: "byte"
            };
        if ("zh-tw" === e) return b.bytes = b.byte = "位元組", b;
        switch (e.split("-")[0]) {
            case "ar":
                b.gigabyte = "غيغا بايت", b.megabyte = "ميغا بايت", b.kilobyte = "كيلو بايت", b.bytes = b.byte = "بايت";
                break;
            case "cy":
                b.bytes = b.byte = "beit";
                break;
            case "fr":
                b.gigabyte = "Go", b.megabyte = "Mo", b.kilobyte = "Ko", b.bytes = "octets", b.byte = "octet";
                break;
            case "hi":
                b.bytes = "बाइट्स", b.byte = "बाइट";
                break;
            case "ja":
                b.bytes = b.byte = "バイト";
                break;
            case "ko":
                b.bytes = b.byte = "바이트";
                break;
            case "sv":
                b.bytes = "byte";
                break;
            case "tr":
                b.bytes = b.byte = "bayt";
                break;
            case "zh":
                b.bytes = b.byte = "字节"
        }
        return b
    }();
    s = e(s);
    const y = [{
        unit: a.gigabyte,
        num: Math.pow(1024, 3)
    }, {
        unit: a.megabyte,
        num: Math.pow(1024, 2)
    }, {
        unit: a.kilobyte,
        num: 1024
    }, {
        unit: a.bytes,
        num: 1
    }];
    let i, o;
    if (0 === s) i = a.bytes, o = 0;
    else if (1 === Math.abs(s)) i = a.byte, o = s;
    else
        for (let e = 0; e < y.length; e++) {
            const t = y[e];
            if (Math.abs(s) >= t.num) {
                i = t.unit, o = b(s / t.num, {
                    maximumFractionDigits: 2
                });
                break
            }
        }
    return `${o} ${i}`
}
export {
    s as f
};