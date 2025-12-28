"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

// 一覧
app.get("/keiyo2", (req, res) => {
  res.render('keiyo2', {data: station2});
});

// Create (新規登録画面)
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

// Delete (削除処理)
app.get("/keiyo2/delete/:number", (req, res) => {
  station2.splice(req.params.number, 1);
  res.redirect('/keiyo2');
});

// Edit (編集画面)
app.get("/keiyo2/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = station2[number];
  res.render('keiyo2_edit', {id: number, data: detail});
});

// Update (更新処理)
app.post("/keiyo2/update/:number", (req, res) => {
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  res.redirect('/keiyo2');
});

// Create (新規登録処理)
app.post("/keiyo2", (req, res) => {
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push({ id: id, code: code, name: name, change: change, passengers: passengers, distance: distance });
  res.render('keiyo2', {data: station2});
});

// Read (詳細表示) ※順序に注意
app.get("/keiyo2/:number", (req, res) => {
  const number = req.params.number;
  const detail = station2[number];
  res.render('keiyo2_detail', {id: number, data: detail});
});

// ===== 映画データ =====
let movie = [
  { id:1, title:"千と千尋の神隠し", director:"宮崎駿", genre:"アニメ", year:2001, length:125 },
  { id:2, title:"君の名は。", director:"新海誠", genre:"アニメ", year:2016, length:107 },
  { id:3, title:"ゴジラ", director:"本多猪四郎", genre:"特撮", year:1954, length:96 },
];

// 一覧
app.get("/movie", (req, res) => {
  res.render('movie', { data: movie });
});

// 新規登録画面
app.get("/movie/create", (req, res) => {
  res.redirect('/public/movie_new.html');
});

// 削除
app.get("/movie/delete/:number", (req, res) => {
  movie.splice(req.params.number, 1);
  res.redirect('/movie');
});

// 編集
app.get("/movie/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = movie[number];
  res.render('movie_edit', { id: number, data: detail });
});

// 更新
app.post("/movie/update/:number", (req, res) => {
  movie[req.params.number].title = req.body.title;
  movie[req.params.number].director = req.body.director;
  movie[req.params.number].genre = req.body.genre;
  movie[req.params.number].year = req.body.year;
  movie[req.params.number].length = req.body.length;
  res.redirect('/movie');
});

// 追加
app.post("/movie", (req, res) => {
  const id = movie.length + 1;
  movie.push({
    id: id,
    title: req.body.title,
    director: req.body.director,
    genre: req.body.genre,
    year: req.body.year,
    length: req.body.length
  });
  res.redirect('/movie');
});

// 詳細表示（※最後）
app.get("/movie/:number", (req, res) => {
  const number = req.params.number;
  const detail = movie[number];
  res.render('movie_detail', { id: number, data: detail });
});




// ===== 漫画データ =====
let manga = [
  { id:1, title:"ワンダンス", author:"珈琲", genre:"ダンス", start:2019, volumes:12 },
  { id:2, title:"メダリスト", author:"つるまいかだ", genre:"フィギュアスケート", start:2020, volumes:10 },
  { id:3, title:"ジョジョの奇妙な冒険", author:"荒木飛呂彦", genre:"バトル", start:1987, volumes:130 },
];

// 一覧
app.get("/manga", (req, res) => {
  res.render("manga", { data: manga });
});

// 新規登録画面
app.get("/manga/create", (req, res) => {
  res.redirect("/public/manga_new.html");
});

// 削除
app.get("/manga/delete/:number", (req, res) => {
  manga.splice(req.params.number, 1);
  res.redirect("/manga");
});

// 編集
app.get("/manga/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = manga[number];
  res.render("manga_edit", { id: number, data: detail });
});

// 更新
app.post("/manga/update/:number", (req, res) => {
  manga[req.params.number].title = req.body.title;
  manga[req.params.number].author = req.body.author;
  manga[req.params.number].genre = req.body.genre;
  manga[req.params.number].start = req.body.start;
  manga[req.params.number].volumes = req.body.volumes;
  res.redirect("/manga");
});

// 追加
app.post("/manga", (req, res) => {
  const id = manga.length + 1;
  manga.push({
    id: id,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    start: req.body.start,
    volumes: req.body.volumes
  });
  res.redirect("/manga");
});

