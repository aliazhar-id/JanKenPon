document.body.oncontextmenu = () => { return false };
function getPilihanComputer() {
	const comp = Math.round(Math.random() * 8 + 1);

	const batu = [1, 4, 7];
	const gunting = [2, 5, 8];
	const kertas = [3, 6, 9];

	for (let i = 0; i <= 2; i++) {
		if (comp == batu[i]) return 'batu';
		if (comp == gunting[i]) return 'gunting';
		if (comp == kertas[i]) return 'kertas';
	}
}

function getHasil(comp, player) {
	if (player == comp) return 'DRAW';
	if (player == 'batu') return (comp == 'gunting') ? 'WIN' : 'LOSE';
	if (player == 'gunting') return (comp == 'kertas') ? 'WIN' : 'LOSE';
	return (comp == 'batu') ? 'WIN' : 'LOSE';
}

function putar() {
	const compImg = document.getElementById('comp-img');
	const playImg = document.getElementById('play-img');
	const gambar = ['gunting', 'batu', 'kertas'];
	let i = 0;
	let j = 2;
	const waktuMulai = new Date().getTime();
	const hasil = document.getElementById('hasil');
	hasil.innerHTML = '. . .';
	hasil.style.backgroundColor = 'yellow';
	setInterval(() => {
		if (new Date().getTime() - waktuMulai > 2000) {
			clearInterval;
			return;
		}
		compImg.setAttribute('src', `img/${gambar[i++]}.png`);
		if (i == gambar.length) i = 0;
		playImg.setAttribute('src', `img/${gambar[j--]}.png`);
		if (j == 0) j = 2;
	}, 100);
}

const pilihan = document.querySelectorAll('#play-area li img');
let pScore = 0;
let cScore = 0;

pilihan.forEach((x) => {
	x.addEventListener('click', () => {
		const pilihanComputer = getPilihanComputer();
		const pilihanPlayer = x.className;
		const playImg = document.querySelector('#play-img');
		const compImg = document.querySelector('#comp-img');


		const hasil = getHasil(pilihanComputer, pilihanPlayer);

		putar();

		setTimeout(() => {
			document.querySelector('#hasil').innerHTML = hasil;

			playImg.setAttribute('src', `img/${pilihanPlayer}.png`)
			compImg.setAttribute('src', `img/${pilihanComputer}.png`);

			if (hasil == 'WIN') {
				document.getElementById('hasil').style.backgroundColor = '#22F465';
				document.querySelector('#pScore p').innerHTML = pScore += 1;
			} else if (hasil == 'LOSE') {
				document.getElementById('hasil').style.backgroundColor = '#F42270';
				document.querySelector('#cScore p').innerHTML = cScore += 1;
			} else {
				document.getElementById('hasil').style.backgroundColor = '#888';
			}
		}, 2100);
	})
})