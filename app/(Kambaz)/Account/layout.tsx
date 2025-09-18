import { ReactNode } from "react";
import AccountNavigation from "./Navigation";
export default function AccountLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz">
      <table>
        <tbody>
          <tr>
            <td valign="top" width="10%">
              <AccountNavigation />
            </td>
            <td valign="top" width="90%">
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
