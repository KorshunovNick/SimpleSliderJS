
const testArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
const containerBox = document.querySelector('.container')
const containerBoxTwo = document.querySelector('.container2')
const containerBoxThree =  document.querySelector('.container3')
const inputCount = document.querySelector('#count')

const createSlider = (box, array, elemCount = 3, height = 250 ) => { // параметры функции: контейнер из которого нужно сделать слайдер
                                                      // массив элементов, количество видимых элементов и высота элементов, также можем добавить ширину

    if (elemCount > array.length - 1 || elemCount <= 0) elemCount = 4// если количество видимых элементов больше длины массива - ограничиваем видимую часть 


    box.style.cssText = `
    margin-bottom: 50px;
    width: 100%;
    padding: 10px 5%;
    border: 1px solid black;
    display: grid;
    grid-template-columns: repeat(${elemCount},1fr); 
    gap: 3%;
    position: relative;` // используем гриды

    const leftButton = createArrowButton('<') // создание кнопок
    const rightButton = createArrowButton('>')

    box.appendChild(leftButton)
    box.appendChild(rightButton)


    box.addEventListener('mouseover', () => { // обработчик на появление кнопок и возможность переключения стрелками
        leftButton.hidden = rightButton.hidden = false
        document.addEventListener('keydown', keydownHelper)

    })

    box.addEventListener('mouseleave', () => { // сокрытие кнопок и удаления обработчика клавиатуры
        leftButton.hidden = rightButton.hidden = true
        document.removeEventListener('keydown', keydownHelper)
    })


    for (let i = 0; i < elemCount; i++) { // первоначальное заполнение контейнера
        box.append(createElem(i))
    }

    rightButton.onclick = rightButtonHelper
    leftButton.onclick = leftButtonHelper


    function createArrowButton(arrow) {

        const arrowButton = document.createElement('img')
        arrowButton.src = 'img/free-icon-arrow-right-4262780.png'
        arrowButton.className = 'Slider-btn'
        arrowButton.style.position = 'absolute'
        if (arrow == '>') {
            arrowButton.style.right = '10px'
        } else {
            arrowButton.style.left = '10px'
            arrowButton.style.transform = 'rotate(180deg)'
        }
        arrowButton.style.top = '45%'
        arrowButton.hidden = true
        return arrowButton
    }

    function keydownHelper(event) {

        if (event.key == 'ArrowRight') {
            rightButtonHelper()
        }

        if (event.key == 'ArrowLeft') {
            leftButtonHelper()
        }

    }

    function rightButtonHelper() {

        const position = Number(box.querySelectorAll('.elem')[elemCount - 1].getAttribute('position')) // ищем индекс последнего элемента в контейнере
        const pos = (position == array.length - 1) ? 0 : position + 1 // если элемент последний в массиве то добавляем первый элемент массива

        box.querySelector('.elem').remove() // удаляем первый элемент массива, чтобы освободить место
        box.appendChild(createElem(pos)) // добавляем в конец

    }

    function leftButtonHelper() {

        const position = Number(box.querySelector('.elem').getAttribute('position'))
        const pos = (position == 0) ? array.length - 1 : position - 1 // если первый элемент в контейнере - первый элемент массива добавляем последний элемент массива, иначе добавляем элемент из массива с меньшим на 1 индексом 
        console.log(box.querySelectorAll('.elem')[elemCount - 1])
        box.querySelectorAll('.elem')[elemCount - 1].remove() // удаляем последний элемент, чтобы освободить место
        box.prepend(createElem(pos))
    }

    function createElem(pos) {
        const elem = document.createElement('div')
        elem.innerHTML = array[pos]
        elem.setAttribute('position', pos)
        elem.className = 'elem'
        // elem.src = array[pos]
        // elem.style.width = ((box.offsetWidth * 0.8) / elemCount) + 'px' // для img
        elem.style.height = height + 'px'

        return elem
    }

}

createSlider(containerBox, testArray,8)

inputCount.addEventListener('change',(e)=>{
    let containerElems = Array.from(document.querySelector('.container').children)
    for (let elem of containerElems){
        elem.remove()
    }
    
    createSlider(containerBox,testArray,e.target.value)
})

createSlider(containerBoxTwo,testArray,4,250)
createSlider(containerBoxThree,testArray,3,350)
