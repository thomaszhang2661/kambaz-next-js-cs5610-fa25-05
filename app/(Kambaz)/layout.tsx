"use client";
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";
import Session from "./Account/Session";

export default function KambazLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <div id="wd-kambaz">
        <Session>
          <div className="d-flex">
            <div>
              <KambazNavigation />
              <MobileNavigation />
            </div>
            <div className="wd-main-content-offset p-3 flex-fill">
              {children}
            </div>
          </div>
        </Session>
      </div>
    </Provider>
  );
}
