
var comp = app.project.activeItem;
clean(1);

var win = new Window("palette", "AFX");
var g = win.add("group", undefined, "groupOne");
g.orientation = "column";

g.add("statictext", undefined, "Auto-generate common edit fx and color grading for synced edits.");
var tg = g.add("group", undefined, "susgroup");
tg.orientation = "row";

var panel = tg.add("panel", undefined, "Fade In");
var dd1 = panel.add("dropdownlist", undefined, ["None", "Basic", "Twitch"]);
dd1.selection = 1;

var panel = tg.add("panel", undefined, "Fade Out");
var dd1 = panel.add("dropdownlist", undefined, ["None", "Basic", "Twitch"]);
dd1.selection = 1;

var panel = tg.add("panel", undefined, "Transitions");
var dd1 = panel.add("dropdownlist", undefined, ["None", "Basic", "Twitch"]);
dd1.selection = 1;
var panel = tg.add("panel", undefined, "Drop");
var dd1 = panel.add("dropdownlist", undefined, ["None", "Basic", "Twitch"]);
dd1.selection = 1;
var panel = tg.add("panel", undefined, "Bursts");
var dd1 = panel.add("dropdownlist", undefined, ["None", "Basic", "Twitch"]);
dd1.selection = 1;


var sg = g.add("group", undefined, "subgroup");
var startbutton = sg.add("button", undefined, "Start");
var quitbutton = sg.add("button", undefined, "Cancel");

win.show();

startbutton.onClick = function () {

    // Fade in time 1 s
    var fadeInTime = 1;
    var complength = comp.duration;
    var opacity = comp.layer(1).opacity;
    opacity.setValueAtTime(0, 0);
    opacity.setValueAtTime(fadeInTime, 100);

    opacity.setValueAtTime(complength - fadeInTime, 100);
    opacity.setValueAtTime(complength, 0);

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