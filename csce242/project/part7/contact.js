const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      const data = await response.json();
      if (response.status === 200) {
        result.innerHTML = "✅ Form submitted successfully!";
      } else {
        result.innerHTML = data.message || "Submission failed.";
      }
    })
    .catch(() => {
      result.innerHTML = "Something went wrong!";
    })
    .finally(() => {
      form.reset();
      setTimeout(() => (result.innerHTML = ""), 3000);
    });
});
