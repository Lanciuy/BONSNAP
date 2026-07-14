import ExcelJS from 'exceljs';

export const exportToExcel = async (transactions: any[], initialBalance: number = 0) => {
  // Create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Buku Kas');

  // Add Cute Title
  worksheet.mergeCells('A1', 'F1');
  const titleCell = worksheet.getCell('A1');
  titleCell.value = '🌸 Buku Kas Bon-chan! 🌸';
  titleCell.font = { name: 'Comic Sans MS', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
  titleCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFF69B4' } // Hot Pink
  };

  // Leave a blank row
  worksheet.addRow([]);

  // Define Headers
  const headers = ['No', 'Tanggal', 'Kategori', 'Keterangan', 'Pemasukan', 'Pengeluaran', 'Saldo'];
  const headerRow = worksheet.addRow(headers);
  
  // Style Headers
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF69B4' } // Hot Pink
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFFF69B4' } },
      left: { style: 'thin', color: { argb: 'FFFF69B4' } },
      bottom: { style: 'thin', color: { argb: 'FFFF69B4' } },
      right: { style: 'thin', color: { argb: 'FFFF69B4' } }
    };
  });

  // Set Column Widths
  worksheet.columns = [
    { key: 'no', width: 5 },
    { key: 'tanggal', width: 15 },
    { key: 'kategori', width: 20 },
    { key: 'keterangan', width: 25 },
    { key: 'pemasukan', width: 18, style: { numFmt: '"Rp" #,##0' } },
    { key: 'pengeluaran', width: 18, style: { numFmt: '"Rp" #,##0' } },
    { key: 'saldo', width: 20, style: { numFmt: '"Rp" #,##0', font: { bold: true } } }
  ];

  // Initial Balance Row (optional, assuming 0 for now, or just start formulas)
  let currentRow = 4;

  // Add Data Rows
  transactions.forEach((tx, index) => {
    const row = worksheet.addRow([
      index + 1,
      tx.date,
      tx.category,
      tx.name,
      tx.type === 'income' ? tx.amount : 0,
      tx.type === 'expense' || !tx.type ? tx.amount : 0, // default mock transactions are expenses
      0 // Placeholder for formula
    ]);

    // Apply Borders to data cells
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFFFC0CB' } }, // Pink border
        left: { style: 'thin', color: { argb: 'FFFFC0CB' } },
        bottom: { style: 'thin', color: { argb: 'FFFFC0CB' } },
        right: { style: 'thin', color: { argb: 'FFFFC0CB' } }
      };
    });

    // Add Formula for Saldo
    const saldoCell = row.getCell(7); // Column G
    if (currentRow === 4) {
      // First row saldo = Pemasukan - Pengeluaran + initialBalance
      saldoCell.value = { formula: `E${currentRow}-F${currentRow}+${initialBalance}`, result: 0 };
    } else {
      // Subsequent row saldo = Previous Saldo + Current Pemasukan - Current Pengeluaran
      saldoCell.value = { formula: `G${currentRow - 1}+E${currentRow}-F${currentRow}`, result: 0 };
    }

    currentRow++;
  });

  // Generate and Download File
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Buku_Kas_Bonchan.xlsx';
  a.click();
  window.URL.revokeObjectURL(url);
};
