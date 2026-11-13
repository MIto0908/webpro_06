const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

// 近鉄奈良線のうち，東大阪市内にある駅（布施〜石切）
// distance は布施駅からの営業キロ（km），passengers は1日乗降人員（人）
let station2 = [
  { id:1,  code:"A06", name:"布施駅",     change:"近鉄大阪線",     passengers:37538, distance:0.0 },
  { id:2,  code:"A07", name:"河内永和駅", change:"JRおおさか東線", passengers:12865, distance:0.8 },
  { id:3,  code:"A08", name:"河内小阪駅", change:"",               passengers:21266, distance:1.6 },
  { id:4,  code:"A09", name:"八戸ノ里駅", change:"",               passengers:25538, distance:2.4 },
  { id:5,  code:"A10", name:"若江岩田駅", change:"",               passengers:15298, distance:4.1 },
  { id:6,  code:"A11", name:"河内花園駅", change:"",               passengers:10803, distance:5.0 },
  { id:7,  code:"A12", name:"東花園駅",   change:"",               passengers:17688, distance:5.8 },
  { id:8,  code:"A13", name:"瓢箪山駅",   change:"",               passengers:18711, distance:7.0 },
  { id:9,  code:"A14", name:"枚岡駅",     change:"",               passengers:4421,  distance:8.3 },
  { id:10, code:"A15", name:"額田駅",     change:"",               passengers:2963,  distance:9.0 },
  { id:11, code:"A16", name:"石切駅",     change:"",               passengers:7684,  distance:10.1 },
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.redirect('/public/keiyo_add.html');
});

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {data: detail} );
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
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
    if( hand == cpu ) {
    judgement = 'あいこ';
    total += 1;
  } else if( ( hand=='グー' && cpu=='チョキ' ) ||
             ( hand=='チョキ' && cpu=='パー' ) ||
             ( hand=='パー' && cpu=='グー' ) ) {
    judgement = '勝ち';
    win += 1;
    total += 1;
  } else {
    judgement = '負け';
    total += 1;
  }
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/janken2", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  if( hand == cpu ) {
    judgement = 'あいこ';
    total += 1;
  } else if( ( hand=='グー' && cpu=='チョキ' ) ||
             ( hand=='チョキ' && cpu=='パー' ) ||
             ( hand=='パー' && cpu=='グー' ) ) {
    judgement = '勝ち';
    win += 1;
    total += 1;
  } else {
    judgement = '負け';
    total += 1;
  }
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken2', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
