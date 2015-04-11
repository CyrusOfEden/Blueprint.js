const types = {
  date: (d) => new Date(d),
  array: (a) => Array.isArray(a) ? a.slice() : [a],
  object: (o) => Object(o),
  string: (s) => String(s),
  number: (n) => Number(n)
}

export default function type(t) {
  return types[t.toLowerCase()];
}
