(function () {
  var table = document.getElementById("spec-chart");
  if (!table) return;
  var ths = table.querySelectorAll("thead th");
  var dir = 1;
  var last = -1;
  function val(td) {
    var v = td.getAttribute("data-sort");
    if (v === null || v === "") return "";
    var n = Number(v);
    if (v !== "" && !isNaN(n) && String(n) === v) return n;
    return v;
  }
  for (var i = 0; i < ths.length; i++) {
    ths[i].setAttribute("data-col", String(i));
    ths[i].addEventListener("click", function () {
      var col = Number(this.getAttribute("data-col"));
      dir = last === col ? -dir : 1;
      last = col;
      var body = table.tBodies[0];
      var rows = Array.prototype.slice.call(body.rows);
      rows.sort(function (a, b) {
        var av = val(a.cells[col]);
        var bv = val(b.cells[col]);
        if (av === "" && bv !== "") return 1;
        if (bv === "" && av !== "") return -1;
        if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
        av = String(av);
        bv = String(bv);
        if (av < bv) return -1 * dir;
        if (av > bv) return 1 * dir;
        return 0;
      });
      for (var r = 0; r < rows.length; r++) body.appendChild(rows[r]);
    });
  }
})();
