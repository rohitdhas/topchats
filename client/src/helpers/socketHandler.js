export function sendMessage(e, messageInput, sender, room, socket) {
    e.preventDefault();
    const message = messageInput.current.value;
    const msg_container = document.getElementById("msg_container");
    if (!message) return;
    else {
        // Pretty Date
        let time = new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })

        displayMessage({ message, time }, 'me');
        msg_container.scrollTo({ left: 0, top: msg_container.scrollHeight, behavior: "smooth" })
        socket.emit("message", { message, sender, time, room });
        messageInput.current.value = "";
    }
}

export function displayMessage(messageData, senderClass) {
    // message, username, time
    const msg_box = document.getElementById("messages");
    const { sender } = messageData;

    let card = document.createElement("div");
    card.classList.add(senderClass, 'msg_card');

    if (senderClass === 'me') {
        card.innerHTML = `
        <div class="msg_text">
         ${messageData.message}
        </div>
        <div class="time">${messageData.time}</div>
        `
    } else {
        card.innerHTML = `
        <div class="msg_text">
        <span class="sent_by">${sender}</span> - ${messageData.message}
        </div>
        <div class="time">${messageData.time}</div>
        `
    }

    msg_box.appendChild(card);
}