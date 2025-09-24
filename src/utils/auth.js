export function signup(email, username, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) return { success: false, message: "User already exists" };
    users.push({ email, username, password });
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true };
}

export function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: "Invalid credentials" };
    localStorage.setItem("session", JSON.stringify(user));
    return { success: true };
}

export function getSession() {
    return JSON.parse(localStorage.getItem("session"));
}

export function logout() {
    localStorage.removeItem("session");
}
