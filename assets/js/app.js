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
				that.show = !this.show;
				that.showq = !this.showq;
			}, 1000);
		},
		wait_loader() {
			this.showb = 0;
			var that = this
			setTimeout(function() {
				that.showb = !that.showb;
			}, 1000);
		}
	},
	created: function() {
		this.wait_loader();
	},
	data() {
		return {
			number: 0,
			questions: [
				'Test1',
				'Eine etwas längere Frage, nur um zu sehen ob das auch klappt.',
				'Test3',
				'Test4',
				'Test5',
				'Test6',
				'Test7',
				'Test8',
				'Test9'
			],
			answers: [
				[ 'F1A1', 'F1A2', 'F1A3', 'F1A4' ],
				[ 'Eine', 'sehr lange', 'also ich meine wirklich sehr sehr sehr sehr sehr lange, so dass man vermuten könnte, sie würde nicht mehr draufpassen, so eine lange', 'Antwort' ],
				[ 'F3A1', 'F3A2', 'F3A3', 'F3A4' ],
				[ 'F4A1', 'F4A2', 'F4A3', 'F4A4' ],
				[ 'F5A1', 'F5A2', 'F5A3', 'F5A4' ],
				[ 'F6A1', 'F6A2', 'F6A3', 'F6A4' ],
				[ 'F7A1', 'F7A2', 'F7A3', 'F7A4' ],
				[ 'F8A1', 'F8A2', 'F8A3', 'F8A4' ],
				[ 'F9A1', 'F9A2', 'F9A3', 'F9A4' ]
			],
			correct_answers: [ 'a', 'b', 'a', 'c', 'd', 'b', 'c', 'a', 'd' ],
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
			wrong_banner: false
		}
	}
}
