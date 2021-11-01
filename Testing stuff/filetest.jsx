
saveAsTextFile(File($.fileName).path+ encodeURI("/testfile.txt"), "test123");

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