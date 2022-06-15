export default {
	methods: {
		answer(ans) {
			this.show = !this.show;
			this.given_answers.push(ans);
			console.log(this.given_answers);
			if(ans == this.correct_answers[this.number]) {
				alert('Correct');
			} else {
				alert('Wrong');
			}
			// show results
			this.showa = !this.showa;
			var that = this;
			setTimeout(function() {
				that.number++;
				that.show = !this.show;
				that.showa = !this.showa;
			}, 1000);
		}
	},
	data() {
		return {
			number: 0,
			questions: [
				'Test1',
				'Test2',
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
				[ 'F2A1', 'F2A2', 'F2A3', 'F2A4' ],
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
			showa: 1
		}
	}
}
