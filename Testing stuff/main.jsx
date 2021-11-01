
var comp = app.project.activeItem;

//makeAdjLayer(1, 5, "hello mario");

clean(2);

var bpm = 140;
var bps = bpm / 60;
var spb = 1 / bps;

var offset = getDropTime();

/*for (var i = 0; i < 8; i++) {
    var time = offset + (i * 8) * spb;
    makeAdjLayer(time - 0.2, time + 0.2, "BEAT " + i);
}*/

var adj = makeAdjLayer(1, 2, "tiwttchy");
var twitchy = File("Twitchy.ffx");

var win = new Window("palette", "PRESET");
var button = win.add("button", undefined, "Apply Preset");
win.show();

button.onClick = function(){
    comp.time = 1;
    adj.selected = true;
    adj.applyPreset(twitchy);
}

function makeAdjLayer(from, to, name) {
    var adj = comp.layers.addSolid([1, 1, 1], name, comp.width, comp.height, 1, to - from);
    adj.label = 13;
    adj.adjustmentLayer = true;
    adj.inPoint = from;

    return adj;

    /*adj.property("Effects").addProperty("Deep Glow");
    var fx = adj.effect(1);
    fx.property(2).setValueAtTime(from, 0);
    fx.property(2).setValueAtTime(from+0.2, 0.5);
    fx.property(2).setValueAtTime(from+0.4, 0);

    adj.property("Effects").addProperty("Transform");
    var fx2 = adj.effect(2);
    fx2.property(4).setValueAtTime(from, 100);
    fx2.property(4).setValueAtTime(from+0.2, 150);
    fx2.property(4).setValueAtTime(from+0.4, 100);*/
}

function getDropTime() {
    var marker = comp.layer(1).property("Marker");
    for (var i = 1; i <= marker.numKeys; i++) {
        if (marker.keyValue(i).comment == "DROP") return marker.keyTime(i);
    }
}

function clean(n) {
    while (comp.numLayers > n) comp.layer(1).remove();
}