const form = document.getElementById('form');
const passwordDisplay = document.getElementById('pw_generated');
const copyIcon = document.getElementById('copy_icon');
const copyMsg = document.getElementById('copy_msg');
const charLength = document.getElementById('char_length');
const range = document.querySelector('input[type="range"]');
const charLengthDisplay = document.getElementById('char_length_display');
const checkLabels = document.querySelectorAll('.label_for_check');
const strengthLevel = document.getElementById('strength_level');
const coloredLevel = document.querySelectorAll('.level');

const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '|', '\\', ':', ';', '"', '\'', '<', '>', ',', '.', '?', '/', '`', '~'];

const createCharsList = (data) => {
    const charMap = {
        'uppercase': uppercase,
        'lowercase': lowercase,
        'numbers': numbers,
        'symbols': symbols
    }
    const charsList = [];
    data.pw_params.forEach(param => {
        charsList.push(...charMap[param]);
    });
    return charsList;
}

const fetchData = (form) => {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key)=>{
        if(key === 'pw_params'){
            if(data[key]){
                data[key].push(value);
            }else{
                data[key] = [value];
            }
        }else{
            data[key] = value;
        }    
    })
    return data;
}

const generatePassword = (length, charsList) => {
    let password = '';
    
    // Generar la contraseña
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsList.length);
      password += charsList[randomIndex];
    }
    
    return password;
}

const copyToClipboard = (text, showMsg) =>{
    navigator.clipboard.writeText(text)
    .then(()=>{
        showMsg();
    })
    .catch(err => {
        console.error('Failed to copy text: ', err);
    })
}

const showCopiedMsg = () => {
    copyMsg.classList.add('show');
    setTimeout(() => {
        copyMsg.classList.remove('show');
    }, 1500);
}

const handleRangeColor = (e) => {
    const position = (e.target.value*100)/e.target.max;
    range.style.background = `linear-gradient(90deg, rgba(164,255,175,1) 0%, rgba(164,255,175,1) ${position}%, rgba(24,23,31,1) ${position}%)`;
}

const toggleCheck = (e) => {
    e.target.classList.toggle('checked');
}

const complexityLevel = (data, password) => {
    const isUppercase = uppercase.some(item => password.includes(item));
    const isLowercase = lowercase.some(item => password.includes(item));
    const isNumber = numbers.some(item => password.includes(item));
    const isSymbol = symbols.some(item => password.includes(item));
    
    const charType = [isUppercase, isLowercase, isNumber, isSymbol].filter(Boolean).length
    if(data.char_length < 6 || (charType === 1 && !isSymbol)){
        return "too_weak";
    }

    if((data.char_length >= 6 && data.char_length < 8) || (charType === 2 && !isSymbol)){
        return "weak";
    }

    if((data.char_length >= 8 && data.char_length < 12 && charType >= 3) || (data.char_length >= 12 && charType >= 3 && !isSymbol)){
        const symbolCount = [...password].filter(char => symbols.includes(char)).length;
        if(symbolCount <= 3){
            return "medium";
        }
    }
    return "strong";
}

const changeLevelLabel = (level) => {
    strengthLevel.textContent = level.toUpperCase();
}

const changeLevelColor = (strength_level) => {
    const colors = {
        'too_weak': 'var(--red)',
        'weak': 'var(--orange)',
        'medium': 'var(--yellow)',
        'strong': 'var(--neon-green)'
    }
    const levels = ['too_weak','weak','medium','strong'];
    const index = levels.indexOf(strength_level);

    coloredLevel.forEach((element, i)=>{
        element.classList.remove(...levels);
        if(i<=index){
            element.style.backgroundColor = colors[strength_level];
            element.style.borderColor = colors[strength_level];
        }
    })
}

range.addEventListener('input', (e)=>{
    handleRangeColor(e);
    charLengthDisplay.textContent = e.target.value;
});

copyIcon.addEventListener('click', (e) => {
    e.preventDefault();
    const text = pw_generated.value;

    if(text){
        copyToClipboard(text, showCopiedMsg)
    }
})

checkLabels.forEach((label)=>{
    label.addEventListener('click', (e)=>{
        toggleCheck(e);
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    pw_generated.value = '';
    const isChecked = document.querySelector("input[type='checkbox']:checked");
    const data = fetchData(form);
    if(data.char_length >=4){
        if(isChecked){
            const chars_list = createCharsList(data);
            // const regex_pattern = buildRegex(data);
            const result = generatePassword(data.char_length, chars_list);
            pw_generated.value = result;
            const strength_level = complexityLevel(data, result);
            changeLevelLabel(strength_level);
            changeLevelColor(strength_level);
        }else{
            alert('You must select at least one type of character to be included in the generated password.');
        }
    }else{
        alert('Your Character Length must be more more than 4 characters.');
    }  
})
