let genBtn = document.getElementById("gen-btn");
let dlBtn = document.getElementById("dl-btn");
let genCanvas = document.getElementById("gen-canvas");
let genCanvasCtx;


function initGenCanvas() {
    genCanvasCtx = genCanvas.getContext("2d");
    genCanvas.width = 425;
    genCanvas.height = 500;
}

genBtn.onclick = function(event) {
    genCanvasCtx.clearRect(0, 0, genCanvas.width, genCanvas.height);

    let imgPicks = []
    for (const [key, val] of Object.entries(pickChances)) {
        const exclude = excludeCategories[key].some(e => imgPicks.includes(e));
        if (!exclude && Math.random() <= val)
            imgPicks.push(key);
    }

    let bodyPath = "Body " + getRandomInt(dirCounts["Body"]);
    let headPath = "Head " + getRandomInt(dirCounts["Head"]);

    let imgPaths = [];
    imgPaths.push(getRandomPath("Backgrounds", "BG-", "jpg"));

    imgPaths.push(getRandomPath(bodyPath + "/Body", "Body-"));
    imgPaths.push(getRandomPath(bodyPath + "/Bottoms", "Bottom-"));
    if (imgPicks.includes("Tattoos"))
        imgPaths.push(getRandomPath(bodyPath + "/Tattoos", ""));
    if (imgPicks.includes("Tops"))
        imgPaths.push(getRandomPath(bodyPath + "/Tops", "Top-"));
    if (imgPicks.includes("Chains"))
        imgPaths.push(getRandomPath(bodyPath + "/Chains", ""));
        
    imgPaths.push(getRandomPath(headPath + "/Head", "Head-"));
    if (imgPicks.includes("Face Tats"))
        imgPaths.push(getRandomPath(headPath + "/Face Tats", "FTat-"));
    imgPaths.push(getRandomPath(headPath + "/Eyebrows", "EyeBrows-"));
    if (imgPicks.includes("Eyes"))
        imgPaths.push(getRandomPath(headPath + "/Eyes", "Eyes-"));
    if (imgPicks.includes("Mouth"))
        imgPaths.push(getRandomPath(headPath + "/Mouth", "Mouth-"));
    imgPaths.push(getRandomPath(headPath + "/Nose", "Nose-"));
    if (imgPicks.includes("Facial Hair"))
        imgPaths.push(getRandomPath(headPath + "/Facial Hair", "FacialHair-"));
    if (imgPicks.includes("Partial Masks"))
        imgPaths.push(getRandomPath(headPath + "/Partial Masks", "Mask-"));
    if (imgPicks.includes("Glasses"))
        imgPaths.push(getRandomPath(headPath + "/Glasses", "Glasses-"));
    if (imgPicks.includes("Hair"))
        imgPaths.push(getRandomPath(headPath + "/Hair", "Hair-"));
    if (imgPicks.includes("Bubblegum"))
        imgPaths.push(getRandomPath(headPath + "/Bubblegum", "Bubblegum-"));
    if (imgPicks.includes("Full Masks"))
        imgPaths.push(getRandomPath(headPath + "/Full Masks", "Mask-"));
    if (imgPicks.includes("Hats"))
        imgPaths.push(getRandomPath(headPath + "/Hats", "Hat-"));
    if (imgPicks.includes("Laser Eyes"))
        imgPaths.push(getRandomPath(headPath + "/Laser Eyes", "Eyes-"));
        
    imgPaths.push(getRandomPath("Board behind Hands", "Board-"));
    imgPaths.push(getRandomPath("Hands", "Hand-"));

    Promise
        .all(imgPaths.map(i => loadImg(i)))
        .then((imgs) => {
            imgs.forEach((img) => {
                genCanvasCtx.drawImage(img, 0, 0, genCanvas.width, genCanvas.height);
            });
        })
        .catch((err) => {
            console.error(err);
        });
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}


function getRandomPath(parentPath, nameStart, fileType="png") {
    let imgNum = getRandomInt(imgCounts[parentPath]);
    let imgPath = `imgs/${parentPath}/${nameStart}${("000"+imgNum).substr(-3)}.${fileType}`;
    return imgPath;
}


function loadImg(imgPath) {
    return new Promise((resolve, reject) => {
        let img = new Image();

        img.onload = function() {
            resolve(img);
        }

        img.addEventListener("error", (err) => {
            reject(err);
        });

        img.src = imgPath;
    });
}


dlBtn.onclick = function(event) {
    let link = document.createElement("a");
    link.download = "Avatar.png";
    link.href = genCanvas.toDataURL();
    link.click();
    link.delete;
}


initGenCanvas();
genBtn.click();