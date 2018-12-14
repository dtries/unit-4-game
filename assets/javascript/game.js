$(document).ready(function () {
    //set ids to variables
    var goodImg = $("#good");
    var badImg = $("#bad");
    var weirdImg = $("#weird");
    var thugsImg = $("#thugs");


    var allfighters = {
        good: {
            health: 140,
            attack: 13,
            counter: 26,
            losePic: "dysentery.jpeg",
        },

        bad: {
            health: 120,
            attack: 17,
            counter: 34,
            losePic: "dysentery.jpeg",
                },

        weird: {
            health: 180,
            attack: 9,
            counter: 18,
            losePic: "dysentery.jpeg",  
              },
        thugs: {
            health: 220,
            attack: 7,
            counter: 21,
            losePic: "dysentery.jpeg",        }
    };

    var player = "";
    var foe = "";
    var myfoe = "";
    var currentAttack = 0;
    var wins = 0;
    var restartBtn = $("<button>Restart</button>");
    var attackBtn = $("<button>ATTACK!</button>");
    attackBtn.addClass("btn btn-dark");

// Click on a fighter makes it the player's character & calls the playerIsHere function
    $(".fighter").on("click", function () {
        if (!player) {
            player = allfighters[$(this).val()];
            playerIsHere();
            $("#player-body").append(this);
            $("#player-health").append(player.health);
            $("player-attack").append(player.attack);
            //the fighter is reassigned as player class
            $(this).attr("class", "player-class");
            $(".Fighter-Wrapper").addClass("disappear");
        }
    });
//A fighter clicked within the BadGuy box becomes the current foe.
    $("#BadGuy-box").on("click", ".fighter", function choosefoe() {
        if (!myfoe) {
            $("#message-box, #attack-nar").empty();
            myfoe = this;
            foe = allfighters[$(this).val()];
            //remaining fighters lose the fighter class to become available for selection as foes
            $(this).removeClass("fighter");
            $("#foe-body").append(this);
            $("#foe-health").append(foe.health);
            $("#foe-counter").append(foe.counter);
            $("#attack-button").append(attackBtn);
            $("#foe-box").removeClass("hidden");
            $(".battle-box").removeClass("hidden");
        }
    });
//the BadGuy box & player box become visiable. The enemies are moved to the BadGuy box for selection.
    function playerIsHere() {
        $("#BadGuy-box").removeClass("hidden");
        $("#BadGuy-body").append(goodImg, badImg, weirdImg, thugsImg);
        $("#player-box").removeClass("hidden");
    };

    $("#attack-button").on("click", function () {
        playerAttack();
        counterAttack();
        if (wins === 3) {
            youWon();
        }
    });

    function playerAttack() {
        currentAttack += player.attack;
        foe.health -= currentAttack;
        $("#attack-nar").text("You caused " + currentAttack + " damage!")
        $("#foe-health").text(foe.health);
        if (foe.health <= 0 && player.health > 0) {
            foeDied();
        };
        $("#player-attack").text(player.currentAttack);
    }

    function counterAttack() {
        if (foe.health > 0) {
            player.health -= foe.counter;
            //Should player die, the attack button disappears, restart button appears, special pic appears
            if (player.health <= 0) {
                $("#message-box").append("You are but food for worms.");
                $(".player-class").html("<img src='assets/images/" + player.losePic + "' class='img-fluid'>");
                makeRestartBtn();
                $("#attack-button").empty();
               
            };
            $("#attack-nar").append("<br><br><div>Your opponent attacked and you took " + foe.counter + " damage!</div>");
            $("#player-health").text(player.health);

        }
    };

    //when a foe is defeated class changes so can't be selected;
    //variables foe and myfoe are emptied to allow player to pick next adversary.
    function foeDied() {
        wins++;
        $(myfoe).addClass("defeated");
        $("#BadGuy-body").append(myfoe);
        $("#foe-body, #foe-health, #attack-button, #foe-counter").empty();
        $("#message-box").append("You eliminate your foe! Choose another!");
        foe = "";
        myfoe = "";
    }

    function youWon() {
        $("#attack-nar").empty();
        $("#message-box").text("You have vanquished all foes! You win!");
        makeRestartBtn();
    };

    $("#restart").on("click", function () {
        document.location.reload(true);
    });

    function makeRestartBtn() {
        restartBtn.addClass("btn btn-success");
        $("#restart").append(restartBtn);
    }

}); //closes document.ready