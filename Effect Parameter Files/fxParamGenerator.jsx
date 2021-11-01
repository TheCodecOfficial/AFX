
var max = 100;

var layer = app.project.activeItem.selectedLayers[0];
var effect = layer.effect(1);

var s = effect.name + "\n";

for (var i = 1; i <= max; i++) {
    try {
        var propertyName = effect.property(i).name;
        if (propertyName != "") s += (i + ": " + propertyName + "\n");
    } catch (e) {
        // nothing moment
    }
}

saveAsTextFile(File($.fileName).path+ encodeURI("/"+effect.name+" Parameters.txt"), s);

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