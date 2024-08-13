let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");  

  map = new Map(document.getElementById("map"), {
    center: { lat: 0, lng: -150 },
    zoom: 3,
    minZoom: 3,
    maxZoom: 6,
    mapTypeId: 'hybrid'   
  });  

  var sptt_poly = new google.maps.Data({map: map});
  var lln_poly = new google.maps.Data({map: map});
  var lls_poly = new google.maps.Data({map: map});
  var albn_poly = new google.maps.Data({map: map});
  var albs_poly = new google.maps.Data({map: map});
  var isc_poly = new google.maps.Data({map: map});
  var iattc_poly = new google.maps.Data({map: map});
  var wcpfc_poly = new google.maps.Data({map: map});
  
  sptt_poly.loadGeoJson('sptt_poly.geojson');
  lln_poly.loadGeoJson('longlinen_poly.geojson');
  lls_poly.loadGeoJson('longlines_poly.geojson');
  albn_poly.loadGeoJson('albnp_poly.geojson');
  albs_poly.loadGeoJson('albsp_poly.geojson');
  isc_poly.loadGeoJson('isc.json');
  iattc_poly.loadGeoJson('iattc.json');
  wcpfc_poly.loadGeoJson('wcpfc.json');
  
  sptt_poly.setStyle({fillColor: 'darkorange', strokeWeight: 1, visible: true, strokeColor: 'darkorange',fillOpacity: 0.3});
  lln_poly.setStyle({fillColor: 'blue',  strokeWeight: 1, visible: true, strokeColor: 'blue',fillOpacity: 0.3});
  lls_poly.setStyle({fillColor: 'blue',  strokeWeight: 1, visible: true, strokeColor: 'blue',fillOpacity: 0.3});
  albn_poly.setStyle({fillColor: 'yellow', strokeWeight: 1, visible: true, strokeColor: 'yellow',fillOpacity: 0.3});
  albs_poly.setStyle({fillColor: 'red', strokeWeight: 1, visible: true, strokeColor: 'red' ,fillOpacity: 0.3});
  isc_poly.setStyle({fillColor: 'green', strokeWeight: 1});
  iattc_poly.setStyle({fillColor: 'blue', strokeWeight: 1});
  wcpfc_poly.setStyle({fillColor: 'red', strokeWeight: 1});  
  isc_poly.setMap();  
  iattc_poly.setMap();  
  wcpfc_poly.setMap(); 
  
  
  const spttinfo = new google.maps.InfoWindow({
    position: new google.maps.LatLng(-2.8, 180.5),
    content: 'Purse Seine'});    
  sptt_poly.addListener("mouseover", () =>  {spttinfo.open({map:map});});
  sptt_poly.addListener("mouseout", () =>  {spttinfo.close();});   
  
  const llninfo = new google.maps.InfoWindow({
    position: new google.maps.LatLng(22.5, 202.5),
    content: 'Longline HI'});    
  lln_poly.addListener("mouseover", () =>  {llninfo.open({map:map});});
  lln_poly.addListener("mouseout", () =>  {llninfo.close();});   
  
  const llsinfo = new google.maps.InfoWindow({
    position: new google.maps.LatLng(-12.5, 192.5),
    content: 'Longline AS'});    
  lls_poly.addListener("mouseover", () =>  {llsinfo.open({map:map});});
  lls_poly.addListener("mouseout", () =>  {llsinfo.close();});   
  
  const albninfo = new google.maps.InfoWindow({
    position: new google.maps.LatLng(45.5, 232.5),
    content: 'North Albacore'});    
  albn_poly.addListener("mouseover", () =>  {albninfo.open({map:map});});
  albn_poly.addListener("mouseout", () =>  {albninfo.close();});   
  
  const albsinfo = new google.maps.InfoWindow({
    position: new google.maps.LatLng(-42.5, 192.5),
    content: 'South Albacore'});    
  albs_poly.addListener("mouseover", () =>  {albsinfo.open({map:map});});
  albs_poly.addListener("mouseout", () =>  {albsinfo.close();});   
  
  
  var spttbox = document.getElementById("sptt");
 var llbox = document.getElementById("longline");
var albnpbox = document.getElementById("albnp");
var albspbox = document.getElementById("albsp");

var sptthbox = document.getElementById("sptth");
var llhbox = document.getElementById("longlineh");
var albnphbox = document.getElementById("albnph");
var albsphbox = document.getElementById("albsph");

