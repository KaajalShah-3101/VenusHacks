import { Link } from "react-router-dom";
import Nor from "../components/Nor";

export default function Header() {
  return (
    <div style={{ padding: "10px" }}>
      <Link to="/" style={{ cursor: "pointer" }}>
        <Nor size={80} />
      </Link>
    </div>
  );
}