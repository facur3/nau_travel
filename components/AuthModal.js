"use client";
import supabase from '../lib/supabaseClient';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [okMsg, setOkMsg] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setOkMsg('');
    setLoading(true);

    try {
      if (activeTab === 'signup') {
        // validación simple
        if (!formData.email || !formData.password) {
          setErrorMsg('Completa email y contraseña.');
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setErrorMsg('Las contraseñas no coinciden.');
          return;
        }

        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { firstName: formData.firstName, lastName: formData.lastName }
          }
        });

        if (error) throw error;

        setOkMsg('Cuenta creada. Revisa tu email para confirmar.');
        // opcional: limpiar y/o cerrar
        // onClose();
        // setFormData({ email:'', password:'', confirmPassword:'', firstName:'', lastName:'' });
      } else {
        // LOGIN
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (error) throw error;

        setOkMsg('¡Bienvenido!');
        onClose(); // cerrar modal al entrar
      }
    } catch (err) {
      setErrorMsg(err.message || 'Ocurrió un error. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setErrorMsg('');
    setOkMsg('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
      // Supabase redirige automáticamente al flujo OAuth; no hace falta más acá.
    } catch (err) {
      setErrorMsg(err.message || 'No se pudo iniciar con proveedor.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative w-full max-h-[95vh] sm:max-w-lg bg-white sm:rounded-3xl shadow-2xl overflow-y-auto"
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-200 z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Header */}
            <div className="pt-12 pb-8 px-6 sm:px-8">
              <div className="text-center mb-8">
                <motion.div 
                  className="flex items-center justify-center space-x-3 mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                  <span className="text-3xl font-bold text-black">
                    NAU TRAVEL
                  </span>
                </motion.div>
                <motion.p 
                  className="text-gray-600 text-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {activeTab === 'login' ? 'Bienvenido de vuelta' : 'Únete a nuestra comunidad viajera'}
                </motion.p>
              </div>

              {/* Modern Tab Navigation */}
              <div className="relative bg-gray-100 rounded-2xl p-2 mb-8">
                <motion.div
                  className="absolute top-2 bottom-2 bg-white rounded-xl shadow-md"
                  initial={false}
                  animate={{
                    left: activeTab === 'login' ? '8px' : '50%',
                    right: activeTab === 'login' ? '50%' : '8px'
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30,
                    mass: 0.8
                  }}
                />
                <div className="relative z-10 grid grid-cols-2 gap-2">
                  <motion.button
                    onClick={() => setActiveTab('login')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`py-3 px-2 sm:px-6 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-200 ${
                      activeTab === 'login'
                        ? 'text-black'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Iniciar Sesión
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveTab('signup')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`py-3 px-2 sm:px-6 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-200 ${
                      activeTab === 'signup'
                        ? 'text-black'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Registrarse
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Form Container with Animation */}
            <div className="px-6 sm:px-8 pb-8">
              <AnimatePresence mode="wait">
                <motion.form
                  key={activeTab}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, x: activeTab === 'login' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeTab === 'login' ? 20 : -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  {activeTab === 'signup' && (
                    <motion.div 
                      className="grid grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          Nombre
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                          placeholder="Juan"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Apellido
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                          placeholder="Pérez"
                        />
                      </div>
                    </motion.div>
                  )}

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: activeTab === 'signup' ? 0.2 : 0.1 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      placeholder="tu@email.com"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: activeTab === 'signup' ? 0.3 : 0.2 }}
                  >
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                    />
                  </motion.div>

                  {activeTab === 'signup' && (
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirmar Contraseña
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                        placeholder="••••••••"
                      />
                    </motion.div>
                  )}

                  {activeTab === 'login' && (
                    <motion.div 
                      className="flex justify-end"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <button
                        type="button"
                        onClick={async () => {
                          setErrorMsg('');
                          setOkMsg('');
                          if (!formData.email) {
                            setErrorMsg('Escribe tu email para enviarte el enlace.');
                            return;
                          }
                          const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
                            redirectTo: window.location.origin + '/reset-password' // crea esta ruta si querés
                          });
                          if (error) setErrorMsg(error.message);
                          else setOkMsg('Te enviamos un enlace para restablecer tu contraseña.');
                        }}
                        className="text-sm text-gray-600 hover:text-black transition-colors duration-200 font-medium"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: activeTab === 'signup' ? 0.5 : 0.4 }}
                    className={`w-full ${loading ? 'opacity-70 cursor-not-allowed' : ''} bg-black hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl`}
                  >
                    {loading ? 'Procesando...' : (activeTab === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta')}
                  </motion.button>
                  {errorMsg && (
                    <p className="mt-4 text-sm text-red-600 text-center">{errorMsg}</p>
                  )}
                  {okMsg && (
                    <p className="mt-4 text-sm text-green-600 text-center">{okMsg}</p>
                  )}
                </motion.form>
              </AnimatePresence>

              {/* Social Login */}
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center mb-6">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="px-4 text-sm text-gray-500 font-medium">O continúa con</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <motion.button
                    onClick={() => handleSocialLogin('google')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={() => handleSocialLogin('facebook')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200"
                  >
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={() => handleSocialLogin('apple')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200"
                  >
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C8.396 0 8.025.044 7.333.236 4.378 1.027 2.407 3.252 2.407 6.5c0 3.047 2.27 5.604 5.314 5.604.876 0 1.699-.2 2.416-.567 1.296-.664 2.176-1.912 2.176-3.378 0-1.063-.39-2.025-1.025-2.754-.637-.729-1.517-1.192-2.516-1.192-.988 0-1.88.463-2.516 1.192C5.621 6.134 5.23 7.096 5.23 8.159c0 1.466.88 2.714 2.176 3.378.717.367 1.54.567 2.416.567 3.044 0 5.314-2.557 5.314-5.604C15.136 3.252 13.165 1.027 10.21.236 9.518.044 9.147 0 12.017 0z"/>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>

              {/* Terms */}
              {activeTab === 'signup' && (
                <motion.p 
                  className="mt-6 text-xs text-gray-500 text-center leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Al crear una cuenta, aceptas nuestros{' '}
                  <a href="#" className="text-black hover:underline font-medium">
                    Términos de Servicio
                  </a>{' '}
                  y{' '}
                  <a href="#" className="text-black hover:underline font-medium">
                    Política de Privacidad
                  </a>
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
