/* eslint-disable react/prop-types */
import AdminHeader from '../components/admin-header';
import SideNav from '../components/SideNav';
import './layout.css';

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      {/* Admin Header at the Top */}
      <AdminHeader />

      <div className="content">
        {/* Side Navigation Bar */}
        <SideNav />

        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
