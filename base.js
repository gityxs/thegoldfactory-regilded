/*

	As you can see, i'm not a javascript master (Me neither!)
	The code is full of functions :o

	Btw, there are very very few comments that explain the code >:) HAHAHAHA
	
	(Not really a problem, the code is very self-explanatory.) 

	Hope you enjoyed the game (I did!)
	(I want you to read this after finishing the game or things in this game may be spoiled to you)

*/

var enemy_attack_timer;
var healthtimeout;
var skilltimeout;
var potiontimeout;
var invulnerabilitydelay;
var irondivisor = 600;
var golddivisor = 200;
var secondrealm = false;
var instasused = 0;
var battleid = 1;
function randomnumber(min,max) {
	return Math.floor(Math.random()*(max-min)+min);
}
function closemessage() {
	$(".alert").fadeOut("fast");
	$(".modal").fadeOut("fast");
}
function updategold() {
	$("#gold-bar").html(goldbar);
	$("#iron-bar").html(ironbar);

	if(ironmining>0 && ironmining<=59) {
		ibpt=ironmining;
		ibtime=3600;
	}
	else if(ironmining>59 && ironmining<=199) {
		ibpt=Math.round((ironmining-59)/2.3);
		if(ibpt==0) {
			ibpt=1;
		}
		ibtime=60;
	}
	else if(ironmining>199 && ironmining<4717) {
		ibpt=Math.round((ironmining-219)/4.5);
		if(ibpt==0) {
			ibpt=1;
		}
		ibtime=1;
	}
	else if(ironmining>=4717) {
		ibpt=1000;
		ibtime=1;
	}

	if(goldmining<30) {
		goldmining=30;
	}

	if(buyfactory==true) {
		gbps=Math.round(goldmining/10);
	}
}
function updateitems() {
	$("#otheritems").html("");
	for(i=0;i<items.length;i++) {
		thisitem=items[i];
		if(thisitem.owned>0 && thisitem.showstorage) {
			if(thisitem.owned!=1) {
				plural=thisitem.plural;
			}
			else {
				plural="";
			}
			thestorage=$("#otheritems").html();
			$("#otheritems").html(thestorage+"<br>"+thisitem.owned+" "+thisitem.name+plural);
		}
	}
	cut=$("#otheritems").html().substring(4);
	$("#otheritems").html(cut);
	$(".iron-mining-amount").html(ironmining);
	$(".ibpt").html(ibpt);
    $(".skilllvl").html(skilllvl);
    $(".thunder-damage").html(20+skilllvl*10);
    $(".invuln-time").html((3+skilllvl));
    $(".upgrade-price").html(skilllvl*skilllvl*500+500);
	$(".change-price").html(skilllvl*skilllvl*250+250);
	$(".irontime").html(second2name(ibtime));
	$(".gold-mining").html(goldmining);
	$(".gbps").html(gbps);
	ironprice=10+Math.floor(ironmining*ironmining/irondivisor);
	$(".1-iron-cost").html(ironprice);
	$(".10-iron-cost").html(calculateTotalPrice(ironmining, 10, irondivisor));
	$(".100-iron-cost").html(calculateTotalPrice(ironmining, 100, irondivisor));
	goldprice=10+Math.floor(goldmining*goldmining/golddivisor);
	$(".1-gold-cost").html(goldprice);
	$(".10-gold-cost").html(calculateTotalPrice(goldmining, 10, golddivisor));
	$(".100-gold-cost").html(calculateTotalPrice(goldmining, 100, golddivisor));

	if(enchant_attack==0 && enchant_defense==0 && enchant_countdown==0 && enchant_life==0) {
		$(".enchants").html("Your sword is not enchanted. You should probably do something about that.");
	}
	else {
		enchant_html="Your sword is enchanted with:<br>";
		if(enchant_attack>0) { enchant_html=enchant_html+"Attack "+enchant_attack+" (+"+(enchant_attack*7)+" damage)<br>"; }
		if(enchant_defense>0) { enchant_html=enchant_html+"Defense "+enchant_defense+" (Absorbs "+(enchant_defense*2)+"% damage)<br>"; }
		if(enchant_countdown>0) { enchant_html=enchant_html+"Countdown "+enchant_countdown+" (You attack a little bit faster)<br>"; }
		if(enchant_life>0) { enchant_html=enchant_html+"Life "+enchant_life+" (Heals "+enchant_life*2+" HP each time you attack)<br>"; }
		$(".enchants").html(enchant_html);
	}
	$(".enchant-attack-price").html(enchant_attack*enchant_attack*2000+2000);
	$(".enchant-defense-price").html(enchant_defense*enchant_defense*2500+2500);
	$(".enchant-countdown-price").html(enchant_countdown*enchant_countdown*5000+5000);
	$(".enchant-life-price").html(enchant_life*enchant_life*2500+2500);
	$(".button-enchant-attack").attr("value","Attack "+(enchant_attack+1));
	$(".button-enchant-defense").attr("value","Defense "+(enchant_defense+1));
	$(".button-enchant-life").attr("value","Life "+(enchant_life+1));

	if(enchant_countdown==0) {
		$(".button-enchant-countdown").attr("value","Countdown 1");
	}
	else {
		$(".button-enchant-countdown").attr("disabled",true);
		$(".enchant-sword-countdown").html("Countdown 1 is the highest level of the countdown enchantment!");
	}

	if(enchant_defense==10) { $(".button-enchant-defense").attr("disabled",true); }
	if(enchant_life==10) {
		$(".button-enchant-life").attr("disabled",true);
		$(".enchant-sword-life").html("Life 10 is the highest level of the life enchantment!");
	}

	if(airplanecountdown==0) {
		if(typeof flyingabcd !== 'undefined') {
			clearInterval(flyingabcd);
		}
		reachedclouds=true;
	}
	if(airplanecountdown<0) {
		airplanecountdown=0;
	}

	if(digcountdown<=0) {
		clearInterval(digabcd);
		dig(false);
		digcountdown=999999999;
	}

	if(helmet==0) {
		$(".button-buy-helmet").val("Buy a leather helmet");
	}
	else if(helmet==1) {
		$(".button-buy-helmet").val("Buy a chain helmet");
	}
	else if(helmet==2) {
		$(".button-buy-helmet").val("Buy an iron helmet");
	}
	else if(helmet==3) {
		$(".button-buy-helmet").val("Buy a diamond helmet");
	}
	else {
		$(".helmet-area").html("Sorry, I have no better helmet for you.");
	}

	if(chestplate==0) {
		$(".button-buy-chestplate").val("Buy a leather chestplate");
	}
	else if(chestplate==2) {
		$(".button-buy-chestplate").val("Buy a chain chestplate");
	}
	else if(chestplate==4) {
		$(".button-buy-chestplate").val("Buy an iron chestplate");
	}
	else if(chestplate==6) {
		$(".button-buy-chestplate").val("Buy a diamond chestplate");
	}
	else {
		$(".chestplate-area").html("Sorry, I have no better chestplate for you.");
	}

	if(pants==0) {
		$(".button-buy-pants").val("Buy leather pants");
	}
	else if(pants==1.5) {
		$(".button-buy-pants").val("Buy chain pants");
	}
	else if(pants==3) {
		$(".button-buy-pants").val("Buy iron pants");
	}
	else if(pants==4.5) {
		$(".button-buy-pants").val("Buy diamond pants");
	}
	else {
		$(".pants-area").html("Sorry, I have no better pants for you.");
	}

	if(boots==0) {
		$(".button-buy-boots").val("Buy leather boots");
	}
	else if(boots==0.5) {
		$(".button-buy-boots").val("Buy chain boots");
	}
	else if(boots==1) {
		$(".button-buy-boots").val("Buy iron boots");
	}
	else if(boots==1.5	) {
		$(".button-buy-boots").val("Buy diamond boots");
	}
	else {
		$(".boots-area").html("Sorry, I have no better boots for you.");
	}

	$(".buy-helmet-price").html((helmet*helmet)*1000+1000);
	$(".buy-chestplate-price").html((chestplate*chestplate)*1000+1000);
	$(".buy-pants-price").html((pants*pants)*1000+1000);
	$(".buy-boots-price").html((boots*boots)*1000+1000);

	$(".absorb-percent").html(helmet+chestplate+pants+boots);

	$(".current-cookie").html(items[19].owned);
	$(".cps").html(cursor/10);
	$(".cursor-button").val("Cursor ["+cursor+"]");
	$(".cursor-price").html(15*Math.pow(1.15,cursor));

	$(".airplanecd").html(airplanecountdown);

	if(digcountdown <= 100) {
		$(".digcd").html(digcountdown);
	}
	else {
		$(".digcd").html("Done!");
	}
	$("#hurry-dig-button").val("Use another shovel ["+items[1].owned+"]");

	if(items[2].owned>=1) {
		$(".wooden-sword-shop").hide();
		$(".stone-sword-shop").show();
	}
	if(items[4].owned>=1) {
		$(".stone-sword-shop").hide();
		$(".no-sword-upgrade").show();
	}
	if(items[5].owned>=1) {
		$(".iron-sword-shop").hide();
		$(".diamond-sword-shop").show();
	}
	if(items[6].owned>=1) {
		$(".diamond-sword-shop").hide();
		$(".need-iron").show();
	}

	if(pizzaeaten==="poisoned") {
		pizzaeaten=true;
	}

}
function checkbuilding() {
	if(items[1].owned>=1 || passthief) {
		$(".sign").removeClass("hidden");
	}
	if(passthief) {
		$(".sign").css("cursor","default");
		$(".dig-step-1").removeClass("hidden");
		$(".anothershop").removeClass("hidden");
		$(".gate").removeClass("hidden");
	}
	if(passworms) {
		$(".dig-step-1").css("cursor","default").attr("title","");
		$(".dig-step-2").removeClass("hidden");
		$(".underworld-building").removeClass("hidden");
	}
	if(passgate) {
		$(".gate").html('\n\
\n\
\n\
\n\
\n\
 _ ______\n\
| |      |\n\
| |      |\n\
| |      |\n\
| |      |\n\
| |      |\n\
|_|______|');
		$(".gate").attr("title","Unlocked Gate");
		$(".gate").css("cursor","default");
		$(".enchant").removeClass("hidden");
		$(".hill").removeClass("hidden");
		$(".chest").removeClass("hidden");
		$(".phone").removeClass("hidden");
		$(".castle").removeClass("hidden");
	}
	if(items[9].owned==14 || hasportal) {
		$(".laboratory").removeClass("hidden");
		$(".airplane").removeClass("hidden");
		if(items[8].owned == 1)
			{
				$(".portal").removeClass("hidden");	
				items[9].owned=0;
				hasportal=true;
			}
	}
	if(reachedclouds) {
planeascii='.--. _        ,---.   ___\n\
 \\# `----------"---=<_)_)_>-.\n\
 `,_/________.-----,_____,.-`\n\
      o\'     `-===\'   `o,   ';
		$("#wrapper").css("top","250px");
		$(".banner-plane").addClass("reachedclouds");
		$(".cloud-4").removeClass("hidden");
		$(".airplane").html(planeascii);
		$(".airplane").css({"top":"-250px", "left":"1100px", "cursor":"default"});
	}
	if(items[24].owned==1) {
		$(".travel").removeClass("hidden");
	}
	if(gethole) {
		$(".hole").removeClass("hidden");
	}
}
function updatestatus() {
	if(items[3].owned!=1){plural=items[3].plural;}else{plural="";}
	$(".pizzacount").html(items[3].owned+" pizza"+plural);
	$(".currentsword").html(currentsword);
}
function checkitem() {
	for(i=0;i<items.length;i++) {
		thisitem=items[i];
		itemnamenospace=thisitem.name.replace(" ","-");
		if(goldbar>=thisitem.price) {
			$(".buy-"+itemnamenospace).removeAttr("disabled");
		}
		else {
			$(".buy-"+itemnamenospace).attr("disabled",true);
		}
	}
	if(goldbar < 400) { $(".buy-pizza-20").attr("disabled",true); } else { $(".buy-pizza-20").removeAttr("disabled"); }
	if(goldbar < 100) { $(".buy-iron-bar").attr("disabled",true); } else { $(".buy-iron-bar").removeAttr("disabled"); }
	if(goldbar < 20) { $(".training-button").attr("disabled",true); }else { $(".training-button").removeAttr("disabled"); }
	if(goldbar < ironprice) { $(".buy-1-mining").attr("disabled",true); } else { $(".buy-1-mining").removeAttr("disabled"); }
	if(goldbar < calculateTotalPrice(ironmining, 10, irondivisor)) { $(".buy-10-mining").attr("disabled",true); } else { $(".buy-10-mining").removeAttr("disabled"); }
	if(goldbar < calculateTotalPrice(ironmining, 100, irondivisor)) { $(".buy-100-mining").attr("disabled",true); } else { $(".buy-100-mining").removeAttr("disabled"); }
	if(goldbar < (skilllvl+1)) { $(".upgrade-price").attr("disabled",true); } else { $(".upgrade-price").removeAttr("disabled"); }
	if(goldbar < 2500) { $(".buy-factory-button").attr("disabled",true); } else { $(".buy-factory-button").removeAttr("disabled"); }
	if(ironbar < goldprice) { $(".buy-1-mining-gold").attr("disabled",true); } else { $(".buy-1-mining-gold").removeAttr("disabled"); }
	if(ironbar < calculateTotalPrice(goldmining, 10, golddivisor)) { $(".buy-10-mining-gold").attr("disabled",true); } else { $(".buy-10-mining-gold").removeAttr("disabled"); }
	if(ironbar < calculateTotalPrice(goldmining, 100, golddivisor)) { $(".buy-100-mining-gold").attr("disabled",true); } else { $(".buy-100-mining-gold").removeAttr("disabled"); }
	if(items[1].owned <= 0) { $("#hurry-dig-button").attr("disabled",true); } else { $("hurry-dig-button").removeAttr("disabled"); }
}
function buy(item,number) {
	for(i=0;i<items.length;i++) {
		thisitem=items[i];
		if(item==thisitem.name) {
			if(goldbar>=thisitem.price*number) {
				valid=true;
				if(i==2) {
					currentsword="Wooden Sword";
					$(".wooden-sword-shop").hide();
					$(".stone-sword-shop").show();
				}
				else if(i==4) {
					if(items[2].owned!=0) {
						currentsword="Stone Sword";
						$(".stone-sword-shop").hide();
						$(".no-sword-upgrade").show();
					}
					else {
						valid=false;
					}
				}
				else if(i==5) {
					if(items[4].owned!=0) {
						currentsword="Iron Sword";
						$(".iron-sword-shop").hide();
						$(".diamond-sword-shop").show();
					}
					else {
						alert('Hey, I need something to defend myself with too! A stone sword would be just fine.');
						valid=false;
					}
				}
				else if(i==6) {
					if(items[5].owned!=0) {
						currentsword="Diamond Sword";
						$(".diamond-sword-shop").hide();
						$(".need-iron").show();
					}
					else {
						valid=false;
					}
				}
				if(valid) {
					goldbar-=thisitem.price*number;
					thisitem.owned+=number;
					checkthings();
				}
			}
			break;
		}
	}
}
function buyminingmachine(amount) {
	theprice=calculateTotalPrice(ironmining, amount, irondivisor);
	if(goldbar>=theprice) {
		goldbar-=theprice;
		ironmining+=amount;
		checkthings();
		clearInterval(a);
		a=setInterval(function() {
			ironbar+=ibpt;
			checkthings();
		},ibtime*1000);
	}
}
function buyminingmachinegold(amount) {
	theprice=calculateTotalPrice(goldmining, amount, golddivisor);
	if(ironbar>=theprice) {
		ironbar-=theprice;
		goldmining+=amount;
		checkthings();
	}
}
function enchantsword(type) {
	if(type=="attack") {
		price=enchant_attack*enchant_attack*2000+2000;
		if(goldbar>=price) {
			goldbar-=price;
			enchant_attack++;
			checkthings();
		}
	}
	else if(type=="defense") {
		if(enchant_defense<10) {
			price=enchant_defense*enchant_defense*2500+2500;
			if(goldbar>=price) {
				goldbar-=price;
				enchant_defense++;
				checkthings();
			}
		}
	}
	else if(type=="countdown") {
		if(enchant_countdown==0) {
			price=enchant_countdown*enchant_countdown*5000+5000;
			if(goldbar>=price) {
				goldbar-=price;
				enchant_countdown++;
				checkthings();
			}
		}
	}
	else if(type=="life") {
		if(enchant_life<10) {
			price=enchant_life*enchant_life*2500+2500;
			if(goldbar>=price) {
				goldbar-=price;
				enchant_life++;
				checkthings();
			}
		}
	}
}
$(document).ready(function() {

	$('.leversion').html("1.v2.0");

	goldbar=0; //0
	ironbar=0; //0
	gbps=1;
	goldmining=30;
	ibpt=0;
	ibtime=3600;
	ironmining=0;

	items=[];
	items.push({"name":"torch","price":10,"owned":0,"plural":"es","showstorage":true}); //0
	items.push({"name":"shovel","price":50,"owned":0,"plural":"s","showstorage":true}); //1
	items.push({"name":"wooden sword","price":50,"owned":0,"plural":"s","showstorage":false}); //2
	items.push({"name":"pizza","price":20,"owned":0,"plural":"s","showstorage":false}); //3
	items.push({"name":"stone sword","price":500,"owned":0,"plural":"s","showstorage":false}); //4
	items.push({"name":"iron sword","price":1000,"owned":0,"plural":"s","showstorage":false}); //5
	items.push({"name":"diamond sword","price":3000,"owned":0,"plural":"s","showstorage":false}); //6
	items.push({"name":"health potion","price":50,"owned":0,"plural":"s","showstorage":true}); //7
	items.push({"name":"ancient scroll","price":0,"owned":0,"plural":"s","showstorage":true}); //8
	items.push({"name":"obsidian cube","price":0,"owned":0,"plural":"s","showstorage":true}); //9
	items.push({"name":"lava bucket","price":0,"owned":0,"plural":"s","showstorage":true}); //10
	items.push({"name":"empty potion","price":0,"owned":0,"plural":"s","showstorage":true}); //11
	items.push({"name":"poison potion","price":0,"owned":0,"plural":"s","showstorage":true}); //12
	items.push({"name":"confusion potion","price":0,"owned":0,"plural":"s","showstorage":true}); //13
	items.push({"name":"invisibility potion","price":0,"owned":0,"plural":"s","showstorage":true});
	items.push({"name":"instant countdown potion","price":0,"owned":0,"plural":"s","showstorage":true});
	items.push({"name":"gambler's potion","price":0,"owned":0,"plural":"s","showstorage":true}); //16
	items.push({"name":"cookie potion","price":0,"owned":0,"plural":"s","showstorage":true}); //17
	items.push({"name":"X potion","price":0,"owned":0,"plural":"s","showstorage":true}); //18
	items.push({"name":"cookie","price":0,"owned":0,"plural":"s","showstorage":true}); //19
	items.push({"name":"secret potion","price":0,"owned":0,"plural":"s","showstorage":true}); //20
	items.push({"name":"key","price":0,"owned":0,"plural":"s","showstorage":true}); //21
	items.push({"name":"emerald sword","price":0,"owned":0,"plural":"s","showstorage":false}); //22
	items.push({"name":"music disc","price":0,"owned":0,"plural":"s","showstorage":true}); //23
	items.push({"name":"glasses","price":0,"owned":0,"plural":"s","showstorage":false}); //24

	swords=[];
	swords.push({"name":"wooden sword","power":5});
	swords.push({"name":"stone sword","power":10});
	swords.push({"name":"iron sword","power":15});
	swords.push({"name":"diamond sword","power":20});
	swords.push({"name":"emerald sword","power":30});

	enchant_attack=0; //0
	enchant_defense=0; //deprecated :o
	enchant_countdown=0; //0
	enchant_life=0; //0

	helmet=0;
	chestplate=0;
	pants=0;
	boots=0;

	theusername="You";
	theuserdesc="This is you.";

	cipherstep=0;
	cheststep=0;
	searchtimes=0;
	shovelbroken=0;
	cursor=0;
	pizzaeaten=false;
	poisoned=false;
	chestunderground=false;
	talk=0;
	wob=false;
	buyfactory=false; //false
	skill="none"; //"none"
    skilllvl=0; //0
	additionalattack=0;
	clickcloudcount=0;
	openchestcount=0;
	candybox=false;
	hpactive=0;
	airplanecountdown=999999999; //999999999
	digcountdown=999999999;
	digstep=0;
	currentsword="none"; //"none"
	passthief=false; //false
	passworms=false; //false
	passgate=false; //false
	unlockenchant=false; //false
	unlockchest=false; //false
	beatboss=false; //false
	hasairplane=false; //false
	reachedclouds=false; //false
	defeatinvisiblebot=false; //false
	gethole=false;
	win=false;
	hasportal=false;
	activatemachine=false;
	autosave=true;
	autosavetime=30;
	autoattack=false;

	if(localStorage.thegoldfactorygamesave) {
		dosave('loadlocalstorage');
	}

	setInterval(function() {
		if(autosave) {
			autosavetime--;
			$("#autosavetime").html(autosavetime);
			if(autosavetime==0) {
				autosavetime=30;
				dosave('autolocalstorage');
			}
		}
	},1000);

	asdasdf=digstep;
	digstep=0;
	for(i=0;i<asdasdf;i++) {
		dig(false,true);
	}

	if(airplanecountdown<=30) {
		flyingabcd=setInterval(function(){airplanecountdown--;},60000);
	}
	if(digcountdown<=100) {
		digabcd=setInterval(function(){digcountdown--;},60000);
	}

	$("#gold-factory").click(function() {
		if(!buyfactory) {
			closemessage();
			makealert("buy-factory","The Gold Factory","Status: You work here, and you get 1 gold bar per second as your salary.<br><br><input type=\"button\" value=\"Make the boss happier\" onclick=\"makebosshappy()\">and receive a bonus!<br><input type=\"button\" value=\"Buy this factory\" onclick=\"buythefactory()\" class=\"buy-factory-button\"> for 2500 gold bars and get more bars per second!",true);
			checkitem();
		}
		else {
			closemessage();
			makealert("buy-factory-new","The Gold Factory","Status: You are the boss! :o<br><br>You currently have <span class=\"gold-mining\">"+goldmining+"</span> mining machines.<br>Production: <span class=\"gbps\">"+gbps+"</span> gold bars / second<br><br><input type=\"button\" value=\"Buy 1 mining machine\" onclick=\"buyminingmachinegold(1)\" class=\"buy-1-mining-gold\"> (<span class=\"1-gold-cost\">"+goldprice+"</span> Iron Bars)<br><input type=\"button\" value=\"Buy 10 mining machines\" onclick=\"buyminingmachinegold(10)\" class=\"buy-10-mining-gold\"> (<span class=\"10-gold-cost\">"+calculateTotalPrice(goldmining, 10, golddivisor)+"</span> Iron Bars)<br><input type=\"button\" value=\"Buy 100 mining machines\" onclick=\"buyminingmachinegold(100)\" class=\"buy-100-mining-gold\"> (<span class=\"100-gold-cost\">"+calculateTotalPrice(goldmining, 100, golddivisor)+"</span> Iron Bars)<br><br>Don't worry, the price is the same no matter how many machines you buy!<br>You can also <input type='button' value='kill rats that sometimes enter the factory at night.' onclick='killrats()'>",true);
			checkitem();
		}
	});
	$(".theshop").click(function() {
		closemessage();
		$(".alert-theshop").fadeIn("fast");
		$(".modal").fadeIn("fast");
	});
	$(".anothershop").click(function() {
		closemessage();
		$(".alert-anothershop").fadeIn("fast");
		$(".modal").fadeIn("fast");
	});
	$(".sign").click(function() {
		if(!passthief) {
			closemessage();
			$(".alert-sign").fadeIn("fast");
			$(".modal").fadeIn("fast");
		}
	});
	$(".dig-step-1").click(function() {
		if(passthief && !passworms) {
			closemessage();
			$(".alert-dig-step-1").fadeIn("fast");
			$(".modal").fadeIn("fast");
		}
	});
	$(".training-center").click(function() {
		if(passworms) {
			closemessage();
			if(skill!="none") {
				makealert("training-center","Training Center","Welcome to the training center!<br>Here, you can test your skills or learn a new one.<br><br><input type=\"button\" value=\"Test your skills\" onclick=\"testskill()\" class=\"training-button\"> (100 Gold Bars)<br><input type=\"button\" value=\"Upgrade your skill\" onclick=\"upgradeskill()\" class=\"upgrade-skill\">",true)
			}
			else {
				makealert("training-center","Training Center","Welcome to the training center!<br>Here, you can test your skills or learn a new one.<br><br><input type=\"button\" value=\"Test your skills\" onclick=\"testskill()\" class=\"training-button\"> (100 Gold Bars)<br><input type=\"button\" value=\"Learn a new skill\" onclick=\"learnnewskill()\" class=\"new-skill\">",true)
			}
		}
	});
	$(".mining").click(function() {
		if(passworms) {
			closemessage();
			irontime=second2name(ibtime);
			makealert("mining","Iron Mine","This iron mine allows you to get iron bars automatically!<br><br>You currently have <span class=\"iron-mining-amount\">"+ironmining+"</span> mining machines.<br>Production: <span class=\"ibpt\">"+ibpt+"</span> iron bar(s) / <span class=\"irontime\">"+irontime+"</span><br><br><input type=\"button\" value=\"Buy 1 mining machine\" onclick=\"buyminingmachine(1)\" class=\"buy-1-mining\"> (<span class=\"1-iron-cost\">"+ironprice+"</span> Gold Bars)<br><input type=\"button\" value=\"Buy 10 mining machines\" onclick=\"buyminingmachine(10)\" class=\"buy-10-mining\"> (<span class=\"10-iron-cost\">"+calculateTotalPrice(ironmining, 10, irondivisor)+"</span> Gold Bars)<br><input type=\"button\" value=\"Buy 100 mining machines\" onclick=\"buyminingmachine(100)\" class=\"buy-100-mining\"> (<span class=\"100-iron-cost\">"+calculateTotalPrice(ironmining, 100, irondivisor)+"</span> Gold Bars)<br><br>Don't worry, the price is the same no matter how many machines you buy!",true);
			checkitem();
		}
	});
	$(".gate").click(function() {
		if(passthief&&!passgate) {
			closemessage();
			makealert("locked-gate","Locked Gate","This gate is locked. You probably need a key to unlock it.<br><br><input type=\"button\" value=\"Make a key and unlock the gate\" onclick=\"makekey()\" class=\"make-key\"> (100 Iron Bars) (the key is complex :d)",true)
		}
	});
	$(".enchant").click(function() {
		if(passgate&&!unlockenchant) {
			closemessage();
			powerhp();
			battle=makebattle(battleid,"Monster",150,150,"Spatula??",15,"A monster",3,power,hp,hp,currentsword,false,"vs-monster");
			html="<div class=\"alert alert-battle-monster\"><b>Monster!</b><br>There is a dangerous monster in the enchanting shop!<br><br>"+battle.html+"</div>";
			$("#otheralerts").append(html);
			battle.init();
			closemessage();
			$(".alert-battle-monster:last").fadeIn("fast");
		}
		else if(passgate&&unlockenchant) {
			closemessage();
			makealert("enchant-shop","Enchanting Shop","Welcome to the enchanting shop! Here, you can enchant your sword.<br><br><span class=\"enchants\"></span><br><div class='enchant-sword-attack'>Enchant with <input type=\"button\" value=\"Attack 1\" onclick=\"enchantsword('attack')\" class=\"button-enchant-attack\"> (<span class=\"enchant-attack-price\"></span> gold bars)</div><!--br>Enchant with <input type=\"button\" value=\"Defense 1\" onclick=\"enchantsword('defense')\" class=\"button-enchant-defense\"> (<span class=\"enchant-defense-price\"></span> gold bars)--><div class='enchant-sword-countdown'>Enchant with <input type=\"button\" value=\"Countdown 1\" onclick=\"enchantsword('countdown')\" class=\"button-enchant-countdown\"> (<span class=\"enchant-countdown-price\"></span> gold bars)</div><div class='enchant-sword-life'>Enchant with <input type=\"button\" value=\"Life 1\" onclick=\"enchantsword('life')\" class=\"button-enchant-life\"> (<span class=\"enchant-life-price\"></span> gold bars)</div><br>Or, you can <input type=\"button\" value=\"visit the armor section\" onclick=\"armorshop()\" class=\"button-armor-shop\"> of the shop.",true)
			checkthings();
		}
	});
	$(".chest").click(function() {
		if(passgate&&!unlockchest) {
			closemessage();
			powerhp();
			battle=makebattle(battleid,"Ghost",400,400,"Invisible hands",25,"This ghost is guarding the chest.",4,power,hp,hp,currentsword,false,"vs-ghost");
			html="<div class=\"alert alert-battle-ghost\"><b>Ghost</b><br>The chest is guarded by a ghost!<br><br>"+battle.html+"</div>";
			$("#otheralerts").append(html);
			battle.init();
			closemessage();
			$(".alert-battle-ghost:last").fadeIn("fast");
		}
		else if(passgate&&unlockchest) {
			openchestcount++;
			closemessage();
			if(openchestcount==1) {
				message="The chest is empty now.";
			}
			else if(openchestcount==2) {
				message="The chest is empty now, told ya before!";
			}
			else if(openchestcount==3) {
				message="THE CHEST IS EMPTY!!!!!";
			}
			else if(openchestcount==4) {
				message="PLEASE BELIEVE ME!!!";
			}
			else if(openchestcount==5) {
				message="I've told you! AGAIN!";
			}
			else if(openchestcount==6) {
				message="Now I hate you.";
			}
			else if(openchestcount==7) {
				message="Oh, no, sorry, the chest is <b>not</b> empty. There are 1000 gold bars hidden inside the chest. :D";
				goldbar+=1000;
			}
			else if(openchestcount>=8) {
				message="The chest is empty now. For real.";
			}
			$(".alert-chest-empty").remove();
			makealert("chest-empty","Empty",message,true);
		}
	});
	$(".phone").click(function(){
		let phonemessage = "There are no tips or hints that We™ can offer at the moment. Sorry!";
		if(items[7].owned < 3) { 
			phonemessage = "If you want to succeed in combat, you <i>need</i> a good supply of Health Potions. Trust Us™ on this one.";
		}
		else if(items[3].owned < 100) {
			phonemessage = "You should totally eat more pizza. Why? Because it's good for your health, of course!";
		}
		else if(additionalattack < 2) {
			phonemessage = "Testing your skills at the training center is not just for show - ssuccessfully defeating the robot also makes you slightly stronger! It doesn't reward any gold, though, so watch out for that.";
		}
		else if(digstep == 0) {
			phonemessage = "The underground world is a lot larger than you'd expect! There's still so much more to find, so get digging!";
		}
		else if(ironmining < 200) {
			phonemessage = "Trust Us™ when we say that iron is an awesome metal. You should definitely be mining more! It will be very important later.";
		}
		else if(beatboss && !activatemachine && items[10] < 1) {
			phonemessage = "Have you made any potions yet?"
		}
		else if(reachedclouds && items[24].owned == 0) { 
			phonemessage = "Technology sure is amazing, isn't it? You should probably check the computer more closely. Who knows what you could find?";
		}
		else if(gethole && !win) {
			phonemessage = "This is it, the ultimate battle! We™'ll be honest, We™ didn't expect you to get this far. But you can't give up now! Use your skills and potions wisely, and you've got this!";
		}
		makealert("phone-alert","Ring™, ring™, ring™!","Hello, and thank you for calling the International Hint Hotline™!<br>Whether you need help or just want some tips, feel free to give Us™ a call!<br><br>"+phonemessage,true);
	});
	$(".castle").click(function() {

		if(passgate) {
			entercastle();
		}

		/*
			For future update, I guess:

			if(passgate && !beatboss) {
				entercastle();
			}
			else if(passgate && beatboss) {
				makealert("castle","Castle","You are at the castle entrance<br><br><div class=\"castle-steps\"><span class=\"castle-entrance\">Castle Entrance</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-hall grey\">Castle Hall</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-room grey\">King's Room</span></div><br><br>",true);
			}

		*/

	});
	$(".laboratory").click(function() {
		if(passgate) {

			makealert("laboratory","Laboratory","<div style='max-height:300px; overflow-y:auto;'><del title=\"No, I'm not CrazyRussianHacker\">What's up everybody, welcome back to my laboratory, where safety is number 1 priority!</del><br>In this laboratory, you can make potions from the resources you have. <br><a href='potions.html' target='_blank'>Potions Guide</a><br><br><input type=\"button\" value=\"Put\" onclick=\"putitem()\">&nbsp;<input type='text' id='quantity' placeholder='0' size='1'>&nbsp;<select id='itemlist'></select><br>Item(s) going to be mixed:<br><div id='goingtobemixed'></div><br><input type=\"button\" value=\"Mix!\" onclick=\"mixitems()\"></div>",true);

			/*

				For future update, I guess

				makealert("laboratory","Laboratory","<div style='max-height:300px; overflow-y:auto;'><del title=\"No, i'm not CrazyRussianHacker\">What's up everybody, welcome back to my laboratory, safety is number 1 priority</del><br>In this laboratory, you can make potions and items from resources you have (<a href='lab.html' target='_blank'>Laboratory guide</a>)<br><br><input type=\"button\" value=\"Put\" onclick=\"putitem()\">&nbsp;<input type='text' id='quantity' placeholder='0' size='1'>&nbsp;<select id='itemlist'></select><br>Item(s) going to be mixed:<br><div id='goingtobemixed'></div><br><input type=\"button\" value=\"Mix!\" onclick=\"mixitems()\"></div>",true);

			*/

			thecauldron("make",0,0);
			updateitemlist();
		}
	});
	$(".portal").click(function() {
		if(passgate) {
			enterportal(1,"a");
		}
	});
	$(".airplane").click(function() {
		if(reachedclouds) {
		}
		else if(passgate&&!hasairplane) {
			makealert("buy-airplane","Airplane","This airplane is for sale.<br><br><input type=\"button\" value=\"Buy\" onclick=\"buyairplane()\"> the airplane (50,000 iron bars)",true);
		}
		else if(passgate&&hasairplane&&airplanecountdown==999999999) {
			makealert("fly","Fly!!!","Are you ready to fly?<br><br><input type=\"button\" value=\"Fly now!\" onclick=\"fly()\">",true);
		}
		else if(passgate&&hasairplane&&airplanecountdown<=30) {
			makealert("fly-countdown","Fly!","Your plane is currently flying.<br>Time left: <span class='airplanecd'>"+airplanecountdown+" </span> minute(s) left.",true);
		}
	});
	$(".cloud-4").click(function() {
man="\n\
\n\
                              O\n\
                             /|\\\n\
                              |\n\
                             / \\";
		if(items[20].owned>0) {
			givesecretpotion="<input type=\"button\" value=\"Give him your secret potion\" onclick=\"theman('givesecretpotion');\" class='give-secret-potion'>";
		}
		else {
			givesecretpotion="";
		}
		makealert("castle-clouds","The Castle","You enter the castle and see a man standing inside.<br><br><pre class='theman'>"+man+"</pre><br><br><input type=\"button\" value=\"Talk to him\" onclick=\"theman('talk');\" class='talk-with-dude'><input type=\"button\" value=\"Fight with him\" onclick=\"theman('fight');\" class='fight-with-dude'>"+givesecretpotion,true);
	});
	$(".small-hole").click(function() {
		if(digcountdown<=100) {
			dig(true,false);
		}
		else {
			if(digstep<5) {
				makealert("small-hole","A Small Hole","It seems that you can dig here.<br><br><input type=\"button\" value=\"Dig, dig, dig!\" onclick=\"dig(true,false)\"> (Make sure you have a shovel!)",true);
			}
		}
	});
	$(".nametag").click(function() {
		makealert("name-tag","Name Tag","You found a name tag!<br>You can now change your name and description in battles!<br><br>Name: <input type='text' id='yourname' value='"+theusername+"'><br>Description: <input type='text' id='yourdesc' value='"+theuserdesc+"'><br><br>WARNING: Inserting an extremely long name/description or adding some wild characters may corrupt your save file!",true);
		namedesc=setInterval(function() {
			theusername=$("#yourname").val();
			theuserdesc=$("#yourdesc").val();
		},100);
	});
	$(".chest-dig").click(function() {
		if(!chestunderground) {
chestascii='\n\
         __________\n\
        /\\____;;___\\\n\
       | /         /\n\
       `. ())oo() .\n\
        |\\(%()*^^()^\\\n\
       %| |-%-------|\n\
      % \\ | %  ))   |\n\
      %  \\|%________|\n\
       %%%%';
			makealert("chest-underground","Chest","The chest contained some useful resources and items!<br><br><pre>"+chestascii+"</pre>",true);
			goldbar+=1500;
			ironbar+=1000;
			items[7].owned+=5;
			chestunderground=true;
			checkthings();
		}
		else {
			makealert("chest-underground","Chest","The chest is empty. 100% sure.",true);
		}
	});
	$(".pizzas").click(function() {
		if(!pizzaeaten) {
			makealert("pizza-alert","Pizza!","You found some old pizza ovens!<br>They seem like they could be useful, but unfortunately, they are broken.<br>You need 5000 gold bars and 2500 iron bars to repair them.<br><br><input type='button' value='Fix the ovens' onclick='eatpizza()'>",true);
		}
		else if(pizzaeaten) {
			makealert("pizza-alert","Pizza!","Your pizza ovens are diligently baking one pizza for you every 5 seconds.",true);
		}
	});
	$(".laptop").click(function() {
		makealert("cookieclicker","Cookie Clicker Lite™","Play the full game here: <a href='http://orteil.dashnet.org/cookieclicker/' target='_blank'>http://orteil.dashnet.org/cookieclicker/</a><br><br><span style='font-size:20px;'><span class='current-cookie'>"+items[19].owned+"</span> cookie(s)</span><br><span class='cps'>"+cursor/10+" </span> per second<br><br><input type=\"button\" value=\"Bake a cookie\" onclick=\"cookieclicker('bake')\"><br><br><span style='font-size:20px;'>Shop:</span><br><br><input type=\"button\" value=\"Cursor ["+cursor+"]\" onclick=\"alert('This is not the full version of Cookie Clicker, so you cannot buy cursors!')\" class='cursor-button'> (<span class='cursor-price'>"+Math.round(15*Math.pow(1.15,cursor))+"</span> cookies)<br><!--input type=\"button\" value=\"Grandma [0]\" onclick=\"alert('This is not the full version of Cookie Clicker!')\"> (100 cookies)00-->",true);

		/*

			Actually I want to allow you guys to buy cursors,
			But when I implement it, i got some decimal digit issues like 99985.2000000000002 cookies

			ALso cursors' price can't be rounded using Math.round() dunno why, lol
			(Don't worry, I'll handle it. Someday.)
		*/

	});
	$(".sign-dig").click(function() {
		makealert("sign-underground-alert","A sign","\"This is the end of the tunnel. But maybe there will be updates in the future? Who knows!\"<br>You're not exactly sure what those \"updates\" are, but they seem important.",true);
	});
	$(".theportal").click(function() {
		exitmagicportal();
	});
	$(".thefox").click(function() {
		closemessage();
		powerhp();
		battle=makebattle(battleid,"The Fox",2000,2000,"Unknown",1,"A fox!",10,power,hp,hp,currentsword,false,"vs-fox");
		html="<div class=\"alert alert-battle-fox\"><b>The Fox</b><br>You choose to attack the fox. For some reason.<br><br>"+battle.html;
		$("#otheralerts").append(html);
		battle.init();
		$(".alert-battle-fox:last").fadeIn("fast");
	});
	$(".thehouse").click(function() {
computer="                                            _________________\n\
                                           |                 |\n\
                                           |   <span class=\"click\" onclick=\"computeraction('disc')\">___________</span>   |\n\
                                           |  <span class=\"click\" onclick=\"computeraction('disc')\">|   .....   |</span>  |\n\
 ______________________________________    |  <span class=\"click\" onclick=\"computeraction('disc')\">|___________|</span>  |\n\
|  __________________________________  |   |   ___________   |\n\
| |                                  | |   |  |   .....   |  |\n\
| |                                  | |   |  |___________|  |\n\
| |                                  | |   |   <span class=\"click\" onclick=\"computeraction('error')\">__</span>   __   _   |\n\
| |                                  | |   |  <span class=\"click\" onclick=\"computeraction('error')\">|__|</span> |__| |_|  |\n\
| |                                  | |   |                 |\n\
| |                                  | |   |                 |\n\
| |                                  | |   |                 |\n\
| |                                  | |   |                 |\n\
| |                                  | |   |       <span class=\"click\" onclick=\"computeraction('power')\">.|.</span>       |\n\
| |                                  | |   |      <span class=\"click\" onclick=\"computeraction('power')\">(   )</span>      |\n\
| |                                  | |   |       <span class=\"click\" onclick=\"computeraction('power')\">'-'</span>       |\n\
| |__________________________________| |   |                 |\n\
|______________________________________|   |                 |\n\
                 |    |      '.            |                 |\n\
                 |    |        '-.-'-.-'-.-|                 |\n\
                 )    (                    |                 |\n\
                /      \\                   |                 |\n\
               /________\\                  |_________________|";
		makealert("the-house-enter","The house","<div style='max-height:300px; width:538px; overflow-y:auto;'>You enter the house, and you see a computer in front of you...<br><br><pre class='computer-ascii'>"+computer+"</pre><div class='ylvis-the-fox'></div></div>",true);
	});
	$(".sand").click(function() {
		if(items[24].owned==1) {
			makealert("sand","Sand","There is a lot of sand here. You have no idea who put it here, if anyone did.<br><br><input type='button' value='Search for stuff!' onclick='searchsand()'> <span class='search-result'></span><br><input type='button' value='Bury yourself inside the sand!' onclick='burysand()'>",true);
		}
		else {
			makealert("sand","Sand","There is a lot of sand here. You have no idea who put it here, if anyone did.<br>You can't see anything interesting inside the sand. Maybe if you had something to help you see better...",true);
		}
	});
	$(".boss").click(function() {
		if(!win) {
story="\n\
\n\
       _\n\
   .&bull;'   '&bull;.    \"Who is standing there?               O\n\
  /         \\    Hmmmm... That's weird...\"           /|\\\n\
 |           |                                        |\n\
 |           |                                       / \\\n\
  \\         /    <input type='button' value='Next >' onclick='guy(1)'>                              \n\
   '&bull;.   .&bull;'\n\
     /   \\\n\
    / | | \\\n\
   / /| |\\ \\\n\
  / / | | \\ \\\n\
";
			makealert("boss-conversation","Someone","Someone is standing there...<br><br><pre class='boss-story'>"+story+"</pre>",true);
		}
		else {
			makealert("chest-from-boss","Chest","<br><input type='button' onclick='openthechestfromsomeone()' value='Interact with the chest'>",true);
		}
	});
	$(".old-machine").click(function() {
		if(activatemachine) {
			makealert("old-machine","An Old Machine","The machine has a single slot and only one instruction: 'INSERT BARS'. You don't really know what it does, but hey, maybe it could be useful!<br><br><input type='button' value='Put 1000 gold bars inside the machine' onclick='givemachinegoldbar(1000)'><br><input type='button' value='Put 10,000 gold bars inside the machine' onclick='givemachinegoldbar(10000)'><br><input type='button' value='Put 100,000 gold bars inside the machine' onclick='givemachinegoldbar(100000)'><br><br><input type='button' value='Put 1000 iron bars inside the machine' onclick='givemachineironbar(1000)'><br><input type='button' value='Put 10,000 iron bars inside the machine' onclick='givemachineironbar(10000)'><br><input type='button' value='Put 100,000 iron bars inside the machine' onclick='givemachineironbar(100000)'>",true);
		}
		else {
			makealert("old-machine","An Old Machine","This old machine seems to need fuel, maybe a good old bucket of lava could do the trick?<br><br><input type='button' value='Pour a bucket of lava into the machine' onclick='givelavabuckettothemachine()'>",true);
		}
	});

	a=setInterval(function() {
		ironbar+=ibpt;
		checkthings();
	},ibtime*1000);
	checkthings();
	setInterval(function() {
		goldbar+=gbps;
		checkthings();
	},1000);
	setInterval(function() {
		if(pizzaeaten)
		{
			items[3].owned += 1;
			checkthings();
		}
	},5000);
});
function checkthings() {
	updategold();
	checkbuilding();
	updateitems();
	checkitem();
	updatestatus();
	if(wob) {
		$('body').addClass("wob");
	}
	else {
		$('body').removeClass("wob");
	}
}
function makealert(id,title,text,show) {
	$(".alert-"+id).remove();
	html="<div class=\"alert alert-"+id+"\"><b>"+title+"</b><br>"+text+"<div class=\"close-message-button-"+id+"\"><br><input type=\"button\" value=\"Close this window\" onclick=\"closemessage()\" class='button-close-window-"+id+"'></div></div>";
	$("#otheralerts").append(html);
	if(show) {
		closemessage();
		$(".alert-"+id).fadeIn("fast");
		$(".modal").fadeIn("fast");
	}
}
function givemachinegoldbar(howmany) {
	if(howmany%10==0) {
		if(goldbar>=howmany) {
			goldbar-=howmany;
			howmany/=4;
			ironbar+=howmany;
			checkthings();
			alert('The machine gave you '+howmany+' iron bar(s)!');
		}
		else {
			alert('Not enough gold bars!');
		}
	}
}
function givemachineironbar(howmany) {
	if(howmany%10==0) {
		if(ironbar>=howmany) {
			ironbar-=howmany;
			howmany/=4;
			goldbar+=howmany;
			checkthings();
			alert('The machine gave you '+howmany+' gold bar(s)!');
		}
		else {
			alert('Not enough iron bars!');
		}
	}
}
function givelavabuckettothemachine() {
	if(!activatemachine) {
		if(items[10].owned>=1) {
			items[10].owned-=1;
			activatemachine=true;
			makealert("lava-success","It works!","You have successfully powered the machine up!",true);
		}
		else {
			alert('You have no lava bucket!');
		}
	}
}
function clickcloud() {
	clickcloudcount++;
	if(clickcloudcount==10) {
		goldbar+=1000;
		makealert("falling-gold","Gold!","1000 gold bars just fell from the sky!",true);
		checkthings();
	}
}
function powerhp() {
	for(i=0;i<swords.length;i++) {
		thissword=swords[i];
		if(currentsword.toLowerCase()==thissword.name) {
			power=thissword.power+additionalattack;
			break;
		}
	}
	power+=enchant_attack*7;
	hp=100;
	hp+=Math.floor(items[3].owned/3.5);
	thisismyhp=100;
	thisismyhp+=Math.floor(items[3].owned/3.5);
}
function testskill() {
	if(goldbar>=100) {
		goldbar-=100;
		checkthings();
		powerhp();
		hpdivide10=Math.ceil(hp/10);
		closemessage();
		battle=makebattle(battleid,"Training Robot",hp+hpdivide10,hp+hpdivide10,"Short ranged laser!",power+Math.ceil(power/10),"A training robot",2,power,hp,hp,currentsword,false,"training");
		html="<div class=\"alert alert-training\"><b>Test your skill!</b><br>Let's see how strong you are!<br><br>"+battle.html+"</div>";
		$("#otheralerts").append(html);
		battle.init();
		$(".alert-training:last").fadeIn("fast");
	}
}
function showcredits() {
	closemessage();
	makealert("credits","Credits","<div style='max-height:300px; overflow-y:auto;'>Shark ASCII art by Tom Youderian<br>Phone ASCII art by an unknown artist<br><br><b>---ORIGINAL CREDITS BELOW---</b><br><br>Ascii arts:<br><br>Factory, house, thunder, monster, castle, chest,<br>ghost, airplane, microscope, scroll, fox, rat:<br><a href='http://www.retrojunkie.com/asciiart/asciiart.htm' target='_blank'>http://www.retrojunkie.com/asciiart/asciiart.htm</a> (with a little modification)<br><hr>Cloud:<br><a href='http://www.geocities.com/spunk1111/nature.htm#clouds' target='_blank'>http://www.geocities.com/spunk1111/nature.htm#clouds</a><br>(taken from a \"landscape\")<br><hr>Computer:<br>aniwey (from Candy Box 2)<br><hr>Banner plane:<br><a href='http://www.asciiworld.com/-Planes-.html' target='_blank'>http://www.asciiworld.com/-Planes-.html</a> (with a little modification)<hr>Some other ascii arts are created by me :D<br><br><br>Inspired by:<br>The \"legendary\" <a href='http://candies.aniwey.net' target='_blank' onclick='candybox=true'>Candy Box</a> game<br>and <a href='http://adarkroom.doublespeakgames.net' target='_blank'>A Dark Room</a><br>and also <a href='http://candybox2.net' target='_blank' onclick='candybox=true'>Candy Box 2</a><br><br>Thanks to<br>Minecraft for the \"names\", enchanting, and some others :D<br><br>Also special thanks to:<br>- Redditors, people from cb2 forum, people from jayisgames.com for the bug reports, suggestions and critics<br>- Also thanks to <a href='https://github.com/gamehelp16/thegoldfactory/graphs/contributors' target='_blank'>several people</a> who have contributed to the game!</div>",true)
}
function showetc() {
	closemessage();
	makealert("etc","Etc.","<div style='max-height:300px; overflow-y:auto;'>I don't know what name is good for this part, so i just give the name \"etc\" :D<br><br>If there are some bugs, glitches, suggestions, etc., you can contact me via: <a href=\"http://reddit.com/r/thegoldfactory\" target='_blank'>reddit</a><br>If you like this game, feel free to share it<br>.. and don't forget to <a href='http://github.com/gamehelp16/thegoldfactory' target='_blank'>view the repo</a> on GitHub!<br><br><i>\"The awkward moment when you need gold to buy wooden sword and you can't make a butter sword by yourself\"</i><br><br>...and sorry if my English is bad XD<br><br><small><a href='javascript:headache()' style='color:white;' title='Dont click me, pls'>headache mode</a></small></div>",true)
}
function toggle() {
	if(wob) {
		wob=false;
	}
	else {
		wob=true;
	}
	checkthings();
}
function headache() {
	setInterval(toggle,1);
}
function showbugs() {
	closemessage();
	makealert("bugs","Known Bugs & Glitches","<div style='max-height:300px; overflow-y:auto;'>After battling, please wait for around 5 seconds before battling again, or you might instantly die.<br/>This never actually happened to me, but this warning was in the original game, so I'm keeping it here.",true)
}

