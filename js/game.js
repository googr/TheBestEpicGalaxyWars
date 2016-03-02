//var ec1=null;
var audio = new Audio();
audio.src = 'audio/start.mp3';
audio.autoplay = true;
var fail=3;
var failTable=document.getElementById('Fails');
failTable.innerHTML=fail+" to FAIL";
var score=0;
var scoreTable=document.getElementById('Scoretable');
scoreTable.innerHTML=score;
var X=0;
var Y=0;
var AreaX=0;
var AreaY=0;
var PlayerShip=
{
	Height: 80,
	Width: 50,
	Position : function()
	{
		var Obj=document.getElementById('Player');
		Obj.style.position="absolute";
		Obj.style.width=this.Width+"px";
		Obj.style.height=this.Height+"px";
		Obj.style.cursor="none";
	}
};
var Bullet1=
{
	Height: 100,
	Width: 26,
	Speed: 0,
	X: -500,
	Y: 2000,
	Position : function()
	{
		var Obj=document.getElementById('bullet1');
		Obj.style.position="absolute";
		Obj.style.left=this.X+"px";
		Obj.style.top=this.Y+"px";
		Obj.style.width=this.Width+"px";
		Obj.style.height=this.Height+"px";
	},
	Reset : function()
	{
		this.Speed=0;
		this.X=-500;
		this.Y=2000;
	}
};
var Bullet2=
{
	Height: 100,
	Width: 26,
	Speed: 0,
	X: -500,
	Y: 2000,
	Position : function()
	{
		var Obj=document.getElementById('bullet2');
		Obj.style.position="absolute";
		Obj.style.left=this.X+"px";
		Obj.style.top=this.Y+"px";
		Obj.style.width=this.Width+"px";
		Obj.style.height=this.Height+"px";
	},
	Reset : function()
	{
		this.Speed=0;
		this.X=-500;
		this.Y=2000;
	}
};
var Bullet3=
{
	Height: 50,
	Width: 26,
	Speed: 0,
	X: -500,
	Y: 2000,
	Position : function()
	{
		var Obj=document.getElementById('bullet3');
		Obj.style.position="absolute";
		Obj.style.left=this.X+"px";
		Obj.style.top=this.Y+"px";
		Obj.style.width=this.Width+"px";
		Obj.style.height=this.Height+"px";
	},
	Reset : function()
	{
		this.Speed=0;
		this.X=-500;
		this.Y=2000;
	}
};
PlayerShip.Position();
//start enemy
function EnemyStart (EnemyN,S) {
	if (S!=-1){
		EnemyN.Speed+=S;
	}else EnemyN.Speed=15;
	EnemyN.X=(10 + Math.random() * (900 - 10));
}
//Enemy ships
function EnemyC(){
	var self=this;
	this.ID="";
	this.bgPosX= -120;
	this.Height= 110;
	this.Width= 105;
	this.Speed= 0;
	this.X= 500;
	this.Y= -200;
	this.SetID=function(x) { self.ID=x; };
	this.SetBgPosX=function(y) { self.bgPosX=y; };
	this.Position= function(){
		var Obj=document.getElementById(self.ID);
		Obj.style.position="absolute";
		Obj.style.left=self.X+"px";
		Obj.style.top=self.Y+"px";
		Obj.style.width=self.Width+"px";
		Obj.style.height=self.Height+"px";
	};
	this.Reset= function (){
		self.Y=-100;
		var Obj=document.getElementById(self.ID);
		Obj.style.backgroundPosition=self.bgPosX+"px 0px";
	};
	this.Crash= function(){
		var Obj=document.getElementById(self.ID);
		Obj.style.backgroundPosition=self.bgPosX+"px -114px";
		score++;
		scoreTable.innerHTML=score;
	}
}
var Enemy1=new EnemyC;
Enemy1.SetID("enemy1");
Enemy1.SetBgPosX(1);
var Enemy2=new EnemyC;
Enemy2.SetID("enemy2");
Enemy2.SetBgPosX(-120);
var Enemy3=new EnemyC;
Enemy3.SetID("enemy3");
Enemy3.SetBgPosX(-220);

