import { Button } from "./components/Button/Button";

function App() {
  return (
    <main style={{ display: "flex", gap: 24, padding: 48 }}>
      <Button>Button</Button>
      <Button
        icon={
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        }
      >
        With icon
      </Button>
    </main>
  );
}

export default App;
