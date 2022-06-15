export default {
	methods: {
		answer(ans) {
			this.show = !this.show;
			this.given_answers.push(ans);
			console.log(this.given_answers);
			/*if(ans == this.correct_answers[this.number]) {
				alert('Correct');
			} else {
				alert('Wrong');
			}*/
			// show results
			this.showa = !this.showa;
			var that = this;
			if(this.number >= this.questions.length-1) {
				window.open("../results?1="+this.given_answers[0]+"&2="+this.given_answers[1]+"&3="+this.given_answers[2]+"&4="+this.given_answers[3]+"&5="+this.given_answers[4]+"&6="+this.given_answers[5]+"&7="+this.given_answers[6]+"&8="+this.given_answers[7]+"&9="+this.given_answers[8]+"","_self");
			}
			setTimeout(function() {
				that.number++;
				that.show = !this.show;
				that.showa = !this.showa;
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
			show: 1,
			showa: 1,
			showb: 0
		}
	}
}
