export default function addPlus (value, isSpaced) {
  return (value >= 0 ? '+' : '-') + (isSpaced ? ' ' : '') + Math.abs(value)
}
