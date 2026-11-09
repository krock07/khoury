export default function SectionLabel({ index, children }) {
  return (
    <p className="section-label mono">
      <span className="section-label__index">({index})</span>
      <span className="section-label__line" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
