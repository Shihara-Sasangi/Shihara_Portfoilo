import React from "react";
import { createRoot, type Root } from "react-dom/client";
import { AppRouter } from "./AppRouter";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Missing #root element");
}

// Dev server uses full page reload (no HMR). If this module ever re-executes without a full
// navigation, reusing the Root avoids "createRoot() on a container that already has a root".
const w = window as Window & { __PORTFOLIO_REACT_ROOT__?: Root };
let root = w.__PORTFOLIO_REACT_ROOT__;
if (!root) {
  root = createRoot(container);
  w.__PORTFOLIO_REACT_ROOT__ = root;
}

function showFatalError(message: string) {
  let el = document.getElementById("__dev_fatal_error__");
  if (!el) {
    el = document.createElement("pre");
    el.id = "__dev_fatal_error__";
    el.style.position = "fixed";
    el.style.inset = "12px";
    el.style.zIndex = "2147483647";
    el.style.padding = "12px 14px";
    el.style.borderRadius = "12px";
    el.style.background = "rgba(15, 23, 42, 0.92)";
    el.style.color = "white";
    el.style.whiteSpace = "pre-wrap";
    el.style.overflow = "auto";
    el.style.fontFamily = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    el.style.fontSize = "12px";
    document.body.appendChild(el);
  }
  el.textContent = message;
}

if (process.env.NODE_ENV !== "production") {
  window.addEventListener("error", (e) => {
    const err = (e as ErrorEvent).error;
    showFatalError(
      err instanceof Error
        ? `${err.name}: ${err.message}\n\n${err.stack || ""}`
        : `Error: ${(e as ErrorEvent).message || "Unknown error"}`,
    );
  });
  window.addEventListener("unhandledrejection", (e) => {
    const reason = (e as PromiseRejectionEvent).reason;
    showFatalError(
      reason instanceof Error
        ? `UnhandledRejection: ${reason.message}\n\n${reason.stack || ""}`
        : `UnhandledRejection: ${String(reason)}`,
    );
  });
}

root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
