export function formatPhoneNumber(phoneNumber) {
    // Remove all non-numeric characters from the phone number
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
  
    // Use regular expressions to format the phone number
    const formattedPhoneNumber = numericPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  
    return formattedPhoneNumber;
  }