function showdec2021msg() {
	closemessage();
	makealert("dec2021msg","Message from the Developer (December 2021)","<div style='max-height:300px; overflow-y:auto;'>Hi! If you're reading this I just would like to thank you for playing this game up until now, honestly I didn't expect that this game still has quite a lot of players even 7+ years after its release!<br><br>I've received several messages from you guys asking if there are going to be new updates/content in this game so I'm going to use this opportunity to say that as of now I have no plans to update this game anymore. However, having said that I recently updated this game to improve some styling and made some minor updates!<br><br>If you enjoyed this game you can check out several other games I have made in the past:<ul><li><a href='https://gamehelp16.github.io/chickens/' target='_blank'>Chickens!</a></li><li><a href='https://gamehelp16.github.io/world-warper-ld30/' target='_blank'>World Warper</a></li><li><a href='https://gamehelp16.github.io/the-unconventional-weapon/' target='_blank'>The Unconventional Weapon</a></li><li><a href='https://gamehelp16.github.io/material-warrior/' target='_blank'>Material Warrior</a></li><li><a href='https://gamehelp16.github.io/which-subreddit/' target='_blank'>Which Subreddit?</a></li></ul>You can also check out this <a href='https://gamehelp16.github.io/post/welcome/' target='_blank'>blog post I made</a> where I list some other things that I have created just in case you're curious. It just feels amazing knowing that there people who are still playing something I made many years ago, so once again thank <i>you</i>! :) <br><br><i>And thank you for making this amazing game! -voxelbugged</i></div>",true)
}
function dighole() {
	if(items[2].owned==0) {
		makealert("attacked","Attacked!","While you are digging the hole, someone suddenly runs towards you and tries to attack you!<br>You can't fight back, so you run away...",true);
	}
	else {
		powerhp();
		closemessage();
		battle=makebattle(battleid,"Thief",100,100,"Handmade Sword",3,"A thief, nothing else.",0,power,hp,hp,currentsword,false,"vs-thief");
		html="<div class=\"alert alert-battle1\"><b>Attacked!</b><br>While you are digging the hole, someone suddenly runs towards you and attacks you!<br><br>"+battle.html+"</div>";
		$("#otheralerts").append(html);
		battle.init();
		$(".alert-battle1:last").fadeIn("fast");
	}
}
function continuedigging() {
	powerhp();
	battle=makebattle(battleid,"Worms",80,80,"Their body",15,"Worms!",1,power,hp,hp,currentsword,false,"vs-worms");
	html="<div class=\"alert alert-battle2\"><b>Worms! :o</b><br>There are worms under the ground!<br>They seem to be mad that you destroyed their home...<br><br>"+battle.html+"</div>";
	$("#otheralerts").append(html);
	battle.init();
	closemessage();
	$(".alert-battle2:last").fadeIn("fast");
}
function second2name(second) {
	if(second==1) {
		return "second";
	}
	else if(second==60) {
		return "minute";
	}
	else if(second==3600) {
		return "hour";
	}
}
function makekey() {
	if(ironbar>=100) {
		ironbar-=100;
		passgate=true;
		closemessage();
		checkthings();
	}
}
function learnnewskill() {
	closemessage();
	makealert("choose-skill","Choose a skill","Pick the skill that you want to learn.<br>Choose wisely, because changing it is expensive!<br><br><input type=\"button\" value=\"Thunder Bolt\" onclick=\"chooseskill(1)\"><br><input type=\"button\" value=\"Invulnerability\" onclick=\"chooseskill(2)\">",true)
}
function chooseskill(type) {
	closemessage();
	if(type==1) {
		skill="thunder";
		makealert("get-skill","Thunder Bolt","You can now upgrade this skill in the training center!",true)
	}
	else {
		skill="invuln";
		makealert("get-skill","Invulnerability","You can now upgrade this skill in the training center!",true)
	}
}
function upgradeskill() {
	if(skill=="thunder") {
		makealert("upgrade-skill","Upgrade Skill","Your skill is: Thunder Bolt<br>Skill level: <span class=\"skilllvl\">"+skilllvl+"</span> (<span class=\"thunder-damage\">"+(20+skilllvl*10)+"</span> damage)<br><br><input type=\"button\" value=\"Upgrade this skill\" onclick=\"doupgrade()\"> (<span class=\"upgrade-price\">"+(skilllvl*skilllvl*500+500)+"</span> gold bars)<br><input type=\"button\" value=\"Change your skill\" onclick=\"changeskill()\"> (<span class=\"change-price\">"+(skilllvl*skilllvl*250+250)+"</span> gold bars)",true);
	}
	else {
		makealert("upgrade-skill","Upgrade Skill","Your skill is: Invulnerability<br>Skill level: <span class=\"skilllvl\">"+skilllvl+"</span> (<span class=\"invuln-time\">"+(3+skilllvl)+"</span> second(s))<br><br><input type=\"button\" value=\"Upgrade this skill\" onclick=\"doupgrade()\"> (<span class=\"upgrade-price\">"+(skilllvl*skilllvl*500+500)+"</span> gold bars)<br><input type=\"button\" value=\"Change your skill\" onclick=\"changeskill()\"> (<span class=\"change-price\">"+(skilllvl*skilllvl*250+250)+"</span> gold bars)",true);
	}
}
function doupgrade() {
	cost=(skilllvl*skilllvl*500+500);
	if (goldbar>=cost) {
		goldbar-=cost;
		skilllvl++;
		checkthings();
	}
}
function changeskill()
{
	cost=(skilllvl*skilllvl*250+250);
	if (goldbar>=cost) {
		goldbar-=cost;
		if(skill=="thunder") {
			chooseskill(2);
		}
		else
		{
			chooseskill(1);
		}
		checkthings();
	}
}
function buythefactory() {
	if(goldbar>=2500) {
		goldbar-=2500;
		gbps=3;
		goldmining=30;
		buyfactory=true;
		checkthings();
		closemessage();
	}
}
function readscroll() {
	items[8].owned=1;
scroll='\n\
   _______________________\n\
 =(__    ___      __     _)=\n\
   |                     |\n\
   | How to make a       |\n\
   | nether portal:      |\n\
   |                     |\n\
   | 1. Get 14 obsidian  |\n\
   |    cubes            |\n\
   | 2. Arrange them so  |\n\
   |    they form a      |\n\
   |    frame            |\n\
   | 3. Walk through the |\n\
   |    frame            |\n\
   |                     |\n\
   |__    ___   __    ___|\n\
 =(_______________________)=\n\
';
	makealert("scroll","The ancient scroll","You read the ancient scroll, it says:<br><br><pre>"+scroll+"</pre>",true);
}
function entercastle() {
	closemessage();
	powerhp();
	battle=makebattle(battleid,"Castle Guard",200,200,"Butter Sword!",30,"Guards the castle.",0,power,hp,hp,currentsword,false,"vs-castle-guard");
	html="<div class=\"alert alert-castle\"><b>Castle</b><br>You are entering the castle...<br><br><div class=\"castle-steps\"><span class=\"castle-entrance\">Castle Entrance</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-hall\">Castle Hall</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-room\">King's Room</span></div><br><br>"+battle.html+"</div>";
	$("#otheralerts").append(html);
	$(".castle-hall").addClass("grey");
	$(".castle-room").addClass("grey");
	battle.init();
	$(".alert-castle:last").fadeIn("fast");
}
function castlegotohall(myfinalhp) {
	powerhp();
	battle=makebattle(battleid,"Castle Staff",300,300,"Sword-like-knife",20,"The staff makes the castle look good.",0,power,myfinalhp,hp,currentsword,false,"vs-castle-staff");
	html="<div class=\"alert alert-castle-hall\"><b>Castle</b><br>You are inside the castle...<br><br><div class=\"castle-steps\"><span class=\"castle-entrance\">Castle Entrance</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-hall\">Castle Hall</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-room\">King's Room</span></div><br><br>"+battle.html+"</div>";
	$("#otheralerts").append(html);
	$(".castle-entrance").addClass("grey");
	$(".castle-room").addClass("grey");
	battle.init();
	$(".alert-castle-hall:last").fadeIn("fast");
}
function castlegotoking(myfinalhp) {
	powerhp();
	battle=makebattle(battleid,"Zombie King",500,500,"Diamond Sword",40,"I AM THE BOSS!!",0,power,myfinalhp,hp,currentsword,false,"vs-castle-boss");
	html="<div class=\"alert alert-castle-king\"><b>Castle</b><br>You are in front of the king! :o<br><br><div class=\"castle-steps\"><span class=\"castle-entrance\">Castle Entrance</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-hall\">Castle Hall</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-room\">King's Room</span></div><br><br>"+battle.html+"</div>";
	$("#otheralerts").append(html);
	$(".castle-entrance").addClass("grey");
	$(".castle-hall").addClass("grey");
	battle.init();
	$(".alert-castle-king:last").fadeIn("fast");
}
function buyairplane() {
	if(ironbar>=50000) {
		ironbar-=50000;
		checkthings();
		hasairplane=true;
		makealert("get-airplane","You have an airplane now!","The airplane is now yours!</pre>",true);
	}
}
function fly() {
	airplanecountdown=5;
	flyingabcd=setInterval(function(){airplanecountdown--;},60000);
	closemessage();
}
function enterportal(step,thehp2) {

	totalprogress=20;
	progress="";

	for(i=1;i<=totalprogress;i++) {
		if(i==step) {
			if(candybox) {
				you="\\o/";
			}
			else {
				you="YOU";
			}
			progress=progress+you;
		}
		else {
			progress=progress+"___";
		}
	}

	$(".alert-nether").remove();
	closemessage();
	html="<div class=\"alert alert-nether\"><b>Nether!</b><br>Welcome to the nether!<br><pre>"+progress+"</pre><br><div id='nether-battle-area'></div></div>";
	$("#otheralerts").append(html);
	if(step==1) {
		$(".modal").fadeIn("fast");
		$(".alert-nether").fadeIn("fast");
	}
	else {
		$(".alert-nether").show();
	}

	if(step<=totalprogress) {
		if(Math.random()<=0.25) {
			powerhp();
			therand=randomnumber(1,8);
			maxhp=hp;
			if(thehp2!="a") {
				hp=thehp2;
			}
			if(therand==1) {
				battle=makebattle(battleid,"Monster",250,250,"Spatula??",35,"A monster!",3,power,hp,maxhp,currentsword,false,"in-the-nether-"+step);
			}
			else if(therand==2) {
				battle=makebattle(battleid,"Ghost",350,350,"Invisible hands",25,"A Ghost, nothing else.",4,power,hp,maxhp,currentsword,false,"in-the-nether-"+step);
			}
			else if(therand==3) {
				battle=makebattle(battleid,"Giant",650,650,"Big hand",15,"Bam, bam, bam.",5,power,hp,maxhp,currentsword,false,"in-the-nether-"+step);
			}
			else if(therand==4) {
				battle=makebattle(battleid,"Unicorn",400,400,"Horn",30,"Unicorn!! Yay!!! :D",6,power,hp,maxhp,currentsword,false,"in-the-nether-"+step);
			}
			else if(therand==5) {
				battle=makebattle(battleid,"Wizard",150,150,"Spells",65,"Abrakadabra!",7,power,hp,maxhp,currentsword,false,"in-the-nether-"+step);
			}
			else if(therand==6) {
				battle=makebattle(battleid,"Pegasus",300,300,"Wings",40,"The Pegasus is facing the wrong direction :/",8,power,hp,maxhp,currentsword,false,"in-the-nether-"+step);
			}
			else {
				battle=makebattle(battleid,"Weakened Ghost",250,250,"Invisible hands",15,"A weakened ghost.",4,power,hp,maxhp,currentsword,false,"in-the-nether-"+step);
			}
			$("#nether-battle-area").html(battle.html);
			battle.init();
		}
		else {
			step++;
			setTimeout(function(){enterportal(step,thehp2);},500);
		}
	}
	else {
		powerhp();
		maxhp=hp;
		if(thehp2!="a") {
			hp=thehp2;
		}
		battle=makebattle(battleid,"The Devil",666,666,"Pitchfork",66,"Unholy moly!",3,power,hp,maxhp,currentsword,false,"vs-devil");
		$("#nether-battle-area").html(battle.html);
		battle.init();
	}

}
function showstorage() {
	closemessage();
	$(".alert-storage").fadeIn("fast");
	$(".modal").fadeIn("fast");
}
function changelog() {
	closemessage();
	makealert("changelog","Changelog",'<div style="max-height:300px;overflow-y:auto">10 July 2025<br>- Added new buildings, features, and enemies!<br>- Made tons of balance changes<br>- Fixed a <i>lot</i> of bugs and typos<br>A more detailed changelog can be found on <a href="https://www.reddit.com/r/TGFRegilded/" target="_blank">the subreddit</a>.<br><br>03 July 2025<br>- Buying machines in bulk is no longer cheaper<br>- To compensate, all machines are now slightly less expensive<br>- The old machine is now better at converting resources (4:1 instead of 10:1)<br>- You can now enchant all swords (trust me, this will be important later!)<br>- Thunder damage now scales better (10 per level instead of 7)<br>- The glasses are now more visible<br>- Resetting the game now automatically refreshes the page. Be careful!<br>- Fixed buttons not getting disabled properly<br>- Changed some text to feel more natural<br>- A few other tiny tweaks and changes<br><br>29 February 2024<br>- A few tweaks to make the game more playable on mobile<br>- Small grammar fixes<br><br>18 February 2024<br>- Rebalanced prices and rewards to make the gameplay smoother<br>- Fixed various grammar and spelling mistakes<br>- More difficult enemy encounters<br>- Many other QoL changes and bugfixes!<br><br><b>---ORIGINAL CHANGELOG BELOW--</b><br><br>08 December 2021<br>- Styling and other minor updates<br><br>12 January 2014<br>- Iron mining machine price is a bit cheaper<br>- Reset game button added<br>- A super minor change (you don\'t need to know about this, actually)<br>- Zombie king is a bit easier to kill<br>- Each level of thunder skill now gives 7 more attack instead of 5<br><br>04 January 2014<br>- Fixed bug in the old machine<br><br>03 January 2014<br>- Version 1.0 released! (finally :D)<br>- There is something new in the end of \'the digging\'<br><br>24 December 2013:<br>- Airplane price is now 5 million iron bars instead of 9 million!<br><br>20 December 2013:<br>-<a href="http://www.reddit.com/r/thegoldfactory/comments/1tbmnk/20_dec_2013_update_version_094_beta/" target="_blank">Updates</a><br><br>18 December 2013:<br>- Some fixes thanks to<a href="https://github.com/Stevie-O" target="_blank">Stevie-O</a><br>-<a href="http://www.reddit.com/r/thegoldfactory/comments/1t5g6i/18_dec_2013_update_093_beta/" target="_blank">Updates</a><br><br>14 December 2013:<br>-<a href="http://www.reddit.com/r/thegoldfactory/comments/1sv65j/updates_2/" target="_blank">Bug fixes & Updates</a><br><br>13 December 2013:<br>-<a href="http://www.reddit.com/r/thegoldfactory/comments/1ss7u8/updates/" target="_blank">Lots of updates</a><br><br>11 December 2013:<br>- Version 1.0 Beta released!<br>- Bug fix</div>',true);
}
function armorshop() {
	closemessage();
	makealert("armor-shop","Armor Section","We sell armor too! Buy some to absorb damage from your enemies!<br><br>Your stats: <span class=\'absorb-percent'>0</span>% damage absorbed<br><br><div class='helmet-area'>Helmet: <input type=\"button\" value=\"Buy a leather helmet\" onclick=\"buyarmor('helmet')\" class=\"button-buy-helmet\"> (<span class=\"buy-helmet-price\">0</span> gold bars)</div><div class='chestplate-area'>Chestplate: <input type=\"button\" value=\"Buy a leather chestplate\" onclick=\"buyarmor('chestplate')\" class=\"button-buy-chestplate\"> (<span class=\"buy-chestplate-price\">0</span> gold bars)</div><div class='pants-area'>Pants: <input type=\"button\" value=\"Buy a leather pants\" onclick=\"buyarmor('pants')\" class=\"button-buy-pants\"> (<span class=\"buy-pants-price\">0</span> gold bars)</div><div class='boots-area'>Boots: <input type=\"button\" value=\"Buy a leather boots\" onclick=\"buyarmor('boots')\" class=\"button-buy-boots\"> (<span class=\"buy-boots-price\">0</span> gold bars)</div>",true)
	checkthings();
}
function buyarmor(armor) {
	if(armor=="helmet") {
		price=(helmet*helmet)*1000+1000;
	}
	else if(armor=="chestplate") {
		price=(chestplate*chestplate)*1000+1000;
	}
	else if(armor=="pants") {
		price=(pants*pants)*1000+1000;
	}
	else if(armor=="boots") {
		price=(boots*boots)*1000+1000;
	}

	if(goldbar>=price) {
		goldbar-=price;
		if(armor=="helmet") {
			helmet+=1;
		}
		else if(armor=="chestplate") {
			chestplate+=2;
		}
		else if(armor=="pants") {
			pants+=1.5;
		}
		else if(armor=="boots") {
			boots+=0.5;
		}
	}
	checkthings();
}
function theman(action) {
man="\n\
                              O\n\
                             /|\\\n\
                              |\n\
                             / \\";
	if(action=="talk") {
		if(talk==0) {
man="\n\
           Hi, it seems       O\n\
           that you have     /|\\\n\
           spent a lot of     |\n\
           time to get here! / \\";

			$(".talk-with-dude").val("Yeah, it was a long journey...");
			$(".fight-with-dude").hide();
			$(".give-secret-potion").hide();
		}
		else if(talk==1) {
man="\n\
           How could I        O\n\
           help you?         /|\\\n\
                              |\n\
                             / \\";

			$(".talk-with-dude").val("I have no idea!");
			$(".fight-with-dude").hide();
			$(".give-secret-potion").hide();
		}
		else if(talk==2) {
man="\n\
           Oh, I know!        O      I'm interested in:\n\
           Please, tell me   /|\\     <input type=\"button\" value=\"Battle\" onclick=\"theman('battle')\">\n\
           what you are more  |      <input type=\"button\" value=\"Magic\" onclick=\"theman('magic')\">\n\
           interested in.    / \\";

		}

		if(talk!=2) {
			talk++;
		}
		else {
			talk=0;
			$(".talk-with-dude").val("Talk to him");
			$(".talk-with-dude").hide();
			$(".fight-with-dude").show();
			$(".give-secret-potion").show();
			if(items[20].owned<=0) {
				$(".give-secret-potion").hide();
			}
		}
		$(".theman").html(man);
	}
	else if(action=="fight") {
	randomspeech=randomnumber(1,8);
	randomspeech2=randomnumber(1,8);
if(randomspeech==1) {
man="\n\
            Ugh...            O\n\
            I hate fighting. /|\\\n\
                              |\n\
                             / \\";
}
else if(randomspeech==2) {
man="\n\
            Is fighting       O\n\
            the only hobby   /|\\\n\
            you have?         |\n\
                             / \\";
}
else if(randomspeech==3) {
man="\n\
            No, I'm           O\n\
            not ready!       /|\\\n\
                              |\n\
                             / \\";
}
else if(randomspeech==4) {
man="\n\
            Maybe you         O\n\
            would like       /|\\\n\
            to fight with     |\n\
            someone else?    / \\";
}
else if(randomspeech==5) {
man="\n\
            I'm not           O\n\
            equipped with    /|\\\n\
            armor and         |\n\
            weapons!         / \\";
}
else if(randomspeech==6) {
man="\n\
                              O\n\
            No, no pls       /|\\\n\
                              |\n\
                             / \\";
}
else if(randomspeech2==7) {
man="\n\
                              O\n\
            My name          /|\\\n\
            is Bob!           |\n\
                             / \\";
}
else  {
man="\n\
                              O\n\
            Not now...       /|\\\n\
                              |\n\
                             / \\";
}
		$(".theman").html(man);
		$(".talk-with-dude").val("Talk to him");
		$(".talk-with-dude").show();
		$(".fight-with-dude").show();
		$(".give-secret-potion").show();
		if(items[20].owned<=0) {
			$(".give-secret-potion").hide();
		}
	}
	else if(action=="battle") {
man="\n\
  Oh, so you like battle?     O   manages to defeat it will\n\
  I have an invisible        /|\\  get lots of prizes from\n\
  training robot in my        |   me. Are you ready?\n\
  castle! Anyone who         / \\  <input type=\"button\" value=\"Yes, I'm ready!\" onclick=\"vsinvisiblebot()\">";
		$(".theman").html(man);
	}
	else if(action=="magic") {
man="\n\
         There is a portal    O     portal seems\n\
         in my castle. I     /|\\    very magical.\n\
         have never entered   |     <input type=\"button\" value=\"Enter the portal!\" onclick=\"entermagicportal()\">\n\
         it before, but the  / \\";
		$(".theman").html(man);
	}
	else if(action=="givesecretpotion") {
		items[20].owned--;
		items[23].owned++;
man="\n\
         Oh, thank you!       O    this thing for years\n\
         As a reward, you    /|\\   but I don't know what\n\
         can have this music  |    it is used for. Maybe you\n\
         disc. I have kept   / \\   can use it better than me!";
		$(".theman").html(man);
		if(items[20].owned<=0) {
			$(".give-secret-potion").hide();
		}
	}
}
function eatpizza() {
		if(goldbar >= 5000 && ironbar >= 2500){
			goldbar -= 5000;
			ironbar -= 2500;
			makealert("ovens-fixed","Pizza!","You have successfully fixed the ovens!<br>They are now baking one pizza for you every 5 seconds.",true);
			checkthings();
			pizzaeaten=true;
		}
		else
		{
			makealert("ovens-not-fixed",'Pizza?',"You tried to fix the ovens, but you didn't have enough resources.", true);
		}
}
function healme() {
	if(items[7].owned>=10) {
		items[7].owned-=10;
		poisoned=false;
		makealert("drink-10-health-potion","Healed","You drank 10 health potions and now you are not posioned anymore",true);
	}
}
function cookieclicker(action) {
	if(action=="bake") {
		items[19].owned++;
		checkthings();
	}
	else if(action=="cursor") {
		if(items[19].owned>=Math.round(15*Math.pow(1.15,cursor))) {
			items[19].owned-=Math.round(15*Math.pow(1.15,cursor));
			cursor++;
			checkthings();
		}
	}
}
function vsinvisiblebot() {
	closemessage();
	powerhp();
	battle=makebattle(battleid,"Invisible Bot",750,750,"Invisible laser!",75,"An invisible robot!",9,power,hp,hp,currentsword,false,"vs-invisible-bot");
	html="<div class=\"alert alert-battle-invisible-bot\"><b>Invisible Bot</b><br>Here is the invisible bot, good luck!<br><br>"+battle.html+"</div>";
	$("#otheralerts").append(html);
	battle.init();
	$(".alert-battle-invisible-bot:last").fadeIn("fast");
}
function entermagicportal() {
	secondrealm = true;
	$(".fader").fadeIn("fast");
	setTimeout(function() {
		$(".fader").fadeOut("fast");
		$(".banner-plane").removeClass("world1")
		$("#wrapper").hide();
		$("#realworld").show();
		closemessage();
	}, 200);
}
function exitmagicportal() {
	secondrealm = false;
	$(".fader").fadeIn("fast");
	setTimeout(function() {
		$(".fader").fadeOut("fast");
		$(".banner-plane").addClass("world1")
		$("#wrapper").show();
		$("#realworld").hide();
		closemessage();
	}, 200);
}
function travel()
{
	if(secondrealm){
		exitmagicportal();
	}
	else{
		entermagicportal();
	}
}
function computeraction(type) {
	if(type=="disc") {
		if(items[23].owned>0) {
			items[23].owned--;
			$(".ylvis-the-fox").html("<iframe src=\"http://www.youtube.com/embed/jofNR_WkoCE?autoplay=1&controls=0&modestbranding=1&loop=1&rel=0&showinfo=0\" frameborder=\"0\" class=\"ylvis\" allowfullscreen></iframe>");
			$(".ylvis-the-fox").show();
		}
		else {
			alert('You have no disc to insert!');
		}
	}
	else if(type=="glasses") {
		items[24].owned++;
		makealert("get-glasses","Glasses!","You found some magical glasses!<br>These glasses allow you to see some mysterious things and travel quickly between realms.<br><br>You're amazing!",true);
	}
	else if(type=="error") {
computer="                                            _________________\n\
                                           |                 |\n\
                                           |   ___________   |\n\
                                           |  |   .....   |  |\n\
 ______________________________________    |  |___________|  |\n\
|  __________________________________  |   |   ___________   |\n\
| |<span class=\"bsod\">A problem has been detected and   </span>| |   |  |   .....   |  |\n\
| |<span class=\"bsod\">Windows has been shut down to     </span>| |   |  |___________|  |\n\
| |<span class=\"bsod\">prevent damage to your computer.  </span>| |   |   __   __   _   |\n\
| |<span class=\"bsod\">                                  </span>| |   |  |__| |__| |_|  |\n\
| |<span class=\"bsod\">The problem seems to be caused by </span>| |   |                 |\n\
| |<span class=\"bsod\">the following file: vmilib.sys    </span>| |   |                 |\n\
| |<span class=\"bsod\">                                  </span>| |   |                 |\n\
| |<span class=\"bsod\">SESSION2_INITIALIZATION_FAILED    </span>| |   |                 |\n\
| |<span class=\"bsod\">                                  </span>| |   |       .|.       |\n\
| |<span class=\"bsod\">If this is the first time you've  </span>| |   |      (   )      |\n\
| |<span class=\"bsod\">seen this Stop error screen.      </span>| |   |       '-'       |\n\
| |<span class=\"bsod\" style\"color:black;\">__________________________________</span>| |   |                 |\n\
|______________________________________|   |                 |\n\
                 |    |      '.            |                 |\n\
                 |    |        '-.-'-.-'-.-|                 |\n\
                 )    (                    |                 |\n\
                /      \\                   |                 |\n\
               /________\\                  |_________________|";
		$(".computer-ascii").html(computer);
		$(".ylvis-the-fox").hide();
	}
	else if(type=="goldfactory") {
		if(!buyfactory) {
			closemessage();
			makealert("buy-factory","The Gold Factory","Status: You work here, and you get 1 gold bar per second as the salary.<br><br><input type=\"button\" value=\"Make the boss happier\" onclick=\"makebosshappy()\">and receive a bonus!<br><input type=\"button\" value=\"Buy this factory\" onclick=\"buythefactory()\" class=\"buy-factory-button\"> for 2500 gold bars and get more bars per second!",true);
			checkitem();
		}
		else {
			closemessage();
			makealert("buy-factory-new","The Gold Factory","Status: You are the boss! :o<br><br>You currently have <span class=\"gold-mining\">"+goldmining+"</span> mining machines.<br>Production: <span class=\"gbps\">"+gbps+"</span> gold bars / second<br><br><input type=\"button\" value=\"Buy 1 mining machine\" onclick=\"buyminingmachinegold(1)\" class=\"buy-1-mining-gold\"> (<span class=\"1-gold-cost\">"+goldprice+"</span> Iron Bars)<br><input type=\"button\" value=\"Buy 10 mining machines\" onclick=\"buyminingmachinegold(10)\" class=\"buy-10-mining-gold\"> (<span class=\"10-gold-cost\">"+calculateTotalPrice(goldmining, 10, golddivisor)+"</span> Iron Bars)<br><input type=\"button\" value=\"Buy 100 mining machines\" onclick=\"buyminingmachinegold(100)\" class=\"buy-100-mining-gold\"> (<span class=\"100-gold-cost\">"+calculateTotalPrice(goldmining, 100, golddivisor)+"</span> Iron Bars)<br><br>Don't worry, the price is the same no matter how many machines you buy!<br>You can also <input type='button' value='kill rats that sometimes enter the factory at night.' onclick='killrats()'>.",true);
			checkitem();
		}
		$(".ylvis-the-fox").hide();
	}
	else if(type=="power") {
		if(items[24].owned==0) {
computer="                                            _________________\n\
                                           |                 |\n\
                                           |   <span class=\"click\" onclick=\"computeraction('disc')\">___________</span>   |\n\
                                           |  <span class=\"click\" onclick=\"computeraction('disc')\">|   .....   |</span>  |\n\
 ______________________________________    |  <span class=\"click\" onclick=\"computeraction('disc')\">|___________|</span>  |\n\
|  __________________________________  |   |   ___________   |\n\
| |----------------------------------| |   |  |   .....   |  |\n\
| |http://voxelbugged.github.io/th...| |   |  |___________|  |\n\
| |----------------------------------| |   |   <span class=\"click\" onclick=\"computeraction('error')\">__</span>   __   _   |\n\
| |       <span class=\"click\" onclick=\"computeraction('goldfactory')\">...</span>                |       | |   |  <span class=\"click\" onclick=\"computeraction('error')\">|__|</span> |__| |_|  |\n\
| |     <span class=\"click\" onclick=\"computeraction('goldfactory')\">...</span>                  |       | |   |                 |\n\
| |   <span class=\"click\" onclick=\"computeraction('goldfactory')\">..</span>                     |_______| |   |                 |\n\
| |   <span class=\"click\" onclick=\"computeraction('goldfactory')\">||</span> <span class=\"click\" onclick=\"computeraction('goldfactory')\"> __</span>                         | |   |                 |\n\
| |   <span class=\"click\" onclick=\"computeraction('goldfactory')\">||</span> <span class=\"click\" onclick=\"computeraction('goldfactory')\">| #|__.</span>                     | |   |                 |\n\
| |__<span class=\"click\" onclick=\"computeraction('goldfactory')\">/__\\|__|__|</span>____________<span class=\"click\" onclick=\"computeraction('glasses')\">∞</span>________| |   |       <span class=\"click\" onclick=\"computeraction('power')\">.|.</span>       |\n\
| |                                  | |   |      <span class=\"click\" onclick=\"computeraction('power')\">(   )</span>      |\n\
| |________                  ________| |   |       <span class=\"click\" onclick=\"computeraction('power')\">'-'</span>       |\n\
| |________| _______________|________| |   |                 |\n\
|______________________________________|   |                 |\n\
                 |    |      '.            |                 |\n\
                 |    |        '-.-'-.-'-.-|                 |\n\
                 )    (                    |                 |\n\
                /      \\                   |                 |\n\
               /________\\                  |_________________|";
		}
		else {
computer="                                            _________________\n\
                                           |                 |\n\
                                           |   <span class=\"click\" onclick=\"computeraction('disc')\">___________</span>   |\n\
                                           |  <span class=\"click\" onclick=\"computeraction('disc')\">|   .....   |</span>  |\n\
 ______________________________________    |  <span class=\"click\" onclick=\"computeraction('disc')\">|___________|</span>  |\n\
|  __________________________________  |   |   ___________   |\n\
| |----------------------------------| |   |  |   .....   |  |\n\
| |http://voxelbugged.github.io/th...| |   |  |___________|  |\n\
| |----------------------------------| |   |   <span class=\"click\" onclick=\"computeraction('error')\">__</span>   __   _   |\n\
| |       <span class=\"click\" onclick=\"computeraction('goldfactory')\">...</span>                |       | |   |  <span class=\"click\" onclick=\"computeraction('error')\">|__|</span> |__| |_|  |\n\
| |     <span class=\"click\" onclick=\"computeraction('goldfactory')\">...</span>                  |       | |   |                 |\n\
| |   <span class=\"click\" onclick=\"computeraction('goldfactory')\">..</span>                     |_______| |   |                 |\n\
| |   <span class=\"click\" onclick=\"computeraction('goldfactory')\">||</span> <span class=\"click\" onclick=\"computeraction('goldfactory')\"> __</span>                         | |   |                 |\n\
| |   <span class=\"click\" onclick=\"computeraction('goldfactory')\">||</span> <span class=\"click\" onclick=\"computeraction('goldfactory')\">| #|__.</span>                     | |   |                 |\n\
| |__<span class=\"click\" onclick=\"computeraction('goldfactory')\">/__\\|__|__|</span>_____________________| |   |       <span class=\"click\" onclick=\"computeraction('power')\">.|.</span>       |\n\
| |                                  | |   |      <span class=\"click\" onclick=\"computeraction('power')\">(   )</span>      |\n\
| |________                  ________| |   |       <span class=\"click\" onclick=\"computeraction('power')\">'-'</span>       |\n\
| |________|________________|________| |   |                 |\n\
|______________________________________|   |                 |\n\
                 |    |      '.            |                 |\n\
                 |    |        '-.-'-.-'-.-|                 |\n\
                 )    (                    |                 |\n\
                /      \\                   |                 |\n\
               /________\\                  |_________________|";
		}
		$(".computer-ascii").html(computer);
		$(".ylvis-the-fox").hide();
	}
}

