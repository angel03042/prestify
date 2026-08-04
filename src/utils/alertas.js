import Swal from "sweetalert2";

// Configuración base
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2200,
  timerProgressBar: true,

  width: "auto",
  height: "auto",
  padding: ".55rem .75rem",

  background: "#18181b",
  color: "#fafafa",

  customClass: {
    popup: "prestify-toast",
    title: "prestify-toast-title",
    icon: "prestify-toast-icon"
  }
});

// =======================
// TOASTS
// =======================

export const toastSuccess = (mensaje) => {
  Toast.fire({
    icon: "success",
    title: mensaje,
    iconColor: "#22c55e"
  });
};

export const toastError = (mensaje) => {
  Toast.fire({
    icon: "error",
    title: mensaje,
    iconColor: "#ef4444"
  });
};

export const toastWarning = (mensaje) => {
  Toast.fire({
    icon: "warning",
    title: mensaje,
    iconColor: "#f59e0b"
  });
};

export const toastInfo = (mensaje) => {
  Toast.fire({
    icon: "info",
    title: mensaje,
    iconColor: "#3b82f6"
  });
};
// =======================
// ALERTAS
// =======================

export const alertaSuccess = (titulo, mensaje) => {
  return Swal.fire({
    icon: "success",
    title: titulo,
    text: mensaje,
    confirmButtonColor: "#16a34a",
  });
};

export const alertaError = (titulo, mensaje) => {
  return Swal.fire({
    icon: "error",
    title: titulo,
    text: mensaje,
    confirmButtonColor: "#dc2626",
  });
};

export const alertaInfo = (titulo, mensaje) => {
  return Swal.fire({
    icon: "info",
    title: titulo,
    text: mensaje,
    confirmButtonColor: "#2563eb",
  });
};

// =======================
// CONFIRMACIÓN
// =======================

export const confirmar = async (
  titulo,
  mensaje,
  textoBoton = "Sí, continuar"
) => {
  const result = await Swal.fire({
    icon: "warning",
    title: titulo,
    text: mensaje,
    showCancelButton: true,
    confirmButtonText: textoBoton,
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
  });

  return result.isConfirmed;
};

// =======================
// LOADING
// =======================

export const mostrarLoading = (mensaje = "Procesando...") => {
  Swal.fire({
    title: mensaje,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const cerrarLoading = () => {
  Swal.close();
};