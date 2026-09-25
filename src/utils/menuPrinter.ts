import { HotelConfig, MenuCategory, MenuItem } from '../types/hotel';

/**
 * Generates an ultra-clean, elegant, printer-friendly HTML document
 * for Hotel Bridge's Royal Kitchen Pure Vegetarian Restaurant.
 */
export function generatePrintableMenuHtml(
  hotel: HotelConfig,
  categoriesToPrint: MenuCategory[],
  filterNote: string = 'Complete Restaurant Menu'
): string {
  const hotelName = hotel.name || 'Hotel Bridge';
  const restaurantName = hotel.restaurant?.name || 'Royal Kitchen';
  const tagline = hotel.restaurant?.tagline || '100% Pure Vegetarian Restaurant & Banquets';
  const phone = hotel.primaryPhone || '+91 63079 51300';
  const whatsapp = hotel.whatsappNumber || '+91 63079 51300';
  const address = hotel.fullAddress || `${hotel.addressLine1 || ''}, ${hotel.city || 'Unnao'}, ${hotel.state || 'UP'} - ${hotel.pincode || ''}`;
  const timings = hotel.restaurant?.timing || 'Breakfast: 7:30 AM – 10:30 AM | Lunch & Dinner: 12:30 PM – 11:00 PM';

  const categoryCardsHtml = categoriesToPrint
    .map((cat) => {
      const itemsHtml = cat.items
        .map(
          (item: MenuItem) => `
          <div class="menu-item">
            <div class="item-header">
              <div class="item-name-group">
                <span class="veg-badge"><span class="veg-dot"></span></span>
                <span class="item-name">${item.name}</span>
                ${item.isChefSpecial ? '<span class="badge badge-chef">★ Chef Special</span>' : ''}
                ${item.isJainAvailable ? '<span class="badge badge-jain">🌱 Jain Avail.</span>' : ''}
              </div>
              <div class="item-dots"></div>
              <span class="item-price">₹${item.price}</span>
            </div>
            ${item.description ? `<p class="item-desc">${item.description}</p>` : ''}
          </div>
        `
        )
        .join('');

      return `
        <div class="category-card">
          <div class="category-header">
            <h3>${cat.name}</h3>
            ${cat.description ? `<span class="cat-desc">${cat.description}</span>` : ''}
          </div>
          <div class="items-grid">
            ${itemsHtml}
          </div>
        </div>
      `;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${restaurantName} Menu - ${hotelName}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1a1a1a;
      background: #fdfcfb;
      margin: 0;
      padding: 0;
      font-size: 13px;
      line-height: 1.4;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* Screen Action Bar (hidden in print) */
    .screen-actions {
      position: sticky;
      top: 0;
      z-index: 999;
      background: #1e232a;
      color: #ffffff;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .screen-actions .left-info {
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .screen-actions .btn-group {
      display: flex;
      gap: 10px;
    }
    .btn {
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 18px;
      border-radius: 6px;
      border: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 0.2s;
    }
    .btn-print {
      background: #c5963b;
      color: #ffffff;
    }
    .btn-print:hover {
      background: #ad802c;
    }
    .btn-close {
      background: #374151;
      color: #f3f4f6;
    }
    .btn-close:hover {
      background: #4b5563;
    }

    /* Page Container */
    .menu-sheet {
      max-width: 900px;
      margin: 24px auto;
      background: #ffffff;
      padding: 32px 36px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.06);
      border: 1px solid #e5dfd5;
      border-radius: 4px;
    }

    /* Header styling */
    .menu-header {
      text-align: center;
      border-bottom: 2px solid #c5963b;
      padding-bottom: 18px;
      margin-bottom: 20px;
      position: relative;
    }
    .hotel-name {
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #785317;
      margin-bottom: 4px;
    }
    .restaurant-title {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 32px;
      font-weight: bold;
      color: #1a1a1a;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }
    .veg-highlight {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      padding: 3px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .hotel-meta {
      font-size: 12px;
      color: #555555;
      line-height: 1.5;
    }
    .hotel-meta span {
      display: inline-block;
      margin: 0 6px;
    }

    /* Notice legend */
    .menu-legend {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fbf9f6;
      border: 1px dashed #d5cabe;
      border-radius: 6px;
      padding: 8px 14px;
      margin-bottom: 24px;
      font-size: 11px;
      color: #666666;
    }
    .legend-badges {
      display: flex;
      gap: 14px;
      align-items: center;
    }

    /* Category Cards */
    .category-card {
      margin-bottom: 24px;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .category-header {
      border-bottom: 1.5px solid #d5cabe;
      padding-bottom: 5px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .category-header h3 {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 18px;
      font-weight: bold;
      color: #785317;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }
    .category-header .cat-desc {
      font-size: 11px;
      font-style: italic;
      color: #777777;
    }

    /* Items Layout (2-columns) */
    .items-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 24px;
      row-gap: 12px;
    }
    .menu-item {
      break-inside: avoid;
      page-break-inside: avoid;
      padding: 3px 0;
    }
    .item-header {
      display: flex;
      align-items: baseline;
      width: 100%;
    }
    .item-name-group {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
      max-width: 78%;
    }
    .item-name {
      font-size: 13px;
      font-weight: 600;
      color: #1a1a1a;
    }
    .item-dots {
      flex: 1;
      border-bottom: 1px dotted #bbb;
      margin: 0 6px;
      height: 1px;
    }
    .item-price {
      font-size: 13px;
      font-weight: 700;
      color: #785317;
      white-space: nowrap;
    }
    .item-desc {
      font-size: 11px;
      color: #666666;
      margin-top: 2px;
      padding-left: 18px;
      line-height: 1.35;
    }

    /* Veg Indicator */
    .veg-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 12px;
      height: 12px;
      border: 1.2px solid #16a34a;
      border-radius: 2px;
      padding: 1px;
      flex-shrink: 0;
    }
    .veg-dot {
      width: 6px;
      height: 6px;
      background: #16a34a;
      border-radius: 50%;
    }

    /* Badges */
    .badge {
      font-size: 9px;
      padding: 1px 5px;
      border-radius: 3px;
      font-weight: 600;
      letter-spacing: 0.2px;
    }
    .badge-chef {
      background: #fef3c7;
      color: #92400e;
    }
    .badge-jain {
      background: #ecfdf5;
      color: #065f46;
    }

    /* Footer */
    .menu-footer {
      margin-top: 30px;
      border-top: 1.5px solid #c5963b;
      padding-top: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #666666;
      break-inside: avoid;
    }

    /* Print Stylesheet */
    @media print {
      .screen-actions {
        display: none !important;
      }
      body {
        background: #ffffff !important;
        color: #000000 !important;
      }
      .menu-sheet {
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        box-shadow: none !important;
      }
      @page {
        size: A4 portrait;
        margin: 10mm 10mm 12mm 10mm;
      }
      .category-card {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
      .menu-item {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
    }
  </style>
</head>
<body>
  <!-- Action Bar on Screen -->
  <div class="screen-actions">
    <div class="left-info">
      <strong>${restaurantName} • ${hotelName}</strong>
      <span>|</span>
      <span>${filterNote} (${categoriesToPrint.reduce((acc, c) => acc + c.items.length, 0)} Items)</span>
    </div>
    <div class="btn-group">
      <button class="btn btn-print" onclick="window.print()">
        🖨️ Print / Save as PDF
      </button>
      <button class="btn btn-close" onclick="window.close()">
        ✕ Close
      </button>
    </div>
  </div>

  <!-- Menu Document -->
  <div class="menu-sheet">
    <!-- Header -->
    <header class="menu-header">
      <div class="hotel-name">${hotelName}</div>
      <h1 class="restaurant-title">${restaurantName}</h1>
      <div class="veg-highlight">
        <span class="veg-badge"><span class="veg-dot"></span></span>
        ${tagline}
      </div>
      <div class="hotel-meta">
        <div>${address}</div>
        <div>
          <span>📞 Phone / Room Service: ${phone}</span>
          <span>•</span>
          <span>💬 WhatsApp: ${whatsapp}</span>
          <span>•</span>
          <span>⏰ ${timings}</span>
        </div>
      </div>
    </header>

    <!-- Legend -->
    <div class="menu-legend">
      <div class="legend-badges">
        <span><span class="veg-badge"><span class="veg-dot"></span></span> 100% Pure Vegetarian</span>
        <span><span class="badge badge-jain">🌱 Jain Available</span> Custom preparation without onion & garlic</span>
        <span><span class="badge badge-chef">★ Chef Special</span> House Signature</span>
      </div>
      <div><strong>Tariff Card</strong></div>
    </div>

    <!-- Categories -->
    <div class="categories-container">
      ${categoryCardsHtml}
    </div>

    <!-- Footer -->
    <footer class="menu-footer">
      <div>
        <span>• Taxes & packing extra as applicable</span>
        <span style="margin-left: 12px">• Room delivery available for hotel guests (Dial 9)</span>
      </div>
      <div>
        <strong>Hotel Bridge • Royal Kitchen</strong>
      </div>
    </footer>
  </div>

  <script>
    // Auto-trigger print dialog after small rendering delay if requested
    window.addEventListener('DOMContentLoaded', function() {
      // Allow user to see toolbar; let them click Print or press Ctrl+P
    });
  </script>
</body>
</html>`;
}

/**
 * Safely opens the printable menu in a clean new tab/window.
 * This completely avoids iframe restrictions, popup clipping, and dark theme bleed.
 */
export function openPrintableMenuWindow(
  hotel: HotelConfig,
  categoriesToPrint: MenuCategory[],
  filterNote?: string
): boolean {
  try {
    const html = generatePrintableMenuHtml(hotel, categoriesToPrint, filterNote);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);

    const printWin = window.open(blobUrl, '_blank', 'noopener,noreferrer');
    if (printWin) {
      // Trigger print after slight delay once blob loads
      setTimeout(() => {
        try {
          printWin.focus();
        } catch {
          // ignore focus error
        }
      }, 500);
      return true;
    }
  } catch (e) {
    console.warn('Failed to open blob print window, falling back to direct write:', e);
  }

  // Fallback if Blob URL blocked
  try {
    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(generatePrintableMenuHtml(hotel, categoriesToPrint, filterNote));
      printWin.document.close();
      printWin.focus();
      return true;
    }
  } catch (err) {
    console.error('Failed to open printable menu window:', err);
  }

  return false;
}
