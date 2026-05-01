exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const texte = body.texte || "";

    if (!texte) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Aucun texte envoyé"
        })
      };
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Résume ce texte en français, clairement et simplement :\n\n${texte}`
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: data.error?.message || "Erreur avec l'API OpenAI"
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        resume: data.output_text
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Erreur serveur"
      })
    };
  }
};
