$(document).ready(function () {

  $.getJSON('classes.json', function (data) {
    resposta = data.classes


    for (i in resposta) {
      //console.log('Os id´s são:', resposta[i].id)
      //console.log('As classes são:', resposta[i].name)


      $('#classe').append(`<option value='${resposta[i].id}'>${resposta[i].name}</option>`);
      
    }



  })


  $.getJSON('degrees.json', function (data) {

    for (i in data) {
      $('#serie').append(`<option value='${data[i].id}'>${data[i].name}</option>`);
    
    }

  })



  $.getJSON('students.json', function (data) {

    let alunos = []

    for (i in data) {
    /* $('.alunos').append(`
        <div id='aluno_${data[i].id}'>${data[i].name} </div>
     `) */
     alunos.push(data[i])
    }
  
    let filtro = function (){
      $('.alunos').html('')
      let mostrar = alunos
      let serie = $('#serie').val()
      let classe = $('#classe').val()
     
      if(serie != ''){
        mostrar = mostrar.filter((el)=> {
          return el.serie == degreeId
       })
      }
      if(classe != ''){
        mostrar = mostrar.filter((el) => {
          return  el.serie == classId
        
        })
        console.log(mostrar)
      }

      console.log(mostrar)
      for(aluno in mostrar){
        $('.alunos').append(`
        <div id='aluno_${mostrar[aluno].id}'>${mostrar[aluno].name} </div>
     `)
      }
    }
    document.getElementById("serie").addEventListener('change',alert('Xablau'))
    filtro()
    
  })

  function inserir(arquivo, parametro) {
    arquivo.push(parametro)
    return;
  }
});