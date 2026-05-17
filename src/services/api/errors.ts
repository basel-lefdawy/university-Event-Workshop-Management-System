export async function parseApiError(res: Response): Promise<string> {
  const text = await res.text().catch(() => "");
  if (!text) {
    return `Request failed (${res.status})`;
  }
  try {
    const data = JSON.parse(text) as { message?: string; error?: string };
    return data.message ?? data.error ?? text;
  } catch {
    return text;
  }
}
