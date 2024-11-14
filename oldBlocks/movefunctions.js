//import floorMap from "./PhotoMapInit.js"

let curFloor;
let curPosition;

let mainPhoto;
let movePhoto;

window.onload = saveCurFloor(1);
window.onload = saveCurPosition(1);

function nextPosition(){
    let nextPosition = curPosition + 1;
    if(nextPosition in floorMap[curFloor]){
        let nextPositionPhoto = floorMap[curFloor][nextPosition].mainPhoto;
        let nextPositionMovePhoto = floorMap[curFloor][nextPosition].movePhoto;
        changePhotos(nextPositionPhoto, nextPositionMovePhoto);
        saveCurPosition(nextPosition);
        console.log(nextPosition);
    }
    else{
        console.log("Это последняя точка");
    }
}

function prevPosition(){
    let prevPosition = curPosition - 1;
    if(prevPosition in floorMap[curFloor]){
        let prevPositionPhoto = floorMap[curFloor][prevPosition].mainPhoto;
        let prevPositionMovePhoto = floorMap[curFloor][prevPosition].movePhoto;
        changePhotos(prevPositionPhoto, prevPositionMovePhoto);
        saveCurPosition(prevPosition);
        console.log(prevPosition);
    }
    else{
        console.log("Это последняя точка");
    }
}

function changePhotos(mainPhotoSrc, movePhotoSrc){
    texture = mainPhotoSrc;
    stencil = movePhotoSrc;
}

function changeFloor(floorNumber, positionNumber){
    saveCurFloor(floorNumber);
    saveCurPosition(positionNumber);
    mainPhoto = floorMap[floorNumber][positionNumber].mainPhoto;
    movePhoto = floorMap[floorNumber][positionNumber].movePhoto;
    changePhotos(mainPhoto, movePhoto);
}


function saveCurFloor(floorNumber){
    curFloor = floorNumber;
    console.log("Этаж записан", curFloor);
}

function saveCurPosition(positionNumber){
    curPosition = positionNumber;
    console.log("Позиция записана", curPosition);
}


export { nextPosition, prevPosition}

