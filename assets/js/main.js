window.onload = function () {
  // Variables
  var IMAGENES = [
    {
      img: "https://laddermobile.1blockesports.com/wp-content/uploads/2022/08/ebro_gaming_big-150x150.png",
      name: "EBRO GAMING",
    },
    {
      img: "https://laddermobile.1blockesports.com/wp-content/uploads/2022/08/stone_movistar_big-1-150x150.png",
      name: "STONE MOVISTAR",
    },
    {
      img: "https://laddermobile.1blockesports.com/wp-content/uploads/2022/08/rosario_central_big-1-150x150.png",
      name: "ROSARIO CENTRAL",
    },
    {
      img: "https://laddermobile.1blockesports.com/wp-content/uploads/2022/08/eob_big-150x150.png",
      name: "ETERNAL OB",
    },
    {
      img: "https://laddermobile.1blockesports.com/wp-content/uploads/2022/08/osaka_big-1-150x150.png",
      name: "OSAKA",
    },
    {
      img: "https://laddermobile.1blockesports.com/wp-content/uploads/2022/08/404_big-1-150x150.png",
      name: "404 TNF",
    },
    {
      img: "https://laddermobile.1blockesports.com/wp-content/uploads/2022/08/team_leite_big-150x150.png",
      name: "TEAM LEITE",
    },
    {
      img: "https://laddermobile.1blockesports.com/wp-content/uploads/2022/08/mezexis-150x150.png",
      name: "MEZEXIS",
    },
  ];

  var IMAGENES_SELECTED = [];
  var SELECTEDG1 = [
    {
      img: "https://laddermobile.1blockesports.com/wp-content/uploads/2022/08/leviatan_big-1-150x150.png",
      name: "Leviatán",
    },
    {
      img: "",
      name: "EQUIPO 2",
    },
    {
      img: "",
      name: "EQUIPO 3",
    },
    {
      img: "",
      name: "EQUIPO 4",
    },
    {
      img: "",
      name: "EQUIPO 5",
    },
  ];

  var SELECTEDG2 = [
    {
      img: "https://laddermobile.1blockesports.com/wp-content/uploads/2022/08/furious_big-1-150x150.png",
      name: "Furious Gaming",
    },
    {
      img: "",
      name: "EQUIPO 2",
    },
    {
      img: "",
      name: "EQUIPO 3",
    },
    {
      img: "",
      name: "EQUIPO 4",
    },
    {
      img: "",
      name: "EQUIPO 5",
    },
  ];

  const TIEMPO_INTERVALO_MILESIMAS_SEG = 500;
  let $imagen = document.getElementById("imagen");
  let $resetButton = document.getElementById("reset");
  let $counter_display = document.getElementById("counter_display");
  let $botonPlay = document.getElementById("play");
  let $video = document.getElementById("vid");
  let $botonStop1 = document.getElementById("stop1");
  let $botonStop2 = document.getElementById("stop2");
  let intervalo;
  let posicionActual = 0;
  var count1 = 1;
  var count2 = 1;
  var selectedcount1 = 1;
  var selectedcount2 = 1;

  /// console.log('dfsfsdfsf', IMAGENES.length);

  var local_IMAGENES = getLocalStorage("local_IMAGENES");
  //console.log('local_IMAGENESlocal_IMAGENES', local_IMAGENES);
  if (local_IMAGENES) {
    IMAGENES = local_IMAGENES;
  } else {
    //console.log('pusheo');
    pushLocalStorage("local_IMAGENES", IMAGENES);
  }

  var local_SELECTEDG1 = getLocalStorage("local_SELECTEDG1");
  //console.log('local_SELECTEDG1', local_SELECTEDG1);
  if (local_SELECTEDG1) {
    SELECTEDG1 = local_SELECTEDG1;
  } else {
    // console.log('pusheo sele');
    pushLocalStorage("local_SELECTEDG1", SELECTEDG1);
  }

  var local_SELECTEDG2 = getLocalStorage("local_SELECTEDG2");
  //console.log('local_SELECTEDG2', local_SELECTEDG2);
  if (local_SELECTEDG2) {
    SELECTEDG2 = local_SELECTEDG2;
  } else {
    pushLocalStorage("local_SELECTEDG2", SELECTEDG2);
  }

  for (const objSelected1 in SELECTEDG1) {
    //console.log("objSelected1" , objSelected1)
    if (SELECTEDG1[objSelected1].img) {
      selectedcount1++;
      document.getElementById(`selected-${count1}`).children[1].src = SELECTEDG1[objSelected1].img;
      document.getElementById(`selected-${count1}`).children[2].innerHTML = SELECTEDG1[objSelected1].name;
    }
    // console.log("couasdasdasdnt1",SELECTEDG1[objSelected1].img)
    count1++;
  }

  for (const objSelected2 in SELECTEDG2) {
    if (SELECTEDG2[objSelected2].img) {
      selectedcount2++;
      document.getElementById(`selected-2${count2}`).children[1].src = SELECTEDG2[objSelected2].img;
      document.getElementById(`selected-2${count2}`).children[2].innerHTML = SELECTEDG2[objSelected2].name;

    }
    count2++;
  }

  //result
  // console.log('IMAGENES',IMAGENES);
  // console.log('IMAGENES_SELECTED',IMAGENES_SELECTED);

  let $botonRetroceder = document.getElementById("#retroceder");
  let $botonAvanzar = document.getElementById("#avanzar");

  // Funciones

  /**
   * Funcion que cambia la foto en la siguiente posicion
   */
  function pasarFoto() {
    if (posicionActual >= IMAGENES.length - 1) {
      posicionActual = 0;
    } else {
      posicionActual++;
    }
    renderizarImagen();
  }

  /**
   * Funcion que cambia la foto en la anterior posicion
   */
  function retrocederFoto() {
    if (posicionActual <= 0) {
      posicionActual = IMAGENES.length - 1;
    } else {
      posicionActual--;
    }
    renderizarImagen();
  }

  /**
   * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
   */
  function renderizarImagen() {
    //console.log(IMAGENES.length);
    if (IMAGENES.length > 0) {
      $imagen.style.backgroundImage = `url(${IMAGENES[posicionActual].img})`;
      // $imagen.src = `url(${IMAGENES[posicionActual].img})`;
    }
  }

  /**
   * Activa el autoplay de la imagen
   */
  function playIntervalo() {
    intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
    // Desactivamos los botones de control
    // $botonAvanzar.setAttribute('disabled', true);
    // $botonRetroceder.setAttribute('disabled', true);
    $botonPlay.setAttribute("disabled", true);
    // $video.play();
    $botonPlay.style.display = "none";
    $counter_display.classList.add("animation_start");
    $botonStop1.removeAttribute("disabled");
    $botonStop2.removeAttribute("disabled");
  }

  /**
   * Para el autoplay de la imagen
   */
  function stopIntervalo() {
    clearInterval(intervalo);
    // Activamos los botones de control
    // $botonAvanzar.removeAttribute('disabled');
    // $botonRetroceder.removeAttribute('disabled');
    $botonPlay.removeAttribute("disabled");
    $botonStop.setAttribute("disabled", true);
    IMAGENES.splice(posicionActual, 1);
    document.getElementById("img-modal").src = IMAGENES[posicionActual];

    IMAGENES_SELECTED.push(IMAGENES[posicionActual]);
    //console.log('IMAGENES_SELECTED', IMAGENES_SELECTED);

    //document.getElementById("myModal").style.display = "block";
    const modalId = document.getElementById("modal1");
    modalId.classList.add(isVisible);
  }

  /**
   * Para el autoplay de la imagen
   */
  function SelectIntervalo1() {
    // let ranSelect = getRandomInt(0,IMAGENES.length-1);
    if (selectedcount1 > 5) {
      //$botonStop1.setAttribute('disabled', true);
      $botonStop1.classList.add("disabled-link");

      let local_SELECTEDG1 = getLocalStorage("local_SELECTEDG1");
      // console.log('local_SELECTEDG1', local_SELECTEDG1);

      return;
    }
    let ranSelect = posicionActual;
    let objSelected = IMAGENES[ranSelect];

    document.getElementById("img-modal").src = objSelected.img;
    IMAGENES.splice(ranSelect, 1);

    SELECTEDG1[selectedcount1 - 1] = objSelected;
    pushLocalStorage("local_SELECTEDG1", SELECTEDG1);
    pushLocalStorage("local_IMAGENES", IMAGENES);

    const modalId = document.getElementById("modal1");
    modalId.classList.add(isVisible);

    document.getElementById(
      `selected-${selectedcount1}`
    ).children[1].src = objSelected.img;
    document.getElementById(
      `selected-${selectedcount1}`
    ).children[2].innerHTML = objSelected.name;

    selectedcount1++;
    if (selectedcount1 > 5) {
      $botonStop1.setAttribute("disabled", true);
      let local_SELECTEDG1 = getLocalStorage("local_SELECTEDG1");
      // console.log('local_SELECTEDG1', local_SELECTEDG1);
    }
  }
  function SelectIntervalo2() {
    if (selectedcount2 > 5) {
      //$botonStop2.setAttribute('disabled', true);
      $botonStop2.classList.add("disabled-link");
      let local_SELECTEDG2 = getLocalStorage("local_SELECTEDG2");
      //  console.log('local_SELECTEDG2', local_SELECTEDG2);

      return;
    }
    // let ranSelect = getRandomInt(0,IMAGENES.length-1);
    let ranSelect = posicionActual;
    let objSelected = IMAGENES[ranSelect];
    document.getElementById("img-modal").src = objSelected.img;
    IMAGENES.splice(ranSelect, 1);

    SELECTEDG2[selectedcount2 - 1] = objSelected;
    pushLocalStorage("local_SELECTEDG2", SELECTEDG2);
    pushLocalStorage("local_IMAGENES", IMAGENES);

    const modalId = document.getElementById("modal1");
    modalId.classList.add(isVisible);

    document.getElementById(`selected-2${selectedcount2}`).children[1].src = objSelected.img;
    document.getElementById(`selected-2${selectedcount2}`).children[2].innerHTML = objSelected.name;

    selectedcount2++;
    if (selectedcount2 > 5) {
      $botonStop2.setAttribute("disabled", true);
      let local_SELECTEDG2 = getLocalStorage("local_SELECTEDG2");
      // console.log('local_SELECTEDG2', local_SELECTEDG2);
    }
  }

  // Retorna un entero aleatorio entre min (incluido) y max (excluido)
  // ¡Usando Math.round() te dará una distribución no-uniforme!
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function pushLocalStorage(name, value) {
    var miStorage = window.localStorage;
    let pushLocal = window.btoa(
      unescape(encodeURIComponent(JSON.stringify(value)))
    );

    miStorage.setItem(name, pushLocal);
  }

  function getLocalStorage(gett) {
    var miStorage = window.localStorage;

    let getLocal = miStorage.getItem(gett);
    if (getLocal) {
      return JSON.parse(
        decodeURIComponent(escape(window.atob(getLocal)))
      );
    } else {
      return getLocal;
    }
  }

  function resetLocalStorage() {
    localStorage.clear();
  }

  // Eventos
  // $botonAvanzar.addEventListener('click', pasarFoto);
  // $botonRetroceder.addEventListener('click', retrocederFoto);
  $botonPlay.addEventListener("click", playIntervalo);
  $botonStop1.addEventListener("click", SelectIntervalo1);
  $botonStop2.addEventListener("click", SelectIntervalo2);
  $resetButton.addEventListener("click", resetLocalStorage);
  // Iniciar
  renderizarImagen();

  // Get the modal
  const openEls = document.querySelectorAll("[data-open]");
  const closeEls = document.querySelectorAll("[data-close]");
  const isVisible = "is-visible";

  for (const el of openEls) {
    el.addEventListener("click", function () {
      const modalId = this.dataset.open;
      document.getElementById(modalId).classList.add(isVisible);
    });
  }

  for (const el of closeEls) {
    el.addEventListener("click", function () {
      this.parentElement.parentElement.parentElement.classList.remove(
        isVisible
      );
    });
  }

  document.addEventListener("click", (e) => {
    if (e.target == document.querySelector(".modal.is-visible")) {
      document
        .querySelector(".modal.is-visible")
        .classList.remove(isVisible);
    }
  });

  // document.addEventListener("keyup", e => {
  // // if we press the ESC
  // if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
  //     document.querySelector(".modal.is-visible").classList.remove(isVisible);
  // }
  // });
};