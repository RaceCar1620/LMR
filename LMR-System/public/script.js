const user = localStorage.getItem("user");
const role = localStorage.getItem("role");

document.getElementById("role").innerText = "Role: " + role;

async function send(message) {
    await fetch("/send", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            msg: message,
            user: user
        })
    });
}