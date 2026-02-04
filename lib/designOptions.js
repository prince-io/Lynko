export const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
  "caramellatte",
  "abyss",
  "silk",
];

export const FONT = [
  { name: "Inter", value: "inter" },
  { name: "Poppins", value: "poppins" },
  { name: "Pixelify", value: "pixelify" },
  { name: "Doto", value: "doto" },
  { name: "Molle", value: "molle" },
  { name: "Macondo", value: "macondo" },
  { name: "Pacifico", value: "pacifico" },
  { name: "Monofett", value: "monofett" },
  { name: "Monoton", value: "monoton" },
  { name: "Oswald", value: "oswald" },
];

export const SIZE = [
  {
    label: "1",
    text: ["text-lg", "text-base", "text-sm", "text-xs"],
  },
  {
    label: "2",
    text: ["text-xl", "text-lg", "text-base", "text-sm"],
  },
  {
    label: "3",
    text: ["text-2xl", "text-xl", "text-lg", "text-base"],
  },
  {
    label: "4",
    text: ["text-3xl", "text-2xl", "text-xl", "text-lg"],
  },
  {
    label: "5",
    text: ["text-4xl", "text-3xl", "text-2xl", "text-xl"],
  },
  {
    label: "6",
    text: ["text-5xl", "text-4xl", "text-3xl", "text-2xl"],
  },
];

export const RADIUS = [
  { label: "0", className: "rounded-none" },
  { label: "20", className: "rounded-[20px]" },
  { label: "40", className: "rounded-[40px]" },
  { label: "60", className: "rounded-[60px]" },
  { label: "80", className: "rounded-[80px]" },
  { label: "100", className: "rounded-[100px]" },
];

export const BORDER = {
  none: "",
  solid: "outline outline-8 outline-solid outline-accent outline-offset-[-8px]",
  dashed:
    "outline outline-8 outline-dashed outline-accent outline-offset-[-8px]",
  dotted:
    "outline outline-8 outline-dotted outline-accent outline-offset-[-8px]",
  double:
    "outline outline-8 outline-double outline-accent outline-offset-[-8px]",
};

export const AVATAR = [
  { label: "None", value: "" },
  { label: "Rounded", value: "rounded-xl" },
  { label: "Soft Rounded", value: "rounded-3xl" },
  { label: "Circle", value: "rounded-full" },
  { label: "Squircle", value: "mask mask-squircle" },
  { label: "Hexagon", value: "mask mask-hexagon" },
  { label: "Heart", value: "mask mask-heart" },
];

export const BG = {
  primary: { label: "Primary", className: "bg-primary", arrow: "hidden" },
  secondary: { label: "Secondary", className: "bg-secondary", arrow: "hidden" },
  grad_t: {
    label: "Gradient",
    className: "bg-gradient-to-t from-primary to-secondary",
    arrow: "rotate-270",
  },
  grad_tr: {
    label: "Gradient",
    className: "bg-gradient-to-tr from-primary to-secondary",
    arrow: "rotate-315",
  },
  grad_r: {
    label: "Gradient",
    className: "bg-gradient-to-r from-primary to-secondary",
    arrow: "rotate-0",
  },
  grad_br: {
    label: "Gradient",
    className: "bg-gradient-to-br from-primary to-secondary",
    arrow: "rotate-45",
  },
  grad_b: {
    label: "Gradient",
    className: "bg-gradient-to-b from-primary to-secondary",
    arrow: "rotate-90",
  },
  grad_bl: {
    label: "Gradient",
    className: "bg-gradient-to-bl from-primary to-secondary",
    arrow: "rotate-135",
  },
  grad_l: {
    label: "Gradient",
    className: "bg-gradient-to-l from-primary to-secondary",
    arrow: "rotate-180",
  },
  grad_tl: {
    label: "Gradient",
    className: "bg-gradient-to-tl from-primary to-secondary",
    arrow: "rotate-225",
  },
};

export const BTN = [
  { label: "Solid", value: "btn btn btn-accent" },
  { label: "Soft", value: "btn btn-soft btn-accent" },
  { label: "Outline", value: "btn btn-outline btn-accent" },
  { label: "Dash", value: "btn btn-dash btn-accent" },
];

export const BTNRAD = [
  { label: "Rounded", value: "rounded-full" },
  { label: "Square", value: "rounded" },
];
