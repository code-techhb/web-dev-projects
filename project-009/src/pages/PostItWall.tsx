import { useEffect, useState } from "react";
import PostIt from "../components/PostIt";

interface Note {
  id: string;
  text: string;
  color: "yellow" | "cyan" | "pink" | "orange" | "green" | "purple";
  rotation: number;
}

const INITIAL_NOTES: Note[] = [
  {
    id: "instruction-1",
    text: "Welcome to the Post-it wall! 🎉 Hit that + button to dump your thoughts...",
    color: "yellow",
    rotation: -2,
  },
  {
    id: "instruction-2",
    text: "Hover over me to delete 🗑️ Easy peasy....",
    color: "cyan",
    rotation: 1,
  },
  {
    id: "instruction-3",
    text: "Type anything! Random thoughts, reminders, to-dos, vibes... whatever 💭",
    color: "purple",
    rotation: -1,
  },
];

const PostItWall = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedData = localStorage.getItem("my-postit-wall");
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Failed to parse notes", e);
        return INITIAL_NOTES;
      }
    }
    return INITIAL_NOTES;
  });

  useEffect(() => {
    localStorage.setItem("my-postit-wall", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "my-postit-wall" && event.newValue) {
        setNotes(JSON.parse(event.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const isWallModified =
    notes.length !== INITIAL_NOTES.length ||
    notes.some(
      (note, i) => INITIAL_NOTES[i] && note.text !== INITIAL_NOTES[i].text
    );

  // ---- handler functions ----
  const colors: Array<
    "yellow" | "cyan" | "pink" | "orange" | "green" | "purple"
  > = ["yellow", "cyan", "pink", "orange", "green", "purple"];

  const addNote = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomRotation = Math.floor(Math.random() * 6) - 3;
    const newNote: Note = {
      id: Date.now().toString(),
      text: "",
      color: randomColor,
      rotation: randomRotation,
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (id: string, text: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, text } : note)));
  };

  const resetWall = () => {
    if (
      window.confirm(
        "🚨 Are you sure you want to clear all notes? This action cannot be undone!"
      )
    ) {
      localStorage.removeItem("my-postit-wall");
      setNotes(INITIAL_NOTES);
    }
  };

  const exportNotes = () => {
    const jsonString = JSON.stringify(notes, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `my-post-its-wall-${
      new Date().toISOString().split("T")[0]
    }.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ---- UI ----
  return (
    <div className="min-h-screen p-8">
      <header className="flex justify-between items-end mb-5">
        <div>
          <h1 className=" text-5xl sm:text-6xl font-bold mb-2">
            Random Thoughts 💭
          </h1>
          <p className="text-2xl font-semibold text-gray">
            Yoo, get it out of your head ....
          </p>
        </div>

        {isWallModified && (
          <div className="flex gap-8 mb-2 justify-start sm: flex-col md:flex-row">
            <button
              onClick={exportNotes}
              className=" hover:text-green-400 text-lg font-medium 
                   transition-all duration-200 hover:underline underline-offset-8"
            >
              Export Wall
            </button>

            <button
              onClick={resetWall}
              className=" hover:text-red-400 text-lg font-medium 
                   transition-all duration-200 hover:underline underline-offset-8"
            >
              Reset Wall
            </button>
          </div>
        )}
      </header>

      <button
        onClick={addNote}
        className="fixed
             bottom-8 right-6 
             md:top-8 md:bottom-auto md:right-8 
             w-14 h-14 md:w-16 md:h-16 
             bg-white rounded-full shadow-2xl
             flex items-center justify-center text-3xl md:text-4xl text-gray-600
             hover:scale-110 hover:rotate-90 active:scale-95
             transition-all duration-300 z-50 border border-gray-100"
      >
        ✚
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-4">
        {notes.map((note) => (
          <PostIt
            key={note.id}
            id={note.id}
            text={note.text}
            color={note.color}
            rotation={note.rotation}
            onUpdate={updateNote}
            onDelete={deleteNote}
          />
        ))}
      </div>
    </div>
  );
};

export default PostItWall;
