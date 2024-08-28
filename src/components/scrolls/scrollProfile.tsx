import { useEffect } from "react";
import { useState } from "react";
import { Bottom, ScrollBtn, Top } from "../styles/auth-components";

export interface ScrollProfileProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export default function ScrollProfile({
  scrollContainerRef,
}: ScrollProfileProps) {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    const handleShowButton = () => {
      const scrollLocation = scrollContainer.scrollTop;
      setShowButton(scrollLocation > 100);

      window.sessionStorage.setItem(
        "profileScrollLocation",
        scrollLocation.toString()
      );
    };

    const profileScrollLocation = window.sessionStorage.getItem(
      "profileScrollLocation"
    );

    if (profileScrollLocation && scrollContainer) {
      scrollContainer.scrollTo(0, Number(profileScrollLocation));
    }

    scrollContainer.addEventListener("scroll", handleShowButton);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      scrollContainer.removeEventListener("scroll", handleShowButton);
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
