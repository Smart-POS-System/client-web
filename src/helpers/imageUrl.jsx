export async function urlToFile(url, filename, mimeType) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
}
