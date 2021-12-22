```mermaid
stateDiagram-v2

state SillyStateMachine {
  state AdvanceResult<<choice>>


  [*] --> Empty
  Empty --> Accumulator: begin = Accumulator.value = 0

  Accumulator --> Accumulator: accumulate = Accumulator.value += 1
  Accumulator --> AdvanceResult: advance

  AdvanceResult --> Empty: Accumulator.value < 10
  AdvanceResult --> Success: Accumulator.value >= 10

  Success --> [*]

}
```
