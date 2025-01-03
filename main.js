/*инициалзация обьекта*/
let firstFloorJson = {
    1:{
        "mainPhoto":"./photos/floors/первый этаж/5.9(1).png",
        "movePhoto":""
    },
}

let secondFloorJson = {
    1:{
        "mainPhoto":"./photos/floors/второй этаж/1/2.1.jpg",
        "movePhoto":"./photos/floors/второй этаж/1/2.1.png"
    },
    2:{
        "mainPhoto":"./photos/floors/второй этаж/2/2.2.jpg",
        "movePhoto":"./photos/floors/второй этаж/2/2.2.png"
    },
    3:{
        "mainPhoto":"./photos/floors/второй этаж/3/2.3.jpg",
        "movePhoto":"./photos/floors/второй этаж/3/2.3.png"
    },
    4:{
        "mainPhoto":"./photos/floors/второй этаж/4/2.4.jpg",
        "movePhoto":"./photos/floors/второй этаж/4/2.4.png"
    },
}

let fourthFloorJson = {
    1:{
        "mainPhoto":"./photos/floors/четвертый этаж/2/4.2.jpg",
        "movePhoto":"./photos/floors/четвертый этаж/2/4.2.png"
    },
    2:{
        "mainPhoto":"./photos/floors/четвертый этаж/3/4.3.jpg",
        "movePhoto":"./photos/floors/четвертый этаж/3/4.3.png"
    },
    3:{
        "mainPhoto":"./photos/floors/четвертый этаж/4/4.4.jpg",
        "movePhoto":"./photos/floors/четвертый этаж/4/4.4.png"
    },
    4:{
        "mainPhoto":"./photos/floors/четвертый этаж/5/4.5.jpg",
        "movePhoto":"./photos/floors/четвертый этаж/5/4.5.png"
    },
    5:{
        "mainPhoto":"./photos/floors/четвертый этаж/6/4.6.jpg",
        "movePhoto":"./photos/floors/четвертый этаж/6/4.6.png"
    },
    6:{
        "mainPhoto":"./photos/floors/четвертый этаж/8/4.8.jpg",
        "movePhoto":"./photos/floors/четвертый этаж/8/4.8.png"
    },
}

let fifthFloorJson = {
    1:{
        "mainPhoto":"./photos/floors/пятый этаж/7/5.7.jpg",
        "movePhoto":"./photos/floors/пятый этаж/7/5.7.png"
    },
    2:{
        "mainPhoto":"./photos/floors/пятый этаж/8/5.8.jpg",
        "movePhoto":"./photos/floors/пятый этаж/8/5.8.png"
    },
    3:{
        "mainPhoto":"./photos/floors/пятый этаж/9/5.9.jpg",
        "movePhoto":"./photos/floors/пятый этаж/9/5.9.png"
    },
}

let floorMap = {
    1: firstFloorJson,
    2: secondFloorJson,
    4: fourthFloorJson,
    5: fifthFloorJson,
}    

/* Переменые для движения по панораме*/
let curFloor, curPosition;
let mainPhoto, movePhoto;

/* Переменные для панорамы*/
let camera, scene, renderer, geometry, mesh, material, mouse, raycaster;
let e, imgData, canvas, ctx;
let uv, lon = 0, lat = 0;
let onMousePositionColor;
let mouseDown = {};
let container = document.getElementById("photoContainer");

var containerWidth = $(".photo-container").width();
var containerHeight = $(".photo-container").height();

let texture =  "./photos/floors/первый этаж/5.9(1).png"
let stencil =  "../photos/floors/стрелки для ходьбы/onFirstPossition.png"

let moveForwardColor = "255,0,0"
let moveBackwardColor = "250,0,0"


function main() {
    mouseInit();
    raycasterInit();
    makeCanvas();
    cameraInit();
    sceneInit();
    sphereInit();
    makeMaterial(texture, stencil);
    meshInit();
    addMeshOnScene();
    rendererInit();
    EventListenersInit();
    animate();
}

function loadNewPhoto(){
    sceneInit()
    makeMaterial(texture, stencil);
    meshInit();
    addMeshOnScene();
}

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
    loadNewPhoto()
}


function saveCurFloor(floorNumber){
    curFloor = floorNumber;
    console.log("Этаж записан", curFloor);
}

function saveCurPosition(positionNumber){
    curPosition = positionNumber;
    console.log("Позиция записана", curPosition);
}

function mouseInit(){
    mouse = new THREE.Vector2();
    console.log("Мышь инициализирована")
}

function raycasterInit(){
    raycaster = new THREE.Raycaster();
    console.log("Рейкастер инициализирован")
}

function makeCanvas(){
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    console.log("Канвас создан")
}

function cameraInit(){
    camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);
    console.log("Камера инициализирована")
}

function sceneInit(){
    scene = new THREE.Scene();
    console.log("Сцена инициализирована")
}

