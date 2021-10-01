const dirCounts = {
    "Body": 3,
    "Head": 4,
}

const imgCounts = {
    "Backgrounds": 10,
    "Body 1/Body": 8,
    "Body 1/Bottoms": 8,
    "Body 2/Body": 8,
    "Body 2/Bottoms": 7,
    "Body 3/Body": 8,
    "Body 3/Bottoms": 8,
}

let genBtn = document.getElementById("gen-btn");
let genCanvas = document.getElementById("gen-canvas");
let genCanvasCtx;

genBtn.addEventListener("click", (event) => {
    genCanvasCtx.clearRect(0, 0, genCanvas.width, genCanvas.height);

    let bodyPath = "Body " + getRandomInt(dirCounts["Body"]);

    let imgPaths = [
        getRandomPath("Backgrounds", "BG-", "jpg"),
        getRandomPath(bodyPath + "/Body", "Body-"),
        getRandomPath(bodyPath + "/Bottoms", "Bottom-")
    ]

    Promise
        .all(imgPaths.map(i => loadImg(i)))
        .then((imgs) => {
            imgs.forEach((img) => {
                genCanvasCtx.drawImage(img, 0, 0, genCanvas.width, genCanvas.height);
            });
        }).catch((err) => {
            console.error(err);
        });
});

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

function getRandomPath(parentPath, nameStart, fileType="png") {
    let imgNum = getRandomInt(imgCounts[parentPath]);
    let imgPath = `imgs/${parentPath}/${nameStart}${("000"+imgNum).substr(-3)}.${fileType}`;
    return imgPath;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function initGenCanvas() {
    genCanvasCtx = genCanvas.getContext("2d");
    genCanvas.width = 425;
    genCanvas.height = 500;
}

initGenCanvas();
genBtn.click();