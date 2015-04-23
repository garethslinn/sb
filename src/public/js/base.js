var modules = modules || {};
modules.Rps = modules.Rps || {};
modules.Rps = (function($){

    'use strict';

    var config = {
        body : $('body'),
        scoreBoard : $('.score'),
        choice : $('.choice a'),
        reset: $('.reset'),
        options : ['rock', 'paper', 'scissors'],
        imgOne: $('.one .img'),
        imgTwo: $('.two .img'),
        humanMode: $('.mode .human'),
        computerMode: $('.mode .computer'),
        auto: $('.auto')
    };

    function Rps() {
        this.events();
    }

    Rps.prototype.computerChoice = function () {
        return Math.floor(Math.random() * 3);
    };

    Rps.prototype.automatic = function () {
        var that = this;
        setTimeout(function(){
            that.selection($('.'+config.options[that.computerChoice()]), config.options[that.computerChoice()]);
            config.auto.hide();
        }, 1000);
    };

    Rps.prototype.selection = function (el) {
        config.choice.hide();
        var cn = el.attr('class');
        config.imgOne.removeClass().addClass('img '+cn+'-img');
        this.test(cn, config.options[this.computerChoice()]);
    };

    Rps.prototype.showChoice = function () {
        config.choice.show();
        config.reset.hide();
    };

    Rps.prototype.showAuto = function () {
        config.choice.hide();
        config.reset.hide();
        config.auto.show();
    };

    Rps.prototype.hideAuto = function () {
        config.choice.show();
        config.reset.hide();
        config.auto.hide();
    };
    Rps.prototype.setMode = function () {
        config.computerMode.removeClass('selected');
        config.humanMode.addClass('selected');
    };
    Rps.prototype.reset = function () {
        config.imgOne.removeClass().addClass('img ');
        config.imgTwo.removeClass().addClass('img ');
        config.scoreBoard.text('');
        this.showChoice();
    };

    Rps.prototype.score = function (player,cn,draw) {
        var that = this, message;
        if (draw) {
            message = 'This was a draw';
        } else {
            message = 'Player ' + player + ' wins!';
        }
        setTimeout(function(){
            config.imgTwo.removeClass().addClass('img '+cn+'-img');
            config.reset.show();
            config.scoreBoard.append(message);
            that.setMode();
        }, 1000);
    };

    Rps.prototype.test = function (aa,bb) {
        if (aa === bb ) {
            this.score('1',bb,true);
        } else if (aa === "rock") {
            if (bb === "scissors") {
                console.log("rock wins");
                this.score('1',bb,false);
            } else {
                console.log("paper wins");
                this.score('2',bb,false);
            }
        }
        if (aa === "paper") {
            if (bb === "rock") {
                console.log("paper wins");
                this.score('1',bb,false);
            } else {
                if (bb === "scissors") {
                    console.log("scissors wins");
                    this.score('2',bb,false);
                }
            }
        }
        if (aa === "scissors") {
            if (bb === "rock") {
                console.log("rock wins");
                this.score('2',bb,false);
            } else {
                if (bb === "paper") {
                    console.log("scissors wins");
                    this.score('1',bb,false);
                }
            }
        }
    };

    Rps.prototype.events = function () {
        var that = this;
        config.reset.on("click", function () {
            that.setMode();
            that.reset();
        });
        config.choice.on("click", function (e) {
            e.preventDefault();
            that.selection($(this));
        });
        config.computerMode.on("click", function () {
            config.humanMode.removeClass('selected');
            config.computerMode.addClass('selected');
            that.reset();
            that.showAuto();
            that.automatic();
        });
        config.humanMode.on("click", function () {
            config.humanMode.addClass('selected');
            config.computerMode.removeClass('selected');
            that.reset();
            that.hideAuto();
        });
    };

    return Rps;
})(jQuery);

modules.Rps = new modules.Rps();

