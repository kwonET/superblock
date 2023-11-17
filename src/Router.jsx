import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./pages/game";
import Start from "./pages/start";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}
