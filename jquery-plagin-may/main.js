;(function(){

	var defaults = {
		title: 'На какую реку вы хотите пойти?',
		otvety: ['Hoper', 'Belaia', 'Velikaia', 'Pra'],
		button: 'Ответить',
		classContainer: 'pohod',
		classForm: 'form-main',
		classBtn: 'btn-submit',
		ajaxOption: {
			type: "POST",
			url: '',
			//contentType: 'application/json; charset=utf-8',
			dataType: 'json'
		}
	}
	var Pohod = function(element, options){
		var _this = this;
		this.config = $.extend(true, {}, defaults, options);
		this.element = element;
		

		this.element.on('submit', function(e){
			e.preventDefault();
			console.log('Submit!!!');

			var dataObj = JSON.stringify({selected: _this.config.button});
			var ajaxSitings = $.extend({}, _this.config.ajaxOption, dataObj);
			$.ajax(ajaxSitings).done(function(){
				
			})
		})
		this.element.one('change', function(e){
			_this.element.find('button').removeAttr('disabled');
		})

		$.each(_this.config, function(key, val){
			if(typeof val === 'function'){
				_this.element.on(key + '.pohod', function(){
					val(_this.element);
				})
			}
		})
		this.init();
	}
	Pohod.prototype.init = function(){
		this.element.addClass(this.config.classContainer);
		$('<h1/>', {
			text: this.config.title
		}).appendTo(this.element);

		var form = $('<form/>').addClass(this.config.classForm).appendTo(this.element);

		var x, y;

		for(x = 0, y = this.config.otvety.length; x < y; x++){
			$('<input/>', {
				type: 'radio',
				name: 'reki',
				id: this.config.otvety[x],
				value: this.config.otvety[x]
			}).appendTo(form);

			$('<label/>', {
				for: this.config.otvety[x],
				text: this.config.otvety[x]
			}).appendTo(form)
		}

		$('<button/>', {
			type: 'submit',
			text: this.config.button,
			class: this.config.classBtn,
			disabled: 'disabled'
		}).appendTo(form);
		this.element.trigger('created.pohod');
	}
	$.fn.pohod = function(options){
		new Pohod(this.first(), options);
		return this.first();
	}
}())



;(function(){
	$('.pohod').pohod({
		title: 'Какая байдарка вам больше нравится?',
		otvety: ['Щука', 'Таймень', 'Викинг', 'Е2012', 'Каньен'],
		created: function(el){console.log(el.attr('class'))}
	});
}())