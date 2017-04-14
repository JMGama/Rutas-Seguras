import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;
var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer({
	suppressMarkers: true,
	preserveViewport: true,
	provideRouteAlternatives: true,
	polylineOptions: {
	  strokeColor: "#E8D40B",
	}
});
var map;
var imagePosicion = {
  url: 'http://i64.tinypic.com/23veqde.jpg',
  // This marker is 20 pixels wide by 32 pixels high.
  size: new google.maps.Size(32, 32),
  // The origin for this image is (0, 0).
  origin: new google.maps.Point(0,0),
  // The anchor for this image is the base of the flagpole at (0, 32).
  anchor: new google.maps.Point(16, 32)
};
var shapePosicion = {
  coords: [1, 1, 1, 20, 18, 20, 18, 1],
  type: 'poly'
};
var posicion = new google.maps.Marker({
  icon: imagePosicion,
  shape: shapePosicion
});
var imageDestino = {
  url: 'http://www.dkmonline.com/wp-content/uploads/2016/04/location.png',
  // This marker is 20 pixels wide by 32 pixels high.
  size: new google.maps.Size(32, 32),
  // The origin for this image is (0, 0).
  origin: new google.maps.Point(0,0),
  // The anchor for this image is the base of the flagpole at (0, 32).
  anchor: new google.maps.Point(16, 32)
};
var shapeDestino = {
  coords: [1, 1, 1, 20, 18, 20, 18, 1],
  type: 'poly'
};
var destino = new google.maps.Marker({
  icon: imageDestino,
  shape: shapeDestino
});


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  
  @ViewChild("places")
  public places: ElementRef;

  constructor(public navCtrl: NavController) {
	  
  }

  ionViewDidLoad(){
	  this.loadMap();
  }
   
  loadMap(){
    
	let locationOptions = {timeout: 10000, enableHighAccuracy: true};
 	
    navigator.geolocation.getCurrentPosition((position) => {
	  	let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
		let mapOptions = {
		  center: latLng,
		  zoom: 17,
		  mapTypeId: google.maps.MapTypeId.ROADMAP,
		  zoomControl: false,
		  mapTypeControl: false,
		  scaleControl: false,
		  streetViewControl: false,
		  rotateControl: true,
		  fullscreenControl: false,
		  styles: [
				{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
				{elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
				{elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
				{
				  featureType: 'administrative.locality',
				  elementType: 'labels.text.fill',
				  stylers: [{color: '#d59563'}]
				},
				{
				  featureType: 'poi',
				  elementType: 'labels.text.fill',
				  stylers: [{color: '#d59563'}]
				},
				{
				  featureType: 'poi.park',
				  elementType: 'geometry',
				  stylers: [{color: '#263c3f'}]
				},
				{
				  featureType: 'poi.park',
				  elementType: 'labels.text.fill',
				  stylers: [{color: '#6b9a76'}]
				},
				{
				  featureType: 'road',
				  elementType: 'geometry',
				  stylers: [{color: '#38414e'}]
				},
				{
				  featureType: 'road',
				  elementType: 'geometry.stroke',
				  stylers: [{color: '#212a37'}]
				},
				{
				  featureType: 'road',
				  elementType: 'labels.text.fill',
				  stylers: [{color: '#9ca5b3'}]
				},
				{
				  featureType: 'road.highway',
				  elementType: 'geometry',
				  stylers: [{color: '#746855'}]
				},
				{
				  featureType: 'road.highway',
				  elementType: 'geometry.stroke',
				  stylers: [{color: '#1f2835'}]
				},
				{
				  featureType: 'road.highway',
				  elementType: 'labels.text.fill',
				  stylers: [{color: '#f3d19c'}]
				},
				{
				  featureType: 'transit',
				  elementType: 'geometry',
				  stylers: [{color: '#2f3948'}]
				},
				{
				  featureType: 'transit.station',
				  elementType: 'labels.text.fill',
				  stylers: [{color: '#d59563'}]
				},
				{
				  featureType: 'water',
				  elementType: 'geometry',
				  stylers: [{color: '#17263c'}]
				},
				{
				  featureType: 'water',
				  elementType: 'labels.text.fill',
				  stylers: [{color: '#515c6d'}]
				},
				{
				  featureType: 'water',
				  elementType: 'labels.text.stroke',
				  stylers: [{color: '#17263c'}]
				}
			  ]
		}
		
		map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
		
	 	posicion.setPosition(latLng);
		posicion.setMap(map);
		
		//Generate the destiny ubication by clicking for short time the map
		/*var mousedUp = false;
		google.maps.event.addListener(map, 'mousedown', function(event){ 
		  mousedUp = false;
		  setTimeout(function(){
		    if(mousedUp === false){
			  destino.setPosition(event.latLng);   
			  destino.setMap(map);
			}
		  }, 10);
		});
		google.maps.event.addListener(map, 'mouseup', function(event){ 
		  mousedUp = true;
		});*/
		
		google.maps.event.addListener(map, 'click', function(event) {
		  let latLngOrigen = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
		  let latLngDestino = event.latLng
		 
          directionsService.route({
            origin: latLngOrigen,
            destination: latLngDestino,
            travelMode: 'WALKING',
          }, function(response, status) {
            if (status === 'OK') {
			  destino.setPosition(latLngDestino);
	          destino.setMap(map);
			  directionsDisplay.setMap(map);
              directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
         });
		
		google.maps.event.addListener(destino, 'click', function(envent) {
			destino.setMap(null);
			directionsDisplay.setMap(null);
		})
	
	},
	(error) => {
      console.log(error);
    }, locationOptions
	);
	  
  }
   
   //Allows to load directions by your current position and the destiny location.
   /*calculateAndDisplayRoute() {
	   let locationOptions = {timeout: 10000, enableHighAccuracy: true};
	   
 	   navigator.geolocation.getCurrentPosition((position) => {
		   
	     let latLngOrigen = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
		 let latLngDestino = destino.getLatLng();
		 
         directionsService.route({
           origin: latLngOrigen,
           destination: latLngDestino,
           travelMode: 'WALKING',
         }, function(response, status) {
           if (status === 'OK') {
			 new google.maps.Marker({
		      map: map,
		      animation: google.maps.Animation.DROP,
	          position: latLngDestino
		    });
             directionsDisplay.setDirections(response);
           } else {
             window.alert('Directions request failed due to ' + status);
           }
         });
	   },
     (error) => {
      console.log(error);
    }, locationOptions
	);
   }*/
  
   //Allows to reload an center de map in your current position.
   locate(){
	let locationOptions = {timeout: 10000, enableHighAccuracy: true};
 	
    navigator.geolocation.getCurrentPosition((position) => {
	  	let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
		
		map.setCenter(latLng);
		map.setZoom(17);
		

		posicion.setPosition(latLng);
	},
	(error) => {
      console.log(error);
    }, locationOptions
	);
  }
   
}
