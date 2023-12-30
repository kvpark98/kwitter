import { useEffect } from "react";
import { useState } from "react";
import { Bottom, ScrollBtn, Top } from "../styles/auth-components";

export default function ScrollProfile() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scroll(0, document.body.scrollHeight);
  };

  useEffect(() => {
    const handleShowButton = () => {
      const scrollLocation = window.scrollY;

      window.sessionStorage.setItem(
        "profileScrollLocation",
        scrollLocation.toString()
      );

      scrollLocation > 100 ? setShowButton(true) : setShowButton(false);
    };

    const profileScrollLocation = window.sessionStorage.getItem(
      "profileScrollLocation"
    );

    window.scrollTo(0, Number(profileScrollLocation));

    const timer = setInterval(() => {
      window.addEventListener("scroll", handleShowButton);
    }, 100);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <ScrollBtn>
        <Top id="scrollToTop" onClick={scrollToTop}>
          Top
        </Top>
        <Bottom id="scrollToBottom" onClick={scrollToBottom}>
          Bottom
        </Bottom>
      </ScrollBtn>
    )
  );
}
