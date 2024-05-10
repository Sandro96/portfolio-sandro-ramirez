import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';
import emailjs from '@emailjs/browser';
import linkedIn01 from '../../assets/svg/linkedIn01.svg';
import github01 from '../../assets/svg/github01.svg';
import behance01 from '../../assets/svg/behance01.svg';
import wpp01 from '../../assets/svg/wpp01.svg';

const Contact = () => {
  const { t } = useTranslation("global");

  // Definimos las claves de traducción para los campos de contacto
  const contact = {
    name: "contact.name",
    email: "contact.email",
    subject: "contact.subject",
    send: "contact.send",
    requiredFields: "contact.requiredFields", // Clave para los campos requeridos
    invalidEmail: "contact.invalidEmail", // Clave para el mensaje de email inválido
    formSubmitted: "contact.formSubmitted", // Clave para el mensaje de envío exitoso
    formError: "contact.formError" // Clave para el mensaje de error en el envío
  };

  // Referencia al formulario
  const form = useRef();

  // Función para enviar el correo electrónico
  const sendEmail = async (e) => {
    e.preventDefault();

    // Obtenemos los valores del formulario
    const formData = new FormData(form.current);
    const values = Object.fromEntries(formData.entries());

    // Expresión regular para validar el correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;

    // Objetos para manejar los mensajes de error
    const requiredFieldsError = t(contact.requiredFields);
    const errors = {};

    // Validamos los campos del formulario
    Object.entries(values).forEach(([fieldName, value]) => {
      if (value.trim() === "") {
        errors[fieldName] = requiredFieldsError;
      } else if (fieldName === "user_email" && !emailPattern.test(value)) {
        errors[fieldName] = t(contact.invalidEmail);
      }
    });

    // Si no hay errores, enviamos el formulario
    if (Object.keys(errors).length === 0) {
      try {
        await emailjs.sendForm('service_r018pj7', 'template_cfcu2t9', form.current, {
          publicKey: 'AJgd8j6cgaX-H7wgm',
        });
        // Mostramos mensaje de éxito
        toast.success(t(contact.formSubmitted));
        // Reseteamos el formulario
        form.current.reset();
        // Resetear errores aquí
        setErrors({});
      } catch (error) {
        // Mostramos mensaje de error
        toast.error(t(contact.formError));
      }
    } else {
      // Mostramos los errores de validación
      setErrors(errors);
    }
  };


  const [errors, setErrors] = useState({});

  return (
    <div className='contact bg-color'>
      <div className='container'>
        <h3>{t("navbar.contact")}</h3>
        <form ref={form} onSubmit={sendEmail} className='form'>

          <div className="form-group">
            <input type="text" placeholder={t(contact.name)} name='user_name' className='input' />
            {errors.user_name && <p className="error-message">{errors.user_name}</p>}
          </div>

          <div className="form-group">
            <input type="text" placeholder={t(contact.email)} name='user_email' className='input' />
            {errors.user_email && <p className="error-message">{errors.user_email}</p>}
          </div>

          <div className="form-group">
            <input type="text" placeholder={t(contact.subject)} name='subject' className='input' />
            {errors.subject && <p className="error-message">{errors.subject}</p>}
          </div>

          <div className="form-group">
            <textarea name='message' className='textarea' cols="30" rows="10" />
            {errors.message && <p className="error-message">{errors.message}</p>}
          </div>

          <button type='submit'>{t(contact.send)}</button>

        </form>
        <div className='social-media'>
          <a className="icon" href="https://www.linkedin.com/in/sandro-ramirez/" target="_blank" rel="noopener noreferrer"><img src={linkedIn01} alt="LinkedIn" /></a>
          <a className="icon" href="https://github.com/Sandro96" target="_blank" rel="noopener noreferrer"><img src={github01} alt="Github" /></a>
          <a className="icon" href="https://www.behance.net/sandroramirez14" target="_blank" rel="noopener noreferrer"><img src={behance01} alt="Behance" /></a>
          <a className="icon" href="https://wa.me/598094095078" target="_blank" rel="noopener noreferrer"><img src={wpp01} alt="WhatsApp" /></a>
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
        pauseOnHover />

    </div>
  );
};

export default Contact;
