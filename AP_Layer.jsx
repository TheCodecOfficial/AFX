

function layer(from, to, name) {

    this.name = name;

    this.from = from;
    this.to = to;
    this.duration = to - from;

    this.reference = comp.layers.addSolid([1, 1, 1], name, comp.width, comp.height, 1, this.duration);
    this.reference.label = 13;
    this.reference.adjustmentLayer = true;
    this.reference.inPoint = from;

    this.applyPreset = function (preset) {
        // Deselect all layers
        for (var i = 1; i <= comp.numLayers; i++) {
            comp.layer(i).selected = false;
        }

        // Select this layer
        this.reference.selected = true;

        // Set comp time to 'from' + offset
        comp.time = this.from + preset.offset;

        // Apply preset
        this.reference.applyPreset(preset.file);
    }

}