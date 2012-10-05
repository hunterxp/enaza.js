/*
  
  Чураков Андрей fobazzz@yandex.ru 29.11.2011  
  Автоматическая смена Фона на сайте
  
  ====
  Принимает 2 параметра 
  elClick - элемент по которому можно кликать
  elBg    - Элементу будет присвоена картинка фона
  
  ====
  Для установки на сайте в документ реди или аналоги добавить функцию
  backgroundChange(elClick,elBg);
  
  ====

  Фоны берутся из ветрины **$sw.background** и ложатся в переменную **siteParams.background**
  Правила выбора фона смотреть в вики
  
  TODO:
  1. Сделать прелоадер картинок фона.
  2. Убрать унбинд и сделать по параметрам. 
  
*/

var backgroundChange = function (elClick,elBg) {
    
    
    var elClick = $(elClick);
    var elBg    = $(elBg);
    var go2Url  = '';
    var urlPrifix = 'URL:';
    console.log($(elBg));
    
    // Выбор переменной фона
    var _background = function () {
        if (siteParams.background.length  == 0 ) {
            console.log('Нет фонов для смены');
        }
        return siteParams.background;
    };
    
    // Название текущей категорий
    var _getCaregory = function () {
        var cat = siteParams.currentCategory;
        return  siteParams.category[cat];
    };
    
    // Урл текущей страници
    var _getUrl = function () {
        return  window.location.href;
    };
    
    // Фильтр фонов
    var _filter = function (background) {
        
        var result = [];
        var bg2Url = false;
     
        
        // Проверка если фон специально для этого урала
        $.each(background,function (key,value) {
            var ruleArray = value.rule.split(',');
               
            if (_checkUrl(ruleArray)) {
                console.log('filter',bg2Url);
                bg2Url = true;
                result.push(background[key]);
            } 
        });
    
        // Выбор фона по правилам
        if (!bg2Url) {
            $.each(background,function (key,value) {
                var ruleArray = value.rule.split(',');
                if (_filterCheck(ruleArray)) {
                    result.push(background[key]);
                } 
            });
        }

        return result;
    };
    
    // Проверка для урла
    var _checkUrl = function (rule) {
        var result = false; 
        var currentUrl= _getUrl();
        
        $.each(rule,function (key,value) {
            
            if (value.indexOf(urlPrifix) > -1) {
                value = value.substring(urlPrifix.length, value.length);
               // console.log(value);
                if (currentUrl.indexOf(value) > -1) {
                    result = true;
                }  
            }
        });        
        
        return result;
    };
    
    
    // Проверка по категорий
    var _filterCheck = function (rule) {
        var result = false; 
        var currentCategory = _getCaregory();
        
        $.each(rule,function (key,value) {
            if (value == currentCategory) {
                result = true;
            }

        });        
        return result;
    };
    
    // Получить значение фона
    var _getRandomBg = function (){
        
      var bg = _background();
      var validBg = _filter(bg);
      var index   = Math.round(Math.random() *(validBg.length-1));
      var result  =  validBg[index];
      

      if (typeof validBg[index] != 'undefined') {
        _setRandom(result); 
      }            
    };
    
    
    
    
    //  Задать рандомный фон
    var _setRandom = function (bg) {
        elClick.unbind('click');
        elClick.click(function () {
                window.location.href = bg.url;
         });  

        

        
        $(elBg).css({
            'background-image':'url('+bg.image+')'
        }).addClass('js_promo_fon');

    };
    
    
    _getRandomBg();
    
    /*
    return {
        init : function () {

 
        }
    };
    */
    
    return true;
};