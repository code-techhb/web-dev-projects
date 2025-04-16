import {
  getAllBookmarksFlat,
  createFolder,
  moveBookmark,
} from "../lib/bookmarkManager.js";
import { autoSortBookmarks } from "../lib/categorizer.js";

// ----------------- DOM --------------------
document.addEventListener("DOMContentLoaded", () => {
  const organizeButton = document.querySelector('button[type="button"]');

  organizeButton.addEventListener("click", async () => {
    try {
      organizeButton.textContent = "Sorting...";
      organizeButton.disabled = true;

      // Call the auto-sort function
      const result = await autoSortBookmarks(
        getAllBookmarksFlat,
        createFolder,
        moveBookmark
      );

      if (result.success) {
        let totalBookmarks = 0;
        for (const category in result.categorizedBookmarks) {
          totalBookmarks += result.categorizedBookmarks[category].length;
        }
        alert(
          `🎉 Successfully sorted ${totalBookmarks} bookmarks into ${
            Object.keys(result.categoryFolders).length
          } categories!`
        );
      } else {
        alert(`Error sorting bookmarks 😢: ${result.error}`);
      }
    } catch (error) {
      console.error("Error auto-sorting bookmarks:", error);
      alert(`Error 😢: ${error.message}`);
    } finally {
      organizeButton.textContent = "Organize Bookmarks";
      organizeButton.disabled = false;
    }
  });
});
