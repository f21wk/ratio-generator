/**
 * アスペクトボックスのサイズを管理する関数
 */
(() => {
	/**
	 * 入力フィールドの幅と高さを取得
	 * @type {NodeListOf<HTMLInputElement>}
	 */
	const [inputWidth, inputHeight] = document.querySelectorAll('.size-list input');

	/**
	 * リセットボタン
	 * @type {HTMLButtonElement}
	 */
	const resetButton = document.getElementById('js_reset');

	/**
	 * アスペクト比の選択肢リスト
	 * @type {NodeListOf<HTMLInputElement>}
	 */
	const inputRatioList = document.querySelectorAll('.ratio-list input');

	/**
	 * 計算方法の選択肢リスト
	 * @type {NodeListOf<HTMLInputElement>}
	 */
	const inputBaseSizeList = document.querySelectorAll('.calculation-method-list input');

	/**
	 * アスペクトボックス要素
	 * @type {HTMLElement}
	 */
	const aspectBox = document.getElementById('js_aspect-box');

	/**
	 * アスペクトボックスのスタイル
	 * @type {CSSStyleDeclaration}
	 */
	const boxStyle = aspectBox.style;

	/**
	 * アスペクトボックスのCSSコード表示要素
	 * @type {HTMLElement}
	 */
	const boxCSSCode = document.getElementById('js_aspect-code');

	/**
	 * アスペクト比の状態
	 * @type {string}
	 */
	let ratioState = '0';

	/**
	 * ベースサイズの状態
	 * @type {string}
	 */
	let baseSizeState = '0';

	/**
	 * デフォルトのアスペクトボックスのスタイルを設定する
	 */
	const setDefaultAspectBoxStyle = () => {
		boxStyle.width = `${inputWidth.value}px`;
		boxStyle.height = `${inputHeight.value}px`;
		boxStyle.aspectRatio = `${inputWidth.value} / ${inputHeight.value}`;
	};

	/**
	 * アスペクトボックスのスタイルを設定するイベントリスナー（幅入力フィールド）
	 */
	inputWidth.addEventListener('input', () => {
		setAspectBoxStyle();
	});

	/**
	 * アスペクトボックスのスタイルを設定するイベントリスナー（高さ入力フィールド）
	 */
	inputHeight.addEventListener('input', () => {
		setAspectBoxStyle();
	});

	/**
	 * リセットボタンのクリックイベントリスナー
	 */
	resetButton.addEventListener('click', () => {
		reset();
	});

	/**
	 * アスペクト比の選択肢リストのイベントリスナーを設定する
	 */
	inputRatioList.forEach((radio) => {
		radio.addEventListener('change', () => {
			ratioState = radio.value;
			setAspectBoxStyle();
		});
	});

	/**
	 * ベースサイズの選択肢
	 * リストのイベントリスナーを設定する
	 */
	inputBaseSizeList.forEach((radio) => {
		radio.addEventListener('change', () => {
			baseSizeState = radio.value;
			inputWidth.disabled = false;
			inputHeight.disabled = false;
			switch (baseSizeState) {
				case '0':
					inputRatioList.forEach((radio) => {
						radio.disabled = true;
					});
					break;
				case '1':
					inputHeight.disabled = true;
					break;
				case '2':
					inputWidth.disabled = true;
					break;
			}

			if (baseSizeState != '0') {
				inputRatioList.forEach((radio) => {
					radio.disabled = false;
				});
			}

			setAspectBoxStyle();
		});
	});

	/**
	 * アスペクトボックスのスタイルを設定する
	 */
	const setAspectBoxStyle = () => {
		setDefaultAspectBoxStyle();
		if (baseSizeState !== '0') {
			if (baseSizeState === '1') {
				boxStyle.height = 'auto';
			} else if (baseSizeState === '2') {
				boxStyle.width = 'auto';
			}

			switch (ratioState) {
				case '0':
					setAspectRatio(1, 2);
					break;
				case '1':
					setAspectRatio(1, 1.414);
					break;
				case '2':
					setAspectRatio(1, 1.618);
					break;
			}
		}

		setShowCSSCode();
	};

	/**
	 * アスペクト比を設定する
	 * @param {number} ratio_w - 幅の比率
	 * @param {number} ratio_h - 高さの比率
	 */
	const setAspectRatio = (ratio_w, ratio_h) => {
		if (baseSizeState === '1') {
			boxStyle.aspectRatio = `${ratio_h} / ${ratio_w}`;
		} else if (baseSizeState === '2') {
			boxStyle.aspectRatio = `${ratio_w} / ${ratio_h}`;
		}
	};

	/**
	 * CSSコード表示を更新する
	 */
	const setShowCSSCode = () => {
		aspectBox.innerText = `横幅 : ${aspectBox.clientWidth}px
        高さ : ${aspectBox.clientHeight}px`;

		boxCSSCode.innerText = setCSSCodeText();
	};

	/**
	 * CSSコードテキストを生成する
	 * @returns {string} - 生成されたCSSコードテキスト
	 */
	const setCSSCodeText = () => {
		return `width: ${boxStyle.width};
        height: ${boxStyle.height};
        aspect-ratio: ${boxStyle.aspectRatio};`;
	};

	/**
	 * 初期化関数
	 */
	const init = () => {
		inputWidth.disabled = false;
		inputHeight.disabled = false;

		inputRatioList.forEach((radio) => {
			radio.disabled = true;
		});

		setAspectBoxStyle();
	};

	/**
	 * リセット関数
	 */
	const reset = () => {
		inputWidth.value = '300';
		inputHeight.value = '300';
		inputWidth.disabled = false;
		inputHeight.disabled = false;
		inputRatioList.forEach((radio) => {
			radio.disabled = true;
		});

		inputRatioList[0].checked = true;
		ratioState = '0';
		inputBaseSizeList[0].checked = true;
		baseSizeState = '0';

		setAspectBoxStyle();
	};

	init();
})();
