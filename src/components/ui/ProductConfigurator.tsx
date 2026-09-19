'use client'

import { useReducer, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

export interface ConfigOption {
  label: string
  value: string
  popular?: boolean
}

export interface ConfigGroup {
  key: string
  label: string
  options: ConfigOption[]
}

interface ProductConfiguratorProps {
  groups: ConfigGroup[]
  productName: string
  onSelectionChange: (selections: Record<string, string>) => void
}

type SelectionState = Record<string, string>
type SelectionAction = { type: 'SET'; key: string; value: string }

function selectionReducer(state: SelectionState, action: SelectionAction): SelectionState {
  if (action.type === 'SET') {
    return { ...state, [action.key]: action.value }
  }
  return state
}

export function ProductConfigurator({ groups, productName, onSelectionChange }: ProductConfiguratorProps) {
  // Initialize with first option of each group
  const initialState: SelectionState = {}
  groups.forEach((group) => {
    if (group.options.length > 0) {
      initialState[group.key] = group.options[0].value
    }
  })

  const [selections, dispatch] = useReducer(selectionReducer, initialState)

  // Notify parent on every selection change
  useEffect(() => {
    onSelectionChange(selections)
  }, [selections, onSelectionChange])

  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <div key={group.key}>
          {/* Group Label */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted mb-2.5">
            {group.label}
          </p>

          {/* Chip Row — horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
            {group.options.map((option) => {
              const isActive = selections[group.key] === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => dispatch({ type: 'SET', key: group.key, value: option.value })}
                  className={cn(
                    'shrink-0 min-h-[48px] px-4 text-base font-medium rounded-full border transition-all duration-200 active:scale-[0.97]',
                    isActive
                      ? 'bg-charcoal text-cream border-charcoal shadow-sm'
                      : 'bg-warm-white text-charcoal border-charcoal/15 hover:border-charcoal/30'
                  )}
                >
                  {option.popular && <span className="mr-1 text-gold">★</span>}
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
