
var presets = [];

loadPresets();

function preset(filename, offset){

    this.name = filename;

    this.path = File($.fileName).path + encodeURI("/Presets/" + filename + ".ffx");
    this.file = File(this.path);

    this.offset = offset;

}

function loadPresets(){

    var presetInfo = File(File($.fileName).path + encodeURI("/Presets/PresetInfo.txt"));
    presetInfo.open("r");
    
    var lines = [];
    var line = presetInfo.readln();
    while (line != ""){
        lines.push(line);
        line = presetInfo.readln();
    }
    presetInfo.close();

    for (var i = 0; i < lines.length; i += 2){
        var p = new preset(lines[i], lines[i+1]);
        presets.push(p);
    }

}

function getPreset(name){
    for (var i = 0; i < presets.length; i++){
        if (presets[i].name == name) return presets[i];
    }
}