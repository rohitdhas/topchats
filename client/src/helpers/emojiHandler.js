import { EmojiButton } from "@joeattardi/emoji-button";

const picker = new EmojiButton();

picker.on("emoji", (selection) => {
    const commentField = document.getElementById('message_input');
    commentField.value += ` ${selection.emoji}`;
});

export function toggleEmojiKeyboard(e) {
    picker.togglePicker(e.target);
};

