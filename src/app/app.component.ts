import { isNgContainer } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api-google-maps';
  map: any;
  markers: any[] = [];
  ngOnInit() {
   this.initMap(); 
  }

  initMap(): void {
    const mapProp = {
      center: new google.maps.LatLng(-17.779063638956018, -63.178612414562885),
      zoom: 12,
      mapTypeId: 'roadmap',
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
      draggableCursor: 'crosshair' //opción para cambiar el cursor al hacer click en el mapa
    };
    
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapProp);

    //activar la librería "drawing"
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.MARKER, google.maps.drawing.OverlayType.CIRCLE,google.maps.drawing.OverlayType.POLYGON] //opciones de dibujo disponibles
      }
    });
    drawingManager.setMap(this.map);
    
    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event: any) => {
      if (event.type === google.maps.drawing.OverlayType.MARKER) {
        const marker = event.overlay;
        //agregar el marcador al mapa icon
        marker.setIcon({
          url: 'assets/images/casa.png',
          scaledSize: new google.maps.Size(25, 25)
        });        
        this.markers.push({lat:marker.getPosition().lat() , lng:marker.getPosition().lng()}); // agregar el marcador al array
        
      }
      if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
        const circle = event.overlay;
        circle.setOptions({
          fillColor: '#ff0000',
          fillOpacity: 0.2,
          strokeColor: '#ff0000',
          strokeWeight: 1,
          
        });
        console.log(event)
      }
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        const polygon = event.overlay;
        polygon.setOptions({
          fillColor: '#ff0000',
          fillOpacity: 0.2,
          strokeColor: '#ff0000',
          strokeWeight: 1,
          
        });
        console.log(event)
      }
    });
  }
}



  /* title = 'api-google-maps';
  drawing!: google.maps.drawing.DrawingManager;

  apiKey = 'AIzaSyDDrMRauEapx0Hhp_IuRM9vkKQrLJlS6Zw';
  center: google.maps.LatLngLiteral = {lat: -16, lng: -64};
  zoom = 4;
  iconOptions = {
    url: 'assets/images/casa.png',
    scaledSize: new google.maps.Size(25, 25)
  }
  options: google.maps.MapOptions = { };
  markerOptions: google.maps.MarkerOptions = {draggable: true, icon: this.iconOptions };
  markerPositions: google.maps.LatLngLiteral[] = [];

  polygonOptions: google.maps.PolygonOptions = {
    
  };
  polygonPositions: google.maps.LatLngLiteral[][] = [
    [{lat: -16.5, lng: -68.1}, {lat: -16.5, lng: -63.1}, {lat: -13.5, lng: -63.1}, {lat: -13.5, lng: -68.1}],
    [{lat: -17, lng: -65}, {lat: -17, lng: -55}, {lat: -25, lng: -55}, {lat: -25, lng: -65}],

  ]; 
  constructor() {
    this.drawing = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON, google.maps.drawing.OverlayType.MARKER]
      },
      polygonOptions: {
        editable: true
      }
    });
  }
  

   addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng!.toJSON());  
  }

  addPolygon(event:any) {
    event.stop();
  }  */
  