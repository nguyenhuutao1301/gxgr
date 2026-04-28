export function generateRandomUsernames(count: number): string[] {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const usernames = new Set<string>();

  while (usernames.size < count) {
    const usernameLength = Math.floor(Math.random() * 6) + 5; // độ dài từ 5–10 ký tự
    let name = "";
    for (let i = 0; i < usernameLength; i++) {
      name += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    usernames.add(name); // Set đảm bảo không trùng
  }

  return Array.from(usernames);
}
