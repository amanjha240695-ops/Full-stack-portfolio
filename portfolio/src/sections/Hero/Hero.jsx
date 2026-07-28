import { useState } from "react";
import "./Hero.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdClose } from "react-icons/md";
import api from "../../services/api";

const currentStatus = "open";
const status = {

  open: {
    badge: "🟢 Open for Internship",
    detail: "Open for Internship",
  },

  intern: {
    badge: "💼 Frontend Developer Intern",
    detail: "Intern at Company Name",
  },

  fulltime: {
    badge: "🏢 Frontend Developer",
    detail: "Working at Company Name",
  },

  available: {
    badge: "🚀 Open to Opportunities",
    detail: "Open to Frontend Roles",
  },

};

const Hero = () => {
  const emptyForm = {

    name: "",
    workType: "",
    email: "",
    phone: "",
    message: "",

  };

  const [showMessageBox, setShowMessageBox] = useState(false);
  const [showEmailInfo, setShowEmailInfo] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [sending, setSending] = useState(false);
  const [response, setResponse] = useState("");
  const openMessageBox = () => {
    setResponse("");
    setShowMessageBox(true);
  };

  const closeMessageBox = () => {
    setShowMessageBox(false);
   setResponse("");

  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      setResponse("");
      await api.post("/contact", formData);
      setResponse(
        "Message sent successfully!"
      );



      setFormData(emptyForm);



    } catch (error) {


      console.error(error);


      setResponse(
        "Unable to send message. Try again."
      );



    } finally {


      setSending(false);


    }

  };





  return (

    <section className="hero" id="home">


      <div className="container hero-container">


        <div className="hero-content">


          <span className="hero-badge">

            {status[currentStatus].badge}

          </span>




          <h1>

            Hi, I'm <span>Aman Kumar Jha</span>

          </h1>




          <h2>

            Frontend Developer

          </h2>




          <p className="hero-description">

            I build responsive, modern and user-friendly web applications using
            React.js, JavaScript and the MERN Stack. I enjoy turning ideas into
            clean, fast and interactive websites while continuously learning new
            technologies.

          </p>




          <div className="hero-buttons">


            <a
              href="#projects"
              className="btn btn-primary"
            >

              View Projects

            </a>

            <a
              href="CV.pdf"
              className="btn btn-outline"
              target="_blank"
              rel="noreferrer"
            >

              Resume

            </a>
            
            <button
              className="btn btn-primary"
              onClick={openMessageBox}
            >

              Message Me

            </button>


          </div>





          <div className="hero-socials">


            <a
              href="https://github.com/amanjha240695-ops"
              target="_blank"
              rel="noreferrer"
            >

              <FaGithub />

            </a>




            <a
              href="https://www.linkedin.com/in/aman-jha-917401273"
              target="_blank"
              rel="noreferrer"
            >

              <FaLinkedin />

            </a>




            <button
              className="email-message-icon"
              onClick={() => setShowEmailInfo(true)}
            >

              <MdEmail />

            </button>



          </div>


        </div>





        <div className="hero-card">


          <img
            src="https://res.cloudinary.com/dvn3f6gja/image/upload/v1774935453/Gemini_Generated_Image_laoxavlaoxavlaox_uwh6bu.png"
            alt="Aman Kumar Jha"
            className="hero-image"
          />



          <h3>

            Aman Kumar Jha

          </h3>



          <p className="role">

            Frontend Developer

          </p>




          <div className="hero-details">


            <div className="detail">

              <span>
                Location
              </span>

              <p>
                India
              </p>

            </div>




            <div className="detail">

              <span>
                Education
              </span>

              <p>
                BCA (2023–2027)
              </p>

            </div>




            <div className="detail">

              <span>
                Status
              </span>

              <p>
                {status[currentStatus].detail}
              </p>

            </div>



          </div>


        </div>


      </div>







      {/* Email Popup */}


      {
        showEmailInfo && (

          <div className="message-overlay">


            <div className="message-modal">


              <button
                className="close-message"
                onClick={() => setShowEmailInfo(false)}
              >

                <MdClose />

              </button>



              <h2>
                Contact Me
              </h2>




              <p className="email-info-text">

                📧 You can send me an email at:

              </p>




              <div className="my-email">

  <p>
    jha493815@gmail.com
  </p>

  <p>
    amanjha240695@gmail.com
  </p>

</div>



              <p className="email-info-text">

                I usually reply shortly.

              </p>

              <button
                className="urgent-message-btn"
                onClick={() => {

                  setShowEmailInfo(false);

                  setShowMessageBox(true);

                }}
              >

                Urgent? Send Message

              </button>



            </div>


          </div>

        )
      }

      {/* Message Popup */}


      {
        showMessageBox && (

          <div className="message-overlay">


            <div className="message-modal">


              <button
                className="close-message"
                onClick={closeMessageBox}
              >

                <MdClose />

              </button>




              <h2>

                Send Me A Message

              </h2>




              <form onSubmit={handleSubmit}>


                <input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />



                <input
                  name="workType"
                  placeholder="Work Type (Job / Project)"
                  value={formData.workType}
                  onChange={handleChange}
                />



                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />



                <input
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />



                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />



                <button
                  className="send-message-btn"
                  disabled={sending}
                >

                  {
                    sending
                    ? "Sending..."
                    : "Send Message"
                  }

                </button>
              </form>

              {
                response && (

                  <p className="message-response">

                    {response}

                  </p>

                )
              }



            </div>


          </div>

        )
      }



    </section>

  );

};


export default Hero;