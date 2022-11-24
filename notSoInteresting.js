//Remover la 3er pregunta de la lectura 2
//

var theSections = document.getElementsByClassName("everySection");
var theQuestions1 = document.getElementsByClassName("everyQuestion1");
var theQuestions2 = document.getElementsByClassName("everyQuestion2");
var theQuestions3 = document.getElementsByClassName("everyQuestion3");
var theQuestions4 = document.getElementsByClassName("everyQuestion4");
var theImages = document.getElementsByClassName("theImage");
var theQuest = document.getElementsByClassName("theQuest");

//Cambiar el ciclo for de la calificada, de 2 a 4 elementos
//Cambiar el resultado registrado, de random a... eso
var theAudio = document.getElementsByClassName("everyAudio");
var thePagePosition = 0;
var timeStart = 0;
var csvFileData = [
  //Annotations1,Annotations2,Lecture1time, Lecture2time, Lecture3time, Lecture4time, score1, score2, score3, score4\n'
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function pasaApreguntas(){
  theImages[thePagePosition-2].style.display = "none";
  theQuest[thePagePosition-2].style.display = "unset";
}

function theClick(){
  
  if(thePagePosition > 1){
    //That means, we have passed the 0press, 1instructions -> we're at least finishing the first question'are
    csvFileData[0][thePagePosition] = (Date.now() - timeStart) / 1000;
    theAudio[thePagePosition-2].pause();

  }else if(thePagePosition == 1){
    //We've arrived at the "instructions" page
    csvFileData[0][0] = window.prompt('Enter your name','Panchit@');
  }
  
  if(thePagePosition < theSections.length -1){
    //We still have slides
    
    console.log(`We're on the page ${thePagePosition}`);
    
    theSections[thePagePosition].style.display = "none";
    thePagePosition+=1;
    theSections[thePagePosition].style.display = "unset";
    
    console.log(`And we've changed to the page ${thePagePosition}`);
    
    timeStart = Date.now();
    if(thePagePosition-2>=0){
      theAudio[thePagePosition - 2].play();
    }
    
    
  }else{
    //Calificamos cada sección de preguntas, y guardamos en la BD
    var puntuac = [0,0,0,0];
    //a1 b2 c3 d4 e5
    const bancoDeRes = [[5,5,3, /**/ 4],[2,1,5, /*3,*/ 2],[4, /*1,*/ 2,3,5],[3,5,3,4]];
    for(let i=0; i<4; i++){ //Calificamos la lectura i

      for(let j=0; j<eval(`theQuestions${i+1}`).length; j++){ //Calificamos la lectura j
        if(eval(`theQuestions${i+1}`)[j].value == bancoDeRes[i][j]){
          puntuac[i]++;
        }else{
          console.log(`Tuvo mal la ${j+1} de la lectura ${i+1}`);
          console.log(eval(`theQuestions${i+1}`)[j].value);
        }
      }
      puntuac[i] = puntuac[i] * 10 / eval(`theQuestions${i+1}`).length; //Convertimos de puntos a puntaje/10
    }

    csvFileData[0][6] = puntuac[0];
    csvFileData[0][7] = puntuac[1];
    csvFileData[0][8] = puntuac[2];
    csvFileData[0][9] = puntuac[3];
    // alert('Acabamos con las secciones, eh... pues ya. Chao');
    download_csv_file(csvFileData);
    
    //El exportado de documentos ocupa el link, por eso no debemos borrarlo antes.
    
    document.body.innerHTML = '<h1>Goodbye</h1>';
  }
  
}


function download_csv_file(theData) {
  var csv = 'Name,Annotations,Lecture1time, Lecture2time, Lecture3time, Lecture4time, score1, score2, score3, score4\n';
  theData.forEach(function (row) {
    csv += row.join(',');
    csv += "\n";
  });
  var hiddenElement = document.getElementById("theLink");
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'data.csv';
  hiddenElement.click();
}
