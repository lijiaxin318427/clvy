new IScroll("#home",{

	mouseWheel:true,
    scrollbars:true
});
new IScroll("#list");


var Dates = null;
//ajax返回数据

$.ajax({
	url:'data/data.json',
	dataType:"json",
	success:function(data){

		Dates=data;
	}
})




$(".container").on('click','a',function(e){

	e.preventDefault();

	var that = $(this).attr("href");

	
		ljx(that)
	var idx = $(this).index();


	if( this.parentNode.nodeName=='NAV' ){
		$("#mark").css({
			transition:'all .3s',
			left:idx*25+"%"
		})
	}
	//首页效果
	resetHead($(this));
})

function resetHead(dom){
//改变header内容的
	var href = dom.attr('href'),
		returns = $("#return"),
		fav = $("#fav"),
		search = $("#search"),
		id=dom.attr("id");


	if(href=='#favorite'){
		$('header').find("h2").text("收藏");
		returns.show().
		on('click',function(){
			ljx($('#home'))
			$('header').find("h2").text("孕育宝典");
		})
	}else if(href=='#history'){
		returns.show()
		$('header').find("h2").text("历史记录");
			returns.on('click',function(){
			ljx($('#home'))
			$('header').find("h2").text("孕育宝典");
		})
		
	}else if(href=='#home'){
		returns.hide()
		
	}else if(href=='#lists'){
		returns.show().
		on('click',function(){
			ljx($('#list'))
			$('header').find("h2").text("孕前准备");
			
			
		})
		
		
	}else if(href=='#list'){
		returns.show().
			on('click',function(){
			ljx($('#home'))
			$('header').find("h2").text("孕前准备");
			
			
		})
		search.hide();
		
		$('header').find("h2").text(dom.attr("title"));
		
		var str = '';
			
		$.each(Dates[id].fenlei,function(idx,val){

			console.log(idx);
			str+=`
				<div>
					<a href='#add' id='${id}_${idx}'>
					<img src="img/tu/${val.img}" alt="" />
					<h2>${val.title}</h2>
					</a>
				</div>
			`
		})		


		$("#list_iscroll").append(str);

	}else if(href=='#add'){
returns.show().
			on('click',function(){
			ljx($('#list'))
			$('header').find("h2").text("孕前准备");
			
			returns.show().
			on('click',function(){
			ljx($('#home'))
			$('header').find("h2").text("孕前准备");
			
			
		})
		})
		var str =  dom.attr("id");

		var arr = str.split("_");

		var add = "";
		add+=Dates[arr[0]].fenlei[arr[1]].content;
		
		$('.add_iscroll').append(add);

		console.log(Dates[arr[0]].fenlei[arr[1]].content)


	}
	

}

function ljx(dom){
	$(dom).css({
		transition:'all .3s',
		transform:'translateX(0)'

	}).siblings().css({
		transition:'all .3s',
		transform:'translateX(100%)'
	})

}
