
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
      alert("To date must be on or after From date");
      return;
    }

    setRequests([...requests, {
      id: Date.now(),
      type,
      from,
      to,
      reason,
      status: "Pending"
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
        <div className="active">▦ Dashboard</div>
        <div>▤ Apply Leave</div>
        <div>◷ Leave History</div>
      </aside>

      <main className="main">
        <header>
          <div>
            <h1>Leave Management System</h1>
            <p>Manage your leaves in one place.</p>
          </div>
          <span className="profile">Employee</span>
        </header>

        <section className="welcome">
          <h2>Welcome back!</h2>
          <p>Apply for leave and check your leave balance.</p>
        </section>

        <section className="cards">
          <div className="card">
            <p>Casual Leave</p>
            <h2>10 Days</h2>
            <small>Sample balance</small>
          </div>
          <div className="card">
            <p>Medical Leave</p>
            <h2>10 Days</h2>
            <small>Sample balance</small>
          </div>
          <div className="card">
            <p>Leave Requests</p>
            <h2>{requests.length}</h2>
            <small>Current session</small>
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
                placeholder="Enter leave reason" required />

              <button type="submit">Submit Application</button>
            </form>
          </div>

          <div className="panel">
            <h2>Recent Leave Requests</h2>
            {requests.length === 0 ? (
              <p className="empty">No leave requests yet.</p>
            ) : requests.map(r => (
              <div className="request" key={r.id}>
                <strong>{r.type}</strong>
                <p>{r.from} to {r.to}</p>
                <p>{r.reason}</p>
                <span className="status">{r.status}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
