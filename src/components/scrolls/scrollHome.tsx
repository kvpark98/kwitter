import { useEffect } from "react";
import { useState } from "react";
import { Bottom, ScrollBtn, Top } from "../styles/auth-components";

export default function ScrollHome() {
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

  console.log(document.body.scrollHeight);

  useEffect(() => {
    const handleShowButton = () => {
      const scrollLocation = window.scrollY;

      scrollLocation > 100 ? setShowButton(true) : setShowButton(false);

      window.sessionStorage.setItem(
        "homeScrollLocation",
        scrollLocation.toString()
      );
    };

    const homeScrollLocation =
      window.sessionStorage.getItem("homeScrollLocation");

    window.scrollTo(0, Number(homeScrollLocation));

    const timer = setInterval(() => {
      window.addEventListener("scroll", handleShowButton);
    }, 100);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleShowButton);
    };
  }, [document.body.scrollHeight]);

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
