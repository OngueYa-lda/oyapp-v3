
export function Hamburger(props) {
  const {
    width,
    height
  } = props;

  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      stroke="#000000"
      strokeWidth={2}
      width={width || '16px'}
      height={height || width || '16px'}
    >
      <path d="M0 2h32v4h-32z
      M0 14h32v4h-32z
      M0 26h32v4h-32z"
      ></path>
    </svg>
  );
}
