document.getElementById("copy").addEventListener("click", function () {
  var box = document.getElementById("snippet");
  box.focus();
  box.select();
  var ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (err) {
    ok = false;
  }
  document.getElementById("copy-note").textContent = ok ? "Copied." : "Select the snippet and copy it.";
});
