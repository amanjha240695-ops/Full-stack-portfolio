import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  X,
} from "lucide-react";

import "./AdminSidebar.css";


function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}) {


  const closeSidebar = () => {

    if (setSidebarOpen) {

      setSidebarOpen(false);

    }

  };



  return (

    <aside
      className={
        sidebarOpen
        ? "admin-sidebar open"
        : "admin-sidebar"
      }
    >



      <div className="sidebar-top">


        <div className="sidebar-logo">

          <h2>
            Portfolio
          </h2>

          <span>
            Admin Panel
          </span>

        </div>




        <button
          className="sidebar-close"
          onClick={closeSidebar}
        >

          <X size={22}/>

        </button>


      </div>







      <nav className="sidebar-menu">


        <NavLink
          to="/admin/dashboard"
          onClick={closeSidebar}
          className={({isActive}) =>
            isActive
            ? "sidebar-link active"
            : "sidebar-link"
          }
        >

          <LayoutDashboard size={20}/>

          Dashboard

        </NavLink>






        <NavLink
          to="/admin/messages"
          onClick={closeSidebar}
          className="sidebar-link"
        >

          <MessageSquare size={20}/>

          Messages

        </NavLink>




<NavLink
  to="/admin/blogs"
  onClick={closeSidebar}
  className={({isActive}) =>
    isActive
    ? "sidebar-link active"
    : "sidebar-link"
  }
>

  <FileText size={20}/>

  Blogs

</NavLink>



        <NavLink
          to="/admin/settings"
          onClick={closeSidebar}
          className="sidebar-link"
        >

          <Settings size={20}/>

          Settings

        </NavLink>


      </nav>



    </aside>

  );

}
export default AdminSidebar;