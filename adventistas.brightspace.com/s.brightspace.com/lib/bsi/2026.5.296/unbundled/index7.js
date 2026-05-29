class t {
    constructor() {
        this._eventTypeGuid = "d6b021b6-ffa2-4ee8-8206-8710e04396ce"
    }
    setTypeGuid(t) {
        return this._eventTypeGuid = t, this
    }
    setDate(t) {
        return this._date = t, this
    }
    setAction(t) {
        return this._action = t, this
    }
    setTenantUrl(t) {
        return this._tenantUrl = t, this
    }
    setContext(t, e, s, i) {
        return this._context = {}, t && (this._context.Id = t.toString()), e && (this._context.Type = e), s && (this._context.Url = s), i && (this._context.Value = i), this
    }
    setObject(t, e, s, i) {
        return this._object = {}, t && (this._object.Id = t.toString()), e && (this._object.Type = e), s && (this._object.Url = s), i && (this._object.Value = i), this
    }
    setTarget(t, e, s, i) {
        return this._target = {}, t && (this._target.Id = t.toString()), e && (this._target.Type = e), s && (this._target.Url = s), i && (this._target.Value = i), this
    }
    setActivity(t, e) {
        return this._activity = {}, t && (this._activity.Id = t.toString()), e && (this._activity.Type = e), this
    }
    setActor(t, e, s, i) {
        return this._actor = {}, t && (this._actor.ImsRoleIds = t), e && (this._actor.RequestId = e), s && (this._actor.SessionId = s), i && (this._actor.CookieId = i), this
    }
    setGenerated(t, e) {
        return this._generated = {}, t && (this._generated.Id = t.toString()), e && (this._generated.Type = e), this
    }
    addActorImsRole(t) {
        return this._actor || (this._actor = {}), this._actor.ImsRoleIds || (this._actor.ImsRoleIds = []), this._actor.ImsRoleIds.push(t), this
    }
    addCustom(t, e) {
        return this._custom || (this._custom = []), this._custom.push({
            name: t.toString(),
            value: e.toString()
        }), this
    }
    setCustomJson(t) {
        return this._customJson = t, this
    }
    toJSON() {
        const t = {};
        return t.EventTypeGuid = this._eventTypeGuid, t.Action = this._action, t.TenantUrl = this._tenantUrl, this._date && (t.Date = this._date.toISOString()), this._context && (t.Context = this._context), this._activity && (t.Activity = this._activity), this._object && (t.Object = this._object), this._target && (t.Target = this._target), this._actor && (t.Actor = this._actor), this._generated && (t.Generated = this._generated), this._custom && (t.Custom = this._custom), this._customJson && (t.CustomJson = this._customJson), t
    }
}
var e = {
    Client: class {
        constructor(t) {
            this.options = t
        }
        logUserEvent(t) {
            if (this.options.endpoint) {
                var e = {
                    method: "POST"
                };
                t && (e.body = JSON.stringify(t.toJSON()));
                var s = new Request(this.options.endpoint, e);
                return window.d2lfetch.fetch(s)
            }
        }
    },
    TelemetryEvent: class {
        constructor() {}
        setType(t) {
            return this._eventType = t, this
        }
        setSourceId(t) {
            return this._sourceId = t, this
        }
        setDate(t) {
            return this._date = t, this
        }
        setBody(t) {
            return this._eventBody = t, this
        }
        toJSON() {
            const t = {};
            return t.EventType = this._eventType, t.SourceId = this._sourceId, this._date && (t.Date = this._date.toISOString()), t.EventBody = this._eventBody.toJSON(), t.name = t.EventBody.Action, t.ts = Date.now() / 1e3 | 0, t
        }
    },
    EventBody: t,
    PerformanceEventBody: class extends t {
        constructor() {
            super(...arguments), super.setTypeGuid("02a00ca0-e67d-4a6c-908b-ee80b8a61eec")
        }
        addUserTiming(t) {
            var e;
            return this._userTiming || (this._userTiming = []), this._userTiming.push(...(e = t, Array.isArray(e) ? e : [e])), this
        }
        toJSON() {
            const t = super.toJSON();
            return this._userTiming && (t.UserTiming = this._userTiming), t
        }
    },
    ProblemEventBody: class extends t {
        constructor() {
            super(...arguments), super.setTypeGuid("96a02080-a363-4524-b231-563e55aa0d47")
        }
        setProblemType(t) {
            return this._problemType = t, this
        }
        toJSON() {
            const t = super.toJSON();
            return this._problemType && (t.Problem = {
                problemType: this._problemType
            }), t
        }
    }
};
export {
    e as
    default
};