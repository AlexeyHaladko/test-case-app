import { getAuthToken } from "@/api/utils.ts";
import { redirect } from "react-router";
import { PAGE_PATHS } from "@/routes.ts";


function authMiddleware() {
  const token = getAuthToken();

  if (!token) {
   throw redirect(PAGE_PATHS.LOGIN);
  }
}
export default authMiddleware;