// api/visitor-counter.js
export default async function handler(req, res) {
  const { isNew } = req.query;
  const command = isNew === "true" ? "incr/nependa_visitors" : "get/nependa_visitors";

  try {
    const response = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/${command}`, {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      },
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to communicate with Upstash" });
  }
}