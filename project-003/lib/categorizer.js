/**
 * Loads category definitions from the categories.json file
 * returns Promise that resolves with the category data
 */
async function loadCategories() {
  try {
    // Get the correct URL for categories.json
    const url = chrome.runtime.getURL("data/categories.json");

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to load categories: ${response.status} ${response.statusText}`
      );
    }
    // Parse JSON data
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error("Error loading categories:", error);
    throw error;
  }
}

// -------------- Categorize bookmark ------------
// Helper function: calculate match score
/**
 * Calculates how well a bookmark matches a category
 * param {Object} bookmark - The bookmark to check
 * param {Object} category - The category definition
 * returns {Number} A score representing how well the bookmark matches
 */

function calculateMatchScore(bookmark, category) {
  let score = 0;
  const title = bookmark.title.toLowerCase();
  const url = bookmark.url.toLowerCase();

  // Check for keyword matches in the title
  for (const keyword of category.keywords) {
    if (title.includes(keyword.toLowerCase())) {
      score += 1;
    }
  }

  // Check for URL pattern matches
  for (const pattern of category.urlPatterns) {
    if (url.includes(pattern.toLowerCase())) {
      score += 2;
    }
  }
  return score;
}
/**
 * Categorizes a bookmark based on its title and URL
 * param  bookmark - The bookmark object to categorize
 * param categories - Array of category definitions
 * returns a string - The name of the best matching category
 */
function categorizeBookmark(bookmark, categories) {
  // default folder/category
  let bestMatch = "Miscellaneous";
  let highestScore = 0;

  // calculate a match score for each category
  for (const category of categories) {
    if (category.name === "Miscellaneous") {
      continue;
    }

    // Calculate match score for current category
    const score = calculateMatchScore(bookmark, category);

    // if score is higher than the current highest, update best match
    if (score > highestScore) {
      highestScore = score;
      bestMatch = category.name;
    }
  }
  return bestMatch;
}

// -------------- Categorize bookmarks ------------
/**
 * Processes an array of bookmarks and sorts them into categories
 * param  bookmarks - Array of bookmark objects
 * returns Promise that resolves with an object mapping category names to arrays of bookmarks
 */
async function categorizeBookmarks(bookmarks) {
  try {
    const categories = await loadCategories();
    const categorizedBookmarks = {};

    // initialize empty arrays for each category
    categories.forEach((category) => {
      categorizedBookmarks[category.name] = [];
    });

    if (!categorizedBookmarks["Miscellaneous"]) {
      categorizedBookmarks["Miscellaneous"] = [];
    }

    // categorize each bookmark
    bookmarks.forEach((bookmark) => {
      const categoryName = categorizeBookmark(bookmark, categories);

      // ensure the category array exists before pushing
      if (!categorizedBookmarks[categoryName]) {
        console.warn(
          `Category '${categoryName}' not found in predefined categories, using Miscellaneous`
        );
        categorizedBookmarks["Miscellaneous"].push(bookmark);
      } else {
        categorizedBookmarks[categoryName].push(bookmark);
      }
    });
    return categorizedBookmarks;
  } catch (error) {
    console.error("Error categorizing bookmarks:", error);
    throw error;
  }
}

// -------------- Organize bookmarks ------------
/**
 * Organizes bookmarks into their respective category folders
 * param  categorizedBookmarks - Object mapping categories to bookmark arrays
 * param  createFolderFn - Function to create a folder
 * param  moveBookmarkFn - Function to move a bookmark
 * returns  Promise that resolves when all bookmarks are organized
 */
async function organizeBookmarks(
  categorizedBookmarks,
  createFolderFn,
  moveBookmarkFn
) {
  const categoryFolders = {};

  console.log("Starting to organize bookmarks...");

  // process each category
  for (const [categoryName, bookmarks] of Object.entries(
    categorizedBookmarks
  )) {
    // skip empty categories
    if (bookmarks.length === 0) {
      // console.log(`Skipping empty category: ${categoryName}`);
      continue;
    }

    try {
      const folder = await createFolderFn(categoryName);
      categoryFolders[categoryName] = folder;

      // move each bookmark to its category folder
      for (const bookmark of bookmarks) {
        await moveBookmarkFn(bookmark.id, folder.id);
      }
    } catch (error) {
      console.error(`Error organizing ${categoryName} bookmarks:`, error);
    }
  }

  return categoryFolders;
}

// -------------- Ultimate function: Auto-sort ------------
/**
 * Main function to auto-sort all bookmarks
 * param getAllBookmarksFn - Function to get all bookmarks
 * param  createFolderFn - Function to create a folder
 * param  moveBookmarkFn - Function to move a bookmark
 * returns  Promise that resolves when auto-sort is complete
 */
async function autoSortBookmarks(
  getAllBookmarksFn,
  createFolderFn,
  moveBookmarkFn
) {
  try {
    // Get all bookmarks
    const bookmarks = await getAllBookmarksFn();

    // Categorize bookmarks
    const categorizedBookmarks = await categorizeBookmarks(bookmarks);

    // Organize bookmarks into folders
    const categoryFolders = await organizeBookmarks(
      categorizedBookmarks,
      createFolderFn,
      moveBookmarkFn
    );

    return {
      success: true,
      categorizedBookmarks,
      categoryFolders,
    };
  } catch (error) {
    console.error("Error auto-sorting bookmarks:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// -------------- Export functions ------------
export {
  loadCategories,
  categorizeBookmark,
  categorizeBookmarks,
  organizeBookmarks,
  autoSortBookmarks,
};
