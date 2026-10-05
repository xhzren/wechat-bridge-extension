/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Os(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ne = {}, At = [], ze = () => {
}, Wr = () => !1, Hn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), jn = (e) => e.startsWith("onUpdate:"), fe = Object.assign, Ms = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ho = Object.prototype.hasOwnProperty, J = (e, t) => ho.call(e, t), P = Array.isArray, gt = (e) => hn(e) === "[object Map]", ot = (e) => hn(e) === "[object Set]", Xs = (e) => hn(e) === "[object Date]", F = (e) => typeof e == "function", oe = (e) => typeof e == "string", Xe = (e) => typeof e == "symbol", z = (e) => e !== null && typeof e == "object", Kr = (e) => (z(e) || F(e)) && F(e.then) && F(e.catch), Gr = Object.prototype.toString, hn = (e) => Gr.call(e), go = (e) => hn(e).slice(8, -1), qr = (e) => hn(e) === "[object Object]", Rs = (e) => oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Jt = /* @__PURE__ */ Os(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Bn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, mo = /-\w/g, De = Bn(
  (e) => e.replace(mo, (t) => t.slice(1).toUpperCase())
), bo = /\B([A-Z])/g, Mt = Bn(
  (e) => e.replace(bo, "-$1").toLowerCase()
), Yr = Bn((e) => e.charAt(0).toUpperCase() + e.slice(1)), es = Bn(
  (e) => e ? `on${Yr(e)}` : ""
), Ye = (e, t) => !Object.is(e, t), Cn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Jr = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, kn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, _o = (e) => {
  const t = oe(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Zs;
const Wn = () => Zs || (Zs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ps(e) {
  if (P(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = oe(s) ? To(s) : Ps(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (oe(e) || z(e))
    return e;
}
const vo = /;(?![^(]*\))/g, yo = /:([^]+)/, wo = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function To(e) {
  const t = {};
  return e.replace(wo, (n) => n.startsWith("/*") ? "" : n).split(vo).forEach((n) => {
    if (n) {
      const s = n.split(yo);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Le(e) {
  let t = "";
  if (oe(e))
    t = e;
  else if (P(e))
    for (let n = 0; n < e.length; n++) {
      const s = Le(e[n]);
      s && (t += s + " ");
    }
  else if (z(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const xo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", So = /* @__PURE__ */ Os(xo);
function zr(e) {
  return !!e || e === "";
}
function Eo(e, t, n) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let r = 0; s && r < e.length; r++)
    s = lt(e[r], t[r], n);
  return s;
}
function Qs(e, t, n) {
  if (e.size !== t.size) return !1;
  const s = Array.from(t), r = new Uint8Array(s.length);
  for (const i of e) {
    let o = -1;
    for (let l = 0; l < s.length; l++)
      if (!r[l] && lt(i, s[l], n)) {
        o = l;
        break;
      }
    if (o < 0) return !1;
    r[o] = 1;
  }
  return !0;
}
function Co(e, t, n) {
  let s = gt(e), r = gt(t);
  if (s || r || (s = ot(e), r = ot(t), s || r))
    return s && r ? Qs(e, t, n) : !1;
  const i = Object.keys(e).length, o = Object.keys(t).length;
  if (i !== o)
    return !1;
  for (const l in e) {
    const a = e.hasOwnProperty(l), d = t.hasOwnProperty(l);
    if (a && !d || !a && d || !lt(e[l], t[l], n))
      return !1;
  }
  return String(e) === String(t);
}
function er(e, t, n, s) {
  n || (n = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [r, i] = n;
  if (r.has(e) || i.has(t))
    return r.get(e) === t && i.get(t) === e;
  r.set(e, t), i.set(t, e);
  const o = s(e, t, n);
  return r.delete(e), i.delete(t), o;
}
function lt(e, t, n) {
  if (e === t) return !0;
  let s = Xs(e), r = Xs(t);
  return s || r ? s && r ? e.getTime() === t.getTime() : !1 : (s = Xe(e), r = Xe(t), s || r ? e === t : (s = P(e), r = P(t), s || r ? s && r ? er(e, t, n, Eo) : !1 : (s = z(e), r = z(t), s || r ? !s || !r ? !1 : er(e, t, n, Co) : String(e) === String(t))));
}
function $s(e, t) {
  return e.findIndex((n) => lt(n, t));
}
const Xr = (e) => !!(e && e.__v_isRef === !0), we = (e) => oe(e) ? e : e == null ? "" : P(e) || z(e) && (e.toString === Gr || !F(e.toString)) ? Xr(e) ? we(e.value) : JSON.stringify(e, Zr, 2) : String(e), Zr = (e, t) => Xr(t) ? Zr(e, t.value) : gt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[ts(s, i) + " =>"] = r, n),
    {}
  )
} : ot(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ts(n))
} : Xe(t) ? ts(t) : z(t) && !P(t) && !qr(t) ? String(t) : t, ts = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Xe(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let he;
class Ao {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && he && (he.active ? (this.parent = he, this.index = (he.scopes || (he.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes) {
        const s = this.scopes.slice();
        for (t = 0, n = s.length; t < n; t++)
          s[t].pause();
      }
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes) {
        const r = this.scopes.slice();
        for (t = 0, n = r.length; t < n; t++)
          r[t].resume();
      }
      const s = this.effects.slice();
      for (t = 0, n = s.length; t < n; t++)
        s[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = he;
      try {
        return he = this, t();
      } finally {
        he = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = he, he = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (he === this)
        he = this.prevScope;
      else {
        let t = he;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        const r = this.scopes.slice();
        for (n = 0, s = r.length; n < s; n++)
          r[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Io() {
  return he;
}
let se;
const ns = /* @__PURE__ */ new WeakSet();
class Qr {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, he && (he.active ? he.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ns.has(this) && (ns.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ti(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, tr(this), ni(this);
    const t = se, n = Fe;
    se = this, Fe = !0;
    try {
      return this.fn();
    } finally {
      si(this), se = t, Fe = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Ls(t);
      this.deps = this.depsTail = void 0, tr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ns.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ms(this) && this.run();
  }
  get dirty() {
    return ms(this);
  }
}
let ei = 0, zt, Xt;
function ti(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Xt, Xt = e;
    return;
  }
  e.next = zt, zt = e;
}
function Ns() {
  ei++;
}
function Ds() {
  if (--ei > 0)
    return;
  if (Xt) {
    let t = Xt;
    for (Xt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; zt; ) {
    let t = zt;
    for (zt = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function ni(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function si(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), Ls(s), Oo(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function ms(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ri(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ri(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === sn) || (e.globalVersion = sn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ms(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = se, s = Fe;
  se = e, Fe = !0;
  try {
    ni(e);
    const r = e.fn(e._value);
    (t.version === 0 || Ye(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    se = n, Fe = s, si(e), e.flags &= -3;
  }
}
function Ls(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      Ls(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Oo(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Fe = !0;
const ii = [];
function at() {
  ii.push(Fe), Fe = !1;
}
function ct() {
  const e = ii.pop();
  Fe = e === void 0 ? !0 : e;
}
function tr(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = se;
    se = void 0;
    try {
      t();
    } finally {
      se = n;
    }
  }
}
let sn = 0;
class Mo {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Fs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!se || !Fe || se === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== se)
      n = this.activeLink = new Mo(se, this), se.deps ? (n.prevDep = se.depsTail, se.depsTail.nextDep = n, se.depsTail = n) : se.deps = se.depsTail = n, oi(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = se.depsTail, n.nextDep = void 0, se.depsTail.nextDep = n, se.depsTail = n, se.deps === n && (se.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, sn++, this.notify(t);
  }
  notify(t) {
    Ns();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ds();
    }
  }
}
function oi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        oi(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const bs = /* @__PURE__ */ new WeakMap(), It = /* @__PURE__ */ Symbol(
  ""
), _s = /* @__PURE__ */ Symbol(
  ""
), rn = /* @__PURE__ */ Symbol(
  ""
);
function be(e, t, n) {
  if (Fe && se) {
    let s = bs.get(e);
    s || bs.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new Fs()), r.map = s, r.key = n), r.track();
  }
}
function rt(e, t, n, s, r, i) {
  const o = bs.get(e);
  if (!o) {
    sn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (Ns(), t === "clear")
    o.forEach(l);
  else {
    const a = P(e), d = a && Rs(n);
    if (a && n === "length") {
      const u = Number(s);
      o.forEach((p, m) => {
        (m === "length" || m === rn || !Xe(m) && m >= u) && l(p);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), d && l(o.get(rn)), t) {
        case "add":
          a ? d && l(o.get("length")) : (l(o.get(It)), gt(e) && l(o.get(_s)));
          break;
        case "delete":
          a || (l(o.get(It)), gt(e) && l(o.get(_s)));
          break;
        case "set":
          gt(e) && l(o.get(It));
          break;
      }
  }
  Ds();
}
function Rt(e) {
  const t = /* @__PURE__ */ G(e);
  return t === e || (be(t, "iterate", rn), /* @__PURE__ */ Me(e)) ? t : /* @__PURE__ */ Ze(e) ? /* @__PURE__ */ mt(e) ? t.map((n) => bt(Re(n))) : t.map(bt) : t.map(Re);
}
function Kn(e) {
  return be(e = /* @__PURE__ */ G(e), "iterate", rn), e;
}
function Ge(e, t) {
  return /* @__PURE__ */ Ze(e) ? bt(/* @__PURE__ */ mt(e) ? Re(t) : t) : Re(t);
}
const Ro = {
  __proto__: null,
  [Symbol.iterator]() {
    return ss(this, Symbol.iterator, (e) => Ge(this, e));
  },
  concat(...e) {
    return Rt(this).concat(
      ...e.map((t) => P(t) ? Rt(t) : t)
    );
  },
  entries() {
    return ss(this, "entries", (e) => (e[1] = Ge(this, e[1]), e));
  },
  every(e, t) {
    return et(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return et(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => Ge(this, s)),
      arguments
    );
  },
  find(e, t) {
    return et(
      this,
      "find",
      e,
      t,
      (n) => Ge(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return et(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return et(
      this,
      "findLast",
      e,
      t,
      (n) => Ge(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return et(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return et(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return rs(this, "includes", e);
  },
  indexOf(...e) {
    return rs(this, "indexOf", e);
  },
  join(e) {
    return Rt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return rs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return et(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ht(this, "pop");
  },
  push(...e) {
    return Ht(this, "push", e);
  },
  reduce(e, ...t) {
    return nr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return nr(this, "reduceRight", e, t);
  },
  shift() {
    return Ht(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return et(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ht(this, "splice", e);
  },
  toReversed() {
    return Rt(this).toReversed();
  },
  toSorted(e) {
    return Rt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Rt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ht(this, "unshift", e);
  },
  values() {
    return ss(this, "values", (e) => Ge(this, e));
  }
};
function ss(e, t, n) {
  const s = Kn(e), r = s[t]();
  return s !== e && !/* @__PURE__ */ Me(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.done || (i.value = n(i.value)), i;
  }), r;
}
const Po = Array.prototype;
function et(e, t, n, s, r, i) {
  const o = Kn(e), l = o !== e && !/* @__PURE__ */ Me(e), a = o[t];
  if (a !== Po[t]) {
    const p = a.apply(e, i);
    return l ? Re(p) : p;
  }
  let d = n;
  o !== e && (l ? d = function(p, m) {
    return n.call(this, Ge(e, p), m, e);
  } : n.length > 2 && (d = function(p, m) {
    return n.call(this, p, m, e);
  }));
  const u = a.call(o, d, s);
  return l && r ? r(u) : u;
}
function nr(e, t, n, s) {
  const r = Kn(e), i = r !== e && !/* @__PURE__ */ Me(e);
  let o = n, l = !1;
  r !== e && (i ? (l = s.length === 0, o = function(d, u, p) {
    return l && (l = !1, d = Ge(e, d)), n.call(this, d, Ge(e, u), p, e);
  }) : n.length > 3 && (o = function(d, u, p) {
    return n.call(this, d, u, p, e);
  }));
  const a = r[t](o, ...s);
  return l ? Ge(e, a) : a;
}
function rs(e, t, n) {
  const s = /* @__PURE__ */ G(e);
  be(s, "iterate", rn);
  const r = s[t](...n);
  return (r === -1 || r === !1) && /* @__PURE__ */ Hs(n[0]) ? (n[0] = /* @__PURE__ */ G(n[0]), s[t](...n)) : r;
}
function Ht(e, t, n = []) {
  at(), Ns();
  const s = (/* @__PURE__ */ G(e))[t].apply(e, n);
  return Ds(), ct(), s;
}
const $o = /* @__PURE__ */ Os("__proto__,__v_isRef,__isVue"), li = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Xe)
);
function No(e) {
  Xe(e) || (e = String(e));
  const t = /* @__PURE__ */ G(this);
  return be(t, "has", e), t.hasOwnProperty(e);
}
class ai {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return s === (r ? i ? Wo : di : i ? fi : ui).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = P(t);
    if (!r) {
      let a;
      if (o && (a = Ro[n]))
        return a;
      if (n === "hasOwnProperty")
        return No;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ _e(t) ? t : s
    );
    if ((Xe(n) ? li.has(n) : $o(n)) || (r || be(t, "get", n), i))
      return l;
    if (/* @__PURE__ */ _e(l)) {
      const a = o && Rs(n) ? l : l.value;
      return r && z(a) ? /* @__PURE__ */ ys(a) : a;
    }
    return z(l) ? r ? /* @__PURE__ */ ys(l) : /* @__PURE__ */ gn(l) : l;
  }
}
class ci extends ai {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    const o = P(t) && Rs(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ Ze(i);
      if (!/* @__PURE__ */ Me(s) && !/* @__PURE__ */ Ze(s) && (i = /* @__PURE__ */ G(i), s = /* @__PURE__ */ G(s)), !o && /* @__PURE__ */ _e(i) && !/* @__PURE__ */ _e(s))
        return d || (i.value = s), !0;
    }
    const l = o ? Number(n) < t.length : J(t, n), a = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ _e(t) ? t : r
    );
    return t === /* @__PURE__ */ G(r) && a && (l ? Ye(s, i) && rt(t, "set", n, s) : rt(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = J(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && rt(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Xe(n) || !li.has(n)) && be(t, "has", n), s;
  }
  ownKeys(t) {
    return be(
      t,
      "iterate",
      P(t) ? "length" : It
    ), Reflect.ownKeys(t);
  }
}
class Do extends ai {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Lo = /* @__PURE__ */ new ci(), Fo = /* @__PURE__ */ new Do(), Vo = /* @__PURE__ */ new ci(!0);
const vs = (e) => e, vn = (e) => Reflect.getPrototypeOf(e);
function Uo(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = /* @__PURE__ */ G(r), o = gt(i), l = e === "entries" || e === Symbol.iterator && o, a = e === "keys" && o, d = r[e](...s), u = n ? vs : t ? bt : Re;
    return !t && be(
      i,
      "iterate",
      a ? _s : It
    ), fe(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: p, done: m } = d.next();
          return m ? { value: p, done: m } : {
            value: l ? [u(p[0]), u(p[1])] : u(p),
            done: m
          };
        }
      }
    );
  };
}
function yn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ho(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ G(i), l = /* @__PURE__ */ G(r);
      e || (Ye(r, l) && be(o, "get", r), be(o, "get", l));
      const { has: a } = vn(o), d = t ? vs : e ? bt : Re;
      if (a.call(o, r))
        return d(i.get(r));
      if (a.call(o, l))
        return d(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && be(/* @__PURE__ */ G(r), "iterate", It), r.size;
    },
    has(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ G(i), l = /* @__PURE__ */ G(r);
      return e || (Ye(r, l) && be(o, "has", r), be(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, a = /* @__PURE__ */ G(l), d = t ? vs : e ? bt : Re;
      return !e && be(a, "iterate", It), l.forEach((u, p) => r.call(i, d(u), d(p), o));
    }
  };
  return fe(
    n,
    e ? {
      add: yn("add"),
      set: yn("set"),
      delete: yn("delete"),
      clear: yn("clear")
    } : {
      add(r) {
        const i = /* @__PURE__ */ G(this), o = vn(i), l = /* @__PURE__ */ G(r), a = !t && !/* @__PURE__ */ Me(r) && !/* @__PURE__ */ Ze(r) ? l : r;
        return o.has.call(i, a) || Ye(r, a) && o.has.call(i, r) || Ye(l, a) && o.has.call(i, l) || (i.add(a), rt(i, "add", a, a)), this;
      },
      set(r, i) {
        !t && !/* @__PURE__ */ Me(i) && !/* @__PURE__ */ Ze(i) && (i = /* @__PURE__ */ G(i));
        const o = /* @__PURE__ */ G(this), { has: l, get: a } = vn(o);
        let d = l.call(o, r);
        d || (r = /* @__PURE__ */ G(r), d = l.call(o, r));
        const u = a.call(o, r);
        return o.set(r, i), d ? Ye(i, u) && rt(o, "set", r, i) : rt(o, "add", r, i), this;
      },
      delete(r) {
        const i = /* @__PURE__ */ G(this), { has: o, get: l } = vn(i);
        let a = o.call(i, r);
        a || (r = /* @__PURE__ */ G(r), a = o.call(i, r)), l && l.call(i, r);
        const d = i.delete(r);
        return a && rt(i, "delete", r, void 0), d;
      },
      clear() {
        const r = /* @__PURE__ */ G(this), i = r.size !== 0, o = r.clear();
        return i && rt(
          r,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = Uo(r, e, t);
  }), n;
}
function Vs(e, t) {
  const n = Ho(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    J(n, r) && r in s ? n : s,
    r,
    i
  );
}
const jo = {
  get: /* @__PURE__ */ Vs(!1, !1)
}, Bo = {
  get: /* @__PURE__ */ Vs(!1, !0)
}, ko = {
  get: /* @__PURE__ */ Vs(!0, !1)
};
const ui = /* @__PURE__ */ new WeakMap(), fi = /* @__PURE__ */ new WeakMap(), di = /* @__PURE__ */ new WeakMap(), Wo = /* @__PURE__ */ new WeakMap();
function Ko(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function gn(e) {
  return /* @__PURE__ */ Ze(e) ? e : Us(
    e,
    !1,
    Lo,
    jo,
    ui
  );
}
// @__NO_SIDE_EFFECTS__
function Go(e) {
  return Us(
    e,
    !1,
    Vo,
    Bo,
    fi
  );
}
// @__NO_SIDE_EFFECTS__
function ys(e) {
  return Us(
    e,
    !0,
    Fo,
    ko,
    di
  );
}
function Us(e, t, n, s, r) {
  if (!z(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const o = Ko(go(e));
  if (o === 0)
    return e;
  const l = new Proxy(
    e,
    o === 2 ? s : n
  );
  return r.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function mt(e) {
  return /* @__PURE__ */ Ze(e) ? /* @__PURE__ */ mt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ze(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Me(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Hs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function G(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ G(t) : e;
}
function qo(e) {
  return !J(e, "__v_skip") && Object.isExtensible(e) && Jr(e, "__v_skip", !0), e;
}
const Re = (e) => z(e) ? /* @__PURE__ */ gn(e) : e, bt = (e) => z(e) ? /* @__PURE__ */ ys(e) : e;
// @__NO_SIDE_EFFECTS__
function _e(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Dt(e) {
  return Yo(e, !1);
}
function Yo(e, t) {
  return /* @__PURE__ */ _e(e) ? e : new Jo(e, t);
}
class Jo {
  constructor(t, n) {
    this.dep = new Fs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ G(t), this._value = n ? t : Re(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Me(t) || /* @__PURE__ */ Ze(t);
    t = s ? t : /* @__PURE__ */ G(t), Ye(t, n) && (this._rawValue = t, this._value = s ? t : Re(t), this.dep.trigger());
  }
}
function ue(e) {
  return /* @__PURE__ */ _e(e) ? e.value : e;
}
const zo = {
  get: (e, t, n) => t === "__v_raw" ? e : ue(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return /* @__PURE__ */ _e(r) && !/* @__PURE__ */ _e(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function pi(e) {
  return /* @__PURE__ */ mt(e) ? e : new Proxy(e, zo);
}
class Xo {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Fs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = sn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    se !== this)
      return ti(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ri(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Zo(e, t, n = !1) {
  let s, r;
  return F(e) ? s = e : (s = e.get, r = e.set), new Xo(s, r, n);
}
const wn = {}, Mn = /* @__PURE__ */ new WeakMap();
let Et;
function Qo(e, t = !1, n = Et) {
  if (n) {
    let s = Mn.get(n);
    s || Mn.set(n, s = []), s.push(e);
  }
}
function el(e, t, n = ne) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: a } = n, d = (x) => r ? x : /* @__PURE__ */ Me(x) || r === !1 || r === 0 ? it(x, 1) : it(x);
  let u, p, m, E, D = !1, R = !1;
  if (/* @__PURE__ */ _e(e) ? (p = () => e.value, D = /* @__PURE__ */ Me(e)) : /* @__PURE__ */ mt(e) ? (p = () => d(e), D = !0) : P(e) ? (R = !0, D = e.some((x) => /* @__PURE__ */ mt(x) || /* @__PURE__ */ Me(x)), p = () => e.map((x) => {
    if (/* @__PURE__ */ _e(x))
      return x.value;
    if (/* @__PURE__ */ mt(x))
      return d(x);
    if (F(x))
      return a ? a(x, 2) : x();
  })) : F(e) ? t ? p = a ? () => a(e, 2) : e : p = () => {
    if (m) {
      at();
      try {
        m();
      } finally {
        ct();
      }
    }
    const x = Et;
    Et = u;
    try {
      return a ? a(e, 3, [E]) : e(E);
    } finally {
      Et = x;
    }
  } : p = ze, t && r) {
    const x = p, X = r === !0 ? 1 / 0 : r;
    p = () => it(x(), X);
  }
  const B = Io(), j = () => {
    u.stop(), B && B.active && Ms(B.effects, u);
  };
  if (i && t) {
    const x = t;
    t = (...X) => {
      const ie = x(...X);
      return j(), ie;
    };
  }
  let A = R ? new Array(e.length).fill(wn) : wn;
  const b = (x) => {
    if (!(!(u.flags & 1) || !u.dirty && !x))
      if (t) {
        const X = u.run();
        if (x || r || D || (R ? X.some((ie, de) => Ye(ie, A[de])) : Ye(X, A))) {
          m && m();
          const ie = Et;
          Et = u;
          try {
            const de = [
              X,
              // pass undefined as the old value when it's changed for the first time
              A === wn ? void 0 : R && A[0] === wn ? [] : A,
              E
            ];
            A = X, a ? a(t, 3, de) : (
              // @ts-expect-error
              t(...de)
            );
          } finally {
            Et = ie;
          }
        }
      } else
        u.run();
  };
  return l && l(b), u = new Qr(p), u.scheduler = o ? () => o(b, !1) : b, E = (x) => Qo(x, !1, u), m = u.onStop = () => {
    const x = Mn.get(u);
    if (x) {
      if (a)
        a(x, 4);
      else
        for (const X of x) X();
      Mn.delete(u);
    }
  }, t ? s ? b(!0) : A = u.run() : o ? o(b.bind(null, !0), !0) : u.run(), j.pause = u.pause.bind(u), j.resume = u.resume.bind(u), j.stop = j, j;
}
function it(e, t = 1 / 0, n) {
  if (t <= 0 || !z(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ _e(e))
    it(e.value, t, n);
  else if (P(e))
    for (let s = 0; s < e.length; s++)
      it(e[s], t, n);
  else if (ot(e) || gt(e))
    e.forEach((s) => {
      it(s, t, n);
    });
  else if (qr(e)) {
    for (const s in e)
      it(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && it(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function mn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Gn(r, t, n);
  }
}
function Pe(e, t, n, s) {
  if (F(e)) {
    const r = mn(e, t, n, s);
    return r && Kr(r) && r.catch((i) => {
      Gn(i, t, n);
    }), r;
  }
  if (P(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(Pe(e[i], t, n, s));
    return r;
  }
}
function Gn(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || ne;
  if (t) {
    let l = t.parent;
    const a = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let p = 0; p < u.length; p++)
          if (u[p](e, a, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      at(), mn(i, null, 10, [
        e,
        a,
        d
      ]), ct();
      return;
    }
  }
  tl(e, n, r, s, o);
}
function tl(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const ye = [];
let Ke = -1;
const $t = [];
let pt = null, Pt = 0;
const hi = /* @__PURE__ */ Promise.resolve();
let Rn = null;
function gi(e) {
  const t = Rn || hi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function nl(e) {
  let t = Ke + 1, n = ye.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = ye[s], i = on(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function js(e) {
  if (!(e.flags & 1)) {
    const t = on(e), n = ye[ye.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= on(n) ? ye.push(e) : ye.splice(nl(t), 0, e), e.flags |= 1, mi();
  }
}
function mi() {
  Rn || (Rn = hi.then(_i));
}
function sl(e) {
  if (!P(e))
    pt && e.id === -1 ? pt.splice(Pt + 1, 0, e) : e.flags & 1 || ($t.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      $t.push(e[t]);
  mi();
}
function sr(e, t, n = Ke + 1) {
  for (; n < ye.length; n++) {
    const s = ye[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      ye.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function bi(e) {
  if ($t.length) {
    const t = [...new Set($t)].sort(
      (n, s) => on(n) - on(s)
    );
    if ($t.length = 0, pt) {
      for (let n = 0; n < t.length; n++)
        pt.push(t[n]);
      return;
    }
    for (pt = t, Pt = 0; Pt < pt.length; Pt++) {
      const n = pt[Pt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    pt = null, Pt = 0;
  }
}
const on = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function _i(e) {
  try {
    for (Ke = 0; Ke < ye.length; Ke++) {
      const t = ye[Ke];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), mn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ke < ye.length; Ke++) {
      const t = ye[Ke];
      t && (t.flags &= -2);
    }
    Ke = -1, ye.length = 0, bi(), Rn = null, (ye.length || $t.length) && _i();
  }
}
let Oe = null, vi = null;
function Pn(e) {
  const t = Oe;
  return Oe = e, vi = e && e.type.__scopeId || null, t;
}
function yi(e, t = Oe, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && Ln(-1);
    const i = Pn(t), o = Ot.length;
    let l;
    try {
      l = e(...r);
    } finally {
      for (let a = Ot.length; a > o; a--) zi();
      Pn(i), s._d && Ln(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Ne(e, t) {
  if (Oe === null)
    return e;
  const n = Zn(Oe), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, l, a = ne] = t[r];
    i && (F(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && it(o), s.push({
      dir: i,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return e;
}
function wt(e, t, n, s) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let a = l.dir[s];
    a && (at(), Pe(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), ct());
  }
}
function rl(e, t) {
  if (xe) {
    let n = xe.provides;
    const s = xe.parent && xe.parent.provides;
    s === n && (n = xe.provides = Object.create(s)), n[e] = t;
  }
}
function Zt(e, t, n = !1) {
  const s = Qi();
  if (s || Nt) {
    let r = Nt ? Nt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && F(t) ? t.call(s && s.proxy) : t;
  }
}
const il = /* @__PURE__ */ Symbol.for("v-scx"), ol = () => Zt(il);
function is(e, t, n) {
  return wi(e, t, n);
}
function wi(e, t, n = ne) {
  const { immediate: s, deep: r, flush: i, once: o } = n, l = fe({}, n), a = t && s || !t && i !== "post";
  let d;
  if (un) {
    if (i === "sync") {
      const E = ol();
      d = E.__watcherHandles || (E.__watcherHandles = []);
    } else if (!a) {
      const E = () => {
      };
      return E.stop = ze, E.resume = ze, E.pause = ze, E;
    }
  }
  const u = xe;
  l.call = (E, D, R) => Pe(E, u, D, R);
  let p = !1;
  i === "post" ? l.scheduler = (E) => {
    Se(E, u && u.suspense);
  } : i !== "sync" && (p = !0, l.scheduler = (E, D) => {
    D ? E() : js(E);
  }), l.augmentJob = (E) => {
    t && (E.flags |= 4), p && (E.flags |= 2, u && (E.id = u.uid, E.i = u));
  };
  const m = el(e, t, l);
  return un && (d ? d.push(m) : a && m()), m;
}
function ll(e, t, n) {
  const s = this.proxy, r = oe(e) ? e.includes(".") ? Ti(s, e) : () => s[e] : e.bind(s, s);
  let i;
  F(t) ? i = t : (i = t.handler, n = t);
  const o = bn(this), l = wi(r, i.bind(s), n);
  return o(), l;
}
function Ti(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const al = /* @__PURE__ */ Symbol("_vte"), qn = (e) => e.__isTeleport, Ie = /* @__PURE__ */ Symbol("_leaveCb"), jt = /* @__PURE__ */ Symbol("_enterCb");
function cl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Mi(() => {
    e.isMounted = !0;
  }), Ri(() => {
    e.isUnmounting = !0;
  }), e;
}
const Ae = [Function, Array], xi = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Ae,
  onEnter: Ae,
  onAfterEnter: Ae,
  onEnterCancelled: Ae,
  // leave
  onBeforeLeave: Ae,
  onLeave: Ae,
  onAfterLeave: Ae,
  onLeaveCancelled: Ae,
  // appear
  onBeforeAppear: Ae,
  onAppear: Ae,
  onAfterAppear: Ae,
  onAppearCancelled: Ae
}, Si = (e) => {
  const t = e.subTree;
  return t.component ? Si(t.component) : t;
}, ul = {
  name: "BaseTransition",
  props: xi,
  setup(e, { slots: t }) {
    const n = Qi(), s = cl();
    return () => {
      const r = t.default && Ai(t.default(), !0), i = r && r.length ? Ei(r) : (
        // Keep explicit default-slot conditionals on the same transition path
        // as regular v-if branches, which render a comment placeholder.
        n.subTree ? Ve() : void 0
      );
      if (!i)
        return;
      const o = /* @__PURE__ */ G(e), { mode: l } = o;
      if (s.isLeaving)
        return os(i);
      const a = $n(i);
      if (!a)
        return os(i);
      let d = ws(
        a,
        o,
        s,
        n,
        // #11061, ensure enterHooks is fresh after clone
        (p) => d = p
      );
      a.type !== Te && ln(a, d);
      let u = n.subTree && $n(n.subTree);
      if (u && u.type !== Te && !Ct(u, a) && Si(n).type !== Te) {
        let p = ws(
          u,
          o,
          s,
          n
        );
        if (ln(u, p), l === "out-in" && a.type !== Te)
          return s.isLeaving = !0, p.afterLeave = () => {
            s.isLeaving = !1, n.job.flags & 8 || n.update(), delete p.afterLeave, u = void 0;
          }, os(i);
        l === "in-out" && a.type !== Te ? p.delayLeave = (m, E, D) => {
          const R = Ci(
            s,
            u
          );
          R[String(u.key)] = u, m[Ie] = () => {
            E(), m[Ie] = void 0, delete d.delayedLeave, u = void 0;
          }, d.delayedLeave = () => {
            D(), delete d.delayedLeave, u = void 0;
          };
        } : u = void 0;
      } else u && (u = void 0);
      return i;
    };
  }
};
function Ei(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Te) {
        t = n;
        break;
      }
  }
  return t;
}
const fl = ul;
function Ci(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function ws(e, t, n, s, r) {
  const {
    appear: i,
    mode: o,
    persisted: l = !1,
    onBeforeEnter: a,
    onEnter: d,
    onAfterEnter: u,
    onEnterCancelled: p,
    onBeforeLeave: m,
    onLeave: E,
    onAfterLeave: D,
    onLeaveCancelled: R,
    onBeforeAppear: B,
    onAppear: j,
    onAfterAppear: A,
    onAppearCancelled: b
  } = t, x = String(e.key), X = Ci(n, e), ie = (V, K) => {
    V && Pe(
      V,
      s,
      9,
      K
    );
  }, de = (V, K) => {
    const re = K[1];
    ie(V, K), P(V) ? V.every((O) => O.length <= 1) && re() : V.length <= 1 && re();
  }, me = {
    mode: o,
    persisted: l,
    beforeEnter(V) {
      let K = a;
      if (!n.isMounted)
        if (i)
          K = B || a;
        else
          return;
      V[Ie] && V[Ie](
        !0
        /* cancelled */
      );
      const re = X[x];
      re && Ct(e, re) && re.el[Ie] && re.el[Ie](), ie(K, [V]);
    },
    enter(V) {
      if (X[x] === e) return;
      let K = d, re = u, O = p;
      if (!n.isMounted)
        if (i)
          K = j || d, re = A || u, O = b || p;
        else
          return;
      let Z = !1;
      V[jt] = (U) => {
        Z || (Z = !0, U ? ie(O, [V]) : ie(re, [V]), me.delayedLeave && me.delayedLeave(), V[jt] = void 0);
      };
      const M = V[jt].bind(null, !1);
      K ? de(K, [V, M]) : M();
    },
    leave(V, K) {
      const re = String(e.key);
      if (V[jt] && V[jt](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return K();
      ie(m, [V]);
      let O = !1;
      V[Ie] = (M) => {
        O || (O = !0, K(), M ? ie(R, [V]) : ie(D, [V]), V[Ie] = void 0, X[re] === e && delete X[re]);
      };
      const Z = V[Ie].bind(null, !1);
      X[re] = e, E ? de(E, [V, Z]) : Z();
    },
    clone(V) {
      const K = ws(
        V,
        t,
        n,
        s,
        r
      );
      return r && r(K), K;
    }
  };
  return me;
}
function os(e) {
  if (Yn(e))
    return e = _t(e), e.children = null, e;
}
function $n(e) {
  if (!Yn(e))
    return qn(e.type) && e.children ? Ei(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && F(n.default))
      return n.default();
  }
}
function ln(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    ln(
      qn(n.type) && $n(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ai(e, t = !1, n) {
  let s = [], r = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
    o.type === ge ? (o.patchFlag & 128 && r++, s = s.concat(
      Ai(o.children, t, l)
    )) : (t || o.type !== Te) && s.push(l != null ? _t(o, { key: l }) : o);
  }
  if (r > 1)
    for (let i = 0; i < s.length; i++)
      s[i].patchFlag = -2;
  return s;
}
// @__NO_SIDE_EFFECTS__
function ut(e, t) {
  return F(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    fe({ name: e.name }, t, { setup: e })
  ) : e;
}
function Ii(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function rr(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Nn = /* @__PURE__ */ new WeakMap();
function Qt(e, t, n, s, r = !1) {
  if (P(e)) {
    e.forEach(
      (R, B) => Qt(
        R,
        t && (P(t) ? t[B] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (en(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Qt(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? Zn(s.component) : s.el, o = r ? null : i, { i: l, r: a } = e, d = t && t.r, u = l.refs === ne ? l.refs = {} : l.refs, p = l.setupState, m = /* @__PURE__ */ G(p), E = p === ne ? Wr : (R) => rr(u, R) ? !1 : J(m, R), D = (R, B) => !(B && rr(u, B));
  if (d != null && d !== a) {
    if (ir(t), oe(d))
      u[d] = null, E(d) && (p[d] = null);
    else if (/* @__PURE__ */ _e(d)) {
      const R = t;
      D(d, R.k) && (d.value = null), R.k && (u[R.k] = null);
    }
  }
  if (F(a))
    mn(a, l, 12, [o, u]);
  else {
    const R = oe(a), B = /* @__PURE__ */ _e(a);
    if (R || B) {
      const j = () => {
        if (e.f) {
          const A = R ? E(a) ? p[a] : u[a] : D() || !e.k ? a.value : u[e.k];
          if (r)
            P(A) && Ms(A, i);
          else if (P(A))
            A.includes(i) || A.push(i);
          else if (R)
            u[a] = [i], E(a) && (p[a] = u[a]);
          else {
            const b = [i];
            D(a, e.k) && (a.value = b), e.k && (u[e.k] = b);
          }
        } else R ? (u[a] = o, E(a) && (p[a] = o)) : B && (D(a, e.k) && (a.value = o), e.k && (u[e.k] = o));
      };
      if (o) {
        const A = () => {
          j(), Nn.delete(e);
        };
        A.id = -1, Nn.set(e, A), Se(A, n);
      } else
        ir(e), j();
    }
  }
}
function ir(e) {
  const t = Nn.get(e);
  t && (t.flags |= 8, Nn.delete(e));
}
Wn().requestIdleCallback;
Wn().cancelIdleCallback;
const en = (e) => !!e.type.__asyncLoader, Yn = (e) => e.type.__isKeepAlive;
function dl(e, t) {
  Oi(e, "a", t);
}
function pl(e, t) {
  Oi(e, "da", t);
}
function Oi(e, t, n = xe) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Jn(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Yn(r.parent.vnode) && hl(s, t, n, r), r = r.parent;
  }
}
function hl(e, t, n, s) {
  const r = Jn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Pi(() => {
    Ms(s[t], r);
  }, n);
}
function Jn(e, t, n = xe, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      at();
      const l = bn(n), a = Pe(t, n, e, o);
      return l(), ct(), a;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const ft = (e) => (t, n = xe) => {
  (!un || e === "sp") && Jn(e, (...s) => t(...s), n);
}, gl = ft("bm"), Mi = ft("m"), ml = ft(
  "bu"
), bl = ft("u"), Ri = ft(
  "bum"
), Pi = ft("um"), _l = ft(
  "sp"
), vl = ft("rtg"), yl = ft("rtc");
function wl(e, t = xe) {
  Jn("ec", e, t);
}
const Tl = /* @__PURE__ */ Symbol.for("v-ndc");
function tn(e, t, n, s) {
  let r;
  const i = n, o = P(e);
  if (o || oe(e)) {
    const l = o && /* @__PURE__ */ mt(e);
    let a = !1, d = !1;
    l && (a = !/* @__PURE__ */ Me(e), d = /* @__PURE__ */ Ze(e), e = Kn(e)), r = new Array(e.length);
    for (let u = 0, p = e.length; u < p; u++)
      r[u] = t(
        a ? d ? bt(Re(e[u])) : Re(e[u]) : e[u],
        u,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, i);
  } else if (z(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, a) => t(l, a, void 0, i)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let a = 0, d = l.length; a < d; a++) {
        const u = l[a];
        r[a] = t(e[u], u, a, i);
      }
    }
  else
    r = [];
  return r;
}
const Ts = (e) => e ? eo(e) ? Zn(e) : Ts(e.parent) : null, nn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ fe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ts(e.parent),
    $root: (e) => Ts(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Ni(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      js(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = gi.bind(e.proxy)),
    $watch: (e) => ll.bind(e)
  })
), ls = (e, t) => e !== ne && !e.__isScriptSetup && J(e, t), xl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: a } = e;
    if (t[0] !== "$") {
      const m = o[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (ls(s, t))
          return o[t] = 1, s[t];
        if (r !== ne && J(r, t))
          return o[t] = 2, r[t];
        if (J(i, t))
          return o[t] = 3, i[t];
        if (n !== ne && J(n, t))
          return o[t] = 4, n[t];
        xs && (o[t] = 0);
      }
    }
    const d = nn[t];
    let u, p;
    if (d)
      return t === "$attrs" && be(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (u = l.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== ne && J(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      p = a.config.globalProperties, J(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return ls(r, t) ? (r[t] = n, !0) : s !== ne && J(s, t) ? (s[t] = n, !0) : J(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: i, type: o }
  }, l) {
    let a;
    return !!(n[l] || e !== ne && l[0] !== "$" && J(e, l) || ls(t, l) || J(i, l) || J(s, l) || J(nn, l) || J(r.config.globalProperties, l) || (a = o.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : J(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function or(e) {
  return P(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let xs = !0;
function Sl(e) {
  const t = Ni(e), n = e.proxy, s = e.ctx;
  xs = !1, t.beforeCreate && lr(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: a,
    inject: d,
    // lifecycle
    created: u,
    beforeMount: p,
    mounted: m,
    beforeUpdate: E,
    updated: D,
    activated: R,
    deactivated: B,
    beforeDestroy: j,
    beforeUnmount: A,
    destroyed: b,
    unmounted: x,
    render: X,
    renderTracked: ie,
    renderTriggered: de,
    errorCaptured: me,
    serverPrefetch: V,
    // public API
    expose: K,
    inheritAttrs: re,
    // assets
    components: O,
    directives: Z,
    filters: M
  } = t;
  if (d && El(d, s, null), o)
    for (const k in o) {
      const Y = o[k];
      F(Y) && (s[k] = Y.bind(n));
    }
  if (r) {
    const k = r.call(n, n);
    z(k) && (e.data = /* @__PURE__ */ gn(k));
  }
  if (xs = !0, i)
    for (const k in i) {
      const Y = i[k], Ue = F(Y) ? Y.bind(n, n) : F(Y.get) ? Y.get.bind(n, n) : ze, Qe = !F(Y) && F(Y.set) ? Y.set.bind(n) : ze, He = le({
        get: Ue,
        set: Qe
      });
      Object.defineProperty(s, k, {
        enumerable: !0,
        configurable: !0,
        get: () => He.value,
        set: ($e) => He.value = $e
      });
    }
  if (l)
    for (const k in l)
      $i(l[k], s, n, k);
  if (a) {
    const k = F(a) ? a.call(n) : a;
    Reflect.ownKeys(k).forEach((Y) => {
      rl(Y, k[Y]);
    });
  }
  u && lr(u, e, "c");
  function H(k, Y) {
    P(Y) ? Y.forEach((Ue) => k(Ue.bind(n))) : Y && k(Y.bind(n));
  }
  if (H(gl, p), H(Mi, m), H(ml, E), H(bl, D), H(dl, R), H(pl, B), H(wl, me), H(yl, ie), H(vl, de), H(Ri, A), H(Pi, x), H(_l, V), P(K))
    if (K.length) {
      const k = e.exposed || (e.exposed = {});
      K.forEach((Y) => {
        Object.defineProperty(k, Y, {
          get: () => n[Y],
          set: (Ue) => n[Y] = Ue,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  X && e.render === ze && (e.render = X), re != null && (e.inheritAttrs = re), O && (e.components = O), Z && (e.directives = Z), V && Ii(e);
}
function El(e, t, n = ze) {
  P(e) && (e = Ss(e));
  for (const s in e) {
    const r = e[s];
    let i;
    z(r) ? "default" in r ? i = Zt(
      r.from || s,
      r.default,
      !0
    ) : i = Zt(r.from || s) : i = Zt(r), /* @__PURE__ */ _e(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function lr(e, t, n) {
  Pe(
    P(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function $i(e, t, n, s) {
  let r = s.includes(".") ? Ti(n, s) : () => n[s];
  if (oe(e)) {
    const i = t[e];
    F(i) && is(r, i);
  } else if (F(e))
    is(r, e.bind(n));
  else if (z(e))
    if (P(e))
      e.forEach((i) => $i(i, t, n, s));
    else {
      const i = F(e.handler) ? e.handler.bind(n) : t[e.handler];
      F(i) && is(r, i, e);
    }
}
function Ni(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = i.get(t);
  let a;
  return l ? a = l : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (d) => Dn(a, d, o, !0)
  ), Dn(a, t, o)), z(t) && i.set(t, a), a;
}
function Dn(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && Dn(e, i, n, !0), r && r.forEach(
    (o) => Dn(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = Cl[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Cl = {
  data: ar,
  props: cr,
  emits: cr,
  // objects
  methods: kt,
  computed: kt,
  // lifecycle
  beforeCreate: ve,
  created: ve,
  beforeMount: ve,
  mounted: ve,
  beforeUpdate: ve,
  updated: ve,
  beforeDestroy: ve,
  beforeUnmount: ve,
  destroyed: ve,
  unmounted: ve,
  activated: ve,
  deactivated: ve,
  errorCaptured: ve,
  serverPrefetch: ve,
  // assets
  components: kt,
  directives: kt,
  // watch
  watch: Il,
  // provide / inject
  provide: ar,
  inject: Al
};
function ar(e, t) {
  return t ? e ? function() {
    return fe(
      F(e) ? e.call(this, this) : e,
      F(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Al(e, t) {
  return kt(Ss(e), Ss(t));
}
function Ss(e) {
  if (P(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ve(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function kt(e, t) {
  return e ? fe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function cr(e, t) {
  return e ? P(e) && P(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : fe(
    /* @__PURE__ */ Object.create(null),
    or(e),
    or(t ?? {})
  ) : t;
}
function Il(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = fe(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = ve(e[s], t[s]);
  return n;
}
function Di() {
  return {
    app: null,
    config: {
      isNativeTag: Wr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Ol = 0;
function Ml(e, t) {
  return function(s, r = null) {
    F(s) || (s = fe({}, s)), r != null && !z(r) && (r = null);
    const i = Di(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const d = i.app = {
      _uid: Ol++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: la,
      get config() {
        return i.config;
      },
      set config(u) {
      },
      use(u, ...p) {
        return o.has(u) || (u && F(u.install) ? (o.add(u), u.install(d, ...p)) : F(u) && (o.add(u), u(d, ...p))), d;
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), d;
      },
      component(u, p) {
        return p ? (i.components[u] = p, d) : i.components[u];
      },
      directive(u, p) {
        return p ? (i.directives[u] = p, d) : i.directives[u];
      },
      mount(u, p, m) {
        if (!a) {
          const E = d._ceVNode || ce(s, r);
          return E.appContext = i, m === !0 ? m = "svg" : m === !1 && (m = void 0), e(E, u, m), a = !0, d._container = u, u.__vue_app__ = d, Zn(E.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        a && (Pe(
          l,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(u, p) {
        return i.provides[u] = p, d;
      },
      runWithContext(u) {
        const p = Nt;
        Nt = d;
        try {
          return u();
        } finally {
          Nt = p;
        }
      }
    };
    return d;
  };
}
let Nt = null;
const Rl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${De(t)}Modifiers`] || e[`${Mt(t)}Modifiers`];
function Pl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ne;
  let r = n;
  const i = t.startsWith("update:"), o = i && Rl(s, t.slice(7));
  o && (o.trim && (r = n.map((u) => oe(u) ? u.trim() : u)), o.number && (r = r.map(kn)));
  let l, a = s[l = es(t)] || // also try camelCase event handler (#2249)
  s[l = es(De(t))];
  !a && i && (a = s[l = es(Mt(t))]), a && Pe(
    a,
    e,
    6,
    r
  );
  const d = s[l + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Pe(
      d,
      e,
      6,
      r
    );
  }
}
const $l = /* @__PURE__ */ new WeakMap();
function Li(e, t, n = !1) {
  const s = n ? $l : t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, l = !1;
  if (!F(e)) {
    const a = (d) => {
      const u = Li(d, t, !0);
      u && (l = !0, fe(o, u));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !l ? (z(e) && s.set(e, null), null) : (P(i) ? i.forEach((a) => o[a] = null) : fe(o, i), z(e) && s.set(e, o), o);
}
function zn(e, t) {
  return !e || !Hn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), J(e, t[0].toLowerCase() + t.slice(1)) || J(e, Mt(t)) || J(e, t));
}
function ur(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    propsOptions: [i],
    slots: o,
    attrs: l,
    emit: a,
    render: d,
    renderCache: u,
    props: p,
    data: m,
    setupState: E,
    ctx: D,
    inheritAttrs: R
  } = e, B = Pn(e);
  let j, A;
  try {
    if (n.shapeFlag & 4) {
      const x = r || s, X = x;
      j = qe(
        d.call(
          X,
          x,
          u,
          p,
          E,
          m,
          D
        )
      ), A = l;
    } else {
      const x = t;
      j = qe(
        x.length > 1 ? x(
          p,
          { attrs: l, slots: o, emit: a }
        ) : x(
          p,
          null
        )
      ), A = t.props ? l : Nl(l);
    }
  } catch (x) {
    Ot.length = 0, Gn(x, e, 1), j = ce(Te);
  }
  let b = j;
  if (A && R !== !1) {
    const x = Object.keys(A), { shapeFlag: X } = b;
    x.length && X & 7 && (i && x.some(jn) && (A = Dl(
      A,
      i
    )), b = _t(b, A, !1, !0));
  }
  if (n.dirs && (b = _t(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const x = qn(b.type) && $n(b) || b;
    ln(x, n.transition);
  }
  return j = b, Pn(B), j;
}
const Nl = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Hn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Dl = (e, t) => {
  const n = {};
  for (const s in e)
    (!jn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Ll(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: l, patchFlag: a } = t, d = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? fr(s, o, d) : !!o;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        const m = u[p];
        if (Fi(o, s, m) && !zn(d, m))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? fr(s, o, d) : !0 : !!o;
  return !1;
}
function fr(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (Fi(t, e, i) && !zn(n, i))
      return !0;
  }
  return !1;
}
function Fi(e, t, n) {
  const s = e[n], r = t[n];
  return n === "style" && z(s) && z(r) ? !lt(s, r) : s !== r;
}
function Fl({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.suspense.vnode.el = r.el = s, e = r), r === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const Vi = {}, Ui = () => Object.create(Vi), Hi = (e) => Object.getPrototypeOf(e) === Vi;
function Vl(e, t, n, s = !1) {
  const r = {}, i = Ui();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), ji(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : /* @__PURE__ */ Go(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function Ul(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, l = /* @__PURE__ */ G(r), [a] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const u = e.vnode.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        let m = u[p];
        if (zn(e.emitsOptions, m))
          continue;
        const E = t[m];
        if (a)
          if (J(i, m))
            E !== i[m] && (i[m] = E, d = !0);
          else {
            const D = De(m);
            r[D] = Es(
              a,
              l,
              D,
              E,
              e,
              !1
            );
          }
        else
          E !== i[m] && (i[m] = E, d = !0);
      }
    }
  } else {
    ji(e, t, r, i) && (d = !0);
    let u;
    for (const p in l)
      (!t || // for camelCase
      !J(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Mt(p)) === p || !J(t, u))) && (a ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[u] !== void 0) && (r[p] = Es(
        a,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete r[p]);
    if (i !== l)
      for (const p in i)
        (!t || !J(t, p)) && (delete i[p], d = !0);
  }
  d && rt(e.attrs, "set", "");
}
function ji(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let a in t) {
      if (Jt(a))
        continue;
      const d = t[a];
      let u;
      r && J(r, u = De(a)) ? !i || !i.includes(u) ? n[u] = d : (l || (l = {}))[u] = d : zn(e.emitsOptions, a) || (!(a in s) || d !== s[a]) && (s[a] = d, o = !0);
    }
  if (i) {
    const a = /* @__PURE__ */ G(n), d = l || ne;
    for (let u = 0; u < i.length; u++) {
      const p = i[u];
      n[p] = Es(
        r,
        a,
        p,
        d[p],
        e,
        !J(d, p)
      );
    }
  }
  return o;
}
function Es(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = J(o, "default");
    if (l && s === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && F(a)) {
        const { propsDefaults: d } = r;
        if (n in d)
          s = d[n];
        else {
          const u = bn(r);
          s = d[n] = a.call(
            null,
            t
          ), u();
        }
      } else
        s = a;
      r.ce && r.ce._setProp(n, s);
    }
    o[
      0
      /* shouldCast */
    ] && (i && !l ? s = !1 : o[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === Mt(n)) && (s = !0));
  }
  return s;
}
const Hl = /* @__PURE__ */ new WeakMap();
function Bi(e, t, n = !1) {
  const s = n ? Hl : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, l = [];
  let a = !1;
  if (!F(e)) {
    const u = (p) => {
      a = !0;
      const [m, E] = Bi(p, t, !0);
      fe(o, m), E && l.push(...E);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!i && !a)
    return z(e) && s.set(e, At), At;
  if (P(i))
    for (let u = 0; u < i.length; u++) {
      const p = De(i[u]);
      dr(p) && (o[p] = ne);
    }
  else if (i)
    for (const u in i) {
      const p = De(u);
      if (dr(p)) {
        const m = i[u], E = o[p] = P(m) || F(m) ? { type: m } : fe({}, m), D = E.type;
        let R = !1, B = !0;
        if (P(D))
          for (let j = 0; j < D.length; ++j) {
            const A = D[j], b = F(A) && A.name;
            if (b === "Boolean") {
              R = !0;
              break;
            } else b === "String" && (B = !1);
          }
        else
          R = F(D) && D.name === "Boolean";
        E[
          0
          /* shouldCast */
        ] = R, E[
          1
          /* shouldCastTrue */
        ] = B, (R || J(E, "default")) && l.push(p);
      }
    }
  const d = [o, l];
  return z(e) && s.set(e, d), d;
}
function dr(e) {
  return e[0] !== "$" && !Jt(e);
}
const Bs = (e) => e === "_" || e === "_ctx" || e === "$stable", ks = (e) => P(e) ? e.map(qe) : [qe(e)], jl = (e, t, n) => {
  if (t._n)
    return t;
  const s = yi((...r) => ks(t(...r)), n);
  return s._c = !1, s;
}, ki = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (Bs(r)) continue;
    const i = e[r];
    if (F(i))
      t[r] = jl(r, i, s);
    else if (i != null) {
      const o = ks(i);
      t[r] = () => o;
    }
  }
}, Wi = (e, t) => {
  const n = ks(t);
  e.slots.default = () => n;
}, Ki = (e, t, n) => {
  for (const s in t)
    (n || !Bs(s)) && (e[s] = t[s]);
}, Bl = (e, t, n) => {
  const s = e.slots = Ui();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Ki(s, t, n), n && Jr(s, "_", r, !0)) : ki(t, s);
  } else t && Wi(e, t);
}, kl = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = ne;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : Ki(r, t, n) : (i = !t.$stable, ki(t, r)), o = t;
  } else t && (Wi(e, t), o = { default: 1 });
  if (i)
    for (const l in r)
      !Bs(l) && o[l] == null && delete r[l];
}, Se = Yl;
function Wl(e) {
  return Kl(e);
}
function Kl(e, t) {
  const n = Wn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: l,
    createComment: a,
    setText: d,
    setElementText: u,
    parentNode: p,
    nextSibling: m,
    setScopeId: E = ze,
    insertStaticContent: D
  } = e, R = (c, f, g, w = null, _ = null, y = null, C = void 0, S = null, T = !!f.dynamicChildren) => {
    if (c === f)
      return;
    c && !Ct(c, f) && (w = _n(c), $e(c, _, y, !0), c = null), f.patchFlag === -2 && (T = !1, f.dynamicChildren = null), f.dynamicChildren && c && c.dynamicChildren && c.dynamicChildren.hasOnce && (f.dynamicChildren === At && (f.dynamicChildren = []), f.dynamicChildren.hasOnce = !0);
    const { type: v, ref: N, shapeFlag: I } = f;
    switch (v) {
      case Xn:
        B(c, f, g, w);
        break;
      case Te:
        j(c, f, g, w);
        break;
      case cs:
        c == null && A(f, g, w, C);
        break;
      case ge:
        O(
          c,
          f,
          g,
          w,
          _,
          y,
          C,
          S,
          T
        );
        break;
      default:
        I & 1 ? X(
          c,
          f,
          g,
          w,
          _,
          y,
          C,
          S,
          T
        ) : I & 6 ? Z(
          c,
          f,
          g,
          w,
          _,
          y,
          C,
          S,
          T
        ) : (I & 64 || I & 128) && v.process(
          c,
          f,
          g,
          w,
          _,
          y,
          C,
          S,
          T,
          Vt
        );
    }
    N != null && _ ? Qt(N, c && c.ref, y, f || c, !f) : N == null && c && c.ref != null && Qt(c.ref, null, y, c, !0);
  }, B = (c, f, g, w) => {
    if (c == null)
      s(
        f.el = l(f.children),
        g,
        w
      );
    else {
      const _ = f.el = c.el;
      f.children !== c.children && d(_, f.children);
    }
  }, j = (c, f, g, w) => {
    c == null ? s(
      f.el = a(f.children || ""),
      g,
      w
    ) : f.el = c.el;
  }, A = (c, f, g, w) => {
    [c.el, c.anchor] = D(
      c.children,
      f,
      g,
      w,
      c.el,
      c.anchor
    );
  }, b = ({ el: c, anchor: f }, g, w) => {
    let _;
    for (; c && c !== f; )
      _ = m(c), s(c, g, w), c = _;
    s(f, g, w);
  }, x = ({ el: c, anchor: f }) => {
    let g;
    for (; c && c !== f; )
      g = m(c), r(c), c = g;
    r(f);
  }, X = (c, f, g, w, _, y, C, S, T) => {
    if (f.type === "svg" ? C = "svg" : f.type === "math" && (C = "mathml"), c == null)
      ie(
        f,
        g,
        w,
        _,
        y,
        C,
        S,
        T
      );
    else {
      const v = c.el && c.el._isVueCE ? c.el : null;
      try {
        v && v._beginPatch(), V(
          c,
          f,
          _,
          y,
          C,
          S,
          T
        );
      } finally {
        v && v._endPatch();
      }
    }
  }, ie = (c, f, g, w, _, y, C, S) => {
    let T, v;
    const { props: N, shapeFlag: I, transition: $, dirs: L } = c;
    if (T = c.el = o(
      c.type,
      y,
      N && N.is,
      N
    ), I & 8 ? u(T, c.children) : I & 16 && me(
      c.children,
      T,
      null,
      w,
      _,
      as(c, y),
      C,
      S
    ), L && wt(c, null, w, "created"), de(T, c, c.scopeId, C, w), N) {
      for (const te in N)
        te !== "value" && !Jt(te) && i(T, te, null, N[te], y, w);
      "value" in N && i(T, "value", null, N.value, y), (v = N.onVnodeBeforeMount) && We(v, w, c);
    }
    L && wt(c, null, w, "beforeMount");
    const W = Gl(_, $);
    W && $.beforeEnter(T), s(T, f, g), ((v = N && N.onVnodeMounted) || W || L) && Se(() => {
      try {
        v && We(v, w, c), W && $.enter(T), L && wt(c, null, w, "mounted");
      } finally {
      }
    }, _);
  }, de = (c, f, g, w, _) => {
    if (g && E(c, g), w)
      for (let y = 0; y < w.length; y++)
        E(c, w[y]);
    if (_) {
      let y = _.subTree;
      if (f === y || Ji(y.type) && (y.ssContent === f || y.ssFallback === f)) {
        const C = _.vnode;
        de(
          c,
          C,
          C.scopeId,
          C.slotScopeIds,
          _.parent
        );
      }
    }
  }, me = (c, f, g, w, _, y, C, S, T = 0) => {
    for (let v = T; v < c.length; v++) {
      const N = c[v] = S ? st(c[v]) : qe(c[v]);
      R(
        null,
        N,
        f,
        g,
        w,
        _,
        y,
        C,
        S
      );
    }
  }, V = (c, f, g, w, _, y, C) => {
    const S = f.el = c.el;
    let { patchFlag: T, dynamicChildren: v, dirs: N } = f;
    T |= c.patchFlag & 16;
    const I = c.props || ne, $ = f.props || ne;
    let L;
    if (g && Tt(g, !1), (L = $.onVnodeBeforeUpdate) && We(L, g, f, c), N && wt(f, c, g, "beforeUpdate"), g && Tt(g, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    v && (!c.dynamicChildren || c.dynamicChildren.length !== v.length) && (T = 0, C = !1, v = null), (I.innerHTML && $.innerHTML == null || I.textContent && $.textContent == null) && u(S, ""), v ? K(
      c.dynamicChildren,
      v,
      S,
      g,
      w,
      as(f, _),
      y
    ) : C || Y(
      c,
      f,
      S,
      null,
      g,
      w,
      as(f, _),
      y,
      !1
    ), T > 0) {
      if (T & 16)
        re(S, I, $, g, _);
      else if (T & 2 && I.class !== $.class && i(S, "class", null, $.class, _), T & 4 && i(S, "style", I.style, $.style, _), T & 8) {
        const W = f.dynamicProps;
        for (let te = 0; te < W.length; te++) {
          const Q = W[te], ae = I[Q], pe = $[Q];
          (pe !== ae || Q === "value") && i(S, Q, ae, pe, _, g);
        }
      }
      T & 1 && c.children !== f.children && u(S, f.children);
    } else !C && v == null && re(S, I, $, g, _);
    ((L = $.onVnodeUpdated) || N) && Se(() => {
      L && We(L, g, f, c), N && wt(f, c, g, "updated");
    }, w);
  }, K = (c, f, g, w, _, y, C) => {
    for (let S = 0; S < f.length; S++) {
      const T = c[S], v = f[S], N = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        T.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (T.type === ge || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ct(T, v) || // - In the case of a component, it could contain anything.
        T.shapeFlag & 198) ? p(T.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          g
        )
      );
      R(
        T,
        v,
        N,
        null,
        w,
        _,
        y,
        C,
        !0
      );
    }
  }, re = (c, f, g, w, _) => {
    if (f !== g) {
      if (f !== ne)
        for (const y in f)
          !Jt(y) && !(y in g) && i(
            c,
            y,
            f[y],
            null,
            _,
            w
          );
      for (const y in g) {
        if (Jt(y)) continue;
        const C = g[y], S = f[y];
        C !== S && y !== "value" && i(c, y, S, C, _, w);
      }
      "value" in g && i(c, "value", f.value, g.value, _);
    }
  }, O = (c, f, g, w, _, y, C, S, T) => {
    const v = f.el = c ? c.el : l(""), N = f.anchor = c ? c.anchor : l("");
    let { patchFlag: I, dynamicChildren: $, slotScopeIds: L } = f;
    L && (S = S ? S.concat(L) : L), c == null ? (s(v, g, w), s(N, g, w), me(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      g,
      N,
      _,
      y,
      C,
      S,
      T
    )) : I > 0 && I & 64 && $ && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren && c.dynamicChildren.length === $.length ? (K(
      c.dynamicChildren,
      $,
      g,
      _,
      y,
      C,
      S
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || _ && f === _.subTree) && Gi(
      c,
      f,
      !0
      /* shallow */
    )) : Y(
      c,
      f,
      g,
      N,
      _,
      y,
      C,
      S,
      T
    );
  }, Z = (c, f, g, w, _, y, C, S, T) => {
    f.slotScopeIds = S, c == null ? f.shapeFlag & 512 ? _.ctx.activate(
      f,
      g,
      w,
      C,
      T
    ) : M(
      f,
      g,
      w,
      _,
      y,
      C,
      T
    ) : U(c, f, T);
  }, M = (c, f, g, w, _, y, C) => {
    const S = c.component = ea(
      c,
      w,
      _
    );
    if (Yn(c) && (S.ctx.renderer = Vt), ta(S, !1, C), S.asyncDep) {
      if (_ && _.registerDep(S, H, C), !c.el) {
        const T = S.subTree = ce(Te);
        j(null, T, f, g), c.placeholder = T.el;
      }
    } else
      H(
        S,
        c,
        f,
        g,
        _,
        y,
        C
      );
  }, U = (c, f, g) => {
    const w = f.component = c.component;
    if (Ll(c, f, g))
      if (w.asyncDep && !w.asyncResolved) {
        f.el = c.el, k(w, f, g);
        return;
      } else
        w.next = f, w.update();
    else
      f.el = c.el, w.vnode = f;
  }, H = (c, f, g, w, _, y, C) => {
    const S = () => {
      if (c.isMounted) {
        let { next: I, bu: $, u: L, parent: W, vnode: te } = c;
        {
          const Be = qi(c);
          if (Be) {
            I && (I.el = te.el, k(c, I, C)), Be.asyncDep.then(() => {
              Se(() => {
                c.isUnmounted || v();
              }, _);
            });
            return;
          }
        }
        let Q = I, ae;
        Tt(c, !1), I ? (I.el = te.el, k(c, I, C)) : I = te, $ && Cn($), (ae = I.props && I.props.onVnodeBeforeUpdate) && We(ae, W, I, te), Tt(c, !0);
        const pe = ur(c), je = c.subTree;
        c.subTree = pe, R(
          je,
          pe,
          // parent may have changed if it's in a teleport
          p(je.el),
          // anchor may have changed if it's in a fragment
          _n(je),
          c,
          _,
          y
        ), I.el = pe.el, Q === null && Fl(c, pe.el), L && Se(L, _), (ae = I.props && I.props.onVnodeUpdated) && Se(
          () => We(ae, W, I, te),
          _
        );
      } else {
        let I;
        const { el: $, props: L } = f, { bm: W, m: te, parent: Q, root: ae, type: pe } = c, je = en(f);
        Tt(c, !1), W && Cn(W), !je && (I = L && L.onVnodeBeforeMount) && We(I, Q, f), Tt(c, !0);
        {
          ae.ce && ae.ce._hasShadowRoot() && ae.ce._injectChildStyle(
            pe,
            c.parent ? c.parent.type : void 0
          );
          const Be = c.subTree = ur(c);
          R(
            null,
            Be,
            g,
            w,
            c,
            _,
            y
          ), f.el = Be.el;
        }
        if (te && Se(te, _), !je && (I = L && L.onVnodeMounted)) {
          const Be = f;
          Se(
            () => We(I, Q, Be),
            _
          );
        }
        (f.shapeFlag & 256 || Q && en(Q.vnode) && Q.vnode.shapeFlag & 256) && c.a && Se(c.a, _), c.isMounted = !0, f = g = w = null;
      }
    };
    c.scope.on();
    const T = c.effect = new Qr(S);
    c.scope.off();
    const v = c.update = T.run.bind(T), N = c.job = T.runIfDirty.bind(T);
    N.i = c, N.id = c.uid, T.scheduler = () => js(N), Tt(c, !0), v();
  }, k = (c, f, g) => {
    f.component = c;
    const w = c.vnode.props;
    c.vnode = f, c.next = null, Ul(c, f.props, w, g), kl(c, f.children, g), at(), sr(c), ct();
  }, Y = (c, f, g, w, _, y, C, S, T = !1) => {
    const v = c && c.children, N = c ? c.shapeFlag : 0, I = f.children, { patchFlag: $, shapeFlag: L } = f;
    if ($ > 0) {
      if ($ & 128) {
        Qe(
          v,
          I,
          g,
          w,
          _,
          y,
          C,
          S,
          T
        );
        return;
      } else if ($ & 256) {
        Ue(
          v,
          I,
          g,
          w,
          _,
          y,
          C,
          S,
          T
        );
        return;
      }
    }
    L & 8 ? (N & 16 && Ft(v, _, y), I !== v && u(g, I)) : N & 16 ? L & 16 ? Qe(
      v,
      I,
      g,
      w,
      _,
      y,
      C,
      S,
      T
    ) : Ft(v, _, y, !0) : (N & 8 && u(g, ""), L & 16 && me(
      I,
      g,
      w,
      _,
      y,
      C,
      S,
      T
    ));
  }, Ue = (c, f, g, w, _, y, C, S, T) => {
    c = c || At, f = f || At;
    const v = c.length, N = f.length, I = Math.min(v, N);
    let $;
    for ($ = 0; $ < I; $++) {
      const L = f[$] = T ? st(f[$]) : qe(f[$]);
      R(
        c[$],
        L,
        g,
        null,
        _,
        y,
        C,
        S,
        T
      );
    }
    v > N ? Ft(
      c,
      _,
      y,
      !0,
      !1,
      I
    ) : me(
      f,
      g,
      w,
      _,
      y,
      C,
      S,
      T,
      I
    );
  }, Qe = (c, f, g, w, _, y, C, S, T) => {
    let v = 0;
    const N = f.length;
    let I = c.length - 1, $ = N - 1;
    for (; v <= I && v <= $; ) {
      const L = c[v], W = f[v] = T ? st(f[v]) : qe(f[v]);
      if (Ct(L, W))
        R(
          L,
          W,
          g,
          null,
          _,
          y,
          C,
          S,
          T
        );
      else
        break;
      v++;
    }
    for (; v <= I && v <= $; ) {
      const L = c[I], W = f[$] = T ? st(f[$]) : qe(f[$]);
      if (Ct(L, W))
        R(
          L,
          W,
          g,
          null,
          _,
          y,
          C,
          S,
          T
        );
      else
        break;
      I--, $--;
    }
    if (v > I) {
      if (v <= $) {
        const L = $ + 1, W = L < N ? f[L].el : w;
        for (; v <= $; )
          R(
            null,
            f[v] = T ? st(f[v]) : qe(f[v]),
            g,
            W,
            _,
            y,
            C,
            S,
            T
          ), v++;
      }
    } else if (v > $)
      for (; v <= I; )
        $e(c[v], _, y, !0), v++;
    else {
      const L = v, W = v, te = /* @__PURE__ */ new Map();
      for (v = W; v <= $; v++) {
        const Ee = f[v] = T ? st(f[v]) : qe(f[v]);
        Ee.key != null && te.set(Ee.key, v);
      }
      let Q, ae = 0;
      const pe = $ - W + 1;
      let je = !1, Be = 0;
      const Ut = new Array(pe);
      for (v = 0; v < pe; v++) Ut[v] = 0;
      for (v = L; v <= I; v++) {
        const Ee = c[v];
        if (ae >= pe) {
          $e(Ee, _, y, !0);
          continue;
        }
        let ke;
        if (Ee.key != null)
          ke = te.get(Ee.key);
        else
          for (Q = W; Q <= $; Q++)
            if (Ut[Q - W] === 0 && Ct(Ee, f[Q])) {
              ke = Q;
              break;
            }
        ke === void 0 ? $e(Ee, _, y, !0) : (Ut[ke - W] = v + 1, ke >= Be ? Be = ke : je = !0, R(
          Ee,
          f[ke],
          g,
          null,
          _,
          y,
          C,
          S,
          T
        ), ae++);
      }
      const Ys = je ? ql(Ut) : At;
      for (Q = Ys.length - 1, v = pe - 1; v >= 0; v--) {
        const Ee = W + v, ke = f[Ee], Js = f[Ee + 1], zs = Ee + 1 < N ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Js.el || Yi(Js)
        ) : w;
        Ut[v] === 0 ? R(
          null,
          ke,
          g,
          zs,
          _,
          y,
          C,
          S,
          T
        ) : je && (Q < 0 || v !== Ys[Q] ? He(ke, g, zs, 2) : Q--);
      }
    }
  }, He = (c, f, g, w, _ = null) => {
    const { el: y, type: C, transition: S, children: T, shapeFlag: v } = c;
    if (v & 6) {
      He(c.component.subTree, f, g, w);
      return;
    }
    if (v & 128) {
      c.suspense.move(f, g, w);
      return;
    }
    if (v & 64) {
      C.move(c, f, g, Vt);
      return;
    }
    if (C === ge) {
      s(y, f, g);
      for (let I = 0; I < T.length; I++)
        He(T[I], f, g, w);
      s(c.anchor, f, g);
      return;
    }
    if (C === cs) {
      b(c, f, g);
      return;
    }
    if (w !== 2 && v & 1 && S)
      if (w === 0)
        S.persisted && !y[Ie] ? s(y, f, g) : (S.beforeEnter(y), s(y, f, g), Se(() => S.enter(y), _));
      else {
        const { leave: I, delayLeave: $, afterLeave: L } = S, W = () => {
          c.ctx.isUnmounted ? r(y) : s(y, f, g);
        }, te = () => {
          const Q = y._isLeaving || !!y[Ie];
          y._isLeaving && y[Ie](
            !0
            /* cancelled */
          ), S.persisted && !Q ? W() : I(y, () => {
            W(), L && L();
          });
        };
        $ ? $(y, W, te) : te();
      }
    else
      s(y, f, g);
  }, $e = (c, f, g, w = !1, _ = !1) => {
    const {
      type: y,
      props: C,
      ref: S,
      children: T,
      dynamicChildren: v,
      shapeFlag: N,
      patchFlag: I,
      dirs: $,
      cacheIndex: L,
      memo: W
    } = c;
    if ((I === -2 || v && v.hasOnce) && (_ = !1), S != null && (at(), Qt(S, null, g, c, !0), ct()), L != null && (!c.ctx || c.ctx === f) && (f.renderCache[L] = void 0), N & 256) {
      f.ctx.deactivate(c);
      return;
    }
    const te = N & 1 && $, Q = !en(c);
    let ae;
    if (Q && (ae = C && C.onVnodeBeforeUnmount) && We(ae, f, c), N & 6)
      po(c.component, g, w);
    else {
      if (N & 128) {
        c.suspense.unmount(g, w);
        return;
      }
      te && wt(c, null, f, "beforeUnmount"), N & 64 ? c.type.remove(
        c,
        f,
        g,
        Vt,
        w
      ) : v && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !v.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (y !== ge || I > 0 && I & 64) ? Ft(
        v,
        f,
        g,
        !1,
        !0
      ) : (y === ge && I & 384 || !_ && N & 16) && Ft(T, f, g), w && Gs(c);
    }
    const pe = W != null && L == null;
    (Q && (ae = C && C.onVnodeUnmounted) || te || pe) && Se(() => {
      ae && We(ae, f, c), te && wt(c, null, f, "unmounted"), pe && (c.el = null);
    }, g);
  }, Gs = (c) => {
    const { type: f, el: g, anchor: w, transition: _ } = c;
    if (f === ge) {
      fo(g, w);
      return;
    }
    if (f === cs) {
      x(c), _ && !_.persisted && _.afterLeave && _.afterLeave();
      return;
    }
    const y = () => {
      r(g), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (c.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: C, delayLeave: S } = _, T = () => C(g, y);
      S ? S(c.el, y, T) : T();
    } else
      y();
  }, fo = (c, f) => {
    let g;
    for (; c !== f; )
      g = m(c), r(c), c = g;
    r(f);
  }, po = (c, f, g) => {
    const { bum: w, scope: _, job: y, subTree: C, um: S, m: T, a: v } = c;
    pr(T), pr(v), w && Cn(w), _.stop(), y ? (y.flags |= 8, $e(C, c, f, g)) : c.vnode.el && C && (C.transition = c.vnode.transition, $e(C, c, f, g)), S && Se(S, f), Se(() => {
      c.isUnmounted = !0;
    }, f);
  }, Ft = (c, f, g, w = !1, _ = !1, y = 0) => {
    for (let C = y; C < c.length; C++)
      $e(c[C], f, g, w, _);
  }, _n = (c) => {
    if (c.shapeFlag & 6)
      return _n(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const f = m(c.anchor || c.el), g = f && f[al];
    return g ? m(g) : f;
  };
  let Qn = !1;
  const qs = (c, f, g) => {
    let w;
    c == null ? f._vnode && ($e(f._vnode, null, null, !0), w = f._vnode.component) : R(
      f._vnode || null,
      c,
      f,
      null,
      null,
      null,
      g
    ), f._vnode = c, Qn || (Qn = !0, sr(w), bi(), Qn = !1);
  }, Vt = {
    p: R,
    um: $e,
    m: He,
    r: Gs,
    mt: M,
    mc: me,
    pc: Y,
    pbc: K,
    n: _n,
    o: e
  };
  return {
    render: qs,
    hydrate: void 0,
    createApp: Ml(qs)
  };
}
function as({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Tt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Gl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Gi(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (P(s) && P(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = st(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && Gi(o, l)), l.type === Xn && (l.patchFlag === -1 && (l = r[i] = st(l)), l.el = o.el), l.type === Te && !l.el && (l.el = o.el);
    }
}
function ql(e) {
  const t = e.slice(), n = [0];
  let s, r, i, o, l;
  const a = e.length;
  for (s = 0; s < a; s++) {
    const d = e[s];
    if (d !== 0) {
      if (r = n[n.length - 1], e[r] < d) {
        t[s] = r, n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        l = i + o >> 1, e[n[l]] < d ? i = l + 1 : o = l;
      d < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = t[o];
  return n;
}
function qi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : qi(t);
}
function pr(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Yi(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Yi(t.subTree) : null;
}
const Ji = (e) => e.__isSuspense;
function Yl(e, t) {
  t && t.pendingBranch ? P(e) ? t.effects.push(...e) : t.effects.push(e) : sl(e);
}
const ge = /* @__PURE__ */ Symbol.for("v-fgt"), Xn = /* @__PURE__ */ Symbol.for("v-txt"), Te = /* @__PURE__ */ Symbol.for("v-cmt"), cs = /* @__PURE__ */ Symbol.for("v-stc"), Ot = [];
let Ce = null;
function q(e = !1) {
  Ot.push(Ce = e ? null : []);
}
function zi() {
  Ot.pop(), Ce = Ot[Ot.length - 1] || null;
}
let an = 1;
function Ln(e, t = !1) {
  an += e, e < 0 && Ce && t && (Ce.hasOnce = !0);
}
function Xi(e) {
  return e.dynamicChildren = an > 0 ? Ce || At : null, zi(), an > 0 && Ce && Ce.push(e), e;
}
function ee(e, t, n, s, r, i) {
  return Xi(
    h(
      e,
      t,
      n,
      s,
      r,
      i,
      !0
    )
  );
}
function Ws(e, t, n, s, r) {
  return Xi(
    ce(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function Fn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ct(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Zi = ({ key: e }) => e ?? null, An = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? oe(e) || /* @__PURE__ */ _e(e) || F(e) ? { i: Oe, r: e, k: t, f: !!n } : e : null);
function h(e, t = null, n = null, s = 0, r = null, i = e === ge ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Zi(t),
    ref: t && An(t),
    scopeId: vi,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Oe
  };
  return l ? (Vn(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= oe(n) ? 8 : 16), an > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Ce && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Ce.push(a), a;
}
const ce = Jl;
function Jl(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === Tl) && (e = Te), Fn(e)) {
    const l = _t(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Vn(l, n), an > 0 && !i && Ce && (l.shapeFlag & 6 ? Ce[Ce.indexOf(e)] = l : Ce.push(l)), l.patchFlag = -2, l;
  }
  if (ia(e) && (e = e.__vccOpts), t) {
    t = zl(t);
    let { class: l, style: a } = t;
    l && !oe(l) && (t.class = Le(l)), z(a) && (/* @__PURE__ */ Hs(a) && !P(a) && (a = fe({}, a)), t.style = Ps(a));
  }
  const o = oe(e) ? 1 : Ji(e) ? 128 : qn(e) ? 64 : z(e) ? 4 : F(e) ? 2 : 0;
  return h(
    e,
    t,
    n,
    s,
    r,
    o,
    i,
    !0
  );
}
function zl(e) {
  return e ? /* @__PURE__ */ Hs(e) || Hi(e) ? fe({}, e) : e : null;
}
function _t(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: a } = e, d = t ? Xl(r || {}, t) : r, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Zi(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? P(i) ? i.concat(An(t)) : [i, An(t)] : An(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ge ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && _t(e.ssContent),
    ssFallback: e.ssFallback && _t(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return a && s && ln(
    u,
    a.clone(u)
  ), u;
}
function Wt(e = " ", t = 0) {
  return ce(Xn, null, e, t);
}
function Ve(e = "", t = !1) {
  return t ? (q(), Ws(Te, null, e)) : ce(Te, null, e);
}
function qe(e) {
  return e == null || typeof e == "boolean" ? ce(Te) : P(e) ? ce(
    ge,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Fn(e) ? st(e) : ce(Xn, null, String(e));
}
function st(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : _t(e);
}
function Vn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (P(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Vn(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Hi(t) ? t._ctx = Oe : r === 3 && Oe && (Oe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (F(t)) {
    if (s & 65) {
      Vn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Oe }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [Wt(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Xl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Le([t.class, s.class]));
      else if (r === "style")
        t.style = Ps([t.style, s.style]);
      else if (Hn(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(P(i) && i.includes(o)) ? t[r] = i ? [].concat(i, o) : o : o == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !jn(r) && (t[r] = o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function We(e, t, n, s = null) {
  Pe(e, t, 7, [
    n,
    s
  ]);
}
const Zl = Di();
let Ql = 0;
function ea(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || Zl, i = {
    uid: Ql++,
    vnode: e,
    type: s,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Ao(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Bi(s, r),
    emitsOptions: Li(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ne,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: ne,
    data: ne,
    props: ne,
    attrs: ne,
    slots: ne,
    refs: ne,
    setupState: ne,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Pl.bind(null, i), e.ce && e.ce(i), i;
}
let xe = null;
const Qi = () => xe || Oe;
let Un, cn;
{
  const e = Wn(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  Un = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => xe = n
  ), cn = t(
    "__VUE_SSR_SETTERS__",
    (n) => un = n
  );
}
const bn = (e) => {
  const t = xe;
  return Un(e), e.scope.on(), () => {
    e.scope.off(), Un(t);
  };
}, hr = () => {
  xe && xe.scope.off(), Un(null);
};
function eo(e) {
  return e.vnode.shapeFlag & 4;
}
let un = !1;
function ta(e, t = !1, n = !1) {
  t && cn(t);
  const { props: s, children: r } = e.vnode, i = eo(e);
  Vl(e, s, i, t), Bl(e, r, n || t);
  const o = i ? na(e, t) : void 0;
  return t && cn(!1), o;
}
function na(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, xl);
  const { setup: s } = n;
  if (s) {
    at();
    const r = e.setupContext = s.length > 1 ? ra(e) : null, i = bn(e), o = mn(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = Kr(o);
    if (ct(), i(), (l || e.sp) && !en(e) && Ii(e), l) {
      if (o.then(hr, hr), t)
        return o.then((a) => {
          cn(!0);
          try {
            gr(e, a, t);
          } finally {
            cn(!1);
          }
        }).catch((a) => {
          Gn(a, e, 0);
        });
      e.asyncDep = o;
    } else
      gr(e, o);
  } else
    to(e);
}
function gr(e, t, n) {
  F(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : z(t) && (e.setupState = pi(t)), to(e);
}
function to(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || ze);
  {
    const r = bn(e);
    at();
    try {
      Sl(e);
    } finally {
      ct(), r();
    }
  }
}
const sa = {
  get(e, t) {
    return be(e, "get", ""), e[t];
  }
};
function ra(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, sa),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Zn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(pi(qo(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in nn)
        return nn[n](e);
    },
    has(t, n) {
      return n in t || n in nn;
    }
  })) : e.proxy;
}
function ia(e) {
  return F(e) && "__vccOpts" in e;
}
const le = (e, t) => /* @__PURE__ */ Zo(e, t, un);
function oa(e, t, n) {
  try {
    Ln(-1);
    const s = arguments.length;
    return s === 2 ? z(t) && !P(t) ? Fn(t) ? ce(e, null, [t]) : ce(e, t) : ce(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Fn(n) && (n = [n]), ce(e, t, n));
  } finally {
    Ln(1);
  }
}
const la = "3.5.43";
/**
* @vue/runtime-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Cs;
const mr = typeof window < "u" && window.trustedTypes;
if (mr)
  try {
    Cs = /* @__PURE__ */ mr.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const no = Cs ? (e) => Cs.createHTML(e) : (e) => e, aa = "http://www.w3.org/2000/svg", ca = "http://www.w3.org/1998/Math/MathML", nt = typeof document < "u" ? document : null, br = nt && /* @__PURE__ */ nt.createElement("template"), ua = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? nt.createElementNS(aa, e) : t === "mathml" ? nt.createElementNS(ca, e) : n ? nt.createElement(e, { is: n }) : nt.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => nt.createTextNode(e),
  createComment: (e) => nt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => nt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, r, i) {
    const o = n ? n.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      br.innerHTML = no(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = br.content;
      if (s === "svg" || s === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, dt = "transition", Bt = "animation", fn = /* @__PURE__ */ Symbol("_vtc"), so = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, fa = /* @__PURE__ */ fe(
  {},
  xi,
  so
), da = (e) => (e.displayName = "Transition", e.props = fa, e), pa = /* @__PURE__ */ da(
  (e, { slots: t }) => oa(fl, ha(e), t)
), xt = (e, t = []) => {
  P(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, _r = (e) => e ? P(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function ha(e) {
  const t = {};
  for (const O in e)
    O in so || (t[O] = e[O]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: s,
    duration: r,
    enterFromClass: i = `${n}-enter-from`,
    enterActiveClass: o = `${n}-enter-active`,
    enterToClass: l = `${n}-enter-to`,
    appearFromClass: a = i,
    appearActiveClass: d = o,
    appearToClass: u = l,
    leaveFromClass: p = `${n}-leave-from`,
    leaveActiveClass: m = `${n}-leave-active`,
    leaveToClass: E = `${n}-leave-to`
  } = e, D = ga(r), R = D && D[0], B = D && D[1], {
    onBeforeEnter: j,
    onEnter: A,
    onEnterCancelled: b,
    onLeave: x,
    onLeaveCancelled: X,
    onBeforeAppear: ie = j,
    onAppear: de = A,
    onAppearCancelled: me = b
  } = t, V = (O, Z, M, U) => {
    O._enterCancelled = U, St(O, Z ? u : l), St(O, Z ? d : o), M && M();
  }, K = (O, Z) => {
    O._isLeaving = !1, St(O, p), St(O, E), St(O, m), Z && Z();
  }, re = (O) => (Z, M) => {
    const U = O ? de : A, H = () => V(Z, O, M);
    xt(U, [Z, H]), vr(() => {
      St(Z, O ? a : i), tt(Z, O ? u : l), _r(U) || yr(Z, s, R, H);
    });
  };
  return fe(t, {
    onBeforeEnter(O) {
      xt(j, [O]), tt(O, i), tt(O, o);
    },
    onBeforeAppear(O) {
      xt(ie, [O]), tt(O, a), tt(O, d);
    },
    onEnter: re(!1),
    onAppear: re(!0),
    onLeave(O, Z) {
      O._isLeaving = !0;
      const M = () => K(O, Z);
      tt(O, p), O._enterCancelled ? (tt(O, m), xr(O)) : (xr(O), tt(O, m)), vr(() => {
        O._isLeaving && (St(O, p), tt(O, E), _r(x) || yr(O, s, B, M));
      }), xt(x, [O, M]);
    },
    onEnterCancelled(O) {
      V(O, !1, void 0, !0), xt(b, [O]);
    },
    onAppearCancelled(O) {
      V(O, !0, void 0, !0), xt(me, [O]);
    },
    onLeaveCancelled(O) {
      K(O), xt(X, [O]);
    }
  });
}
function ga(e) {
  if (e == null)
    return null;
  if (z(e))
    return [us(e.enter), us(e.leave)];
  {
    const t = us(e);
    return [t, t];
  }
}
function us(e) {
  return _o(e);
}
function tt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[fn] || (e[fn] = /* @__PURE__ */ new Set())).add(t);
}
function St(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const n = e[fn];
  n && (n.delete(t), n.size || (e[fn] = void 0));
}
function vr(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let ma = 0;
function yr(e, t, n, s) {
  const r = e._endId = ++ma, i = () => {
    r === e._endId && s();
  };
  if (n != null)
    return setTimeout(i, n);
  const { type: o, timeout: l, propCount: a } = ba(e, t);
  if (!o)
    return s();
  const d = o + "end";
  let u = 0;
  const p = () => {
    e.removeEventListener(d, m), i();
  }, m = (E) => {
    E.target === e && ++u >= a && p();
  };
  setTimeout(() => {
    u < a && p();
  }, l + 1), e.addEventListener(d, m);
}
function ba(e, t) {
  const n = window.getComputedStyle(e), s = (D) => (n[D] || "").split(", "), r = s(`${dt}Delay`), i = s(`${dt}Duration`), o = wr(r, i), l = s(`${Bt}Delay`), a = s(`${Bt}Duration`), d = wr(l, a);
  let u = null, p = 0, m = 0;
  t === dt ? o > 0 && (u = dt, p = o, m = i.length) : t === Bt ? d > 0 && (u = Bt, p = d, m = a.length) : (p = Math.max(o, d), u = p > 0 ? o > d ? dt : Bt : null, m = u ? u === dt ? i.length : a.length : 0);
  const E = u === dt && /\b(?:transform|all)(?:,|$)/.test(
    s(`${dt}Property`).toString()
  );
  return {
    type: u,
    timeout: p,
    propCount: m,
    hasTransform: E
  };
}
function wr(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, s) => Tr(n) + Tr(e[s])));
}
function Tr(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function xr(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function _a(e, t, n) {
  const s = e[fn];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Sr = /* @__PURE__ */ Symbol("_vod"), va = /* @__PURE__ */ Symbol("_vsh"), ya = /* @__PURE__ */ Symbol(""), wa = /(?:^|;)\s*display\s*:/;
function Ta(e, t, n) {
  const s = e.style, r = oe(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (oe(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && Kt(s, l, "");
        }
      else
        for (const o in t)
          n[o] == null && Kt(s, o, "");
    for (const o in n) {
      o === "display" && (i = !0);
      const l = n[o];
      l != null ? Sa(
        e,
        o,
        !oe(t) && t ? t[o] : void 0,
        l
      ) || Kt(s, o, l) : Kt(s, o, "");
    }
  } else if (r) {
    if (t !== n) {
      const o = s[ya];
      o && (n += ";" + o), s.cssText = n, i = wa.test(n);
    }
  } else t && e.removeAttribute("style");
  Sr in e && (e[Sr] = i ? s.display : "", e[va] && (s.display = "none"));
}
const Tn = /\s*!important$/;
function Kt(e, t, n) {
  if (P(n))
    n.forEach((s) => Kt(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    Tn.test(n) ? e.setProperty(t, n.replace(Tn, ""), "important") : e.setProperty(t, n);
  else {
    const s = xa(e, t);
    Tn.test(n) ? e.setProperty(
      Mt(s),
      n.replace(Tn, ""),
      "important"
    ) : e[s] = n;
  }
}
const Er = ["Webkit", "Moz", "ms"], fs = {};
function xa(e, t) {
  const n = fs[t];
  if (n)
    return n;
  let s = De(t);
  if (s !== "filter" && s in e)
    return fs[t] = s;
  s = Yr(s);
  for (let r = 0; r < Er.length; r++) {
    const i = Er[r] + s;
    if (i in e)
      return fs[t] = i;
  }
  return t;
}
function Sa(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && oe(s) && n === s;
}
const Cr = "http://www.w3.org/1999/xlink";
function Ar(e, t, n, s, r, i = So(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Cr, t.slice(6, t.length)) : e.setAttributeNS(Cr, t, n) : n == null || i && !zr(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : Xe(n) ? String(n) : n
  );
}
function Ir(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? no(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = zr(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function ht(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Ea(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Or = /* @__PURE__ */ Symbol("_vei");
function Ca(e, t, n, s, r = null) {
  const i = e[Or] || (e[Or] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [l, a] = Oa(t);
    if (s) {
      const d = i[t] = Pa(
        s,
        r
      );
      ht(e, l, d, a);
    } else o && (Ea(e, l, o, a), i[t] = void 0);
  }
}
const Aa = /(Once|Passive|Capture)$/, Ia = /^on:?(?:Once|Passive|Capture)$/;
function Oa(e) {
  let t, n;
  for (; (n = e.match(Aa)) && !Ia.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Mt(e.slice(2)), t];
}
let ds = 0;
const Ma = /* @__PURE__ */ Promise.resolve(), Ra = () => ds || (Ma.then(() => ds = 0), ds = Date.now());
function Pa(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    const r = n.value;
    if (P(r)) {
      const i = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        i.call(s), s._stopped = !0;
      };
      const o = r.slice(), l = [s];
      for (let a = 0; a < o.length && !s._stopped; a++) {
        const d = o[a];
        d && Pe(
          d,
          t,
          5,
          l
        );
      }
    } else
      Pe(
        r,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = Ra(), n;
}
const Mr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, $a = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? _a(e, s, o) : t === "style" ? Ta(e, n, s) : Hn(t) ? jn(t) || Ca(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Na(e, t, s, o)) ? (Ir(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ar(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Da(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !oe(s))) ? Ir(e, De(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Ar(e, t, s, o));
};
function Na(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Mr(t) && F(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Mr(t) && oe(n) ? !1 : t in e;
}
function Da(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = De(t);
  return Array.isArray(n) ? n.some((r) => De(r) === s) : Object.keys(n).some((r) => De(r) === s);
}
const Lt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return P(t) ? (n) => Cn(t, n) : t;
};
function La(e) {
  e.target.composing = !0;
}
function Rr(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Je = /* @__PURE__ */ Symbol("_assign"), xn = /* @__PURE__ */ Symbol("_initialValue");
function ps(e, t, n) {
  return t && (e = e.trim()), n && (e = kn(e)), e;
}
const Gt = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e.parentNode && (e.type === "text" ? e[xn] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[xn] = e.defaultValue.replace(/\r\n?/g, `
`))), e[Je] = Lt(r);
    const i = s || r.props && r.props.type === "number";
    ht(e, t ? "change" : "input", (o) => {
      o.target.composing || e[Je](ps(e.value, n, i));
    }), (n || i) && ht(e, "change", () => {
      e.value = ps(e.value, n, i);
    }), t || (ht(e, "compositionstart", La), ht(e, "compositionend", Rr), ht(e, "change", Rr));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: s } }) {
    const r = t ?? "", i = e[xn];
    delete e[xn], i !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== i ? e[Je](ps(e.value, n, s)) : e.value = r;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[Je] = Lt(o), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? kn(e.value) : e.value, a = t ?? "";
    if (l === a)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === a) || (e.value = a);
  }
}, Pr = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[Je] = Lt(n), ht(e, "change", () => {
      const s = e._modelValue, r = dn(e), i = e.checked, o = e[Je];
      if (P(s)) {
        const l = $s(s, r), a = l !== -1;
        if (i && !a)
          o(s.concat(r));
        else if (!i && a) {
          const d = [...s];
          d.splice(l, 1), o(d);
        }
      } else if (ot(s)) {
        const l = new Set(s);
        i ? l.add(r) : l.delete(r), o(l);
      } else
        o(ro(e, i));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: $r,
  beforeUpdate(e, t, n) {
    e[Je] = Lt(n), $r(e, t, n);
  }
};
function $r(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let r;
  if (P(t))
    r = $s(t, s.props.value) > -1;
  else if (ot(t))
    r = t.has(s.props.value);
  else {
    if (t === n) return;
    r = lt(t, ro(e, !0));
  }
  e.checked !== r && (e.checked = r);
}
const Sn = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    e._modelValue = t, ht(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (a) => a.selected).map(
        (a) => n ? kn(dn(a)) : dn(a)
      ), i = e.multiple, o = i ? ot(e._modelValue) ? new Set(r) : r : r[0], l = e._pendingValue = [
        i,
        i ? P(o) ? r.slice() : r : o
      ];
      try {
        e[Je](o);
      } finally {
        gi(() => {
          e._pendingValue === l && (e._pendingValue = void 0);
        });
      }
    }), e[Je] = Lt(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Nr(e, t);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[Je] = Lt(n);
  },
  updated(e, { value: t }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !Fa(t, n[1], n[0])) && Nr(e, t);
  }
};
function Fa(e, t, n) {
  if (!n || P(e)) return lt(e, t);
  if (ot(e)) {
    if (e.size !== t.length) return !1;
    for (const s of t)
      if (!e.has(s)) return !1;
    return !0;
  }
  return !1;
}
function Nr(e, t) {
  const n = e.multiple, s = P(t);
  if (!(n && !s && !ot(t))) {
    for (let r = 0, i = e.options.length; r < i; r++) {
      const o = e.options[r], l = dn(o);
      if (n)
        if (s) {
          const a = typeof l;
          a === "string" || a === "number" ? o.selected = t.some((d) => String(d) === String(l)) : o.selected = $s(t, l) > -1;
        } else
          o.selected = t.has(l);
      else if (lt(dn(o), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function dn(e) {
  return "_value" in e ? e._value : e.value;
}
function ro(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Va = ["ctrl", "shift", "alt", "meta"], Ua = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Va.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ha = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = Ua[t[o]];
      if (l && l(r, t)) return;
    }
    return e(r, ...i);
  }));
}, ja = /* @__PURE__ */ fe({ patchProp: $a }, ua);
let Dr;
function Ba() {
  return Dr || (Dr = Wl(ja));
}
const io = ((...e) => {
  const t = Ba().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = Wa(s);
    if (!r) return;
    const i = t._component;
    !F(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, ka(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
});
function ka(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Wa(e) {
  return oe(e) ? document.querySelector(e) : e;
}
const Ks = Symbol("wechat-bridge");
function vt() {
  const e = Zt(Ks);
  if (!e) throw new Error("Bridge context missing");
  return e;
}
const Ka = ["title"], Ga = {
  key: 0,
  class: "wb-bubble-badge"
}, qa = /* @__PURE__ */ ut({
  __name: "FloatingBubble",
  setup(e) {
    const { runtime: t, shell: n } = vt(), s = t.state, r = le(() => s.connected && s.busy ? "…" : ""), i = le(() => ({
      "is-busy": s.busy,
      "is-offline": !s.connected
    }));
    return (o, l) => (q(), ee("button", {
      class: Le(["wb-bubble-btn", i.value]),
      type: "button",
      title: ue(s).connected ? "WeChat Bridge" : "WeChat Bridge (未连接)",
      onClick: l[0] || (l[0] = (a) => ue(n).togglePanel())
    }, [
      l[1] || (l[1] = h("span", { class: "wb-bubble-icon" }, "W", -1)),
      r.value ? (q(), ee("span", Ga, we(r.value), 1)) : Ve("", !0)
    ], 10, Ka));
  }
}), yt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Ya = /* @__PURE__ */ yt(qa, [["__scopeId", "data-v-3da4b86c"]]), Ja = { class: "wb-settings-pane" }, za = { class: "wb-settings-card wb-card-master" }, Xa = { class: "wb-settings-group" }, Za = { class: "wb-settings-card" }, Qa = { class: "wb-appearance-toggle" }, ec = { class: "wb-settings-group" }, tc = { class: "wb-settings-card" }, nc = { class: "wb-settings-group" }, sc = { class: "wb-settings-card wb-card-col" }, rc = {
  key: 0,
  class: "wb-settings-card wb-card-col"
}, ic = {
  key: 1,
  class: "wb-settings-card wb-card-col"
}, oc = { class: "wb-settings-group" }, lc = { class: "wb-settings-card wb-card-col" }, ac = { class: "wb-settings-card wb-card-col" }, cc = { class: "wb-settings-group" }, uc = { class: "wb-settings-card wb-card-col" }, fc = { class: "wb-settings-card wb-card-col" }, dc = { class: "wb-settings-card wb-card-col" }, pc = { class: "wb-settings-card" }, hc = /* @__PURE__ */ ut({
  __name: "SettingsPane",
  props: {
    surface: { default: "drawer" }
  },
  setup(e) {
    const t = e, { settings: n, updateSettings: s, shell: r, appearance: i } = vt(), o = le(() => t.surface === "panel"), l = le({
      get: () => n.value.enabled,
      set: (A) => s({ enabled: A })
    }), a = le({
      get: () => n.value.mode,
      set: (A) => s({ mode: A })
    }), d = le({
      get: () => n.value.sessionDelivery,
      set: (A) => s({ sessionDelivery: A })
    }), u = le({
      get: () => n.value.sessionTitle,
      set: (A) => s({ sessionTitle: A })
    }), p = le({
      get: () => n.value.bridgeUrl,
      set: (A) => s({ bridgeUrl: A })
    }), m = le({
      get: () => n.value.pollIntervalMs,
      set: (A) => s({ pollIntervalMs: Number(A) || 3e3 })
    }), E = le({
      get: () => n.value.busyPolicy,
      set: (A) => s({ busyPolicy: A })
    }), D = le({
      get: () => n.value.busyReplyText,
      set: (A) => s({ busyReplyText: A })
    }), R = le({
      get: () => n.value.sendTiming,
      set: (A) => s({ sendTiming: A })
    }), B = le({
      get: () => n.value.stripThoughtTags,
      set: (A) => s({ stripThoughtTags: A })
    }), j = le({
      get: () => i.state.value,
      set: (A) => i.set(A === "day" ? "day" : "night")
    });
    return (A, b) => (q(), ee("div", Ja, [
      b[34] || (b[34] = h("div", { class: "wb-settings-header" }, [
        h("h2", { class: "wb-settings-title" }, "微信桥接"),
        h("p", { class: "wb-settings-description" }, " 把微信消息接入当前角色卡聊天，并在生成完成后把回复发回微信。 ")
      ], -1)),
      h("label", za, [
        b[13] || (b[13] = h("div", { class: "wb-card-copy" }, [
          h("strong", null, "启用桥接"),
          h("span", null, "关闭后悬浮球与后台轮询都会停止。")
        ], -1)),
        Ne(h("input", {
          "onUpdate:modelValue": b[0] || (b[0] = (x) => l.value = x),
          type: "checkbox"
        }, null, 512), [
          [Pr, l.value]
        ])
      ]),
      h("section", Xa, [
        b[15] || (b[15] = h("header", { class: "wb-group-header" }, [
          h("h3", null, "外观")
        ], -1)),
        h("div", Za, [
          b[14] || (b[14] = h("div", { class: "wb-card-copy" }, [
            h("strong", null, "外观"),
            h("span", null, "切换面板与悬浮球的夜间 / 日间主题。")
          ], -1)),
          h("div", Qa, [
            h("button", {
              type: "button",
              class: Le(["wb-appearance-option", { active: j.value === "night" }]),
              onClick: b[1] || (b[1] = (x) => j.value = "night")
            }, " 夜间 ", 2),
            h("button", {
              type: "button",
              class: Le(["wb-appearance-option", { active: j.value === "day" }]),
              onClick: b[2] || (b[2] = (x) => j.value = "day")
            }, " 日间 ", 2)
          ])
        ])
      ]),
      h("section", ec, [
        b[17] || (b[17] = h("header", { class: "wb-group-header" }, [
          h("h3", null, "面板")
        ], -1)),
        h("div", tc, [
          b[16] || (b[16] = h("div", { class: "wb-card-copy" }, [
            h("strong", null, "打开控制面板"),
            h("span", null, "连接与行为设置、运行状态、消息记录都在面板中。")
          ], -1)),
          h("button", {
            class: "wb-btn",
            type: "button",
            onClick: b[3] || (b[3] = (x) => ue(r).openPanel())
          }, "打开")
        ])
      ]),
      o.value ? (q(), ee(ge, { key: 0 }, [
        h("section", nc, [
          b[23] || (b[23] = h("header", { class: "wb-group-header" }, [
            h("h3", null, "投递方式")
          ], -1)),
          h("div", sc, [
            b[19] || (b[19] = h("div", { class: "wb-card-copy" }, [
              h("strong", null, "微信消息送到哪里"),
              h("span", null, [
                Wt(" 角色卡聊天：走当前角色，可用工作区/聊天工具。"),
                h("br"),
                Wt(" 应用内助手：走专属会话，可用 app.* 工具（能操作界面）。 ")
              ])
            ], -1)),
            Ne(h("select", {
              "onUpdate:modelValue": b[4] || (b[4] = (x) => a.value = x),
              class: "wb-control"
            }, [...b[18] || (b[18] = [
              h("option", { value: "chat" }, "角色卡聊天（默认）", -1),
              h("option", { value: "session" }, "应用内助手会话", -1)
            ])], 512), [
              [Sn, a.value]
            ])
          ]),
          a.value === "session" ? (q(), ee("div", rc, [
            b[20] || (b[20] = h("div", { class: "wb-card-copy" }, [
              h("strong", null, "专属会话名称"),
              h("span", null, "微信消息只进这个会话，与你手动使用的会话隔开。")
            ], -1)),
            Ne(h("input", {
              "onUpdate:modelValue": b[5] || (b[5] = (x) => u.value = x),
              class: "wb-control",
              type: "text",
              placeholder: "微信"
            }, null, 512), [
              [Gt, u.value]
            ])
          ])) : Ve("", !0),
          a.value === "session" ? (q(), ee("div", ic, [
            b[22] || (b[22] = h("div", { class: "wb-card-copy" }, [
              h("strong", null, "发送粒度"),
              h("span", null, [
                Wt(" 增量：助手每说一句就发一条，过程及时但会有中间话。"),
                h("br"),
                Wt(" 仅最终：等运行结束只发收尾答案，干净但要等。 ")
              ])
            ], -1)),
            Ne(h("select", {
              "onUpdate:modelValue": b[6] || (b[6] = (x) => d.value = x),
              class: "wb-control"
            }, [...b[21] || (b[21] = [
              h("option", { value: "stream" }, "增量发送（默认）", -1),
              h("option", { value: "final" }, "仅最终答案", -1)
            ])], 512), [
              [Sn, d.value]
            ])
          ])) : Ve("", !0)
        ]),
        h("section", oc, [
          b[26] || (b[26] = h("header", { class: "wb-group-header" }, [
            h("h3", null, "连接")
          ], -1)),
          h("div", lc, [
            b[24] || (b[24] = h("div", { class: "wb-card-copy" }, [
              h("strong", null, "桥接服务地址"),
              h("span", null, "本地 bridge 服务，默认 8080。")
            ], -1)),
            Ne(h("input", {
              "onUpdate:modelValue": b[7] || (b[7] = (x) => p.value = x),
              class: "wb-control",
              type: "text",
              placeholder: "http://127.0.0.1:8080"
            }, null, 512), [
              [Gt, p.value]
            ])
          ]),
          h("div", ac, [
            b[25] || (b[25] = h("div", { class: "wb-card-copy" }, [
              h("strong", null, "轮询间隔（毫秒）"),
              h("span", null, "扩展读取桥接队列的频率。")
            ], -1)),
            Ne(h("input", {
              "onUpdate:modelValue": b[8] || (b[8] = (x) => m.value = x),
              class: "wb-control",
              type: "number",
              min: "1000",
              step: "500"
            }, null, 512), [
              [Gt, m.value]
            ])
          ])
        ]),
        h("section", cc, [
          b[33] || (b[33] = h("header", { class: "wb-group-header" }, [
            h("h3", null, "行为")
          ], -1)),
          h("div", uc, [
            b[28] || (b[28] = h("div", { class: "wb-card-copy" }, [
              h("strong", null, "忙碌时收到新消息"),
              h("span", null, "生成进行中时，对新的微信消息的处理方式。")
            ], -1)),
            Ne(h("select", {
              "onUpdate:modelValue": b[9] || (b[9] = (x) => E.value = x),
              class: "wb-control"
            }, [...b[27] || (b[27] = [
              h("option", { value: "discard" }, "丢弃（默认）", -1),
              h("option", { value: "queue" }, "排队，生成结束后处理", -1)
            ])], 512), [
              [Sn, E.value]
            ])
          ]),
          h("div", fc, [
            b[29] || (b[29] = h("div", { class: "wb-card-copy" }, [
              h("strong", null, "忙碌提示文案"),
              h("span", null, "丢弃模式下回给微信的提示。")
            ], -1)),
            Ne(h("input", {
              "onUpdate:modelValue": b[10] || (b[10] = (x) => D.value = x),
              class: "wb-control",
              type: "text"
            }, null, 512), [
              [Gt, D.value]
            ])
          ]),
          h("div", dc, [
            b[31] || (b[31] = h("div", { class: "wb-card-copy" }, [
              h("strong", null, "回发时机"),
              h("span", null, "决定在生成流程的哪一步把回复发往微信。")
            ], -1)),
            Ne(h("select", {
              "onUpdate:modelValue": b[11] || (b[11] = (x) => R.value = x),
              class: "wb-control"
            }, [...b[30] || (b[30] = [
              h("option", { value: "afterCommands" }, "正则/命令处理后立即发送（默认）", -1),
              h("option", { value: "generationEnded" }, "生成完全结束后发送", -1)
            ])], 512), [
              [Sn, R.value]
            ])
          ]),
          h("label", pc, [
            b[32] || (b[32] = h("div", { class: "wb-card-copy" }, [
              h("strong", null, "去除思维链标签"),
              h("span", null, "发送前移除 think / reasoning 等标签内容。")
            ], -1)),
            Ne(h("input", {
              "onUpdate:modelValue": b[12] || (b[12] = (x) => B.value = x),
              type: "checkbox"
            }, null, 512), [
              [Pr, B.value]
            ])
          ])
        ])
      ], 64)) : Ve("", !0)
    ]));
  }
}), oo = /* @__PURE__ */ yt(hc, [["__scopeId", "data-v-8939d497"]]), gc = /* @__PURE__ */ ut({
  __name: "ExtensionSettings",
  setup(e) {
    return (t, n) => (q(), Ws(oo, { surface: "panel" }));
  }
}), mc = { class: "wb-inline" }, bc = ["disabled"], _c = /* @__PURE__ */ ut({
  __name: "TestSendRow",
  setup(e) {
    const { runtime: t } = vt(), n = /* @__PURE__ */ Dt("这是一条测试消息"), s = /* @__PURE__ */ Dt(!1);
    async function r() {
      s.value = !0;
      try {
        await t.testSend(n.value);
      } finally {
        s.value = !1;
      }
    }
    return (i, o) => (q(), ee("div", mc, [
      Ne(h("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (l) => n.value = l),
        class: "wb-control",
        type: "text"
      }, null, 512), [
        [Gt, n.value]
      ]),
      h("button", {
        class: "wb-btn",
        type: "button",
        disabled: s.value,
        onClick: r
      }, we(s.value ? "发送中…" : "发送到微信"), 9, bc)
    ]));
  }
}), vc = /* @__PURE__ */ yt(_c, [["__scopeId", "data-v-d944af46"]]), yc = { class: "wb-view" }, wc = { class: "wb-fact-strip" }, Tc = { class: "wb-fact-label" }, xc = { class: "wb-fact-value" }, Sc = { class: "wb-card" }, Ec = { class: "wb-card-copy" }, Cc = { class: "wb-chip" }, Ac = {
  key: 0,
  class: "wb-card is-error"
}, Ic = { class: "wb-card-copy" }, Oc = { class: "wb-card wb-card-col" }, Mc = /* @__PURE__ */ ut({
  __name: "BridgeStatusView",
  setup(e) {
    const { runtime: t, settings: n } = vt(), s = t.state, r = le(() => [
      { label: "桥接服务", value: s.connected ? "已连接" : "未连接", tone: s.connected ? "ok" : "bad" },
      { label: "当前阶段", value: s.busy ? "生成中" : "待机", tone: s.busy ? "warn" : "" },
      { label: "轮询次数", value: String(s.polls), tone: "" },
      { label: "接收消息", value: String(s.received), tone: "" },
      { label: "发送消息", value: String(s.sent), tone: "" }
    ]);
    return (i, o) => (q(), ee("div", yc, [
      o[3] || (o[3] = h("header", { class: "wb-view-header" }, [
        h("h2", null, "运行状态"),
        h("p", null, "微信与 TauriTavern 之间的桥接实时状态。")
      ], -1)),
      h("div", wc, [
        (q(!0), ee(ge, null, tn(r.value, (l) => (q(), ee("div", {
          key: l.label,
          class: Le(["wb-fact", l.tone ? `is-${l.tone}` : ""])
        }, [
          h("span", Tc, we(l.label), 1),
          h("strong", xc, we(l.value), 1)
        ], 2))), 128))
      ]),
      h("section", Sc, [
        h("div", Ec, [
          o[0] || (o[0] = h("strong", null, "桥接地址", -1)),
          h("span", null, we(ue(n).bridgeUrl), 1)
        ]),
        h("span", Cc, "轮询 " + we(ue(n).pollIntervalMs) + "ms", 1)
      ]),
      ue(s).lastError ? (q(), ee("section", Ac, [
        h("div", Ic, [
          o[1] || (o[1] = h("strong", null, "最近错误", -1)),
          h("span", null, we(ue(s).lastError), 1)
        ])
      ])) : Ve("", !0),
      h("section", Oc, [
        o[2] || (o[2] = h("div", { class: "wb-card-copy" }, [
          h("strong", null, "测试发送"),
          h("span", null, "直接向微信发送一条文本，用于验证链路。")
        ], -1)),
        ce(vc)
      ])
    ]));
  }
}), Rc = /* @__PURE__ */ yt(Mc, [["__scopeId", "data-v-c2ac445c"]]), Pc = { class: "wb-view" }, $c = { class: "wb-view-header wb-header-row" }, Nc = { class: "wb-log-list" }, Dc = {
  key: 0,
  class: "wb-empty"
}, Lc = { class: "wb-log-time" }, Fc = { class: "wb-log-level" }, Vc = { class: "wb-log-text" }, Uc = /* @__PURE__ */ ut({
  __name: "MessageLogView",
  setup(e) {
    const { runtime: t } = vt(), n = t.state, s = /* @__PURE__ */ Dt(!1);
    function r(i) {
      return new Date(i).toLocaleTimeString("zh-CN", { hour12: !1 });
    }
    return (i, o) => (q(), ee("div", Pc, [
      h("header", $c, [
        o[1] || (o[1] = h("div", null, [
          h("h2", null, "消息记录"),
          h("p", null, "桥接运行期间的事件日志。")
        ], -1)),
        h("button", {
          class: "wb-btn",
          type: "button",
          onClick: o[0] || (o[0] = (l) => s.value = !s.value)
        }, we(s.value ? "简洁视图" : "原始数据"), 1)
      ]),
      h("div", Nc, [
        ue(n).logs.length ? Ve("", !0) : (q(), ee("div", Dc, "暂无记录")),
        (q(!0), ee(ge, null, tn(ue(n).logs, (l) => (q(), ee("div", {
          key: l.id,
          class: Le(["wb-log-row", `is-${l.level}`])
        }, [
          h("span", Lc, we(r(l.atMs)), 1),
          h("span", Fc, we(l.level), 1),
          h("span", Vc, we(l.text), 1)
        ], 2))), 128))
      ])
    ]));
  }
}), Hc = /* @__PURE__ */ yt(Uc, [["__scopeId", "data-v-363610d3"]]), jc = { class: "wb-panel-sidebar" }, Bc = { class: "wb-sidebar-nav wb-desktop-nav" }, kc = { class: "wb-category-title" }, Wc = ["onClick"], Kc = { class: "wb-mobile-nav" }, Gc = ["onClick"], qc = { class: "wb-panel-content" }, Yc = { class: "wb-content-header" }, Jc = { class: "wb-content-body" }, zc = {
  key: 0,
  class: "wb-feature-host wb-settings-host"
}, Xc = {
  key: 1,
  class: "wb-feature-host"
}, Zc = {
  key: 2,
  class: "wb-feature-host"
}, Qc = /* @__PURE__ */ ut({
  __name: "MainPanel",
  setup(e) {
    const { shell: t } = vt(), n = [
      {
        id: "bridge",
        label: "桥接",
        items: [
          { id: "status", label: "运行状态" },
          { id: "messages", label: "消息记录" }
        ]
      }
    ], s = le(() => [
      { id: "settings", label: "设置" },
      ...n.flatMap((i) => i.items)
    ]);
    function r(i) {
      t.setActiveTab(i);
    }
    return (i, o) => (q(), ee("div", {
      class: "wb-panel-backdrop",
      onClick: o[3] || (o[3] = (l) => ue(t).closePanel())
    }, [
      h("div", {
        class: "wb-panel-window",
        onClick: o[2] || (o[2] = Ha(() => {
        }, ["stop"]))
      }, [
        h("div", jc, [
          o[4] || (o[4] = h("div", { class: "wb-sidebar-header" }, [
            h("h3", null, "微信桥接")
          ], -1)),
          h("div", Bc, [
            h("div", {
              class: Le(["wb-nav-item", { active: ue(t).state.activeTab === "settings" }]),
              onClick: o[0] || (o[0] = (l) => r("settings"))
            }, " 设置 ", 2),
            (q(), ee(ge, null, tn(n, (l) => h("div", {
              key: l.id,
              class: "wb-nav-category"
            }, [
              h("div", kc, we(l.label), 1),
              (q(!0), ee(ge, null, tn(l.items, (a) => (q(), ee("div", {
                key: a.id,
                class: Le(["wb-nav-item wb-sub-item", { active: ue(t).state.activeTab === a.id }]),
                onClick: (d) => r(a.id)
              }, we(a.label), 11, Wc))), 128))
            ])), 64))
          ]),
          h("div", Kc, [
            (q(!0), ee(ge, null, tn(s.value, (l) => (q(), ee("button", {
              key: l.id,
              class: Le(["wb-mobile-tab", { active: ue(t).state.activeTab === l.id }]),
              onClick: (a) => r(l.id)
            }, we(l.label), 11, Gc))), 128))
          ])
        ]),
        h("div", qc, [
          h("div", Yc, [
            h("button", {
              class: "wb-close-btn",
              onClick: o[1] || (o[1] = (l) => ue(t).closePanel())
            }, "✕")
          ]),
          h("div", Jc, [
            ue(t).state.activeTab === "settings" ? (q(), ee("div", zc, [
              ce(gc)
            ])) : ue(t).state.activeTab === "status" ? (q(), ee("div", Xc, [
              ce(Rc)
            ])) : ue(t).state.activeTab === "messages" ? (q(), ee("div", Zc, [
              ce(Hc)
            ])) : Ve("", !0)
          ])
        ])
      ])
    ]));
  }
}), eu = /* @__PURE__ */ yt(Qc, [["__scopeId", "data-v-8d5654d3"]]), tu = ["data-wb-appearance"], nu = /* @__PURE__ */ ut({
  __name: "App",
  setup(e) {
    const { shell: t, appearance: n, settings: s } = vt(), r = le(() => n.state.value), i = le(() => s.value.enabled);
    return (o, l) => (q(), ee("div", {
      class: "wb-theme-root wb-shell-root",
      "data-wb-appearance": r.value
    }, [
      i.value ? (q(), ee(ge, { key: 0 }, [
        ce(Ya),
        ce(pa, { name: "fade" }, {
          default: yi(() => [
            ue(t).state.panelOpen ? (q(), Ws(eu, { key: 0 })) : Ve("", !0)
          ]),
          _: 1
        })
      ], 64)) : Ve("", !0)
    ], 8, tu));
  }
}), su = /* @__PURE__ */ yt(nu, [["__scopeId", "data-v-ebd711ef"]]), ru = { class: "inline-drawer wide100p wb-settings-drawer" }, iu = { class: "inline-drawer-content" }, ou = ["data-wb-appearance"], lu = {
  key: 0,
  class: "wb-disabled-hint"
}, au = /* @__PURE__ */ ut({
  __name: "ExtensionsPagePanel",
  setup(e) {
    const { appearance: t, settings: n } = vt(), s = le(() => t.state.value), r = le(() => n.value.enabled);
    return (i, o) => (q(), ee("div", ru, [
      o[0] || (o[0] = h("div", { class: "inline-drawer-toggle inline-drawer-header" }, [
        h("div", { class: "wb-settings-drawer-header" }, [
          h("i", { class: "fa-solid fa-comment-dots" }),
          h("b", null, "WeChat Bridge")
        ]),
        h("div", { class: "inline-drawer-icon fa-solid fa-circle-chevron-down down" })
      ], -1)),
      h("div", iu, [
        h("div", {
          class: "wb-theme-root wb-settings-surface",
          "data-wb-appearance": s.value
        }, [
          r.value ? Ve("", !0) : (q(), ee("p", lu, "桥接当前已关闭。")),
          ce(oo, { surface: "drawer" })
        ], 8, ou)
      ])
    ]));
  }
}), cu = /* @__PURE__ */ yt(au, [["__scopeId", "data-v-bdbcfe94"]]), uu = {
  GENERATION_STARTED: "generation_started",
  GENERATION_STOPPED: "generation_stopped",
  GENERATION_ENDED: "generation_ended",
  GENERATION_AFTER_COMMANDS: "GENERATION_AFTER_COMMANDS",
  MESSAGE_RECEIVED: "message_received",
  CHAT_CHANGED: "chat_id_changed"
};
function fu() {
  return window.__TAURITAVERN__?.api?.agent?.tools ?? null;
}
function du() {
  return window.__TAURITAVERN__?.api?.agent?.sessions ?? null;
}
async function pu(e) {
  const t = window.__TAURITAVERN__?.api?.agent?.readEvents;
  if (typeof t != "function") return null;
  try {
    const { events: n } = await t({ runId: e, limit: 200 });
    for (let s = n.length - 1; s >= 0; s -= 1) {
      const r = n[s]?.type;
      if (typeof r == "string" && r.startsWith("run_")) return r;
    }
  } catch {
  }
  return null;
}
function lo(e) {
  if (!e || e.role !== "assistant") return null;
  const t = (e.parts ?? []).filter((n) => n.type === "text" && typeof n.text == "string").map((n) => n.text).join("").trim();
  return t === "" ? null : t;
}
function As() {
  return window.SillyTavern?.getContext?.() ?? null;
}
function hu(e, t) {
  return e.eventTypes?.[t] ?? uu[t];
}
function En(e, t, n) {
  const s = e.eventSource;
  return s?.on ? (s.on(hu(e, t), n), !0) : !1;
}
function gu(e, t) {
  const n = e.chat?.[t];
  return !n || n.is_user || n.is_system ? null : String(n.mes ?? "");
}
function mu(e) {
  for (let t = e.chat.length - 1; t >= 0; t -= 1) {
    const n = e.chat[t];
    if (n && !n.is_user && !n.is_system)
      return String(n.mes ?? "");
  }
  return "";
}
async function Lr(e, t) {
  const n = e.executeSlashCommandsWithOptions;
  if (typeof n == "function") {
    await n(t, {});
    return;
  }
  const s = e.executeSlashCommands;
  if (typeof s == "function") {
    await s(t);
    return;
  }
  throw new Error(
    "executeSlashCommands unavailable on SillyTavern context (keys: " + Object.keys(e).slice(0, 12).join(",") + ")"
  );
}
function bu(e) {
  return `"${e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r?\n/g, "\\n")}"`;
}
const _u = "http://127.0.0.1:8080";
function In(e = {}) {
  const t = (e.baseUrl ?? _u).replace(/\/+$/, ""), n = e.fetchImpl ?? fetch.bind(globalThis);
  async function s() {
    const l = await n(`${t}/inbound`, { method: "GET" });
    if (!l.ok)
      throw new Error(`bridge poll failed: HTTP ${l.status}`);
    const a = await l.json();
    return Array.isArray(a.messages) ? a.messages : [];
  }
  async function r(l) {
    const a = l && l > 0 ? `?limit=${encodeURIComponent(String(l))}` : "", d = await n(`${t}/messages${a}`, { method: "GET" });
    if (!d.ok)
      throw new Error(`bridge read failed: HTTP ${d.status}`);
    const u = await d.json();
    return Array.isArray(u.messages) ? u.messages : [];
  }
  async function i() {
    const l = await n(`${t}/health`, { method: "GET" });
    if (!l.ok)
      throw new Error(`bridge status failed: HTTP ${l.status}`);
    return await l.json();
  }
  async function o(l) {
    const a = await n(`${t}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(l)
    });
    if (!a.ok)
      throw new Error(`bridge send failed: HTTP ${a.status}`);
  }
  return {
    poll: s,
    read: r,
    send: o,
    status: i,
    dispose() {
    }
  };
}
const vu = 1e3, yu = 3600 * 1e3;
function wu(e, t) {
  return new Promise((n) => {
    const s = setTimeout(n, e);
    t?.addEventListener("abort", () => {
      clearTimeout(s), n();
    }, { once: !0 });
  });
}
async function Tu(e, t) {
  const n = t.trim() || "微信", { sessions: s } = await e.list(), r = s.find((o) => (o.title ?? "").trim() === n);
  if (r) return r;
  const { session: i } = await e.create();
  try {
    return (await e.rename({ sessionId: i.id, title: n })).session;
  } catch {
    return i;
  }
}
async function xu(e, t, n, s) {
  let r;
  try {
    r = (await e.send({ sessionId: t, text: n })).runId;
  } catch (d) {
    return { ok: !1, error: `发送到助手会话失败：${String(d?.message ?? d)}` };
  }
  const i = Date.now() + (s.safetyCeilingMs ?? yu);
  let o = 0, l = 0, a = null;
  for (; Date.now() < i; ) {
    if (s.signal?.aborted)
      return { ok: !1, error: "运行已取消。" };
    await wu(vu, s.signal);
    let d;
    try {
      d = await e.read({ sessionId: t, limit: 50 });
    } catch (m) {
      return { ok: !1, error: `读取助手会话失败：${String(m?.message ?? m)}` };
    }
    for (const m of d.messages)
      m.runId === r && (m.seq <= l || (l = m.seq, Su(m, s, (E) => {
        a = E;
      })));
    if (d.activeRun) {
      o = 0;
      continue;
    }
    if (o += 1, o < 2) continue;
    const p = Eu(d.messages, r);
    if (p) return { ok: !0, text: p };
    if (a) return { ok: !0, text: a };
    if (o >= 4) {
      const m = await pu(r);
      return {
        ok: !1,
        error: m ? `助手运行已结束（${m}）但没有产生回复。` : "助手运行已结束但没有产生回复。"
      };
    }
  }
  return { ok: !1, error: "助手运行超时。" };
}
function Su(e, t, n) {
  if (e.message?.role !== "assistant") return;
  const s = lo(e.message);
  s && (n(s), t.onAssistantText?.(s));
}
function Eu(e, t) {
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const s = e[n];
    if (s.runId !== t || s.message?.role !== "assistant") continue;
    const r = lo(s.message);
    if (r) return r;
  }
  return null;
}
const Fr = {
  enabled: !0,
  mode: "chat",
  sessionTitle: "微信",
  sessionDelivery: "stream",
  bridgeUrl: "http://127.0.0.1:8080",
  pollIntervalMs: 3e3,
  busyPolicy: "discard",
  sendTiming: "afterCommands",
  busyReplyText: "剧情正在生成，请稍候～",
  stripThoughtTags: !0
}, ao = "wechat-bridge";
function Vr() {
  const e = window.extension_settings?.[ao];
  return !e || typeof e != "object" ? { ...Fr } : { ...Fr, ...e };
}
function Ur(e) {
  window.extension_settings || (window.extension_settings = {}), window.extension_settings[ao] = { ...e }, window.saveSettingsDebounced?.();
}
function Cu(e) {
  return e.replace(/<think>[\s\S]*?<\>/gi, "").replace(/<thinking>[\s\S]*?<\/thinking>/gi, "").replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, "").trim();
}
const Hr = 200, Au = 2500, jr = 3e5, Br = "tauritavern-agent-run-event", Iu = /* @__PURE__ */ new Set([
  "run_completed",
  "run_partial_success",
  "run_cancelled",
  "run_failed"
]);
function Ou(e) {
  const t = /* @__PURE__ */ Dt({ ...e }), n = /* @__PURE__ */ gn({
    phase: "idle",
    busy: !1,
    lastError: null,
    polls: 0,
    sent: 0,
    received: 0,
    logs: [],
    connected: !1
  });
  let s = 0;
  function r(M, U) {
    n.logs.unshift({ id: ++s, atMs: Date.now(), level: M, text: U }), n.logs.length > Hr && (n.logs.length = Hr);
  }
  let i = null, o = null, l = null, a = Promise.resolve(), d = !1, u = !1;
  const p = [];
  let m = null, E = null;
  function D(M) {
    return a = a.catch(() => {
    }).then(M), a;
  }
  async function R(M, U) {
    if (!o) return;
    const H = t.value.stripThoughtTags ? Cu(M) : M;
    if (!H) {
      r("warn", "Refusing to send empty reply.");
      return;
    }
    n.phase = "sending";
    try {
      await o.send({ text: H, userId: U }), n.sent += 1, r("info", `Sent to WeChat (${H.length} chars).`);
    } catch (k) {
      n.phase = "error", n.lastError = String(k), r("error", `Send failed: ${String(k)}`);
    } finally {
      n.phase === "sending" && (n.phase = "idle");
    }
  }
  function B() {
    E && (clearTimeout(E), E = null);
  }
  function j() {
    B(), E = setTimeout(() => {
      E = null, m && A(`生成超时（${Math.round(jr / 1e3)} 秒未完成）`);
    }, jr);
  }
  function A(M) {
    const U = m;
    if (m = null, B(), n.busy = !1, n.phase = "error", n.lastError = M, r("error", `Run aborted: ${M}`), U && R(`[桥接] ${M}`, U.target), p.length > 0) {
      const H = p.shift();
      H && D(() => b(H));
    }
  }
  async function b(M) {
    if (t.value.mode === "session") {
      await X(M);
      return;
    }
    await x(M);
  }
  async function x(M) {
    if (!i) throw new Error("SillyTavern context unavailable");
    m = { target: M.from }, n.busy = !0, n.phase = "generating", j();
    try {
      await Lr(i, `/send ${bu(M.text)}`), await Lr(i, "/trigger await=true"), r("info", `Injected message from ${M.from} and triggered generation.`);
    } catch (U) {
      A(`注入聊天失败：${String(U)}`);
    }
  }
  async function X(M) {
    const U = du();
    if (!U) {
      A("应用内助手 API 不可用（api.agent.sessions 缺失）。");
      return;
    }
    m = { target: M.from }, n.busy = !0, n.phase = "generating", r("info", `Session turn for ${M.from}.`);
    const H = t.value.sessionDelivery === "stream";
    H && r("info", "会话增量模式：助手每条输出都会转发微信。");
    try {
      const k = await Tu(U, t.value.sessionTitle), Y = await xu(U, k.id, M.text, {
        // In stream mode forward each assistant message as it appears;
        // in final mode the closing answer is sent once at the end.
        onAssistantText: H ? (Qe) => {
          const He = m;
          He && D(() => R(Qe, He.target));
        } : void 0
      });
      if (!Y.ok) {
        A(Y.error);
        return;
      }
      const Ue = m;
      if (m = null, B(), n.busy = !1, Ue && !H && await R(Y.text, Ue.target), p.length > 0) {
        const Qe = p.shift();
        Qe && D(() => b(Qe));
      }
    } catch (k) {
      A(`助手会话运行失败：${String(k)}`);
    }
  }
  function ie(M) {
    if (!m) return;
    const U = M();
    if (U === null) return;
    const H = m.target;
    m = null, B(), D(async () => {
      if (await R(U, H), n.busy = !1, p.length > 0) {
        const k = p.shift();
        k && await b(k);
      }
    });
  }
  function de(M, U) {
    U !== "first_message" && m && (U === "quiet" || U === "impersonate" || t.value.sendTiming === "afterCommands" && typeof M == "number" && ie(() => i ? gu(i, M) : null));
  }
  function me() {
    if (!m) {
      n.busy = !1;
      return;
    }
    if (t.value.sendTiming === "generationEnded") {
      ie(() => i ? mu(i) : null);
      return;
    }
    const M = m;
    setTimeout(() => {
      if (m !== M) return;
      const U = M.target;
      m = null, n.busy = !1, n.phase = "error", n.lastError = "生成结束但没有产生新的对话消息", r("warn", "Generation ended without a new assistant message."), R("[桥接] 生成结束但没有产生新消息，请重试。", U);
    }, Au);
  }
  function V(M) {
    const H = M.detail?.event?.type;
    if (!(!H || !Iu.has(H))) {
      if (!m) {
        (H === "run_failed" || H === "run_cancelled") && (n.busy = !1, B());
        return;
      }
      H === "run_failed" ? A("生成失败，请稍后重试。") : H === "run_cancelled" && A("生成已被取消。");
    }
  }
  function K() {
    !i || u || (u = !0, En(i, "GENERATION_STARTED", () => {
      n.busy = !0, n.phase = "generating";
    }), En(i, "MESSAGE_RECEIVED", (M, U) => {
      de(M, U);
    }), En(i, "GENERATION_ENDED", () => {
      me();
    }), window.addEventListener(Br, V), En(i, "GENERATION_STOPPED", () => {
      if (!m) {
        n.busy = !1;
        return;
      }
      A("生成已被停止。");
    }));
  }
  async function re() {
    if (!(d || !o)) {
      d = !0;
      try {
        const M = await o.poll();
        n.polls += 1, n.connected = !0;
        for (const U of M) {
          if (n.received += 1, n.busy || m) {
            t.value.busyPolicy === "queue" ? (p.push(U), r("info", "Busy: queued message.")) : r("info", "Busy: discarded message."), await R(t.value.busyReplyText, U.from);
            continue;
          }
          await b(U);
        }
      } catch (M) {
        n.connected = !1, n.lastError = String(M), r("warn", `Poll failed: ${String(M)}`);
      } finally {
        d = !1;
      }
    }
  }
  function O() {
    Z();
    const M = Math.max(1e3, t.value.pollIntervalMs);
    l = setInterval(() => {
      t.value.enabled && D(re);
    }, M);
  }
  function Z() {
    l && (clearInterval(l), l = null);
  }
  return {
    state: n,
    settings: t,
    start() {
      if (i = As(), !i) {
        r("warn", "SillyTavern context not ready; retrying in 3s."), setTimeout(() => {
          i = As(), i ? (K(), r("info", "SillyTavern context acquired.")) : r("error", "SillyTavern context unavailable; bridge inactive.");
        }, 3e3), o = In({ baseUrl: t.value.bridgeUrl }), O();
        return;
      }
      o = In({ baseUrl: t.value.bridgeUrl }), K(), O(), r("info", `Bridge started (${t.value.bridgeUrl}).`);
    },
    stop() {
      Z(), r("info", "Bridge stopped.");
    },
    applySettings(M) {
      const U = t.value.enabled;
      t.value = { ...M }, !U && M.enabled ? this.start() : U && !M.enabled ? this.stop() : M.enabled && (o = In({ baseUrl: M.bridgeUrl }), O());
    },
    async testSend(M) {
      await R(M);
    },
    dispose() {
      Z(), B(), window.removeEventListener(Br, V), o?.dispose(), o = null;
    }
  };
}
function Mu() {
  const e = /* @__PURE__ */ Dt(Vr());
  function t(n) {
    const s = { ...e.value, ...n };
    e.value = s, Ur(s);
  }
  return {
    state: e,
    update: t,
    reset() {
      const n = Vr();
      e.value = n, Ur(n);
    }
  };
}
function Ru() {
  const e = /* @__PURE__ */ gn({
    panelOpen: !1,
    activeTab: "status"
  });
  return {
    state: e,
    openPanel() {
      e.panelOpen = !0;
    },
    closePanel() {
      e.panelOpen = !1;
    },
    togglePanel() {
      e.panelOpen = !e.panelOpen;
    },
    setActiveTab(t) {
      e.activeTab = t;
    }
  };
}
const kr = "wechat-bridge-appearance";
function Pu() {
  let e = "night";
  try {
    const n = window.localStorage?.getItem(kr);
    (n === "day" || n === "night") && (e = n);
  } catch {
  }
  const t = /* @__PURE__ */ Dt(e);
  return {
    state: t,
    set(n) {
      t.value = n;
      try {
        window.localStorage?.setItem(kr, n);
      } catch {
      }
    }
  };
}
const hs = "wechat-bridge", gs = ["chat", "session"];
function $u(e, t) {
  if (typeof e != "string" || e.trim() === "")
    throw new Error(`${t} must be a non-empty string`);
  return e;
}
function Nu(e) {
  if (e == null) return 20;
  const t = Number(e);
  if (!Number.isFinite(t) || t <= 0)
    throw new Error("limit must be a positive number");
  return Math.min(Math.floor(t), 100);
}
async function Du(e, t) {
  const n = () => In({ baseUrl: t().bridgeUrl });
  await e.register(
    {
      extensionId: hs,
      name: "wechat.send",
      description: "Send a text message to a WeChat user through the local WeChat bridge. Omit userId to send to the most recently active contact. Use this when the user asks you to notify someone on WeChat.",
      inputSchema: {
        type: "object",
        additionalProperties: !1,
        properties: {
          text: {
            type: "string",
            description: "Text to send. Sent as-is; long text is not split."
          },
          userId: {
            type: "string",
            description: "Target WeChat user id. Omit for the last active contact."
          }
        },
        required: ["text"]
      },
      contexts: gs,
      enabled: !0
    },
    async (s) => {
      const r = $u(s.text, "text"), i = typeof s.userId == "string" ? s.userId : void 0;
      return await n().send({ text: r, userId: i }), { sent: !0, to: i ?? "last-active-user" };
    }
  ), await e.register(
    {
      extensionId: hs,
      name: "wechat.read",
      description: "Read recent inbound WeChat messages without consuming them. Returns newest first. This does not mark messages as handled and does not remove them from the queue used by the bridge auto-poller.",
      inputSchema: {
        type: "object",
        additionalProperties: !1,
        properties: {
          limit: {
            type: "number",
            description: "Maximum messages to return (1-100, default 20)."
          }
        }
      },
      contexts: gs,
      enabled: !0
    },
    async (s) => {
      const r = Nu(s.limit), i = await n().read(r);
      return {
        count: i.length,
        messages: i.map((o) => ({
          from: o.from,
          text: o.text,
          receivedAtMs: o.receivedAtMs
        }))
      };
    }
  ), await e.register(
    {
      extensionId: hs,
      name: "wechat.status",
      description: "Report the local WeChat bridge status: connection, account, queue depth and the last error. Use this to check whether WeChat integration is working before sending or after a failure.",
      inputSchema: {
        type: "object",
        additionalProperties: !1,
        properties: {}
      },
      contexts: gs,
      enabled: !0
    },
    async () => {
      const s = await n().status();
      return {
        connected: s.ok === !0,
        account: s.account ?? null,
        pending: s.pending,
        users: s.users ?? 0,
        lastError: s.lastError ?? null
      };
    }
  );
}
const Lu = "wechat-bridge-shell-root", Fu = "wechat-bridge-drawer-root";
let qt = null, Is = null, Yt = null, On = null, pn = null;
function Vu() {
  return document.readyState !== "loading" ? Promise.resolve() : new Promise((e) => {
    document.addEventListener("DOMContentLoaded", () => e(), { once: !0 });
  });
}
function co(e, t) {
  document.getElementById(e)?.remove();
  const n = document.createElement("div");
  return n.id = e, t.appendChild(n), n;
}
function Uu() {
  return document.getElementById("extensions_settings2") ?? document.getElementById("extensions_settings");
}
async function Hu() {
  const e = window.__TAURITAVERN__?.ready ?? window.__TAURITAVERN_MAIN_READY__;
  if (e)
    try {
      await e;
    } catch {
    }
}
function ju() {
  qt || !pn || (Is = co(Lu, document.body), qt = io(su), qt.provide(Ks, pn), qt.mount(Is));
}
function uo() {
  if (Yt || !pn) return;
  const e = Uu();
  if (!e) {
    console.warn("[wechat-bridge] Extensions settings container unavailable; retrying."), setTimeout(uo, 1e3);
    return;
  }
  On = co(Fu, e), On.classList.add("extension_container"), Yt = io(cu), Yt.provide(Ks, pn), Yt.mount(On);
}
async function Bu() {
  await Vu(), await Hu(), As() || console.warn("[wechat-bridge] SillyTavern context not ready yet; runtime will retry.");
  const e = Mu(), t = Ou(e.state.value), n = Ru(), s = Pu();
  pn = {
    runtime: t,
    settings: e.state,
    shell: n,
    appearance: s,
    updateSettings(i) {
      e.update(i), t.applySettings(e.state.value);
    }
  }, ju(), uo(), t.start();
  const r = fu();
  if (r)
    try {
      await Du(r, () => e.state.value), console.info("[wechat-bridge] Agent tools registered (wechat.send / wechat.read / wechat.status).");
    } catch (i) {
      console.error("[wechat-bridge] Agent tool registration failed:", i);
    }
  else
    console.warn("[wechat-bridge] api.agent.tools unavailable; WeChat tools not registered.");
  window.addEventListener(
    "pagehide",
    () => {
      t.dispose(), qt?.unmount(), Is?.remove(), Yt?.unmount(), On?.remove();
    },
    { once: !0 }
  );
}
Bu();
//# sourceMappingURL=index.js.map
