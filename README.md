# Professional Slate Dark Developer Portfolio

A responsive, highly aesthetic professional developer portfolio website built using semantic HTML5, Tailwind CSS, custom CSS3, and interactive JavaScript. The project features a premium Slate Dark theme, interactive timelines, glassmorphism cards, and real email delivery via the Web3Forms API.

---

## Directory Structure

```
PORTFOLIO/
├── index.html            # Main site structure, sections (Skills, Projects, Experience, achievements), and SEO tags
├── PROJECT_REPORT.md     # Comprehensive project audit and foreground/background analysis
├── assets/
│   ├── css/
│   │   └── style.css     # Slate Dark variables, glass cards, professional timelines & scrollbar styles
│   ├── js/
│   │   └── main.js       # Mobile hamburger drawer, scroll animation observers, and Web3Forms AJAX submit
│   └── images/
│       └── pv.png        # Profile picture asset
└── README.md             # Project documentation (this file)
```

---

## Features

- **Professional Slate Dark Theme:** Clean Slate-900 / Slate-800 backdrop colors with Royal Blue accents, optimized for high readability and professional appeal.
- **Responsive Navigation Drawer:** Includes a mobile hamburger toggle and a screen-overlay drawer for smartphones and tablets.
- **Dynamic Scroll Reveals:** Uses `IntersectionObserver` to trigger fade-in animations on sections as the visitor scrolls.
- **Hover Micro-Animations:** Neon borders and background glow highlights on skill cards and timeline items when hovered.
- **Web3Forms Email Integration:** Real client-to-inbox message forwarding without setting up a backend server.

---

## Contact Form Setup (How to receive messages)

The contact form is configured to send messages directly to your email address using Web3Forms. To activate it:

1. Visit **[web3forms.com](https://web3forms.com)**, enter your email (`punatiravish@gmail.com`), and generate a free **Access Key**.
2. Open `index.html` and go to line 558.
3. Replace the placeholder value with your key:
   ```html
   <input type="hidden" name="access_key" value="YOUR_KEY_HERE">
   ```
4. Save the file. When users submit the form, you will receive their name, email, and message directly in your inbox.

