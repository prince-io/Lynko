export default function Logo({ w = 145, h = 144, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 144.77118 143.74807"
      className={className}
    >
      <defs>
        <linearGradient
          id="lg1"
          x1="88.038"
          y1="78.274"
          x2="134.117"
          y2="139.925"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ff147a" />
          <stop offset="1" stopColor="#7a00ff" />
        </linearGradient>
        <linearGradient
          id="lg2"
          x1="116.876"
          y1="52.446"
          x2="121.608"
          y2="137.917"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1de9e9" />
          <stop offset="1" stopColor="#005aff" />
        </linearGradient>
      </defs>
      <g transform="translate(-29.408,-41.201)">
        <path
          fill="url(#lg1)"
          d="m 125.38614,123.36508 h 21.20543 C 145.65856,104.79217 135.98292,88.431708 121.62203,78.334236 l -8.57053,20.017382 c 6.97202,6.231242 11.57083,15.051542 12.33464,25.013462 z"
        />
        <path
          fill="url(#lg1)"
          d="m 94.370983,68.036673 c -2.081782,-0.226108 -4.194472,-0.345199 -6.333981,-0.345199 -32.254592,0 -58.628978,26.374383 -58.628978,58.628976 0,32.2546 26.374386,58.62898 58.628978,58.62898 22.872018,0 42.783598,-13.2643 52.434528,-32.4807 h -25.52661 c -6.79062,6.98903 -16.305496,11.31455 -26.907918,11.31455 -20.815296,0 -37.462829,-16.64752 -37.462829,-37.46283 0,-19.93434 15.268793,-36.044296 34.843868,-37.372392 z"
        />
        <path
          fill="none"
          stroke="url(#lg2)"
          strokeWidth="22.49"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M 116.87602,52.446163 80.282163,137.91664 h 82.652267"
        />
      </g>
    </svg>
  );
}
