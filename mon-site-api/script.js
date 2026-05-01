async function envoyer(){
  const texte = document.getElementById("text").value.trim();
  const mode = document.getElementById("mode").value;
  const result = document.getElementById("result");

  if (!texte) {
    result.innerText = "⚠️ Ajoute un texte";
    return;
  }

  result.innerText = "⏳ Génération...";

  try {
    const response = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: {
        "<content-Type": "application/json"
      },
    });

    const data = await response.json();

    result.innerText = data.result;

  } catch (error) {
    result.innerText = "❌ Erreur serveur";
  }
}
fetch("/.netlify/functions/api")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });