
# schedule-slot-picker

A lightweight, customizable **week-view calendar** JavaScript plugin that allows users to select available time slots, view booked slots, and navigate through weeks with past time slots disabled. Ideal for booking appointments, lessons, or scheduling tasks.

---

## Features

- Displays a **7-day week view** with hourly time slots (00:00 to 23:00).
- Highlights **booked time slots** based on pre-defined data.
- Prevents selection of **past dates and past hours** on the current day.
- Navigate between weeks using previous and next buttons.
- Modal popup displays selected slot details with action buttons.
- Fully customizable HTML & CSS structure.
- Accessible and responsive design ready.

---

## Demo

![Demo Screenshot](./screenshot.png)  
*(Include a screenshot or gif showing the calendar in action)*

---

## Installation

1. Include the CSS styles:

```html
<link rel="stylesheet" href="path/to/schedule-slot-picker.css" />
```

2. Add the required HTML structure in your page:

```html
<div class="lg-calender mb-40">
  <!-- Calendar header and controls here -->
  <div id="calendar" class="calendar" data-booked-slots='{
    "2025-04-21": [6, 10, 18],
    "2025-04-22": [1, 10, 15]
  }'></div>

  <!-- Modal for booking requests -->
  <div id="modal" class="modal">
    <div class="modal-content">
      <h3>Click on the request to send a message to the tutor to book a lesson at the selected time</h3>
      <p id="modalSlotInfo"></p>
      <a href="#" class="primary-btn lg border-radius-8 mb-16">Request</a>
      <span id="closeModal" class="close dark-btn lg border-radius-8">Cancel</span>
    </div>
  </div>
</div>
```

3. Include the JavaScript plugin before the closing `</body>` tag:

```html
<script src="path/to/schedule-slot-picker.js"></script>
```

---

## Usage

- Use the **navigation arrows** to move forward or backward through weeks.
- Booked time slots are displayed as disabled and cannot be selected.
- Past time slots are disabled for the current date and any date before today.
- Click an **available slot** to open the modal and see details.
- Customize your booking logic inside the modal's "Request" button handler.

---

## Configuration

- Booked slots are passed as a JSON string in the `data-booked-slots` attribute on the calendar element.

  Example:

  ```json
  {
    "2025-04-21": [6, 10, 18],
    "2025-04-22": [1, 10, 15]
  }
  ```

  Keys are dates in `YYYY-MM-DD` format, and values are arrays of booked hour indices (0-23).

---

## Customization

- Adjust CSS styles in `schedule-slot-picker.css` to change colors, sizes, and layout.
- Modify time slot range or intervals by updating the JavaScript hours array in `schedule-slot-picker.js`.
- Extend modal functionality to integrate with backend booking APIs.

---

## Browser Support

Tested on modern browsers including Chrome, Firefox, Edge, and Safari.

---

## License

MIT License — free to use and modify.

---

## Author

Jerald Tonmoy Dias  
*Frontend Developer & Fullstack Enthusiast*  
[GitHub](https://github.com/Jerald-tonmoy-dias) | [LinkedIn](https://linkedin.com/in/jerald-tonmoy-dias)
