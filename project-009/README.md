# Random Thoughts 💭 ~ Post-it app

A minimalist, fun, interactive digital Post-It wall where you can dump all your random thoughts, reminders, to-dos, and vibes. Because sometimes you just need to get it out of your head 😉

![Post-It Wall Demo](/project-009/public/preview.png)

## ✨ Features

- **Infinite Post-Its**: Add as many notes as you want with the floating `+` button
- **Colorful Wall**: Notes come in 6 vibrant colors (yellow, cyan, pink, orange, green, purple)
- **Natural Look**: Each note has a random rotation for that authentic sticky note feel
- **Easy Editing**: Click any note to start typing - your changes are saved automatically
- **Quick Delete**: Hover over a note to reveal the delete button
- **Persistent Storage**: Your notes are saved in localStorage and persist across sessions
- **Export Your Thoughts**: Download all your notes as a JSON file
- **Reset Anytime**: Clear the wall and start fresh
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **React** with TypeScript
- **Tailwind CSS** for styling
- **localStorage** for data persistence
- **Vite** for build tooling

## 💾 Data Persistence

Notes are automatically saved to `localStorage` under the key `my-postit-wall`. The app:

- Saves on every change
- Loads saved notes on mount
- Syncs across tabs using the Storage Event API

## 📤 Export Format

When you export your wall, you'll get a JSON file with this structure:

```json
[
  {
    "id": "1704067200000",
    "text": "Add animations to the landing page",
    "color": "pink",
    "rotation": -2
  }
]
```

## 🎯 Usage

- **Quick Add**: Click the `+` button (bottom-right on mobile, top-right on desktop)
- **Edit**: Click anywhere on a note and start typing
- **Delete**: Hover over a note to reveal the `×` button
- **Export**: Click "Export Wall" to download your notes
- **Reset**: Click "Reset Wall" to clear everything (you'll get a confirmation prompt)

## 🤝 Contributing

Feel free to fork this project and make it your own! Some ideas:

- Add drag-and-drop functionality
- Implement note categories/tags
- Add search/filter functionality
- Cloud sync with a backend
- Dark mode support
- More color options
- Custom note sizes

## 📝 License

MIT License

## 🙏 Acknowledgments

Inspired by the simple joy of physical Post-It notes and the need to externalize all those random thoughts bouncing around in our heads.

---

_Built with 💝 and a lot of random thoughts 💭!_
