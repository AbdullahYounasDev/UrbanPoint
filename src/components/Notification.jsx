"use client";
import React, { useEffect } from "react";

const Notification = ({ message, type, onClose }) => {
  const bgColor = type === "success" ? "bg-green-400" : "bg-red-400";

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div
      className={`${bgColor} text-white p-4 rounded shadow-md absolute top-4 right-4 flex items-center justify-between w-80`}
      style={{ zIndex: 1000 }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="bg-transparent text-white w-10 text-xl font-bold"
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
