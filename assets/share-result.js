(function () {
var d = document;
function c(t) { return d.createElement(t); }
var st = c("style");
st.textContent = ".sa button:focus{outline:2px solid #f78166}";
d.head.appendChild(st);
function ok(el, raw) {
if (!raw) return false;
if (el.tagName === "SELECT") return !!el.querySelector("option[value='" + raw + "']");
if (!/^-?\d+(\.\d+)?$/.test(raw)) return false;
if (el.min !== "" && +raw < +el.min) return false;
if (el.max !== "" && +raw > +el.max) return false;
return true;
}
function clip(text, note) {
function done(g) { note.textContent = g ? "Copied" : "Failed"; }
function fb() {
var t = c("textarea");
t.value = text; t.style.cssText = "position:fixed;left:-9999px";
d.body.appendChild(t); t.focus(); t.select();
var g = false;
try { g = d.execCommand("copy"); } catch (e) {}
d.body.removeChild(t); done(g);
}
var cb = navigator.clipboard;
if (cb && cb.writeText) cb.writeText(text).then(function () { done(true); }, fb);
else fb();
}
function btn(label) {
var b = c("button"); b.type = "button"; b.textContent = label; return b;
}
var forms = d.querySelectorAll("form[data-share]"), i;
for (i = 0; i < forms.length; i++) (function (form) {
var bits = form.getAttribute("data-share").split(","), map = [], j, pair, out, box, b1, b2, note, href = "", plain = "";
for (j = 0; j < bits.length; j++) { pair = bits[j].split(":"); if (pair.length === 2) map.push(pair); }
out = d.getElementById(form.getAttribute("data-out"));
if (!out) return;
box = c("div"); box.className = "sa"; box.hidden = 1;
b1 = btn("Copy link to this result"); b2 = btn("Copy as text");
note = c("span"); note.style.cssText = "display:inline-block;min-height:1.2em;margin-left:.35rem";
box.appendChild(b1); box.appendChild(b2); box.appendChild(note);
out.insertAdjacentElement("afterend", box);
form.addEventListener("submit", function () {
var url = new URL(location.origin + location.pathname), k, node, lab, shown, lines = [];
if (!out.textContent) return;
box.hidden = false; note.textContent = "";
for (k = 0; k < map.length; k++) {
node = d.getElementById(map[k][0]); if (!node) continue;
url.searchParams.set(map[k][1], node.value);
lab = d.querySelector("label[for='" + map[k][0] + "']");
shown = node.tagName === "SELECT" ? node.options[node.selectedIndex].text : node.value;
lines.push((lab ? lab.textContent.replace(/\s+/g, " ").trim() : map[k][0]) + " " + shown);
}
history.replaceState(null, "", url.pathname + url.search);
href = location.href;
plain = form.getAttribute("data-name") + "\nInputs: " + lines.join(" · ") + "\nResult: " + out.textContent + "\nPlanning estimate — check the nameplate. " + href;
});
b1.addEventListener("click", function () { clip(href, note); });
b2.addEventListener("click", function () { clip(plain, note); });
var q = new URLSearchParams(location.search), used = false, el, raw;
for (j = 0; j < map.length; j++) {
if (!q.has(map[j][1])) continue;
el = d.getElementById(map[j][0]); raw = q.get(map[j][1]);
if (el && ok(el, raw)) { el.value = raw; used = true; }
}
if (used) form.dispatchEvent(new Event("submit"));
})(forms[i]);
})();
