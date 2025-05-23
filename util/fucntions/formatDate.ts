/**
 * Formats a date string like WhatsApp
 * @param {string} dateString - ISO date string to format
 * @returns {string} - Formatted date string in WhatsApp style
 */
export function formatWhatsAppDate(dateString:string) {
    const date = new Date(dateString);
    const now = new Date();
    
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
    
    if (date.toDateString() === now.toDateString()) {
      return timeString;
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${timeString}`;
    }
    
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6); // 6 days ago plus today = 7 days
    
    if (date >= oneWeekAgo) {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return `${dayNames[date.getDay()]}, ${timeString}`;
    }
    
    const month = date.getMonth() + 1; // getMonth() is 0-indexed
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2); // Get last 2 digits
    
    return `${timeString}`;
  }
  
