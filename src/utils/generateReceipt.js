import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generateReceiptPDF = (p, c) => {
  const doc = new jsPDF();
  
  // Configuración de colores (Inspirado en la imagen: Celeste/Azul y Gris oscuro)
  const accentColor = [0, 184, 230]; // Celeste brillante de la imagen
  const darkBg = [26, 29, 33];      // Gris oscuro casi negro
  const textColor = [60, 60, 60];

  // --- CABECERA ESTILO BANNER ---
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, 210, 40, "F");
  
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("RECIBO", 20, 25);

  // Folio y Fecha en el banner azul (como en la imagen)
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.rect(0, 40, 210, 10, "F");
  
  doc.setFontSize(10);
  doc.text(`ID Préstamo: #${p.id.toString().slice(0, 8)}`, 20, 46.5);
  const fechaHoy = new Date().toLocaleDateString('es-MX');
  doc.text(`Fecha de Emisión: ${fechaHoy}`, 140, 46.5);

  // --- INFORMACIÓN DEL CLIENTE ---
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setFontSize(11);
  doc.text("CLIENTE:", 20, 65);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.text(`${c.nombre} ${c.apellido}`, 20, 73);
  
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Teléfono: ${c.telefono || 'No registrado'}`, 20, 79);

  // --- CUADRO DE RESUMEN RÁPIDO (Similar al cuadro central de la imagen) ---
  doc.setDrawColor(230, 230, 230);
  doc.roundedRect(20, 90, 170, 25, 3, 3, "S");
  
  // Etiquetas del cuadro
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text("FECHA DE REGISTRO", 30, 97);
  doc.text("ESTADO ACTUAL", 140, 97);
  
  // Valores del cuadro
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const fechaRegistro = new Date(p.created_at).toLocaleDateString('es-MX');
  doc.text(fechaRegistro, 30, 106);
  doc.text(p.status.toUpperCase(), 140, 106);

  // --- TABLA DE DESGLOSE (Transfer Overview style) ---
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("RESUMEN DEL PRÉSTAMO", 20, 130);

  const tableBody = [
    ["Monto Original", `$ ${Number(p.monto).toLocaleString(undefined, {minimumFractionDigits: 2})}`],
    ["Intereses y Cargos", `$ ${Number(p.total_pagar - p.monto).toLocaleString(undefined, {minimumFractionDigits: 2})}`],
    ["Total a Pagar", `$ ${Number(p.total_pagar).toLocaleString(undefined, {minimumFractionDigits: 2})}`],
    ["Cuota Quincenal", `$ ${Number(p.pagos_quincenal).toLocaleString(undefined, {minimumFractionDigits: 2})}`],
    ["Plazo Contratado", `${p.quincenas} Quincenas`],
    ["Cuotas Pagadas", `${p.pagos_realizados} de ${p.quincenas}`],
    ["SALDO PENDIENTE", `$ ${Number(p.saldo_pendiente).toLocaleString(undefined, {minimumFractionDigits: 2})}`],
  ];

  autoTable(doc, {
    startY: 135,
    margin: { left: 20, right: 20 },
    body: tableBody,
    theme: 'plain', // Sin bordes pesados como en la imagen
    styles: { 
      fontSize: 10, 
      cellPadding: 4,
      textColor: [50, 50, 50]
    },
    columnStyles: {
      0: { fontStyle: 'bold', width: 100 },
      1: { halign: 'right' }
    },
    // Línea de separación después de cada fila (opcional, estilo minimal)
    didDrawCell: (data) => {
      if (data.section === 'body') {
        doc.setDrawColor(240, 240, 240);
        doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
      }
    }
  });

  // --- PIE DE PÁGINA (Nota legal y franja oscura) ---
  const finalY = 260;
  
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.setFont("helvetica", "italic");
  doc.text("Nota: Este es un documento generado por computadora y no requiere firma física.", 20, finalY);

  // Franja final decorativa
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 280, 210, 17, "F");

  // Guardar archivo
  doc.save(`Recibo_${c.nombre}_${c.apellido}_${p.id.toString().slice(0, 5)}.pdf`);
};