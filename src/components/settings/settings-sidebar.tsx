import { useMemo } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SettingsSidebar() {
  const settingsElements = useMemo(() => {
    return ["Profile", "Account"];
  }, []);

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-light"
      style={{ width: "270px" }}
    >
      <Nav className="nav nav-pills flex-column">
        {settingsElements.map((element) => (
          <Nav.Item key={element}>
            <Link
              to={`/settings/${element.toLowerCase()}`}
              id={element}
              {...(window.location.href.includes(element.toLowerCase())
                ? { className: "nav-link active" }
                : { className: "nav-link text-dark" })}
            >
              <span>{element}</span>
            </Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}
