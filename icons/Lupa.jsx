export function Lupa(props) {
  const {
    width,
    height,
    fill,
    stroke
  } = props;

  return (
    <svg
      viewBox="0 0 32 32"
      fill={fill || 'none'}
      stroke={stroke || '#ffffff'}
      strokeWidth={4}
      aria-hidden="true"
      role="presentation"
      focusable="false"
      width={width || '16px'}
      height={height || width || '16px'}
    >
      <path
        d="m13 24c6.0751322 0 11-4.9248678 11-11
      0-6.07513225-4.9248678-11-11-11-6.07513225
      0-11 4.92486775-11 11 0 6.0751322 4.92486775
      11 11 11zm8-3 9 9">
      </path>
    </svg>
  );
}
