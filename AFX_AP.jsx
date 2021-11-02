
//@include "AP_Layer.jsx"
//@include "util.jsx"
//@include "AP_data.jsx"

var comp = app.project.activeItem;
var end = comp.duration;

//#region UI
var w = new Window("palette", "AFX AP");
w.orientation = "column";

var ddg = w.add("group");
ddg.orientation = "row";
var btg = w.add("group");
btg.orientation = "row";

var panelFadeIn = ddg.add("panel", undefined, "Fade In");
var ddFadeIn = panelFadeIn.add("dropdownlist", undefined, ["None", "Basic", "Twitch"]);
ddFadeIn.selection = 1;

var panelFadeOut = ddg.add("panel", undefined, "Fade Out");
var ddFadeOut = panelFadeOut.add("dropdownlist", undefined, ["None", "Basic", "Twitch"]);
ddFadeOut.selection = 1;

var protectedLayerCount = btg.add("edittext", undefined, 7);
var generateButton = btg.add("button", undefined, "Generate FX");
var cancelButton = btg.add("button", undefined, "Cancel");

w.show();
//#endregion

generateButton.onClick = function () {

    clean(protectedLayerCount.text);

    var timestamps = findCuts();

    for (var i = 0; i < timestamps.length; i++){
        var t = timestamps[i];
        var l = new layer(t-0.5, t+0.5, "Transition");
        l.applyPreset(getPreset("Glow"));
    }

    evaluateDD(ddFadeIn, "FadeIn", 0, 1);
    evaluateDD(ddFadeOut, "FadeOut", end-1, end);

}

function findCuts(){

    var timestamps = [];
    
    for (var i = 1; i < comp.numLayers; i++){
        timestamps.push(comp.layer(i).inPoint);
    }

    return timestamps;

}

function evaluateDD(dropdown, fxtype, from, to){
    var selection = fxtype + dropdown.selection.text;
    var adjLayer = new layer(from, to, selection);
    var preset = getPreset(selection);

    adjLayer.applyPreset(preset);
}

cancelButton.onClick = function(){
    w.close();
}