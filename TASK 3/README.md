# Shared Input Component

A **reusable Vue 3 component** that unifies multiple input types (`text`, `email`, `password`, `textarea`, `checkbox`, `radio`) into a single flexible interface. This project demonstrates how to build **dynamic forms** with clean code, reactive state management, and a polished UI.

---

## Features

* **Reusable Vue 3 component** for all common input types
* **Single source of truth** using `v-model` for binding
* **Custom props**: label, placeholder, required, rows (for textarea), and radio value
* **Responsive layout** with modern CSS styling
* **Form handling** with submit and reset actions
* **Live preview of submitted data** in JSON format
* **Validation-ready** (supports required fields natively)

---

## Tech Stack

* **Vue 3 (CDN version)** – component logic and reactivity
* **HTML5 & CSS3** – structure and design
* **JavaScript (ES6)** – app setup with `ref`, `computed`, `createApp`

---

## How It Works

1. The `SharedInput` component is declared once and reused for different input types.
2. Parent form uses `v-model` to bind input values to a single `formData` object.
3. The component emits updates to keep parent state in sync.
4. On **submit**, the form data is displayed in JSON format.
5. On **reset**, the form state is cleared to default values.

---

## Installation & Usage

1. **Clone the repository**

```bash
git clone https://github.com/chetansuthar2/shared-input-component.git
cd shared-input-component
```

2. **Open `index.html` directly in your browser**

* No build tools or bundlers required.
* Uses Vue 3 via CDN.

---

## File Structure

```
shared-input-component/
│── index.html     # Main application file  
│── README.md      # Project documentation  
```

---

## Component API (`SharedInput`)

### Props

* `type` *(String)* – input type (`text`, `email`, `password`, `textarea`, `checkbox`, `radio`)
* `modelValue` *(String | Boolean | Number)* – bound value via `v-model`
* `label` *(String)* – input label
* `placeholder` *(String)* – placeholder text (for text and textarea)
* `id` *(String)* – unique input ID
* `required` *(Boolean)* – mark input as required
* `radioValue` *(String | Number)* – value to assign for radio inputs
* `rows` *(Number)* – number of rows (for textarea only)

### Emits

* `update:modelValue` – triggered on input change

---

## Future Improvements

* Add **select dropdown** support to the same component
* Add **built-in validation messages**
* Add **custom events** for blur and focus handling
* Make it **fully accessible (ARIA roles)**

---
