var canvas = document.getElementById('gamezone');
var context = canvas.getContext('2d');
var scoreshow = document.getElementById('score');
// var Gameover = document.getElementById('gameover');
var fly = new Audio();
var scores = new Audio();
var gameover = new Audio();
var birdimg = new Image();
var background = new Image();
var ongtren = new Image();
var ongduoi = new Image();
birdimg.src = "bird.png";
background.src = "background.png";
ongtren.src = "pipetren.png";
ongduoi.src = "pipeduoi.png";

scores.src = "score.mp3";
fly.src = "fly.mp3";
gameover.src = "gameover.mp3";
var score = 0;
var pipesdistance = 140;
var khoangcachvoiongduoi;

var bird = {
    x: background.width / 5 + 50,
    y: background.height / 2
}
var ong = [];
ong[0] = {
    x: canvas.width,
    y: 0
}


function run() {
    context.drawImage(background, 0, 0);
    context.drawImage(birdimg, bird.x, bird.y);

    for (var i = 0; i < ong.length; i++) {
        khoangcachvoiongduoi = ongtren.height + pipesdistance;
        context.drawImage(ongtren, ong[i].x, ong[i].y);
        // ve ong tren theo toa do của ống đó
        // ống dưới phụ thuộc vào ống trên
        context.drawImage(ongduoi, ong[i].x, ong[i].y + khoangcachvoiongduoi);
        ong[i].x -= 5; // de ong di chuyển


        //tạo thêm ống khi ống di chuyển ra giữa
        //tạo thêm 1 ống nx.
        if (ong[i].x == canvas.width / 2) {
            ong.push({
                x: canvas.width,
                y: Math.floor(Math.random() * ongtren.height) - ongtren.height
            })
        }
        if (ong[i].x == -40) ong.splice(0, 1);
        // xoa cac ong da di qua le trai de tranh bi đầy mảng về sau

        if (ong[i].x == bird.x) {
            score++;
            scores.play();
        } // chim qua dc ống thì tăng điểm 
        // trường hợp thua :v
        if (bird.y + birdimg.height == canvas.height ||
            bird.x + birdimg.width >= ong[i].x && bird.x <= ong[i].x + ongtren.width &&
            (bird.y <= ong[i].y + ongtren.height ||
                bird.y + birdimg.height >= ong[i].y + khoangcachvoiongduoi)
        ) {
            gameover.play();
            return 1;
        }
    }
    // đk trên là đụng đất, tính độ cao y + độ cao con chim
    // dk thứ 2 là so sánh vi trí con chim vs cái ống
    // dk thứ 3 là so sánh vị trí y
    scoreshow.innerHTML = "score : " + score;
    // cho chim roi xuong
    bird.y += 3;
    requestAnimationFrame(run);
}
//function chim bay len khi nhan tab
document.addEventListener("keydown", function() {
    bird.y -= 60;
    fly.play();
})

run();