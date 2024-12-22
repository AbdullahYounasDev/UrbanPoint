/** @format */

"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import Notification from "./Notification";

const initialFormData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requiredFields = [
      formData.firstName,
      formData.lastName,
      formData.phoneNumber,
      formData.subject,
      formData.message,
    ];
    const allFieldsFilled = requiredFields.every((field) => field);

    if (!allFieldsFilled) {
      setNotification({ message: "All fields are required", type: "error" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/contact", formData);
      if (response) {
        setFormData(initialFormData);
        setNotification({
          message: "Your Data is Sended",
          type: "success",
        });
      }
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        type: "error",
      });
      console.log();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="md:w-[80%] w-full px-1 m-auto my-10 bg-white" id="contact">
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-10">
        <div className="lg:w-[50%] w-full">
          <h1 className="text-[50px] font-bold ">Get in Touch</h1>
          <p className="text-[#8b8b8a] font-extralight">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
          </p>
          <div className="flex justify-between flex-wrap lg:w-full sm:w-[70%] w-full mt-5">
            <div className="text-black font-extralight flex gap-2 justify-center items-center">
              <FontAwesomeIcon
                className="w-[40px] text-[#009DDE]"
                icon={faPhone}
              />{" "}
              +00 000 000 000
            </div>
            <div className="text-black font-extralight flex gap-2 justify-center items-center">
              <FontAwesomeIcon
                className="w-[40px] text-[#009DDE]"
                icon={faEnvelope}
              />{" "}
              Office@example.com
            </div>
          </div>
          <div className="flex justify-between flex-wrap lg:w-full sm:w-[70%] w-full mt-5">
            <div className="text-black font-extralight flex gap-2 justify-center items-center">
              <FontAwesomeIcon
                className="w-[40px] text-[#009DDE]"
                icon={faLocationDot}
              />{" "}
              Collins Street West Victoria
            </div>
            <div className="text-black font-extralight flex gap-2 justify-center items-center">
              <FontAwesomeIcon
                className="w-[40px] text-[#009DDE]"
                icon={faClock}
              />{" "}
              Mon-Sat: 9:00 - 18:00
            </div>
          </div>
        </div>

        <div className="lg:w-[50%] w-full">
          <form>
            <div className="row">
              <div className="column flex flex-col gap-2 lg:w-[250px] w-[50%]">
                <label className="font-bold">First Name</label>
                <input
                  type="text"
                  className="input"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 lg:w-[250px] w-[50%]">
                <label className="font-bold">Last Name</label>
                <input
                  type="text"
                  className="input"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="flex flex-col gap-2 lg:w-[250px] w-[50%]">
                <label className="font-bold">Phone Number</label>
                <input
                  type="number"
                  className="input"
                  value={formData.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 lg:w-[250px] w-[50%]">
                <label className="font-bold">Subject</label>
                <input
                  type="text"
                  className="input"
                  value={formData.subject}
                  name="subject"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-bold mb-3">Your Message</label>
              <textarea
                className="textarea w-full"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required></textarea>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="mt-3 bg-[#0775AC] w-full form-btn">
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default Contact;
