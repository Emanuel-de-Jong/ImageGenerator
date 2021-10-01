const imgCounts = {
    "Backgrounds": 10,
    "Eyebrows": 11,
    "Eyes": 23,
    "Facial Hair": 10
}

let genBtn = document.getElementById("gen-btn");
let genCanvas = document.getElementById("gen-canvas");
let genCanvasCtx;

genBtn.addEventListener("click", (event) => {
    genCanvasCtx.clearRect(0, 0, genCanvas.width, genCanvas.height);

    let imgPaths = [
        getRandomPath("Backgrounds", "BG-", "jpg"),
        getRandomPath("Eyebrows", "EyeBrows-"),
        getRandomPath("Eyes", "Eyes-"),
        getRandomPath("Facial Hair", "FacialHair-")
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