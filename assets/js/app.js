export default {
	methods: {
		answer(ans) {
			if(!this.show_next_button) {
				var answer_id = "abcd".indexOf(ans);
				var correct_answer_id = "abcd".indexOf(this.correct_answers[this.number])	;
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

			if(this.number >= this.questions.length-1) {
				window.open("../results?1="+this.given_answers[0]+"&2="+this.given_answers[1]+"&3="+this.given_answers[2]+"&4="+this.given_answers[3]+"&5="+this.given_answers[4]+"&6="+this.given_answers[5]+"&7="+this.given_answers[6]+"&8="+this.given_answers[7]+"&9="+this.given_answers[8]+"","_self");
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
		getUrlVars() {
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			this.vars = vars;
		},
		get_results() {
			var rlytrue = 0;
			
			var maxval = this.vars.length-1;

			var a = 0;
			var b = 0;
			var c = 0;
			var d = 0;
			
			var trueslist = []
			for(var i = 0; i <= maxval; i++){
				if (this.vars[i+1] == this.correct_answers[i]) {
					trueslist.push(1);
					rlytrue++;
				} else {
					trueslist.push(0);
				}
				if (this.vars[i+1] == "a") {
					a++;
				} else if (this.vars[i+1] == "b") {
					b++;
				} else if (this.vars[i+1] == "c") {
					c++;
				} else if (this.vars[i+1] == "d") {
					d++;
				}
			}

			var rlyfalse = maxval - rlytrue;

			this.results = [ a,b,c,d,rlytrue,rlyfalse,trueslist,maxval ];
		}
	},
	created: function() {
		this.wait_loader();
		this.getUrlVars();
		this.get_results();
	},
	data() {
		return {
			number: 0,
			questions: [
				'Was ist das beliebteste Soziale Medium der Jugendlichen Deutschen?',
				'Ab welchem Alter darf man offiziell WhatsApp nutzen?',
				'Für welche Summe hat Facebook Whatsapp 2014 gekauft?',
				'Wie nennt man die bei Messengern übliche Verschlüsselungs-Methode?',
				'Welches Profilbild sollte man am ehesten verwenden?',
				'Wie viele Schüler sind prozentual von Cybermobbing betroffen?',
				'Was ist das optimalere Passwort?',
				'Was sollte man tun, wenn man von einem unbekannten\nangeschrieben wird?',
				'Welche Daten sollte man online Preisgeben?'
			],
			answers: [
				[ 'Facebook', 'WhatsApp', 'Tiktok', 'Instagram' ],
				[ '12 Jahre', '14 Jahre', '16 Jahre', '18 Jahre' ],
				[ '14 Mio. €', '140 Mio. €', '1.4 Mrd. €', '14 Mrd. €' ],
				[ 'Ende-zu-Ende', 'SHA-256', 'argon2id', 'Cäsar-Verschlüsselung' ],
				[ 'Das Stadtschild seines Wohnortes', 'Ein Bild von sich selbst', 'Ein Foto der Schule', 'Einen süẞen Hamster' ],
				[ '6%', '10%', '21%', '42%' ],
				[ 'Passwort', 'Baum1234', 'MOgj7u9/0idK!', 'tmLtUkWfaJfkjhq6Xdyp' ], //Meine Oma geht jeden Sonntag um 9:00 in die Kirche!
				[ 'Direkt nachfragen', 'Persönlich fragen', 'Andere fragen, ob sie die Nummer kennen', 'Alles davon' ],
				[ 'Gar keine', 'Telefonnummer', 'Adresse', 'Den ganzen Namen' ]
			],
			correct_answers: [ 'b', 'c', 'd', 'a', 'd', 'c', 'c', 'd', 'a' ],
			given_answers: [],
			show: true,
			showq: true,
			showb: false,

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
			results: []
		}
	}
}
