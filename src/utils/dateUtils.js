export const sortChronologically = (items, dateField = 'duration') => {
  if (!items || !Array.isArray(items)) return [];

  return [...items].sort((a, b) => {
    const parseDate = (dateStr) => {
      if (!dateStr || typeof dateStr !== 'string') return 0;
      
      // Extract the end date part if there's a hyphen (e.g. "Aug 2023 - Present")
      const parts = dateStr.split('-');
      const endDateStr = parts[parts.length - 1].trim().toLowerCase();
      
      // If currently working/studying, this should be at the very top
      if (endDateStr.includes('present') || endDateStr.includes('current')) {
        return new Date().getTime(); 
      }
      
      // Try to parse the end date string directly (handles "July 2023")
      const parsedDate = new Date(endDateStr);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.getTime();
      }
      
      // Fallback: safely extract the highest 4-digit number as a year (handles "2020-2024" or malformed text)
      const years = dateStr.match(/\d{4}/g);
      if (years && years.length > 0) {
        return new Date(Math.max(...years.map(Number)).toString()).getTime();
      }
      
      // If completely unparsable, throw to bottom
      return 0;
    };

    const dateNumA = parseDate(a[dateField]);
    const dateNumB = parseDate(b[dateField]);

    return dateNumB - dateNumA; // Descending order (newest first, oldest last)
  });
};
