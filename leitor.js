$(document).ready(function () {

  let classeV = ['X','A', 'B', 'C', 'D', 'E', 'F']

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


  var obj = new Array(300).fill().map(function() {
    return {
        id: chance["unique"](chance.integer,{ min: 6, max: 9999 }),
        ra: chance["integer"]({ min: 10000, max: 999999 }),
        name: chance["unique"](chance.name,1),
        degreeId: chance["integer"]({ min: 1, max: 13 }),
        classId: chance["integer"]({ min: 1, max: 6 }),
    };
});

var json = JSON.stringify(obj, null, 2); 

  $('#gerador').on('click', function(){
    for (j in obj){
      alunos.push(obj[j])
    }
    filtro()
  })

    

  let alunos = []
  $.getJSON('students.json', function (data) {


    for (i in data) {
    /* $('.alunos').append(`
        <div id='aluno_${data[i].id}'>${data[i].name} </div>
     `) */
     alunos.push(data[i])
    }
  })
  
  let filtro = function (){
    $('.alunos').html('')
    let mostrar = alunos
    let serie = $('#serie').val()
    let classe = $('#classe').val()
    
    if(serie != ''){
      mostrar = mostrar.filter((el) => {
        if(el.degreeId == serie){
          return true;
        }
      })
    }
    if(classe != ''){
      mostrar = mostrar.filter((el) => {
        if(el.classId == classe){
          return true;
        }
      })
    }
    for(let i = 0; i < mostrar.length; i++){
      $('.alunos').append(`
      <div>
        <input id='aluno_${mostrar[i].id}' value='${mostrar[i].name}'>
        <input id='aluno_class_${mostrar[i].id}' value='${classeV[parseInt(mostrar[i].classId)]}'>
      </div>
  `)
    $(`#aluno_${mostrar[i].id}`).on('keyup', function(){
      alunos[parseInt($(this).attr('id').split('_')[1])-1].name = $(this).val();
    })
    $(`#aluno_class_${mostrar[i].id}`).on('keyup', function(){
      console.log(alunos)
      console.log(classeV.indexOf($(this).val()))
      alunos[parseInt($(this).attr('id').split('_')[2])-1].classId = classeV.indexOf($(this).val());
      console.log(alunos)
    })
    } 
  }
  

  $('#serie, #classe').on('change', function(){filtro()})
  $(document).one('ajaxStop', function(){
    filtro()
  })
  filtro()
    
});