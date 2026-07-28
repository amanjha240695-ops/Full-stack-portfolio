import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Mail,
  CheckCircle,
  LogOut,
  Users,
  Eye,
  Settings,
} from "lucide-react";

import api from "../services/api";
import "./AdminDashboard.css";


function AdminDashboard() {


  const navigate = useNavigate();


  const [dashboard, setDashboard] = useState({
    totalMessages: 0,
    unreadMessages: 0,
    readMessages: 0,
  });


  const [recentMessages, setRecentMessages] = useState([]);


  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");



  const token = localStorage.getItem("adminToken");


  const config = {
    headers:{
      Authorization:`Bearer ${token}`,
    },
  };





  const fetchDashboard = async()=>{

    try{


      setLoading(true);



      const dashboardResponse =
        await api.get(
          "/admin/dashboard",
          config
        );



      const messagesResponse =
        await api.get(
          "/admin/messages",
          config
        );



      setDashboard(
        dashboardResponse.data.dashboard
      );



      setRecentMessages(
        messagesResponse.data.messages
        ?.slice(0,5) || []
      );



    }catch(err){

      console.error(err);

      setError(
        "Unable to load dashboard data"
      );


    }finally{

      setLoading(false);

    }

  };






  useEffect(()=>{


    if(!token){

      navigate("/admin/login");

      return;

    }


    fetchDashboard();


  },[]);







  const logout = ()=>{

    localStorage.removeItem(
      "adminToken"
    );

    navigate("/admin/login");

  };







  if(loading){

    return(
      <div className="admin-loading">
        Loading Dashboard...
      </div>
    );

  }






  const responseRate =
    dashboard.totalMessages === 0
    ? 0
    :
    Math.round(
      (
        dashboard.readMessages /
        dashboard.totalMessages
      ) * 100
    );







  return(

    <div className="admin-dashboard">



      <header className="admin-navbar">


        <div>

          <h2>
            Welcome back, Aman 👋
          </h2>

          <span>
            Manage your portfolio contacts and activity
          </span>

        </div>




        <button
          className="logout-btn"
          onClick={logout}
        >

          <LogOut size={18}/>

          Logout

        </button>


      </header>







      {
        error && (

          <div className="admin-error">
            {error}
          </div>

        )
      }







      <section className="stats-grid">



        <div className="stat-card">

          <Mail size={28}/>

          <div>

            <h3>
              Total Messages
            </h3>

            <p>
              {dashboard.totalMessages}
            </p>

          </div>

        </div>






        <div className="stat-card">


          <Users size={28}/>

          <div>

            <h3>
              Unread
            </h3>


            <p>
              {dashboard.unreadMessages}
            </p>

          </div>


        </div>






        <div className="stat-card">


          <CheckCircle size={28}/>


          <div>

            <h3>
              Read
            </h3>


            <p>
              {dashboard.readMessages}
            </p>

          </div>


        </div>







        <div className="stat-card">


          <Eye size={28}/>


          <div>

            <h3>
              Response Rate
            </h3>


            <p>
              {responseRate}%
            </p>

          </div>


        </div>





      </section>









      <section className="recent-section">


        <h3>
          Recent Messages
        </h3>




        {
          recentMessages.length === 0 ? (

            <p>
              No messages available
            </p>

          ) : (


            <div className="message-list">


              {
                recentMessages.map((message)=>(


                  <div
                    className="message-item"
                    key={message.id}
                  >


                    <div className="message-user">

                      <h4>
                        {message.name}
                      </h4>


                      <p>
                        {message.email}
                      </p>


                    </div>




                    <span
                      className={
                        message.isRead
                        ?
                        "message-status status-read"
                        :
                        "message-status status-unread"
                      }
                    >

                      {
                        message.isRead
                        ?
                        "Read"
                        :
                        "Unread"
                      }

                    </span>



                  </div>


                ))
              }


            </div>


          )
        }


      </section>








      <section className="quick-actions">


        <button
          onClick={()=>
            navigate("/admin/messages")
          }
        >

          <Mail size={18}/>

          View Messages

        </button>



        <button
          onClick={()=>
            navigate("/admin/settings")
          }
        >

          <Settings size={18}/>

          Settings

        </button>



      </section>





    </div>

  );

}


export default AdminDashboard;