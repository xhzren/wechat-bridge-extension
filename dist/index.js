/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Es(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Y = {}, Ct = [], We = () => {
}, Hi = () => !1, Fn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ln = (e) => e.startsWith("onUpdate:"), ce = Object.assign, Cs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, lo = Object.prototype.hasOwnProperty, k = (e, t) => lo.call(e, t), P = Array.isArray, ft = (e) => fn(e) === "[object Map]", tt = (e) => fn(e) === "[object Set]", qs = (e) => fn(e) === "[object Date]", D = (e) => typeof e == "function", ie = (e) => typeof e == "string", Ge = (e) => typeof e == "symbol", K = (e) => e !== null && typeof e == "object", ji = (e) => (K(e) || D(e)) && D(e.then) && D(e.catch), Bi = Object.prototype.toString, fn = (e) => Bi.call(e), co = (e) => fn(e).slice(8, -1), Ui = (e) => fn(e) === "[object Object]", As = (e) => ie(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Gt = /* @__PURE__ */ Es(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Vn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, ao = /-\w/g, Re = Vn(
  (e) => e.replace(ao, (t) => t.slice(1).toUpperCase())
), uo = /\B([A-Z])/g, It = Vn(
  (e) => e.replace(uo, "-$1").toLowerCase()
), ki = Vn((e) => e.charAt(0).toUpperCase() + e.slice(1)), zn = Vn(
  (e) => e ? `on${ki(e)}` : ""
), ke = (e, t) => !Object.is(e, t), xn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ki = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Hn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, fo = (e) => {
  const t = ie(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Js;
const jn = () => Js || (Js = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Os(e) {
  if (P(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = ie(s) ? bo(s) : Os(s);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (ie(e) || K(e))
    return e;
}
const po = /;(?![^(]*\))/g, ho = /:([^]+)/, go = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function bo(e) {
  const t = {};
  return e.replace(go, (n) => n.startsWith("/*") ? "" : n).split(po).forEach((n) => {
    if (n) {
      const s = n.split(ho);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Ne(e) {
  let t = "";
  if (ie(e))
    t = e;
  else if (P(e))
    for (let n = 0; n < e.length; n++) {
      const s = Ne(e[n]);
      s && (t += s + " ");
    }
  else if (K(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const mo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", _o = /* @__PURE__ */ Es(mo);
function Wi(e) {
  return !!e || e === "";
}
function vo(e, t, n) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let i = 0; s && i < e.length; i++)
    s = nt(e[i], t[i], n);
  return s;
}
function Ys(e, t, n) {
  if (e.size !== t.size) return !1;
  const s = Array.from(t), i = new Uint8Array(s.length);
  for (const r of e) {
    let o = -1;
    for (let l = 0; l < s.length; l++)
      if (!i[l] && nt(r, s[l], n)) {
        o = l;
        break;
      }
    if (o < 0) return !1;
    i[o] = 1;
  }
  return !0;
}
function yo(e, t, n) {
  let s = ft(e), i = ft(t);
  if (s || i || (s = tt(e), i = tt(t), s || i))
    return s && i ? Ys(e, t, n) : !1;
  const r = Object.keys(e).length, o = Object.keys(t).length;
  if (r !== o)
    return !1;
  for (const l in e) {
    const c = e.hasOwnProperty(l), d = t.hasOwnProperty(l);
    if (c && !d || !c && d || !nt(e[l], t[l], n))
      return !1;
  }
  return String(e) === String(t);
}
function zs(e, t, n, s) {
  n || (n = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [i, r] = n;
  if (i.has(e) || r.has(t))
    return i.get(e) === t && r.get(t) === e;
  i.set(e, t), r.set(t, e);
  const o = s(e, t, n);
  return i.delete(e), r.delete(t), o;
}
function nt(e, t, n) {
  if (e === t) return !0;
  let s = qs(e), i = qs(t);
  return s || i ? s && i ? e.getTime() === t.getTime() : !1 : (s = Ge(e), i = Ge(t), s || i ? e === t : (s = P(e), i = P(t), s || i ? s && i ? zs(e, t, n, vo) : !1 : (s = K(e), i = K(t), s || i ? !s || !i ? !1 : zs(e, t, n, yo) : String(e) === String(t))));
}
function Is(e, t) {
  return e.findIndex((n) => nt(n, t));
}
const Gi = (e) => !!(e && e.__v_isRef === !0), ye = (e) => ie(e) ? e : e == null ? "" : P(e) || K(e) && (e.toString === Bi || !D(e.toString)) ? Gi(e) ? ye(e.value) : JSON.stringify(e, qi, 2) : String(e), qi = (e, t) => Gi(t) ? qi(e, t.value) : ft(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, i], r) => (n[Xn(s, r) + " =>"] = i, n),
    {}
  )
} : tt(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Xn(n))
} : Ge(t) ? Xn(t) : K(t) && !P(t) && !Ui(t) ? String(t) : t, Xn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ge(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let de;
class wo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && de && (de.active ? (this.parent = de, this.index = (de.scopes || (de.scopes = [])).push(
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
        const i = this.scopes.slice();
        for (t = 0, n = i.length; t < n; t++)
          i[t].resume();
      }
      const s = this.effects.slice();
      for (t = 0, n = s.length; t < n; t++)
        s[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = de;
      try {
        return de = this, t();
      } finally {
        de = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = de, de = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (de === this)
        de = this.prevScope;
      else {
        let t = de;
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
        const i = this.scopes.slice();
        for (n = 0, s = i.length; n < s; n++)
          i[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function xo() {
  return de;
}
let Z;
const Zn = /* @__PURE__ */ new WeakSet();
class Ji {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, de && (de.active ? de.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Zn.has(this) && (Zn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || zi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Xs(this), Xi(this);
    const t = Z, n = De;
    Z = this, De = !0;
    try {
      return this.fn();
    } finally {
      Zi(this), Z = t, De = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        $s(t);
      this.deps = this.depsTail = void 0, Xs(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Zn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ds(this) && this.run();
  }
  get dirty() {
    return ds(this);
  }
}
let Yi = 0, qt, Jt;
function zi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Jt, Jt = e;
    return;
  }
  e.next = qt, qt = e;
}
function Ms() {
  Yi++;
}
function Ps() {
  if (--Yi > 0)
    return;
  if (Jt) {
    let t = Jt;
    for (Jt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; qt; ) {
    let t = qt;
    for (qt = void 0; t; ) {
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
function Xi(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Zi(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), $s(s), So(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  e.deps = t, e.depsTail = n;
}
function ds(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Qi(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Qi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === en) || (e.globalVersion = en, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ds(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = Z, s = De;
  Z = e, De = !0;
  try {
    Xi(e);
    const i = e.fn(e._value);
    (t.version === 0 || ke(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    Z = n, De = s, Zi(e), e.flags &= -3;
  }
}
function $s(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: i } = e;
  if (s && (s.nextSub = i, e.prevSub = void 0), i && (i.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      $s(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function So(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let De = !0;
const er = [];
function st() {
  er.push(De), De = !1;
}
function it() {
  const e = er.pop();
  De = e === void 0 ? !0 : e;
}
function Xs(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = Z;
    Z = void 0;
    try {
      t();
    } finally {
      Z = n;
    }
  }
}
let en = 0;
class To {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Rs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Z || !De || Z === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Z)
      n = this.activeLink = new To(Z, this), Z.deps ? (n.prevDep = Z.depsTail, Z.depsTail.nextDep = n, Z.depsTail = n) : Z.deps = Z.depsTail = n, tr(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = Z.depsTail, n.nextDep = void 0, Z.depsTail.nextDep = n, Z.depsTail = n, Z.deps === n && (Z.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, en++, this.notify(t);
  }
  notify(t) {
    Ms();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ps();
    }
  }
}
function tr(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        tr(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const ps = /* @__PURE__ */ new WeakMap(), At = /* @__PURE__ */ Symbol(
  ""
), hs = /* @__PURE__ */ Symbol(
  ""
), tn = /* @__PURE__ */ Symbol(
  ""
);
function ge(e, t, n) {
  if (De && Z) {
    let s = ps.get(e);
    s || ps.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new Rs()), i.map = s, i.key = n), i.track();
  }
}
function Qe(e, t, n, s, i, r) {
  const o = ps.get(e);
  if (!o) {
    en++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (Ms(), t === "clear")
    o.forEach(l);
  else {
    const c = P(e), d = c && As(n);
    if (c && n === "length") {
      const u = Number(s);
      o.forEach((p, w) => {
        (w === "length" || w === tn || !Ge(w) && w >= u) && l(p);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), d && l(o.get(tn)), t) {
        case "add":
          c ? d && l(o.get("length")) : (l(o.get(At)), ft(e) && l(o.get(hs)));
          break;
        case "delete":
          c || (l(o.get(At)), ft(e) && l(o.get(hs)));
          break;
        case "set":
          ft(e) && l(o.get(At));
          break;
      }
  }
  Ps();
}
function Mt(e) {
  const t = /* @__PURE__ */ U(e);
  return t === e || (ge(t, "iterate", tn), /* @__PURE__ */ Ie(e)) ? t : /* @__PURE__ */ qe(e) ? /* @__PURE__ */ dt(e) ? t.map((n) => pt(Me(n))) : t.map(pt) : t.map(Me);
}
function Bn(e) {
  return ge(e = /* @__PURE__ */ U(e), "iterate", tn), e;
}
function Be(e, t) {
  return /* @__PURE__ */ qe(e) ? pt(/* @__PURE__ */ dt(e) ? Me(t) : t) : Me(t);
}
const Eo = {
  __proto__: null,
  [Symbol.iterator]() {
    return Qn(this, Symbol.iterator, (e) => Be(this, e));
  },
  concat(...e) {
    return Mt(this).concat(
      ...e.map((t) => P(t) ? Mt(t) : t)
    );
  },
  entries() {
    return Qn(this, "entries", (e) => (e[1] = Be(this, e[1]), e));
  },
  every(e, t) {
    return Ye(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ye(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => Be(this, s)),
      arguments
    );
  },
  find(e, t) {
    return Ye(
      this,
      "find",
      e,
      t,
      (n) => Be(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Ye(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ye(
      this,
      "findLast",
      e,
      t,
      (n) => Be(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Ye(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ye(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return es(this, "includes", e);
  },
  indexOf(...e) {
    return es(this, "indexOf", e);
  },
  join(e) {
    return Mt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return es(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ye(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ht(this, "pop");
  },
  push(...e) {
    return Ht(this, "push", e);
  },
  reduce(e, ...t) {
    return Zs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Zs(this, "reduceRight", e, t);
  },
  shift() {
    return Ht(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ye(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ht(this, "splice", e);
  },
  toReversed() {
    return Mt(this).toReversed();
  },
  toSorted(e) {
    return Mt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Mt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ht(this, "unshift", e);
  },
  values() {
    return Qn(this, "values", (e) => Be(this, e));
  }
};
function Qn(e, t, n) {
  const s = Bn(e), i = s[t]();
  return s !== e && !/* @__PURE__ */ Ie(e) && (i._next = i.next, i.next = () => {
    const r = i._next();
    return r.done || (r.value = n(r.value)), r;
  }), i;
}
const Co = Array.prototype;
function Ye(e, t, n, s, i, r) {
  const o = Bn(e), l = o !== e && !/* @__PURE__ */ Ie(e), c = o[t];
  if (c !== Co[t]) {
    const p = c.apply(e, r);
    return l ? Me(p) : p;
  }
  let d = n;
  o !== e && (l ? d = function(p, w) {
    return n.call(this, Be(e, p), w, e);
  } : n.length > 2 && (d = function(p, w) {
    return n.call(this, p, w, e);
  }));
  const u = c.call(o, d, s);
  return l && i ? i(u) : u;
}
function Zs(e, t, n, s) {
  const i = Bn(e), r = i !== e && !/* @__PURE__ */ Ie(e);
  let o = n, l = !1;
  i !== e && (r ? (l = s.length === 0, o = function(d, u, p) {
    return l && (l = !1, d = Be(e, d)), n.call(this, d, Be(e, u), p, e);
  }) : n.length > 3 && (o = function(d, u, p) {
    return n.call(this, d, u, p, e);
  }));
  const c = i[t](o, ...s);
  return l ? Be(e, c) : c;
}
function es(e, t, n) {
  const s = /* @__PURE__ */ U(e);
  ge(s, "iterate", tn);
  const i = s[t](...n);
  return (i === -1 || i === !1) && /* @__PURE__ */ Fs(n[0]) ? (n[0] = /* @__PURE__ */ U(n[0]), s[t](...n)) : i;
}
function Ht(e, t, n = []) {
  st(), Ms();
  const s = (/* @__PURE__ */ U(e))[t].apply(e, n);
  return Ps(), it(), s;
}
const Ao = /* @__PURE__ */ Es("__proto__,__v_isRef,__isVue"), nr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ge)
);
function Oo(e) {
  Ge(e) || (e = String(e));
  const t = /* @__PURE__ */ U(this);
  return ge(t, "has", e), t.hasOwnProperty(e);
}
class sr {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return s === (i ? r ? Vo : lr : r ? or : rr).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = P(t);
    if (!i) {
      let c;
      if (o && (c = Eo[n]))
        return c;
      if (n === "hasOwnProperty")
        return Oo;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ me(t) ? t : s
    );
    if ((Ge(n) ? nr.has(n) : Ao(n)) || (i || ge(t, "get", n), r))
      return l;
    if (/* @__PURE__ */ me(l)) {
      const c = o && As(n) ? l : l.value;
      return i && K(c) ? /* @__PURE__ */ bs(c) : c;
    }
    return K(l) ? i ? /* @__PURE__ */ bs(l) : /* @__PURE__ */ dn(l) : l;
  }
}
class ir extends sr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, i) {
    let r = t[n];
    const o = P(t) && As(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ qe(r);
      if (!/* @__PURE__ */ Ie(s) && !/* @__PURE__ */ qe(s) && (r = /* @__PURE__ */ U(r), s = /* @__PURE__ */ U(s)), !o && /* @__PURE__ */ me(r) && !/* @__PURE__ */ me(s))
        return d || (r.value = s), !0;
    }
    const l = o ? Number(n) < t.length : k(t, n), c = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ me(t) ? t : i
    );
    return t === /* @__PURE__ */ U(i) && c && (l ? ke(s, r) && Qe(t, "set", n, s) : Qe(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = k(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && s && Qe(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Ge(n) || !nr.has(n)) && ge(t, "has", n), s;
  }
  ownKeys(t) {
    return ge(
      t,
      "iterate",
      P(t) ? "length" : At
    ), Reflect.ownKeys(t);
  }
}
class Io extends sr {
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
const Mo = /* @__PURE__ */ new ir(), Po = /* @__PURE__ */ new Io(), $o = /* @__PURE__ */ new ir(!0);
const gs = (e) => e, mn = (e) => Reflect.getPrototypeOf(e);
function Ro(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, r = /* @__PURE__ */ U(i), o = ft(r), l = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, d = i[e](...s), u = n ? gs : t ? pt : Me;
    return !t && ge(
      r,
      "iterate",
      c ? hs : At
    ), ce(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: p, done: w } = d.next();
          return w ? { value: p, done: w } : {
            value: l ? [u(p[0]), u(p[1])] : u(p),
            done: w
          };
        }
      }
    );
  };
}
function _n(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function No(e, t) {
  const n = {
    get(i) {
      const r = this.__v_raw, o = /* @__PURE__ */ U(r), l = /* @__PURE__ */ U(i);
      e || (ke(i, l) && ge(o, "get", i), ge(o, "get", l));
      const { has: c } = mn(o), d = t ? gs : e ? pt : Me;
      if (c.call(o, i))
        return d(r.get(i));
      if (c.call(o, l))
        return d(r.get(l));
      r !== o && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && ge(/* @__PURE__ */ U(i), "iterate", At), i.size;
    },
    has(i) {
      const r = this.__v_raw, o = /* @__PURE__ */ U(r), l = /* @__PURE__ */ U(i);
      return e || (ke(i, l) && ge(o, "has", i), ge(o, "has", l)), i === l ? r.has(i) : r.has(i) || r.has(l);
    },
    forEach(i, r) {
      const o = this, l = o.__v_raw, c = /* @__PURE__ */ U(l), d = t ? gs : e ? pt : Me;
      return !e && ge(c, "iterate", At), l.forEach((u, p) => i.call(r, d(u), d(p), o));
    }
  };
  return ce(
    n,
    e ? {
      add: _n("add"),
      set: _n("set"),
      delete: _n("delete"),
      clear: _n("clear")
    } : {
      add(i) {
        const r = /* @__PURE__ */ U(this), o = mn(r), l = /* @__PURE__ */ U(i), c = !t && !/* @__PURE__ */ Ie(i) && !/* @__PURE__ */ qe(i) ? l : i;
        return o.has.call(r, c) || ke(i, c) && o.has.call(r, i) || ke(l, c) && o.has.call(r, l) || (r.add(c), Qe(r, "add", c, c)), this;
      },
      set(i, r) {
        !t && !/* @__PURE__ */ Ie(r) && !/* @__PURE__ */ qe(r) && (r = /* @__PURE__ */ U(r));
        const o = /* @__PURE__ */ U(this), { has: l, get: c } = mn(o);
        let d = l.call(o, i);
        d || (i = /* @__PURE__ */ U(i), d = l.call(o, i));
        const u = c.call(o, i);
        return o.set(i, r), d ? ke(r, u) && Qe(o, "set", i, r) : Qe(o, "add", i, r), this;
      },
      delete(i) {
        const r = /* @__PURE__ */ U(this), { has: o, get: l } = mn(r);
        let c = o.call(r, i);
        c || (i = /* @__PURE__ */ U(i), c = o.call(r, i)), l && l.call(r, i);
        const d = r.delete(i);
        return c && Qe(r, "delete", i, void 0), d;
      },
      clear() {
        const i = /* @__PURE__ */ U(this), r = i.size !== 0, o = i.clear();
        return r && Qe(
          i,
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
  ].forEach((i) => {
    n[i] = Ro(i, e, t);
  }), n;
}
function Ns(e, t) {
  const n = No(e, t);
  return (s, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? s : Reflect.get(
    k(n, i) && i in s ? n : s,
    i,
    r
  );
}
const Do = {
  get: /* @__PURE__ */ Ns(!1, !1)
}, Fo = {
  get: /* @__PURE__ */ Ns(!1, !0)
}, Lo = {
  get: /* @__PURE__ */ Ns(!0, !1)
};
const rr = /* @__PURE__ */ new WeakMap(), or = /* @__PURE__ */ new WeakMap(), lr = /* @__PURE__ */ new WeakMap(), Vo = /* @__PURE__ */ new WeakMap();
function Ho(e) {
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
function dn(e) {
  return /* @__PURE__ */ qe(e) ? e : Ds(
    e,
    !1,
    Mo,
    Do,
    rr
  );
}
// @__NO_SIDE_EFFECTS__
function jo(e) {
  return Ds(
    e,
    !1,
    $o,
    Fo,
    or
  );
}
// @__NO_SIDE_EFFECTS__
function bs(e) {
  return Ds(
    e,
    !0,
    Po,
    Lo,
    lr
  );
}
function Ds(e, t, n, s, i) {
  if (!K(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const o = Ho(co(e));
  if (o === 0)
    return e;
  const l = new Proxy(
    e,
    o === 2 ? s : n
  );
  return i.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function dt(e) {
  return /* @__PURE__ */ qe(e) ? /* @__PURE__ */ dt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function qe(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ie(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Fs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function U(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ U(t) : e;
}
function Bo(e) {
  return !k(e, "__v_skip") && Object.isExtensible(e) && Ki(e, "__v_skip", !0), e;
}
const Me = (e) => K(e) ? /* @__PURE__ */ dn(e) : e, pt = (e) => K(e) ? /* @__PURE__ */ bs(e) : e;
// @__NO_SIDE_EFFECTS__
function me(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Nt(e) {
  return Uo(e, !1);
}
function Uo(e, t) {
  return /* @__PURE__ */ me(e) ? e : new ko(e, t);
}
class ko {
  constructor(t, n) {
    this.dep = new Rs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ U(t), this._value = n ? t : Me(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Ie(t) || /* @__PURE__ */ qe(t);
    t = s ? t : /* @__PURE__ */ U(t), ke(t, n) && (this._rawValue = t, this._value = s ? t : Me(t), this.dep.trigger());
  }
}
function le(e) {
  return /* @__PURE__ */ me(e) ? e.value : e;
}
const Ko = {
  get: (e, t, n) => t === "__v_raw" ? e : le(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return /* @__PURE__ */ me(i) && !/* @__PURE__ */ me(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function cr(e) {
  return /* @__PURE__ */ dt(e) ? e : new Proxy(e, Ko);
}
class Wo {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Rs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = en - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Z !== this)
      return zi(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Qi(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Go(e, t, n = !1) {
  let s, i;
  return D(e) ? s = e : (s = e.get, i = e.set), new Wo(s, i, n);
}
const vn = {}, Cn = /* @__PURE__ */ new WeakMap();
let Tt;
function qo(e, t = !1, n = Tt) {
  if (n) {
    let s = Cn.get(n);
    s || Cn.set(n, s = []), s.push(e);
  }
}
function Jo(e, t, n = Y) {
  const { immediate: s, deep: i, once: r, scheduler: o, augmentJob: l, call: c } = n, d = (I) => i ? I : /* @__PURE__ */ Ie(I) || i === !1 || i === 0 ? et(I, 1) : et(I);
  let u, p, w, x, v = !1, C = !1;
  if (/* @__PURE__ */ me(e) ? (p = () => e.value, v = /* @__PURE__ */ Ie(e)) : /* @__PURE__ */ dt(e) ? (p = () => d(e), v = !0) : P(e) ? (C = !0, v = e.some((I) => /* @__PURE__ */ dt(I) || /* @__PURE__ */ Ie(I)), p = () => e.map((I) => {
    if (/* @__PURE__ */ me(I))
      return I.value;
    if (/* @__PURE__ */ dt(I))
      return d(I);
    if (D(I))
      return c ? c(I, 2) : I();
  })) : D(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (w) {
      st();
      try {
        w();
      } finally {
        it();
      }
    }
    const I = Tt;
    Tt = u;
    try {
      return c ? c(e, 3, [x]) : e(x);
    } finally {
      Tt = I;
    }
  } : p = We, t && i) {
    const I = p, M = i === !0 ? 1 / 0 : i;
    p = () => et(I(), M);
  }
  const z = xo(), B = () => {
    u.stop(), z && z.active && Cs(z.effects, u);
  };
  if (r && t) {
    const I = t;
    t = (...M) => {
      const L = I(...M);
      return B(), L;
    };
  }
  let F = C ? new Array(e.length).fill(vn) : vn;
  const H = (I) => {
    if (!(!(u.flags & 1) || !u.dirty && !I))
      if (t) {
        const M = u.run();
        if (I || i || v || (C ? M.some((L, ee) => ke(L, F[ee])) : ke(M, F))) {
          w && w();
          const L = Tt;
          Tt = u;
          try {
            const ee = [
              M,
              // pass undefined as the old value when it's changed for the first time
              F === vn ? void 0 : C && F[0] === vn ? [] : F,
              x
            ];
            F = M, c ? c(t, 3, ee) : (
              // @ts-expect-error
              t(...ee)
            );
          } finally {
            Tt = L;
          }
        }
      } else
        u.run();
  };
  return l && l(H), u = new Ji(p), u.scheduler = o ? () => o(H, !1) : H, x = (I) => qo(I, !1, u), w = u.onStop = () => {
    const I = Cn.get(u);
    if (I) {
      if (c)
        c(I, 4);
      else
        for (const M of I) M();
      Cn.delete(u);
    }
  }, t ? s ? H(!0) : F = u.run() : o ? o(H.bind(null, !0), !0) : u.run(), B.pause = u.pause.bind(u), B.resume = u.resume.bind(u), B.stop = B, B;
}
function et(e, t = 1 / 0, n) {
  if (t <= 0 || !K(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ me(e))
    et(e.value, t, n);
  else if (P(e))
    for (let s = 0; s < e.length; s++)
      et(e[s], t, n);
  else if (tt(e) || ft(e))
    e.forEach((s) => {
      et(s, t, n);
    });
  else if (Ui(e)) {
    for (const s in e)
      et(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && et(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function pn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (i) {
    Un(i, t, n);
  }
}
function Pe(e, t, n, s) {
  if (D(e)) {
    const i = pn(e, t, n, s);
    return i && ji(i) && i.catch((r) => {
      Un(r, t, n);
    }), i;
  }
  if (P(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(Pe(e[r], t, n, s));
    return i;
  }
}
function Un(e, t, n, s = !0) {
  const i = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: o } = t && t.appContext.config || Y;
  if (t) {
    let l = t.parent;
    const c = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let p = 0; p < u.length; p++)
          if (u[p](e, c, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      st(), pn(r, null, 10, [
        e,
        c,
        d
      ]), it();
      return;
    }
  }
  Yo(e, n, i, s, o);
}
function Yo(e, t, n, s = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const ve = [];
let je = -1;
const $t = [];
let at = null, Pt = 0;
const ar = /* @__PURE__ */ Promise.resolve();
let An = null;
function ur(e) {
  const t = An || ar;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function zo(e) {
  let t = je + 1, n = ve.length;
  for (; t < n; ) {
    const s = t + n >>> 1, i = ve[s], r = nn(i);
    r < e || r === e && i.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Ls(e) {
  if (!(e.flags & 1)) {
    const t = nn(e), n = ve[ve.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= nn(n) ? ve.push(e) : ve.splice(zo(t), 0, e), e.flags |= 1, fr();
  }
}
function fr() {
  An || (An = ar.then(pr));
}
function Xo(e) {
  if (!P(e))
    at && e.id === -1 ? at.splice(Pt + 1, 0, e) : e.flags & 1 || ($t.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      $t.push(e[t]);
  fr();
}
function Qs(e, t, n = je + 1) {
  for (; n < ve.length; n++) {
    const s = ve[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      ve.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function dr(e) {
  if ($t.length) {
    const t = [...new Set($t)].sort(
      (n, s) => nn(n) - nn(s)
    );
    if ($t.length = 0, at) {
      for (let n = 0; n < t.length; n++)
        at.push(t[n]);
      return;
    }
    for (at = t, Pt = 0; Pt < at.length; Pt++) {
      const n = at[Pt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    at = null, Pt = 0;
  }
}
const nn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function pr(e) {
  try {
    for (je = 0; je < ve.length; je++) {
      const t = ve[je];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), pn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; je < ve.length; je++) {
      const t = ve[je];
      t && (t.flags &= -2);
    }
    je = -1, ve.length = 0, dr(), An = null, (ve.length || $t.length) && pr();
  }
}
let Oe = null, hr = null;
function On(e) {
  const t = Oe;
  return Oe = e, hr = e && e.type.__scopeId || null, t;
}
function gr(e, t = Oe, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && $n(-1);
    const r = On(t), o = Ot.length;
    let l;
    try {
      l = e(...i);
    } finally {
      for (let c = Ot.length; c > o; c--) Wr();
      On(r), s._d && $n(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function ct(e, t) {
  if (Oe === null)
    return e;
  const n = Jn(Oe), s = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, o, l, c = Y] = t[i];
    r && (D(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && et(o), s.push({
      dir: r,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return e;
}
function yt(e, t, n, s) {
  const i = e.dirs, r = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    r && (l.oldValue = r[o].value);
    let c = l.dir[s];
    c && (st(), Pe(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), it());
  }
}
function Zo(e, t) {
  if (xe) {
    let n = xe.provides;
    const s = xe.parent && xe.parent.provides;
    s === n && (n = xe.provides = Object.create(s)), n[e] = t;
  }
}
function Yt(e, t, n = !1) {
  const s = Jr();
  if (s || Rt) {
    let i = Rt ? Rt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && D(t) ? t.call(s && s.proxy) : t;
  }
}
const Qo = /* @__PURE__ */ Symbol.for("v-scx"), el = () => Yt(Qo);
function ts(e, t, n) {
  return br(e, t, n);
}
function br(e, t, n = Y) {
  const { immediate: s, deep: i, flush: r, once: o } = n, l = ce({}, n), c = t && s || !t && r !== "post";
  let d;
  if (ln) {
    if (r === "sync") {
      const x = el();
      d = x.__watcherHandles || (x.__watcherHandles = []);
    } else if (!c) {
      const x = () => {
      };
      return x.stop = We, x.resume = We, x.pause = We, x;
    }
  }
  const u = xe;
  l.call = (x, v, C) => Pe(x, u, v, C);
  let p = !1;
  r === "post" ? l.scheduler = (x) => {
    Se(x, u && u.suspense);
  } : r !== "sync" && (p = !0, l.scheduler = (x, v) => {
    v ? x() : Ls(x);
  }), l.augmentJob = (x) => {
    t && (x.flags |= 4), p && (x.flags |= 2, u && (x.id = u.uid, x.i = u));
  };
  const w = Jo(e, t, l);
  return ln && (d ? d.push(w) : c && w()), w;
}
function tl(e, t, n) {
  const s = this.proxy, i = ie(e) ? e.includes(".") ? mr(s, e) : () => s[e] : e.bind(s, s);
  let r;
  D(t) ? r = t : (r = t.handler, n = t);
  const o = hn(this), l = br(i, r.bind(s), n);
  return o(), l;
}
function mr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
const nl = /* @__PURE__ */ Symbol("_vte"), kn = (e) => e.__isTeleport, Ae = /* @__PURE__ */ Symbol("_leaveCb"), jt = /* @__PURE__ */ Symbol("_enterCb");
function sl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Er(() => {
    e.isMounted = !0;
  }), Cr(() => {
    e.isUnmounting = !0;
  }), e;
}
const Ce = [Function, Array], _r = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Ce,
  onEnter: Ce,
  onAfterEnter: Ce,
  onEnterCancelled: Ce,
  // leave
  onBeforeLeave: Ce,
  onLeave: Ce,
  onAfterLeave: Ce,
  onLeaveCancelled: Ce,
  // appear
  onBeforeAppear: Ce,
  onAppear: Ce,
  onAfterAppear: Ce,
  onAppearCancelled: Ce
}, vr = (e) => {
  const t = e.subTree;
  return t.component ? vr(t.component) : t;
}, il = {
  name: "BaseTransition",
  props: _r,
  setup(e, { slots: t }) {
    const n = Jr(), s = sl();
    return () => {
      const i = t.default && xr(t.default(), !0), r = i && i.length ? yr(i) : (
        // Keep explicit default-slot conditionals on the same transition path
        // as regular v-if branches, which render a comment placeholder.
        n.subTree ? gt() : void 0
      );
      if (!r)
        return;
      const o = /* @__PURE__ */ U(e), { mode: l } = o;
      if (s.isLeaving)
        return ns(r);
      const c = In(r);
      if (!c)
        return ns(r);
      let d = ms(
        c,
        o,
        s,
        n,
        // #11061, ensure enterHooks is fresh after clone
        (p) => d = p
      );
      c.type !== we && sn(c, d);
      let u = n.subTree && In(n.subTree);
      if (u && u.type !== we && !Et(u, c) && vr(n).type !== we) {
        let p = ms(
          u,
          o,
          s,
          n
        );
        if (sn(u, p), l === "out-in" && c.type !== we)
          return s.isLeaving = !0, p.afterLeave = () => {
            s.isLeaving = !1, n.job.flags & 8 || n.update(), delete p.afterLeave, u = void 0;
          }, ns(r);
        l === "in-out" && c.type !== we ? p.delayLeave = (w, x, v) => {
          const C = wr(
            s,
            u
          );
          C[String(u.key)] = u, w[Ae] = () => {
            x(), w[Ae] = void 0, delete d.delayedLeave, u = void 0;
          }, d.delayedLeave = () => {
            v(), delete d.delayedLeave, u = void 0;
          };
        } : u = void 0;
      } else u && (u = void 0);
      return r;
    };
  }
};
function yr(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== we) {
        t = n;
        break;
      }
  }
  return t;
}
const rl = il;
function wr(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function ms(e, t, n, s, i) {
  const {
    appear: r,
    mode: o,
    persisted: l = !1,
    onBeforeEnter: c,
    onEnter: d,
    onAfterEnter: u,
    onEnterCancelled: p,
    onBeforeLeave: w,
    onLeave: x,
    onAfterLeave: v,
    onLeaveCancelled: C,
    onBeforeAppear: z,
    onAppear: B,
    onAfterAppear: F,
    onAppearCancelled: H
  } = t, I = String(e.key), M = wr(n, e), L = (V, W) => {
    V && Pe(
      V,
      s,
      9,
      W
    );
  }, ee = (V, W) => {
    const ne = W[1];
    L(V, W), P(V) ? V.every((O) => O.length <= 1) && ne() : V.length <= 1 && ne();
  }, ue = {
    mode: o,
    persisted: l,
    beforeEnter(V) {
      let W = c;
      if (!n.isMounted)
        if (r)
          W = z || c;
        else
          return;
      V[Ae] && V[Ae](
        !0
        /* cancelled */
      );
      const ne = M[I];
      ne && Et(e, ne) && ne.el[Ae] && ne.el[Ae](), L(W, [V]);
    },
    enter(V) {
      if (M[I] === e) return;
      let W = d, ne = u, O = p;
      if (!n.isMounted)
        if (r)
          W = B || d, ne = F || u, O = H || p;
        else
          return;
      let te = !1;
      V[jt] = (Je) => {
        te || (te = !0, Je ? L(O, [V]) : L(ne, [V]), ue.delayedLeave && ue.delayedLeave(), V[jt] = void 0);
      };
      const he = V[jt].bind(null, !1);
      W ? ee(W, [V, he]) : he();
    },
    leave(V, W) {
      const ne = String(e.key);
      if (V[jt] && V[jt](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return W();
      L(w, [V]);
      let O = !1;
      V[Ae] = (he) => {
        O || (O = !0, W(), he ? L(C, [V]) : L(v, [V]), V[Ae] = void 0, M[ne] === e && delete M[ne]);
      };
      const te = V[Ae].bind(null, !1);
      M[ne] = e, x ? ee(x, [V, te]) : te();
    },
    clone(V) {
      const W = ms(
        V,
        t,
        n,
        s,
        i
      );
      return i && i(W), W;
    }
  };
  return ue;
}
function ns(e) {
  if (Kn(e))
    return e = ht(e), e.children = null, e;
}
function In(e) {
  if (!Kn(e))
    return kn(e.type) && e.children ? yr(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && D(n.default))
      return n.default();
  }
}
function sn(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    sn(
      kn(n.type) && In(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function xr(e, t = !1, n) {
  let s = [], i = 0;
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : r);
    o.type === be ? (o.patchFlag & 128 && i++, s = s.concat(
      xr(o.children, t, l)
    )) : (t || o.type !== we) && s.push(l != null ? ht(o, { key: l }) : o);
  }
  if (i > 1)
    for (let r = 0; r < s.length; r++)
      s[r].patchFlag = -2;
  return s;
}
// @__NO_SIDE_EFFECTS__
function rt(e, t) {
  return D(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ce({ name: e.name }, t, { setup: e })
  ) : e;
}
function Sr(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function ei(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Mn = /* @__PURE__ */ new WeakMap();
function zt(e, t, n, s, i = !1) {
  if (P(e)) {
    e.forEach(
      (C, z) => zt(
        C,
        t && (P(t) ? t[z] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (Xt(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && zt(e, t, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? Jn(s.component) : s.el, o = i ? null : r, { i: l, r: c } = e, d = t && t.r, u = l.refs === Y ? l.refs = {} : l.refs, p = l.setupState, w = /* @__PURE__ */ U(p), x = p === Y ? Hi : (C) => ei(u, C) ? !1 : k(w, C), v = (C, z) => !(z && ei(u, z));
  if (d != null && d !== c) {
    if (ti(t), ie(d))
      u[d] = null, x(d) && (p[d] = null);
    else if (/* @__PURE__ */ me(d)) {
      const C = t;
      v(d, C.k) && (d.value = null), C.k && (u[C.k] = null);
    }
  }
  if (D(c))
    pn(c, l, 12, [o, u]);
  else {
    const C = ie(c), z = /* @__PURE__ */ me(c);
    if (C || z) {
      const B = () => {
        if (e.f) {
          const F = C ? x(c) ? p[c] : u[c] : v() || !e.k ? c.value : u[e.k];
          if (i)
            P(F) && Cs(F, r);
          else if (P(F))
            F.includes(r) || F.push(r);
          else if (C)
            u[c] = [r], x(c) && (p[c] = u[c]);
          else {
            const H = [r];
            v(c, e.k) && (c.value = H), e.k && (u[e.k] = H);
          }
        } else C ? (u[c] = o, x(c) && (p[c] = o)) : z && (v(c, e.k) && (c.value = o), e.k && (u[e.k] = o));
      };
      if (o) {
        const F = () => {
          B(), Mn.delete(e);
        };
        F.id = -1, Mn.set(e, F), Se(F, n);
      } else
        ti(e), B();
    }
  }
}
function ti(e) {
  const t = Mn.get(e);
  t && (t.flags |= 8, Mn.delete(e));
}
jn().requestIdleCallback;
jn().cancelIdleCallback;
const Xt = (e) => !!e.type.__asyncLoader, Kn = (e) => e.type.__isKeepAlive;
function ol(e, t) {
  Tr(e, "a", t);
}
function ll(e, t) {
  Tr(e, "da", t);
}
function Tr(e, t, n = xe) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (Wn(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Kn(i.parent.vnode) && cl(s, t, n, i), i = i.parent;
  }
}
function cl(e, t, n, s) {
  const i = Wn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Ar(() => {
    Cs(s[t], i);
  }, n);
}
function Wn(e, t, n = xe, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...o) => {
      st();
      const l = hn(n), c = Pe(t, n, e, o);
      return l(), it(), c;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const ot = (e) => (t, n = xe) => {
  (!ln || e === "sp") && Wn(e, (...s) => t(...s), n);
}, al = ot("bm"), Er = ot("m"), ul = ot(
  "bu"
), fl = ot("u"), Cr = ot(
  "bum"
), Ar = ot("um"), dl = ot(
  "sp"
), pl = ot("rtg"), hl = ot("rtc");
function gl(e, t = xe) {
  Wn("ec", e, t);
}
const bl = /* @__PURE__ */ Symbol.for("v-ndc");
function Zt(e, t, n, s) {
  let i;
  const r = n, o = P(e);
  if (o || ie(e)) {
    const l = o && /* @__PURE__ */ dt(e);
    let c = !1, d = !1;
    l && (c = !/* @__PURE__ */ Ie(e), d = /* @__PURE__ */ qe(e), e = Bn(e)), i = new Array(e.length);
    for (let u = 0, p = e.length; u < p; u++)
      i[u] = t(
        c ? d ? pt(Me(e[u])) : Me(e[u]) : e[u],
        u,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let l = 0; l < e; l++)
      i[l] = t(l + 1, l, void 0, r);
  } else if (K(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (l, c) => t(l, c, void 0, r)
      );
    else {
      const l = Object.keys(e);
      i = new Array(l.length);
      for (let c = 0, d = l.length; c < d; c++) {
        const u = l[c];
        i[c] = t(e[u], u, c, r);
      }
    }
  else
    i = [];
  return i;
}
const _s = (e) => e ? Yr(e) ? Jn(e) : _s(e.parent) : null, Qt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ce(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => _s(e.parent),
    $root: (e) => _s(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Ir(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Ls(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ur.bind(e.proxy)),
    $watch: (e) => tl.bind(e)
  })
), ss = (e, t) => e !== Y && !e.__isScriptSetup && k(e, t), ml = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: i, props: r, accessCache: o, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const w = o[t];
      if (w !== void 0)
        switch (w) {
          case 1:
            return s[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (ss(s, t))
          return o[t] = 1, s[t];
        if (i !== Y && k(i, t))
          return o[t] = 2, i[t];
        if (k(r, t))
          return o[t] = 3, r[t];
        if (n !== Y && k(n, t))
          return o[t] = 4, n[t];
        vs && (o[t] = 0);
      }
    }
    const d = Qt[t];
    let u, p;
    if (d)
      return t === "$attrs" && ge(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (u = l.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== Y && k(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, k(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: r } = e;
    return ss(i, t) ? (i[t] = n, !0) : s !== Y && k(s, t) ? (s[t] = n, !0) : k(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, props: r, type: o }
  }, l) {
    let c;
    return !!(n[l] || e !== Y && l[0] !== "$" && k(e, l) || ss(t, l) || k(r, l) || k(s, l) || k(Qt, l) || k(i.config.globalProperties, l) || (c = o.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : k(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function ni(e) {
  return P(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let vs = !0;
function _l(e) {
  const t = Ir(e), n = e.proxy, s = e.ctx;
  vs = !1, t.beforeCreate && si(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: o,
    watch: l,
    provide: c,
    inject: d,
    // lifecycle
    created: u,
    beforeMount: p,
    mounted: w,
    beforeUpdate: x,
    updated: v,
    activated: C,
    deactivated: z,
    beforeDestroy: B,
    beforeUnmount: F,
    destroyed: H,
    unmounted: I,
    render: M,
    renderTracked: L,
    renderTriggered: ee,
    errorCaptured: ue,
    serverPrefetch: V,
    // public API
    expose: W,
    inheritAttrs: ne,
    // assets
    components: O,
    directives: te,
    filters: he
  } = t;
  if (d && vl(d, s, null), o)
    for (const se in o) {
      const X = o[se];
      D(X) && (s[se] = X.bind(n));
    }
  if (i) {
    const se = i.call(n, n);
    K(se) && (e.data = /* @__PURE__ */ dn(se));
  }
  if (vs = !0, r)
    for (const se in r) {
      const X = r[se], _t = D(X) ? X.bind(n, n) : D(X.get) ? X.get.bind(n, n) : We, gn = !D(X) && D(X.set) ? X.set.bind(n) : We, vt = pe({
        get: _t,
        set: gn
      });
      Object.defineProperty(s, se, {
        enumerable: !0,
        configurable: !0,
        get: () => vt.value,
        set: ($e) => vt.value = $e
      });
    }
  if (l)
    for (const se in l)
      Or(l[se], s, n, se);
  if (c) {
    const se = D(c) ? c.call(n) : c;
    Reflect.ownKeys(se).forEach((X) => {
      Zo(X, se[X]);
    });
  }
  u && si(u, e, "c");
  function ae(se, X) {
    P(X) ? X.forEach((_t) => se(_t.bind(n))) : X && se(X.bind(n));
  }
  if (ae(al, p), ae(Er, w), ae(ul, x), ae(fl, v), ae(ol, C), ae(ll, z), ae(gl, ue), ae(hl, L), ae(pl, ee), ae(Cr, F), ae(Ar, I), ae(dl, V), P(W))
    if (W.length) {
      const se = e.exposed || (e.exposed = {});
      W.forEach((X) => {
        Object.defineProperty(se, X, {
          get: () => n[X],
          set: (_t) => n[X] = _t,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  M && e.render === We && (e.render = M), ne != null && (e.inheritAttrs = ne), O && (e.components = O), te && (e.directives = te), V && Sr(e);
}
function vl(e, t, n = We) {
  P(e) && (e = ys(e));
  for (const s in e) {
    const i = e[s];
    let r;
    K(i) ? "default" in i ? r = Yt(
      i.from || s,
      i.default,
      !0
    ) : r = Yt(i.from || s) : r = Yt(i), /* @__PURE__ */ me(r) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (o) => r.value = o
    }) : t[s] = r;
  }
}
function si(e, t, n) {
  Pe(
    P(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Or(e, t, n, s) {
  let i = s.includes(".") ? mr(n, s) : () => n[s];
  if (ie(e)) {
    const r = t[e];
    D(r) && ts(i, r);
  } else if (D(e))
    ts(i, e.bind(n));
  else if (K(e))
    if (P(e))
      e.forEach((r) => Or(r, t, n, s));
    else {
      const r = D(e.handler) ? e.handler.bind(n) : t[e.handler];
      D(r) && ts(i, r, e);
    }
}
function Ir(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = r.get(t);
  let c;
  return l ? c = l : !i.length && !n && !s ? c = t : (c = {}, i.length && i.forEach(
    (d) => Pn(c, d, o, !0)
  ), Pn(c, t, o)), K(t) && r.set(t, c), c;
}
function Pn(e, t, n, s = !1) {
  const { mixins: i, extends: r } = t;
  r && Pn(e, r, n, !0), i && i.forEach(
    (o) => Pn(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = yl[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const yl = {
  data: ii,
  props: ri,
  emits: ri,
  // objects
  methods: Ut,
  computed: Ut,
  // lifecycle
  beforeCreate: _e,
  created: _e,
  beforeMount: _e,
  mounted: _e,
  beforeUpdate: _e,
  updated: _e,
  beforeDestroy: _e,
  beforeUnmount: _e,
  destroyed: _e,
  unmounted: _e,
  activated: _e,
  deactivated: _e,
  errorCaptured: _e,
  serverPrefetch: _e,
  // assets
  components: Ut,
  directives: Ut,
  // watch
  watch: xl,
  // provide / inject
  provide: ii,
  inject: wl
};
function ii(e, t) {
  return t ? e ? function() {
    return ce(
      D(e) ? e.call(this, this) : e,
      D(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function wl(e, t) {
  return Ut(ys(e), ys(t));
}
function ys(e) {
  if (P(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function _e(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ut(e, t) {
  return e ? ce(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ri(e, t) {
  return e ? P(e) && P(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ce(
    /* @__PURE__ */ Object.create(null),
    ni(e),
    ni(t ?? {})
  ) : t;
}
function xl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ce(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = _e(e[s], t[s]);
  return n;
}
function Mr() {
  return {
    app: null,
    config: {
      isNativeTag: Hi,
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
let Sl = 0;
function Tl(e, t) {
  return function(s, i = null) {
    D(s) || (s = ce({}, s)), i != null && !K(i) && (i = null);
    const r = Mr(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const d = r.app = {
      _uid: Sl++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: nc,
      get config() {
        return r.config;
      },
      set config(u) {
      },
      use(u, ...p) {
        return o.has(u) || (u && D(u.install) ? (o.add(u), u.install(d, ...p)) : D(u) && (o.add(u), u(d, ...p))), d;
      },
      mixin(u) {
        return r.mixins.includes(u) || r.mixins.push(u), d;
      },
      component(u, p) {
        return p ? (r.components[u] = p, d) : r.components[u];
      },
      directive(u, p) {
        return p ? (r.directives[u] = p, d) : r.directives[u];
      },
      mount(u, p, w) {
        if (!c) {
          const x = d._ceVNode || oe(s, i);
          return x.appContext = r, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(x, u, w), c = !0, d._container = u, u.__vue_app__ = d, Jn(x.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        c && (Pe(
          l,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(u, p) {
        return r.provides[u] = p, d;
      },
      runWithContext(u) {
        const p = Rt;
        Rt = d;
        try {
          return u();
        } finally {
          Rt = p;
        }
      }
    };
    return d;
  };
}
let Rt = null;
const El = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Re(t)}Modifiers`] || e[`${It(t)}Modifiers`];
function Cl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || Y;
  let i = n;
  const r = t.startsWith("update:"), o = r && El(s, t.slice(7));
  o && (o.trim && (i = n.map((u) => ie(u) ? u.trim() : u)), o.number && (i = i.map(Hn)));
  let l, c = s[l = zn(t)] || // also try camelCase event handler (#2249)
  s[l = zn(Re(t))];
  !c && r && (c = s[l = zn(It(t))]), c && Pe(
    c,
    e,
    6,
    i
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
      i
    );
  }
}
const Al = /* @__PURE__ */ new WeakMap();
function Pr(e, t, n = !1) {
  const s = n ? Al : t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let o = {}, l = !1;
  if (!D(e)) {
    const c = (d) => {
      const u = Pr(d, t, !0);
      u && (l = !0, ce(o, u));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !r && !l ? (K(e) && s.set(e, null), null) : (P(r) ? r.forEach((c) => o[c] = null) : ce(o, r), K(e) && s.set(e, o), o);
}
function Gn(e, t) {
  return !e || !Fn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), k(e, t[0].toLowerCase() + t.slice(1)) || k(e, It(t)) || k(e, t));
}
function oi(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: i,
    propsOptions: [r],
    slots: o,
    attrs: l,
    emit: c,
    render: d,
    renderCache: u,
    props: p,
    data: w,
    setupState: x,
    ctx: v,
    inheritAttrs: C
  } = e, z = On(e);
  let B, F;
  try {
    if (n.shapeFlag & 4) {
      const I = i || s, M = I;
      B = Ue(
        d.call(
          M,
          I,
          u,
          p,
          x,
          w,
          v
        )
      ), F = l;
    } else {
      const I = t;
      B = Ue(
        I.length > 1 ? I(
          p,
          { attrs: l, slots: o, emit: c }
        ) : I(
          p,
          null
        )
      ), F = t.props ? l : Ol(l);
    }
  } catch (I) {
    Ot.length = 0, Un(I, e, 1), B = oe(we);
  }
  let H = B;
  if (F && C !== !1) {
    const I = Object.keys(F), { shapeFlag: M } = H;
    I.length && M & 7 && (r && I.some(Ln) && (F = Il(
      F,
      r
    )), H = ht(H, F, !1, !0));
  }
  if (n.dirs && (H = ht(H, null, !1, !0), H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const I = kn(H.type) && In(H) || H;
    sn(I, n.transition);
  }
  return B = H, On(z), B;
}
const Ol = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Fn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Il = (e, t) => {
  const n = {};
  for (const s in e)
    (!Ln(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Ml(e, t, n) {
  const { props: s, children: i, component: r } = e, { props: o, children: l, patchFlag: c } = t, d = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? li(s, o, d) : !!o;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        const w = u[p];
        if ($r(o, s, w) && !Gn(d, w))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? li(s, o, d) : !0 : !!o;
  return !1;
}
function li(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if ($r(t, e, r) && !Gn(n, r))
      return !0;
  }
  return !1;
}
function $r(e, t, n) {
  const s = e[n], i = t[n];
  return n === "style" && K(s) && K(i) ? !nt(s, i) : s !== i;
}
function Pl({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = s, e = i), i === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const Rr = {}, Nr = () => Object.create(Rr), Dr = (e) => Object.getPrototypeOf(e) === Rr;
function $l(e, t, n, s = !1) {
  const i = {}, r = Nr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Fr(e, t, i, r);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? e.props = s ? i : /* @__PURE__ */ jo(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Rl(e, t, n, s) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: o }
  } = e, l = /* @__PURE__ */ U(i), [c] = e.propsOptions;
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
        let w = u[p];
        if (Gn(e.emitsOptions, w))
          continue;
        const x = t[w];
        if (c)
          if (k(r, w))
            x !== r[w] && (r[w] = x, d = !0);
          else {
            const v = Re(w);
            i[v] = ws(
              c,
              l,
              v,
              x,
              e,
              !1
            );
          }
        else
          x !== r[w] && (r[w] = x, d = !0);
      }
    }
  } else {
    Fr(e, t, i, r) && (d = !0);
    let u;
    for (const p in l)
      (!t || // for camelCase
      !k(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = It(p)) === p || !k(t, u))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[u] !== void 0) && (i[p] = ws(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete i[p]);
    if (r !== l)
      for (const p in r)
        (!t || !k(t, p)) && (delete r[p], d = !0);
  }
  d && Qe(e.attrs, "set", "");
}
function Fr(e, t, n, s) {
  const [i, r] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let c in t) {
      if (Gt(c))
        continue;
      const d = t[c];
      let u;
      i && k(i, u = Re(c)) ? !r || !r.includes(u) ? n[u] = d : (l || (l = {}))[u] = d : Gn(e.emitsOptions, c) || (!(c in s) || d !== s[c]) && (s[c] = d, o = !0);
    }
  if (r) {
    const c = /* @__PURE__ */ U(n), d = l || Y;
    for (let u = 0; u < r.length; u++) {
      const p = r[u];
      n[p] = ws(
        i,
        c,
        p,
        d[p],
        e,
        !k(d, p)
      );
    }
  }
  return o;
}
function ws(e, t, n, s, i, r) {
  const o = e[n];
  if (o != null) {
    const l = k(o, "default");
    if (l && s === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && D(c)) {
        const { propsDefaults: d } = i;
        if (n in d)
          s = d[n];
        else {
          const u = hn(i);
          s = d[n] = c.call(
            null,
            t
          ), u();
        }
      } else
        s = c;
      i.ce && i.ce._setProp(n, s);
    }
    o[
      0
      /* shouldCast */
    ] && (r && !l ? s = !1 : o[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === It(n)) && (s = !0));
  }
  return s;
}
const Nl = /* @__PURE__ */ new WeakMap();
function Lr(e, t, n = !1) {
  const s = n ? Nl : t.propsCache, i = s.get(e);
  if (i)
    return i;
  const r = e.props, o = {}, l = [];
  let c = !1;
  if (!D(e)) {
    const u = (p) => {
      c = !0;
      const [w, x] = Lr(p, t, !0);
      ce(o, w), x && l.push(...x);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!r && !c)
    return K(e) && s.set(e, Ct), Ct;
  if (P(r))
    for (let u = 0; u < r.length; u++) {
      const p = Re(r[u]);
      ci(p) && (o[p] = Y);
    }
  else if (r)
    for (const u in r) {
      const p = Re(u);
      if (ci(p)) {
        const w = r[u], x = o[p] = P(w) || D(w) ? { type: w } : ce({}, w), v = x.type;
        let C = !1, z = !0;
        if (P(v))
          for (let B = 0; B < v.length; ++B) {
            const F = v[B], H = D(F) && F.name;
            if (H === "Boolean") {
              C = !0;
              break;
            } else H === "String" && (z = !1);
          }
        else
          C = D(v) && v.name === "Boolean";
        x[
          0
          /* shouldCast */
        ] = C, x[
          1
          /* shouldCastTrue */
        ] = z, (C || k(x, "default")) && l.push(p);
      }
    }
  const d = [o, l];
  return K(e) && s.set(e, d), d;
}
function ci(e) {
  return e[0] !== "$" && !Gt(e);
}
const Vs = (e) => e === "_" || e === "_ctx" || e === "$stable", Hs = (e) => P(e) ? e.map(Ue) : [Ue(e)], Dl = (e, t, n) => {
  if (t._n)
    return t;
  const s = gr((...i) => Hs(t(...i)), n);
  return s._c = !1, s;
}, Vr = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (Vs(i)) continue;
    const r = e[i];
    if (D(r))
      t[i] = Dl(i, r, s);
    else if (r != null) {
      const o = Hs(r);
      t[i] = () => o;
    }
  }
}, Hr = (e, t) => {
  const n = Hs(t);
  e.slots.default = () => n;
}, jr = (e, t, n) => {
  for (const s in t)
    (n || !Vs(s)) && (e[s] = t[s]);
}, Fl = (e, t, n) => {
  const s = e.slots = Nr();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (jr(s, t, n), n && Ki(s, "_", i, !0)) : Vr(t, s);
  } else t && Hr(e, t);
}, Ll = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let r = !0, o = Y;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? r = !1 : jr(i, t, n) : (r = !t.$stable, Vr(t, i)), o = t;
  } else t && (Hr(e, t), o = { default: 1 });
  if (r)
    for (const l in i)
      !Vs(l) && o[l] == null && delete i[l];
}, Se = Ul;
function Vl(e) {
  return Hl(e);
}
function Hl(e, t) {
  const n = jn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: i,
    patchProp: r,
    createElement: o,
    createText: l,
    createComment: c,
    setText: d,
    setElementText: u,
    parentNode: p,
    nextSibling: w,
    setScopeId: x = We,
    insertStaticContent: v
  } = e, C = (a, f, h, y = null, b = null, _ = null, E = void 0, T = null, S = !!f.dynamicChildren) => {
    if (a === f)
      return;
    a && !Et(a, f) && (y = bn(a), $e(a, b, _, !0), a = null), f.patchFlag === -2 && (S = !1, f.dynamicChildren = null), f.dynamicChildren && a && a.dynamicChildren && a.dynamicChildren.hasOnce && (f.dynamicChildren === Ct && (f.dynamicChildren = []), f.dynamicChildren.hasOnce = !0);
    const { type: m, ref: R, shapeFlag: A } = f;
    switch (m) {
      case qn:
        z(a, f, h, y);
        break;
      case we:
        B(a, f, h, y);
        break;
      case rs:
        a == null && F(f, h, y, E);
        break;
      case be:
        O(
          a,
          f,
          h,
          y,
          b,
          _,
          E,
          T,
          S
        );
        break;
      default:
        A & 1 ? M(
          a,
          f,
          h,
          y,
          b,
          _,
          E,
          T,
          S
        ) : A & 6 ? te(
          a,
          f,
          h,
          y,
          b,
          _,
          E,
          T,
          S
        ) : (A & 64 || A & 128) && m.process(
          a,
          f,
          h,
          y,
          b,
          _,
          E,
          T,
          S,
          Lt
        );
    }
    R != null && b ? zt(R, a && a.ref, _, f || a, !f) : R == null && a && a.ref != null && zt(a.ref, null, _, a, !0);
  }, z = (a, f, h, y) => {
    if (a == null)
      s(
        f.el = l(f.children),
        h,
        y
      );
    else {
      const b = f.el = a.el;
      f.children !== a.children && d(b, f.children);
    }
  }, B = (a, f, h, y) => {
    a == null ? s(
      f.el = c(f.children || ""),
      h,
      y
    ) : f.el = a.el;
  }, F = (a, f, h, y) => {
    [a.el, a.anchor] = v(
      a.children,
      f,
      h,
      y,
      a.el,
      a.anchor
    );
  }, H = ({ el: a, anchor: f }, h, y) => {
    let b;
    for (; a && a !== f; )
      b = w(a), s(a, h, y), a = b;
    s(f, h, y);
  }, I = ({ el: a, anchor: f }) => {
    let h;
    for (; a && a !== f; )
      h = w(a), i(a), a = h;
    i(f);
  }, M = (a, f, h, y, b, _, E, T, S) => {
    if (f.type === "svg" ? E = "svg" : f.type === "math" && (E = "mathml"), a == null)
      L(
        f,
        h,
        y,
        b,
        _,
        E,
        T,
        S
      );
    else {
      const m = a.el && a.el._isVueCE ? a.el : null;
      try {
        m && m._beginPatch(), V(
          a,
          f,
          b,
          _,
          E,
          T,
          S
        );
      } finally {
        m && m._endPatch();
      }
    }
  }, L = (a, f, h, y, b, _, E, T) => {
    let S, m;
    const { props: R, shapeFlag: A, transition: $, dirs: N } = a;
    if (S = a.el = o(
      a.type,
      _,
      R && R.is,
      R
    ), A & 8 ? u(S, a.children) : A & 16 && ue(
      a.children,
      S,
      null,
      y,
      b,
      is(a, _),
      E,
      T
    ), N && yt(a, null, y, "created"), ee(S, a, a.scopeId, E, y), R) {
      for (const J in R)
        J !== "value" && !Gt(J) && r(S, J, null, R[J], _, y);
      "value" in R && r(S, "value", null, R.value, _), (m = R.onVnodeBeforeMount) && He(m, y, a);
    }
    N && yt(a, null, y, "beforeMount");
    const j = jl(b, $);
    j && $.beforeEnter(S), s(S, f, h), ((m = R && R.onVnodeMounted) || j || N) && Se(() => {
      try {
        m && He(m, y, a), j && $.enter(S), N && yt(a, null, y, "mounted");
      } finally {
      }
    }, b);
  }, ee = (a, f, h, y, b) => {
    if (h && x(a, h), y)
      for (let _ = 0; _ < y.length; _++)
        x(a, y[_]);
    if (b) {
      let _ = b.subTree;
      if (f === _ || Kr(_.type) && (_.ssContent === f || _.ssFallback === f)) {
        const E = b.vnode;
        ee(
          a,
          E,
          E.scopeId,
          E.slotScopeIds,
          b.parent
        );
      }
    }
  }, ue = (a, f, h, y, b, _, E, T, S = 0) => {
    for (let m = S; m < a.length; m++) {
      const R = a[m] = T ? Ze(a[m]) : Ue(a[m]);
      C(
        null,
        R,
        f,
        h,
        y,
        b,
        _,
        E,
        T
      );
    }
  }, V = (a, f, h, y, b, _, E) => {
    const T = f.el = a.el;
    let { patchFlag: S, dynamicChildren: m, dirs: R } = f;
    S |= a.patchFlag & 16;
    const A = a.props || Y, $ = f.props || Y;
    let N;
    if (h && wt(h, !1), (N = $.onVnodeBeforeUpdate) && He(N, h, f, a), R && yt(f, a, h, "beforeUpdate"), h && wt(h, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    m && (!a.dynamicChildren || a.dynamicChildren.length !== m.length) && (S = 0, E = !1, m = null), (A.innerHTML && $.innerHTML == null || A.textContent && $.textContent == null) && u(T, ""), m ? W(
      a.dynamicChildren,
      m,
      T,
      h,
      y,
      is(f, b),
      _
    ) : E || X(
      a,
      f,
      T,
      null,
      h,
      y,
      is(f, b),
      _,
      !1
    ), S > 0) {
      if (S & 16)
        ne(T, A, $, h, b);
      else if (S & 2 && A.class !== $.class && r(T, "class", null, $.class, b), S & 4 && r(T, "style", A.style, $.style, b), S & 8) {
        const j = f.dynamicProps;
        for (let J = 0; J < j.length; J++) {
          const G = j[J], re = A[G], fe = $[G];
          (fe !== re || G === "value") && r(T, G, re, fe, b, h);
        }
      }
      S & 1 && a.children !== f.children && u(T, f.children);
    } else !E && m == null && ne(T, A, $, h, b);
    ((N = $.onVnodeUpdated) || R) && Se(() => {
      N && He(N, h, f, a), R && yt(f, a, h, "updated");
    }, y);
  }, W = (a, f, h, y, b, _, E) => {
    for (let T = 0; T < f.length; T++) {
      const S = a[T], m = f[T], R = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        S.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (S.type === be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Et(S, m) || // - In the case of a component, it could contain anything.
        S.shapeFlag & 198) ? p(S.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      C(
        S,
        m,
        R,
        null,
        y,
        b,
        _,
        E,
        !0
      );
    }
  }, ne = (a, f, h, y, b) => {
    if (f !== h) {
      if (f !== Y)
        for (const _ in f)
          !Gt(_) && !(_ in h) && r(
            a,
            _,
            f[_],
            null,
            b,
            y
          );
      for (const _ in h) {
        if (Gt(_)) continue;
        const E = h[_], T = f[_];
        E !== T && _ !== "value" && r(a, _, T, E, b, y);
      }
      "value" in h && r(a, "value", f.value, h.value, b);
    }
  }, O = (a, f, h, y, b, _, E, T, S) => {
    const m = f.el = a ? a.el : l(""), R = f.anchor = a ? a.anchor : l("");
    let { patchFlag: A, dynamicChildren: $, slotScopeIds: N } = f;
    N && (T = T ? T.concat(N) : N), a == null ? (s(m, h, y), s(R, h, y), ue(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      h,
      R,
      b,
      _,
      E,
      T,
      S
    )) : A > 0 && A & 64 && $ && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    a.dynamicChildren && a.dynamicChildren.length === $.length ? (W(
      a.dynamicChildren,
      $,
      h,
      b,
      _,
      E,
      T
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || b && f === b.subTree) && Br(
      a,
      f,
      !0
      /* shallow */
    )) : X(
      a,
      f,
      h,
      R,
      b,
      _,
      E,
      T,
      S
    );
  }, te = (a, f, h, y, b, _, E, T, S) => {
    f.slotScopeIds = T, a == null ? f.shapeFlag & 512 ? b.ctx.activate(
      f,
      h,
      y,
      E,
      S
    ) : he(
      f,
      h,
      y,
      b,
      _,
      E,
      S
    ) : Je(a, f, S);
  }, he = (a, f, h, y, b, _, E) => {
    const T = a.component = Yl(
      a,
      y,
      b
    );
    if (Kn(a) && (T.ctx.renderer = Lt), zl(T, !1, E), T.asyncDep) {
      if (b && b.registerDep(T, ae, E), !a.el) {
        const S = T.subTree = oe(we);
        B(null, S, f, h), a.placeholder = S.el;
      }
    } else
      ae(
        T,
        a,
        f,
        h,
        b,
        _,
        E
      );
  }, Je = (a, f, h) => {
    const y = f.component = a.component;
    if (Ml(a, f, h))
      if (y.asyncDep && !y.asyncResolved) {
        f.el = a.el, se(y, f, h);
        return;
      } else
        y.next = f, y.update();
    else
      f.el = a.el, y.vnode = f;
  }, ae = (a, f, h, y, b, _, E) => {
    const T = () => {
      if (a.isMounted) {
        let { next: A, bu: $, u: N, parent: j, vnode: J } = a;
        {
          const Le = Ur(a);
          if (Le) {
            A && (A.el = J.el, se(a, A, E)), Le.asyncDep.then(() => {
              Se(() => {
                a.isUnmounted || m();
              }, b);
            });
            return;
          }
        }
        let G = A, re;
        wt(a, !1), A ? (A.el = J.el, se(a, A, E)) : A = J, $ && xn($), (re = A.props && A.props.onVnodeBeforeUpdate) && He(re, j, A, J), wt(a, !0);
        const fe = oi(a), Fe = a.subTree;
        a.subTree = fe, C(
          Fe,
          fe,
          // parent may have changed if it's in a teleport
          p(Fe.el),
          // anchor may have changed if it's in a fragment
          bn(Fe),
          a,
          b,
          _
        ), A.el = fe.el, G === null && Pl(a, fe.el), N && Se(N, b), (re = A.props && A.props.onVnodeUpdated) && Se(
          () => He(re, j, A, J),
          b
        );
      } else {
        let A;
        const { el: $, props: N } = f, { bm: j, m: J, parent: G, root: re, type: fe } = a, Fe = Xt(f);
        wt(a, !1), j && xn(j), !Fe && (A = N && N.onVnodeBeforeMount) && He(A, G, f), wt(a, !0);
        {
          re.ce && re.ce._hasShadowRoot() && re.ce._injectChildStyle(
            fe,
            a.parent ? a.parent.type : void 0
          );
          const Le = a.subTree = oi(a);
          C(
            null,
            Le,
            h,
            y,
            a,
            b,
            _
          ), f.el = Le.el;
        }
        if (J && Se(J, b), !Fe && (A = N && N.onVnodeMounted)) {
          const Le = f;
          Se(
            () => He(A, G, Le),
            b
          );
        }
        (f.shapeFlag & 256 || G && Xt(G.vnode) && G.vnode.shapeFlag & 256) && a.a && Se(a.a, b), a.isMounted = !0, f = h = y = null;
      }
    };
    a.scope.on();
    const S = a.effect = new Ji(T);
    a.scope.off();
    const m = a.update = S.run.bind(S), R = a.job = S.runIfDirty.bind(S);
    R.i = a, R.id = a.uid, S.scheduler = () => Ls(R), wt(a, !0), m();
  }, se = (a, f, h) => {
    f.component = a;
    const y = a.vnode.props;
    a.vnode = f, a.next = null, Rl(a, f.props, y, h), Ll(a, f.children, h), st(), Qs(a), it();
  }, X = (a, f, h, y, b, _, E, T, S = !1) => {
    const m = a && a.children, R = a ? a.shapeFlag : 0, A = f.children, { patchFlag: $, shapeFlag: N } = f;
    if ($ > 0) {
      if ($ & 128) {
        gn(
          m,
          A,
          h,
          y,
          b,
          _,
          E,
          T,
          S
        );
        return;
      } else if ($ & 256) {
        _t(
          m,
          A,
          h,
          y,
          b,
          _,
          E,
          T,
          S
        );
        return;
      }
    }
    N & 8 ? (R & 16 && Ft(m, b, _), A !== m && u(h, A)) : R & 16 ? N & 16 ? gn(
      m,
      A,
      h,
      y,
      b,
      _,
      E,
      T,
      S
    ) : Ft(m, b, _, !0) : (R & 8 && u(h, ""), N & 16 && ue(
      A,
      h,
      y,
      b,
      _,
      E,
      T,
      S
    ));
  }, _t = (a, f, h, y, b, _, E, T, S) => {
    a = a || Ct, f = f || Ct;
    const m = a.length, R = f.length, A = Math.min(m, R);
    let $;
    for ($ = 0; $ < A; $++) {
      const N = f[$] = S ? Ze(f[$]) : Ue(f[$]);
      C(
        a[$],
        N,
        h,
        null,
        b,
        _,
        E,
        T,
        S
      );
    }
    m > R ? Ft(
      a,
      b,
      _,
      !0,
      !1,
      A
    ) : ue(
      f,
      h,
      y,
      b,
      _,
      E,
      T,
      S,
      A
    );
  }, gn = (a, f, h, y, b, _, E, T, S) => {
    let m = 0;
    const R = f.length;
    let A = a.length - 1, $ = R - 1;
    for (; m <= A && m <= $; ) {
      const N = a[m], j = f[m] = S ? Ze(f[m]) : Ue(f[m]);
      if (Et(N, j))
        C(
          N,
          j,
          h,
          null,
          b,
          _,
          E,
          T,
          S
        );
      else
        break;
      m++;
    }
    for (; m <= A && m <= $; ) {
      const N = a[A], j = f[$] = S ? Ze(f[$]) : Ue(f[$]);
      if (Et(N, j))
        C(
          N,
          j,
          h,
          null,
          b,
          _,
          E,
          T,
          S
        );
      else
        break;
      A--, $--;
    }
    if (m > A) {
      if (m <= $) {
        const N = $ + 1, j = N < R ? f[N].el : y;
        for (; m <= $; )
          C(
            null,
            f[m] = S ? Ze(f[m]) : Ue(f[m]),
            h,
            j,
            b,
            _,
            E,
            T,
            S
          ), m++;
      }
    } else if (m > $)
      for (; m <= A; )
        $e(a[m], b, _, !0), m++;
    else {
      const N = m, j = m, J = /* @__PURE__ */ new Map();
      for (m = j; m <= $; m++) {
        const Te = f[m] = S ? Ze(f[m]) : Ue(f[m]);
        Te.key != null && J.set(Te.key, m);
      }
      let G, re = 0;
      const fe = $ - j + 1;
      let Fe = !1, Le = 0;
      const Vt = new Array(fe);
      for (m = 0; m < fe; m++) Vt[m] = 0;
      for (m = N; m <= A; m++) {
        const Te = a[m];
        if (re >= fe) {
          $e(Te, b, _, !0);
          continue;
        }
        let Ve;
        if (Te.key != null)
          Ve = J.get(Te.key);
        else
          for (G = j; G <= $; G++)
            if (Vt[G - j] === 0 && Et(Te, f[G])) {
              Ve = G;
              break;
            }
        Ve === void 0 ? $e(Te, b, _, !0) : (Vt[Ve - j] = m + 1, Ve >= Le ? Le = Ve : Fe = !0, C(
          Te,
          f[Ve],
          h,
          null,
          b,
          _,
          E,
          T,
          S
        ), re++);
      }
      const Ks = Fe ? Bl(Vt) : Ct;
      for (G = Ks.length - 1, m = fe - 1; m >= 0; m--) {
        const Te = j + m, Ve = f[Te], Ws = f[Te + 1], Gs = Te + 1 < R ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Ws.el || kr(Ws)
        ) : y;
        Vt[m] === 0 ? C(
          null,
          Ve,
          h,
          Gs,
          b,
          _,
          E,
          T,
          S
        ) : Fe && (G < 0 || m !== Ks[G] ? vt(Ve, h, Gs, 2) : G--);
      }
    }
  }, vt = (a, f, h, y, b = null) => {
    const { el: _, type: E, transition: T, children: S, shapeFlag: m } = a;
    if (m & 6) {
      vt(a.component.subTree, f, h, y);
      return;
    }
    if (m & 128) {
      a.suspense.move(f, h, y);
      return;
    }
    if (m & 64) {
      E.move(a, f, h, Lt);
      return;
    }
    if (E === be) {
      s(_, f, h);
      for (let A = 0; A < S.length; A++)
        vt(S[A], f, h, y);
      s(a.anchor, f, h);
      return;
    }
    if (E === rs) {
      H(a, f, h);
      return;
    }
    if (y !== 2 && m & 1 && T)
      if (y === 0)
        T.persisted && !_[Ae] ? s(_, f, h) : (T.beforeEnter(_), s(_, f, h), Se(() => T.enter(_), b));
      else {
        const { leave: A, delayLeave: $, afterLeave: N } = T, j = () => {
          a.ctx.isUnmounted ? i(_) : s(_, f, h);
        }, J = () => {
          const G = _._isLeaving || !!_[Ae];
          _._isLeaving && _[Ae](
            !0
            /* cancelled */
          ), T.persisted && !G ? j() : A(_, () => {
            j(), N && N();
          });
        };
        $ ? $(_, j, J) : J();
      }
    else
      s(_, f, h);
  }, $e = (a, f, h, y = !1, b = !1) => {
    const {
      type: _,
      props: E,
      ref: T,
      children: S,
      dynamicChildren: m,
      shapeFlag: R,
      patchFlag: A,
      dirs: $,
      cacheIndex: N,
      memo: j
    } = a;
    if ((A === -2 || m && m.hasOnce) && (b = !1), T != null && (st(), zt(T, null, h, a, !0), it()), N != null && (!a.ctx || a.ctx === f) && (f.renderCache[N] = void 0), R & 256) {
      f.ctx.deactivate(a);
      return;
    }
    const J = R & 1 && $, G = !Xt(a);
    let re;
    if (G && (re = E && E.onVnodeBeforeUnmount) && He(re, f, a), R & 6)
      oo(a.component, h, y);
    else {
      if (R & 128) {
        a.suspense.unmount(h, y);
        return;
      }
      J && yt(a, null, f, "beforeUnmount"), R & 64 ? a.type.remove(
        a,
        f,
        h,
        Lt,
        y
      ) : m && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !m.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== be || A > 0 && A & 64) ? Ft(
        m,
        f,
        h,
        !1,
        !0
      ) : (_ === be && A & 384 || !b && R & 16) && Ft(S, f, h), y && Us(a);
    }
    const fe = j != null && N == null;
    (G && (re = E && E.onVnodeUnmounted) || J || fe) && Se(() => {
      re && He(re, f, a), J && yt(a, null, f, "unmounted"), fe && (a.el = null);
    }, h);
  }, Us = (a) => {
    const { type: f, el: h, anchor: y, transition: b } = a;
    if (f === be) {
      ro(h, y);
      return;
    }
    if (f === rs) {
      I(a), b && !b.persisted && b.afterLeave && b.afterLeave();
      return;
    }
    const _ = () => {
      i(h), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (a.shapeFlag & 1 && b && !b.persisted) {
      const { leave: E, delayLeave: T } = b, S = () => E(h, _);
      T ? T(a.el, _, S) : S();
    } else
      _();
  }, ro = (a, f) => {
    let h;
    for (; a !== f; )
      h = w(a), i(a), a = h;
    i(f);
  }, oo = (a, f, h) => {
    const { bum: y, scope: b, job: _, subTree: E, um: T, m: S, a: m } = a;
    ai(S), ai(m), y && xn(y), b.stop(), _ ? (_.flags |= 8, $e(E, a, f, h)) : a.vnode.el && E && (E.transition = a.vnode.transition, $e(E, a, f, h)), T && Se(T, f), Se(() => {
      a.isUnmounted = !0;
    }, f);
  }, Ft = (a, f, h, y = !1, b = !1, _ = 0) => {
    for (let E = _; E < a.length; E++)
      $e(a[E], f, h, y, b);
  }, bn = (a) => {
    if (a.shapeFlag & 6)
      return bn(a.component.subTree);
    if (a.shapeFlag & 128)
      return a.suspense.next();
    const f = w(a.anchor || a.el), h = f && f[nl];
    return h ? w(h) : f;
  };
  let Yn = !1;
  const ks = (a, f, h) => {
    let y;
    a == null ? f._vnode && ($e(f._vnode, null, null, !0), y = f._vnode.component) : C(
      f._vnode || null,
      a,
      f,
      null,
      null,
      null,
      h
    ), f._vnode = a, Yn || (Yn = !0, Qs(y), dr(), Yn = !1);
  }, Lt = {
    p: C,
    um: $e,
    m: vt,
    r: Us,
    mt: he,
    mc: ue,
    pc: X,
    pbc: W,
    n: bn,
    o: e
  };
  return {
    render: ks,
    hydrate: void 0,
    createApp: Tl(ks)
  };
}
function is({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function wt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function jl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Br(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (P(s) && P(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      let l = i[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[r] = Ze(i[r]), l.el = o.el), !n && l.patchFlag !== -2 && Br(o, l)), l.type === qn && (l.patchFlag === -1 && (l = i[r] = Ze(l)), l.el = o.el), l.type === we && !l.el && (l.el = o.el);
    }
}
function Bl(e) {
  const t = e.slice(), n = [0];
  let s, i, r, o, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const d = e[s];
    if (d !== 0) {
      if (i = n[n.length - 1], e[i] < d) {
        t[s] = i, n.push(s);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        l = r + o >> 1, e[n[l]] < d ? r = l + 1 : o = l;
      d < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; )
    n[r] = o, o = t[o];
  return n;
}
function Ur(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ur(t);
}
function ai(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function kr(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? kr(t.subTree) : null;
}
const Kr = (e) => e.__isSuspense;
function Ul(e, t) {
  t && t.pendingBranch ? P(e) ? t.effects.push(...e) : t.effects.push(e) : Xo(e);
}
const be = /* @__PURE__ */ Symbol.for("v-fgt"), qn = /* @__PURE__ */ Symbol.for("v-txt"), we = /* @__PURE__ */ Symbol.for("v-cmt"), rs = /* @__PURE__ */ Symbol.for("v-stc"), Ot = [];
let Ee = null;
function q(e = !1) {
  Ot.push(Ee = e ? null : []);
}
function Wr() {
  Ot.pop(), Ee = Ot[Ot.length - 1] || null;
}
let rn = 1;
function $n(e, t = !1) {
  rn += e, e < 0 && Ee && t && (Ee.hasOnce = !0);
}
function Gr(e) {
  return e.dynamicChildren = rn > 0 ? Ee || Ct : null, Wr(), rn > 0 && Ee && Ee.push(e), e;
}
function Q(e, t, n, s, i, r) {
  return Gr(
    g(
      e,
      t,
      n,
      s,
      i,
      r,
      !0
    )
  );
}
function js(e, t, n, s, i) {
  return Gr(
    oe(
      e,
      t,
      n,
      s,
      i,
      !0
    )
  );
}
function Rn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Et(e, t) {
  return e.type === t.type && e.key === t.key;
}
const qr = ({ key: e }) => e ?? null, Sn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ie(e) || /* @__PURE__ */ me(e) || D(e) ? { i: Oe, r: e, k: t, f: !!n } : e : null);
function g(e, t = null, n = null, s = 0, i = null, r = e === be ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && qr(t),
    ref: t && Sn(t),
    scopeId: hr,
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
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Oe
  };
  return l ? (Nn(c, n), r & 128 && e.normalize(c)) : n && (c.shapeFlag |= ie(n) ? 8 : 16), rn > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Ee && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ee.push(c), c;
}
const oe = kl;
function kl(e, t = null, n = null, s = 0, i = null, r = !1) {
  if ((!e || e === bl) && (e = we), Rn(e)) {
    const l = ht(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Nn(l, n), rn > 0 && !r && Ee && (l.shapeFlag & 6 ? Ee[Ee.indexOf(e)] = l : Ee.push(l)), l.patchFlag = -2, l;
  }
  if (ec(e) && (e = e.__vccOpts), t) {
    t = Kl(t);
    let { class: l, style: c } = t;
    l && !ie(l) && (t.class = Ne(l)), K(c) && (/* @__PURE__ */ Fs(c) && !P(c) && (c = ce({}, c)), t.style = Os(c));
  }
  const o = ie(e) ? 1 : Kr(e) ? 128 : kn(e) ? 64 : K(e) ? 4 : D(e) ? 2 : 0;
  return g(
    e,
    t,
    n,
    s,
    i,
    o,
    r,
    !0
  );
}
function Kl(e) {
  return e ? /* @__PURE__ */ Fs(e) || Dr(e) ? ce({}, e) : e : null;
}
function ht(e, t, n = !1, s = !1) {
  const { props: i, ref: r, patchFlag: o, children: l, transition: c } = e, d = t ? Gl(i || {}, t) : i, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && qr(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? P(r) ? r.concat(Sn(t)) : [r, Sn(t)] : Sn(t)
    ) : r,
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
    patchFlag: t && e.type !== be ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ht(e.ssContent),
    ssFallback: e.ssFallback && ht(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return c && s && sn(
    u,
    c.clone(u)
  ), u;
}
function Wl(e = " ", t = 0) {
  return oe(qn, null, e, t);
}
function gt(e = "", t = !1) {
  return t ? (q(), js(we, null, e)) : oe(we, null, e);
}
function Ue(e) {
  return e == null || typeof e == "boolean" ? oe(we) : P(e) ? oe(
    be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Rn(e) ? Ze(e) : oe(qn, null, String(e));
}
function Ze(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ht(e);
}
function Nn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (P(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Nn(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !Dr(t) ? t._ctx = Oe : i === 3 && Oe && (Oe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (D(t)) {
    if (s & 65) {
      Nn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Oe }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [Wl(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Gl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = Ne([t.class, s.class]));
      else if (i === "style")
        t.style = Os([t.style, s.style]);
      else if (Fn(i)) {
        const r = t[i], o = s[i];
        o && r !== o && !(P(r) && r.includes(o)) ? t[i] = r ? [].concat(r, o) : o : o == null && r == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Ln(i) && (t[i] = o);
      } else i !== "" && (t[i] = s[i]);
  }
  return t;
}
function He(e, t, n, s = null) {
  Pe(e, t, 7, [
    n,
    s
  ]);
}
const ql = Mr();
let Jl = 0;
function Yl(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || ql, r = {
    uid: Jl++,
    vnode: e,
    type: s,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new wo(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Lr(s, i),
    emitsOptions: Pr(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Y,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: Y,
    data: Y,
    props: Y,
    attrs: Y,
    slots: Y,
    refs: Y,
    setupState: Y,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Cl.bind(null, r), e.ce && e.ce(r), r;
}
let xe = null;
const Jr = () => xe || Oe;
let Dn, on;
{
  const e = jn(), t = (n, s) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(s), (r) => {
      i.length > 1 ? i.forEach((o) => o(r)) : i[0](r);
    };
  };
  Dn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => xe = n
  ), on = t(
    "__VUE_SSR_SETTERS__",
    (n) => ln = n
  );
}
const hn = (e) => {
  const t = xe;
  return Dn(e), e.scope.on(), () => {
    e.scope.off(), Dn(t);
  };
}, ui = () => {
  xe && xe.scope.off(), Dn(null);
};
function Yr(e) {
  return e.vnode.shapeFlag & 4;
}
let ln = !1;
function zl(e, t = !1, n = !1) {
  t && on(t);
  const { props: s, children: i } = e.vnode, r = Yr(e);
  $l(e, s, r, t), Fl(e, i, n || t);
  const o = r ? Xl(e, t) : void 0;
  return t && on(!1), o;
}
function Xl(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ml);
  const { setup: s } = n;
  if (s) {
    st();
    const i = e.setupContext = s.length > 1 ? Ql(e) : null, r = hn(e), o = pn(
      s,
      e,
      0,
      [
        e.props,
        i
      ]
    ), l = ji(o);
    if (it(), r(), (l || e.sp) && !Xt(e) && Sr(e), l) {
      if (o.then(ui, ui), t)
        return o.then((c) => {
          on(!0);
          try {
            fi(e, c, t);
          } finally {
            on(!1);
          }
        }).catch((c) => {
          Un(c, e, 0);
        });
      e.asyncDep = o;
    } else
      fi(e, o);
  } else
    zr(e);
}
function fi(e, t, n) {
  D(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : K(t) && (e.setupState = cr(t)), zr(e);
}
function zr(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || We);
  {
    const i = hn(e);
    st();
    try {
      _l(e);
    } finally {
      it(), i();
    }
  }
}
const Zl = {
  get(e, t) {
    return ge(e, "get", ""), e[t];
  }
};
function Ql(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Zl),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Jn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(cr(Bo(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Qt)
        return Qt[n](e);
    },
    has(t, n) {
      return n in t || n in Qt;
    }
  })) : e.proxy;
}
function ec(e) {
  return D(e) && "__vccOpts" in e;
}
const pe = (e, t) => /* @__PURE__ */ Go(e, t, ln);
function tc(e, t, n) {
  try {
    $n(-1);
    const s = arguments.length;
    return s === 2 ? K(t) && !P(t) ? Rn(t) ? oe(e, null, [t]) : oe(e, t) : oe(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Rn(n) && (n = [n]), oe(e, t, n));
  } finally {
    $n(1);
  }
}
const nc = "3.5.43";
/**
* @vue/runtime-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let xs;
const di = typeof window < "u" && window.trustedTypes;
if (di)
  try {
    xs = /* @__PURE__ */ di.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Xr = xs ? (e) => xs.createHTML(e) : (e) => e, sc = "http://www.w3.org/2000/svg", ic = "http://www.w3.org/1998/Math/MathML", Xe = typeof document < "u" ? document : null, pi = Xe && /* @__PURE__ */ Xe.createElement("template"), rc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t === "svg" ? Xe.createElementNS(sc, e) : t === "mathml" ? Xe.createElementNS(ic, e) : n ? Xe.createElement(e, { is: n }) : Xe.createElement(e);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => Xe.createTextNode(e),
  createComment: (e) => Xe.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Xe.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, i, r) {
    const o = n ? n.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      pi.innerHTML = Xr(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = pi.content;
      if (s === "svg" || s === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
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
}, lt = "transition", Bt = "animation", cn = /* @__PURE__ */ Symbol("_vtc"), Zr = {
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
}, oc = /* @__PURE__ */ ce(
  {},
  _r,
  Zr
), lc = (e) => (e.displayName = "Transition", e.props = oc, e), cc = /* @__PURE__ */ lc(
  (e, { slots: t }) => tc(rl, ac(e), t)
), xt = (e, t = []) => {
  P(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, hi = (e) => e ? P(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function ac(e) {
  const t = {};
  for (const O in e)
    O in Zr || (t[O] = e[O]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: s,
    duration: i,
    enterFromClass: r = `${n}-enter-from`,
    enterActiveClass: o = `${n}-enter-active`,
    enterToClass: l = `${n}-enter-to`,
    appearFromClass: c = r,
    appearActiveClass: d = o,
    appearToClass: u = l,
    leaveFromClass: p = `${n}-leave-from`,
    leaveActiveClass: w = `${n}-leave-active`,
    leaveToClass: x = `${n}-leave-to`
  } = e, v = uc(i), C = v && v[0], z = v && v[1], {
    onBeforeEnter: B,
    onEnter: F,
    onEnterCancelled: H,
    onLeave: I,
    onLeaveCancelled: M,
    onBeforeAppear: L = B,
    onAppear: ee = F,
    onAppearCancelled: ue = H
  } = t, V = (O, te, he, Je) => {
    O._enterCancelled = Je, St(O, te ? u : l), St(O, te ? d : o), he && he();
  }, W = (O, te) => {
    O._isLeaving = !1, St(O, p), St(O, x), St(O, w), te && te();
  }, ne = (O) => (te, he) => {
    const Je = O ? ee : F, ae = () => V(te, O, he);
    xt(Je, [te, ae]), gi(() => {
      St(te, O ? c : r), ze(te, O ? u : l), hi(Je) || bi(te, s, C, ae);
    });
  };
  return ce(t, {
    onBeforeEnter(O) {
      xt(B, [O]), ze(O, r), ze(O, o);
    },
    onBeforeAppear(O) {
      xt(L, [O]), ze(O, c), ze(O, d);
    },
    onEnter: ne(!1),
    onAppear: ne(!0),
    onLeave(O, te) {
      O._isLeaving = !0;
      const he = () => W(O, te);
      ze(O, p), O._enterCancelled ? (ze(O, w), vi(O)) : (vi(O), ze(O, w)), gi(() => {
        O._isLeaving && (St(O, p), ze(O, x), hi(I) || bi(O, s, z, he));
      }), xt(I, [O, he]);
    },
    onEnterCancelled(O) {
      V(O, !1, void 0, !0), xt(H, [O]);
    },
    onAppearCancelled(O) {
      V(O, !0, void 0, !0), xt(ue, [O]);
    },
    onLeaveCancelled(O) {
      W(O), xt(M, [O]);
    }
  });
}
function uc(e) {
  if (e == null)
    return null;
  if (K(e))
    return [os(e.enter), os(e.leave)];
  {
    const t = os(e);
    return [t, t];
  }
}
function os(e) {
  return fo(e);
}
function ze(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[cn] || (e[cn] = /* @__PURE__ */ new Set())).add(t);
}
function St(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const n = e[cn];
  n && (n.delete(t), n.size || (e[cn] = void 0));
}
function gi(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let fc = 0;
function bi(e, t, n, s) {
  const i = e._endId = ++fc, r = () => {
    i === e._endId && s();
  };
  if (n != null)
    return setTimeout(r, n);
  const { type: o, timeout: l, propCount: c } = dc(e, t);
  if (!o)
    return s();
  const d = o + "end";
  let u = 0;
  const p = () => {
    e.removeEventListener(d, w), r();
  }, w = (x) => {
    x.target === e && ++u >= c && p();
  };
  setTimeout(() => {
    u < c && p();
  }, l + 1), e.addEventListener(d, w);
}
function dc(e, t) {
  const n = window.getComputedStyle(e), s = (v) => (n[v] || "").split(", "), i = s(`${lt}Delay`), r = s(`${lt}Duration`), o = mi(i, r), l = s(`${Bt}Delay`), c = s(`${Bt}Duration`), d = mi(l, c);
  let u = null, p = 0, w = 0;
  t === lt ? o > 0 && (u = lt, p = o, w = r.length) : t === Bt ? d > 0 && (u = Bt, p = d, w = c.length) : (p = Math.max(o, d), u = p > 0 ? o > d ? lt : Bt : null, w = u ? u === lt ? r.length : c.length : 0);
  const x = u === lt && /\b(?:transform|all)(?:,|$)/.test(
    s(`${lt}Property`).toString()
  );
  return {
    type: u,
    timeout: p,
    propCount: w,
    hasTransform: x
  };
}
function mi(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, s) => _i(n) + _i(e[s])));
}
function _i(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function vi(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function pc(e, t, n) {
  const s = e[cn];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const yi = /* @__PURE__ */ Symbol("_vod"), hc = /* @__PURE__ */ Symbol("_vsh"), gc = /* @__PURE__ */ Symbol(""), bc = /(?:^|;)\s*display\s*:/;
function mc(e, t, n) {
  const s = e.style, i = ie(n);
  let r = !1;
  if (n && !i) {
    if (t)
      if (ie(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && kt(s, l, "");
        }
      else
        for (const o in t)
          n[o] == null && kt(s, o, "");
    for (const o in n) {
      o === "display" && (r = !0);
      const l = n[o];
      l != null ? vc(
        e,
        o,
        !ie(t) && t ? t[o] : void 0,
        l
      ) || kt(s, o, l) : kt(s, o, "");
    }
  } else if (i) {
    if (t !== n) {
      const o = s[gc];
      o && (n += ";" + o), s.cssText = n, r = bc.test(n);
    }
  } else t && e.removeAttribute("style");
  yi in e && (e[yi] = r ? s.display : "", e[hc] && (s.display = "none"));
}
const yn = /\s*!important$/;
function kt(e, t, n) {
  if (P(n))
    n.forEach((s) => kt(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    yn.test(n) ? e.setProperty(t, n.replace(yn, ""), "important") : e.setProperty(t, n);
  else {
    const s = _c(e, t);
    yn.test(n) ? e.setProperty(
      It(s),
      n.replace(yn, ""),
      "important"
    ) : e[s] = n;
  }
}
const wi = ["Webkit", "Moz", "ms"], ls = {};
function _c(e, t) {
  const n = ls[t];
  if (n)
    return n;
  let s = Re(t);
  if (s !== "filter" && s in e)
    return ls[t] = s;
  s = ki(s);
  for (let i = 0; i < wi.length; i++) {
    const r = wi[i] + s;
    if (r in e)
      return ls[t] = r;
  }
  return t;
}
function vc(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ie(s) && n === s;
}
const xi = "http://www.w3.org/1999/xlink";
function Si(e, t, n, s, i, r = _o(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(xi, t.slice(6, t.length)) : e.setAttributeNS(xi, t, n) : n == null || r && !Wi(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Ge(n) ? String(n) : n
  );
}
function Ti(e, t, n, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Xr(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Wi(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(i || t);
}
function ut(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function yc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Ei = /* @__PURE__ */ Symbol("_vei");
function wc(e, t, n, s, i = null) {
  const r = e[Ei] || (e[Ei] = {}), o = r[t];
  if (s && o)
    o.value = s;
  else {
    const [l, c] = Tc(t);
    if (s) {
      const d = r[t] = Ac(
        s,
        i
      );
      ut(e, l, d, c);
    } else o && (yc(e, l, o, c), r[t] = void 0);
  }
}
const xc = /(Once|Passive|Capture)$/, Sc = /^on:?(?:Once|Passive|Capture)$/;
function Tc(e) {
  let t, n;
  for (; (n = e.match(xc)) && !Sc.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : It(e.slice(2)), t];
}
let cs = 0;
const Ec = /* @__PURE__ */ Promise.resolve(), Cc = () => cs || (Ec.then(() => cs = 0), cs = Date.now());
function Ac(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    const i = n.value;
    if (P(i)) {
      const r = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        r.call(s), s._stopped = !0;
      };
      const o = i.slice(), l = [s];
      for (let c = 0; c < o.length && !s._stopped; c++) {
        const d = o[c];
        d && Pe(
          d,
          t,
          5,
          l
        );
      }
    } else
      Pe(
        i,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = Cc(), n;
}
const Ci = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Oc = (e, t, n, s, i, r) => {
  const o = i === "svg";
  t === "class" ? pc(e, s, o) : t === "style" ? mc(e, n, s) : Fn(t) ? Ln(t) || wc(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ic(e, t, s, o)) ? (Ti(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Si(e, t, s, o, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Mc(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ie(s))) ? Ti(e, Re(t), s, r, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Si(e, t, s, o));
};
function Ic(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ci(t) && D(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Ci(t) && ie(n) ? !1 : t in e;
}
function Mc(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = Re(t);
  return Array.isArray(n) ? n.some((i) => Re(i) === s) : Object.keys(n).some((i) => Re(i) === s);
}
const Dt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return P(t) ? (n) => xn(t, n) : t;
};
function Pc(e) {
  e.target.composing = !0;
}
function Ai(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Ke = /* @__PURE__ */ Symbol("_assign"), wn = /* @__PURE__ */ Symbol("_initialValue");
function as(e, t, n) {
  return t && (e = e.trim()), n && (e = Hn(e)), e;
}
const Tn = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, i) {
    e.parentNode && (e.type === "text" ? e[wn] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[wn] = e.defaultValue.replace(/\r\n?/g, `
`))), e[Ke] = Dt(i);
    const r = s || i.props && i.props.type === "number";
    ut(e, t ? "change" : "input", (o) => {
      o.target.composing || e[Ke](as(e.value, n, r));
    }), (n || r) && ut(e, "change", () => {
      e.value = as(e.value, n, r);
    }), t || (ut(e, "compositionstart", Pc), ut(e, "compositionend", Ai), ut(e, "change", Ai));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: s } }) {
    const i = t ?? "", r = e[wn];
    delete e[wn], r !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== r ? e[Ke](as(e.value, n, s)) : e.value = i;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: i, number: r } }, o) {
    if (e[Ke] = Dt(o), e.composing) return;
    const l = (r || e.type === "number") && !/^0\d/.test(e.value) ? Hn(e.value) : e.value, c = t ?? "";
    if (l === c)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (s && t === n || i && e.value.trim() === c) || (e.value = c);
  }
}, Oi = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[Ke] = Dt(n), ut(e, "change", () => {
      const s = e._modelValue, i = an(e), r = e.checked, o = e[Ke];
      if (P(s)) {
        const l = Is(s, i), c = l !== -1;
        if (r && !c)
          o(s.concat(i));
        else if (!r && c) {
          const d = [...s];
          d.splice(l, 1), o(d);
        }
      } else if (tt(s)) {
        const l = new Set(s);
        r ? l.add(i) : l.delete(i), o(l);
      } else
        o(Qr(e, r));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Ii,
  beforeUpdate(e, t, n) {
    e[Ke] = Dt(n), Ii(e, t, n);
  }
};
function Ii(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let i;
  if (P(t))
    i = Is(t, s.props.value) > -1;
  else if (tt(t))
    i = t.has(s.props.value);
  else {
    if (t === n) return;
    i = nt(t, Qr(e, !0));
  }
  e.checked !== i && (e.checked = i);
}
const Mi = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    e._modelValue = t, ut(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (c) => c.selected).map(
        (c) => n ? Hn(an(c)) : an(c)
      ), r = e.multiple, o = r ? tt(e._modelValue) ? new Set(i) : i : i[0], l = e._pendingValue = [
        r,
        r ? P(o) ? i.slice() : i : o
      ];
      try {
        e[Ke](o);
      } finally {
        ur(() => {
          e._pendingValue === l && (e._pendingValue = void 0);
        });
      }
    }), e[Ke] = Dt(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Pi(e, t);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[Ke] = Dt(n);
  },
  updated(e, { value: t }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !$c(t, n[1], n[0])) && Pi(e, t);
  }
};
function $c(e, t, n) {
  if (!n || P(e)) return nt(e, t);
  if (tt(e)) {
    if (e.size !== t.length) return !1;
    for (const s of t)
      if (!e.has(s)) return !1;
    return !0;
  }
  return !1;
}
function Pi(e, t) {
  const n = e.multiple, s = P(t);
  if (!(n && !s && !tt(t))) {
    for (let i = 0, r = e.options.length; i < r; i++) {
      const o = e.options[i], l = an(o);
      if (n)
        if (s) {
          const c = typeof l;
          c === "string" || c === "number" ? o.selected = t.some((d) => String(d) === String(l)) : o.selected = Is(t, l) > -1;
        } else
          o.selected = t.has(l);
      else if (nt(an(o), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function an(e) {
  return "_value" in e ? e._value : e.value;
}
function Qr(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Rc = ["ctrl", "shift", "alt", "meta"], Nc = {
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
  exact: (e, t) => Rc.some((n) => e[`${n}Key`] && !t.includes(n))
}, Dc = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((i, ...r) => {
    for (let o = 0; o < t.length; o++) {
      const l = Nc[t[o]];
      if (l && l(i, t)) return;
    }
    return e(i, ...r);
  }));
}, Fc = /* @__PURE__ */ ce({ patchProp: Oc }, rc);
let $i;
function Lc() {
  return $i || ($i = Vl(Fc));
}
const eo = ((...e) => {
  const t = Lc().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const i = Hc(s);
    if (!i) return;
    const r = t._component;
    !D(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = n(i, !1, Vc(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, t;
});
function Vc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Hc(e) {
  return ie(e) ? document.querySelector(e) : e;
}
const Bs = Symbol("wechat-bridge");
function bt() {
  const e = Yt(Bs);
  if (!e) throw new Error("Bridge context missing");
  return e;
}
const jc = ["title"], Bc = {
  key: 0,
  class: "wb-bubble-badge"
}, Uc = /* @__PURE__ */ rt({
  __name: "FloatingBubble",
  setup(e) {
    const { runtime: t, shell: n } = bt(), s = t.state, i = pe(() => s.connected && s.busy ? "…" : ""), r = pe(() => ({
      "is-busy": s.busy,
      "is-offline": !s.connected
    }));
    return (o, l) => (q(), Q("button", {
      class: Ne(["wb-bubble-btn", r.value]),
      type: "button",
      title: le(s).connected ? "WeChat Bridge" : "WeChat Bridge (未连接)",
      onClick: l[0] || (l[0] = (c) => le(n).togglePanel())
    }, [
      l[1] || (l[1] = g("span", { class: "wb-bubble-icon" }, "W", -1)),
      i.value ? (q(), Q("span", Bc, ye(i.value), 1)) : gt("", !0)
    ], 10, jc));
  }
}), mt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
}, kc = /* @__PURE__ */ mt(Uc, [["__scopeId", "data-v-3da4b86c"]]), Kc = { class: "wb-settings-pane" }, Wc = { class: "wb-settings-card wb-card-master" }, Gc = { class: "wb-settings-group" }, qc = { class: "wb-settings-card" }, Jc = { class: "wb-appearance-toggle" }, Yc = { class: "wb-settings-group" }, zc = { class: "wb-settings-card wb-card-col" }, Xc = { class: "wb-settings-card wb-card-col" }, Zc = { class: "wb-settings-group" }, Qc = { class: "wb-settings-card wb-card-col" }, ea = { class: "wb-settings-card wb-card-col" }, ta = { class: "wb-settings-card wb-card-col" }, na = { class: "wb-settings-card" }, sa = { class: "wb-settings-group" }, ia = { class: "wb-settings-card" }, ra = /* @__PURE__ */ rt({
  __name: "SettingsPane",
  setup(e) {
    const { settings: t, updateSettings: n, shell: s, appearance: i } = bt(), r = pe({
      get: () => t.value.enabled,
      set: (x) => n({ enabled: x })
    }), o = pe({
      get: () => t.value.bridgeUrl,
      set: (x) => n({ bridgeUrl: x })
    }), l = pe({
      get: () => t.value.pollIntervalMs,
      set: (x) => n({ pollIntervalMs: Number(x) || 3e3 })
    }), c = pe({
      get: () => t.value.busyPolicy,
      set: (x) => n({ busyPolicy: x })
    }), d = pe({
      get: () => t.value.busyReplyText,
      set: (x) => n({ busyReplyText: x })
    }), u = pe({
      get: () => t.value.sendTiming,
      set: (x) => n({ sendTiming: x })
    }), p = pe({
      get: () => t.value.stripThoughtTags,
      set: (x) => n({ stripThoughtTags: x })
    }), w = pe({
      get: () => i.state.value,
      set: (x) => i.set(x === "day" ? "day" : "night")
    });
    return (x, v) => (q(), Q("div", Kc, [
      v[25] || (v[25] = g("div", { class: "wb-settings-header" }, [
        g("h2", { class: "wb-settings-title" }, "微信桥接"),
        g("p", { class: "wb-settings-description" }, " 把微信消息接入当前角色卡聊天，并在生成完成后把回复发回微信。 ")
      ], -1)),
      g("label", Wc, [
        v[10] || (v[10] = g("div", { class: "wb-card-copy" }, [
          g("strong", null, "启用桥接"),
          g("span", null, "关闭后悬浮球与后台轮询都会停止。")
        ], -1)),
        ct(g("input", {
          "onUpdate:modelValue": v[0] || (v[0] = (C) => r.value = C),
          type: "checkbox"
        }, null, 512), [
          [Oi, r.value]
        ])
      ]),
      g("section", Gc, [
        v[12] || (v[12] = g("header", { class: "wb-group-header" }, [
          g("h3", null, "外观")
        ], -1)),
        g("div", qc, [
          v[11] || (v[11] = g("div", { class: "wb-card-copy" }, [
            g("strong", null, "外观"),
            g("span", null, "切换面板与悬浮球的夜间 / 日间主题。")
          ], -1)),
          g("div", Jc, [
            g("button", {
              type: "button",
              class: Ne(["wb-appearance-option", { active: w.value === "night" }]),
              onClick: v[1] || (v[1] = (C) => w.value = "night")
            }, " 夜间 ", 2),
            g("button", {
              type: "button",
              class: Ne(["wb-appearance-option", { active: w.value === "day" }]),
              onClick: v[2] || (v[2] = (C) => w.value = "day")
            }, " 日间 ", 2)
          ])
        ])
      ]),
      g("section", Yc, [
        v[15] || (v[15] = g("header", { class: "wb-group-header" }, [
          g("h3", null, "连接")
        ], -1)),
        g("div", zc, [
          v[13] || (v[13] = g("div", { class: "wb-card-copy" }, [
            g("strong", null, "桥接服务地址"),
            g("span", null, "本地 bridge 服务，默认 8080。")
          ], -1)),
          ct(g("input", {
            "onUpdate:modelValue": v[3] || (v[3] = (C) => o.value = C),
            class: "wb-control",
            type: "text",
            placeholder: "http://127.0.0.1:8080"
          }, null, 512), [
            [Tn, o.value]
          ])
        ]),
        g("div", Xc, [
          v[14] || (v[14] = g("div", { class: "wb-card-copy" }, [
            g("strong", null, "轮询间隔（毫秒）"),
            g("span", null, "扩展读取桥接队列的频率。")
          ], -1)),
          ct(g("input", {
            "onUpdate:modelValue": v[4] || (v[4] = (C) => l.value = C),
            class: "wb-control",
            type: "number",
            min: "1000",
            step: "500"
          }, null, 512), [
            [Tn, l.value]
          ])
        ])
      ]),
      g("section", Zc, [
        v[22] || (v[22] = g("header", { class: "wb-group-header" }, [
          g("h3", null, "行为")
        ], -1)),
        g("div", Qc, [
          v[17] || (v[17] = g("div", { class: "wb-card-copy" }, [
            g("strong", null, "忙碌时收到新消息"),
            g("span", null, "生成进行中时，对新的微信消息的处理方式。")
          ], -1)),
          ct(g("select", {
            "onUpdate:modelValue": v[5] || (v[5] = (C) => c.value = C),
            class: "wb-control"
          }, [...v[16] || (v[16] = [
            g("option", { value: "discard" }, "丢弃（默认）", -1),
            g("option", { value: "queue" }, "排队，生成结束后处理", -1)
          ])], 512), [
            [Mi, c.value]
          ])
        ]),
        g("div", ea, [
          v[18] || (v[18] = g("div", { class: "wb-card-copy" }, [
            g("strong", null, "忙碌提示文案"),
            g("span", null, "丢弃模式下回给微信的提示。")
          ], -1)),
          ct(g("input", {
            "onUpdate:modelValue": v[6] || (v[6] = (C) => d.value = C),
            class: "wb-control",
            type: "text"
          }, null, 512), [
            [Tn, d.value]
          ])
        ]),
        g("div", ta, [
          v[20] || (v[20] = g("div", { class: "wb-card-copy" }, [
            g("strong", null, "回发时机"),
            g("span", null, "决定在生成流程的哪一步把回复发往微信。")
          ], -1)),
          ct(g("select", {
            "onUpdate:modelValue": v[7] || (v[7] = (C) => u.value = C),
            class: "wb-control"
          }, [...v[19] || (v[19] = [
            g("option", { value: "afterCommands" }, "正则/命令处理后立即发送（默认）", -1),
            g("option", { value: "generationEnded" }, "生成完全结束后发送", -1)
          ])], 512), [
            [Mi, u.value]
          ])
        ]),
        g("label", na, [
          v[21] || (v[21] = g("div", { class: "wb-card-copy" }, [
            g("strong", null, "去除思维链标签"),
            g("span", null, "发送前移除 think / reasoning 等标签内容。")
          ], -1)),
          ct(g("input", {
            "onUpdate:modelValue": v[8] || (v[8] = (C) => p.value = C),
            type: "checkbox"
          }, null, 512), [
            [Oi, p.value]
          ])
        ])
      ]),
      g("section", sa, [
        v[24] || (v[24] = g("header", { class: "wb-group-header" }, [
          g("h3", null, "面板")
        ], -1)),
        g("div", ia, [
          v[23] || (v[23] = g("div", { class: "wb-card-copy" }, [
            g("strong", null, "打开控制面板"),
            g("span", null, "查看运行状态与消息记录。")
          ], -1)),
          g("button", {
            class: "wb-btn",
            type: "button",
            onClick: v[9] || (v[9] = (C) => le(s).openPanel())
          }, "打开")
        ])
      ])
    ]));
  }
}), to = /* @__PURE__ */ mt(ra, [["__scopeId", "data-v-03816d9c"]]), oa = /* @__PURE__ */ rt({
  __name: "ExtensionSettings",
  setup(e) {
    return (t, n) => (q(), js(to));
  }
}), la = { class: "wb-inline" }, ca = ["disabled"], aa = /* @__PURE__ */ rt({
  __name: "TestSendRow",
  setup(e) {
    const { runtime: t } = bt(), n = /* @__PURE__ */ Nt("这是一条测试消息"), s = /* @__PURE__ */ Nt(!1);
    async function i() {
      s.value = !0;
      try {
        await t.testSend(n.value);
      } finally {
        s.value = !1;
      }
    }
    return (r, o) => (q(), Q("div", la, [
      ct(g("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (l) => n.value = l),
        class: "wb-control",
        type: "text"
      }, null, 512), [
        [Tn, n.value]
      ]),
      g("button", {
        class: "wb-btn",
        type: "button",
        disabled: s.value,
        onClick: i
      }, ye(s.value ? "发送中…" : "发送到微信"), 9, ca)
    ]));
  }
}), ua = /* @__PURE__ */ mt(aa, [["__scopeId", "data-v-d944af46"]]), fa = { class: "wb-view" }, da = { class: "wb-fact-strip" }, pa = { class: "wb-fact-label" }, ha = { class: "wb-fact-value" }, ga = { class: "wb-card" }, ba = { class: "wb-card-copy" }, ma = { class: "wb-chip" }, _a = {
  key: 0,
  class: "wb-card is-error"
}, va = { class: "wb-card-copy" }, ya = { class: "wb-card wb-card-col" }, wa = /* @__PURE__ */ rt({
  __name: "BridgeStatusView",
  setup(e) {
    const { runtime: t, settings: n } = bt(), s = t.state, i = pe(() => [
      { label: "桥接服务", value: s.connected ? "已连接" : "未连接", tone: s.connected ? "ok" : "bad" },
      { label: "当前阶段", value: s.busy ? "生成中" : "待机", tone: s.busy ? "warn" : "" },
      { label: "轮询次数", value: String(s.polls), tone: "" },
      { label: "接收消息", value: String(s.received), tone: "" },
      { label: "发送消息", value: String(s.sent), tone: "" }
    ]);
    return (r, o) => (q(), Q("div", fa, [
      o[3] || (o[3] = g("header", { class: "wb-view-header" }, [
        g("h2", null, "运行状态"),
        g("p", null, "微信与 TauriTavern 之间的桥接实时状态。")
      ], -1)),
      g("div", da, [
        (q(!0), Q(be, null, Zt(i.value, (l) => (q(), Q("div", {
          key: l.label,
          class: Ne(["wb-fact", l.tone ? `is-${l.tone}` : ""])
        }, [
          g("span", pa, ye(l.label), 1),
          g("strong", ha, ye(l.value), 1)
        ], 2))), 128))
      ]),
      g("section", ga, [
        g("div", ba, [
          o[0] || (o[0] = g("strong", null, "桥接地址", -1)),
          g("span", null, ye(le(n).bridgeUrl), 1)
        ]),
        g("span", ma, "轮询 " + ye(le(n).pollIntervalMs) + "ms", 1)
      ]),
      le(s).lastError ? (q(), Q("section", _a, [
        g("div", va, [
          o[1] || (o[1] = g("strong", null, "最近错误", -1)),
          g("span", null, ye(le(s).lastError), 1)
        ])
      ])) : gt("", !0),
      g("section", ya, [
        o[2] || (o[2] = g("div", { class: "wb-card-copy" }, [
          g("strong", null, "测试发送"),
          g("span", null, "直接向微信发送一条文本，用于验证链路。")
        ], -1)),
        oe(ua)
      ])
    ]));
  }
}), xa = /* @__PURE__ */ mt(wa, [["__scopeId", "data-v-c2ac445c"]]), Sa = { class: "wb-view" }, Ta = { class: "wb-view-header wb-header-row" }, Ea = { class: "wb-log-list" }, Ca = {
  key: 0,
  class: "wb-empty"
}, Aa = { class: "wb-log-time" }, Oa = { class: "wb-log-level" }, Ia = { class: "wb-log-text" }, Ma = /* @__PURE__ */ rt({
  __name: "MessageLogView",
  setup(e) {
    const { runtime: t } = bt(), n = t.state, s = /* @__PURE__ */ Nt(!1);
    function i(r) {
      return new Date(r).toLocaleTimeString("zh-CN", { hour12: !1 });
    }
    return (r, o) => (q(), Q("div", Sa, [
      g("header", Ta, [
        o[1] || (o[1] = g("div", null, [
          g("h2", null, "消息记录"),
          g("p", null, "桥接运行期间的事件日志。")
        ], -1)),
        g("button", {
          class: "wb-btn",
          type: "button",
          onClick: o[0] || (o[0] = (l) => s.value = !s.value)
        }, ye(s.value ? "简洁视图" : "原始数据"), 1)
      ]),
      g("div", Ea, [
        le(n).logs.length ? gt("", !0) : (q(), Q("div", Ca, "暂无记录")),
        (q(!0), Q(be, null, Zt(le(n).logs, (l) => (q(), Q("div", {
          key: l.id,
          class: Ne(["wb-log-row", `is-${l.level}`])
        }, [
          g("span", Aa, ye(i(l.atMs)), 1),
          g("span", Oa, ye(l.level), 1),
          g("span", Ia, ye(l.text), 1)
        ], 2))), 128))
      ])
    ]));
  }
}), Pa = /* @__PURE__ */ mt(Ma, [["__scopeId", "data-v-363610d3"]]), $a = { class: "wb-panel-sidebar" }, Ra = { class: "wb-sidebar-nav wb-desktop-nav" }, Na = { class: "wb-category-title" }, Da = ["onClick"], Fa = { class: "wb-mobile-nav" }, La = ["onClick"], Va = { class: "wb-panel-content" }, Ha = { class: "wb-content-header" }, ja = { class: "wb-content-body" }, Ba = {
  key: 0,
  class: "wb-feature-host wb-settings-host"
}, Ua = {
  key: 1,
  class: "wb-feature-host"
}, ka = {
  key: 2,
  class: "wb-feature-host"
}, Ka = /* @__PURE__ */ rt({
  __name: "MainPanel",
  setup(e) {
    const { shell: t } = bt(), n = [
      {
        id: "bridge",
        label: "桥接",
        items: [
          { id: "status", label: "运行状态" },
          { id: "messages", label: "消息记录" }
        ]
      }
    ], s = pe(() => [
      { id: "settings", label: "设置" },
      ...n.flatMap((r) => r.items)
    ]);
    function i(r) {
      t.setActiveTab(r);
    }
    return (r, o) => (q(), Q("div", {
      class: "wb-panel-backdrop",
      onClick: o[3] || (o[3] = (l) => le(t).closePanel())
    }, [
      g("div", {
        class: "wb-panel-window",
        onClick: o[2] || (o[2] = Dc(() => {
        }, ["stop"]))
      }, [
        g("div", $a, [
          o[4] || (o[4] = g("div", { class: "wb-sidebar-header" }, [
            g("h3", null, "微信桥接")
          ], -1)),
          g("div", Ra, [
            g("div", {
              class: Ne(["wb-nav-item", { active: le(t).state.activeTab === "settings" }]),
              onClick: o[0] || (o[0] = (l) => i("settings"))
            }, " 设置 ", 2),
            (q(), Q(be, null, Zt(n, (l) => g("div", {
              key: l.id,
              class: "wb-nav-category"
            }, [
              g("div", Na, ye(l.label), 1),
              (q(!0), Q(be, null, Zt(l.items, (c) => (q(), Q("div", {
                key: c.id,
                class: Ne(["wb-nav-item wb-sub-item", { active: le(t).state.activeTab === c.id }]),
                onClick: (d) => i(c.id)
              }, ye(c.label), 11, Da))), 128))
            ])), 64))
          ]),
          g("div", Fa, [
            (q(!0), Q(be, null, Zt(s.value, (l) => (q(), Q("button", {
              key: l.id,
              class: Ne(["wb-mobile-tab", { active: le(t).state.activeTab === l.id }]),
              onClick: (c) => i(l.id)
            }, ye(l.label), 11, La))), 128))
          ])
        ]),
        g("div", Va, [
          g("div", Ha, [
            g("button", {
              class: "wb-close-btn",
              onClick: o[1] || (o[1] = (l) => le(t).closePanel())
            }, "✕")
          ]),
          g("div", ja, [
            le(t).state.activeTab === "settings" ? (q(), Q("div", Ba, [
              oe(oa)
            ])) : le(t).state.activeTab === "status" ? (q(), Q("div", Ua, [
              oe(xa)
            ])) : le(t).state.activeTab === "messages" ? (q(), Q("div", ka, [
              oe(Pa)
            ])) : gt("", !0)
          ])
        ])
      ])
    ]));
  }
}), Wa = /* @__PURE__ */ mt(Ka, [["__scopeId", "data-v-8d5654d3"]]), Ga = ["data-wb-appearance"], qa = /* @__PURE__ */ rt({
  __name: "App",
  setup(e) {
    const { shell: t, appearance: n, settings: s } = bt(), i = pe(() => n.state.value), r = pe(() => s.value.enabled);
    return (o, l) => (q(), Q("div", {
      class: "wb-theme-root wb-shell-root",
      "data-wb-appearance": i.value
    }, [
      r.value ? (q(), Q(be, { key: 0 }, [
        oe(kc),
        oe(cc, { name: "fade" }, {
          default: gr(() => [
            le(t).state.panelOpen ? (q(), js(Wa, { key: 0 })) : gt("", !0)
          ]),
          _: 1
        })
      ], 64)) : gt("", !0)
    ], 8, Ga));
  }
}), Ja = /* @__PURE__ */ mt(qa, [["__scopeId", "data-v-ebd711ef"]]), Ya = { class: "inline-drawer wide100p wb-settings-drawer" }, za = { class: "inline-drawer-content" }, Xa = ["data-wb-appearance"], Za = {
  key: 0,
  class: "wb-disabled-hint"
}, Qa = /* @__PURE__ */ rt({
  __name: "ExtensionsPagePanel",
  setup(e) {
    const { appearance: t, settings: n } = bt(), s = pe(() => t.state.value), i = pe(() => n.value.enabled);
    return (r, o) => (q(), Q("div", Ya, [
      o[0] || (o[0] = g("div", { class: "inline-drawer-toggle inline-drawer-header" }, [
        g("div", { class: "wb-settings-drawer-header" }, [
          g("i", { class: "fa-solid fa-comment-dots" }),
          g("b", null, "WeChat Bridge")
        ]),
        g("div", { class: "inline-drawer-icon fa-solid fa-circle-chevron-down down" })
      ], -1)),
      g("div", za, [
        g("div", {
          class: "wb-theme-root wb-settings-surface",
          "data-wb-appearance": s.value
        }, [
          i.value ? gt("", !0) : (q(), Q("p", Za, "桥接当前已关闭。")),
          oe(to)
        ], 8, Xa)
      ])
    ]));
  }
}), eu = /* @__PURE__ */ mt(Qa, [["__scopeId", "data-v-2f38dd28"]]), tu = {
  GENERATION_STARTED: "generation_started",
  GENERATION_STOPPED: "generation_stopped",
  GENERATION_ENDED: "generation_ended",
  GENERATION_AFTER_COMMANDS: "GENERATION_AFTER_COMMANDS",
  MESSAGE_RECEIVED: "message_received",
  CHAT_CHANGED: "chat_id_changed"
};
function Ss() {
  return window.SillyTavern?.getContext?.() ?? null;
}
function nu(e, t) {
  return e.eventTypes?.[t] ?? tu[t];
}
function us(e, t, n) {
  const s = e.eventSource;
  return s?.on ? (s.on(nu(e, t), n), !0) : !1;
}
function su(e) {
  for (let t = e.chat.length - 1; t >= 0; t -= 1) {
    const n = e.chat[t];
    if (n && !n.is_user && !n.is_system)
      return String(n.mes ?? "");
  }
  return "";
}
async function Ri(e, t) {
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
function iu(e) {
  return `"${e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r?\n/g, "\\n")}"`;
}
const ru = "http://127.0.0.1:8080";
function fs(e = {}) {
  const t = (e.baseUrl ?? ru).replace(/\/+$/, ""), n = e.fetchImpl ?? fetch.bind(globalThis);
  async function s() {
    const r = await n(`${t}/inbound`, { method: "GET" });
    if (!r.ok)
      throw new Error(`bridge poll failed: HTTP ${r.status}`);
    const o = await r.json();
    return Array.isArray(o.messages) ? o.messages : [];
  }
  async function i(r) {
    const o = await n(`${t}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(r)
    });
    if (!o.ok)
      throw new Error(`bridge send failed: HTTP ${o.status}`);
  }
  return {
    poll: s,
    send: i,
    dispose() {
    }
  };
}
const Ni = {
  enabled: !0,
  bridgeUrl: "http://127.0.0.1:8080",
  pollIntervalMs: 3e3,
  busyPolicy: "discard",
  sendTiming: "afterCommands",
  busyReplyText: "剧情正在生成，请稍候～",
  stripThoughtTags: !0
}, no = "wechat-bridge";
function Di() {
  const e = window.extension_settings?.[no];
  return !e || typeof e != "object" ? { ...Ni } : { ...Ni, ...e };
}
function Fi(e) {
  window.extension_settings || (window.extension_settings = {}), window.extension_settings[no] = { ...e }, window.saveSettingsDebounced?.();
}
function ou(e) {
  return e.replace(/<think>[\s\S]*?<\>/gi, "").replace(/<thinking>[\s\S]*?<\/thinking>/gi, "").replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, "").trim();
}
const Li = 200;
function lu(e) {
  const t = /* @__PURE__ */ Nt({ ...e }), n = /* @__PURE__ */ dn({
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
  function i(M, L) {
    n.logs.unshift({ id: ++s, atMs: Date.now(), level: M, text: L }), n.logs.length > Li && (n.logs.length = Li);
  }
  let r = null, o = null, l = null, c = Promise.resolve(), d = !1, u = !1;
  const p = [];
  let w = null;
  function x(M) {
    return c = c.catch(() => {
    }).then(M), c;
  }
  async function v(M, L) {
    if (!o) return;
    const ee = t.value.stripThoughtTags ? ou(M) : M;
    if (!ee) {
      i("warn", "Refusing to send empty reply.");
      return;
    }
    n.phase = "sending";
    try {
      await o.send({ text: ee, userId: L }), n.sent += 1, i("info", `Sent to WeChat (${ee.length} chars).`);
    } catch (ue) {
      n.phase = "error", n.lastError = String(ue), i("error", `Send failed: ${String(ue)}`);
    } finally {
      n.phase === "sending" && (n.phase = "idle");
    }
  }
  async function C(M) {
    if (!r) throw new Error("SillyTavern context unavailable");
    w = M.from, n.busy = !0, n.phase = "generating";
    try {
      await Ri(r, `/send ${iu(M.text)}`), await Ri(r, "/trigger"), i("info", `Injected message from ${M.from} and triggered generation.`);
    } catch (L) {
      n.busy = !1, n.phase = "error", n.lastError = String(L), i("error", `Injection failed: ${String(L)}`);
      const ee = w ?? void 0;
      w = null, v(`[桥接错误] 注入聊天失败：${String(L)}`, ee);
    }
  }
  async function z() {
    if (!(d || !o)) {
      d = !0;
      try {
        const M = await o.poll();
        n.polls += 1, n.connected = !0;
        for (const L of M) {
          if (n.received += 1, n.busy) {
            t.value.busyPolicy === "queue" ? (p.push(L), i("info", "Busy: queued message.")) : i("info", "Busy: discarded message."), await v(t.value.busyReplyText, L.from);
            continue;
          }
          await C(L);
        }
      } catch (M) {
        n.connected = !1, n.lastError = String(M), i("warn", `Poll failed: ${String(M)}`);
      } finally {
        d = !1;
      }
    }
  }
  function B() {
    if (!r) return;
    const M = su(r), L = w ?? void 0;
    w = null, x(async () => {
      if (await v(M, L), n.busy = !1, p.length > 0 && !n.busy) {
        const ee = p.shift();
        ee && await C(ee);
      }
    });
  }
  function F() {
    if (!r || u) return;
    u = !0, us(r, "GENERATION_STARTED", () => {
      n.busy = !0, n.phase = "generating";
    });
    const L = t.value.sendTiming === "afterCommands" ? "GENERATION_AFTER_COMMANDS" : "GENERATION_ENDED";
    us(r, L, () => B()), us(r, "GENERATION_STOPPED", () => {
      n.busy && B();
    });
  }
  function H() {
    I();
    const M = Math.max(1e3, t.value.pollIntervalMs);
    l = setInterval(() => {
      t.value.enabled && x(z);
    }, M);
  }
  function I() {
    l && (clearInterval(l), l = null);
  }
  return {
    state: n,
    settings: t,
    start() {
      if (r = Ss(), !r) {
        i("warn", "SillyTavern context not ready; retrying in 3s."), setTimeout(() => {
          r = Ss(), r ? (F(), i("info", "SillyTavern context acquired.")) : i("error", "SillyTavern context unavailable; bridge inactive.");
        }, 3e3), o = fs({ baseUrl: t.value.bridgeUrl }), H();
        return;
      }
      o = fs({ baseUrl: t.value.bridgeUrl }), F(), H(), i("info", `Bridge started (${t.value.bridgeUrl}).`);
    },
    stop() {
      I(), i("info", "Bridge stopped.");
    },
    applySettings(M) {
      const L = t.value.enabled;
      t.value = { ...M }, !L && M.enabled ? this.start() : L && !M.enabled ? this.stop() : M.enabled && (o = fs({ baseUrl: M.bridgeUrl }), H(), F());
    },
    async testSend(M) {
      await v(M);
    },
    dispose() {
      I(), o?.dispose(), o = null;
    }
  };
}
function cu() {
  const e = /* @__PURE__ */ Nt(Di());
  function t(n) {
    const s = { ...e.value, ...n };
    e.value = s, Fi(s);
  }
  return {
    state: e,
    update: t,
    reset() {
      const n = Di();
      e.value = n, Fi(n);
    }
  };
}
function au() {
  const e = /* @__PURE__ */ dn({
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
const Vi = "wechat-bridge-appearance";
function uu() {
  let e = "night";
  try {
    const n = window.localStorage?.getItem(Vi);
    (n === "day" || n === "night") && (e = n);
  } catch {
  }
  const t = /* @__PURE__ */ Nt(e);
  return {
    state: t,
    set(n) {
      t.value = n;
      try {
        window.localStorage?.setItem(Vi, n);
      } catch {
      }
    }
  };
}
const fu = "wechat-bridge-shell-root", du = "wechat-bridge-drawer-root";
let Kt = null, Ts = null, Wt = null, En = null, un = null;
function pu() {
  return document.readyState !== "loading" ? Promise.resolve() : new Promise((e) => {
    document.addEventListener("DOMContentLoaded", () => e(), { once: !0 });
  });
}
function so(e, t) {
  document.getElementById(e)?.remove();
  const n = document.createElement("div");
  return n.id = e, t.appendChild(n), n;
}
function hu() {
  return document.getElementById("extensions_settings2") ?? document.getElementById("extensions_settings");
}
async function gu() {
  const e = window.__TAURITAVERN__?.ready ?? window.__TAURITAVERN_MAIN_READY__;
  if (e)
    try {
      await e;
    } catch {
    }
}
function bu() {
  Kt || !un || (Ts = so(fu, document.body), Kt = eo(Ja), Kt.provide(Bs, un), Kt.mount(Ts));
}
function io() {
  if (Wt || !un) return;
  const e = hu();
  if (!e) {
    console.warn("[wechat-bridge] Extensions settings container unavailable; retrying."), setTimeout(io, 1e3);
    return;
  }
  En = so(du, e), En.classList.add("extension_container"), Wt = eo(eu), Wt.provide(Bs, un), Wt.mount(En);
}
async function mu() {
  await pu(), await gu(), Ss() || console.warn("[wechat-bridge] SillyTavern context not ready yet; runtime will retry.");
  const e = cu(), t = lu(e.state.value), n = au(), s = uu();
  un = {
    runtime: t,
    settings: e.state,
    shell: n,
    appearance: s,
    updateSettings(i) {
      e.update(i), t.applySettings(e.state.value);
    }
  }, bu(), io(), t.start(), window.addEventListener(
    "pagehide",
    () => {
      t.dispose(), Kt?.unmount(), Ts?.remove(), Wt?.unmount(), En?.remove();
    },
    { once: !0 }
  );
}
mu();
//# sourceMappingURL=index.js.map
