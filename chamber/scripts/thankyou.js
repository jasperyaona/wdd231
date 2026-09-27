const params = new URLSearchParams(window.location.search);

const fields = ["firstName", "lastName", "email", "mobilePhone", "businessName"];

fields.forEach(field => {
    const outEl = document.querySelector(`#out-${field}`);
    if (outEl) {
        outEl.textContent = params.get(field) || "—";
    }
});

const timestampValue = params.get("timestamp");
const timestampOut = document.querySelector("#out-timestamp");

if (timestampOut) {
    if (timestampValue) {
        const date = new Date(timestampValue);
        timestampOut.textContent = isNaN(date) ? timestampValue : date.toLocaleString();
    } else {
        timestampOut.textContent = "—";
    }
}
