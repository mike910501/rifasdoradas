import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const PaymentSupportSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: ''
  });

  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: ''
    });
    setSelectedFile(null);
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file) => {
    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Formato de archivo no válido. Solo se permiten JPG, PNG y PDF.');
      return;
    }

    // Validar tamaño (5MB máximo)
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes
    if (file.size > maxSize) {
      toast.error('El archivo es demasiado grande. Máximo 5MB.');
      return;
    }

    setSelectedFile(file);
    toast.success('Archivo seleccionado correctamente');
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isFormValid = () => {
    return formData.fullName.trim() && 
           formData.phone.trim() && 
           formData.email.trim() && 
           selectedFile;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setIsLoading(true);

    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Comprobante enviado exitosamente. Te contactaremos pronto.');
      handleHideForm();
    } catch (error) {
      toast.error('Error al enviar el comprobante. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="payment-support-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">📤 ENVIAR SOPORTE DE PAGO</h2>
          <p className="section-subtitle">Sube tu comprobante de manera segura y rápida</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.button
              key="trigger-button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 12px 35px rgba(37, 99, 235, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="upload-trigger-btn"
              onClick={handleShowForm}
            >
              📎 Subir Comprobante de Pago
            </motion.button>
          ) : (
            <motion.div
              key="form-container"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="upload-form-container active"
            >
              <form ref={formRef} className="upload-form" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h3 className="form-title">Información del Pago</h3>
                  <p className="form-subtitle">Completa los datos para procesar tu comprobante</p>
                </div>

                <div className="form-group">
                  <label className="form-label">Nombre Completo *</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="Ej: Juan Pérez"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Número de Celular *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="Ej: +57 300 123 4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Correo Electrónico *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Ej: correo@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Comprobante de Pago *</label>
                  <div
                    className={`file-upload-area ${dragActive ? 'dragover' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="upload-icon">📎</span>
                    <div className="upload-text">
                      {dragActive 
                        ? "Suelta tu comprobante aquí" 
                        : "Arrastra tu comprobante aquí o haz clic para seleccionar"
                      }
                    </div>
                    <div className="upload-hint">Formatos: JPG, PNG, PDF (Max: 5MB)</div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileInputChange}
                      style={{ display: 'none' }}
                    />
                  </div>

                  {selectedFile && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="file-preview active"
                    >
                      <div className="file-info">
                        <div className="file-name">{selectedFile.name}</div>
                        <div className="file-size">{formatFileSize(selectedFile.size)}</div>
                      </div>
                      <button
                        type="button"
                        className="remove-file"
                        onClick={removeFile}
                      >
                        ❌
                      </button>
                    </motion.div>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={!isFormValid() || isLoading}
                  >
                    {isLoading ? '⏳ Enviando...' : '✅ Enviar Comprobante'}
                  </button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={handleHideForm}
                    disabled={isLoading}
                  >
                    ❌ Cancelar
                  </button>
                </div>

                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="loading-overlay active"
                    >
                      <div className="loading-spinner"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PaymentSupportSection;