$(function() {

// Общие переменные	
	var fadeSpeed = 300;
	var slideSpeed = 500;
	var menuSpeed = 200;
	var tabsArray = [
		$('#seminars'),
		$('#clients'),
		$('#seminars_main')
	];
	var block = {
		slider: false,
		celender: false,
		popup: false
	}
	
	var hostname = document.location.protocol + '//' + document.location.hostname;
		
//---------------------------------------Закладки на странице курсов---------------------------------------
course_tabs = $('.course_tab');
courses = $('.course_tabs').next().find('li');
if( course_tabs.length ){
	course_tabs.each(function(i, item){
		$(item).bind('click', function(e){
			e.preventDefault();
			course_tabs.removeClass('active');
			$(item).addClass('active');
			courses.hide();
			courses.filter('.group_'+$(this).attr('id')).show();
		})
	})
	course_tabs.eq(0).click();
}

//---------------------------------------Изображения офисов---------------------------------------
	$('.more_photos').bind('click', function(e){
		e.preventDefault();
		more_link = $(this);
		$(this).after('<img src="/images/loader.gif" style="padding-left:6px" />');
		data = $(this).attr('id').split('_');
		$.ajax({
			url				: hostname + '/about/offices/offices_'+data[1]+'.html?template=28',
			dataType		: "html",
			error				: function(jqXHR, textStatus, errorThrown){
				alert('jqXHR - ' + jqXHR);
				alert('textStatus - ' + textStatus);
				alert('errorThrown - ' + errorThrown);
			},
			success		: function(msg){
				more_link.parent().prev().remove();
				more_link.parent().parent().append(msg);
				more_link.parent().remove();
			}
		})		
	})

//---------------------------------------Фильтрафия отзывов---------------------------------------	
	$('.sresponses').selectBox({menuTransition: 'slide',menuSpeed: 300});
	$('.sresponses').selectBox().change( function() {
		response_div = $(this).next().next();
		response_div.html('');
		response_div.append('<img src="/images/loaderb.gif" style="padding-left:6px" />')
		$.ajax({
			url				: hostname + '/corporate/responses/?template=28&isAjax=1&type=' + $(this).val(),
			dataType		: "html",
			error				: function(jqXHR, textStatus, errorThrown){
				alert('jqXHR - ' + jqXHR);
				alert('textStatus - ' + textStatus);
				alert('errorThrown - ' + errorThrown);
			},
			success		: function(msg){
				response_div.html('');
				response_div.append(msg);
			}
		})
	} );

//---------------------------------------Фильтрация курсов---------------------------------------	
	$('.allcourses').selectBox({menuTransition: 'slide',menuSpeed: 300});
	$('.allcourses').selectBox().change( function() {
		allcourses_div = $(this).next().next();
		allcourses_div.html('');
		allcourses_div.append('<img style="margin-left: 30px" src="/images/loaderb.gif" style="padding-left:6px" />')
		$.ajax({
			url				: hostname + '/course-series/courses/?template=28&isAjax=1&nc_ctpl=291&SId=' + $(this).val(),
			dataType		: "html",
			error				: function(jqXHR, textStatus, errorThrown){
				alert('jqXHR - ' + jqXHR);
				alert('textStatus - ' + textStatus);
				alert('errorThrown - ' + errorThrown);
			},
			success		: function(msg){
				allcourses_div.html('');
				allcourses_div.html('');
				allcourses_div.append(msg);
			}
		})
	} );
	
//---------------------------------------Фильтрация семинаров---------------------------------------	
	$('.allseminars').selectBox({menuTransition: 'slide',menuSpeed: 300});
	$('.allseminars').selectBox().change( function() {
		allcourses_div = $(this).next().next();
		allcourses_div.html('');
		allcourses_div.append('<img style="margin-left: 30px" src="/images/loaderb.gif" style="padding-left:6px" />')
		$.ajax({
			url				: hostname + '/seminars-series/seminars/?template=28&isAjax=1&nc_ctpl=292&SId=' + $(this).val(),
			dataType		: "html",
			error				: function(jqXHR, textStatus, errorThrown){
				alert('jqXHR - ' + jqXHR);
				alert('textStatus - ' + textStatus);
				alert('errorThrown - ' + errorThrown);
			},
			success		: function(msg){
				allcourses_div.html('');
				allcourses_div.html('');
				allcourses_div.append(msg);
			}
		})
	} );

//---------------------------------------Слайдер дат---------------------------------------
	var yearSpeed	= 500;  // скорость прокрутки партнеров
	var yearDiff		= 1;    // количество позиций, смещающихся при прокрутке партнеров
	var yearMargin	= 22;    // количество позиций, смещающихся при прокрутке партнеров
	var yearAll		= 9 ;    // количество позиций, смещающихся при прокрутке партнеров
	
	$('.block-year').each(function() {
		var curSlider = $(this);
		if (curSlider.find('li').length > yearAll) {
			curSlider.data('curIndex', 0);
			curSlider.find('ul').width(curSlider.find('li').length * (curSlider.find('li:first').width() + yearMargin) );
		} else {
			$('.block-year .prev, .block-year .next').hide();
		}
	});
	$('.block-year .prev').click(function() {
		var curSlider = $('.block-year');
		var curIndex = curSlider.data('curIndex');

		curIndex -= yearDiff;
		if (curIndex < 0) {
			curIndex = 0;
		}
		curSlider.data('curIndex', curIndex);

		curSlider.find('ul').animate({'left': -curIndex * (curSlider.find('li:first').width() + yearMargin)}, yearSpeed);

		return false;
	});

	$('.block-year .next').click(function() {
		var curSlider = $('.block-year');
		var curIndex = curSlider.data('curIndex');

		curIndex += yearDiff;
		if (curIndex >= curSlider.find('li').length - yearAll) {
			curIndex = curSlider.find('li').length - yearAll;
		}
		curSlider.data('curIndex', curIndex);

		curSlider.find('ul').animate({'left': -curIndex * (curSlider.find('li:first').width() + yearMargin) }, yearSpeed);

		return false;
	});
		
//---------------------------------------Нижний слайдер---------------------------------------
	$('.wrap-carous .carousel').each(function(){
		var slider = this;
		slider.ul = $('ul',slider);
		slider.ul.li = $('li',slider.ul);

		$('.n-right, .n-left',slider).click(function(){
			if( block.slider ) return false;
			block.slider = true;
			slider.ul.li.wid = slider.ul.li.outerWidth(true);
			slider.ul.li.maxWidth = slider.ul.li.length * slider.ul.li.wid - (slider.ul.li.wid * 8);
			slider.ul.left = slider.ul.getleft() * (-1);
			if( $(this).hasClass('n-right') ){
				if( (slider.ul.left + slider.ul.li.wid) <= slider.ul.li.maxWidth )
					$(slider.ul).animate({'left': '-='+slider.ul.li.wid},slideSpeed,function(){block.slider = false;});
				else block.slider = false;
			} else {
				if( slider.ul.left != 0 )
					$(slider.ul).animate({'left': '+='+slider.ul.li.wid},slideSpeed,function(){block.slider = false;});
				else block.slider = false;
			}		
			return false;
		});		
	});
	
//---------------------------------------Календарь---------------------------------------	

	//window.CustomScroller("resize");
	window.onload = function(){
		$('.tab-scheul table .block-act').hide();
	}
	
	
	$('.tab-scheul table').each(function(){
		var cel = this;
		cel.td = $('td',cel);
		cel.td.select = null;
		
		$('.block-act .scroll .closes').click(function(){
			$('.b-act',cel.td.select).css({'border':'none'});
			$(cel.td.select).css({'border':'none'});
			$(this).parent().parent().hide();
			$(cel.td.select).removeClass('open');
		});	
		
		$('.block-act .scroll .closes, td',cel).live('click',function(){
			if(!($(this).hasClass('open')) ){
				var self = this;
				if( $(self).hasClass('b-act') ){
					cel.td.select = self;
					$('div.b-act',self).css({'border':'2px solid transparent','borderRight':'none'});
					$(self).css({'border':'2px solid #2A776A', 'borderRight':'none' });
					$('.block-act',self).show();
					$(self).addClass('open');
				} else $(self).toggleClass('active');
				
			} 
			return false;
		});
	});
	
//---------------------------------------Верхний сладер---------------------------------------	
	$('.block-slide').each(function(){
		var slider = this;
		slider.nav = $('.nav-slide ul li',slider);
		slider.info = $('.cont-slide',slider);
		slider.img = $('img',slider).first();
		
		$(slider.nav).live('click',function(){
			if( block.slider || $(this).hasClass('active')) return false;
			block.slider = true;
			$(this).addClass('active').siblings().removeClass('active');
			var img_src = 'images/slider.jpg';
			var info = '<div class="date-cont">'+$(".date-nav",this).html()+'</div>\
			<p><span>Институт МФЦ</span> приглашает принять участие <span>в семинаре</span></p>\
            <a href="#">«Актуальные вопросы регулирования деятельности некоммерческих организаций, включая новации.</a>';
			
			$('.cont-slide, img:first',slider).fadeOut(fadeSpeed,function(){
				$(slider.info).html(info);
				$(slider.img).attr('src',img_src);
				$('.cont-slide, img:first',slider).fadeIn(fadeSpeed,function(){block.slider = false;})			
			});

		});	
	});

//----------------------------------------Слайд----------------------------------
	// $('.progr').each(function(){
		// var self = this;
		// var li_len = $('.list li',self).length;
		// var hide_pos = 4;
		// $('.list li',self).slice(hide_pos,li_len).hide();
		
		// $('.p-more',self).click(function(){
			// $(this).toggleClass('active');
			// if(! $(this).hasClass('active') )
				// $('span',this).text('Показать больше').css({'background':'url("/images/mark-more.png") right 4px no-repeat'});
			// else 
				// $('span',this).text('Свернуть').css({'background':'url("/images/mark-less.png") right 4px no-repeat'});
				
			// $('.list li',self).slice(hide_pos,li_len).slideToggle(100);	
			// return false;
		// });
	// });

	$('.p-more').click(function(){
		$(this).toggleClass('active');
		if(! $(this).hasClass('active') )
			$('span',this).text('Показать больше').css({'background':'url("/images/mark-more.png") right 4px no-repeat'});
		else 
			$('span',this).text('Свернуть').css({'background':'url("/images/mark-less.png") right 4px no-repeat'});
			
		$(this).next().slideToggle(100);	
		return false;
	});
	
	$(tabsArray).tabs();
	$('.custom_select').selectBox({menuTransition: 'slide',menuSpeed: 300});
	$('.block-oform select').selectBox({menuTransition: 'slide',menuSpeed: 300});
	
//--------------------------------------Заказы-----------------------------------
	$('.order').each(function(){
		var self = this;
		var table = $('table',self);
		table.td = $('td',table);

		$('div.del',table.td).click(function(){
			$(this).parent().parent().fadeOut(fadeSpeed,function(){$(this).remove();});
			return false;
		});
		
		$('.title-data2 .b-button').live('click',function(){
			var but = this;
			$(table).fadeOut(fadeSpeed,function(){$(this).remove();});
			return false;
		});
	});
	
	$('.p-guide').click(function(){
		$(this).toggleClass('active');
		if(! $(this).hasClass('active') )
			$('span',this).text('Как проехать').css({'background':'url("/images/mark-more.png") right 4px no-repeat'});
		else 
			$('span',this).text('Свернуть').css({'background':'url("/images/mark-less.png") right 4px no-repeat'});
			
		$(this).prev().slideToggle(100);
		return false;
	});
	
//---------------------------------------Popup--------------------------------------
	$('#popup, #popup .window').css({
			'min-height' : $('body').outerHeight(true),
			'height' : 'auto'
	});	
	
	$('.block-avt .input a').click(function(){
		if( block.popup ) return false;
		$('#popup, #popup .login').fadeIn(fadeSpeed);
		return false;
	});
	
	$('#popup .login').each(function(){
		var popup = this;
		$('.reg a',popup).click(function(){
			block.popup = true;
			$(popup).fadeOut(fadeSpeed,function(){
				$('#popup .register').fadeIn(fadeSpeed,function(){block.popup = false;});		
			});	
		});
		$('.ask-r a',popup).click(function(){
			block.popup = true;
			$(popup).fadeOut(fadeSpeed,function(){
				$('#popup .forgot').fadeIn(fadeSpeed,function(){block.popup = false;});		
			});	
		});
	});

	$('#popup .register').each(function(){
		var popup = this;
		$('.ask-r a',popup).click(function(){
			block.popup = true;
			$(popup).fadeOut(fadeSpeed,function(){
				$('#popup .login').fadeIn(fadeSpeed,function(){block.popup = false;});		
			});	
		});
	});
	
		
	$('#popup, #popup .close').not('#popup .pop').click(function(){
		block.popup = true;
		$('#popup, #popup .pop').fadeOut(fadeSpeed,function(){block.popup = false;});
	});
	
	$('#popup .pop').click(function(){return false;})
	$('#popup .form_auth_submit').click(function(){
		$('#popup .form_auth').submit();
	})
	
//----------------------------------------Меню--------------------------------------
	// $('.head-top ul li.drop').click(function(e){
		// $('.drop_menu',this).slideToggle(menuSpeed).toggleClass('open');
		// if( $('.drop_menu',this).hasClass('open') ) {
			// $('a span',this).css({'background':'url("/images/but-right-top.png") no-repeat'});
			// e.preventDefault();
		// } else {
			// $('a span',this).css({'background':'url("/images/but-right.png") no-repeat'});
		// }
	// });

//---------------------------------------Дополнительные функции---------------------------------------
	//Достает позицию left элемента
	jQuery.fn.getleft = function(){
		var left =  $(this).css('left');
		return left = +(left.substring(0,left.length-2));
	}

	var input = $('input[type="text"]'); // input text field
	$.each(input, function(i, item){
		var default_value = $(item).val();
		$(item).live('focus', function(){
			if ($.trim($(input).val()) == default_value) $(item).val('');
		});
		$(item).live('blur', function(){
			if ($.trim($(item).val()) == '') $(item).val(default_value);
		});		
	})
})