var spttpbox = document.getElementById("spttp");
var llpbox = document.getElementById("longlinep");
var albnppbox = document.getElementById("albnpp");
var albsppbox = document.getElementById("albspp");

var iattcbox = document.getElementById("iattc");
var wcpfcbox = document.getElementById("wcpfc");
var iscbox = document.getElementById("isc");

spttbox.checked = true;
llbox.checked = true;
albnpbox.checked = true;
albspbox.checked =  true;
sptthbox.checked = true;
spttpbox.checked = true;
llhbox.checked = true;
albnphbox.checked = true;
albsphbox.checked =  true;
llpbox.checked =  true;
albnppbox.checked =  true;
albsppbox.checked =  true; 


  var spheatjs = '';   
  var jsonreq = await fetch('spttjs.json').then((response) => response.text()).then((text) => { spheatjs = JSON.parse(text); });
  var spheatdata = [];
  for (var i = 0; i < spheatjs.length; i++){      
      spheatdata.push({location: new google.maps.LatLng(spheatjs[i].LATITUDE,spheatjs[i].LONGITUDE), weight: Number(spheatjs[i].COUNT_FISH_TRIPS)});
      }
  var spheatmap = new google.maps.visualization.HeatmapLayer({data: spheatdata, map: map, radius:15});  
  spheatmap.setMap(map);  


    
  var albnheatjs = '';   
  var jsonreq = await fetch('albnpjs.json').then((response) => response.text()).then((text) => { albnheatjs = JSON.parse(text); });
  var albnheatdata = [];
  for (var i = 0; i < albnheatjs.length; i++){
    albnheatdata.push({location: new google.maps.LatLng(albnheatjs[i].LATITUDE,albnheatjs[i].LONGITUDE), weight: Number(albnheatjs[i].N_DAYS)});
    }     
  var albnheatmap = new google.maps.visualization.HeatmapLayer({data: albnheatdata, map: map, radius:15});  
  albnheatmap.setMap(map);  
  
  var albsheatjs = '';   
  var jsonreq = await fetch('albspjs.json').then((response) => response.text()).then((text) => { albsheatjs = JSON.parse(text); });
  var albsheatdata = [];
  for (var i = 0; i < albsheatjs.length; i++){
    albsheatdata.push({location: new google.maps.LatLng(albsheatjs[i].LATITUDE,albsheatjs[i].LONGITUDE), weight: Number(albsheatjs[i].N_DAYS)});
    }     
  var albsheatmap = new google.maps.visualization.HeatmapLayer({data: albsheatdata, map: map, radius:15});  
  albsheatmap.setMap(map);  
  
  var llnheatjs = '';   
  var jsonreq = await fetch('llnpjs.json').then((response) => response.text()).then((text) => { llnheatjs = JSON.parse(text); });
  var llnheatdata = [];
  for (var i = 0; i < llnheatjs.length; i++){      
    llnheatdata.push({location: new google.maps.LatLng(llnheatjs[i].LAT,llnheatjs[i].LON), weight: Number(llnheatjs[i].SETS)});
    }
  var llnheatmap = new google.maps.visualization.HeatmapLayer({data: llnheatdata, map: map, radius:15});  
  llnheatmap.setMap(map);    
    
  var llsheatjs = '';   
  var jsonreq = await fetch('llspjs.json').then((response) => response.text()).then((text) => { llsheatjs = JSON.parse(text); });
  var llsheatdata = [];
  for (var i = 0; i < llsheatjs.length; i++){
      if (llsheatjs[i].FISHERY === "LL_AS"){
    llsheatdata.push({location: new google.maps.LatLng(llsheatjs[i].LAT,llsheatjs[i].LON), weight: Number(llsheatjs[i].SETS)});
    }     }
  var llsheatmap = new google.maps.visualization.HeatmapLayer({data: llsheatdata, map: map, radius:15});  
  llsheatmap.setMap(map);  

