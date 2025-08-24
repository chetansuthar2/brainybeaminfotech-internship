# Currency Converter

A simple, responsive **currency converter web app** built with **HTML, CSS, and JavaScript** that fetches **real-time exchange rates** using a free API. Users can select currencies, swap between them, and view updated conversion results instantly.

---

## Features

* **Real-time currency conversion** using `https://api.exchangerate-api.com`
* **Responsive design** for desktop and mobile
* **Swap currencies instantly** with one click
* **Displays last updated time** and exchange rate details
* **Error handling** for invalid API responses or network failures
* **Clean, modern UI with animations**

---

## Tech Stack

* **HTML5** – structure
* **CSS3** – styling with gradients, flexbox, and responsive design
* **JavaScript (ES6)** – logic, API integration, and dynamic updates
* **Font Awesome** – icons

---

## How It Works

1. User enters an **amount** to convert.
2. Selects **source currency** ("From") and **target currency** ("To").
3. App fetches **exchange rates** from `https://api.exchangerate-api.com`.
4. Converted amount and **live exchange rate** are displayed.
5. User can click **swap button** to reverse the currencies instantly.

---

## Installation & Usage

1. **Clone the repository**

```bash
git clone https://github.com/chetansuthar2/currency-converter.git
cd currency-converter
```

2. **Open `index.html` in any browser**

* No server setup required (runs fully client-side).
* Works on Chrome, Firefox, Edge, and mobile browsers.

---

## File Structure

```
currency-converter/
│── index.html     # Main application file  
│── README.md      # Project documentation  
```

---

## API Used

* **ExchangeRate API**

  * Endpoint: `https://api.exchangerate-api.com/v4/latest/{base_currency}`
  * Returns JSON object with conversion rates.
  * No API key required for basic usage.

---

## Future Improvements

* Add **currency search bar** for faster selection.
* Add **historical exchange rate charts** using Chart.js or Recharts.
* Add **offline fallback mode** with cached rates.
* Support for **cryptocurrency conversion** (BTC, ETH, etc.).

---

## License

This project is **open-source** and available under the [MIT License](LICENSE).

---
