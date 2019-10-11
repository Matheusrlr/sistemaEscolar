$('#cadastrar').on('click', function(){
    let nome = $('#nome').val()
    let serie = $('#serie_cadastro').val()
    let classe = $('#classe_cadastro').val()

    if(nome == ''){
      $('#nome').css('border-color', 'red')
    }else if(serie == ''){
      $('#serie_cadastro').css('border-color', 'red')
      
    }else if(classe == ''){
      $('#classe_cadastro').css('border-color', 'red')
    }else{
      $.getJSON('students.json', function(data){
        data.push(
          {
            id:data.length,
            ra:Math.random()*(9999-1000)+1000,
            name:nome,
            degreeId:serie,
            classId: classe
          }
        );
        $.twFile.save('students.json', data)
        window.location.reload()
      })
    }
  });