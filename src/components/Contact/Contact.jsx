import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";
import {
  AiOutlineGithub,
  AiFillLinkedin,
  AiFillBehanceSquare,
} from "react-icons/ai";

const Contact = () => {
  const { t } = useTranslation("global");

  const contact = {
    name: "contact.name",
    email: "contact.email",
    subject: "contact.subject",
    send: "contact.send",
    requiredFields: "contact.requiredFields",
    invalidEmail: "contact.invalidEmail",
    formSubmitted: "contact.formSubmitted",
    formError: "contact.formError",
    message: "contact.message",
    sending: "contact.sending",
  };

  const form = useRef();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = "https://api-send-mail-rho.vercel.app/api/send-email";

  const sendEmail = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const formData = new FormData(form.current);
    const values = Object.fromEntries(formData.entries());

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;

    const requiredFieldsError = t(contact.requiredFields);
    const errors = {};

    Object.entries(values).forEach(([fieldName, value]) => {
      if (value.trim() === "") {
        errors[fieldName] = requiredFieldsError;
      } else if (fieldName === "user_email" && !emailPattern.test(value)) {
        errors[fieldName] = t(contact.invalidEmail);
      }
    });

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const result = await response.json();
          toast.success(result.message);
          form.current.reset();
          setErrors({});
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || t(contact.formError));
        }
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        toast.error(t(contact.formError));
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(errors);
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact">
      <div className="container">
        <h3>{t("navbar.contact")}</h3>
        <form ref={form} onSubmit={sendEmail} className="form">
          <div className="form-group">
            <input
              type="text"
              placeholder={t(contact.name)}
              name="user_name"
              className="input"
            />
            {errors.user_name && (
              <p className="error-message">{errors.user_name}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder={t(contact.email)}
              name="user_email"
              className="input"
            />
            {errors.user_email && (
              <p className="error-message">{errors.user_email}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder={t(contact.subject)}
              name="subject"
              className="input"
            />
            {errors.subject && (
              <p className="error-message">{errors.subject}</p>
            )}
          </div>

          <div className="form-group">
            <textarea
              name="message"
              className="textarea"
              cols="30"
              rows="10"
              placeholder={t(contact.message)}
            />
            {errors.message && (
              <p className="error-message">{errors.message}</p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t(contact.sending) : t(contact.send)}
          </button>
        </form>
        <div className="social-media">
          <a
            href="https://www.linkedin.com/in/sandro-ramirez/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar mi perfil en LinkedIn"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://github.com/Sandro96"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar mi perfil en GitHub"
          >
            <AiOutlineGithub />
          </a>
          <a
            href="https://www.behance.net/sandroramirez14"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar mi perfil en Behance"
          >
            <AiFillBehanceSquare />
          </a>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default Contact;
