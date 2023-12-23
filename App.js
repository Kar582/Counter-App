const { Component, useState } = React;
const { render } = ReactDOM;

// Counter Component
function Counter({ id, value, onIncrement, onDecrement }) {
  return (
    <div className="counter">
      <b>{value}</b>
      <div className="counter-controls">
        {/* Pass the id to the callback functions */}
        <button className="button is-danger is-small" onClick={() => onDecrement(id, 1)}>-</button>
        <button className="button is-success is-small" onClick={() => onIncrement(id, 1)}>+</button>
      </div>
    </div>
  );
}

function App() {
  // Use state to manage the counters
  const [counters, setCounters] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 }
  ]);

  // Callback functions to update counters independently
  const handleIncrement = (id, amount) => {
    setCounters(prevCounters => {
      return prevCounters.map(counter =>
        counter.id === id ? { ...counter, value: counter.value + amount } : counter
      );
    });
  };

  const handleDecrement = (id, amount) => {
    setCounters(prevCounters => {
      return prevCounters.map(counter =>
        counter.id === id ? { ...counter, value: counter.value - amount } : counter
      );
    });
  };

  // Calculate the total
  const total = counters.reduce((acc, counter) => acc + counter.value, 0);

  return (
    <div>
      {counters.map(counter => (
        <Counter
          key={counter.id}
          id={counter.id}
          value={counter.value}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      ))}
      <div>
        <p>Total: {total}</p>
      </div>
    </div>
  );
}

render(<App />, document.querySelector("#root"));
