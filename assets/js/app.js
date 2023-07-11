export default {
	methods: {
		answer(ans) {
			if(!this.show_next_button) {
				var answer_id = "abcd".indexOf(ans);
				var correct_answer_id = "abcd".indexOf(this.correct_answers[this.question_order[this.number]]);
				if(answer_id == correct_answer_id) {
					this.correct_banner = true;
					switch(answer_id) {
						case 0:
							this.a_correct = true;
							this.a_cw = true;
							break;
						case 1:
							this.b_correct = true;
							this.b_cw = true;
							break;
						case 2:
							this.c_correct = true;
							this.c_cw = true;
							break;
						case 3:
							this.d_correct = true;
							this.d_cw = true;
							break;		
					}

				} else {
					this.wrong_banner = true;
					switch(correct_answer_id) {
						case 0:
							this.a_correct = true;
							this.a_cw = true;
							break;
						case 1:
							this.b_correct = true;
							this.b_cw = true;
							break;
						case 2:
							this.c_correct = true;
							this.c_cw = true;
							break;
						case 3:
							this.d_correct = true;
							this.d_cw = true;
							break;		
					}
					switch(answer_id) {
						case 0:
							this.a_wrong = true;
							this.a_cw = true;
							break;
						case 1:
							this.b_wrong = true;
							this.b_cw = true;
							break;
						case 2:
							this.c_wrong = true;
							this.c_cw = true;
							break;
						case 3:
							this.d_wrong = true;
							this.d_cw = true;
							break;		
					}
				}
				this.show = false;
				this.given_answers.push(ans);
				console.log(this.given_answers);
				this.show_next_button = true;
				var that = this;
				setTimeout(function() {
					that.correct_banner = false;
					that.wrong_banner = false;
				}, 1500);
			}
		},
		next_question() {
			this.a_cw = false;
			this.b_cw = false;
			this.c_cw = false;
			this.d_cw = false;
			this.show_next_button = false;

			this.showq = false;

			if(this.number >= this.question_order.length-1) {
				var link = "../r/?s=";
				link += window.location.href.slice(window.location.href.indexOf('?s=') + 3);
				for(let i = 0; i < this.question_order.length; i++) {
					link += "&";
					link += this.question_order[i];
					link += "=";
					link += this.given_answers[i];
				}
				var nowtime = Date.now();
				link += "&time="+(nowtime-this.time)/1000;
				window.open(link,"_self");
			}

			var that = this;
			setTimeout(function() {
				that.a_correct = false;
				that.a_wrong = false;
				that.b_correct = false;
				that.b_wrong = false;
				that.c_correct = false;
				that.c_wrong = false;
				that.d_correct = false;
				that.d_wrong = false;

				that.number++;
				that.show = true;
				that.showq = true;
			}, 1000);
		},
		wait_loader() {
			this.showb = 0;
			var that = this
			setTimeout(function() {
				that.showb = true;
			}, 1000);
		},
		get_results() {
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('&') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[1]);
			}
			this.vars = vars;

			var rlytrue = 0;
			
			var maxval = this.vars.length-1;

			var a = 0;
			var b = 0;
			var c = 0;
			var d = 0;
			
			var trueslist = []
			for(var i = 0; i < maxval; i++){
				if (this.vars[i] == this.correct_answers[this.question_order[i]]) {
					trueslist.push(1);
					rlytrue++;
				} else {
					trueslist.push(0);
				}
				switch(this.vars[i]) {
					case "a":
						a++;
						break;
					case "b":
						b++;
						break;
					case "c":
						c++;
						break;
					case "d":
						d++;
						break;
				}
			}

			var rlyfalse = maxval - rlytrue;

			this.results = [ a,b,c,d,rlytrue,rlyfalse,trueslist,maxval ];
		},
		load_order() {
			var numbers = window.location.href.slice(window.location.href.indexOf('?s=') + 3).split("&")[0];
			var ar = [];
			for(let i = 0; i < numbers.length; i++) {
				ar.push("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(numbers[i]));
			}
			this.question_order = ar;
		},
		load_got_seed() {
			if(window.location.href.search("/?ns=") != -1) {
				var got_seed = window.location.href.slice(window.location.href.indexOf('?ns=') + 4).split("&")[0];
				this.got_seed = got_seed;
			}
		},
		save_time() {
			this.time = Date.now();
			if(window.location.href.search("&time=") != -1) {
				this.time = window.location.href.slice(window.location.href.indexOf('&time=') + 6).split("&")[0];
			}
		}
	},
	created: function() {
		this.load_order();
		//this.wait_loader();
		this.get_results();
		this.load_got_seed();
		this.save_time();
	},
	data() {
		return {
			/* das hier kann man ändern */
			questions: [
				"Wie heißt das ehemals als „Twitter, Inc.“ bekannte Unternehmen seit März 2023?", 
				"Wer war der „Erfinder“ von Android?", 
				"Wer ist der „Erfinder“ von Blender?", 
				"Wer hat im Oktober 2022 Twitter aufgekauft?", 
				"Wer hat WhatsApp gegründet?", 
				"Wer hat das „Zen of Python“ verfasst?", 
				"Was ist der meist gelikete Post auf Instagram?", 
				"Wer hat die meisten Follower auf Tiktok?", 
				"Was ist Satire?", 
				"Meine Accounts sind besonders sicher, wenn..?", 
				"Welche Abkürzung steht für die Angst, etwas zu verpassen?", 
				"Wann sind Informationen aus dem Internet vertrauenswürdig? Wenn..?", 
				"Was ist das sogenannte „Phantom-Vibrations-Syndrom“?", 
				"Was ist der Unterschied zwischen der USK und der PEGI?", 
				"Was ist „Funk“ auf YouTube und Co.?", 
				"Im Zuge welches Ereignisses wurde der Begriff „Fake News“ häufiger erwähnt?", 
				"Rooten und Jailbreak – Was ist das?", 
				"Mich hat eine unbekannte Nummer angerufen, also..?", 
				"Der Begriff „Social Engineering“ beschreibt..?", 
				"Ich möchte mein altes Handy verkaufen. Daher werde ich..?", 
				"Unter dem Begriff „Doomscrolling“ versteht man..?", 
				"Was ist „Cybergrooming”?", 
				"Die Netiquette ist..?", 
				"Woran erkenne ich eine sichere Webseite?", 
				"Was versteht man unter Clickbait?", 
				"Was sollte man mit Kettenbriefen tun?", 
				"Wie viel Prozent der 12- bis 19-Jährigen besitzen laut JIM-Studie 2019 ein eigenes Smartphone?", 
				"Was hilft langfristig nicht dabei, ein gutes Maß für die Smartphone-Nutzung zu finden?", 
				"Welche Intention steckt meist hinter Fake News?", 
				"Was ist KEINE Anlaufstelle für den Jugendschutz in Internet?", 
				"Welches Kriterium ist für gute Nachrichten NICHT wichtig?", 
				"Was sollten Nutzer*innen tun, wenn sie einen Beitrag als Fake News identifiziert haben?", 
				"Wobei helfen gute Jugendschutz-Apps?", 
				"Worüber verbreiten sich Fake News am schnellsten?", 
				"Was ist das beliebteste Soziale Medium der Deutschen Jugendlichen?", 
				"Ab welchem Alter darf man WhatsApp offiziell nutzen?", 
				"Für welche Summe hat Facebook Whatsapp 2014 gekauft?", 
				"Wie nennt man die bei Messengern übliche Verschlüsselungs-Methode?", 
				"Welches Profilbild sollte man in Sozialen Medien am ehesten verwenden?", 
				"Wie viel Prozent der deutschen Jugendlichen (12-19 J.) geben an, dass bereits falsche oder beleidigende Dinge über sie im Internet verbreitet wurden?", 
				"Was ist das sicherste Passwort?", 
				"Was ist Discord?", 
				"Wie viel verdient Mark Zuckerberg pro Tag?", 
				"Was ist LinkedIn?", 
				"Was bedeutet finsta?", 
				"Wer hat die meisten Follower auf Instagram?", 
				"Seit wann gibt es Instagram?", 
				"Wie heißt der Vorgänger von TikTok?", 
				"Wieviele Minuten verbringt ein durchschnittlicher deutscher Jugendlicher täglich online?", 
				"Wie wird eine Person genannt, die Fake News aus Vergnügen und für Aufmerksamkeit erstellt?", 
				"YouTube hat eine Plattform für Kinder. Wie heißt sie?", 
				"Wann kam das erste Handy auf den Markt?", 
				"Wie heißt eine von Donald Trump 2022 gegründete Social-Media-Plattform?", 
				"Wie nennt man ein gefälschtes Video von einer Person, das mithilfe künstlicher Intelligenz erstellt wurde?", 
				"Was ist ein Social Bot?", 
				"Welche Informationen sollten auf meinem Social-Media-Profil öffentlich sichtbar sein?", 
				"Was ist keine sicherere Alternative zu WhatsApp?", 
				"Was ist Hate Speech?"],
			answers: [
				["X Corp.", "Y Corp.", "XY Corp.", "Z Corp."], 
				["Hattie Abner", "Zack Milo", "Andrew Rubin", "Gerry Tristram"], 
				["Stephen Poplawski", "Ton Roosendaal", "Joseph Niepce", "Ibn al-Haytham"], 
				["Mark Zuckerberg", "Donald Trump", "Bill Gates", "Elon Musk"], 
				["Ben Cum, John Cegtion", "Jan Koum, Brian Akton", "Elon Musk", "Mark Zuckerberg"], 
				["Mohammad Hurst", "Tim Peters", "Tracy Sutcliffe", "Rodney Bull"], 
				["Ein Bild von einem Ei", "Christian Ronaldo mit deinem Sohn", "Lionel Messi beim Feiern des Welttitels", "Kylie Jenner mit ihrer Tochter"], 
				["Die Elevator Boys", "Charli D'Amelio", "Khabane Lame", "Bella Poarch"], 
				["Die schlimmste Form von Fake news", "Die Wahrheit", "Falsche Aussagen, die auf Probleme Aufmerksam machen", "Nachrichten von einer großen Zeitung"], 
				["ich ein einfaches Passwort nutze, das ich mir aber gut merken kann.", "ich ein Passwort nutze, dass aus einem langen Wort und einer Zahl besteht.", "ich zusätzlich zum Passwort noch die Zwei-Faktor-Authentisierung nutze.", "ich ein Passwort nutze, dass aus einem langen Buchstabensalat besteht."], 
				["FOMO", "FTFY", "FWIW", "FYEO"], 
				["die Verfasser*innen über 18 Jahre alt sind.", "sie von meinen Freund*innen geteilt wurden.", "die Information aus einem Video stammt, denn diese lassen sich nicht fälschen oder manipulieren.", "die Information aktuell und auch auf anderen offiziellen Seiten zu finden ist sowie eine seriöse Quelle für den Inhalt angegeben ist."], 
				["Ein Anruf von einer unbekannten Nummer.", "Wenn ich mir einbilde, dass mein Handy geklingelt oder vibriert hat, obwohl das nicht der Fall war.", "Ein defekter Vibrationsmotor am Handy.", "Eine Funktion, mit der ich individuelle Vibrations-Muster für mein Handy einstellen kann."], 
				["Die USK legt Altersbeschränkungen für Videospiele in Deutschland fest. Die PEGI entscheidet, welche Spiele auf dem Index landen.", "Die USK legt Altersbeschränkungen für Videospiele fest, die PEGI für Filme.", "Die USK legt Altersbeschränkungen für Videospiele in Deutschland fest, die PEGI für Europa.", "Die Alterseinstufungen der USK geht nur bis 18 Jahre, die der PEGI bis 21."], 
				["das Unterhaltungs- und Bildungsprogramm der öffentlichen Rundfunkanstalten speziell für junge Menschen", "eine neue Tanzvideo-Challenge", "ein Dienst, mit dem man Privatnachrichten an andere Streamer schreiben kann", "eine Funktion, die dich über neue Videos deines Lieblings-Streamers informiert"], 
				["Wahl von Donald Trump zum US-Präsidenten", "9/11", "Erste Mondlandung", "Vietnamkrieg"], 
				["zwei coole free-to-play App-Games.", "das hat etwas mit den Zugriffsrechten zu tun", "Sicherheits-Apps für Android bzw. iOS.", "Drahtlosschnittstellen für Android bzw. iOS"], 
				["rufe ich sofort zurück.", "checke ich die Nummer über Google, bevor ich zurückrufe.", "checke ich die Nummer über Google, nachdem ich zurückgerufen habe.", "leite ich die Nummer an meine Freund*innen weiter. Vielleicht wissen sie, wer mich angerufen hat."], 
				["eine Multiplayer-Kategorie in Games.", "wie man leicht irgendwo einbrechen kann.", "z.B. Fake-Videos, die von Promis erstellt werden.", "z.B. Mails, in denen sich ein Absender als jemand ausgibt, der er nicht ist."], 
				["meine Daten einfach löschen.", "mein Handy auf Werkszustand zurücksetzen.", "alle Kontoverbindungen entfernen und es auf Werkszustand zurücksetzen.", "meine Daten auf einem Speichermedium sichern, alle Kontoverbindungen entfernen und es auf Werkszustand zurücksetzen."], 
				["eine Handverletzung, die durch übermäßiges Scrollen mit dem Daumen hervorgerufen wird.", "das Surfen im privaten Browser-Fenster.", "das Scrollen im Darknet.", "das endlose Scrollen durch negative Nachrichten und damit die übermäßige, zwanghafte Beschäftigung mit ihnen."], 
				["(meist) sexuell motivierte Kontaktanbahnung im Internet", "das Aufhalten im Darknet", "das Gleiche wie Cybermobbing", "intensive Pflege von Online-Bekanntschaften"], 
				["ein Internettrend aus Frankreich", "eine Internetcommunity", "eine Verhaltensrichtline im Internet", "ein Online-Kompliment"], 
				["sie fragt mich nicht nach Cookie-Einstellungen", "die Datenschutzerklärung garantiert, dass die Webseite sicher ist (diese Info finde ich meist beim Impressum)", "an einer sicheren Verschlüsselung (in der URL steht dann „https“ und ein kleines „Schloss“-Symbol wird abgebildet)", "die ersten Ergebnisse der Google-Suche sind die sichersten"], 
				["Das ist eine andere Bezeichnung für „Fake News“. Dahinter verbergen sich Falschmeldungen, die Aufmerksamkeit erregen sollen.", "Clickbait soll durch besonders reißerische Überschriften neugierig machen und zum Anklicken eines Posts oder eines Videos verleiten.", "Durch Clickbait sollen Daten von Besuchern einer Webseite abgefangen werden.", "Als Clickbait bezeichnet man den Button am Ende eines Artikels, der zum Teilen auf Social Media anregen soll."], 
				["einfach löschen", "weiterleiten, um andere zu warnen", "in anderen sozialen Netzwerken teilen", "ernst nehmen und befolgen"], 
				["75%", "93%", "53%", "84%"], 
				["Regeln für Bildschirmzeiten", "Gespräche über Smartphone-Nutzung", "Routinen in der Familie", "Strikte Verbote"], 
				["Likes und Follower gewinnen", "in der Journalismus-Branche Fuß fassen", "Verunsicherung stiften oder Stimmung gegen eine Sache machen", "gar keine Absicht"], 
				["Unterhaltungssoftware Selbstkontrolle (USK)", "Kommission für Jungendmedienschutz (KJM)", "Bundeszentrale für Kinder- und Jugendmedienschutz (BzKJ)", "Freiw. Selbstkontrolle Multimedia-Diensteanbieter (FSM)"], 
				["Sensationsgrad", "Objektivität", "Vollständigkeit", "Aktualität"], 
				["Ihn ignorieren und weiterscrollen", "Die Urheber kontaktieren", "Ihn bei den Plattformbetreibern melden", "Einen „Daumen nach unten“ geben"], 
				["Kontrolle von Postings und Surf-Verläufen", "Entwicklung von Medienkompetenz", "verringern Risiken bei der Gerätenutzung", "100 %ige Sicherheit von mobilen Geräten"], 
				["über Printmedien und Nachrichtenportale", "über Fernsehsender", "über soziale Netzwerke und Messenger", "über Face-to-Face-Kommunikation"], 
				["Facebook", "WhatsApp", "TikTok", "Instagram"], 
				["12 Jahre", "14 Jahre", "16 Jahre", "18 Jahre"], 
				["14 Mio. €", "140 Mio. €", "1.4 Mrd. €", "14 Mrd. €"], 
				["Ende-zu-Ende", "SHA-256", "argon2id", "Cäsar-Verschlüsselung"], 
				["Das Ortsschild seines Wohnortes", "Ein cooles Bild von sich selbst", "Ein Foto der Schule", "Einen süẞen Hamster"], 
				["6%", "10%", "21%", "42%"], 
				["Passwort", "Baum1234", "MOgj7u9/0idK!", "tmLtUkWfaJfkjhq6Xdyp"], 
				["ein Messenger", "ein Onlineshop", "ein Internetbrowser", "ein Kochbuch"], 
				["ca. 10 Mio. €", "ca. 30 Mio. €", "ca. 60 Mio. €", "ca. 150 Mio. €"], 
				["ein Messenger", "ein Onlineshop", "ein Internetbrowser", "ein Soziales Netzwerk für Geschäftskontakte"], 
				["fishy Insta(gram)", "a fail on Insta(gram)", "fake Insta(gram)", "Insta(gram) im Darknet"], 
				["Cristiano Ronaldo", "Instagram", "Justin Bieber", "Kylie Jenner"], 
				["Oktober 2010", "Januar 2009", "Dezember 2011", "August 2008"], 
				["TikTak", "Musiclaly", "Tok.Tok", "Musical.ly"], 
				["69", "124", "241", "394"], 
				["Troll", "Prankster", "Cyberbully", "NPC"], 
				["Kids-TV", "YouKids", "YouTube Kids", "Kids on YouTube"], 
				["März 1983", "Januar 1990", "September 2001", "Juni 1996"], 
				["Social Truth", "The Real Truth", "Truth Social", "Trump Social"], 
				["Fake News", "Fakevid", "VidPrank", "Deepfake"], 
				["Eine Person, die ständig online ist", "Ein Programm, das menschliches Verhalten in sozialen Medien simuliert", "Ein Programm, das alle meine Apps verwalten kann", "Eine Drohne, die coole Fotos machen kann"], 
				["Telefonnummer", "Adresse", "Vor- und Nachmame", "Gar keine"], 
				["Threema", "Wire", "Signal", "Facebook Messenger"], 
				["Videos von Wutanfällen auf YouTube", "Lästereien in Klassenchats", "Hassnachrichten, die sich gegen bestimmte Menschengruppen richten", "Falschnachrichten in Online-Foren"]
			],
			correct_answers: ["a", "c", "b", "d", "b", "b", "c", "c", "c", "c", "a", "d", "b", "c", "a", "a", "b", "b", "d", "d", "d", "a", "c", "c", "b", "a", "b", "d", "c", "a", "a", "c", "c", "c", "b", "c", "d", "a", "d", "c", "c", "a", "c", "d", "c", "b", "a", "d", "c", "a", "c", "a", "c", "d", "b", "d", "d", "c"],

			/* das hier sollte man in ruhe lassen */
			number: 0,
			given_answers: [],
			show: true,
			showq: true,
			showb: true,

			a_correct: false,
			b_correct: false,
			c_correct: false,
			d_correct: false,
			a_wrong: false,
			b_wrong: false,
			c_wrong: false,
			d_wrong: false,
			a_cw: false,
			b_cw: false,
			c_cw: false,
			d_cw: false,
			show_next_button: 0,
			correct_banner: false,
			wrong_banner: false,
			vars: [],
			results: [],
			spinner_template: '<div class="atom-spinner atom-scale"><div class="spinner-inner"><div class="spinner-line"></div><div class="spinner-line"></div><div class="spinner-line"></div><!--Chrome renders little circles malformed :(--><div class="spinner-circle">&#9679;</div></div></div>',
			question_order: [],
			bw: false,
			got_seed: "",
			time: 0
		}
	},
	computed: {
		vueWidthProg () {
			return {
				'--percent': 100*(this.number)/(this.question_order.length)+'%'
			}
		}
	}
}