function sphereInit(){
    geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    console.log("Сфера создана")
}

function makeMaterial(){
    material = createMaterial(texture, stencil);
    console.log("Материал создан")
}

function meshInit(){
    mesh = new THREE.Mesh(geometry, material)
    console.log("Сетка создана")
}

function addMeshOnScene(){
    scene.add(mesh);
    console.log("Добавление сетки на сцену")
}

function rendererInit(){
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(containerWidth, containerHeight);
    container.appendChild(renderer.domElement);
    console.log("Рендерер инициализирован")
}


function EventListenersInit(){
    addEventListener('mousedown', onPointerStart);
    addEventListener('mousemove', onPointerMove);
    addEventListener('mouseup', onPointerUp);
    addEventListener('touchstart', onPointerStart);
    addEventListener('touchmove', onPointerMove);
    addEventListener('touchend', onPointerUp);
    addEventListener('resize', onWindowResize);
    addEventListener('mousedown', OnTargetClick)
}

function animate() {
    requestAnimationFrame(animate);
    let phi = THREE.Math.degToRad( 90 - lat );
    let theta = THREE.Math.degToRad( lon );
    camera.target.x = 0.001*Math.sin(phi)*Math.cos(theta);
    camera.target.y = 0.001*Math.cos(phi);
    camera.target.z = 0.001*Math.sin(phi)*Math.sin(theta);
    camera.lookAt(camera.target);
    e&&raycast(e);
    renderer.render(scene, camera);
}

function createMaterial(img, stencil) {
    let textureLoader = new THREE.TextureLoader();
    let stencilImage = new Image();
    stencilImage.crossOrigin = "anonymous";
    stencilImage.src = stencil;
    stencilImage.onload = function() {
        canvas.width = stencilImage.width;
        canvas.height = stencilImage.height;
        ctx.drawImage(stencilImage,0,0);
        imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    return new THREE.ShaderMaterial({
        uniforms: {
            mouse: { type: "2f", value: mouse },
            texture1: { type: "t", value: textureLoader.load(img) },
            texture2: { type: "t", value: textureLoader.load(stencil) }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }`,
        fragmentShader: `
            precision highp float;
            varying vec2 vUv;
            uniform vec2 mouse;
            uniform sampler2D texture1;
            uniform sampler2D texture2;
            void main() {
                vec4 stencil = texture2D(texture2, vUv);
                gl_FragColor = texture2D(texture1, vUv);
                vec4 c = texture2D(texture2, mouse);
                if (abs(c.x - stencil.x) < 0.0001 && stencil.x > 0.)
                    gl_FragColor += vec4(0.,0.2,0,0.);
            }`
    })
}

function onWindowResize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    var containerWidth = $(".photo-container").width();
    var containerHeight = $(".photo-container").height();
    renderer.setSize(containerWidth, containerHeight);
}

//Для прокрутки камеры
function onPointerStart( event ) {
    mouseDown.x = event.clientX || event.touches[ 0 ].clientX;
    mouseDown.y = event.clientY || event.touches[ 0 ].clientY;
    mouseDown.lon = lon;
    mouseDown.lat = lat;
}

//Проверяет цвет под курсором
function raycast(event) {
    var rect = renderer.domElement.getBoundingClientRect();
    var x = (event.clientX - rect.left)/rect.width,
        y = (event.clientY - rect.top)/rect.height;
    mouse.set(x*2 - 1, 1 - y*2);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects( scene.children );
    if (intersects.length > 0 && intersects[0].uv) {
        material.uniforms.mouse.value = uv = intersects[0].uv;
        if (!imgData)return;
        let y = Math.floor((1-uv.y)*canvas.height);
        let x = Math.floor(uv.x*canvas.width);
        let off = Math.floor(y*canvas.width + x)*4;
        let r = imgData.data[off];
        let g = imgData.data[off+1];
        let b = imgData.data[off+2];
        onMousePositionColor = r + ',' + g + ',' + b;
    }       
}

function OnTargetClick(event){
    if(onMousePositionColor == moveForwardColor){
        nextPosition()
        loadNewPhoto()
    }else if(onMousePositionColor == moveBackwardColor){
        prevPosition()
        loadNewPhoto()
        
    }
}

//Прокрутка камеры
function onPointerMove( event ) {
    raycast(e = event);
    if (!mouseDown.x) return;
    let clientX = event.clientX || event.touches[0].clientX;
    let clientY = event.clientY || event.touches[0].clientY;
    lon = (mouseDown.x - clientX)*camera.fov/600 + mouseDown.lon;
    lat = (clientY - mouseDown.y)*camera.fov/600 + mouseDown.lat;
    lat = Math.max( - 85, Math.min( 85, lat ) );
}

function onPointerUp() {
    mouseDown.x = null;
}

main()