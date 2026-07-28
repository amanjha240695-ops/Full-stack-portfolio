import { useEffect, useState } from "react";
import {
  CheckCircle,
  Trash2,
  Eye,
  Mail,
  Search,
  X,
} from "lucide-react";

import api from "../services/api";
import "./AdminMessages.css";


function AdminMessages() {

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [selectedMessage, setSelectedMessage] = useState(null);

  const [deleteId, setDeleteId] = useState(null);


  const token = localStorage.getItem("adminToken");


  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };



  const fetchMessages = async () => {

    try {

      setLoading(true);

      const response = await api.get(
        "/admin/messages",
        config
      );


      setMessages(
        response.data.messages || []
      );


    } catch (err) {

      console.error(err);

      setError("Unable to load messages");


    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchMessages();

  }, []);





  const markAsRead = async (id) => {

    try {

      await api.put(
        `/admin/messages/${id}/read`,
        {},
        config
      );


      fetchMessages();


    } catch (err) {

      console.error(err);

    }

  };





  const deleteMessage = async () => {

    try {

      await api.delete(
        `/admin/messages/${deleteId}`,
        config
      );


      setDeleteId(null);

      fetchMessages();


    } catch (err) {

      console.error(err);

    }

  };





  const isWithinDays = (date, days) => {

    const messageDate = new Date(date);

    const now = new Date();

    const difference =
      (now - messageDate) /
      (1000 * 60 * 60 * 24);


    return difference <= days;

  };





  const filteredMessages = messages.filter((message)=>{


    const searchText =
      search.toLowerCase();


    const matchesSearch =
      message.name.toLowerCase().includes(searchText) ||
      message.email.toLowerCase().includes(searchText) ||
      message.message.toLowerCase().includes(searchText);



    if(!matchesSearch)
      return false;



    if(filter === "read")
      return message.isRead;



    if(filter === "unread")
      return !message.isRead;



    if(filter === "today")
      return isWithinDays(message.createdAt,1);



    if(filter === "week")
      return isWithinDays(message.createdAt,7);



    return true;


  });







  if(loading){

    return (
      <div className="admin-loading">
        Loading Messages...
      </div>
    );

  }






  return (

    <div className="admin-messages">


      <div className="page-header">

        <h1>
          Messages
        </h1>

        <p>
          Manage portfolio contact messages
        </p>

      </div>





      {
        error && (

          <div className="admin-error">
            {error}
          </div>

        )
      }






      <div className="messages-toolbar">


        <div className="search-box">

          <Search size={18}/>

          <input
            type="text"
            placeholder="Search name, email or message..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>





        <div className="filter-buttons">


          {
            [
              ["all","All"],
              ["read","Read"],
              ["unread","Unread"],
              ["today","Today"],
              ["week","This Week"]
            ].map(([key,label])=>(

              <button
                key={key}
                className={
                  filter === key
                  ? "active-filter"
                  : ""
                }
                onClick={()=>setFilter(key)}
              >
                {label}
              </button>

            ))
          }


        </div>


      </div>









      {
        filteredMessages.length === 0 ? (

          <div className="empty-state">

            No messages found

          </div>


        ) : (


          <div className="messages-list">


            {
              filteredMessages.map((message)=>(


                <div
                  className="message-card"
                  key={message.id}
                >




                  <div className="message-header">


                    <div>

                      <h3>
                        {message.name}
                      </h3>


                      <p>
                        {message.email}
                      </p>

                    </div>




                    <span
                      className={
                        message.isRead
                        ? "read-status"
                        : "unread-status"
                      }
                    >

                      {
                        message.isRead
                        ? "Read"
                        : "Unread"
                      }

                    </span>


                  </div>






                  <p className="message-text">

                    {message.message.length > 120
                    ? message.message.substring(0,120)+"..."
                    : message.message}

                  </p>







                  <div className="message-actions">



                    <button
                      onClick={()=>
                        setSelectedMessage(message)
                      }
                    >

                      <Eye size={16}/>

                      View

                    </button>






                    {
                      !message.isRead && (

                        <button
                          onClick={()=>
                            markAsRead(message.id)
                          }
                        >

                          <CheckCircle size={16}/>

                          Mark Read

                        </button>

                      )
                    }






                    <button
                      className="delete-btn"
                      onClick={()=>
                        setDeleteId(message.id)
                      }
                    >

                      <Trash2 size={16}/>

                      Delete

                    </button>



                  </div>




                </div>


              ))
            }


          </div>


        )
      }









      {
        selectedMessage && (

          <div className="modal-overlay">


            <div className="message-modal">


              <button
                className="close-modal"
                onClick={()=>
                  setSelectedMessage(null)
                }
              >

                <X/>

              </button>




              <h2>
                Message Details
              </h2>



              <p>
                <strong>Name:</strong>
                {" "}
                {selectedMessage.name}
              </p>


              <p>
                <strong>Email:</strong>
                {" "}
                {selectedMessage.email}
              </p>


              <p>
                <strong>Phone:</strong>
                {" "}
                {selectedMessage.phone}
              </p>


              <p>
                <strong>Work Type:</strong>
                {" "}
                {selectedMessage.workType}
              </p>



              <p>
                <strong>Date:</strong>
                {" "}
                {
                  new Date(
                    selectedMessage.createdAt
                  ).toLocaleString()
                }
              </p>



              <p>
                <strong>Status:</strong>
                {" "}
                {
                  selectedMessage.isRead
                  ? "Read"
                  : "Unread"
                }
              </p>



              <div className="full-message">

                {selectedMessage.message}

              </div>





              <a
                className="reply-btn"
                href={`mailto:${selectedMessage.email}`}
              >

                <Mail size={16}/>

                Reply

              </a>



            </div>


          </div>

        )
      }









      {
        deleteId && (

          <div className="modal-overlay">


            <div className="delete-modal">

              <h3>
                Delete Message?
              </h3>


              <p>
                This action cannot be undone.
              </p>


              <div>


                <button
                  onClick={()=>
                    setDeleteId(null)
                  }
                >
                  Cancel
                </button>



                <button
                  className="delete-btn"
                  onClick={deleteMessage}
                >
                  Delete
                </button>


              </div>


            </div>


          </div>

        )
      }



    </div>

  );

}


export default AdminMessages;