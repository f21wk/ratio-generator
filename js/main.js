(() => {
    const DEFAULT_CSS_CODE = ``;
    const [INPUT_WIDHT, INPUT_HEIGHT] = document.querySelectorAll('.size input[type="number"]');
    const RESET_BUTTON = document.getElementById('js_reset');
    const INPUT_RATIO_LIST = document.querySelectorAll('input[name="ratio"]');
    const INPUT_BASE_SIZE_LIST = document.querySelectorAll('input[name="base-size"]');
    const $BOX = document.getElementById('js_aspect-box');
    const BOX_STYLE = $BOX.style;
    const $BOX_CSS_CODE = document.getElementById('js_aspect-code');
    let ratioState = "0";
    let baseSizeState = "0";

    const setDefaultAspectBoxStyle = () => {
        BOX_STYLE.width = `${INPUT_WIDHT.value}px`;
        BOX_STYLE.height = `${INPUT_HEIGHT.value}px`;
        BOX_STYLE.aspectRatio = `${INPUT_WIDHT.value} / ${INPUT_HEIGHT.value}`;
    }

    INPUT_WIDHT.addEventListener('input', () => {
        setAspectBoxStyle();
    })
    INPUT_HEIGHT.addEventListener('input', () => {
        setAspectBoxStyle();
    })
    RESET_BUTTON.addEventListener('click', () => {
        reset();
    })

    INPUT_RATIO_LIST.forEach(radio => {
        radio.addEventListener('change', () => {
            ratioState = radio.value;

            setAspectBoxStyle();
        })
    })

    INPUT_BASE_SIZE_LIST.forEach(radio => {
        radio.addEventListener('change', () => {
            baseSizeState = radio.value;
            INPUT_WIDHT.disabled = false;
            INPUT_HEIGHT.disabled = false;

            switch (baseSizeState) {
                case "0":
                    INPUT_RATIO_LIST.forEach(radio => {
                        radio.disabled = true;
                    })
                    break;
                case "1":
                    INPUT_HEIGHT.disabled = true;
                    break;
                case "2":
                    INPUT_WIDHT.disabled = true;
                    break;
            }


            if (baseSizeState != "0") {
                INPUT_RATIO_LIST.forEach(radio => {
                    radio.disabled = false;
                })
            }

            setAspectBoxStyle();
        })
    })

    const setAspectBoxStyle = () => {
        setDefaultAspectBoxStyle();

        if (baseSizeState !== "0") {
            if (baseSizeState === "1") {
                BOX_STYLE.height = "auto";
            } else if (baseSizeState === "2") {
                BOX_STYLE.width = `auto`;
            }

            switch (ratioState) {
                case "0":
                    setAspectRatio(1, 2);
                    break;
                case "1":
                    setAspectRatio(1, 1.414);
                    break;
                case "2":
                    setAspectRatio(1, 1.618);
                    break;
            }
        }

        setShowCSSCode();
    }

    const setAspectRatio = (ratio_w, ratio_h) => {
        if (baseSizeState === "1") {
            BOX_STYLE.aspectRatio = `${ratio_h} / ${ratio_w}`;
        } else if (baseSizeState === "2") {
            BOX_STYLE.aspectRatio = `${ratio_w} / ${ratio_h}`;
        }
    }

    const setShowCSSCode = () => {
        $BOX.innerText = `横幅 : ${$BOX.clientWidth}px 
                        高さ : ${$BOX.clientHeight}px`;
        $BOX_CSS_CODE.innerText = setCSSCodeText();
    }

    const setCSSCodeText = () => {
        return `width: ${BOX_STYLE.width};
            height: ${BOX_STYLE.height};
            aspect-ratio: ${BOX_STYLE.aspectRatio};`;
    }

    const init = () => {
        INPUT_WIDHT.disabled = false;
        INPUT_HEIGHT.disabled = false;

        INPUT_RATIO_LIST.forEach(radio => {
            radio.disabled = true;
        })

        setAspectBoxStyle();
    }

    const reset = () => {
        INPUT_WIDHT.value = "500";
        INPUT_HEIGHT.value = "300";
        INPUT_WIDHT.disabled = false;
        INPUT_HEIGHT.disabled = false;

        INPUT_RATIO_LIST.forEach(radio => {
            radio.disabled = true;
        })

        INPUT_RATIO_LIST[0].checked = true;
        ratioState = "0";
        INPUT_BASE_SIZE_LIST[0].checked = true;
        baseSizeState = "0";

        setAspectBoxStyle();
    }

    init();
})()