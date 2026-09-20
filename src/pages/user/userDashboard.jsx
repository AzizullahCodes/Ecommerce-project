import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

// Sirf layout ke liye placeholder data.
const userLinks = [
  { to: '/userDashboard', label: 'Overview', end: true },
  { to: '/user/orders', label: 'My orders' },
  { to: '/user/wishlist', label: 'Wishlist' },
  { to: '/user/addresses', label: 'Addresses' },
  { to: '/user/profile', label: 'Profile' },
];

const stats = [
  { label: 'Active orders', value: '2', note: '1 arriving this week' },
  { label: 'Wishlist', value: '9', note: 'Items saved' },
  { label: 'Addresses', value: '2', note: 'Home is the default' },
];

const orders = [
  { id: '#1042', date: '20 Sep', items: 3, total: '$84.00', status: 'pending' },
  { id: '#1031', date: '12 Sep', items: 1, total: '$29.99', status: 'shipped' },
  { id: '#1012', date: '02 Sep', items: 2, total: '$56.40', status: 'delivered' },
  { id: '#0987', date: '21 Aug', items: 4, total: '$118.00', status: 'delivered' },
];

const UserDashboard = () => {
  return (
    <DashboardLayout
      brand="MyShop"
      title="My account"
      links={userLinks}
      user={{ name: 'Your Name', role: 'Customer' }}
    >
      <section className="dash-head">
        <h2>Welcome back</h2>
        <p>Track your orders and manage your account.</p>
      </section>

      <section className="dash-stats" aria-label="Summary">
        {stats.map((s) => (
          <div className="dash-stat" key={s.label}>
            <div className="dash-stat-label">{s.label}</div>
            <div className="dash-stat-value">{s.value}</div>
            <div className="dash-stat-note">{s.note}</div>
          </div>
        ))}
      </section>

      <div className="dash-grid">
        <section className="dash-panel">
          <div className="dash-panel-head">
            <h3>Recent orders</h3>
            <span>Last 4</span>
          </div>
          <div className="dash-table-wrap" tabIndex={0}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.date}</td>
                    <td>{o.items}</td>
                    <td>{o.total}</td>
                    <td>
                      <span className={`dash-badge dash-badge--${o.status}`}>{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dash-panel">
          <div className="dash-panel-head">
            <h3>Account details</h3>
          </div>
          <dl className="dash-details">
            <div>
              <dt>Name</dt>
              <dd>Your Name</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>you@example.com</dd>
            </div>
            <div>
              <dt>Default address</dt>
              <dd>House 12, Street 4, City</dd>
            </div>
          </dl>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;