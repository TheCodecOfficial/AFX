
//@include "AP_Layer.jsx"
//@include "util.jsx"

var comp = app.project.activeItem;

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

var generateButton = btg.add("button", undefined, "Generate FX");
var cancelButton = btg.add("button", undefined, "Cancel");

w.show();
//#endregion

generateButton.onClick = function () {

    clean(1);

    var fadeIn = ddFadeIn.selection.text;
    var fadeInLayer = new layer(0, 1, "Fade In");
    switch (fadeIn) {
        case "Basic":
            fadeInLayer.applyPreset("FadeInBasic");
            break;
        case "Twitch":
            fadeInLayer.applyPreset("FadeInTwitch");
            break;
        default:
            break;
    }

    var fadeOut = ddFadeOut.selection.text;
    var fadeOutLayer = new layer(comp.duration - 1, comp.duration+1, "Fade Out");
    switch (fadeOut) {
        case "Basic":
            fadeOutLayer.applyPreset("FadeOutBasic");
            break;
        case "Twitch":
            fadeOutLayer.applyPreset("FadeOutTwitch");
            break;
        default:
            break;
    }
}

cancelButton.onClick = function(){
    w.close();
}