
import { useState } from "react";
import "./App.css";

export default function App() {
  const [type, setType] = useState("Casual Leave");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reason, setReason] = useState("");
  const [requests, setRequests] = useState([]);

  function submitLeave(e) {
    e.preventDefault();

    if (to < from) {
      alert("To date must be after From date");
      return;
    }

    setRequests([...requests, {
      id: Date.now(), type, from, to, reason
    }]);

    setFrom("");
    setTo("");
    setReason("");
    alert("Leave applied successfully!");
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>LeaveFlow</h2>
        <p>MAIN MENU</p>
        <div className="active">Dashboard</div>
        <div>Apply Leave</div>
        <div>Leave History</div>
      </aside>

      <main className="main">
        <h1>Leave Management System</h1>
        <p>Manage your leaves in one place.</p>

        <section className="cards">
          <div className="card">
            <h3>Casual Leave</h3>
            <h2>10 Days</h2>
          </div>
          <div className="card">
            <h3>Medical Leave</h3>
            <h2>10 Days</h2>
          </div>
          <div className="card">
            <h3>Total Requests</h3>
            <h2>{requests.length}</h2>
          </div>
        </section>

        <section className="content">
          <div className="panel">
            <h2>Apply for Leave</h2>
            <form onSubmit={submitLeave}>
              <label>Leave Type</label>
              <select value={type}
                onChange={e => setType(e.target.value)}>
                <option>Casual Leave</option>
                <option>Medical Leave</option>
              </select>

              <label>From Date</label>
              <input type="date" value={from}
                onChange={e => setFrom(e.target.value)}
                required />

              <label>To Date</label>
              <input type="date" value={to} min={from}
                onChange={e => setTo(e.target.value)}
                required />

              <label>Reason</label>
              <textarea value={reason}
                onChange={e => setReason(e.target.value)}
                required />

              <button type="submit">Apply Leave</button>
            </form>
          </div>

          <div className="panel">
            <h2>Leave History</h2>
            {requests.length === 0 ? <p>No requests yet.</p> :
              requests.map(r => (
                <div key={r.id} className="request">
                  <strong>{r.type}</strong>
                  <p>{r.from} to {r.to}</p>
                  <p>{r.reason}</p>
                  <span>Pending</span>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
