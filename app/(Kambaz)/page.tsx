// export default function Kambaz() {
//   return (
//     <div>
//       <h1>Kambaz</h1>
//     </div>
//   );
// }
import { redirect } from "next/dist/client/components/navigation";

export default function AccountPage() {
  redirect("/Account/Signin");
}
