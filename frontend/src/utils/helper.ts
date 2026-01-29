

export const generateToken = () => {
  const randomPart = Math.random().toString(36).substring(2);
  const timestamp = Date.now().toString(36);
  return `dummy-token-${randomPart}-${timestamp}`;
}
