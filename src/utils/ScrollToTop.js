import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      !["/mypage", "/cs", "/marketplace"].some((path) =>
        pathname.includes(path)
      )
    ) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
