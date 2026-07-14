import ExcelJS from 'exceljs';

export const exportToExcel = async (transactions: any[], initialBalance: number = 0, budget: number = 5000000) => {
  const workbook = new ExcelJS.Workbook();
  
  // ==========================================
  // SHEET 1: 📊 Summary & Analytics (Dashboard)
  // ==========================================
  const dashSheet = workbook.addWorksheet('📊 Summary & Analytics');
  
  // Basic Setup
  dashSheet.columns = [
    { key: 'A', width: 4 },
    { key: 'B', width: 25 },
    { key: 'C', width: 20 },
    { key: 'D', width: 20 },
    { key: 'E', width: 20 },
    { key: 'F', width: 4 },
  ];

  // Title
  dashSheet.mergeCells('B2', 'E3');
  const title = dashSheet.getCell('B2');
  title.value = '✨ LAPORAN KEUANGAN BON-CHAN ✨';
  title.font = { name: 'Comic Sans MS', size: 18, bold: true, color: { argb: 'FFFFFFFF' } };
  title.alignment = { vertical: 'middle', horizontal: 'center' };
  title.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF69B4' } };
  title.border = { top: { style: 'medium' }, left: { style: 'medium' }, bottom: { style: 'medium' }, right: { style: 'medium' } };

  // Calculate some static stats for JS
  let maxExpense = { name: '-', amount: 0 };
  let minExpense = { name: '-', amount: 9999999999 };
  const catTotals: Record<string, number> = {};

  transactions.forEach(t => {
    const amt = t.amount;
    const isExpense = t.type === 'expense' || !t.type;
    if (isExpense) {
      if (amt > maxExpense.amount) maxExpense = { name: t.name, amount: amt };
      if (amt < minExpense.amount) minExpense = { name: t.name, amount: amt };
      
      if (!catTotals[t.category]) catTotals[t.category] = 0;
      catTotals[t.category] += amt;
    }
  });

  if (minExpense.amount === 9999999999) minExpense.amount = 0;

  // -- Section 1: Overview --
  dashSheet.getCell('B5').value = '🎯 Ringkasan Anggaran (Budget)';
  dashSheet.getCell('B5').font = { bold: true, size: 12, color: { argb: 'FF8E44AD' } };
  
  dashSheet.getCell('B6').value = 'Budget Bulanan';
  dashSheet.getCell('C6').value = budget;
  dashSheet.getCell('C6').numFmt = '"Rp" #,##0';
  dashSheet.getCell('C6').font = { bold: true };

  dashSheet.getCell('B7').value = 'Total Pengeluaran';
  // Use SUM formula targeting Ledger sheet
  const numRows = transactions.length + 3; // +3 because ledger starts data at row 4
  dashSheet.getCell('C7').value = { formula: `SUM('📝 Ledger'!F4:F${numRows})`, result: 0 };
  dashSheet.getCell('C7').numFmt = '"Rp" #,##0';
  dashSheet.getCell('C7').font = { bold: true, color: { argb: 'FFE74C3C' } };

  dashSheet.getCell('B8').value = 'Sisa Budget';
  dashSheet.getCell('C8').value = { formula: 'C6-C7', result: 0 };
  dashSheet.getCell('C8').numFmt = '"Rp" #,##0';
  dashSheet.getCell('C8').font = { bold: true, color: { argb: 'FF27AE60' } };

  dashSheet.getCell('B9').value = 'Status';
  dashSheet.getCell('C9').value = { formula: 'IF(C8<0, "🚨 OVER BUDGET", "✅ AMAN")', result: '✅ AMAN' };
  dashSheet.getCell('C9').font = { bold: true };
  dashSheet.getCell('C9').alignment = { horizontal: 'center' };

  // Add borders to overview box
  for(let r=6; r<=9; r++) {
    ['B', 'C'].forEach(c => {
      dashSheet.getCell(`${c}${r}`).border = { top: {style:'thin'}, bottom: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };
    });
  }

  // Conditional Formatting for Status
  dashSheet.addConditionalFormatting({
    ref: 'C9:C9',
    rules: [
      { type: 'containsText', operator: 'containsText', text: 'AMAN', style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFD5F5E3' } }, font: { color: { argb: 'FF196F3D' }, bold: true } } },
      { type: 'containsText', operator: 'containsText', text: 'OVER', style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFFADBD8' } }, font: { color: { argb: 'FF943126' }, bold: true } } }
    ]
  });

  // -- Section 2: Extremes --
  dashSheet.getCell('E5').value = '🏆 Rekor Transaksi';
  dashSheet.getCell('E5').font = { bold: true, size: 12, color: { argb: 'FFD35400' } };

  dashSheet.getCell('D6').value = 'Paling Boncos 💸';
  dashSheet.getCell('E6').value = `${maxExpense.name}`;
  dashSheet.getCell('E6').font = { bold: true, color: { argb: 'FFE74C3C' } };
  dashSheet.getCell('D7').value = 'Nilai';
  dashSheet.getCell('E7').value = maxExpense.amount;
  dashSheet.getCell('E7').numFmt = '"Rp" #,##0';

  dashSheet.getCell('D8').value = 'Paling Hemat 🪙';
  dashSheet.getCell('E8').value = `${minExpense.name}`;
  dashSheet.getCell('E8').font = { bold: true, color: { argb: 'FF27AE60' } };
  dashSheet.getCell('D9').value = 'Nilai';
  dashSheet.getCell('E9').value = minExpense.amount;
  dashSheet.getCell('E9').numFmt = '"Rp" #,##0';

  for(let r=6; r<=9; r++) {
    ['D', 'E'].forEach(c => {
      dashSheet.getCell(`${c}${r}`).border = { top: {style:'thin'}, bottom: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };
      dashSheet.getCell(`${c}${r}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF5EE' } };
    });
  }

  // -- Section 3: Visual Categories (Data Bars) --
  dashSheet.getCell('B12').value = '📊 Breakdown Kategori (Visual Bar)';
  dashSheet.getCell('B12').font = { bold: true, size: 12, color: { argb: 'FF2980B9' } };
  
  const catNames = Object.keys(catTotals);
  let startRow = 13;
  
  dashSheet.getCell(`B${startRow}`).value = 'Kategori';
  dashSheet.getCell(`C${startRow}`).value = 'Total';
  dashSheet.getCell(`B${startRow}`).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  dashSheet.getCell(`C${startRow}`).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  dashSheet.getCell(`B${startRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF85C1E9' } };
  dashSheet.getCell(`C${startRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF85C1E9' } };
  
  startRow++;

  catNames.forEach((cat, idx) => {
    dashSheet.getCell(`B${startRow + idx}`).value = cat;
    
    // Formula to sumif from ledger
    dashSheet.getCell(`C${startRow + idx}`).value = { 
      formula: `SUMIF('📝 Ledger'!C:C, "${cat}", '📝 Ledger'!F:F)`, 
      result: catTotals[cat] 
    };
    dashSheet.getCell(`C${startRow + idx}`).numFmt = '"Rp" #,##0';
    
    dashSheet.getCell(`B${startRow + idx}`).border = { top: {style:'thin'}, bottom: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };
    dashSheet.getCell(`C${startRow + idx}`).border = { top: {style:'thin'}, bottom: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };
  });

  const endRow = startRow + catNames.length - 1;

  // Add Data Bar Conditional Formatting to make it look like a chart!
  if (catNames.length > 0) {
    dashSheet.addConditionalFormatting({
      ref: `C${startRow}:C${endRow}`,
      rules: [
        {
          type: 'dataBar',
          cfvo: [{ type: 'min' }, { type: 'max' }],
          color: { argb: 'FF85C1E9' },
          gradient: true,
          showValue: true,
        }
      ]
    });
  }


  // ==========================================
  // SHEET 2: 📝 Ledger
  // ==========================================
  const ledgerSheet = workbook.addWorksheet('📝 Ledger');

  ledgerSheet.mergeCells('A1', 'G1');
  const lTitle = ledgerSheet.getCell('A1');
  lTitle.value = 'Data Transaksi Detail 📋';
  lTitle.font = { name: 'Comic Sans MS', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  lTitle.alignment = { vertical: 'middle', horizontal: 'center' };
  lTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFA569BD' } };
  
  ledgerSheet.addRow([]);

  const headers = ['No', 'Tanggal', 'Kategori', 'Keterangan', 'Pemasukan', 'Pengeluaran', 'Saldo'];
  const headerRow = ledgerSheet.addRow(headers);
  
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFA569BD' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
  });

  ledgerSheet.columns = [
    { key: 'no', width: 5 },
    { key: 'tanggal', width: 15 },
    { key: 'kategori', width: 20 },
    { key: 'keterangan', width: 30 },
    { key: 'pemasukan', width: 20, style: { numFmt: '"Rp" #,##0' } },
    { key: 'pengeluaran', width: 20, style: { numFmt: '"Rp" #,##0' } },
    { key: 'saldo', width: 22, style: { numFmt: '"Rp" #,##0', font: { bold: true } } }
  ];

  let lRow = 4;
  transactions.forEach((tx, index) => {
    const isIncome = tx.type === 'income';
    const isExpense = tx.type === 'expense' || !tx.type;
    
    const row = ledgerSheet.addRow([
      index + 1,
      tx.date,
      tx.category,
      tx.name,
      isIncome ? tx.amount : 0,
      isExpense ? tx.amount : 0,
      0 // Formula Placeholder
    ]);

    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = { top: { style: 'thin', color: { argb: 'FFD7BDE2' } }, left: { style: 'thin', color: { argb: 'FFD7BDE2' } }, bottom: { style: 'thin', color: { argb: 'FFD7BDE2' } }, right: { style: 'thin', color: { argb: 'FFD7BDE2' } } };
    });

    const saldoCell = row.getCell(7); // G
    if (lRow === 4) {
      saldoCell.value = { formula: `E${lRow}-F${lRow}+${initialBalance}`, result: 0 };
    } else {
      saldoCell.value = { formula: `G${lRow - 1}+E${lRow}-F${lRow}`, result: 0 };
    }
    
    // Add color coding to income/expense
    if (isIncome && tx.amount > 0) row.getCell(5).font = { color: { argb: 'FF27AE60' } };
    if (isExpense && tx.amount > 0) row.getCell(6).font = { color: { argb: 'FFE74C3C' } };

    lRow++;
  });


  // ==========================================
  // EXPORT
  // ==========================================
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Laporan_Finansial_Bonchan.xlsx';
  a.click();
  window.URL.revokeObjectURL(url);
};