// ------------------------------------------------------------------- 
// MultiPoint data layers
// -------------------------------------------------------------------  
 var icon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#f5ed0f',
        fillOpacity: 1,
        strokeColor: '#f5ed0f',
        strokeOpacity: 0.9,
        strokeWeight: 0,
        scale: 2
    };
    
  var spttlayer = new google.maps.Data();  
  var spttpts = [];    
  for (var i = 0; i < spheatjs.length; i++){      
      spttpts.push({lat: parseInt(spheatjs[i].LATITUDE),lng: parseInt(spheatjs[i].LONGITUDE)});
  }
  var sptt_points = new google.maps.Data.MultiPoint(spttpts);
  spttlayer.add({geometry: sptt_points});
  spttlayer.setStyle({icon:icon});
  spttlayer.setMap(map);
 
  var albnlayer = new google.maps.Data();  
  var albnpts = [];    
  for (var i = 0; i < albnheatjs.length; i++){      
      albnpts.push({lat: parseInt(albnheatjs[i].LATITUDE),lng: parseInt(albnheatjs[i].LONGITUDE)});
  }
  var albn_points = new google.maps.Data.MultiPoint(albnpts);
  albnlayer.add({geometry: albn_points});
  albnlayer.setStyle({icon:icon});
  albnlayer.setMap(map);
  
  
  var albslayer = new google.maps.Data();  
  var albspts = [];    
  for (var i = 0; i < albsheatjs.length; i++){      
      albspts.push({lat: parseInt(albsheatjs[i].LATITUDE),lng: parseInt(albsheatjs[i].LONGITUDE)});
  }
  var albs_points = new google.maps.Data.MultiPoint(albspts);
  albslayer.add({geometry: albs_points});
  albslayer.setStyle({icon:icon});
  albslayer.setMap(map);
  
  var llnlayer = new google.maps.Data();  
  var llnpts = [];    
  for (var i = 0; i < llnheatjs.length; i++){      
      llnpts.push({lat: parseInt(llnheatjs[i].LAT),lng: parseInt(llnheatjs[i].LON)});
  }
  var lln_points = new google.maps.Data.MultiPoint(llnpts);
  llnlayer.add({geometry: lln_points});
  llnlayer.setStyle({icon:icon});
  llnlayer.setMap(map);
  
  var llslayer = new google.maps.Data();  
  var llspts = [];    
  for (var i = 0; i < llsheatjs.length; i++){      
      llspts.push({lat: parseInt(llsheatjs[i].LAT),lng: parseInt(llsheatjs[i].LON)});
  }
  var lls_points = new google.maps.Data.MultiPoint(llspts);
  llslayer.add({geometry: lls_points});
  llslayer.setStyle({icon:icon});
  llslayer.setMap(map);
  
  
// ------------------------------------------------------------------- 
// Year selector drop-down function
// -------------------------------------------------------------------  

