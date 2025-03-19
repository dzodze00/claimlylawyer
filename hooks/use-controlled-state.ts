"use client"

import { useState, useEffect } from "react"

export function useControlledState<T>(controlledValue: T | undefined, defaultValue: T): [T, (value: T) => void] {
  const [internalValue, setInternalValue] = useState<T>(controlledValue !== undefined ? controlledValue : defaultValue)

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue)
    }
  }, [controlledValue])

  return [internalValue, setInternalValue]
}

