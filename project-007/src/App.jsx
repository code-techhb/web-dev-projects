import "./index.css";
import TextExpander from "./components/TextExpander";

const App = () => {
  return (
    <div className="appContainer">
      <h1
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "30px",
          fontSize: "2.5rem",
          fontWeight: "300",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Text Expander mini Project
      </h1>

      {/* Plain TextExpander */}
      <TextExpander
        collapsedNumWords={10}
        expandButtonText="show text"
        collapsed={true}
      >
        This is a longer paragraph of text that will be collapsed or expanded
        based on how many words are shown initially. This component demonstrates
        how to create a flexible text expansion feature in React with
        customizable parameters and smooth animations.
      </TextExpander>

      {/* Customized Expander: Short Article Preview */}
      <div style={{ marginTop: "24px" }}>
        <TextExpander
          collapsedNumWords={15}
          expandButtonText="Read more"
          collapseButtonText="Read less"
          collapsed={true}
          buttonColor="#e74c3c"
        >
          The art of programming is not just about writing code that works, but
          writing code that tells a story. Every function, every variable, every
          comment should contribute to a narrative that future developers
          (including yourself) can easily follow and understand. Clean code is
          not just about following conventions; it's about empathy for the next
          person who will read your work. When you write code, you're not just
          solving today's problem—you're creating a foundation for tomorrow's
          solutions. The best programmers understand that code is read far more
          often than it's written, so they optimize for readability and
          maintainability above all else.
        </TextExpander>
      </div>

      {/* Customized Expander: Product Description */}
      <div style={{ marginTop: "24px" }}>
        <TextExpander
          collapsedNumWords={8}
          expandButtonText="View details"
          collapseButtonText="Hide details"
          collapsed={true}
          buttonColor="#27ae60"
          className="box"
        >
          Introducing the revolutionary SmartWatch Pro 2025 - your ultimate
          companion for health, fitness, and productivity. This cutting-edge
          wearable device features advanced heart rate monitoring, GPS tracking,
          sleep analysis, and over 100 workout modes. With a stunning AMOLED
          display, 7-day battery life, and water resistance up to 50 meters,
          it's perfect for athletes and professionals alike. The built-in AI
          assistant helps you stay organized with smart notifications, calendar
          integration, and voice commands. Compatible with both iOS and Android
          devices, this watch seamlessly integrates into your digital lifestyle
          while helping you achieve your health and fitness goals.
        </TextExpander>
      </div>
    </div>
  );
};

export default App;
