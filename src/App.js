import { useState } from "react";
import "./App.css";

function App() {
  const [billValue, setBillValue] = useState("");
  const [serviceRates, setServiceRates] = useState(["0", "0"]);

  function handleBillChange(e) {
    setBillValue(+e.target.value);
    console.log(+e.target.value);
  }

  function handleRatesChange(e) {
    if (e.target.id === "0") setServiceRates([e.target.value, serviceRates[1]]);

    if (e.target.id === "1") setServiceRates([serviceRates[0], e.target.value]);
  }

  function handleReset() {
    setBillValue("");
    setServiceRates(["0", "0"]);
  }

  return (
    <div className="App">
      <div className="inputs-container">
        <BillInput
          billText="How much was the bill?"
          value={billValue}
          onChange={handleBillChange}
        />
        <ServiceRating
          key={1}
          id={0}
          serviceText="How did you like the service?"
          value={serviceRates}
          onChange={handleRatesChange}
        />
        <ServiceRating
          key={2}
          id={1}
          serviceText="How did your friend like the service?"
          value={serviceRates}
          onChange={handleRatesChange}
        />
      </div>
      <OutputComponent billValue={billValue} serviceRates={serviceRates} />
      <Button onClick={handleReset} />
    </div>
  );
}

function BillInput({ billText, value, onChange }) {
  return (
    <div>
      <label>{billText}</label>
      <input
        type="text"
        placeholder="Bill value..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function ServiceRating({ id, value, serviceText, onChange }) {
  return (
    <div>
      <label>{serviceText}</label>
      <select id={id} onChange={onChange} value={value[id]}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function OutputComponent({ billValue, serviceRates }) {
  const principal = +billValue;
  const tip = (principal * (+serviceRates[0] + +serviceRates[1])) / 2 / 100;
  const total = principal + tip;

  return (
    <h2>
      You pay ${total} (${principal} + ${tip} tip)
    </h2>
  );
}

function Button({ onClick }) {
  return <button onClick={onClick}>Reset</button>;
}

export default App;
