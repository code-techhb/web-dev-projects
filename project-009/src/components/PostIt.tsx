interface PostItProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  id: string;
  text: string;
  color: "yellow" | "cyan" | "pink" | "orange" | "green" | "purple";
  rotation: number;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

const PostIt = ({
  id,
  text,
  color,
  rotation,
  onDelete,
  onUpdate,
  ...props
}: PostItProps) => {
  const colorMap = {
    yellow: "bg-[var(--color-note-yellow)]",
    cyan: "bg-[var(--color-note-cyan)]",
    pink: "bg-[var(--color-note-pink)]",
    orange: "bg-[var(--color-note-orange)]",
    green: "bg-[var(--color-note-green)]",
    purple: "bg-[var(--color-note-purple)]",
  };

  return (
    <div
      className="group relative w-full transition-transform  hover:-translate-y-3 hover:z-10
             animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <span
        className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 bg-red-500 
                   rounded-full shadow-md z-10 transition-transform group-hover:scale-110 "
      />

      <button
        onClick={() => onDelete(id)}
        className="absolute top-2 right-2 w-8 h-8 bg-red-400/80 text-white rounded-full 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200
                   hover:bg-red-500 flex items-center justify-center text-xl font-bold z-20"
      >
        ×
      </button>

      <textarea
        id={id}
        value={text}
        onChange={(e) => onUpdate(id, e.target.value)}
        placeholder="Write something..."
        className={`${colorMap[color]} w-full aspect-square p-6 pt-10 
                    shadow-lg resize-none rounded-sm
                    focus:outline-none
                    transition-all duration-300 hover:shadow-l
                    text-xl leading-relaxed`}
        {...props}
      />
    </div>
  );
};

export default PostIt;
