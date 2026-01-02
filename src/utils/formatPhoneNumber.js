export function formatPhoneNumber(phone) {
  if (!phone) return '';

  const digits = phone.replace(/\D/g, '');

  // 010xxxxxxxx (11자리) 기준
  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  // 예외 처리 (길이가 맞지 않을 경우 원본 반환)
  return phone;
}