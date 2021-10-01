let genBtn = document.getElementById("gen-btn");
let genCanvas = document.getElementById("gen-canvas");
let genCanvasCtx;

genBtn.addEventListener("click", (event) => {
    genCanvasCtx.clearRect(0, 0, genCanvas.width, genCanvas.height);

    let bodyPath = "Body " + getRandomInt(dirCounts["Body"]);
    let headPath = "Head " + getRandomInt(dirCounts["Head"]);

    let imgPaths = [
        getRandomPath("Backgrounds", "BG-", "jpg"),

        getRandomPath(bodyPath + "/Bottoms", "Bottom-"),
        getRandomPath(bodyPath + "/Body", "Body-"),
        getRandomPath(bodyPath + "/Tattoos", ""),
        getRandomPath(bodyPath + "/Tops", "Top-"),
        getRandomPath(bodyPath + "/Chains", ""),
        
        getRandomPath(headPath + "/Head", "Head-"),
        getRandomPath(headPath + "/Face Tats", "FTat-"),
        getRandomPath(headPath + "/Eyebrows", "EyeBrows-"),
        getRandomPath(headPath + "/Eyes", "Eyes-"),
        getRandomPath(headPath + "/Mouth", "Mouth-"),
        getRandomPath(headPath + "/Nose", "Nose-"),
        getRandomPath(headPath + "/Facial Hair", "FacialHair-"),
        getRandomPath(headPath + "/Glasses", "Glasses-"),
        getRandomPath(headPath + "/Hair", "Hair-"),
        getRandomPath(headPath + "/Masks", "Mask-"),
        getRandomPath(headPath + "/Hats", "Hat-"),
        
        getRandomPath("Board behind Hands", "Board-"),
        getRandomPath("Hands", "Hand-"),
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