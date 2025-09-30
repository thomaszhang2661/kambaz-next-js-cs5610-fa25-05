import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";
import "./styles.css";

export default function KambazLayout({ children }: { children: ReactNode }) {
  return (
    <div id="wd-kambaz">
      <div className="d-flex">
        <div>
          <KambazNavigation />
          <MobileNavigation />
        </div>
        <div className="wd-main-content-offset p-3 flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}