document.getElementById("fishingYear").onchange = function(){
      spheatmap.setMap(null);     
      var spheatdata = [];
       var spttpts = []; 
      for (var i = 0; i < spheatjs.length; i++){
          if (spheatjs[i].FISH_YEAR === document.getElementById('fishingYear').value){
            spheatdata.push({location: new google.maps.LatLng(spheatjs[i].LATITUDE,spheatjs[i].LONGITUDE), weight: Number(spheatjs[i].COUNT_FISH_TRIPS)});
            spttpts.push({lat: parseInt(spheatjs[i].LATITUDE),lng: parseInt(spheatjs[i].LONGITUDE)});
          }if (document.getElementById('fishingYear').value === ''){
            spheatdata.push({location: new google.maps.LatLng(spheatjs[i].LATITUDE,spheatjs[i].LONGITUDE), weight: Number(spheatjs[i].COUNT_FISH_TRIPS)});      
            spttpts.push({lat: parseInt(spheatjs[i].LATITUDE),lng: parseInt(spheatjs[i].LONGITUDE)});
          } 
            

      }  
      
      spheatmap = new google.maps.visualization.HeatmapLayer({data: spheatdata, map: map, radius: spheatmap.get("radius"), gradient:spheatmap.get("gradient"), opacity:spheatmap.get("opacity") });   
      if(sptthbox.checked === true){spheatmap.setMap(map);}if (sptthbox.checked === false){spheatmap.setMap();}   

      albnheatmap.setMap(null);   
      var albnheatdata = [];
      for (var i = 0; i < albnheatjs.length; i++){
          if (albnheatjs[i].DATE_FISHED_YEAR.toString() === document.getElementById('fishingYear').value){
            albnheatdata.push({location: new google.maps.LatLng(albnheatjs[i].LATITUDE,albnheatjs[i].LONGITUDE), weight: Number(albnheatjs[i].N_DAYS)});
          }if (document.getElementById('fishingYear').value === ''){
            albnheatdata.push({location: new google.maps.LatLng(albnheatjs[i].LATITUDE,albnheatjs[i].LONGITUDE), weight: Number(albnheatjs[i].N_DAYS)});           
          }      
      }  
      albnheatmap = new google.maps.visualization.HeatmapLayer({data: albnheatdata, map: map, radius:albnheatmap.get("radius"), gradient:albnheatmap.get("gradient"), opacity:albnheatmap.get("opacity")});     
      if (albnphbox.checked === true){albnheatmap.setMap(map);}if (albnphbox.checked === false){albnheatmap.setMap();}

      albsheatmap.setMap(null);   
      var albsheatdata = [];
      for (var i = 0; i < albsheatjs.length; i++){
          if (albsheatjs[i].SEASON.toString() === document.getElementById('fishingYear').value){
            albsheatdata.push({location: new google.maps.LatLng(albsheatjs[i].LATITUDE,albsheatjs[i].LONGITUDE), weight: Number(albsheatjs[i].N_DAYS)});
          }if (document.getElementById('fishingYear').value === ''){
            albsheatdata.push({location: new google.maps.LatLng(albsheatjs[i].LATITUDE,albsheatjs[i].LONGITUDE), weight: Number(albsheatjs[i].N_DAYS)});           
          }      
      }  
      albsheatmap = new google.maps.visualization.HeatmapLayer({data: albsheatdata, map: map, radius:albsheatmap.get("radius"), gradient:albsheatmap.get("gradient"), opacity:albsheatmap.get("opacity")});     
      if (albsphbox.checked === true){albsheatmap.setMap(map);}if (albsphbox.checked === false){albsheatmap.setMap();}

      llnheatmap.setMap(null);   
      var llnheatdata = [];
      for (var i = 0; i < llnheatjs.length; i++){
          if (llnheatjs[i].YEAR.toString() === document.getElementById('fishingYear').value){
            llnheatdata.push({location: new google.maps.LatLng(llnheatjs[i].LAT,llnheatjs[i].LON), weight: Number(llnheatjs[i].SETS)});
          }if (document.getElementById('fishingYear').value === ''){
            llnheatdata.push({location: new google.maps.LatLng(llnheatjs[i].LAT,llnheatjs[i].LON), weight: Number(llnheatjs[i].SETS)});           
          }      
      }  
      llnheatmap = new google.maps.visualization.HeatmapLayer({data: llnheatdata, map: map, radius:llnheatmap.get("radius"), gradient:llnheatmap.get("gradient"), opacity:llnheatmap.get("opacity")});    
      if (llhbox.checked === true){llnheatmap.setMap(map);}if (llhbox.checked === false){llnheatmap.setMap();}      

      llsheatmap.setMap(null);   
      var llsheatdata = [];
      for (var i = 0; i < llsheatjs.length; i++){
          if (llsheatjs[i].YEAR.toString() === document.getElementById('fishingYear').value){
            llsheatdata.push({location: new google.maps.LatLng(llsheatjs[i].LAT,llsheatjs[i].LON), weight: Number(llsheatjs[i].SETS)});
          }if (document.getElementById('fishingYear').value === ''){
            llsheatdata.push({location: new google.maps.LatLng(llsheatjs[i].LAT,llsheatjs[i].LON), weight: Number(llsheatjs[i].SETS)});           
          }      
      }  
      llsheatmap = new google.maps.visualization.HeatmapLayer({data: llsheatdata, map: map, radius:llsheatmap.get("radius"), gradient:llsheatmap.get("gradient"), opacity:llsheatmap.get("opacity")});    
      if (llhbox.checked === true){llsheatmap.setMap(map);}if (llhbox.checked === false){llsheatmap.setMap();}      
};   
  
// ------------------------------------------------------------------- 
// Checkbox triggers
// -------------------------------------------------------------------  
spttbox.addEventListener("change", (event) => {
    if (spttbox.checked === true){sptt_poly.setMap(map);}if (spttbox.checked === false){sptt_poly.setMap();}});

llbox.addEventListener("change", (event) => {
    if (llbox.checked === true){lln_poly.setMap(map);lls_poly.setMap(map);}if (llbox.checked === false){lln_poly.setMap();lls_poly.setMap();}});

albnpbox.addEventListener("change", (event) => {
    if (albnpbox.checked === true){albn_poly.setMap(map);}if (albnpbox.checked === false){albn_poly.setMap();}});

albspbox.addEventListener("change", (event) => {
    if (albspbox.checked === true){albs_poly.setMap(map);}if (albspbox.checked === false){albs_poly.setMap();}});

sptthbox.addEventListener("change", (event) => {
    if (sptthbox.checked === true){spheatmap.setMap(map);}if (sptthbox.checked === false){spheatmap.setMap();}});

