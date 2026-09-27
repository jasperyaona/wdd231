/* =========================
   TIMESTAMP
   ========================= */

const timestampField = document.querySelector("#timestamp");
if (timestampField) {
    timestampField.value = new Date().toISOString();
}


/* =========================
   MEMBERSHIP MODALS
   ========================= */

const cardLinks = document.querySelectorAll(".card-link");

cardLinks.forEach(link => {
    link.addEventListener("click", () => {
        const modalId = link.getAttribute("data-modal");
        const modal = document.querySelector(`#${modalId}`);
        if (modal) {
            modal.showModal();
        }
    });
});

const closeButtons = document.querySelectorAll(".modal-close");

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");
        if (modal) {
            modal.close();
        }
    });
});
