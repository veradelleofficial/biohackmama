/**
 * Proste ilustracje produktów do kart "Wybierz zdrowszą opcję".
 * Dwie wersje dla każdej pary: `bad` (z marketu) i `good` (zamiennik).
 * viewBox 0 0 120 120, kolory dopasowane do jasnej karty.
 */

type V = 'bad' | 'good'

const INK = '#2A2621'

function Paper({ v }: { v: V }) {
  const body = v === 'bad' ? '#FFFFFF' : '#C89B6A'
  const edge = v === 'bad' ? '#D9D4CC' : '#A57849'
  return (
    <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M22 42 h56 v44 h-56 z" fill={body} />
      <ellipse cx="78" cy="64" rx="12" ry="22" fill={body} />
      <ellipse cx="78" cy="64" rx="5" ry="9" fill={edge} />
      <path d="M22 86 q-10 8 -2 18 h58 q-8 -10 2 -18" fill={body} />
      {v === 'good' ? (
        <path d="M40 58 q10 -14 22 -4 q-8 14 -22 4 z M44 60 l14 -4" fill="#9BC53D" strokeWidth="1.8" />
      ) : (
        <g stroke="#B8B0A3" strokeWidth="1.5"><path d="M32 54 h30 M32 62 h24 M32 70 h28" /></g>
      )}
    </g>
  )
}

function Pan({ v }: { v: V }) {
  return (
    <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="62" rx="34" ry="26" fill={v === 'bad' ? '#9AA0A6' : '#2E2B28'} />
      <ellipse cx="50" cy="60" rx="27" ry="19" fill={v === 'bad' ? '#3F4347' : '#1B1917'} />
      <path d="M82 54 l30 -10 l3 8 l-29 12" fill={v === 'bad' ? '#3F4347' : '#2E2B28'} />
      {v === 'bad' ? (
        <g stroke="#C9CDD1" strokeWidth="1.6"><path d="M36 54 l10 8 M52 50 l8 12 M40 68 l14 -4" /></g>
      ) : (
        <g stroke="#F0B35A" strokeWidth="2"><path d="M40 60 q4 -6 8 0 q4 6 8 0" fill="none" /></g>
      )}
    </g>
  )
}

function Box({ v }: { v: V }) {
  if (v === 'bad') {
    return (
      <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
        <rect x="20" y="40" width="80" height="14" rx="5" fill="#5BA8E0" />
        <rect x="24" y="52" width="72" height="44" rx="8" fill="#CFE6F7" fillOpacity="0.9" />
        <g stroke="#5BA8E0" strokeWidth="1.5"><path d="M34 64 h52 M34 76 h40" /></g>
      </g>
    )
  }
  return (
    <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
      <rect x="20" y="40" width="80" height="14" rx="5" fill="#B5C99A" />
      <rect x="14" y="44" width="8" height="10" rx="2" fill="#E9E4DA" />
      <rect x="98" y="44" width="8" height="10" rx="2" fill="#E9E4DA" />
      <rect x="24" y="52" width="72" height="44" rx="8" fill="#EAF4F2" />
      <path d="M32 60 v28" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="60" cy="82" rx="20" ry="7" fill="#F0B35A" strokeWidth="1.8" />
    </g>
  )
}

