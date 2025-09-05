const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const emailTemplates = {
  welcome: (data) => ({
    subject: 'Bienvenido a Rifas Doradas 🎰',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; background: #0a0a0a; color: #fff; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a0033 0%, #2d1b4e 100%); padding: 40px; border-radius: 20px; border: 2px solid #FFD700; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 48px; font-weight: bold; color: #FFD700; text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          .content { background: rgba(0,0,0,0.5); padding: 30px; border-radius: 15px; margin: 20px 0; }
          .button { display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #0a0a0a; text-decoration: none; border-radius: 10px; font-weight: bold; margin: 20px 0; box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
          .highlight { color: #FFD700; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🎰 RIFAS DORADAS 🎰</div>
          </div>
          <div class="content">
            <h2>¡Hola <span class="highlight">${data.name}</span>!</h2>
            <p>¡Bienvenido a la comunidad de ganadores de Rifas Doradas!</p>
            <p>Tu cuenta ha sido creada exitosamente. Ahora puedes:</p>
            <ul>
              <li>✨ Participar en todas nuestras rifas</li>
              <li>🎯 Seleccionar hasta 10 números por rifa</li>
              <li>💰 Ganar premios increíbles</li>
              <li>🏆 Ver el historial de ganadores</li>
            </ul>
            <p>Para verificar tu email, usa este código:</p>
            <div style="text-align: center; font-size: 24px; color: #FFD700; margin: 20px 0;">
              ${data.verificationToken}
            </div>
            <center>
              <a href="${process.env.FRONTEND_URL}/verify?token=${data.verificationToken}" class="button">
                VERIFICAR MI CUENTA
              </a>
            </center>
          </div>
          <div class="footer">
            <p>© 2024 Rifas Doradas. Todos los derechos reservados.</p>
            <p>¿Necesitas ayuda? Contáctanos: ${process.env.EMAIL_USER}</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  paymentReceived: (data) => ({
    subject: 'Comprobante Recibido - Rifas Doradas 📝',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; background: #0a0a0a; color: #fff; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a0033 0%, #2d1b4e 100%); padding: 40px; border-radius: 20px; border: 2px solid #FFD700; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 48px; font-weight: bold; color: #FFD700; text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          .content { background: rgba(0,0,0,0.5); padding: 30px; border-radius: 15px; margin: 20px 0; }
          .numbers-grid { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0; justify-content: center; }
          .number { background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #0a0a0a; padding: 10px 15px; border-radius: 8px; font-weight: bold; box-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
          .status { padding: 10px; border-radius: 10px; margin: 20px 0; text-align: center; }
          .status.pending { background: rgba(255, 102, 0, 0.2); border: 2px solid #ff6600; }
          .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🎰 RIFAS DORADAS 🎰</div>
          </div>
          <div class="content">
            <h2>¡Hola ${data.userName}!</h2>
            <p>Hemos recibido tu comprobante de pago. Aquí están los detalles:</p>
            
            <div class="status pending">
              <h3>📋 ESTADO: PENDIENTE DE VERIFICACIÓN</h3>
              <p>Nuestro equipo verificará tu pago en las próximas 24 horas</p>
            </div>
            
            <h3>Números Seleccionados:</h3>
            <div class="numbers-grid">
              ${data.numbers.map(num => `<span class="number">${String(num).padStart(3, '0')}</span>`).join('')}
            </div>
            
            <h3>Detalles del Pago:</h3>
            <ul>
              <li><strong>Método:</strong> ${data.paymentMethod}</li>
              <li><strong>Referencia:</strong> ${data.reference}</li>
              <li><strong>Monto:</strong> $${data.amount.toLocaleString('es-CO')} COP</li>
              <li><strong>Fecha:</strong> ${new Date().toLocaleString('es-CO')}</li>
            </ul>
            
            <p>Te notificaremos por email cuando tu pago sea verificado.</p>
          </div>
          <div class="footer">
            <p>© 2024 Rifas Doradas. Todos los derechos reservados.</p>
            <p>¿Necesitas ayuda? Contáctanos: ${process.env.EMAIL_USER}</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  paymentApproved: (data) => ({
    subject: '✅ Pago Aprobado - ¡Tus números están confirmados! - Rifas Doradas',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; background: #0a0a0a; color: #fff; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a0033 0%, #2d1b4e 100%); padding: 40px; border-radius: 20px; border: 2px solid #00ff41; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 48px; font-weight: bold; color: #FFD700; text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          .content { background: rgba(0,0,0,0.5); padding: 30px; border-radius: 15px; margin: 20px 0; }
          .numbers-grid { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0; justify-content: center; }
          .number { background: linear-gradient(135deg, #00ff41 0%, #00cc33 100%); color: #0a0a0a; padding: 10px 15px; border-radius: 8px; font-weight: bold; box-shadow: 0 0 10px rgba(0, 255, 65, 0.5); }
          .status { padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; }
          .status.approved { background: rgba(0, 255, 65, 0.2); border: 2px solid #00ff41; }
          .celebration { font-size: 60px; text-align: center; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🎰 RIFAS DORADAS 🎰</div>
          </div>
          <div class="content">
            <div class="celebration">🎉🎊🏆</div>
            
            <h2>¡Felicidades ${data.userName}!</h2>
            
            <div class="status approved">
              <h3>✅ PAGO APROBADO</h3>
              <p>¡Tu pago ha sido verificado y tus números están confirmados!</p>
            </div>
            
            <h3>Tus Números Confirmados:</h3>
            <div class="numbers-grid">
              ${data.numbers.map(num => `<span class="number">✓ ${String(num).padStart(3, '0')}</span>`).join('')}
            </div>
            
            <h3>Información de tu Participación:</h3>
            <ul>
              <li><strong>Rifa:</strong> ${data.raffleName}</li>
              <li><strong>Fecha del Sorteo:</strong> ${new Date(data.drawDate).toLocaleDateString('es-CO')}</li>
              <li><strong>Premio:</strong> ${data.prizeDescription}</li>
            </ul>
            
            <p style="text-align: center; font-size: 18px; color: #FFD700; margin-top: 30px;">
              <strong>¡MUCHA SUERTE EN EL SORTEO!</strong>
            </p>
            
            <p>Guarda este email como comprobante de tu participación.</p>
          </div>
          <div class="footer">
            <p>© 2024 Rifas Doradas. Todos los derechos reservados.</p>
            <p>¿Necesitas ayuda? Contáctanos: ${process.env.EMAIL_USER}</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  paymentRejected: (data) => ({
    subject: '❌ Pago Rechazado - Acción Requerida - Rifas Doradas',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; background: #0a0a0a; color: #fff; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a0033 0%, #2d1b4e 100%); padding: 40px; border-radius: 20px; border: 2px solid #ff0040; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 48px; font-weight: bold; color: #FFD700; text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          .content { background: rgba(0,0,0,0.5); padding: 30px; border-radius: 15px; margin: 20px 0; }
          .status { padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; }
          .status.rejected { background: rgba(255, 0, 64, 0.2); border: 2px solid #ff0040; }
          .reason { background: rgba(255, 102, 0, 0.1); padding: 15px; border-left: 4px solid #ff6600; margin: 20px 0; }
          .button { display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #0a0a0a; text-decoration: none; border-radius: 10px; font-weight: bold; margin: 20px 0; box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🎰 RIFAS DORADAS 🎰</div>
          </div>
          <div class="content">
            <h2>Hola ${data.userName}</h2>
            
            <div class="status rejected">
              <h3>❌ PAGO RECHAZADO</h3>
              <p>Lamentablemente, no pudimos verificar tu pago</p>
            </div>
            
            <div class="reason">
              <h3>Motivo del rechazo:</h3>
              <p>${data.reason || 'El comprobante no pudo ser verificado. Por favor, verifica los datos y vuelve a intentar.'}</p>
            </div>
            
            <h3>¿Qué puedes hacer ahora?</h3>
            <ul>
              <li>Verifica que el comprobante sea legible y completo</li>
              <li>Asegúrate de que la referencia coincida</li>
              <li>Confirma que el monto sea correcto</li>
              <li>Sube un nuevo comprobante con la información correcta</li>
            </ul>
            
            <p>Tus números seleccionados siguen reservados por 24 horas más.</p>
            
            <center>
              <a href="${process.env.FRONTEND_URL}/payment" class="button">
                SUBIR NUEVO COMPROBANTE
              </a>
            </center>
            
            <p>Si crees que esto es un error, contáctanos inmediatamente.</p>
          </div>
          <div class="footer">
            <p>© 2024 Rifas Doradas. Todos los derechos reservados.</p>
            <p>¿Necesitas ayuda? Contáctanos: ${process.env.EMAIL_USER}</p>
          </div>
        </div>
      </body>
      </html>
    `
  })
};

const sendEmail = async ({ to, subject, template, data }) => {
  try {
    const emailTemplate = emailTemplates[template];
    if (!emailTemplate) {
      throw new Error(`Template ${template} no encontrado`);
    }

    const emailContent = emailTemplate(data);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"Rifas Doradas" <${process.env.EMAIL_USER}>`,
      to,
      subject: emailContent.subject || subject,
      html: emailContent.html
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error enviando email:', error);
    throw error;
  }
};

module.exports = { sendEmail, transporter };