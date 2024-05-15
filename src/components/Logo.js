import { MaterialSymbol } from "react-material-symbols";

export function Logo({ size = 52 }) {
  return (
    <header className="logo">
      <MaterialSymbol icon="diversity_2" size={size} />
      <h4 style={{ margin: 0 }}>ConnectHub</h4>
    </header>
  );
}
