const total_character = document.getElementById("total_character")
const word_count = document.getElementById("word_count")
const sentence_count = document.getElementById("sentence_count")
const container_of_characters_static = document.getElementById("container_of_characters_static")
const typing_area = document.getElementById("typing_area")
const no_existed_character_alert = document.getElementById("no_existed_character_alert")
const character_limite = document.getElementById("character_limite")
const exclude_space = document.getElementById("exclude_space")
const max_character_alert = document.getElementById("max_character_alert")
const character_limite_input = document.getElementById("character_limite_input")

function word_count_function(word){
    const word_pattern = /( [A-z0-9]+|[A-z0-9]+ |[A-z0-9]$)/gi
    
    if (word.match(word_pattern)){
        return word.match(word_pattern).length
    }
    return "00"
}

function character_count_function(character){
    let character_pattern
    if (exclude_space.checked){
        character_pattern = /[^ ]/g //m
    }else{
        character_pattern = /./g //m
    }

    return character.match(character_pattern).length
}

function sentence_count_function(sentence){
    const sentence_pattern = /[a-z 0-9]+(\.|\?|!)/gi //m
    
    if (sentence.match(sentence_pattern)){
        return sentence.match(sentence_pattern).length
    }
    return "00"
}

function character_analyse_function(text){
    const character_pattern = /[a-z]/ig //m
    const existed_characters = text.match(character_pattern)
    let existed_character_unique = []
    let existed_character_unique_statistic = []
    let total_character_count = null

    existed_characters.forEach((current_character) => {
        
        total_character_count += 1 
        console.log(total_character_count)
        if (existed_character_unique.includes(current_character)){
            existed_character_unique.forEach((element,index) =>{
                if (current_character == element){
                    existed_character_unique_statistic[index] += 1
                }
            })
        }
        else{
            existed_character_unique.push(current_character)
            existed_character_unique_statistic.push(1)
        }
    });


    return [existed_character_unique,existed_character_unique_statistic,total_character_count] 
}

function creat_character_static_container (current_character,its_persentage,total_character){
    const container = document.createElement("div")
    
    const character_container = document.createElement("span")
    character_container.style.cssText = "width: fit-content;"
    character_container.textContent = current_character

    const div_1 = document.createElement("div")
    div_1.style.cssText = `background-color: rgba(34, 34, 44);height: 10px;border-radius: 15px}`
    div_1.style.width = "85%"
   console.log(div_1.style.width)

    console.log(its_persentage)
    const div_2 = document.createElement("div")
    div_2.style.cssText =`background-color: 
rgba(211, 160, 252);height: 10px; border-radius: 15px`
    div_2.style.width = its_persentage+"%"

    const character_percentage_container = document.createElement("span")
    character_percentage_container.style.cssText = "width: fit-content;"
    character_percentage_container.textContent = `${its_persentage} %`

    div_1.append(div_2)
    container.append(character_container,div_1,character_percentage_container)
    container_of_characters_static.append(container)
}
typing_area.addEventListener("input",()=>{
    if(character_limite.checked){
        if(character_limite_input.value != "" && character_limite_input.value <= typing_area.value.length){
        

        typing_area.value = typing_area.value.slice(0,character_limite_input.value)
        max_character_alert.style.cssText = "display : block"
        max_character_alert.textContent = "The limite character is " + character_limite_input.value
console.log(max_character_alert.firstElementChild)
        }
        else{
            max_character_alert.style.cssText = "display: none"
        }
    }else{
            max_character_alert.style.cssText = "display: none"
        }

    analyse()
})

function analyse(){
    
console.log(5555)

    if (typing_area.value){
        no_existed_character_alert.style.cssText = "display : none"
    }else{
        
        no_existed_character_alert.style.cssText = "display: block"
        no_existed_character_alert.textContent = "display: block"

        word_count.firstElementChild.textContent = "00"
        total_character.firstElementChild.textContent = "00"
        sentence_count.firstElementChild.textContent = "00"
        container_of_characters_static.innerHTML = ""
        return
    }

    container_of_characters_static.innerHTML = ""

    const character_analyse = character_analyse_function(typing_area.value)
    const total_character_count = character_analyse[2]
        
    character_analyse[0].forEach((character,index) => {
        if (index<=3){
            creat_character_static_container(character,(character_analyse[1][index] / character_analyse[2] * 100).toFixed(2),character_analyse[2])
        }
    })

    const see_more_button = document.createElement("span")
    see_more_button.textContent="see more"
    see_more_button.style.cssText="cursor:pointer"
    see_more_button.style.display="block"
    
    //see_more_button.style.cssText=""
    see_more_button.addEventListener("click",()=>{
        for (let i = 4 ; i < character_analyse[0].length;i++){
            creat_character_static_container(character_analyse[0][i],(character_analyse[1][i] / character_analyse[2] * 100).toFixed(2),character_analyse[2])
        }
        see_more_button.style.display="none"

        const see_less_button = document.createElement("span")
        see_less_button.textContent="see less"
        see_less_button.style.cssText="cursor:pointer"
        container_of_characters_static.append(see_less_button)
        see_less_button.addEventListener("click",()=>{
            see_less_button.style.display="none"
            analyse()
        })

    })

    if (character_analyse[0].length > 4){
        container_of_characters_static.append(see_more_button)
    }

    total_character.firstElementChild.textContent =  character_count_function(typing_area.value)
    sentence_count.firstElementChild.textContent = sentence_count_function(typing_area.value) 
    word_count.firstElementChild.textContent = word_count_function(typing_area.value)

}



exclude_space.addEventListener("change",analyse) 
character_limite.addEventListener("change",()=>{
    
    if (character_limite.checked){
        character_limite_input.style.cssText = "display : inline"

        if(typing_area.value > character_limite_input.value){
            typing_area.value = typing_area.value.slice(character_limite_input.value)
        }
    }else{
        
        character_limite_input.style.cssText = "display: none"
    }

    
}) 

character_limite_input.addEventListener("input",()=>{
    if(character_limite_input.value != "" && character_limite_input.value <= typing_area.value.length){
        

        typing_area.value = typing_area.value.slice(0,character_limite_input.value)
    }

    const character_limite = character_limite_input.value
    if(typing_area.value > character_limite_input.value){
        typing_area.value = typing_area.value.slice(0,character_limite.value)
    }
}) 




const mode_button = document.getElementById("mode_button")
console.log(mode_button.src)

mode_button.onclick = () =>{
    if (mode_button.src == "http://127.0.0.1:5500/in%20class/to%20do%20list/wb_sunny_24dp_FFFFFF_FILL0_wght100_GRAD0_opsz24.svg"){
    mode_button.src = "http://127.0.0.1:5500/in%20class/to%20do%20list/moon_stars_24dp_000000_FILL0_wght100_GRAD0_opsz24.svg"

    document.getElementsByTagName("body")[0].style.background = "white"
    document.getElementsByTagName("body")[0].style.color = "black"
  } else{
    mode_button.src = "http://127.0.0.1:5500/in%20class/to%20do%20list/wb_sunny_24dp_FFFFFF_FILL0_wght100_GRAD0_opsz24.svg"

    document.getElementsByTagName("body")[0].style.background = "black"
    document.getElementsByTagName("body")[0].style.color = "white"
  }
  }