//move
var IntervalToStart = setInterval(function(){ MoveTimer() }, 70);
function MoveTimer()
{
	document.body.addEventListener('mousemove',function (EventObj){X=EventObj.clientX;Y=EventObj.clientY;},false);
	AreaX=X-Area.offsetLeft;
	AreaY=Y-Area.offsetTop;
	ShiftPara('IParaBack',X,Y,0.05,0.05);
	ShiftPara('IParaFront',X,Y,0.15,0.15);
	ShiftPara('Player',AreaX-PlayerShip.Width/2,AreaY-PlayerShip.Height/2,1,1);

	//Paint bullet
	Bullet1.Y+=Bullet1.Speed;
	Bullet1.Position();
	Bullet2.Y+=Bullet2.Speed;
	Bullet2.Position();
	Bullet3.Y+=Bullet3.Speed;
	Bullet3.Position();

	//paint enemys
	Enemy1.Y+=Enemy1.Speed;
	Enemy2.Y+=Enemy2.Speed;
	Enemy3.Y+=Enemy2.Speed;

	//Enemy3.Y+=Enemy3.Speed;
	Enemy1.Position();
	Enemy2.Position();
	Enemy3.Position();

	//reset bullet
	if( Bullet1.Y<0){
		Bullet1.Reset();
	}
	if( Bullet3.Y<0){
		Bullet3.Reset();
	}
	if( Bullet2.Y<0){
		Bullet2.Reset();
	}
	//reset enemy - FAIL
	function Fail (EnemyN){
		if( EnemyN.Y>1000){
			var audio4 = new Audio();
			audio4.src = 'audio/fail.mp3';
			audio4.autoplay = true;
			EnemyN.Reset();
			fail--;
			console.log("fail "+fail);
			failTable.innerHTML=fail+" to FAIL";
			EnemyStart(EnemyN,-1);
		}
		if (fail==0){
			var audio3 = new Audio();
			audio3.src = 'audio/waaa.mp3';
			audio3.autoplay = true;
			clearInterval(IntervalToStart);
			$('#Area').addClass("hide");
			$('.modalScore').removeClass("hide");
			$('.showcsore').text(score);
	}
	}
	Fail (Enemy1);
	Fail (Enemy2);
	Fail (Enemy3);
	//crash enemys
	function CrashEnemy (EnemyN){
		if ((EnemyN.Y+EnemyN.Height>Bullet3.Y&&EnemyN.Y+EnemyN.Height/2<Bullet3.Y)||(EnemyN.Y+EnemyN.Height>Bullet2.Y&&EnemyN.Y+EnemyN.Height/2<Bullet2.Y)||(EnemyN.Y+EnemyN.Height>Bullet1.Y&&EnemyN.Y+EnemyN.Height/2<Bullet1.Y))
		{
			if(Bullet3.X>EnemyN.X && Bullet3.X<(EnemyN.X+EnemyN.Width)){
				EnemyN.Crash();
				var audio2 = new Audio();
				audio2.src = 'audio/boom.mp3';
				audio2.autoplay = true;
				setTimeout( function(){EnemyN.Reset(); EnemyStart(EnemyN,1); } , 200);
				Bullet3.Reset();
			}
			if(Bullet2.X>EnemyN.X && Bullet2.X<(EnemyN.X+EnemyN.Width)){
				EnemyN.Crash();
				var audio2 = new Audio();
				audio2.src = 'audio/boom.mp3';
				audio2.autoplay = true;
				setTimeout( function(){EnemyN.Reset(); EnemyStart(EnemyN,1); } , 200);
				Bullet2.Reset();
			}
			if(Bullet1.X>EnemyN.X && Bullet1.X<(EnemyN.X+EnemyN.Width)){
				EnemyN.Crash();
				var audio2 = new Audio();
				audio2.src = 'audio/boom.mp3';
				audio2.autoplay = true;
				setTimeout( function(){EnemyN.Reset(); EnemyStart(EnemyN,1); } , 200);
				Bullet1.Reset();
			}
		}
	}
	CrashEnemy (Enemy1);
	CrashEnemy (Enemy2);
	CrashEnemy (Enemy3);

}