function searchsand() {
	random=randomnumber(1,20);
	if(random==10) {
		r=randomnumber(100,1000);
		goldbar+=r;
		$(".search-result").html("You got "+r+" gold bars!");
		searchtimes++;
	}
	else if(random==15) {
		r=randomnumber(100,1000);
		ironbar+=r;
		$(".search-result").html("You got "+r+" iron bars!");
		searchtimes++;
	}
	else if(random==20) {
		r=randomnumber(2,5);
		items[7].owned+=r;
		$(".search-result").html("You got "+r+" health potions!");
		searchtimes++;
	}
	else if (random==7) {
		closemessage();
		powerhp();
		battle=makebattle(battleid,"Sand Shark",750,750,"Fins & teeth",100,"How it swims, no one knows.",12,power,hp,hp,currentsword,false,"vs-shark");
		html="<div class=\"alert alert-shark-fight\"><b>Surprise!</b><br>You have found a wild sand shark!<br><br>"+battle.html+"</div>";
		$("#otheralerts").append(html);
		battle.init();
		$(".alert-shark-fight:last").fadeIn("fast");
		searchtimes++;
	}
	else {
		$(".search-result").html("You got nothing :(");
	}
}
function burysand() {
	if(gethole) {
		closemessage();
		makealert("suffocated","Suffocated","You have suffocated inside the sand :(<br>GAME OVER!<br>Just kidding...",true);
	}
	else {
		closemessage();
		makealert("bury-sand","...","You start to bury yourself inside the sand, when you suddenly fall into a hole!",true);
		gethole=true;
	}
}
function guy(step) {
	if(step==1) {
story="\n\
       _\n\
   .&bull;'   '&bull;.    \"It seems that I have seen            O\n\
  /         \\    that guy before, hmmmm...\"          /|\\\n\
 |           |                                        |\n\
 |           |                                       / \\\n\
  \\         /    <input type='button' value='Next >' onclick='guy(2)'>                              \n\
   '&bull;.   .&bull;'\n\
     /   \\\n\
    / | | \\\n\
   / /| |\\ \\\n\
  / / | | \\ \\\n\
";
		$(".boss-story").html(story);
	}
	else if(step==2) {
story="\n\
       _\n\
   .&bull;'   '&bull;.    \"Oh, yes, I know him!                 O\n\
  /         \\    He is the one who brought me        /|\\\n\
 |           |   to this weird world >:C\"             |\n\
 |           |                                       / \\\n\
  \\         /    <input type='button' value='Next >' onclick='guy(3)'>                              \n\
   '&bull;.   .&bull;'\n\
     /   \\\n\
    / | | \\\n\
   / /| |\\ \\\n\
  / / | | \\ \\\n\
";
		$(".boss-story").html(story);
	}
	else if(step==3) {
story="\n\
       _\n\
   .&bull;'   '&bull;.    \"I must kill him!\"                    O\n\
  /         \\                                        /|\\\n\
 |           |                                        |\n\
 |           |                                       / \\\n\
  \\         /    <input type='button' value='Next >' onclick='guy(4)'>                              \n\
   '&bull;.   .&bull;'\n\
     /   \\\n\
    / | | \\\n\
   / /| |\\ \\\n\
  / / | | \\ \\\n\
";
		$(".boss-story").html(story);
	}
	else if(step==4) {
story="\n\
       _\n\
   .&bull;'   '&bull;.                    \"No, you can't kill   O\n\
  /         \\                   me, you idiot >:(\"   /|\\\n\
 |           |                                        |\n\
 |           |                                       / \\\n\
  \\         /    <input type='button' value='Fight!' onclick='guy(5)'>                              \n\
   '&bull;.   .&bull;'\n\
     /   \\\n\
    / | | \\\n\
   / /| |\\ \\\n\
  / / | | \\ \\\n\
\n\
\n\
PS: He heals 5 HP each time he attacks you, and he also has armor!";
		$(".boss-story").html(story);
	}
	else if(step==5) {
		closemessage();
		powerhp();
		battle=makebattle(battleid,"Mr. Professor",2500,2500,"Super powerful sword",100,"He brought you into this weird world!",0,power,hp,hp,currentsword,false,"vs-boss");
		html="<div class=\"alert alert-boss-fight\"><b>Fight! Fight! Fight!</b><br>This dude has brought you to this weird world without your permission, and now you've found him!<br><br>"+battle.html+"</div>";
		$("#otheralerts").append(html);
		battle.init();
		$(".alert-boss-fight:last").fadeIn("fast");
	}
}
function openthechestfromsomeone() {
	if(cheststep==0) {
		closemessage();
		makealert("chest-locked","Locked","The chest is locked, you need a key to open it!<br><br><input type='button' onclick='openthechest()' value='Open the chest'>",true);
	}
	else if(cheststep==1) {
		closemessage();
		makealert("chest-locked2","Password?","Oh no! You need a password to open the chest. This chest is really annoying...<br><br>Please type the password<br><input type='text' id='chest-password-form'><br><br><input type='button' value='Submit' onclick='openthechest()'>",true);
	}
	else if(cheststep==2) {
		closemessage();
message='\n\
   _______________________\n\
 =(__    ___      __     _)=\n\
   |                     |\n\
   | A message from the  |\n\
   | developer to you:   |\n\
   |                     |\n\
   | Hi! and thanks for  |\n\
   | playing my game! :D |\n\
   |                     |\n\
   | I would like to say |\n\
   | Congratulations!!!! |\n\
   | You won the game!   |\n\
   |                     |\n\
   | But maybe this game |\n\
   | is not finished for |\n\
   | you, have you dug   |\n\
   | through the end?    |\n\
   |                     |\n\
   | If not, then do it! |\n\
   |                     |\n\
   | If yes, then I      |\n\
   | think you will be   |\n\
   | bored, that\'s why   |\n\
   | I recommend you to  |\n\
   | <a href="http://bit.ly/1gMQO9u">Click here</a> to kill  |\n\
   | your boredom :D     |\n\
   |                     |\n\
 =(_______________________)=\n\
';
		makealert("open-chest","A message","<div style='max-height:300px; overflow-y:auto;'>Hey, what's this? The chest contains a message!<br><br><pre>"+message+"</pre><br>You find this confusing, since you thought you had already beaten the game, but then you notice that the message is dated December 2013.</div>",true);
	}
}

