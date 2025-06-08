const calendar = document.getElementById("calendar");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalSlotInfo = document.getElementById("modalSlotInfo");
const weekLabel = document.getElementById("weekLabel");

let weekOffset = 0;
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

const dataBookedSlots = calendar?.getAttribute("data-booked-slots") ?? "{}";
const bookedSlots = JSON.parse(dataBookedSlots);

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

function isPastSlot(date, hour) {
  const now = new Date();
  const slot = new Date(date);
  slot.setHours(hour, 0, 0, 0);
  return slot < now;
}

function renderCalendar() {
  if (!calendar || !weekLabel) return;
  calendar.innerHTML = "";

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + weekOffset * 7);
  startDate.setHours(0, 0, 0, 0);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  weekLabel.textContent = `${dates[0].toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })} – ${dates[6].toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}`;

  calendar.innerHTML += `<div class="cell header"></div>`;
  dates.forEach(d => {
    calendar.innerHTML += `
      <div class="cell header">
        <span class="day">${days[d.getDay()]}</span><br>
        <span class="date-txt">${d.toLocaleDateString("en-GB",{day:"2-digit",month:"short"})}</span>
      </div>`;
  });

  hours.forEach((hourLabel, h) => {
    calendar.innerHTML += `<div class="time-label">${hourLabel}</div>`;
    dates.forEach(d => {
      const dateStr = d.toISOString().split("T")[0];
      const booked = bookedSlots[dateStr]?.includes(h) || false;
      const past = isPastSlot(d, h);

      const cls = booked ? "booked" : past ? "past" : "available";
      const tooltip = `${hourLabel} – ${String((h+1)%24).padStart(2,'0')}:00, ${days[d.getDay()]}, ${d.toLocaleDateString("en-GB",{day:'2-digit',month:'short'})}`;

      calendar.innerHTML += `
        <div class="cell ${cls}"
             ${!booked && !past ? `data-tooltip="${tooltip}" data-hour="${h}" data-date="${dateStr}"` : ''}
        ></div>`;
    });
  });
}

// Week navigation
document.getElementById('changeweekprev').addEventListener('click', () => {
  const newOffset = weekOffset - 1;
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + newOffset * 7);
  if (targetDate < new Date() && !isSameDay(targetDate, new Date())) {
    alert('You cannot view past dates!');
    return;
  }
  weekOffset = newOffset;
  renderCalendar();
});
document.getElementById('changeweeknext').addEventListener('click', () => {
  weekOffset++;
  renderCalendar();
});

// Slot click -> Modal
calendar.addEventListener("click", e => {
  const el = e.target;
  if (!el.classList.contains("available")) return;

  const date = el.getAttribute("data-date");
  const hour = parseInt(el.getAttribute("data-hour"));
  if (!date || isNaN(hour)) return;

  modalSlotInfo.textContent = `You selected ${hour}:00 – ${(hour + 1) % 24}:00 on ${new Date(date).toDateString()}`;
  modal.style.display = "flex";
});

// Modal close
closeModal.addEventListener('click', () => modal.style.display = "none");
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = "none";
});

renderCalendar();