function ShiftPara(ParaId,ShiftX,ShiftY,KoefX,KoefY)
{
	var ParaElem=document.getElementById(ParaId);
	ParaElem.style.transform='translateX('+ShiftX*KoefX+'px) translateY('+ShiftY*KoefY+'px) translateZ(0)';
}
//fire
addEventListener("mousedown", function (event) {
	//event.preventDefault();
	if (Bullet1.Speed!=0&&Bullet2.Speed!=0&&Bullet3.Speed==0){
		Bullet3.Speed=-10;
		Bullet3.X=AreaX-Bullet3.Width/2;
		Bullet3.Y=AreaY-PlayerShip.Height;
		var audio1 = new Audio();
		audio1.src = 'audio/piu.mp3';
		audio1.autoplay = true;
	}
	if (Bullet1.Speed!=0&&Bullet2.Speed==0){
		Bullet2.Speed=-20;
		Bullet2.X=AreaX-Bullet2.Width/2;
		Bullet2.Y=AreaY-PlayerShip.Height;
		var audio1 = new Audio();
		audio1.src = 'audio/piu.mp3';
		audio1.autoplay = true;
	}
	if (Bullet1.Speed==0){
		Bullet1.Speed=-30;
		Bullet1.X=AreaX-Bullet1.Width/2;
		Bullet1.Y=AreaY-PlayerShip.Height;
		var audio1 = new Audio();
		audio1.src = 'audio/piu.mp3';
		audio1.autoplay = true;
	}

});
var IntervaEnemy1Start=setTimeout(function(){Enemy1.Speed=10}, 1000 );
var IntervaEnemy2Start=setTimeout(function(){Enemy2.Speed=20}, 3000 );
var IntervaEnemy3Start=setTimeout(function(){Enemy3.Speed=20}, 6000 );
var highscore;
	function Send()
	{
		UpdatePassword=Math.random();
		$.ajax(
				{
					url : "http://fe.it-academy.by/AjaxStringStorage2.php",
					type : 'POST',
					data : { f : 'LOCKGET', n : 'ROHOZIK_STARBATTLE_TOR',
						p : UpdatePassword },
					cache : false,
					success : LockGetReady,
					error : ErrorHandler
				}
		);
	}

// сообщения получены, добавляет, показывает, сохраняет
	function LockGetReady(ResultH)
	{
		if ( ResultH.error!=undefined )
			alert(ResultH.error);
		else
		{
			highscore=[];
			if ( ResultH.result!="" )
			{
				highscore=JSON.parse(ResultH.result);
			}
			var fName = document.getElementById("PlayerName").value;
			var now={n:fName, s:score};
			highscore.push(now);
			highscore.sort(function (a, b) {
				if (a['s'] < b['s']) return 1;
				if (a['s'] > b['s']) return -1;
			});
			highscore.join('\n');
			highscore.splice(-1, 1);
			$.ajax(
					{
						url : "http://fe.it-academy.by/AjaxStringStorage2.php",
						type : 'POST',
						data : { f : 'UPDATE', n : 'ROHOZIK_STARBATTLE_TOR',
							v : JSON.stringify(highscore), p : UpdatePassword },
						cache : false,
						success : UpdateReady,
						error : ErrorHandler
					}
			);
		}

	}

function ErrorHandler(jqXHR,StatusStr,ErrorStr)
{
	alert(StatusStr+' '+ErrorStr);
}
function UpdateReady(ResultH)
{
	SwitchToState('TOR');
	if ( ResultH.error!=undefined )
		alert(ResultH.error);
}