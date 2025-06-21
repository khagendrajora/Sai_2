import "./App.css";
import { useRef, useState } from "react";

function App() {
  const [vertical1, setVertical1] = useState([1]);
  const [vertrical2, setVertical2] = useState([]);
  const [horizontal, setHorizontal] = useState([]);
  const [screen, setScreen] = useState("vertical1");
  const timeoutRef = useRef(null);

  const handleScroll = (e) => {
    if (timeoutRef.current) return;
    const isScrollDown = e.deltaY > 0;

    timeoutRef.current = setTimeout(() => {
      if (screen === "vertical1") {
        setVertical1((prev) => {
          const next = prev.length + (isScrollDown ? 1 : -1);
          if (isScrollDown && next <= 20) return [...prev, next];
          if (!isScrollDown && next >= 1) return prev.slice(0, -1);

          if (isScrollDown && next > 20) {
            setScreen("horizontal");
          }
          return prev;
          // const next = prev.length + 1;
          //   if (next <= 20) return [...prev, next];
          //   setPhase("horizontal");
          //   return prev;
        });
      }

      if (screen === "horizontal") {
        setHorizontal((prev) => {
          const current = 21 + prev.length;
          if (isScrollDown) {
            if (current <= 30) {
              const next = current;
              const updated = [...prev, next];
              if (next === 30) setScreen("vertical2");
              return updated;
            }
          } else {
            if (prev.length > 0) return prev.slice(0, -1);
            setScreen("vertical1");
          }
          return prev;
          // const next = 21 + prev.length;
          //   const updated = next <= 30 ? [...prev, next] : prev;

          //   if (next >= 30) setPhase("vertical2");

          //   return updated;
        });
      }

      if (screen === "vertical2") {
        setVertical2((prev) => {
          const next = 31 + prev.length;

          if (isScrollDown && next <= 50) return [...prev, next];
          if (!isScrollDown && prev.length > 0) return prev.slice(0, -1);

          if (!isScrollDown && prev.length === 0) {
            setScreen("horizontal");
          }
          // if (next <= 50) return [...prev, next];

          return prev;
        });
      }

      timeoutRef.current = null;
    }, 500);
  };
  return (
    <div
      className="h-screen overflow-y-scroll p-4 space-y-4 bg-gray-100"
      onWheel={handleScroll}
    >
      {vertical1.map((num) => (
        <div
          key={num}
          className="h-32 bg-blue-200 rounded-md flex items-center justify-center text-xl font-bold"
        >
          {num}
        </div>
      ))}

      {(screen === "horizontal" || horizontal.length > 0) && (
        <div className="w-full overflow-x-auto py-4">
          <div className="flex space-x-4 w-max">
            {horizontal.map((num) => (
              <div
                key={num}
                className="w-40 h-20 bg-green-300 rounded-md flex items-center justify-center text-xl font-bold"
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      )}
      {screen === "vertical2" &&
        vertrical2.map((num) => (
          <div
            key={num}
            className="h-20 bg-blue-200 rounded-md flex items-center justify-center text-xl font-bold"
          >
            {num}
          </div>
        ))}
    </div>
  );
}

export default App;
