type PenNibProps = {
  color: string;
};

const PenNib = (props: PenNibProps) => {
  return (
    <svg
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={1080}
      height={1080}
      viewBox="0 0 1080 1080"
    >
      <rect
        width={100}
        height={100}
        x={-50}
        y={-50}
        fill="none"
        rx={0}
        ry={0}
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: props.color,
          fillOpacity: 0,
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(-1 0 0 1 1033.38 50)"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M1480 3056c-568-225-565-223-622-268-85-67-85-66-483-1261L1 405l29-30 30-30 580 580c531 531 579 581 572 605-4 14-7 57-6 96 1 138 86 264 222 332 72 35 81 37 172 37s100-2 172-37c91-45 147-103 191-196 29-61 32-76 32-162s-3-101-32-162c-17-37-50-87-74-112-82-90-244-145-344-117l-40 11-577-578C610 325 350 63 350 60s12-18 26-33l24-29 1114 372c612 204 1130 380 1152 392 64 34 110 75 146 131 27 41 435 1054 456 1131 4 14-143 166-609 632-338 338-621 614-629 613-8 0-256-96-550-213z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: props.color,
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(.32 0 0 .32 20.327 17.28)"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default PenNib;
