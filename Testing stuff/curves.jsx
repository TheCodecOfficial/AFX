
var comp = app.project.activeItem;
//clean(1);

var win = new Window("palette", "AFX");

var startbutton = win.add("button", undefined, "Start", {name: "soivee"});
var listparams = win.add("button", undefined, "List FX Parameters");
var textbox = win.add("edittext", [0, 0, 250, 100], "", { multiline: true });
var quitbutton = win.add("button", undefined, "Cancel");

win.show();

//soivee();

function soivee(){
    saveAsTextFile(File($.fileName).path + encodeURI("/dataaaa.txt"), "test123");
}

listparams.onClick = function () {
    var s = "";
    var max = 100;
    var layer = app.project.activeItem.selectedLayers[0];
    var effect = layer.effect(1);
    for (var i = 1; i <= max; i++) {
        try {
            var name = effect.property(i).name;
            if (name != "") s += (i + ": " + name + "\n");
        } catch (e) {
            // nothing moment
        }
    }

    textbox.text = s;
}

//startbutton.onClick = soivee;

function colorpick() {
    var cp = $.colorPicker("0xFF0000");
    alert(cp);
}

function main() {

    var start = 1;
    var duration = 0.2;
    var adj = makeAdjLayer(start, start + duration, "Amognus");

    adj.property("Effects").addProperty("Transform");
    var fx = adj.effect(1);

    var low = 100;
    var high = 200;

    var iterations = 32;

    for (var i = 0; i < iterations; i++) {
        var v = i / (iterations - 1);
        v = easeInCubic(v);
        v = (high - low) * v + low;
        fx.property(4).setValueAtTime(start + duration * i / (iterations - 1), v);
    }
}

function makeAdjLayer(from, to, name) {
    var adj = comp.layers.addSolid([1, 1, 1], name, comp.width, comp.height, 1, to - from);
    adj.label = 13;
    adj.adjustmentLayer = true;
    adj.inPoint = from;

    return adj;
}

function easeInCubic(v) {
    return v * v * v;
}

function clean(n) {
    while (comp.numLayers > n) comp.layer(1).remove();
}

quitbutton.onClick = function () {
    win.close();
}

function saveAsTextFile(filePath, content) {
    var saveFile = new File(filePath);

    saveFile.encoding = "UTF8";
    saveFile.open("w");
    if (saveFile.error != "")
        return saveFile.error;

    saveFile.write(content);
    if (saveFile.error != "")
        return saveFile.error;

    saveFile.close();
    if (saveFile.error != "")
        return saveFile.error;

    return "";
}