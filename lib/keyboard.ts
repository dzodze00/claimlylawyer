import type React from "react"
export function handleKeyboardEvent(
  event: React.KeyboardEvent,
  callbacks: {
    enter?: () => void
    space?: () => void
    escape?: () => void
    arrowUp?: () => void
    arrowDown?: () => void
    arrowLeft?: () => void
    arrowRight?: () => void
    home?: () => void
    end?: () => void
    tab?: () => void
  },
) {
  switch (event.key) {
    case "Enter":
      callbacks.enter?.()
      break
    case " ":
      callbacks.space?.()
      break
    case "Escape":
      callbacks.escape?.()
      break
    case "ArrowUp":
      callbacks.arrowUp?.()
      break
    case "ArrowDown":
      callbacks.arrowDown?.()
      break
    case "ArrowLeft":
      callbacks.arrowLeft?.()
      break
    case "ArrowRight":
      callbacks.arrowRight?.()
      break
    case "Home":
      callbacks.home?.()
      break
    case "End":
      callbacks.end?.()
      break
    case "Tab":
      callbacks.tab?.()
      break
    default:
      return
  }

  // If we handled the event, prevent default behavior
  if (
    Object.keys(callbacks).some(
      (key) =>
        key === event.key.toLowerCase() ||
        (key === "space" && event.key === " ") ||
        (key === "enter" && event.key === "Enter") ||
        (key === "escape" && event.key === "Escape") ||
        (key === "arrowUp" && event.key === "ArrowUp") ||
        (key === "arrowDown" && event.key === "ArrowDown") ||
        (key === "arrowLeft" && event.key === "ArrowLeft") ||
        (key === "arrowRight" && event.key === "ArrowRight") ||
        (key === "home" && event.key === "Home") ||
        (key === "end" && event.key === "End") ||
        (key === "tab" && event.key === "Tab"),
    )
  ) {
    event.preventDefault()
  }
}