albnphbox.addEventListener("change", (event) => {
    if (albnphbox.checked === true){albnheatmap.setMap(map);}if (albnphbox.checked === false){albnheatmap.setMap();}});

albsphbox.addEventListener("change", (event) => {
    if (albsphbox.checked === true){albsheatmap.setMap(map);}if (albsphbox.checked === false){albsheatmap.setMap();}});

llhbox.addEventListener("change", (event) => {
    if (llhbox.checked === true){llsheatmap.setMap(map);llnheatmap.setMap(map);}if (llhbox.checked === false){llsheatmap.setMap();llnheatmap.setMap();}});

iscbox.addEventListener("change", (event) => {
    if (iscbox.checked === true){isc_poly.setMap(map);}if (iscbox.checked === false){isc_poly.setMap();}});

iattcbox.addEventListener("change", (event) => {
    if (iattcbox.checked === true){iattc_poly.setMap(map);}if (iattcbox.checked === false){iattc_poly.setMap();}});

wcpfcbox.addEventListener("change", (event) => {
    if (wcpfcbox.checked === true){wcpfc_poly.setMap(map);}if (wcpfcbox.checked === false){wcpfc_poly.setMap();}});

spttpbox.addEventListener("change", (event) => {
    if (spttpbox.checked === true){spttlayer.setMap(map);}if (spttpbox.checked === false){spttlayer.setMap();}});

albnppbox.addEventListener("change", (event) => {
    if (albnppbox.checked === true){albnlayer.setMap(map);}if (albnppbox.checked === false){albnlayer.setMap();}});

albsppbox.addEventListener("change", (event) => {
    if (albsppbox.checked === true){albslayer.setMap(map);}if (albsppbox.checked === false){albslayer.setMap();}});

llpbox.addEventListener("change", (event) => {
    if (llpbox.checked === true){llnlayer.setMap(map);}if (llpbox.checked === false){llnlayer.setMap();}
    if (llpbox.checked === true){llslayer.setMap(map);}if (llpbox.checked === false){llslayer.setMap();}});
   
// ------------------------------------------------------------------- 
// Gradient selector
// -------------------------------------------------------------------  

document.getElementById("change-gradient").addEventListener("click", changeGradient);

function changeGradient() {
  /*const gradient = [
     'rgba(158, 1, 66, 0)',
      'rgba(213, 62, 79, 1)',
      'rgba(244, 109, 67, 1)',
      'rgba(253, 174, 97, 1)',
      'rgba(254, 224, 139, 1)',
      'rgba(255, 255, 191, 1)',
      'rgba(230, 245, 152, 1)',
      'rgba(171, 221, 164, 1)',
      'rgba(102, 194, 165, 1)',
      'rgba(50, 136, 189, 1)',
      'rgba(94, 79, 162, 1)' ];*/
  
  const gradient = [
        'rgba(94, 79, 162, 0)',
        'rgba(50, 136, 189, 1)',
        'rgba(102, 194, 165, 1)',
        'rgba(171, 221, 164, 1)',
        'rgba(230, 245, 152, 1)',
        'rgba(255, 255, 191, 1)',
        'rgba(254, 224, 139, 1)',
        'rgba(253, 174, 97, 1)',
        'rgba(244, 109, 67, 1)',
        'rgba(213, 62, 79, 1)',
        'rgba(158, 1, 66, 1)'];

  spheatmap.set("gradient", spheatmap.get("gradient") ? null : gradient);
  albnheatmap.set("gradient", albnheatmap.get("gradient") ? null : gradient);
  albsheatmap.set("gradient", albsheatmap.get("gradient") ? null : gradient);
  llnheatmap.set("gradient", llnheatmap.get("gradient") ? null : gradient);
  llsheatmap.set("gradient", llsheatmap.get("gradient") ? null : gradient);
}


// ------------------------------------------------------------------- 
// Slider behavior
// -------------------------------------------------------------------  

var opslider = document.getElementById("opRange");
var opexslider = document.getElementById("opexRange");
var rdslider = document.getElementById("rdRange");
var colorpicker = document.getElementById("ptcolor");

spheatmap.set("opacity", 0.5);
albnheatmap.set("opacity", 0.5);
albsheatmap.set("opacity", 0.5);
llnheatmap.set("opacity", 0.5);
llsheatmap.set("opacity", 0.5);
opslider.value = 50;
rdslider.value = 15;