// Just some random comment ;)

function openthechest() {
	if(cheststep==0) {
		if(items[21].owned==1) {
			items[21].owned--;
			cheststep++;
			alert('The chest has been opened!');
			closemessage();
		}
		else {
			alert('You need a key to open the chest!');
		}
	}
	else if(cheststep==1) {
		if($("#chest-password-form").val()=="password" || $("#chest-password-form").val()=="the password") {
			alert('Sorry, this is not a trick question! Or another cipher, if you were wondering.');
		}
		else if($("#chest-password-form").val()=="Ring-ding-ding-ding-dingeringeding!") {
			cheststep++;
			alert('Correct password! Access granted!');
			closemessage();
		}
		else {
			alert('Wrong password!');
		}
	}
}

function localstoragehelp() {
	alert('It\'s a feature that allows the game to save progress in your browser. Technology!');
}

function save() {
	makealert("save","Save game","Here, you can save your progress.<br><br><input type='button' value='Save game' onclick='dosave(\"autolocalstorage\")'> (Uses HTML5 Local Storage <small>[<a href='javascript:localstoragehelp();' title='What is HTML5 Local Storage???'>?</a>]</small>)<br><input type='button' value='Save game as text' onclick='dosave(\"text\")'><br><input type='button' value='Load game' onclick='dosave(\"load\")'><br><input type='button' value='Reset game' onclick='dosave(\"reset\")'><br><input type='button' value='Toggle autosave' onclick='dosave(\"autotoggle\")'> Game autosaves in <span id='autosavetime'>"+autosavetime+"</span> second(s)",true);
}

