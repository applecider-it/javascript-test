async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

loadComponent("app-header", "../layout/header.html");
loadComponent("app-footer", "../layout/footer.html");

window.App = {};
