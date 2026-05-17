export default function EmptyState({ title = "No data yet", description = "This page is ready for future content." }) {
  return (
    <div style={{ padding: 24, border: "1px dashed #b6c7d3", borderRadius: 16, textAlign: "center" }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <p style={{ margin: 0, color: "#5c7384" }}>{description}</p>
    </div>
  );
}
