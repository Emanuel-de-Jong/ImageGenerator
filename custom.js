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

    let bodyPath = "Body " + getRandomInt(dirCounts["Body"]);
    let headPath = "Head " + getRandomInt(dirCounts["Head"]);

    let imgPaths = [];
    imgPaths.push(getRandomPath("Backgrounds", "BG-", "jpg"));

    imgPaths.push(getRandomPath(bodyPath + "/Bottoms", "Bottom-"));
    imgPaths.push(getRandomPath(bodyPath + "/Body", "Body-"));
    if (pickChances["Tattoos"] >= Math.random())
        imgPaths.push(getRandomPath(bodyPath + "/Tattoos", ""));
    if (pickChances["Tops"] >= Math.random())
        imgPaths.push(getRandomPath(bodyPath + "/Tops", "Top-"));
    if (pickChances["Chains"] >= Math.random())
        imgPaths.push(getRandomPath(bodyPath + "/Chains", ""));
        
    imgPaths.push(getRandomPath(headPath + "/Head", "Head-"));
    if (pickChances["Face Tats"] >= Math.random())
        imgPaths.push(getRandomPath(headPath + "/Face Tats", "FTat-"));
    imgPaths.push(getRandomPath(headPath + "/Eyebrows", "EyeBrows-"));
    imgPaths.push(getRandomPath(headPath + "/Eyes", "Eyes-"));
    imgPaths.push(getRandomPath(headPath + "/Mouth", "Mouth-"));
    imgPaths.push(getRandomPath(headPath + "/Nose", "Nose-"));
    if (pickChances["Facial Hair"] >= Math.random())
        imgPaths.push(getRandomPath(headPath + "/Facial Hair", "FacialHair-"));
    if (pickChances["Partial Masks"] >= Math.random())
        imgPaths.push(getRandomPath(headPath + "/Partial Masks", "Mask-"));
    if (pickChances["Glasses"] >= Math.random())
        imgPaths.push(getRandomPath(headPath + "/Glasses", "Glasses-"));
    if (pickChances["Hair"] >= Math.random())
        imgPaths.push(getRandomPath(headPath + "/Hair", "Hair-"));
    if (pickChances["Full Masks"] >= Math.random())
        imgPaths.push(getRandomPath(headPath + "/Full Masks", "Mask-"));
    if (pickChances["Hats"] >= Math.random())
        imgPaths.push(getRandomPath(headPath + "/Hats", "Hat-"));
    if (pickChances["Laser Eyes"] >= Math.random())
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