// ------------------------------------------------------------------- 
// Zoom change scale function
// -------------------------------------------------------------------  

google.maps.event.addListener(map, 'zoom_changed', function() {
   
   var zoomLevel = map.getZoom();
   if (zoomLevel === 2){     
    rdslider.min = 2;
    rdslider.max = 20;
    spheatmap.set("radius", 15);
    albnheatmap.set("radius", 15);
    albsheatmap.set("radius", 15);
    llnheatmap.set("radius", 15);
    llsheatmap.set("radius", 15);
    rdslider.value = spheatmap.get("radius");   
   }
    if (zoomLevel === 3){       
    rdslider.min = 5;
    rdslider.max = 35;
    spheatmap.set("radius", 25);
    albnheatmap.set("radius", 25);
    albsheatmap.set("radius", 25);
    llnheatmap.set("radius", 25);
    llsheatmap.set("radius", 25);
    rdslider.value = spheatmap.get("radius"); 
   }
   if (zoomLevel === 4){    
    rdslider.min = 10;
    rdslider.max = 70;
    spheatmap.set("radius", 45);
    albnheatmap.set("radius", 45);
    albsheatmap.set("radius", 45);
    llnheatmap.set("radius", 45);
    llsheatmap.set("radius", 45);
    rdslider.value = spheatmap.get("radius");    
   }
   if (zoomLevel === 5){     
    rdslider.min = 15;
    rdslider.max = 120;
    spheatmap.set("radius", 65);
    albnheatmap.set("radius", 65);
    albsheatmap.set("radius", 65);
    llnheatmap.set("radius", 65);
    llsheatmap.set("radius", 65);
    rdslider.value = spheatmap.get("radius");   
   }
     if (zoomLevel === 6){      
    rdslider.min = 50;
    rdslider.max = 200;
    spheatmap.set("radius", 100);
    albnheatmap.set("radius", 100);
    albsheatmap.set("radius", 100);
    llnheatmap.set("radius", 100);
    llsheatmap.set("radius", 100);
    rdslider.value = spheatmap.get("radius");  
   }  
   console.log("zoom:",zoomLevel,"min:",rdslider.min,"max:",rdslider.max);   
   console.log("radius:",spheatmap.get("radius"));
  });

// ------------------------------------------------------------------- 
// Heatmap opacity control
// -------------------------------------------------------------------  

opslider.oninput = function() {
  spheatmap.set("opacity", this.value/100);
  albnheatmap.set("opacity", this.value/100);
  albsheatmap.set("opacity", this.value/100);
  llnheatmap.set("opacity", this.value/100);
  llsheatmap.set("opacity", this.value/100);  
};

// ------------------------------------------------------------------- 
// Shapefile opacity control
// -------------------------------------------------------------------  

opexslider.oninput = function() {
  sptt_poly.setStyle({fillColor: 'darkorange', strokeWeight: 1, visible: true, strokeColor: 'darkorange',fillOpacity: this.value/100});
  albn_poly.setStyle({fillColor: 'yellow', strokeWeight: 1, visible: true, strokeColor: 'yellow',fillOpacity: this.value/100});
  albs_poly.setStyle({fillColor: 'red', strokeWeight: 1, visible: true, strokeColor: 'red' ,fillOpacity: this.value/100});
  lln_poly.setStyle({fillColor: 'blue',  strokeWeight: 1, visible: true, strokeColor: 'blue',fillOpacity: this.value/100});
  lls_poly.setStyle({fillColor: 'blue',  strokeWeight: 1, visible: true, strokeColor: 'blue',fillOpacity: this.value/100});
};

rdslider.oninput = function() {
  spheatmap.set("radius",  this.value);
  albnheatmap.set("radius", this.value);
  albsheatmap.set("radius", this.value);
  llnheatmap.set("radius", this.value);
  llsheatmap.set("radius", this.value);  
};

colorpicker.oninput = function() {
  var icon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: this.value,
        fillOpacity: 1,
        strokeColor: this.value,
        strokeOpacity: 0.9,
        strokeWeight: 0,
        scale: 2
    };
     spttlayer.setStyle({icon:icon});
  //spttlayer.setMap(map);
   albnlayer.setStyle({icon:icon});
  //albnlayer.setMap(map);
     albslayer.setStyle({icon:icon});
  //albslayer.setMap(map);
    llnlayer.setStyle({icon:icon});
 // llnlayer.setMap(map);
    llslayer.setStyle({icon:icon});
  //llslayer.setMap(map);
};


}
initMap();

