export default {
	data() {
		return {
			entries: [],
			centry: {
				name: "",
				time: "",
				nums: ""
			}
		}
	},
	methods: {
		rankingSorter(firstKey, secondKey) {
			return function(a, b) {
				if (a[firstKey] > b[firstKey]) {
					return -1;
				} else if (a[firstKey] < b[firstKey]) {
					return 1;
				}
				else {
					if (a[secondKey] > b[secondKey]) {
						return 1;
					} else if (a[secondKey] < b[secondKey]) {
						return -1;
					} else {
						return 0;
					}
				}
			}
		},
		addEntry() {
			this.entries.push({name: this.centry.name, time: parseInt(this.centry.time), nums: parseInt(this.centry.nums)})
			this.centry = { name: "", time: "", nums: "" }
		}
	}
}
