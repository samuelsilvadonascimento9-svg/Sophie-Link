function t(t, e) {
    if (!t) throw new Error(e)
}

function e(t, e) {
    if (!e) return !1;
    if ("string" == typeof e) return t.indexOf(e) > -1;
    let s;
    for (let i = 0; i < t.length; i++)
        if (t[i].match(e)) {
            s = t[i].match(e);
            break
        }
    return void 0 !== s
}

function s(t, s) {
    return "string" == typeof s ? Object.prototype.hasOwnProperty.call(t, s) : e(Object.keys(t), s)
}

function i(t, e) {
    if (!e) return;
    if ("string" == typeof e) return t[e];
    const s = Object.keys(t);
    for (var i = 0; i < s.length; i++) {
        const n = s[i];
        if (n.match(e)) return t[n]
    }
}

function n(t, s, i) {
    if (!Array.isArray(t) || !Array.isArray(s) || !i) return [];
    const n = [];
    for (var o = 0; o < t.length; o++) {
        var r = t[o],
            y = r[i];
        y && s.every(function(t) {
            return e(y, t)
        }) && n.push(r)
    }
    return n
}
const o = ["hidden", "text", "search", "tel", "url", "email", "password", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio", "file"];

function r(e) {
    return e instanceof r ? e : this instanceof r ? (t("object" == typeof e, "field must be an object, got " + JSON.stringify(e)), t("string" == typeof e.name, "field.name must be a string, got " + JSON.stringify(e.name)), t(void 0 === e.class || Array.isArray(e.class), "field.class must be an array or undefined, got " + JSON.stringify(e.class)), t(void 0 === e.type || "string" == typeof e.type && o.indexOf(e.type.toLowerCase()) > -1, "field.type must be a valid field type string or undefined, got " + JSON.stringify(e.type)), t(void 0 === e.title || "string" == typeof e.title, "field.title must be a string or undefined, got " + JSON.stringify(e.title)), t(void 0 === e.min || "number" == typeof e.min, "field.min must be a number or undefined, got " + JSON.stringify(e.min)), t(void 0 === e.max || "number" == typeof e.max, "field.max must be a number or undefined, got " + JSON.stringify(e.max)), this.name = e.name, e.class && (this.class = e.class), e.type && (this.type = e.type), Object.prototype.hasOwnProperty.call(e, "value") && (this.value = e.value), e.title && (this.title = e.title), "number" == typeof e.min && (this.min = e.min), void("number" == typeof e.max && (this.max = e.max))) : new r(e)
}

function y(e) {
    return e instanceof y ? e : this instanceof y ? (t("object" == typeof e, "action must be an object, got " + JSON.stringify(e)), t("string" == typeof e.name, "action.name must be a string, got " + JSON.stringify(e.name)), t("string" == typeof e.href, "action.href must be a string, got " + JSON.stringify(e.href)), t(void 0 === e.class || Array.isArray(e.class), "action.class must be an array or undefined, got " + JSON.stringify(e.class)), t(void 0 === e.method || "string" == typeof e.method, "action.method must be a string or undefined, got " + JSON.stringify(e.method)), t(void 0 === e.title || "string" == typeof e.title, "action.title must be a string or undefined, got " + JSON.stringify(e.title)), t(void 0 === e.type || "string" == typeof e.type, "action.type must be a string or undefined, got " + JSON.stringify(e.type)), t(void 0 === e.fields || Array.isArray(e.fields), "action.fields must be an array or undefined, got " + JSON.stringify(e.fields)), this.name = e.name, this.href = e.href, e.class && (this.class = e.class), this.method = e.method || "GET", e.title && (this.title = e.title), this.type = e.type || "application/x-www-form-urlencoded", this._fieldsByName = {}, this._fieldsByClass = {}, this._fieldsByType = {}, void(e.fields && (this.fields = [], e.fields.forEach(t => {
        const e = new r(t);
        this.fields.push(e), this._fieldsByName[t.name] = e, e.type && (this._fieldsByType[e.type] = this._fieldsByType[e.type] || [], this._fieldsByType[e.type].push(e)), e.class && e.class.forEach(t => {
            this._fieldsByClass[t] = this._fieldsByClass[t] || [], this._fieldsByClass[t].push(e)
        })
    })))) : new y(e)
}

function a(e) {
    return e instanceof a ? e : this instanceof a ? (t("object" == typeof e, "link must be an object, got " + JSON.stringify(e)), t(Array.isArray(e.rel), "link.rel must be an array, got " + JSON.stringify(e.rel)), t("string" == typeof e.href, "link.href must be a string, got " + JSON.stringify(e.href)), t(void 0 === e.class || Array.isArray(e.class), "link.class must be an array or undefined, got " + JSON.stringify(e.class)), t(void 0 === e.title || "string" == typeof e.title, "link.title must be a string or undefined, got " + JSON.stringify(e.title)), t(void 0 === e.type || "string" == typeof e.type, "link.type must be a string or undefined, got " + JSON.stringify(e.type)), this.rel = e.rel, this.href = e.href, e.class && (this.class = e.class), e.title && (this.title = e.title), void(e.type && (this.type = e.type))) : new a(e)
}

function l(e) {
    return (e = e || {}) instanceof l ? e : this instanceof l ? ("object" != typeof e && (e = JSON.parse(e)), t(void 0 === e.rel || Array.isArray(e.rel), "entity.rel must be an array or undefined, got " + JSON.stringify(e.rel)), t(void 0 === e.title || "string" == typeof e.title, "entity.title must be a string or undefined, got " + JSON.stringify(e.title)), t(void 0 === e.type || "string" == typeof e.type, "entity.type must be a string or undefined, got " + JSON.stringify(e.type)), t(void 0 === e.properties || "object" == typeof e.properties, "entity.properties must be an object or undefined, got " + JSON.stringify(e.properties)), t(void 0 === e.class || Array.isArray(e.class), "entity.class must be an array or undefined, got " + JSON.stringify(e.class)), t(void 0 === e.actions || Array.isArray(e.actions), "entity.actions must be an array or undefined, got " + JSON.stringify(e.actions)), t(void 0 === e.links || Array.isArray(e.links), "entity.links must be an array or undefined, got " + JSON.stringify(e.links)), t(void 0 === e.entities || Array.isArray(e.entities), "entity.entities must be an array or undefined, got " + JSON.stringify(e.entities)), e.rel && (this.rel = e.rel), e.title && (this.title = e.title), e.type && (this.type = e.type), e.properties && (this.properties = e.properties), e.class && (this.class = e.class), this._actionsByName = {}, this._actionsByClass = {}, this._actionsByMethod = {}, this._actionsByType = {}, e.actions && (this.actions = [], e.actions.forEach(t => {
        const e = new y(t);
        this.actions.push(e), this._actionsByName[e.name] = e, e.method && (this._actionsByMethod[e.method] = this._actionsByMethod[e.method] || [], this._actionsByMethod[e.method].push(e)), e.type && (this._actionsByType[e.type] = this._actionsByType[e.type] || [], this._actionsByType[e.type].push(e)), e.class && e.class.forEach(t => {
            this._actionsByClass[t] = this._actionsByClass[t] || [], this._actionsByClass[t].push(e)
        })
    })), this._linksByRel = {}, this._linksByClass = {}, this._linksByType = {}, e.links && (this.links = [], e.links.forEach(t => {
        const e = new a(t);
        this.links.push(e), e.rel.forEach(t => {
            this._linksByRel[t] = this._linksByRel[t] || [], this._linksByRel[t].push(e)
        }), e.class && e.class.forEach(t => {
            this._linksByClass[t] = this._linksByClass[t] || [], this._linksByClass[t].push(e)
        }), e.type && (this._linksByType[e.type] = this._linksByType[e.type] || [], this._linksByType[e.type].push(e))
    })), this._entitiesByRel = {}, this._entitiesByClass = {}, this._entitiesByType = {}, void(e.entities && (this.entities = [], e.entities.forEach(e => {
        let s;
        t(Array.isArray(e.rel), "sub-entities must have a rel array, got " + JSON.stringify(e.rel)), s = "string" == typeof e.href ? new a(e) : new l(e), this.entities.push(s), s.rel.forEach(t => {
            this._entitiesByRel[t] = this._entitiesByRel[t] || [], this._entitiesByRel[t].push(s)
        }), s.class && s.class.forEach(t => {
            this._entitiesByClass[t] = this._entitiesByClass[t] || [], this._entitiesByClass[t].push(s)
        }), s.type && (this._entitiesByType[s.type] = this._entitiesByType[s.type] || [], this._entitiesByType[s.type].push(s))
    })))) : new l(e)
}
r.prototype.toJSON = function() {
    return {
        name: this.name,
        class: this.class,
        type: this.type,
        value: this.value,
        title: this.title,
        min: this.min,
        max: this.max
    }
}, r.prototype.hasClass = function(t) {
    return this.class instanceof Array && e(this.class, t)
}, y.prototype.toJSON = function() {
    return {
        name: this.name,
        href: this.href,
        class: this.class,
        method: this.method,
        title: this.title,
        type: this.type,
        fields: this.fields
    }
}, y.prototype.hasClass = function(t) {
    return this.class instanceof Array && e(this.class, t)
}, y.prototype.hasField = function(t) {
    return this.hasFieldByName(t)
}, y.prototype.hasFieldByName = function(t) {
    return s(this._fieldsByName, t)
}, y.prototype.hasFieldByClass = function(t) {
    return s(this._fieldsByClass, t)
}, y.prototype.hasFieldByType = function(t) {
    return s(this._fieldsByType, t)
}, y.prototype.getField = function(t) {
    return this.getFieldByName(t)
}, y.prototype.getFieldByName = function(t) {
    return i(this._fieldsByName, t)
}, y.prototype.getFieldByClass = function(t) {
    const e = i(this._fieldsByClass, t);
    return e ? e[0] : void 0
}, y.prototype.getFieldsByClass = function(t) {
    const e = i(this._fieldsByClass, t);
    return e ? e.slice() : []
}, y.prototype.getFieldByClasses = function(t) {
    const e = n(this.fields, t, "class");
    return e && e.length > 0 ? e[0] : void 0
}, y.prototype.getFieldsByClasses = function(t) {
    const e = n(this.fields, t, "class");
    return e && e.length > 0 ? e.slice() : []
}, y.prototype.getFieldByType = function(t) {
    const e = i(this._fieldsByType, t);
    return e ? e[0] : void 0
}, y.prototype.getFieldsByType = function(t) {
    const e = i(this._fieldsByType, t);
    return e ? e.slice() : []
}, a.prototype.toJSON = function() {
    return {
        rel: this.rel,
        href: this.href,
        class: this.class,
        title: this.title,
        type: this.type
    }
}, a.prototype.hasClass = function(t) {
    return this.class instanceof Array && e(this.class, t)
}, l.prototype.toJSON = function() {
    return {
        rel: this.rel,
        title: this.title,
        type: this.type,
        properties: this.properties,
        class: this.class,
        actions: this.actions,
        links: this.links,
        entities: this.entities
    }
}, l.prototype.hasAction = function(t) {
    return this.hasActionByName(t)
}, l.prototype.hasActionByName = function(t) {
    return s(this._actionsByName, t)
}, l.prototype.hasActionByClass = function(t) {
    return s(this._actionsByClass, t)
}, l.prototype.hasActionByMethod = function(t) {
    return s(this._actionsByMethod, t)
}, l.prototype.hasActionByType = function(t) {
    return s(this._actionsByType, t)
}, l.prototype.hasClass = function(t) {
    return this.class instanceof Array && e(this.class, t)
}, l.prototype.hasEntity = function(t) {
    return this.hasSubEntityByRel(t)
}, l.prototype.hasEntityByRel = function(t) {
    return this.hasSubEntityByRel(t)
}, l.prototype.hasSubEntityByRel = function(t) {
    return s(this._entitiesByRel, t)
}, l.prototype.hasEntityByClass = function(t) {
    return this.hasSubEntityByClass(t)
}, l.prototype.hasSubEntityByClass = function(t) {
    return s(this._entitiesByClass, t)
}, l.prototype.hasEntityByType = function(t) {
    return this.hasSubEntityByType(t)
}, l.prototype.hasSubEntityByType = function(t) {
    return s(this._entitiesByType, t)
}, l.prototype.hasLink = function(t) {
    return this.hasLinkByRel(t)
}, l.prototype.hasLinkByRel = function(t) {
    return s(this._linksByRel, t)
}, l.prototype.hasLinkByClass = function(t) {
    return s(this._linksByClass, t)
}, l.prototype.hasLinkByType = function(t) {
    return s(this._linksByType, t)
}, l.prototype.hasProperty = function(t) {
    return s(this, "properties") && s(this.properties, t)
}, l.prototype.getAction = function(t) {
    return this.getActionByName(t)
}, l.prototype.getActionByName = function(t) {
    return i(this._actionsByName, t)
}, l.prototype.getActionByClass = function(t) {
    const e = i(this._actionsByClass, t);
    return e ? e[0] : void 0
}, l.prototype.getActionsByClass = function(t) {
    const e = i(this._actionsByClass, t);
    return e ? e.slice() : []
}, l.prototype.getActionByClasses = function(t) {
    const e = n(this.actions, t, "class");
    return e && e.length > 0 ? e[0] : void 0
}, l.prototype.getActionsByClasses = function(t) {
    const e = n(this.actions, t, "class");
    return e && e.length > 0 ? e.slice() : []
}, l.prototype.getActionByMethod = function(t) {
    const e = i(this._actionsByMethod, t);
    return e ? e[0] : void 0
}, l.prototype.getActionsByMethod = function(t) {
    const e = i(this._actionsByMethod, t);
    return e ? e.slice() : []
}, l.prototype.getActionByType = function(t) {
    const e = i(this._actionsByType, t);
    return e ? e[0] : void 0
}, l.prototype.getActionsByType = function(t) {
    const e = i(this._actionsByType, t);
    return e ? e.slice() : []
}, l.prototype.getLink = function(t) {
    return this.getLinkByRel(t)
}, l.prototype.getLinks = function(t) {
    return this.getLinksByRel(t)
}, l.prototype.getLinkByRel = function(t) {
    const e = i(this._linksByRel, t);
    return e ? e[0] : void 0
}, l.prototype.getLinksByRel = function(t) {
    const e = i(this._linksByRel, t);
    return e ? e.slice() : []
}, l.prototype.getLinkByRels = function(t) {
    const e = n(this.links, t, "rel");
    return e && e.length > 0 ? e[0] : void 0
}, l.prototype.getLinksByRels = function(t) {
    const e = n(this.links, t, "rel");
    return e && e.length > 0 ? e.slice() : []
}, l.prototype.getLinkByClass = function(t) {
    const e = i(this._linksByClass, t);
    return e ? e[0] : void 0
}, l.prototype.getLinksByClass = function(t) {
    const e = i(this._linksByClass, t);
    return e ? e.slice() : []
}, l.prototype.getLinkByClasses = function(t) {
    const e = n(this.links, t, "class");
    return e && e.length > 0 ? e[0] : void 0
}, l.prototype.getLinksByClasses = function(t) {
    const e = n(this.links, t, "class");
    return e && e.length > 0 ? e.slice() : []
}, l.prototype.getLinkByType = function(t) {
    const e = i(this._linksByType, t);
    return e ? e[0] : void 0
}, l.prototype.getLinksByType = function(t) {
    const e = i(this._linksByType, t);
    return e ? e.slice() : []
}, l.prototype.getSubEntity = function(t) {
    return this.getSubEntityByRel(t)
}, l.prototype.getSubEntities = function(t) {
    return this.getSubEntitiesByRel(t)
}, l.prototype.getSubEntityByRel = function(t) {
    const e = i(this._entitiesByRel, t);
    return e ? e[0] : void 0
}, l.prototype.getSubEntitiesByRel = function(t) {
    const e = i(this._entitiesByRel, t);
    return e ? e.slice() : []
}, l.prototype.getSubEntityByRels = function(t) {
    const e = n(this.entities, t, "rel");
    return e && e.length > 0 ? e[0] : void 0
}, l.prototype.getSubEntitiesByRels = function(t) {
    const e = n(this.entities, t, "rel");
    return e && e.length > 0 ? e.slice() : []
}, l.prototype.getSubEntityByClass = function(t) {
    const e = i(this._entitiesByClass, t);
    return e ? e[0] : void 0
}, l.prototype.getSubEntitiesByClass = function(t) {
    const e = i(this._entitiesByClass, t);
    return e ? e.slice() : []
}, l.prototype.getSubEntityByClasses = function(t) {
    const e = n(this.entities, t, "class");
    return e && e.length > 0 ? e[0] : void 0
}, l.prototype.getSubEntitiesByClasses = function(t) {
    const e = n(this.entities, t, "class");
    return e && e.length > 0 ? e.slice() : []
}, l.prototype.getSubEntityByType = function(t) {
    const e = i(this._entitiesByType, t);
    return e ? e[0] : void 0
}, l.prototype.getSubEntitiesByType = function(t) {
    const e = i(this._entitiesByType, t);
    return e ? e.slice() : []
};
export {
    l as E
};