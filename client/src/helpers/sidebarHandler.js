export function toggleCardItem(e) {
    let cards = document.querySelectorAll('.room_card');
    cards.forEach(card => {
        card.classList.remove('active');
    })

    e.target.classList.add('active');
}