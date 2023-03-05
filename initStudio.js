export function initStudio () {
    //---------------------------------------------Add Root Variables

    //---------------------------------------------Add Studio Styles
    const newCSS = `#studio {
        position:absolute;
        bottom: 5%;
    }

    div#configR2 {
    position: relative;
    display: flex;
      background: rgba(60, 60, 60,1);
      height:10%;
      width:100%;
    }
    
    input[type=email] {
    }`
    
    var currentStyle = document.querySelector('style');
    var newStyle = document.createElement("style");
    newStyle.innerText = newCSS;
    currentStyle.parentNode.insertBefore(newStyle, currentStyle.nextSibling);

    //---------------------------------------------Add Studio Div
    const newControls = `<div id="configR2">
        <div>
            <label for='selectFG'>FG Rate: </label>
            <input type="range" min="1" max="100" value="70" id="selectFG" class="controls">
        </div>
        <div>
            <label for='selectBG'>BG Rate: </label>
            <input type="range" min="1" max="100" value="20" id="selectBG" class="controls">
        </div>
        <div>
            <label for='selectRate'>Turn Rate: </label>
            <input type="range" min="1" max="100" value="41" id="selectRate" class="controls">
        </div>
    </div>
    <input type="file" accept="image/png, image/jpeg" id="loadImg" class="controls">
    <select id="blendMode" class="controls">
      <option value="unset">Unset</option>
      <option value="darken">Darken</option>
    </select>`

    var lastDiv = document.getElementById('cs');
    var studioDiv = document.createElement('div');
    studioDiv.setAttribute("id", "studio");
    studioDiv.innerHTML = newControls;
    lastDiv.parentNode.insertBefore(studioDiv, lastDiv.nextSibling);


    //---------------------------------------------
    //--------------------------Control Functions
    //---------------------------------------------
    //>>>>>>>>>>>>>>>>Aurora Sliders<<<<<<<<<<<<<<<<<<<<<<<<
    const root = document.querySelector(':root');
    let sliderRate = document.getElementById("selectRate");
    let sliderFG = document.getElementById("selectFG");
    let sliderBG = document.getElementById("selectBG");
    let bgBlendMode = document.getElementById("blendMode");
      
      sliderFG.oninput = function() {
        var rate = roundUp((1 / (this.value/100))*6,2);
       updateStyle('.ma::after', rate);
      }
      sliderBG.oninput = function() {
        var rate = roundUp((1 / (this.value/100))*3,2);
        updateStyle('.ma::before', rate);
      }
      sliderRate.oninput = function() {
        var rate = this.value/100;
        updateStyle('.ma, .ma::after, .ma::before', rate);
      }
      //Update Style
      var s = document.styleSheets[0];
      function updateStyle (attrib, val) {
        console.log(attrib + ' - ' + val);
        for(var i = 0; i < s.cssRules.length; i++) {
          if (s.cssRules[i].selectorText == '.ma::after' && attrib == '.ma::after') {
            s.cssRules[i].style['animation'] = 'aurora ' + val + 's infinite linear ' + 'normal' + ' var(--pa)';
          } else if (s.cssRules[i].selectorText == '.ma::before' && attrib == '.ma::before') {
            s.cssRules[i].style['animation'] = 'aurora ' + val + 's infinite linear ' + 'normal' + ' var(--pa)';
          } else if (s.cssRules[i].selectorText == '.ma, .ma::after, .ma::before' && attrib == '.ma, .ma::after, .ma::before') {
            s.cssRules[i].style['transform'] = 'rotate('+ val + 'turn)';
            if (s.cssRules[i].name === 'aurora') {
              var r = s.cssRules[i];
              var rotation_a = val + 1;
              r[0].style['transform'] = 'rotate('+ val + 'turn)';
              r[1].style['transform'] = 'rotate('+ rotation_a + 'turn)';
            }  
          } else if (s.cssRules[i].selectorText == '#upload' && attrib == '#upload') {
            s.cssRules[i].style['mix-blend-mode'] = val;
          }
        }
      }
      //Utility
      function roundUp(num, precision) {
        precision = Math.pow(10, precision);
        return Math.ceil(num * precision) / precision;
      }
      
      bgBlendMode.onchange = function() {
        var sVal = bgBlendMode.value;
        console.log(sVal);
        updateStyle('#upload', sVal);
      }

    //>>>>>>>>>>>>>>>>Background Upload<<<<<<<<<<<<<<<<<<<<<<<<
      const input = document.getElementById('loadImg');
      input.addEventListener('change', updateImageDisplay);

      function updateImageDisplay() {
        root.style.setProperty('--bg', "url(" + URL.createObjectURL(input.files[0]) + ")");
        }
}
