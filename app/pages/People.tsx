import authService from "@app/Services/AuthService";
import { tokenUtils } from "@app/Utilities/AuthUtilities";
import { Form, redirect, type ActionFunctionArgs } from "react-router";



// CLIENT ACTION
// Reads form data, call API, store toke, redirect
export async function clientAction({ request }: ActionFunctionArgs) {
    // 1️⃣ Read form data
    const form = await request.formData();
    const username = form.get("username")?.toString().trim() ?? "";
    const password = form.get("password")?.toString() ?? "";

    if (!username || !password) {
        throw new Error("Username and password are required");
    }

    // 2️⃣ Call API to login
    const response = await authService.loginUser({ username, password })
    if (response) {
        // 3️⃣ Store token
        tokenUtils.setToken(response.token);
        // 4️⃣ Redirect to home
        return redirect("/");
    }

}

export default function People() {
    return (
        <div>
            <Form>

            </Form>
        </div>
    )
}