function dosave(param) {
	if(param=='autotoggle') {
		if(autosave) {
			autosave=false;
			alert('Autosave disabled!');
		}
		else {
			autosave=true;
			alert('Autosave enabled!');
		}
	}
	else if(param=='text') {
		prompt("Save the code somewhere safe!", btoa(goldbar+"|"+ironbar+"|"+gbps+"|"+goldmining+"|"+ibpt+"|"+ibtime+"|"+ironmining+"|"+items[0].owned+"|"+items[1].owned+"|"+items[2].owned+"|"+items[3].owned+"|"+items[4].owned+"|"+items[5].owned+"|"+items[6].owned+"|"+items[7].owned+"|"+items[8].owned+"|"+items[9].owned+"|"+items[10].owned+"|"+items[11].owned+"|"+items[12].owned+"|"+items[13].owned+"|"+items[14].owned+"|"+items[15].owned+"|"+items[16].owned+"|"+items[17].owned+"|"+items[18].owned+"|"+items[19].owned+"|"+items[20].owned+"|"+items[21].owned+"|"+items[22].owned+"|"+items[23].owned+"|"+items[24].owned+"|"+enchant_attack+"|"+enchant_defense+"|"+enchant_countdown+"|"+enchant_life+"|"+helmet+"|"+chestplate+"|"+pants+"|"+boots+"|"+theusername+"|"+theuserdesc+"|"+cheststep+"|"+searchtimes+"|"+shovelbroken+"|"+cursor+"|"+pizzaeaten+"|"+poisoned+"|"+chestunderground+"|"+talk+"|"+wob+"|"+buyfactory+"|"+skill+"|"+skilllvl+"|"+additionalattack+"|"+clickcloudcount+"|"+openchestcount+"|"+candybox+"|"+hpactive+"|"+airplanecountdown+"|"+digcountdown+"|"+digstep+"|"+currentsword+"|"+passthief+"|"+passworms+"|"+passgate+"|"+unlockenchant+"|"+unlockchest+"|"+beatboss+"|"+hasairplane+"|"+reachedclouds+"|"+defeatinvisiblebot+"|"+gethole+"|"+win+"|"+hasportal+"|"+cipherstep+"|"+activatemachine+"|"+autosave+"|"+autoattack)+"encrypted");
	}
	else if(param=='load') {
		savecode=prompt("Please enter the save code", "Enter the code here");
		if(savecode.slice(-9)=="encrypted")savecode=atob(savecode.replace("encrypted",""));
		savecode=savecode.split("|");

		if(savecode.length<75) {
			alert('Invalid save code!');
			return;
		}

		goldbar=parseInt(savecode[0]);
		ironbar=parseInt(savecode[1]);
		gbps=parseInt(savecode[2]);
		goldmining=parseInt(savecode[3]);
		ibpt=parseInt(savecode[4]);
		ibtime=parseInt(savecode[5]);
		ironmining=parseInt(savecode[6]);
		items[0].owned=parseInt(savecode[7]);
		items[1].owned=parseInt(savecode[8]);
		items[2].owned=parseInt(savecode[9]);
		items[3].owned=parseInt(savecode[10]);
		items[4].owned=parseInt(savecode[11]);
		items[5].owned=parseInt(savecode[12]);
		items[6].owned=parseInt(savecode[13]);
		items[7].owned=parseInt(savecode[14]);
		items[8].owned=parseInt(savecode[15]);
		items[9].owned=parseInt(savecode[16]);
		items[10].owned=parseInt(savecode[17]);
		items[11].owned=parseInt(savecode[18]);
		items[12].owned=parseInt(savecode[19]);
		items[13].owned=parseInt(savecode[20]);
		items[14].owned=parseInt(savecode[21]);
		items[15].owned=parseInt(savecode[22]);
		items[16].owned=parseInt(savecode[23]);
		items[17].owned=parseInt(savecode[24]);
		items[18].owned=parseInt(savecode[25]);
		items[19].owned=parseInt(savecode[26]);
		items[20].owned=parseInt(savecode[27]);
		items[21].owned=parseInt(savecode[28]);
		items[22].owned=parseInt(savecode[29]);
		items[23].owned=parseInt(savecode[30]);
		items[24].owned=parseInt(savecode[31]);
		enchant_attack=parseInt(savecode[32]);
		enchant_defense=parseInt(savecode[33]);
		enchant_countdown=parseInt(savecode[34]);
		enchant_life=parseInt(savecode[35]);
		helmet=parseInt(savecode[36]);
		chestplate=parseInt(savecode[37]);
		pants=parseInt(savecode[38]);
		boots=parseInt(savecode[39]);
		theusername=savecode[40];
		theuserdesc=savecode[41];
		cheststep=parseInt(savecode[42]);
		searchtimes=parseInt(savecode[43]);
		shovelbroken=parseInt(savecode[44]);
		cursor=parseInt(savecode[45]);
		pizzaeaten=(savecode[46] === "true");
		poisoned=(savecode[47] === "true");
		chestunderground=(savecode[48] === "true");
		talk=parseInt(savecode[49]);
		wob=(savecode[50] === "true");
		buyfactory=(savecode[51] === "true");
		skill=savecode[52];
		skilllvl=parseInt(savecode[53]);
		additionalattack=parseInt(savecode[54]);
		clickcloudcount=parseInt(savecode[55]);
		openchestcount=parseInt(savecode[56]);
		candybox=(savecode[57] === "true");
		hpactive=parseInt(savecode[58]);
		airplanecountdown=parseInt(savecode[59]);
		digcountdown=parseInt(savecode[60]);
		digstep=parseInt(savecode[61]);
		currentsword=savecode[62];
		passthief=(savecode[63] === "true");
		passworms=(savecode[64] === "true");
		passgate=(savecode[65] === "true");
		unlockenchant=(savecode[66] === "true");
		unlockchest=(savecode[67] === "true");
		beatboss=(savecode[68] === "true");
		hasairplane=(savecode[69] === "true");
		reachedclouds=(savecode[70] === "true");
		defeatinvisiblebot=(savecode[71] === "true");
		gethole=(savecode[72] === "true");
		win=(savecode[73] === "true");
		hasportal=(savecode[74] === "true");
		if(savecode.length>=76) { cipherstep=parseInt(savecode[75]); } else { cipherstep=0; }
		if(savecode.length>=77) { activatemachine=(savecode[76] === "true"); } else { activatemachine=0; }
		if(savecode.length>=78) { autosave=(savecode[77] === "true"); } else { autosave=false; }
		if(savecode.length>=79) { autoattack=(savecode[78] === "true"); } else { autoattack=false; }
		checkthings();
		dosave("autolocalstorage");
		location.reload();
	}
	else if(param=='loadlocalstorage') {
		savecode=localStorage.thegoldfactorygamesave;
		if(savecode.slice(-9)=="encrypted")savecode=atob(savecode.replace("encrypted",""));
		savecode=savecode.split("|");

		goldbar=parseInt(savecode[0]);
		ironbar=parseInt(savecode[1]);
		gbps=parseInt(savecode[2]);
		goldmining=parseInt(savecode[3]);
		ibpt=parseInt(savecode[4]);
		ibtime=parseInt(savecode[5]);
		ironmining=parseInt(savecode[6]);
		items[0].owned=parseInt(savecode[7]);
		items[1].owned=parseInt(savecode[8]);
		items[2].owned=parseInt(savecode[9]);
		items[3].owned=parseInt(savecode[10]);
		items[4].owned=parseInt(savecode[11]);
		items[5].owned=parseInt(savecode[12]);
		items[6].owned=parseInt(savecode[13]);
		items[7].owned=parseInt(savecode[14]);
		items[8].owned=parseInt(savecode[15]);
		items[9].owned=parseInt(savecode[16]);
		items[10].owned=parseInt(savecode[17]);
		items[11].owned=parseInt(savecode[18]);
		items[12].owned=parseInt(savecode[19]);
		items[13].owned=parseInt(savecode[20]);
		items[14].owned=parseInt(savecode[21]);
		items[15].owned=parseInt(savecode[22]);
		items[16].owned=parseInt(savecode[23]);
		items[17].owned=parseInt(savecode[24]);
		items[18].owned=parseInt(savecode[25]);
		items[19].owned=parseInt(savecode[26]);
		items[20].owned=parseInt(savecode[27]);
		items[21].owned=parseInt(savecode[28]);
		items[22].owned=parseInt(savecode[29]);
		items[23].owned=parseInt(savecode[30]);
		items[24].owned=parseInt(savecode[31]);
		enchant_attack=parseInt(savecode[32]);
		enchant_defense=parseInt(savecode[33]);
		enchant_countdown=parseInt(savecode[34]);
		enchant_life=parseInt(savecode[35]);
		helmet=parseInt(savecode[36]);
		chestplate=parseInt(savecode[37]);
		pants=parseInt(savecode[38]);
		boots=parseInt(savecode[39]);
		theusername=savecode[40];
		theuserdesc=savecode[41];
		cheststep=parseInt(savecode[42]);
		searchtimes=parseInt(savecode[43]);
		shovelbroken=parseInt(savecode[44]);
		cursor=parseInt(savecode[45]);
		pizzaeaten=(savecode[46] === "true");
		poisoned=(savecode[47] === "true");
		chestunderground=(savecode[48] === "true");
		talk=parseInt(savecode[49]);
		wob=(savecode[50] === "true");
		buyfactory=(savecode[51] === "true");
		skill=savecode[52];
		skilllvl=parseInt(savecode[53]);
		additionalattack=parseInt(savecode[54]);
		clickcloudcount=parseInt(savecode[55]);
		openchestcount=parseInt(savecode[56]);
		candybox=(savecode[57] === "true");
		hpactive=parseInt(savecode[58]);
		airplanecountdown=parseInt(savecode[59]);
		digcountdown=parseInt(savecode[60]);
		digstep=parseInt(savecode[61]);
		currentsword=savecode[62];
		passthief=(savecode[63] === "true");
		passworms=(savecode[64] === "true");
		passgate=(savecode[65] === "true");
		unlockenchant=(savecode[66] === "true");
		unlockchest=(savecode[67] === "true");
		beatboss=(savecode[68] === "true");
		hasairplane=(savecode[69] === "true");
		reachedclouds=(savecode[70] === "true");
		defeatinvisiblebot=(savecode[71] === "true");
		gethole=(savecode[72] === "true");
		win=(savecode[73] === "true");
		hasportal=(savecode[74] === "true");
		if(savecode.length>=76) { cipherstep=parseInt(savecode[75]); } else { cipherstep=0; }
		if(savecode.length>=77) { activatemachine=(savecode[76] === "true"); } else { activatemachine=0; }
		if(savecode.length>=78) { autosave=(savecode[77] === "true"); }
		if(savecode.length>=79) { autoattack=(savecode[78] === "true"); } else { autoattack=false; }

		checkthings();

	}
	else if(param=="autolocalstorage") {

		if(typeof(Storage) === "undefined") {
			alert('Update your browser, dammit, it\'s 2024 and you still don\'t have local storage! How?');
		}

		localStorage.thegoldfactorygamesave=btoa(goldbar+"|"+ironbar+"|"+gbps+"|"+goldmining+"|"+ibpt+"|"+ibtime+"|"+ironmining+"|"+items[0].owned+"|"+items[1].owned+"|"+items[2].owned+"|"+items[3].owned+"|"+items[4].owned+"|"+items[5].owned+"|"+items[6].owned+"|"+items[7].owned+"|"+items[8].owned+"|"+items[9].owned+"|"+items[10].owned+"|"+items[11].owned+"|"+items[12].owned+"|"+items[13].owned+"|"+items[14].owned+"|"+items[15].owned+"|"+items[16].owned+"|"+items[17].owned+"|"+items[18].owned+"|"+items[19].owned+"|"+items[20].owned+"|"+items[21].owned+"|"+items[22].owned+"|"+items[23].owned+"|"+items[24].owned+"|"+enchant_attack+"|"+enchant_defense+"|"+enchant_countdown+"|"+enchant_life+"|"+helmet+"|"+chestplate+"|"+pants+"|"+boots+"|"+theusername+"|"+theuserdesc+"|"+cheststep+"|"+searchtimes+"|"+shovelbroken+"|"+cursor+"|"+pizzaeaten+"|"+poisoned+"|"+chestunderground+"|"+talk+"|"+wob+"|"+buyfactory+"|"+skill+"|"+skilllvl+"|"+additionalattack+"|"+clickcloudcount+"|"+openchestcount+"|"+candybox+"|"+hpactive+"|"+airplanecountdown+"|"+digcountdown+"|"+digstep+"|"+currentsword+"|"+passthief+"|"+passworms+"|"+passgate+"|"+unlockenchant+"|"+unlockchest+"|"+beatboss+"|"+hasairplane+"|"+reachedclouds+"|"+defeatinvisiblebot+"|"+gethole+"|"+win+"|"+hasportal+"|"+cipherstep+"|"+activatemachine+"|"+autosave+"|"+autoattack)+"encrypted";

		justarandomvariablename=$('#credits').html();
		$('#credits').html("(Game saved)&nbsp;"+justarandomvariablename);
		setTimeout(function() {
			$('#credits').html(justarandomvariablename);
		},5000);

	}
	else if(param=="reset") {
		a=confirm("Are you sure you want to reset your game?");
		if(a) {
			b=confirm("Last warning - are you REALLY sure? Remember, this can't be undone!");
			if(b) {
				localStorage.clear();
				location.reload();
			}
		}
	}
}

