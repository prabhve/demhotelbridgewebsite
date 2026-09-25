/**
 * WhatsApp Helper Utilities for Hotel Bridge
 * Handles phone number cleaning (with country code 91 for India),
 * safe tab navigation, and link generation for Web, API, and Universal Links.
 */

export interface WhatsAppUrls {
  cleanNumber: string;
  displayNumber: string;
  messageText: string;
  waMeUrl: string;
  apiUrl: string;
  webUrl: string;
  appUrl: string;
}

/**
 * Standardizes any phone input into an E.164 without plus sign
 * Handles standard 10-digit Indian numbers by prepending 91.
 */
export const cleanWhatsAppNumber = (phone?: string): string => {
  if (!phone) return '916307951300';
  const digits = phone.replace(/[^0-9]/g, '');

  // 10 digits (Standard Indian Mobile without country code) -> add 91
  if (digits.length === 10) {
    return `91${digits}`;
  }

  // 11 digits starting with 0 (e.g. 06307951300) -> replace 0 with 91
  if (digits.length === 11 && digits.startsWith('0')) {
    return `91${digits.slice(1)}`;
  }

  // 12 digits starting with 91 (e.g. 916307951300) -> return as-is
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits;
  }

  // 14 digits starting with 0091 -> replace 00 with nothing
  if (digits.startsWith('0091')) {
    return digits.slice(2);
  }

  return digits || '916307951300';
};

/**
 * Formats a clean number for nice display: +91 63079 51300
 */
export const formatWhatsAppDisplay = (cleanNumber: string): string => {
  if (cleanNumber.startsWith('91') && cleanNumber.length === 12) {
    const mobile = cleanNumber.slice(2);
    return `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`;
  }
  return `+${cleanNumber}`;
};

/**
 * Builds all WhatsApp endpoints for a given phone and text
 */
export const buildWhatsAppUrls = (phone: string, text: string): WhatsAppUrls => {
  const cleanNumber = cleanWhatsAppNumber(phone);
  const displayNumber = formatWhatsAppDisplay(cleanNumber);
  const trimmedText = text.trim();
  const encoded = encodeURIComponent(trimmedText);

  return {
    cleanNumber,
    displayNumber,
    messageText: trimmedText,
    waMeUrl: `https://wa.me/${cleanNumber}?text=${encoded}`,
    apiUrl: `https://api.whatsapp.com/send/?phone=${cleanNumber}&text=${encoded}`,
    webUrl: `https://web.whatsapp.com/send?phone=${cleanNumber}&text=${encoded}`,
    appUrl: `whatsapp://send?phone=${cleanNumber}&text=${encoded}`,
  };
};

/**
 * Safely opens a URL in a new browser tab without ever navigating
 * the current window or iframe (preventing "refused to connect" errors).
 */
export const safeOpenNewTab = (url: string): boolean => {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    // Append to DOM, click, and clean up
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 150);
    return true;
  } catch (e) {
    console.warn('Unable to open link in new tab automatically:', e);
    return false;
  }
};
