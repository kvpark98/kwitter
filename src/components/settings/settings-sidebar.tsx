import React, { useEffect, useMemo, useState } from "react";
import { Nav } from "react-bootstrap";

export default function SettingsSidebar() {
  const settingsElements = useMemo(() => {
    return ["Profile", "Account"];
  }, []);

  const sessionElement = window.sessionStorage.getItem("element");
  const [element, setElement] = useState(sessionElement || "Profile");

  const selectElement = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const targetText = event.currentTarget.innerText;

    setElement(targetText);
  };

  useEffect(() => {
    window.sessionStorage.setItem("element", element);
  }, [element]);

  console.log("element : " + element);
  console.log("sessionElement : " + sessionElement);

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
              onClick={selectElement}
              {...(sessionElement === element
                ? { className: "" }
                : { className: "text-dark" })}
              {...(sessionElement === element
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
