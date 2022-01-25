//获取页面中需要操作的HTML
var containerDiv  =  document.getElementById("container");
var fractionDiv  =  document.getElementById("fraction");
var timeDiv  =  document.getElementById("time");
var startMenuDiv  =  document.getElementById("startMenu");
var overGameMenuDiv  =  document.getElementById("overGameMenu");
var reloadMenuDiv  =  document.getElementById("reloadMenu");


//操作按钮
var staetBin = document.getElementById("start");
var overBin = document.getElementById("overGame");
var reloadBin = document.getElementById("reload");

//1、点击开始按钮  隐藏按钮 开始计时
staetBin.onclick = function(){
	//a.隐藏开始按钮  隐藏开始按钮的div
	startMenuDiv.style.display="none";
	
	
	//b.开始计时  时间进度条变短  默认宽度180  假设游戏时间一分钟，每秒减少3
	var timeDivWidth = 180;
    var px = 180/(60);  //使用进度条宽度除以游戏时间  100ms为单位
//	timeDiv.style.width="120px";
	//每0.1秒减少0.3px时间进度条宽度
	var timeTask = setInterval(function(){
		//计算
		timeDivWidth = timeDivWidth -px;
		//将计算后的精度设置给时间进度条div
		timeDiv.style.width = timeDivWidth+"px";
		if(timeDivWidth<=0){
			//游戏结束，停止计时
			clearInterval(timeTask);
			clearInterval(showWolfsTask);
			//停止显示狼
			//显示游戏结束和查询开始按钮
			overGameMenuDiv.style.display="block";
			reloadMenuDiv.style.display="block";
		}

	},100)
	//显示狼群
	wolfsGo();
	
	//显示一只狼
	showOneWolf();
}

  var arrpos = [["98px","115px"],["17px","160px"],["15px","221px"],["30px","294px"],["122px","274px"],["207px","296px"],["200px","212px"],["187px","142px"],["100px","192px"]]; 
	var score = 0; // 计分
	var showWolfsTask;

function wolfsGo(){
		showOneWolf();
	showWolfsTask  = setInterval("showOneWolf()",1000);
}




function showOneWolf(){
	//创建一个img标签
	var img = document.createElement("img");
	img.src="imgs/h5.png";
	//将img标签添加为containerDiv的子标签
	containerDiv.appendChild(img);
	
	//2、将img显示在洞口位置   列出九个洞口坐标，随机选一个坐标
	//[100px 115px]
	var index =Math.floor( Math.random()*9);  //0-8  随机选

	img.style.position="absolute";
	img.style.left=arrpos[index][0];
	img.style.top=arrpos[index][1];
	
	
	//3、随机产生狼设置到洞口
	//算法 产生一个0-1随机数  产生0大灰狼    否则显示小灰灰
	var wolfIndex =Math.floor( Math.random()*3);
	var wolfName = wolfIndex%2==0?"h":"x";
	img.src="imgs/"+wolfName+"5.png";
	
	//4、让狼有一个上升的过程 （h0-h5)
	var i = -1;
	var task  = null ;  //狼完全显示后的等待任务
	var hideImgTask = null ;//狼下降的循环任务
	var showImgTask = setInterval (function(){
		i++;
		
			img.src = "imgs/"+wolfName+i+".png";
			if(i == 5){
				//狼已经完全显示
				clearInterval(showImgTask);
				//等待一定时间  如果没有点击就要消失
			var task = 	setTimeout(function(){
					//狼消失  隐藏图片 将图片移除  但是移除之前要有躲进
					var hideImgTask = setInterval(function(){
					i--;	
					img.src = "imgs/"+wolfName+i+".png";
					if(i<= 0){
						clearInterval(hideImgTask);
		        	img.remove();
					}					
					},50);		
				},500);			
	    	}		
	},50);
	
	//5、游戏计分 当img点击，则进行计分
	img.onclick = function(){
		//a.点击事件可能发送狼上升、等待、下降过程
		clearInterval(showImgTask);
		clearInterval(task);
		clearInterval(hideImgTask);
		
		//b.显示狼被打击的动画
		var j = 6;
		var hitTask = setInterval(function(){
			img.src = "imgs/"+wolfName+j+".png";
			j++;
			if(j>9){
				clearInterval(hitTask);
				img.remove();
			}
		},50);
		
		if(wolfName == "h"){
			score = score + 10;
			
		}else{
			score = score - 10;
			
		}
		fractionDiv.innerHTML = score;
	}
}



overBin.onclick = function(){
	
	var co = window.confirm("请问你确定退出吗？");
	if(co == true){
		window.close();
	}
}

 reloadBin.onclick = function(){


	 
 }