// 詳細表示（※最後）
app.get("/manga/:number", (req, res) => {
  const number = req.params.number;
  const detail = manga[number];
  res.render("manga_detail", { id: number, data: detail });
});

// ===== 講義データ =====
let lecture = [
  { id:1, title:"言語と文化Ⅱ（中国語・情工）", teacher:"王 瑞来", day:"月3", room:"7206講義室", credit:2 },
  { id:2, title:"英語理解Ⅱ Cクラス", teacher:"小山 努", day:"月6", room:"5210講義室", credit:2 },
  { id:3, title:"データ通信（情工）", teacher:"水本 旭洋", day:"火1", room:"3212演習室", credit:2 },
  { id:4, title:"データサイエンス（情工）", teacher:"三木 大輔", day:"火6", room:"3212演習室", credit:2 },
  { id:5, title:"キャリアデザインⅠ（情工）", teacher:"長谷川 武／加藤 和彦", day:"水1", room:"722演習室", credit:2 },
  { id:6, title:"アジャイルワークⅠ（情工）", teacher:"三木 大輔／鎌倉 浩嗣／水本 旭洋", day:"水6", room:"722演習室／731講義室／7号館7階メディア実験室", credit:2 },
  { id:7, title:"微分積分（情工 Aクラス）", teacher:"東條 晃次", day:"木2", room:"8108講義室", credit:2 },
  { id:8, title:"英語表現Ⅱ Cクラス", teacher:"霜田 敦子", day:"木5", room:"5307講義室", credit:2 },
  { id:9, title:"科学技術史", teacher:"松井 久", day:"木7", room:"5202講義室", credit:2 },
  { id:10, title:"Webプログラミング（情工）", teacher:"須田 宇宙", day:"金3", room:"7104演習室", credit:2 },
];

// 一覧
app.get("/lecture", (req, res) => {
  res.render("lecture", { data: lecture });
});

// 新規登録画面
app.get("/lecture/create", (req, res) => {
  res.redirect("/public/lecture_new.html");
});

// 削除
app.get("/lecture/delete/:number", (req, res) => {
  lecture.splice(req.params.number, 1);
  res.redirect("/lecture");
});

// 編集
app.get("/lecture/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = lecture[number];
  res.render("lecture_edit", { id: number, data: detail });
});

// 更新
app.post("/lecture/update/:number", (req, res) => {
  lecture[req.params.number].title = req.body.title;
  lecture[req.params.number].teacher = req.body.teacher;
  lecture[req.params.number].day = req.body.day;
  lecture[req.params.number].room = req.body.room;
  lecture[req.params.number].credit = req.body.credit;
  res.redirect("/lecture");
});

// 追加
app.post("/lecture", (req, res) => {
  const id = lecture.length + 1;
  lecture.push({
    id: id,
    title: req.body.title,
    teacher: req.body.teacher,
    day: req.body.day,
    room: req.body.room,
    credit: req.body.credit
  });
  res.redirect("/lecture");
});

// 詳細表示（※最後）
app.get("/lecture/:number", (req, res) => {
  const number = req.params.number;
  const detail = lecture[number];
  res.render("lecture_detail", { id: number, data: detail });
});









// --- 以前の課題など ---

app.get("/keiyo", (req, res) => {
  res.render('db1', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.render('db1', { data: station });
});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win )|| 0;
  let total = Number( req.query.total )|| 0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';

  if((hand=='グー'&&cpu=='チョキ')||(hand=='チョキ'&&cpu=='パー')||(hand=='パー'&&cpu=='グー')){
    judgement = '勝ち';
    win += 1;
    total += 1;
  }
  else if((hand=='グー'&&cpu=='パー')||(hand=='チョキ'&&cpu=='グー')||(hand=='パー'&&cpu=='チョキ')){
    judgement = '負け';
    total += 1;
  }
  else if((hand=='グー'&&cpu=='グー')||(hand=='チョキ'&&cpu=='チョキ')||(hand=='パー'&&cpu=='パー')){
    judgement = 'あいこ';
    total += 1;
  }
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken06', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));