/**
 * Read all bookmarks from the "Other Bookmarks" folder
 * returns Promise that resolves with an array of bookmarks
 */

function getOtherBookmarks() {
  return new Promise(function (resolve, reject) {
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      try {
        // Root node (index 0) contains "Bookmarks Bar", "Other Bookmarks", and "Mobile Bookmarks"
        const rootNode = bookmarkTreeNodes[0];
        const otherBookmarksFolder = rootNode.children.find(
          (folder) => folder.title === "Other Bookmarks"
        );

        if (!otherBookmarksFolder) {
          return reject(new Error("Other Bookmars folder not found 😭"));
        }
        // check if there are any bookmarks
        if (
          !otherBookmarksFolder.children ||
          otherBookmarksFolder.children.length == 0
        ) {
          return resolve([]);
        }
        // if all success,
        resolve(otherBookmarksFolder.children);
      } catch (error) {
        reject(error);
      }
    });
  });
}

//-------------------- Helper function-------------------
/**
 * Helper function to flatten a bookmark tree into an array of bookmarks
 * param bookmarkTree - Array of bookmark nodes
 * returns Flattened array of bookmark objects
 */
function flattenBookmarkTree(bookmarkTree) {
  let bookmarks = [];

  for (const node of bookmarkTree) {
    // if node is bookmark
    if (node.url) {
      bookmarks.push({
        id: node.id,
        title: node.title,
        url: node.url,
        dateAdded: node.dateAdded,
      });
    }
    // if node has children, then it's folder so process it to get the bookmarks recursively
    if (node.children && node.children.length > 0) {
      const childBookmarks = flattenBookmarkTree(node.children);
      bookmarks = bookmarks.concat(childBookmarks);
    }
  }
  return bookmarks;
}
//-------------------- Get all bookmarks -------------------
/**
 * Get all bookmarks (not folders) from the Other Bookmarks folder recursively
 * returns Promise that resolves with a flat array of all bookmarks
 */
function getAllBookmarksFlat() {
  return new Promise(function (resolve, reject) {
    getOtherBookmarks()
      .then(function (bookmarks) {
        const flattenedBookmarks = flattenBookmarkTree(bookmarks);
        resolve(flattenedBookmarks);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

// ----------------------- CreateFolder function ----------------
/**
 * Create a new folder in the Other Bookmarks folder
 * param folderName - Name of the folder to create
 * returns Promise that resolves with the created folder object
 */
function createFolder(folderName) {
  return new Promise(function (resolve, reject) {
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      const rootNode = bookmarkTreeNodes[0];

      const otherBookmarksFolder = rootNode.children.find(
        (folder) => folder.title === "Other Bookmarks"
      );

      if (!otherBookmarksFolder) {
        return reject(new Error("Other Bookmarks folder not found 😭"));
      }

      // check if folder already exists
      const existingFolder = otherBookmarksFolder.children.find(
        (child) => child.title === folderName && !child.url
      );

      if (existingFolder) {
        // return the existing folder found
        return resolve(existingFolder);
      }

      // create a new folder, if doesn't exist
      chrome.bookmarks.create(
        {
          parentId: otherBookmarksFolder.id,
          title: folderName,
        },
        function (newFolder) {
          if (chrome.runtime.lastError) {
            return reject(new Error(chrome.runtime.lastError));
          }
          resolve(newFolder);
        }
      );
    });
  });
}

// -------------------- Moving bookmarks ------------
/**
 * Move a bookmark to a specific folder
 * param bookmarkId - ID of the bookmark to move
 * param folderId - ID of the destination folder
 * returns Promise that resolves when the bookmark is moved
 */
function moveBookmark(bookmarkId, folderId) {
  return new Promise(function (resolve, reject) {
    chrome.bookmarks.move(
      bookmarkId,
      { parentId: folderId },
      function (result) {
        if (chrome.runtime.lastError) {
          return reject(new Error(chrome.runtime.lastError));
        }
        resolve(result);
      }
    );
  });
}
// ------- export all functions -------
export { getOtherBookmarks, getAllBookmarksFlat, createFolder, moveBookmark };
