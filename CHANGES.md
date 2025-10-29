# Changes included in this patch

This file lists the concrete files added/modified and a short reason for each change.

- app/Labs/Lab4/ReduxExamples/counterSlice.ts — new: Redux slice for counter (increment/decrement actions). Initial value set to 5 to match textbook screenshot.
- app/Labs/Lab4/ReduxExamples/todoSlice.ts — new: Redux slice for todo list (add/update/delete/toggle). Uses a local id generator.
- app/Labs/Lab4/ReduxExamples/CounterRedux.tsx — new: Redux-connected counter demo; uses dispatch to increment/decrement and shows current value.
- app/Labs/Lab4/ReduxExamples/TodoListRedux.tsx — new: Redux-connected todo demo; supports add, edit/update, cancel, toggle complete, delete; uses Bootstrap card/list-group for layout and data-testid attributes for testing.
- app/Labs/Lab4/store/index.ts — modified: register counter and todo reducers alongside existing helloReducer.
- app/Labs/Lab4/ReduxExamples/page.tsx — modified: import and render new demo components under "Redux Examples".
- app/Labs/Lab4/DateStateVariable.tsx — modified: fix date formatting (use padStart and correct day/month calculation) and use value binding.
- app/globals.css — modified: add Lab4 scoped styles for counters and todo card/list visuals.
- app/Labs/Lab4/Counter.tsx — modified: apply Bootstrap button classes for Up/Down buttons.

Notes:

- No external dependencies were added; uuid usage was avoided in favor of a simple local id generator.
- Tests are not included in this patch; recommend adding reducer unit tests and a couple of RTL tests next.
