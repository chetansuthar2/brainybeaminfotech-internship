# 🧮 Colorful Dark Calculator

A beautiful, modern calculator with vibrant colors and smooth animations built with HTML, CSS, and JavaScript.

![Calculator Preview](https://img.shields.io/badge/Calculator-Colorful%20Dark%20Theme-purple?style=for-the-badge)

## ✨ Features

### 🎨 **Visual Design**
- **Beautiful Gradient Background**: Purple to blue gradient backdrop
- **Colorful Button Scheme**:
  - 🟢 **Green**: Function buttons (AC, DE, %)
  - 🟠 **Orange**: Operator buttons (+, -, ×, ÷)
  - ⚫ **Gray**: Number buttons (0-9)
  - 🔴 **Red**: Equals button (=)
- **3D Button Effects**: Gradient backgrounds with depth and shadows
- **Smooth Animations**: Hover effects and click transitions
- **Ripple Effect**: Interactive button press animations

### 🔧 **Functionality**
- ✅ Basic arithmetic operations (+, -, ×, ÷)
- ✅ Percentage calculations (%)
- ✅ Clear all (AC) and delete last entry (DE)
- ✅ Double zero (00) button for convenience
- ✅ Error handling with auto-reset
- ✅ Floating point precision handling
- ✅ Expression validation

### ⌨️ **Keyboard Support**
- **Numbers**: 0-9
- **Operators**: +, -, *, /
- **Special Keys**:
  - `Enter` or `=`: Calculate result
  - `Escape`: Clear all
  - `Backspace`: Delete last entry
  - `%`: Percentage

### 📱 **Responsive Design**
- Mobile-friendly layout
- Adaptive button sizing
- Optimized for different screen sizes
- Touch-friendly interface

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. **Clone or Download**:
   ```bash
   git clone <repository-url>
   # OR download the Calculator.html file directly
   ```

2. **Open in Browser**:
   ```bash
   # Double-click Calculator.html
   # OR open with your preferred browser
   ```

3. **Start Calculating**! 🎉

## 🎯 Usage

### Basic Operations
```
Example: 25 + 15 × 2
1. Click: 2 → 5 → + → 1 → 5 → × → 2 → =
2. Result: 55
```

### Percentage Calculations
```
Example: 20% of 150
1. Click: 1 → 5 → 0 → × → 2 → 0 → % → =
2. Result: 30
```

### Keyboard Shortcuts
- Type numbers and operators directly
- Press `Enter` to calculate
- Press `Escape` to clear
- Press `Backspace` to delete

## 🏗️ Technical Details

### File Structure
```
Calculator/
├── Calculator.html    # Main calculator file (HTML + CSS + JS)
└── README.md         # This documentation
```

### Technologies Used
- **HTML5**: Structure and layout
- **CSS3**: Styling, animations, and responsive design
- **Vanilla JavaScript**: Calculator logic and interactions

### Key Components
1. **Display**: Shows current input and results
2. **Button Grid**: 4×5 grid layout for all buttons
3. **Calculator Class**: Handles all mathematical operations
4. **Event Handlers**: Keyboard and mouse interactions

## 🎨 Color Scheme

| Button Type | Primary Color | Hover Color | Purpose |
|-------------|---------------|-------------|---------|
| Function | Green (#4ade80) | Dark Green (#22c55e) | AC, DE, % |
| Operator | Orange (#f59e0b) | Dark Orange (#d97706) | +, -, ×, ÷ |
| Number | Gray (#4b5563) | Light Gray (#6b7280) | 0-9, 00 |
| Equals | Red (#ef4444) | Dark Red (#dc2626) | = |

## 🔧 Customization

### Changing Colors
Edit the CSS gradient values in the button classes:
```css
.btn-function {
    background: linear-gradient(145deg, #your-color, #your-darker-color);
}
```

### Modifying Layout
Adjust the grid system:
```css
.buttons {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}
```

## 🐛 Error Handling

- **Invalid Expressions**: Shows "Error" and auto-resets
- **Division by Zero**: Handled gracefully
- **Overflow**: Large numbers shown in scientific notation
- **Precision**: Floating-point errors minimized

## 📱 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 60+ | ✅ Fully Supported |
| Firefox | 55+ | ✅ Fully Supported |
| Safari | 12+ | ✅ Fully Supported |
| Edge | 79+ | ✅ Fully Supported |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by modern calculator designs
- Built with modern web technologies
- Designed for optimal user experience

---

**Made with ❤️ and lots of ☕**

*Enjoy calculating in style! 🧮✨*
