<template>
    <div id="app">
        ggg
        <p>testcui</p>
        <div @click="test">cccddd</div>
    </div>
</template>

<script>
import { afCui } from '@/list/common/test.js';
import '@/list/common/test.scss';
import axios from 'axios';

export default {
	name: 'app',
	methods: {
		test() {
			window.testHMR = 'yes';
		}
	},
	created() {
		afCui();
		window.created = 'true';
		axios.get('/filterData').then(Response => {
			console.log(Response);
		});
		axios.get('/test').then(Response => {
			console.log(Response);
		});
	}
};
</script>

<style lang="scss">
#app {
	display: flex;
	justify-content: center;
	background-color: rgb(255, 0, 221);
	.aaa {
		color: green;
	}
}
.aaa {
	color: rebeccapurple;
}
</style>
