# SortMarks - Bookmark Organizer 🗂️

> 🎉 **Personal Milestone:** This is my first ever Chrome extension! I built it to solve my own bookmark organization problems and I'm excited to share it with you.
> 📺 [**Watch Demo**](https://www.linkedin.com/feed/update/urn:li:activity:7317724735218335744/) - See SortMarks in action 🤓!

## Overview 👀

SortMarks is a Chrome extension that automatically organizes your bookmarks into meaningful categories based on their content and URL patterns. Say goodbye to bookmark chaos and hello to a neatly organized bookmark collection 🎊!

## Features ✨

- **Automatic Categorization**: Analyzes bookmark titles and URLs to sort them into appropriate categories
- **Smart Classification**: Uses keyword matching and URL pattern recognition to determine the best category for each bookmark
- **No Manual Work**: One-click operation that processes all your bookmarks at once
- **Customizable Categories**: Define your own categories and keywords in the categories.json file

## Installation 🧭

### Manual Installation ⚙️

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the downloaded folder
5. The SortMarks extension should now be installed and visible in your extensions

## How to Use 💡

1. Click on the SortMarks icon in your Chrome toolbar
2. Click the "Organize Bookmarks" button
3. Wait for the sorting process to complete
4. Check your "Other Bookmarks" folder to see your newly organized bookmarks!

## How It Works 👩🏽‍💻

SortMarks processes your bookmarks in a few steps:

1. It retrieves all bookmarks from your "Other Bookmarks" folder
2. Each bookmark is analyzed and matched against predefined categories
3. The extension creates category folders (if they don't already exist)
4. Bookmarks are moved to their corresponding category folders

### Customizing Categories 🎨

You can customize the categories by editing the `data/categories.json` file. The file structure is as follows:

```json
{
  "categories": [
    {
      "name": "Technology",
      "keywords": ["tech", "coding", "programming", "software", "hardware"],
      "urlPatterns": ["github.com", "stackoverflow.com", "medium.com/tech"]
    },
    {
      "name": "School",
      "keywords": ["College", "University", "Class", "Homework"],
      "urlPatterns": ["blackboard.com", ".edu", "khanacademy.org"]
    }
  ]
}
```

Each category has:

- `name`: The name of the category folder
- `keywords`: Words that might appear in bookmark titles for this category
- `urlPatterns`: URL patterns associated with this category

## Project Structure

```
bookmark-organizer/
│
├── manifest.json             # Extension configuration
│
├── background/
│   └── background.js         # Service worker for bookmark processing
│
├── popup/
│   ├── popup.html            # User interface
│   ├── popup.css             # Styling
│   └── popup.js              # Popup logic
│
├── lib/
│   ├── bookmarkManager.js    # Core functionality for managing bookmarks
│   └── categorizer.js        # Logic for categorizing bookmarks
│
├── data/
│   └── categories.json       # Your keyword mappings for categories
```

## Privacy 👀

SortMarks operates entirely on your local browser and does not:

- Collect or transmit your bookmark data
- Use external servers for processing
- Track your browsing activity

## Contributing

Feel free to reach out with feedback or suggestions as I continue to learn and improve my development skills 🎊👩🏽‍💻🙌🏾!

---

Made with 📚🤎 for bookmark organization enthusiasts!
