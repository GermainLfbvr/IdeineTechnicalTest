export function verifyChild(checkBoxControl, which) {
    for (let i = 0; i < checkBoxControl.length; i++) {
        if (checkBoxControl[i].children.length !== 0) {
            verifyChild(checkBoxControl[i].children, which);
            checkBoxControl[i].checked[which] = checkBoxControl[i].children.every(value => value.checked[which]);
        }
    }
}

export function recursionCheckBoxControl(key, checkBoxControl, which) {
    for (let i = 0; i < checkBoxControl.length; i++) {
        if (key === checkBoxControl[i].key) {
            checkBoxControl[i].checked[which] = !checkBoxControl[i].checked[which];
            if (checkBoxControl[i].checked[which]) {
                checkChild(checkBoxControl[i].children, which);
            } else {
                uncheckChild(checkBoxControl[i].children, which);
            }
        } else {
            recursionCheckBoxControl(key, checkBoxControl[i].children, which);
        }
    }
    return null;
}

function checkChild(checkBoxControl, which) {
    for (let i = 0; i < checkBoxControl.length; i++) {
        checkChild(checkBoxControl[i].children, which);
    }
    checkBoxControl.map((check) => check.checked[which] = true);
}

function uncheckChild(checkBoxControl, which) {
    for (let i = 0; i < checkBoxControl.length; i++) {
        uncheckChild(checkBoxControl[i].children, which);
    }
    checkBoxControl.map((check) => check.checked[which] = false);
}

