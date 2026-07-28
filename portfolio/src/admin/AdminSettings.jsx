import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Server,
  LogOut,
  AlertTriangle,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

import api from "../services/api";
import "./AdminSettings.css";


function AdminSettings() {

  const navigate = useNavigate();


  const adminEmail =
    localStorage.getItem("adminEmail") ||
    "admin@example.com";


  const adminName =
    localStorage.getItem("adminName") ||
    "Administrator";



  const token =
    localStorage.getItem("adminToken");



  const [showPasswordModal, setShowPasswordModal] =
    useState(false);



  const [passwordData, setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });



  const [message, setMessage] =
    useState("");
const [showPassword, setShowPassword] = useState({
  current: false,
  new: false,
  confirm: false,
});


  const handleLogout = () => {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminName");

    navigate("/admin/login");

  };





  const changePassword = async () => {


    if(
      passwordData.newPassword !==
      passwordData.confirmPassword
    ){

      setMessage(
        "New passwords do not match"
      );

      return;

    }



    if(
      passwordData.newPassword.length < 6
    ){

      setMessage(
        "Password must be at least 6 characters"
      );

      return;

    }



    try {


      const response = await api.put(

        "/admin/change-password",

        {
          currentPassword:
            passwordData.currentPassword,

          newPassword:
            passwordData.newPassword,
        },

        {
          headers:{
            Authorization:
              `Bearer ${token}`,
          },
        }

      );



      setMessage(
        response.data.message
      );



      setPasswordData({

        currentPassword:"",
        newPassword:"",
        confirmPassword:"",

      });



    } catch(error){


      setMessage(

        error.response?.data?.message ||
        "Something went wrong"

      );


    }


  };





  return (

    <div className="admin-settings-page">





      <div className="settings-header">


        <h1>
          Admin Settings
        </h1>


        <p>
          Manage your account, security and dashboard preferences.
        </p>


      </div>








      <div className="settings-grid">





        {/* Profile */}

        <div className="settings-card">


          <div className="card-title">


            <h2>
              Admin Profile
            </h2>


            <span>
              Account information
            </span>


          </div>





          <div className="profile-info">


            <div className="profile-avatar">

              {
                adminName
                .charAt(0)
                .toUpperCase()
              }

            </div>




            <div>

              <h3>
                {adminName}
              </h3>


              <p>
                {adminEmail}
              </p>


            </div>


          </div>


        </div>








        {/* Password */}


        <div className="settings-card">


          <div className="card-title">


            <h2>
              Password & Security
            </h2>


            <span>
              Keep your admin account secure
            </span>


          </div>





          <div className="security-item">


            <Lock size={20}/>


            <span>
              Password protection enabled
            </span>


          </div>





          <button

            className="settings-btn"

            onClick={()=>
              setShowPasswordModal(true)
            }

          >

            Change Password

          </button>


        </div>









        {/* Authentication */}


        <div className="settings-card">


          <div className="card-title">


            <h2>
              Authentication
            </h2>


            <span>
              Login protection status
            </span>


          </div>





          <div className="security-status">


            <ShieldCheck size={22}/>


            JWT Authentication Active


          </div>


        </div>









        {/* System */}


        <div className="settings-card">


          <div className="card-title">


            <h2>
              System Status
            </h2>


            <span>
              Portfolio admin health
            </span>


          </div>





          <div className="system-active">


            <Server size={18}/>


            Backend and database running normally


          </div>


        </div>







        {/* Danger Zone */}


        <div className="settings-card danger-card">


          <div className="card-title">


            <h2>
              Danger Zone
            </h2>


            <span>
              Sensitive account actions
            </span>


          </div>





          <div className="danger-content">


            <AlertTriangle size={22}/>


            <p>
              Logout will remove this admin session from this device.
            </p>


          </div>







          <button

            className="danger-btn"

            onClick={handleLogout}

          >

            <LogOut size={18}/>

            Logout Admin

          </button>



        </div>





      </div>









      {/* Change Password Modal */}


      {
        showPasswordModal && (

          <div className="modal-overlay">



            <div className="password-modal">


              <button

                className="close-modal"

                onClick={()=>{
                  setShowPasswordModal(false);
                  setMessage("");
                }}

              >

                <X size={20}/>

              </button>





              <h2>
                Change Password
              </h2>

<div className="password-field">

<input
  type={
    showPassword.current
    ? "text"
    : "password"
  }
  placeholder="Current Password"
  value={passwordData.currentPassword}
  onChange={(e)=>
    setPasswordData({
      ...passwordData,
      currentPassword:e.target.value
    })
  }
/>


<button
  type="button"
  onClick={()=>
    setShowPassword({
      ...showPassword,
      current:!showPassword.current
    })
  }
>

{
showPassword.current
?
<EyeOff size={18}/>
:
<Eye size={18}/>
}

</button>

</div>


<div className="password-field">

<input
type={
showPassword.new
?
"text"
:
"password"
}
placeholder="New Password"
value={passwordData.newPassword}
onChange={(e)=>
setPasswordData({
...passwordData,
newPassword:e.target.value
})
}
/>


<button
type="button"
onClick={()=>
setShowPassword({
...showPassword,
new:!showPassword.new
})
}
>

{
showPassword.new
?
<EyeOff size={18}/>
:
<Eye size={18}/>
}

</button>

</div>






     <div className="password-field">

<input
type={
showPassword.confirm
?
"text"
:
"password"
}
placeholder="Confirm New Password"
value={passwordData.confirmPassword}
onChange={(e)=>
setPasswordData({
...passwordData,
confirmPassword:e.target.value
})
}
/>


<button
type="button"
onClick={()=>
setShowPassword({
...showPassword,
confirm:!showPassword.confirm
})
}
>

{
showPassword.confirm
?
<EyeOff size={18}/>
:
<Eye size={18}/>
}

</button>

</div>        


              {
                message && (

                  <p className="password-message">
                    {message}
                  </p>

                )
              }







              <div className="modal-actions">


                <button

                  onClick={()=>{
                    setShowPasswordModal(false);
                    setMessage("");
                  }}

                >

                  Cancel

                </button>





                <button

                  className="settings-btn"

                  onClick={changePassword}

                >

                  Update Password

                </button>



              </div>





            </div>



          </div>

        )
      }





    </div>

  );

}


export default AdminSettings;