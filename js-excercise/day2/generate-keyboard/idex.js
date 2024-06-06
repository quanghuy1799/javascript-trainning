window.addEventListener("keydown", (event) => {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = '';

    const p = document.createElement("p");
    p.textContent = `You pressed: key='${event.key}' | code='${event.code}'`;
    outputDiv.appendChild(p);
    window.scrollTo(0, document.body.scrollHeight);
}, true);