jQuery.fn.shake = function() {
    this.each(function(i) {
        for (var x = 1; x <= 2; x++) {
            $(this).animate({ marginLeft: 25 }, 10).animate({ marginLeft: -25 }, 50).animate({ marginLeft: 25 }, 10).animate({ marginLeft: 0 }, 50);
        }
    });
    return this;
}



/* BATTLE SYSTEM */

function makebattle(id,name,hp,maxhp,weapon,damage,description,enemyascii,power,myhp,mymaxhp,myweapon,loop,param) {
	enemyasciis=[];
enemyasciis.push("\n\
     O\n\
    /|\\\n\
     |\n\
    / \\");
enemyasciis.push("\n\
\n\
    ~    ~\n\
  ~   ~     ~\n\
    ~    ~");
enemyasciis.push("\n\
    [_]\n\
    /|\\\n\
     |\n\
    / \\");
enemyasciis.push("\n\
     (_(\n\
    ('')\n\
  _  \"\\ )>,_     .-->\n\
  _>--w/((_ >,_.'\n\
         ///\n\
         \"`\"");
enemyasciis.push("\n\
    ___\n\
   /.. \\_\n\
 __\\0  / )\n\
(__/    /\n\
  /     \\\n\
 /_      \\\n\
   ``\"\"\"\"\"`");
enemyasciis.push("\n\
        _ (m)\n\
  __(\")/ |\n\
 ( (   )/\n\
 / |   | \n\
 \\( ( ) )\n\
  /_| |_\\");
enemyasciis.push("\n\
\\\n\
 \\ji\n\
 /.((( \n\
(,/\"(((__,--.\n\
    \\  ) _( /{ \n\
    !|| \" :||\n\
    !||   :||\n\
    '''   ''' ");
enemyasciis.push("\n\
  _W_\n\
_ (\")\n\
 \\/ /\\_\n\
  \\ \\\n\
__///__");
enemyasciis.push('\n\
     ,\n\
    {\\\\\n\
   {~ \\\\\n\
   {~=_\\\\,;._\n\
    {~-(;; \'_)\n\
   ,~---"  /\n\
~~~( )__\\ )\n\
   /))  \\\\\\\n\
   \\\\\\   \\\\\\\n\
    ``"   `"\'');
enemyasciis.push("\n\
\n\
\n\
\n\
");
enemyasciis.push("\n\
            ,^\n\
           ;  ;\n\
\\`.,'/      ; ;\n\
/_  _\\`-----';\n\
  \\/` ,,,,,, ;\n\
    )//     \\))");
enemyasciis.push("\n\
	   _  _\n\
  (o)(o)--.\n\
   \\../ (  )\n\
   m\\/m--m'`--.");
enemyasciis.push("\n\
        /|       ./\n\
_--~~  ~~---___.'/\n\
~-_o_)  ___----~~\\\n\
     `\\|");
output2="<tr><td>";
output2=output2+"<pre style=\"opacity:0;\">\n\
     O\n\
    /|\\\n\
     |\n\
    / \\</pre>";

output2=output2+"<pre style=\"position:absolute;margin-top:-77px;\" class=\"player-"+id+"\">\n\
     O\n\
    /|\\\n\
     |\n\
    / \\</pre>";


if(currentsword=="Wooden Sword") { stype="Wood"; }
if(currentsword=="Stone Sword") { stype="Stone"; }
if(currentsword=="Iron Sword") { stype="Iron"; }
if(currentsword=="Diamond Sword") { stype="Diamond"; }
if(currentsword=="Emerald Sword") { stype="Diamond"; }

//output2=output2+"<img style=\"position:absolute;\" class=\"player-sword-"+id+"\" src=\"images/sword"+stype+".png\">";

output2=output2+"<pre style=\"position:absolute;margin-top:-180px;margin-left:50px;opacity:0;\" class=\"thunder-"+id+"\">\n\
                         ___\n\
                        /  /  \n\
     ..zzzZAP!!!!!     /  /  \n\
                     _/ ./  \n\
                    / ./   \n\
                   / /  \n\
              .   /./    \n\
         ..   |  //  .    \n\
      .   \\\\  | /' .'  .  \n\
       ~-. `     ' .-~  \n\
           _.oOOo._       </pre>";

output2=output2+"</td><td style=\"width:50px;\"></td><td>";
output2=output2+"<pre style=\"opacity:0;\">"+enemyasciis[enemyascii]+"</pre>";

if(enemyascii==3) {
	output2=output2+"<pre style=\"position:absolute;margin-top:-120px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}
else if(enemyascii==4) {
	output2=output2+"<pre style=\"position:absolute;margin-top:-140px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}
else if(enemyascii==5) {
	output2=output2+"<pre style=\"position:absolute;margin-top:-125px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}
else if(enemyascii==6) {
	output2=output2+"<pre style=\"position:absolute;margin-top:-165px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}
else if(enemyascii==7) {
	output2=output2+"<pre style=\"position:absolute;margin-top:-103px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}
else if(enemyascii==8) {
	output2=output2+"<pre style=\"position:absolute;margin-top:-210px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}
else if(enemyascii==10) {
	output2=output2+"<pre style=\"position:absolute;margin-top:-125px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}
else {
	output2=output2+"<pre style=\"position:absolute;margin-top:-77px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}

if(name=="Thief") {
	//output2=output2+"<img style=\"position:absolute;\" class=\"enemy-sword-"+id+"\" src=\"images/swordWood.png\">";
}
else if(name=="Castle Guard") {
	//output2=output2+"<img style=\"position:absolute;\" class=\"enemy-sword-"+id+"\" src=\"images/swordGold.png\">";
}
else if(name=="Castle Staff") {
	//output2=output2+"<img style=\"position:absolute;\" class=\"enemy-sword-"+id+"\" src=\"images/swordIron.png\">";
}
else if(name=="Zombie King") {
	//output2=output2+"<img style=\"position:absolute;\" class=\"enemy-sword-"+id+"\" src=\"images/swordDiamond.png\">";
}


output2=output2+"</td></tr><tr><td>";
output2=output2+"<span class=\"you-"+id+"\">"+theusername+"</span> (<span class=\"player-"+id+"-hp\">"+myhp+"</span>/"+mymaxhp+")<br>Damage: "+power+"<br>Weapon: "+myweapon+"<br>\"<span class=\"you-desc-"+id+"\">"+theuserdesc+"</span>\"";
output2=output2+"</td><td><div style=\"text-align:center;\">VS</div></td><td>";
output2=output2+name+" (<span class=\"enemy-"+id+"-hp\">"+hp+"</span>/"+maxhp+")<br>Damage: "+damage+"<br>Weapon: "+weapon+"<br>\""+description+"\"";
output2=output2+"</td></tr>";

output="<table id=\"battle-"+id+"\">"+output2+"</table><br><div class=\"buttons-"+id+"\"><input type=\"button\" value=\"Attack!\" class=\"button-attack-"+id+"\" onclick=\"attackenemy("+id+","+power+","+hp+",'"+param+"')\"><input type=\"button\" value=\"["+items[7].owned+"] Drink health potion\" style=\"display:none;\" class=\"button-health-"+id+"\" onclick=\"drinkhealthpotion("+id+")\"><input type=\"button\" value=\"Use skill\" style=\"display:none;\" class=\"button-skill-"+id+"\" onclick=\"usetheskill("+id+")\"><hr>\n\
<input type=\"button\" value=\"["+items[12].owned+"] Poison\" class=\"button-potion-12-"+id+"\" onclick=\"usepotion(12,"+id+")\">\n\
<input type=\"button\" value=\"["+items[13].owned+"] Confusion\" class=\"button-potion-13-"+id+"\" onclick=\"usepotion(13,"+id+")\">\n\
<input type=\"button\" value=\"["+items[14].owned+"] Invisibility\" class=\"button-potion-14-"+id+"\" onclick=\"usepotion(14,"+id+")\">\n\
<input type=\"button\" value=\"["+items[15].owned+"] Instant Countdown\" class=\"button-potion-15-"+id+"\" onclick=\"usepotion(15,"+id+")\">\n\
<input type=\"button\" value=\"["+items[16].owned+"] Gambler's\" class=\"button-potion-16-"+id+"\" onclick=\"usepotion(16,"+id+")\">\n\
<input type=\"button\" value=\"["+items[17].owned+"] Cookie\" class=\"button-potion-17-"+id+"\" onclick=\"usepotion(17,"+id+")\">\n\
<input type=\"button\" value=\"["+items[18].owned+"] X\" class=\"button-potion-18-"+id+"\" onclick=\"usepotion(18,"+id+")\"> <span class=\"potion-countdown-"+id+"\"></span></div>\n\
<hr class=\"potion-separator-"+id+"\"><input type=\"button\" value=\"Flee!\" onclick=\"closemessage(); battle_ended();\">\n\
<input type=\"button\" value=\"Toggle auto-attack\" onclick=\"toggleautoattack("+id+");\">";
	if(hp<=0) {
		//win
		setTimeout(function(){winbattle(param,id);},2000);
	}
	else if(myhp<=0) {
		//lose
		setTimeout(function(){closemessage(); battle_ended();},2000);
	}
	else {
		instasused = 0;
		// this should have happened already, but just in case
		stop_battle_timers();

		if(poisoned) {
			$(".player-"+id+"-hp").html(10);
			myhealthpoint(true,10);
		}
		else {
			myhealthpoint(true,myhp);
		}
		enemyhealthpoint(true,hp);
		enemyhealthpoint2(true,hp);
		enemy_attack_timer = setTimeout(function(){enemyattack(id,damage);},2000+Math.random()*1000);
		theparam(true,param);
		isinvuln(true,false);
		battlestop(true,false);
		enemyconfused(true,false);
		isinvisible(true,false);
		theenemyascii(true,enemyascii);
		theenemyname123(true,name);
		$(".modal").fadeIn("fast");
		attackdelay(id,0);
		healthdelay(id,0);
		skilldelay(id,0);
		clearTimeout(potiontimeout);
	}

	var init_func = function() {
						checkhealthbutton(id);
						checkskillbutton(id);
						checkpotionsbutton(id);
				};

	if(!loop) {
		if(autoattack) {
			setTimeout(function(){attackdelay(id,1);$(".button-attack-"+id).attr("disabled",true);}, 0);
		}
		return { html: output,
			     init: init_func
				};
	}
	else {
		$("#battle-"+id).html(output2);
		init_func();
	}
}
function toggleautoattack(id)
{
	autoattack = !autoattack;
	if(autoattack) {
		alert("Auto-attack is now enabled!");
		if($(".button-attack-"+id).attr("disabled") == undefined) {
			$(".button-attack-"+id).click();
		}
	}
	else {
		alert("Auto-attack is now disabled.");
	}
}
function enemyattack(id,damage) {
	if(id=="clear") {
		//clearTiemout(asdasdf);
	}
	else {
		$(".button-health-"+id).attr("onclick","drinkhealthpotion("+id+","+myhealthpoint(false,0)+")");
		if(myhealthpoint(false,0)<=0) {
			setTimeout(function(){closemessage(); battle_ended();},0);
			//clearTiemout(asdasdf);
		}
		else {
			if(battlestop(false,0)==false) {
				enemyisattacking=true;
				if(!enemyconfused(false,0)) {
					$(".enemy-"+id).animate({"margin-left":-160+"px"},200);
					$(".enemy-sword-"+id).animate({"margin-left":-160+"px"},200);
				}
				enemy_attack_timer = setTimeout(function(){
					// actually perform the attack
					// this timer is set to coincide with the completion of the above animate() calls [200ms]
					lagipusing=false;
					if(isinvuln(false,0)==false) {
						if(enemyconfused(false,0)) {
							enemyhp=enemyhealthpoint(false,0);
							enemyhp-=damage;
							enemyhealthpoint(true,enemyhp);
							$(".enemy-"+id+"-hp").html(enemyhp);
							enemyconfused(true,false);
							lagipusing=true;

							if(enemyhealthpoint(false,0)<=0) {
								thenewhp=enemyhealthpoint(true,0);
								$(".enemy-"+id+"-hp").html("0");
								$(".button-attack-"+id).attr("disabled",true);
								setTimeout(function(){winbattle(theparam(false,0),id);},0);
								return;
							}

						}
						else {
							myhp=myhealthpoint(false,0);
							absorb=helmet+chestplate+pants+boots;
							myhp-=damage-Math.round(damage*(absorb/100));
							myhealthpoint(true,myhp);
						}
					}
					if(myhealthpoint(false,0)<=0) {
						myhealthpoint(true,0)
						myhp=myhealthpoint(false,0);
						enemyattack(id,damage,myhp);
						if(!lagipusing) {
							$(".enemy-"+id).animate({"margin-left":0+"px"},200);
							$(".enemy-sword-"+id).animate({"margin-left":21+"px"},200);
						}
						$(".player-"+id+"-hp").html(myhp);
						$(".button-attack-"+id).attr("disabled",true);
					}
					else {
						myhp=myhealthpoint(false,0);
						$(".player-"+id+"-hp").html(myhp);
						if(!lagipusing) {
							$(".enemy-"+id).animate({"margin-left":0+"px"},200);
							$(".enemy-sword-"+id).animate({"margin-left":21+"px"},200);
						}
						enemyisattacking=false;
						if(theenemyname123(false,0)=="Mr. Professor") {
							hp=enemyhealthpoint(false,0);
							hp+=5;
							enemyhealthpoint(true,hp);
							$(".enemy-"+id+"-hp").html(hp);
						}
						// Schedule a new attack
						enemy_attack_timer = setTimeout(function(){enemyattack(id,damage);},1800+Math.random()*1000);
					}
				},200);
			}
		}
		$(".button-health-"+id).attr("onclick","drinkhealthpotion("+id+","+myhealthpoint(false,0)+")");
	}
}
function attackenemy(id,power,hp,param) {
	if(theenemyascii(false,0)==9 && isinvisible(false,0)==false) {
		alert('You can\'t attack the bot because you can\'t see it!');
		return;
	}
	if(enemyhealthpoint(false,0)<=0) {
		enemyattack("clear",0);
		setTimeout(function(){winbattle(param,id);},0);
	}
	else {
		if(id>0) {
			if(enchant_countdown==1) { mindelay=2; } else { mindelay=3; }
			myhp=myhealthpoint(false,0);
			myhp+=enchant_life*2;
			powerhp();
			if(myhp>thisismyhp) {
				myhp=thisismyhp;
			}
			myhealthpoint(true,myhp);
			$(".player-"+id+"-hp").html(myhp);
			playerisattacking=true;
			attackdelay(id,mindelay);
			$(".player-"+id).animate({"margin-left":160+"px"},200);
			$(".player-sword-"+id).animate({"margin-left":200+"px"},200);
			setTimeout(function(){
				hp=enemyhealthpoint(false,0);
				if(theenemyname123(false,0)=="Mr. Professor") {
					power-=Math.round(power*5/100);
				}
				hp-=power;
				enemyhealthpoint(true,hp);
				if(enemyhealthpoint(false,0)<=0) {
					thenewhp=enemyhealthpoint(true,0);
					attackenemy(id,power,hp,param);
					$(".player-"+id).animate({"margin-left":0+"px"},200);
					$(".player-sword-"+id).animate({"margin-left":50+"px"},200);
					$(".enemy-"+id+"-hp").html("0");
					$(".button-attack-"+id).attr("disabled",true);
				}
				else {
					hp=enemyhealthpoint(false,0);
					$(".enemy-"+id+"-hp").html(hp);
					$(".player-"+id).animate({"margin-left":0+"px"},200);
					$(".player-sword-"+id).animate({"margin-left":50+"px"},200);
					$(".button-attack-"+id).attr("onclick","attackenemy("+id+","+power+","+hp+",'"+param+"')");
					playerisattacking=false;
				}
			},200);
		}
	}
}
function attackdelay(id,sec) {
	if(sec!=0) {
		$(".button-attack-"+id).attr("disabled",true);
		$(".button-attack-"+id).attr("value","Attack! ("+sec+")");
		sec--;
		attacktimeout=setTimeout(function(){attackdelay(id,sec);},1000);
	}
	else {
		$(".button-attack-"+id).removeAttr("disabled");
		$(".button-attack-"+id).attr("value","Attack!");
		if(autoattack && id == battleid){
			$(".button-attack-"+id).click();
		}
	}
}
function checkhealthbutton(id) {
	if(items[7].owned!=0) {
		$(".button-health-"+id).show();
	}
	else {
		$(".button-health-"+id).hide();
	}
}
function checkskillbutton(id) {
	if(skill!="none") {
		$(".button-skill-"+id).show();
	}
	else {
		$(".button-skill-"+id).hide();
	}
}
function checkpotionsbutton(id) {
	let showseparator = false;
	for(i=12;i<=18;i++) {
		thepotionname=items[i];
		if(thepotionname.owned>0) {
			$(".button-potion-"+i+"-"+id).show();
			showseparator = true;
		}
		else {
			$(".button-potion-"+i+"-"+id).hide();
		}
	}
	if(showseparator)
	{
		$(".potion-separator-"+id).show();
	}
	else
	{
		$(".potion-separator-"+id).hide();
	}
}
function drinkhealthpotion(id) {
	if(items[7].owned!=0) {
		mindelay = 6;
		items[7].owned-=1;
		checkhealthbutton(id);
		checkthings();
		myhp=myhealthpoint(false,0);
		myhp+=50;
		powerhp();
		if(myhp>hp) {
			myhp=hp;
		}
		myhealthpoint(true,myhp);
		$(".player-"+id+"-hp").html(myhp);
		$(".button-health-"+id).attr("onclick","drinkhealthpotion("+id+","+myhp+")");
		healthdelay(id,mindelay);
	}
}
function usetheskill(id) {
	if(skill!="none") {
		mindelay = 20;
		if(skill=="thunder") {
			enemyhp=enemyhealthpoint(false,0);
			enemyhp-=20+skilllvl*10;
			enemyhealthpoint(true,enemyhp);
			if(enemyhealthpoint(false,0)<=0) {
				enemyhealthpoint(true,0);
			}
			$(".enemy-"+id+"-hp").html(enemyhp);
			$(".thunder-"+id).css("opacity","1");
			$(".alert").shake();
			setTimeout(function() {
				$(".thunder-"+id).css("opacity","0");
				if(enemyhealthpoint(false,0)<=0) {
					setTimeout(function(){winbattle(theparam(false,0),id);},0);
				}
			},300);
			skilldelay(id,mindelay);
		}
		else {
			$(".player-"+id).css("opacity","0.5");
			isinvuln(true,true);
			invulnerabilitydelay=setTimeout(function() {
				$(".player-"+id).css("opacity","1");
				isinvuln(true,false);
			},(3+skilllvl)*1000);
			skilldelay(id,mindelay+(3+skilllvl));
		}
	}
}
function usepotion(pid,id) {
	if(items[pid].owned>=1) {
		items[pid].owned--;
		checkpotionsbutton(id);
		thepotionname=items[pid].name.replace(" potion","");
		$(".button-potion-"+pid+"-"+id).val("["+items[pid].owned+"] "+thepotionname);
		mindelay = 6
		if(pid==15) { mindelay=10+(instasused*5); instasused++; }
		if(pid==12) { mindelay = 3; }
		potiondelay(id,mindelay)

		if(pid==12) {
			damage=50;
			hp=enemyhealthpoint(false,0);
			hp-=damage;
			if(hp<=0) {
				hp=0;
			}
			enemyhealthpoint(true,hp);
			$(".enemy-"+id+"-hp").html(hp);
			if(enemyhealthpoint(false,0)<=0) {
				setTimeout(function(){winbattle(theparam(false,0),id);},0);
			}
		}
		else if(pid==13) {
			enemyconfused(true,true);
		}
		else if(pid==14) {
			$(".player-"+id).css("opacity",0);
			isinvisible(true,true);
		}
		else if(pid==15) {
			if(typeof attacktimeout !== 'undefined') {
				clearTimeout(attacktimeout);
			}
			if(typeof healthtimeout !== 'undefined') {
				clearTimeout(healthtimeout);
			}
			if(typeof skilltimeout !== 'undefined') {
				clearTimeout(skilltimeout);
			}
			attackdelay(id,0);
			console.log(id);
			healthdelay(id,0);
			skilldelay(id,0);
		}
		else if(pid==16) {
			rand = Math.round(Math.random()*(100+Math.floor(items[3].owned/3.5)));
			myhealthpoint(true,rand);
			$(".player-"+id+"-hp").html(rand);
		}
		else if(pid==17) {
			prompt("What the...","MS4wMzkzfHwxMzc4ODMwNjMyODc2O05hTjsxMzgzMjM5MTM4NTc1fDAwMTEwMHwxOTI5ODUyNzY5LjA2MDA1NTs3MDY0MjEyNzE3NDkuMTAyMzs4Mjk3OzE5OzEzODI1NTk5NDIxLjg4MTQ0Mzs4MDstMTstMTswOzA7MDswOzY3OzQ3OTY5OzA7MDswOzB8MTI4LDEyOSw3Njg0NTM2MjE3LDA7MTA1LDEwNiwyMzc2Njc5MzIwLDA7MTAxLDEwMSw1NDE3MzU5OCwwOzEwMSwxMDEsMjM5MDExOTgxLDE7ODIsODIsNjEzNDEwODI2LDA7NTgsNTgsMTQxNDg4MTkyNiwwOzUwLDUwLDI4MzExMzI1NzIsMDs1MCw1MCw0MDU2NjYyNTI3MywwOzI3LDI3LDY2NDU0OTU1NDYwLDA7MTYsMTYsMjI3NzgyMzIwNDU0LDA7fDQ1MDM1OTk2MjczNzA0OTU7NDUwMzEwMDMzNzQyMjMzNTsyMjUxODM0MTczNDAxNzAzOzM5NDA2NDk2NzM5NTk5MzU7MjI1MTc5OTk0NTgwNTk2MzsxMzc0Mzg5NTM0NzN8NDUwMzA0Nzc5MTA4MzUxOTsyMzkyODE2NzQwMTEyMDkxOzEwMjU%3D%21END%21");
		}
		else if(pid==18) {
			rand=Math.round(Math.random()*1000);
			$(".you-"+id).html('Player-'+rand);
			$(".you-desc-"+id).html('Player number '+rand);
			checkthings();
		}

	}
}
function potiondelay(id,sec) {
	if(sec!=0) {
		$("[class^=button-potion-]").attr("disabled",true);
		$(".potion-countdown-"+id).html("("+sec+" sec)");
		sec--;
		potiontimeout = setTimeout(function(){potiondelay(id,sec);},1000);
	}
	else {
		$("[class^=button-potion-]").removeAttr("disabled");
		$(".potion-countdown-"+id).html("");
		potiontimeout = undefined;
	}
}
function skilldelay(id,sec) {
	if(sec!=0) {
		$(".button-skill-"+id).attr("disabled",true);
		$(".button-skill-"+id).attr("value","Use skill ("+sec+")");
		sec--;
		skilltimeout=setTimeout(function(){skilldelay(id,sec);},1000);
	}
	else {
		$(".button-skill-"+id).removeAttr("disabled");
		$(".button-skill-"+id).attr("value","Use skill");
		skilltimeout = undefined;
	}
}
function healthdelay(id,sec) {
	if(sec!=0) {
		$(".button-health-"+id).attr("disabled",true);
		$(".button-health-"+id).attr("value","["+items[7].owned+"] Drink Health Potion ("+sec+")");
		sec--;
		healthtimeout=setTimeout(function(){healthdelay(id,sec);},1000);
	}
	else {
		$(".button-health-"+id).removeAttr("disabled");
		$(".button-health-"+id).attr("value","["+items[7].owned+"] Drink Health Potion");
		healthtimeout = undefined;
	}
}

// stop all of the background timers for the current battle
function stop_battle_timers() {
	// it is expected that the enemy is either attacking or preparing to attack; put a stop to that immediately.
	if (typeof enemy_attack_timer !== 'undefined') { clearTimeout(enemy_attack_timer); enemy_attack_timer = undefined; }

		if(typeof attacktimeout !== 'undefined') {
			clearTimeout(attacktimeout);
			attacktimeout = undefined;
		}
		if(typeof healthtimeout !== 'undefined') {
			clearTimeout(healthtimeout);
			healthtimeout = undefined;
		}
		if(typeof skilltimeout !== 'undefined') {
			clearTimeout(skilltimeout);
			skilltimeout = undefined;
		}
		if(typeof invulnerabilitydelay !== 'undefined') {
			clearTimeout(invulnerabilitydelay);
			invulnerabilitydelay = undefined;
		}
}

// perform cleanup at the end of the battle, regardless of outcome
function battle_ended() {
	// signal to others that the battle has ended
	battlestop(true, true);
	stop_battle_timers();
	removeBattle(battleid);
	battleid++;
}

function myhealthpoint(set,health) { if(!set) { return myhp; } else { myhp=health; } }
function enemyhealthpoint(set,health) { if(!set) { return enemyhp; } else { enemyhp=health; } }
function enemyhealthpoint2(set,health) { if(!set) { return enemyhp2; } else { enemyhp2=health; } }
function theparam(set,param) { if(!set) { return theparameter; } else { theparameter=param; } }
function isinvuln(set,invuln) { if(!set) { return invulncond; } else { invulncond=invuln; } }
function battlestop(set,stop) { if(!set) { return isstop; } else { isstop=stop; } }
function enemyconfused(set,confused) { if(!set) { return isconfused; } else { isconfused=confused; } }
function isinvisible(set,invisibility) { if(!set) { return amiinvisible; } else { amiinvisible=invisibility; } }
function theenemyascii(set,asciiartno) { if(!set) { return theasciiartno; } else { theasciiartno=asciiartno; } }
function theenemyname123(set,enemyname) { if(!set) { return theenemyname; } else { theenemyname=enemyname; } }
function winbattle(param,id) {
	myfinalhp=myhealthpoint(false,0);
	myhealthpoint(true,100+Math.floor(items[3].owned/3.5));
	battle_ended();
	if(param=="vs-thief") {
		passthief=true;
		closemessage();
		makealert("new-shop","Thanks!","Hi, I'm Andrew! Thanks for helping us kill the thief!<br>By the way, I just finished setting up my new shop - maybe you'd want to buy something!",true);
		checkthings();
	}
	else if(param=="vs-worms"){
		passworms=true;
		closemessage();
		makealert("underground-world","Underground World!","Wow! You discovered an underground world! :o",true);
		checkthings();
	}
	else if(param=="training"){
		closemessage();
		additionalattack+=1;
		checkthings();
	}
	else if(param=="vs-monster"){
		closemessage();
		unlockenchant=true;
		makealert("enchant-unlocked","Enchanting shop","You can now visit the enchanting shop and enchant your sword!<br>The owner of the enchanting shop gave you 1000 gold bars as a reward for slaying the fearsome beast.",true);
		goldbar+=1000;
	}
	else if(param=="vs-ghost"){
		closemessage();
		unlockchest=true;
chest='\n\
   __________\n\
  /\\____;;___\\\n\
 | /         /\n\
 `. ())oo() .\n\
  |\\(%()*^^()^\\\n\
 %| |-%-------|\n\
% \\ | %  ))   |\n\
%  \\|%________|\n\
 %%%%';
		goldbar+=2500;
		html="<div class=\"alert alert-chest-unlocked\"><b>A Chest!</b><br>The chest contains 2500 gold bars and an ancient scroll.<br><br><pre>"+chest+"</pre><br><br><input type=\"button\" value=\"Read scroll\" onclick=\"readscroll()\"></div>";
		$("#otheralerts").append(html);
		closemessage();
		$(".alert-chest-unlocked").fadeIn("fast");
	}
	else if(param=="vs-castle-guard"){
		$(".buttons-"+id).hide();
		setTimeout(function(){
			closemessage();
			castlegotohall(myfinalhp);
		},2000);
	}
	else if(param=="vs-castle-staff"){
		$(".buttons-"+id).hide();
		setTimeout(function(){
			closemessage();
			castlegotoking(myfinalhp);
		},2000);
	}
	else if(param=="vs-castle-boss"){
		closemessage();
		if(beatboss) {
			makealert("castle-beated","Yay!","You have defeated the boss again! The cubes, however, are absent.",true);
		}
		else {
			makealert("castle-beated","Yay!","You have defeated the boss, and you have found 14 conveniently-shaped obsidian cubes!",true);
			beatboss=true;
			items[9].owned=14;
		}
	}
	else if(param.slice(0,14)=="in-the-nether-"){
		$(".buttons-"+id).hide();
		param=param.replace('in-the-nether-','');
		param++;
		setTimeout(function(){
			enterportal(param,myfinalhp);
		},2000);
	}
	else if(param=="vs-devil"){
		closemessage();
		items[10].owned+=1;
		makealert("get-lava-bucket","End of the Nether","You managed to get to the end of the nether, and you got 1 lava bucket.",true);
	}
	else if(param=="vs-invisible-bot"){
		if(defeatinvisiblebot) {
			makealert("no-more-items","No More Items :(","Sorry, I have no more items to give you :(",true);
		}
		else {
			defeatinvisiblebot=true;
			makealert("defeat-invisible","Congratulations!","Wow - I didn't expect you to actually do it! Well then, have some of my items, as promised!<br>I also have this really cool shiny sword - I hope this can be useful to you!<br>Good luck out there!",true);
			items[21].owned=1;
			items[22].owned=1;
			currentsword="Emerald Sword";
			goldbar+=10000;
			ironbar+=10000;
			for(i=11;i<=15;i++) {
				items[i].owned+=randomnumber(1,5);
			}
		}
	}
	else if(param=="vs-fox"){
scroll='\n\
   _______________________\n\
 =(__    ___      __     _)=\n\
   |                     |\n\
   |  The password is:   |\n\
   | Ring-ding-ding-ding |\n\
   |  -dingeringeding!   |\n\
   |                     |\n\
 =(_______________________)=\n\
';
		makealert("fox-scroll","A Scroll!","The fox dropped a scroll:<br><br><pre>"+scroll+"</pre>",true);
	}
	else if(param=="vs-boss"){
		win=true;
		$(".buttons-"+id).hide();
		$(".enemy-"+id+"-hp").html('1');
		setTimeout(function(){
			makealert("boss-win","Almost!","<div style='max-height:300px; overflow-y:auto;'>Just when you thought it was all over...<br>...the guy managed to get away.<br><br><br><br><br><br>But...<br><br><br><br>You have learned something...<br><br><br><br><br><br><br><br>Revenge won't solve any of your problems.<br><br><br><br><br><br><br><br>You have to acknowledge them and talk to others.<br><br><br><br><br><br><br><br>And since killing him won't solve the problem...<br><br><br><br><br><br><br><br>You choose to talk to the guy, instead.<br><br><br><br>It seems it was all just a big misunderstanding.<br><br><br><br>He wants to help you return back to the real world...<br><br><br><br>But, you chose to stay in this 'weird' world.<br><br><br><br>After all, you have done so many things here...<br><br><br><br>So, you learned to love this world.<br><br><br><br>You don't even think about going back anymore.<br><br><br><br><br><br><br><br>Oh, and by the way, he also left a very cool-looking chest for you! I wonder what's inside :o<br><br><br><br><input type='button' onclick='openthechestfromsomeone()' value='Open the chest'><br><br></div>",true);
			$(".button-close-window-boss-win").hide();
		},2000);
	}
	else if(param=="vs-rat"){
		closemessage();
		reward=enemyhealthpoint2(false,0);
		goldbar+=reward;
		if(!buyfactory){
			makealert("win-vs-rat","Goodbye, Rat!","You killed the rat, and your boss gave you "+reward+" gold bars!<br><br><input type='button' value=\"Kill more rats!\" onclick='battlevsrats()'>",true);
		}
		else{
			makealert("win-vs-rat","Goodbye, Rat!","You killed the rat, and you found it hoarding "+reward+" gold bars!<br><br><input type='button' value=\"Kill more rats!\" onclick='battlevsrats()'>",true);
		}
	}
	else if(param=="vs-shark"){
		closemessage();
		checkthings();
	}
	if(param!="vs-rat" && param!="training"){
		reward=enemyhealthpoint2(false,0);
		goldbar+=reward;
	}

}

/* DIGGING SYSTEM */

function dig(countdown,cheat) {
	if(items[1].owned>0 || cheat || digcountdown <= 100) {
		if(digstep==1 && shovelbroken==0 && !cheat) {
			shovelbroken++;
			items[1].owned--;
			makealert("shovel-broken","The shovel is broken :(","Oh snap, the shovel is broken!",true);
			return;
		}
		if(digstep==4 && shovelbroken==1 && !cheat) {
			shovelbroken++;
			items[1].owned--;
			makealert("shovel-broken","The shovel is broken :(","Oh snap, the shovel is broken! Again!",true);
			return;
		}
		if(countdown) {
			if(digcountdown==999999999) {
				digcountdown=5+digstep*5;
				closemessage();
				dig(true,false);
				digabcd=setInterval(function(){digcountdown--;},60000);
			}
			else {
				makealert("dig-countdown","Digging","You are currently digging.<br>Time left: <span class='digcd'>"+digcountdown+"</span> 	minute(s) remaining.<br>You can use extra shovels to dig faster!<br><br><input type='button' value='Use another shovel' onclick='hurrydig()' id='hurry-dig-button'>",true);
				checkthings();
			}
			return;
		}
		if(digstep==0) {
			digstep++;
			$(".digging").removeClass("hidden");
			$(".small-hole").css("left","775px");
			if(!cheat) { closemessage(); }
		}
		else if(digstep==1) {
			digstep++;
			$(".dig-get-chest").removeClass("hidden");
			$(".small-hole").css("left","992px");
			if(!cheat) { closemessage(); }
		}
		else if(digstep==2) {
			digstep++;
			$(".dig-pizzas").removeClass("hidden");
			$(".small-hole").css("left","1192px");
			if(!cheat) { closemessage(); }
		}
		else if(digstep==3) {
			digstep++;
			$(".dig-laptop").removeClass("hidden");
			$(".small-hole").css("left","1442px");
			$(".small-hole").css("width","50px");
			if(!cheat) { closemessage(); }
		}
		else if(digstep==4) {
			digstep++;
			$(".dig-sign").removeClass("hidden");
			$(".small-hole").css("left","1692px");
			$(".small-hole").css("width","50px");
			$(".small-hole").css("cursor","default");
			$(".small-hole").css("title","");
			if(!cheat) { closemessage(); }
		}
	}
	else {
		closemessage();
		makealert("no-shovel","No shovel?","It seems that you have no shovel. How, exactly, are you trying to dig?",true);
	}
}

function hurrydig()
{
	if(items[1].owned > 0) {
		items[1].owned--;
		digcountdown--;
		checkthings();
	}
}
/* POTIONS MAKING SYSTEM */

function updateitemlist() {
	$("#itemlist").html('');
	current=$("#itemlist").html();
	$("#itemlist").html(current+'<option value="goldbar">Gold bar ['+goldbar+']</option>');
	current=$("#itemlist").html();
	$("#itemlist").html(current+'<option value="ironbar">Iron bar ['+ironbar+']</option>');
	for(i=0;i<items.length;i++) {
		current=$("#itemlist").html();
		item=items[i];
		valid=true;
		for(j=0;j<swords.length;j++) {
			sword=swords[j];
			if(sword.name==item.name) {
				valid=false;
			}
		}
		if(item.owned!=0 && valid) {
			$("#itemlist").html(current+'<option value="'+i+'">'+item.name+' ['+item.owned+']</option>');
		}
	}
	//setTimeout(function(){updateitemlist();},100);
}
function thecauldron(act,id,quantity) {
	if(act=="make") {
		cauldron=[];
	}
	else if(act=="add") {
		cauldron.push({"id":id,"quantity":quantity});
	}
	else if(act=="show") {
		$("#goingtobemixed").html('');
		for(i=0;i<cauldron.length;i++) {
			thehtml=$("#goingtobemixed").html();
			now=cauldron[i];
			if(now.id=="goldbar") {
				$("#goingtobemixed").html(thehtml+"<br>"+now.quantity+" gold bar(s)");
			}
			else if(now.id=="ironbar") {
				$("#goingtobemixed").html(thehtml+"<br>"+now.quantity+" iron bar(s)");
			}
			else {
				$("#goingtobemixed").html(thehtml+"<br>"+now.quantity+" "+items[now.id].name+"(s)");
			}
		}
	}
	else if(act=="return") {
		return cauldron;
	}
}
function putitem() {
	quantity=$("#quantity").val();
	theitem=$("#itemlist").val();
	if(!isNaN(parseFloat(quantity)) && parseFloat(quantity) != "") {
		quantity=Math.abs(Math.round(parseFloat(quantity)));
		if(theitem=="goldbar") {
			if(quantity>goldbar) {
				quantity=goldbar;
			}
			goldbar-=quantity;
		}
		else if(theitem=="ironbar") {
			if(quantity>ironbar) {
				quantity=ironbar;
			}
			ironbar-=quantity;
		}
		else {
			item=items[theitem];
			if(quantity>item.owned) {
				quantity=item.owned;
			}
			item.owned-=quantity;
		}
		thecauldron("add",theitem,quantity);
		thecauldron("show",0,0);
		updateitemlist();
	}
}

// Just some random comment's brother :)

function mixitems() {
	cldr=thecauldron("return",0,0);
	if(cldr[0]!=null && cldr[1]!=null && cldr[0].id==7 && cldr[0].quantity % 1 == 0 && cldr[1].id=="goldbar" && cldr[1].quantity % 100 == 0) {
		if((cldr[1].quantity/100) == (cldr[0].quantity/1)) {
			alert('You made '+(cldr[1].quantity/100)+' empty potion(s)!');
			items[11].owned+=cldr[1].quantity/100;
		}
		else {
			alert('To make multiple potions, please make sure to multiply ALL ingredients needed');
		}
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[2]!=null && cldr[0].id==11 && cldr[0].quantity % 1 ==0 && cldr[1].id==7 && cldr[1].quantity % 1 ==0 && cldr[2].id=="ironbar" && cldr[2].quantity % 100 == 0) {
		if((cldr[2].quantity/100) == (cldr[0].quantity/1) && (cldr[0].quantity/1) == (cldr[1].quantity/1)) {
			alert('You made '+cldr[2].quantity/100+' poison potion(s)!');
			items[12].owned+=cldr[2].quantity/100;
		}
		else {
			alert('To make multiple potions, please make sure to multiply ALL ingredients needed');
		}
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[0].id==12 && cldr[0].quantity%1==0 && cldr[1].id=="goldbar" && cldr[1].quantity%200==0) {
		if(cldr[0].quantity/1 == cldr[1].quantity/200) {
			alert('You made '+cldr[1].quantity/200+' confusion potion(s)!');
			items[13].owned+=cldr[1].quantity/200;
		}
		else {
			alert('To make multiple potions, please make sure to multiply ALL ingredients needed');
		}
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[0].id==11 && cldr[0].quantity%1==0 && cldr[1].id=="ironbar" && cldr[1].quantity%500==0) {
		if(cldr[1].quantity/500 == cldr[0].quantity/1) {
			alert('You made '+cldr[1].quantity/500+' invisibility potion(s)!');
			items[14].owned+=cldr[1].quantity/500;
		}
		else {
			alert('To make multiple potions, please make sure to multiply ALL ingredients needed');
		}
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[2]!=null && cldr[0].id==11 && cldr[0].quantity%1==0 && cldr[1].id==19 && cldr[1].quantity%20==0 && cldr[2].id=="goldbar" && cldr[2].quantity%2000==0) {
		if(cldr[2].quantity/2000 == cldr[1].quantity/20 && cldr[1].quantity/20 == cldr[0].quantity/1) {
			alert('You made '+cldr[2].quantity/2000+' instant countdown potion(s)!');
			items[15].owned+=cldr[2].quantity/2000;
		}
		else {
			alert('To make multiple potions, please make sure to multiply ALL ingredients needed');
		}
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[2]!=null && cldr[3]!=null && cldr[4]!=null && cldr[5]!=null && cldr[6]!=null && cldr[7]!=null && cldr[8]!=null && cldr[0].id==11 && cldr[0].quantity==1 && cldr[1].id==12 && cldr[1].quantity==1 && cldr[2].id==13 && cldr[2].quantity==1 && cldr[3].id==14 && cldr[3].quantity==1 && cldr[4].id==15 && cldr[4].quantity==1 && cldr[5].id==16 && cldr[5].quantity==1 && cldr[6].id==17 && cldr[6].quantity==1 && cldr[7].id=="goldbar" && cldr[7].quantity==100000 && cldr[8].id=="ironbar" && cldr[8].quantity==100000) {
		alert('You made an X potion :o');
		items[18].owned++;
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[2]!=null && cldr[0].id==11 && cldr[0].quantity%1==0 && cldr[1].id==12 && cldr[1].quantity%1==0 && cldr[2].id==13 && cldr[2].quantity%1==0) {
		if(cldr[0].quantity/1 == cldr[1].quantity/1 && cldr[1].quantity/1 == cldr[2].quantity/1) {
			alert('You made '+cldr[2].quantity/1+' gambler\'s potion(s)!');
			items[16].owned+=cldr[2].quantity/1;
		}
		else {
			alert('To make multiple potions, please make sure to multiply ALL ingredients needed');
		}
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[0].id==11 && cldr[0].quantity%1==0 && cldr[1].id==19 && cldr[1].quantity%500==0) {
		if(cldr[1].quantity/500 == cldr[0].quantity/1) {
			alert('You made '+cldr[1].quantity/500+' cookie potion(s)!');
			items[17].owned+=cldr[1].quantity/500;
		}
		else {
			alert('To make multiple potions, please make sure to multiply ALL ingredients needed');
		}
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[2]!=null && cldr[0].id=="goldbar" && cldr[0].quantity==1 && cldr[1].id=="ironbar" && cldr[1].quantity==1 && cldr[2].id==7 && cldr[2].quantity==1) {
		alert('You made a secret potion!');

		/*
			This potion is made specially for you
			Yeah, you, the one who is reading this text
		*/

		items[20].owned++;
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[2]!=null && cldr[0].id==10 && cldr[0].quantity==1 && cldr[1].id==18 && cldr[1].quantity==1 && cldr[2].id=="ironbar" && cldr[2].quantity==1000) {
		if(items[25].owned==0) {
			alert('You made a magical iron smelter!\nBut now, you need a place to put it...');
			items[25].owned+=1;
		}
		else {
			alert('You can\'t make more than one magical iron smelter!');
		}
	}
	else if(cldr[0]!=null && cldr[0].id=="ironbar" && cldr[0].quantity%10==0) {
		alert('You made '+cldr[0].quantity/10+' shuriken(s)!');
		items[26].owned+=cldr[0].quantity/10;
	}
	else {
		alert('You made nothing, please make sure you put the items in order!');
	}
	thecauldron("make",0,0);
	thecauldron("show",0,0);
	updateitemlist();
}

function makebosshappy() {
	closemessage();
	makealert("how-to-make-boss-happy","Make your boss happier","To make him happier and get some extra gold bars, you can do these things:<br><br><input type='button' value='Kill some rats that sometimes enter the factory at night' onclick='killrats()'><br><input type='button' value='Help him decipher messages' onclick='ciphercode()'>",true);
}
function killrats() {
	if(items[2].owned==0) {
		closemessage();
		makealert("no-weapon","No weapon?","Oh snap! It seems that you don't have a weapon, so you can't really kill the rats.",true);
	}
	else {
		closemessage();
		makealert("kill-rats","Kill some rats","Finding the rats is not a big deal - the problem is that these rats can fight back!<br><br><input type='button' value=\"I'm ready!\" onclick='battlevsrats()'>",true);
	}
}
function ciphercode() {

	closemessage();

	if(cipherstep==0) {
		codetocipher="13-1-19-20-5-18 2-18-1-14-3-8";
	}
	else if(cipherstep==1) {
		codetocipher="Lzwjw ak s ljwskmjw zavvwf kgewozwjw, al ak dguslwv sl s kwujwl hdsuw af lzw Hsuaxau Guwsf";
	}
	else if(cipherstep==2) {
		codetocipher=".-. . --. .. .-.. -.. . -..";
	}
	else if(cipherstep==3) {
		codetocipher="Om s ept;f gi;; pg n;pvld";
	}
	else if(cipherstep==4) {
		codetocipher="⠞⠓⠑⠀⠕⠞⠓⠑⠗⠀⠅⠊⠝⠙⠀⠕⠋⠀⠙⠕⠞⠎";
	}
	else if(cipherstep==5) {
		codetocipher="VGhlIHBsYW50IGlzIGZhbW91cyBiZWNhdXNlIG9mIHR<br>oZSBhYmlsaXR5IHRvIGN1cmUgc29tZSBkaXNlYXNlcw==";
	}
	else if(cipherstep==6) {
		codetocipher="43 24 33 33 15 43 31 34 43 13 23 15 33";
	}
	else if(cipherstep==7) {
		codetocipher="towiiag g se&nbsp;&nbsp;&nbsp;rir,oaoan&nbsp;&nbsp;&nbsp;ft ofo srtod tddyi ot mdy lugelelmwon foemsthiuaa ttclntclga&nbsp;&nbsp;bhhs";
	}
	else if(cipherstep==8) {
		codetocipher="Li4uLiAuLS0tIC4uLiAuLi0gLi0uLiAuLSAuLi0gLi0tIC8gLiAuLi4gLS4<br>tLiAuLS0gLS4tIC8gLi4uLiAuLS0gLi0tLSAtLi4tIC4tLSAuLi0gLi0uLg==";
	}
	if(cipherstep<9) {
		makealert("help-ciphering","Decipher some messages","Your boss loves cryptography, but he isn't very good at it. If you can help him, he promises to give you extra gold bars as a reward!<br><br>Code #"+(cipherstep+1)+":<br>"+codetocipher+"<br><input type='text' id='cipherthecodeanswer'><br><br><input type='button' value='Submit' onclick='checkchipher()'>",true);
	}
	else {
		makealert("no-more-codes","No more codes!","There are no more messages to decipher!",true);
	}
}
function battlevsrats() {
	if(items[2].owned!=0) {
		powerhp();
		hpdivide=Math.ceil(hp/4.5);
		battle=makebattle(battleid,"A Rat",hp-hpdivide,hp-hpdivide,"Their body",power-Math.ceil(power/2.5),"An annoying rat.",11,power,hp,hp,currentsword,false,"vs-rat");
		html="<div class=\"alert alert-battle-rats\"><b>Rat!</b><br>Kill it!!<br><br>"+battle.html+"</div>";
		$("#otheralerts").append(html);
		battle.init();
		closemessage();
		$(".alert-battle-rats:last").fadeIn("fast");
	}
}
function checkchipher() {

	/*

		Don't cheat please!!!
		PLEASE!!!

	*/

	if(cipherstep==0) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="master branch") {
			cipherstep++;
			goldbar+=100;
			closemessage();
			alert("Correct! Since this is an easy one, you only get 100 gold bars.");
		}
		else {
			alert('Wrong! Hint: ABC, Its easy as 123!');
		}
	}
	else if(cipherstep==1) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="there is a treasure hidden somewhere, it is located at a secret place in the pacific ocean") {
			cipherstep++;
			goldbar+=250;
			closemessage();
			alert("Correct! You get 250 gold bars!");
		}
		else {
			alert('Wrong! Hint: The Romans would be furious with you!');
		}
	}
	else if(cipherstep==2) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="regilded") {
			cipherstep++;
			items[7].owned += 5;
			closemessage();
			alert("Correct! You get 5 health potions!");
		}
		else {
			alert('Wrong! Hint: Save Our Souls');
		}
	}
	else if(cipherstep==3) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="in a world full of blocks") {
			cipherstep++;
			goldbar+=500;
			closemessage();
			alert("Correct! You get 500 gold bars!");
		}
		else {
			alert('Wrong! Hint: You use this to type!');
		}
	}
	else if(cipherstep==4) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="the other kind of dots") {
			cipherstep++;
			ironbar+=50;
			closemessage();
			alert("Correct! You get 50 iron bars!");
		}
		else {
			alert('Wrong! Hint: Who even needs to see, anyway?');
		}
	}
	else if(cipherstep==5) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="the plant is famous because of the ability to cure some diseases") {
			cipherstep++;
			goldbar+=750;
			closemessage();
			alert("Correct! You get 750 gold bars!");
		}
		else {
			alert('Wrong! Hint: (8*4) - 16 + ((24/2) * 4)');
		}
	}
	else if(cipherstep==6) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="sinnesloschen") {
			cipherstep++;
			items[12].owned += 3;
			closemessage();
			alert("Correct! You get 3 poison potions! Use them wisely!");
		}
		else {
			alert('Wrong! Hint: Square coordinates');
		}
	}
	else if(cipherstep==7) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="the gold factory was built long time ago, and it is the most famous gold factory in the world") {
			cipherstep++;
			goldbar+=1000;
			closemessage();
			alert("Correct! Because this is a hard one, you get 1000 gold bars!");
		}
		else {
			alert('Wrong! Hint: You know the rails and the fence? Combine them and keep going!');
		}
	}
	else if(cipherstep==8) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="practice makes perfect") {
			cipherstep++;
			items[15].owned += 1;
			closemessage();
			alert("That's all, folks! You get an instant countdown potion - be careful with it!");
		}
		else {
			alert('Wrong! Hint: Use everything you\'ve learned! You\'ve got this!');
		}
	}
}

function calculateTotalPrice(currentMachines, machinesToBuy, divisor) {
    let totalPrice = 0;
    for (let i = 0; i < machinesToBuy; i++) {
        const price = 10 + Math.floor((currentMachines + i) * (currentMachines + i) / divisor);
        totalPrice += price;
    }
    return totalPrice;
}

function removeBattle(id)
{
	setTimeout(function(){document.getElementById("battle-"+id).remove();}, 2000);
	setTimeout(function(){document.querySelector(".buttons-"+id).remove();}, 2000);
}