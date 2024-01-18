import { useMemo } from "react";
import { Nav } from "react-bootstrap";

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
            <Nav.Link
              href={`/settings/${element.toLowerCase()}`}
              id={element}
              eventKey={element}
              {...(window.location.href.includes(element.toLowerCase())
                ? { className: "" }
                : { className: "text-dark" })}
              {...(window.location.href.includes(element.toLowerCase())
                ? { active: true }
                : { active: false })}
            >
              <span>{element}</span>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}
