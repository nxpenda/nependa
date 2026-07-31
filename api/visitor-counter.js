export default async function handler(req, res) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Verify environment variables are present
  if (!url || !token) {
    return res.status(500).json({ 
      error: "Upstash environment variables are missing on Vercel." 
    });
  }

  try {
    // Remove trailing slash if present to prevent broken URLs
    const baseUrl = url.replace(/\/$/, "");

    // Increment key 'visits' using Upstash REST API
    const response = await fetch(`${baseUrl}/incr/visits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    // Return the updated counter number
    return res.status(200).json({ visits: data.result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}