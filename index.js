const container = document.querySelector('#container'); 
const input = document.querySelector('.input');
const button = document.querySelector('.button');
const clearAllButton = document.querySelector('.clearAll');

function addNewWord() {
    const newDivRus = document.createElement('div');
    newDivRus.className = 'rus';
    newDivRus.innerText = input.value;

    const index = document.createElement('span');
    index.className = 'index';
    let allIndexes = document.querySelectorAll('.index')
    index.innerText = allIndexes.length + 1


    const deleteWord = document.createElement('span');
    deleteWord.className = 'delete'
    const icon = document.createElement('img')
    icon.className = 'icon'
    icon.src = "./icons/Group 1.svg"

    icon.addEventListener('click', () => {
        const elementRemove = newDivEn.parentNode
        elementRemove.remove()

        let allNumUpdate = document.querySelectorAll('.index')

        allNumUpdate.forEach((elem, index) => {
            elem.innerText = index + 1
        })
    })


    const newDivEn = document.createElement('div');
    newDivEn.className = 'en';
    newDivEn.innerText = rus_to_latin(input.value)

    const newRow = document.createElement('div');
    newRow.className = 'row';

    if (input.value.length > 7) {
        const arrayInput = Array.from(input.value)
        const removed = arrayInput.splice(7)
        newDivRus.innerText = arrayInput.join('') + '...'

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip'
        tooltip.innerText = input.value

        newDivRus.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block'
        })

        newDivRus.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none'
        })

        newDivRus.prepend(tooltip)
    }

    if (rus_to_latin(input.value).length > 7) {
        const arrayInput = Array.from(rus_to_latin(input.value))
        const removed = arrayInput.splice(7)
        newDivEn.innerText = arrayInput.join('') + '...'

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip'
        tooltip.innerText = rus_to_latin(input.value)

        newDivEn.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block'
        })

        newDivEn.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none'
        })

        newDivEn.prepend(tooltip)
    }

    deleteWord.append(icon)
    newDivEn.append(deleteWord)
    newDivRus.prepend(index)
    container.append(newRow)
    newRow.append(newDivRus, newDivEn);

    input.value = ''
}

button.addEventListener('click', addNewWord)

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addNewWord();
    }
})

clearAllButton.addEventListener('click',() => {
    window.location = '/'
})

function rus_to_latin ( str ) {
    
    let ru = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
        'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
        'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya',
        'ъ': '', 'й': 'i'
    }, n_str = [];
    
    str = str.replace(/ь/g, "'");
    
    for ( var i = 0; i < str.length; ++i ) {
       n_str.push(
              ru[ str[i] ]
           || ru[ str[i].toLowerCase() ] == undefined && str[i]
           || ru[ str[i].toLowerCase() ].toUpperCase()
       );
    }
    
    return n_str.join('');
}