function Wrap({ v }: { v: V }) {
  if (v === 'bad') {
    return (
      <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
        <rect x="16" y="52" width="70" height="26" rx="13" fill="#E6EEF2" />
        <ellipse cx="86" cy="65" rx="7" ry="13" fill="#F4F8FA" />
        <path d="M30 78 q20 18 64 14 l6 -10" fill="#F4F8FA" fillOpacity="0.7" />
        <path d="M40 60 l26 0" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  }
  return (
    <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M24 44 h72 l-6 52 h-60 z" fill="#F6C84C" />
      <path d="M24 44 l36 22 l36 -22" fill="#F2B632" />
      <g fill="none" stroke="#C98E12" strokeWidth="1.4">
        <path d="M40 76 l6 -4 l6 4 v7 l-6 4 l-6 -4 z" />
        <path d="M58 76 l6 -4 l6 4 v7 l-6 4 l-6 -4 z" />
        <path d="M49 89 l6 -4 l6 4" />
      </g>
    </g>
  )
}

function Board({ v }: { v: V }) {
  return (
    <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
      <rect x="16" y="34" width="80" height="58" rx="10" fill={v === 'bad' ? '#F7F7F5' : '#C88B4E'} />
      <path d="M96 56 h10 a6 6 0 0 1 0 14 h-10" fill={v === 'bad' ? '#F7F7F5' : '#C88B4E'} />
      {v === 'bad' ? (
        <g stroke="#C9C4BB" strokeWidth="1.4"><path d="M28 46 l18 10 M50 44 l14 22 M30 70 l26 -6 M62 74 l20 -14 M70 46 l10 8" /></g>
      ) : (
        <g stroke="#9C6631" strokeWidth="1.5" fill="none"><path d="M24 50 q30 -8 64 2 M24 64 q34 8 64 -2 M24 78 q30 -6 64 2" /></g>
      )}
    </g>
  )
}

function Air({ v }: { v: V }) {
  if (v === 'bad') {
    return (
      <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
        <rect x="44" y="42" width="30" height="58" rx="6" fill="#B79BD9" />
        <rect x="50" y="30" width="18" height="14" rx="3" fill="#E9E4DA" />
        <path d="M68 34 h8" />
        <g fill="#D9CDEA" strokeWidth="1.5">
          <circle cx="88" cy="30" r="4" /><circle cx="98" cy="38" r="5" /><circle cx="92" cy="48" r="3.5" /><circle cx="104" cy="26" r="3" />
        </g>
      </g>
    )
  }
  return (
    <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <rect x="18" y="26" width="52" height="64" rx="4" fill="#DDEFF7" />
      <path d="M44 26 v64 M18 58 h52" />
      <g stroke="#9BC53D" strokeWidth="2" fill="none"><path d="M74 44 q10 -6 20 0 q10 6 18 0 M74 58 q10 -6 20 0 q10 6 18 0" /></g>
      <path d="M86 78 c0 -8 8 -14 8 -14 s8 6 8 14 a8 8 0 0 1 -16 0 z" fill="#8FD3C7" />
    </g>
  )
}

function Water({ v }: { v: V }) {
  if (v === 'bad') {
    return (
      <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
        <rect x="50" y="20" width="20" height="10" rx="2" fill="#5BA8E0" />
        <path d="M48 30 h24 l4 12 v52 a6 6 0 0 1 -6 6 h-20 a6 6 0 0 1 -6 -6 v-52 z" fill="#D7ECF8" />
        <path d="M44 56 h32 M44 74 h32" stroke="#9CC9E6" strokeWidth="1.6" />
        <rect x="44" y="60" width="32" height="12" fill="#5BA8E0" strokeWidth="1.6" />
        <g fill="#9CC9E6" stroke="none"><circle cx="56" cy="86" r="1.6" /><circle cx="63" cy="82" r="1.2" /><circle cx="60" cy="90" r="1" /></g>
      </g>
    )
  }
  return (
    <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
      <rect x="52" y="18" width="16" height="10" rx="3" fill="#C88B4E" />
      <path d="M52 28 h16 v8 q12 6 12 18 v38 a8 8 0 0 1 -8 8 h-24 a8 8 0 0 1 -8 -8 v-38 q0 -12 12 -18 z" fill="#E5F4F1" />
      <path d="M40 66 q20 -6 40 0 v26 a8 8 0 0 1 -8 8 h-24 a8 8 0 0 1 -8 -8 z" fill="#8FD3C7" strokeWidth="1.8" />
      <path d="M48 46 v22" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

function Bulb({ v }: { v: V }) {
  const glass = v === 'bad' ? '#EAF4FF' : '#FFD27A'
  const glow = v === 'bad' ? '#9CC9FF' : '#F0B35A'
  return (
    <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <circle cx="60" cy="52" r="38" fill={glow} opacity="0.22" stroke="none" />
      <path d="M60 18 a26 26 0 0 1 16 46 q-4 4 -4 10 h-24 q0 -6 -4 -10 a26 26 0 0 1 16 -46 z" fill={glass} />
      <rect x="48" y="76" width="24" height="8" rx="2" fill="#B8B0A3" />
      <rect x="50" y="84" width="20" height="8" rx="2" fill="#9A9288" />
      <path d="M56 92 h8 v4 h-8 z" fill="#2A2621" />
      {v === 'bad' ? (
        <g stroke="#5BA8E0" strokeWidth="2"><path d="M18 30 l-8 -6 M102 30 l8 -6 M14 52 h-8 M106 52 h8" /></g>
      ) : (
        <path d="M54 64 v-14 l6 6 l6 -6 v14" fill="none" stroke="#C97A12" strokeWidth="1.8" />
      )}
    </g>
  )
}

function Bedding({ v }: { v: V }) {
  const fill = v === 'bad' ? '#C9C3F2' : '#F1E6D2'
  return (
    <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M20 46 q40 -14 80 0 q6 20 0 40 q-40 14 -80 0 q-6 -20 0 -40 z" fill={fill} />
      <path d="M26 66 q34 6 68 0" fill="none" stroke={v === 'bad' ? '#9F97DE' : '#CDB993'} strokeWidth="1.6" />
      {v === 'bad' ? (
        <g stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round"><path d="M40 54 l6 4 M62 52 l6 4 M80 56 l6 4" /></g>
      ) : (
        <path d="M52 50 q8 -12 18 -4 q-6 12 -18 4 z" fill="#9BC53D" strokeWidth="1.6" />
      )}
    </g>
  )
}

function Mattress({ v }: { v: V }) {
  return (
    <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M14 58 l20 -16 h72 l-20 16 z" fill={v === 'bad' ? '#EEF0F2' : '#F4EADB'} />
      <path d="M14 58 h72 v24 h-72 z" fill={v === 'bad' ? '#D9DEE3' : '#E2CFAF'} />
      <path d="M86 58 l20 -16 v24 l-20 16 z" fill={v === 'bad' ? '#C5CCD3' : '#C9B28C'} />
      {v === 'bad' ? (
        <g stroke="#9AA3AD" strokeWidth="1.6" fill="none" strokeLinecap="round">
          <path d="M40 34 q4 -6 0 -12 M54 32 q4 -6 0 -12 M68 34 q4 -6 0 -12" />
        </g>
      ) : (
        <g stroke="#9C7A45" strokeWidth="1.5"><path d="M24 70 h52 M24 76 h52" strokeDasharray="3 3" /></g>
      )}
    </g>
  )
}

function Phone({ v }: { v: V }) {
  return (
    <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <rect x="40" y="20" width="40" height="76" rx="8" fill="#1A1815" />
      <rect x="44" y="28" width="32" height="58" rx="3" fill={v === 'bad' ? '#7FB8FF' : '#2E2B28'} />
      {v === 'bad' ? (
        <g>
          <rect x="47" y="34" width="26" height="8" rx="2" fill="#FFFFFF" strokeWidth="1.4" />
          <rect x="47" y="46" width="26" height="8" rx="2" fill="#FFFFFF" strokeWidth="1.4" />
          <g stroke="#5BA8E0" strokeWidth="2" fill="none"><path d="M88 34 q8 8 0 16 M94 28 q14 14 0 28" /></g>
        </g>
      ) : (
        <g fill="none" stroke="#F0B35A" strokeWidth="2">
          <path d="M52 62 l16 -4 l-4 -6 l-4 10 l-6 -2 z" fill="#F0B35A" />
          <path d="M66 40 a8 8 0 1 1 -8 -6 a6 6 0 0 0 8 6 z" fill="#F0B35A" stroke="none" />
        </g>
      )}
    </g>
  )
}

const MAP = {
  Cookie: Paper, Flame: Pan, Container: Box, Package: Wrap, Slice: Board, Wind: Air,
  Water, Bulb, Bedding, Mattress, Phone,
}

export default function SwapIllustration({ icon, v }: { icon: keyof typeof MAP; v: V }) {
  const C = MAP[icon]
  return (
    <svg viewBox="0 0 120 120" className="lr-swap__illo" aria-hidden>
      <ellipse cx="60" cy="108" rx="40" ry="5" fill="#000" opacity="0.07" />
      <C v={v} />
    </svg>
  )
}
