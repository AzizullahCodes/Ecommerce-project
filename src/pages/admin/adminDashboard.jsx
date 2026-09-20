import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

// Sirf layout ke liye placeholder data. Baad mein API / localStorage se replace kar lena.
const adminLinks = [
  { to: '/adminDashboard', label: 'Overview', end: true },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/settings', label: 'Settings' },
];

const stats = [
  { label: 'Total revenue', value: '$12,840', note: '+8% from last month' },
  { label: 'Orders', value: '342', note: '18 waiting to ship' },
  { label: 'Products', value: '128', note: '6 low on stock' },
  { label: 'Customers', value: '1,024', note: '32 joined this week' },
];

const orders = [
  { id: '#1042', customer: 'Ayesha Khan', date: '20 Sep', total: '$84.00', status: 'pending' },
  { id: '#1041', customer: 'Bilal Ahmed', date: '19 Sep', total: '$132.50', status: 'shipped' },
  { id: '#1040', customer: 'Sara Malik', date: '19 Sep', total: '$47.00', status: 'delivered' },
  { id: '#1039', customer: 'Usman Ali', date: '18 Sep', total: '$210.00', status: 'delivered' },
  { id: '#1038', customer: 'Hina Raza', date: '17 Sep', total: '$63.25', status: 'cancelled' },
];

const lowStock = [
  { name: 'Canvas backpack', meta: 'Bags', qty: '3 left' },
  { name: 'Wireless earbuds', meta: 'Electronics', qty: '5 left' },
  { name: 'Ceramic mug set', meta: 'Home', qty: '4 left' },
  { name: 'Running shoes', meta: 'Footwear', qty: '2 left' },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout
      brand="MyShop"
      title="Admin dashboard"
      links={adminLinks}
      user={{ name: 'Admin', role: 'Administrator' }}
    >
      <section className="dash-head">
        <h2>Store overview</h2>
        <p>Sales, orders and stock at a glance.</p>
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
            <span>Last 5</span>
          </div>
          <div className="dash-table-wrap" tabIndex={0}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.customer}</td>
                    <td>{o.date}</td>
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
            <h3>Low stock</h3>
            <span>Restock soon</span>
          </div>
          <ul className="dash-list">
            {lowStock.map((p) => (
              <li key={p.name}>
                <span className="dash-thumb" />
                <span className="dash-list-main">
                  <span className="dash-list-name">{p.name}</span>
                  <span className="dash-list-meta">{p.meta}</span>
                </span>
                <span className="dash-list-side">{p.qty}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;