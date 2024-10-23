import { Component, ElementRef, ViewChild } from '@angular/core';

import BpmnJS from 'bpmn-js/lib/Modeler';
import DmnJS from "dmn-js/dist/dmn-modeler.development"
// import diagramXML from '../../../assets/diagram.bpmn';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule, CamundaPlatformPropertiesProviderModule, ZeebePropertiesProviderModule } from 'bpmn-js-properties-panel';
import {
  DmnPropertiesPanelModule,
  DmnPropertiesProviderModule,
  CamundaPropertiesProviderModule
} from 'dmn-js-properties-panel';
import type Canvas from 'diagram-js/lib/core/Canvas';
import CamundaBpmnModdle from 'camunda-bpmn-moddle/resources/camunda.json'
import ZeebeBpmnModdle from 'zeebe-bpmn-moddle/resources/zeebe.json'
import camundaModdleDescriptor from 'camunda-dmn-moddle/resources/camunda.json';
import { ExamplePropertiesProvider } from '../class/example';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { token } from "../../../environment"

// import "../../../../node_modules/bpmn-js/dist/assets/bpmn-font"
// import type { ImportDoneEvent, ImportXMLResult } from 'bpmn-js';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './editor.component.html',
  styleUrls: [
    "./editor.component.scss",
    // "../../../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css"
  ]
})
export class EditorComponent {

  private bpmnJS: BpmnJS = new BpmnJS();
  private dmnJS: DmnJS = new DmnJS();
  @ViewChild("dropdown") dropdown: ElementRef = new ElementRef("");

  users = ["John", "Mary"]

  constructor(private http: HttpClient){

  }

  ngOnInit(){
    // #bio-properties-panel-assignee
    // var xml; // my DMN 1.3 xml
    // this.dmnJS = new DmnJS({
    //   container: '#editor',
    //   propertiesPanel: {
    //     parent: '#panel'
    //   },
    //   additionalModules: [
    //     DmnPropertiesPanelModule,
    //     DmnPropertiesProviderModule,
    //     CamundaPropertiesProviderModule
    //   ],
    //   moddleExtensions: {
    //     camunda: camundaModdleDescriptor
    //   }
    // });
    // fetch("../../../assets/demo.dmn").then((res:any) => {
    //   return res.text()
    // }).then((con:any) => {
    //   // console.log(con)
    //   this.dmnJS.importXML(con)
    // })


    this.bpmnJS = new BpmnJS({
      container: "#editor",
      propertiesPanel: {
        parent: '#panel'
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        // CamundaPlatformPropertiesProviderModule,
        ZeebePropertiesProviderModule
      ],
      keyboard: {
        bindTo: window
      },
      moddleExtensions: {
        // camunda: CamundaBpmnModdle,
        zeebe: ZeebeBpmnModdle
      }
    });

    const propertiesPanel = this.bpmnJS.get('propertiesPanel');
    new ExamplePropertiesProvider(propertiesPanel)

    fetch("../../../assets/leadgen.bpmn").then((res:any) => {
      return res.text()
    }).then((con:any) => {
      // console.log(con)
      this.bpmnJS.importXML(con)
    })


  }

  download(){
    this.bpmnJS.saveXML().then((res:any) =>{
      console.log(res.xml)
      let a = document.createElement('a');
      document.body.appendChild(a);
      let blob = new Blob([res.xml])
      a.setAttribute('style', 'display: none');
      a.href = window.URL.createObjectURL(blob);
      a.download = `sample.bpmn`;
      a.click();
      window.URL.revokeObjectURL(a.href);
      a.remove();
    })
  }

  newDiagram(){
    fetch("../../../assets/leadgen.bpmn").then((res:any) => {
      return res.text()
    }).then((con:any) => {
      // console.log(con)
      this.bpmnJS.importXML(con)
    })
  }

  onClick(event){
    // console.log(event)
    // console.log(event.srcElement.id)

    if (event.srcElement.id == "bio-properties-panel-assignee"){
      // document.getElementById("bio-properties-panel-assignee")
      // console.log(event.srcElement.getBoundingClientRect())
      let rect = event.srcElement.getBoundingClientRect()


      // console.log(this.dropdown)
      this.dropdown.nativeElement.style.display = "block"
      this.dropdown.nativeElement.style.position = "absolute";
      this.dropdown.nativeElement.style.left = rect.left+"px";
      this.dropdown.nativeElement.style.top = rect.bottom+'px';
      this.dropdown.nativeElement.style.width = rect.width+"px"
    } else {
      this.dropdown.nativeElement.style.display = "none"
    }
  }

  selectUser(user){
    // console.log(user)
    this.dropdown.nativeElement.style.display = "none"

    let element:any = document.getElementById("bio-properties-panel-assignee")
    element.value = user
    element.dispatchEvent(new Event("change"))
    // element.onchange()
  }

  showFlow(){
    const headers = new HttpHeaders({"Authorization": `Bearer ${token}`})
    this.http.get("http://localhost:8080/process/showFlow", {headers})
    .subscribe({next:(sequenceFlows:any) => {

      sequenceFlows.forEach((sequenceFlow) => {
        const elementRegistry:any = this.bpmnJS.get("elementRegistry");
        const graphicsFactory:any = this.bpmnJS.get("graphicsFactory");
        const element = elementRegistry?.get(sequenceFlow);
        if (element?.di !== undefined) {
          element.di.set("stroke", "#4d90ff");

          const gfx = elementRegistry?.getGraphics(element);
          if (gfx !== undefined) {
            graphicsFactory?.update("connection", element, gfx);
          }
        }
      });
    }})

    this.http.get("http://localhost:8080/process/showIncidents", {headers})
    .subscribe({next:(statistics:any) => {
      const overlays:any = this.bpmnJS.get("overlays");
      statistics.forEach(({ activityId, active }) => {
        if (active > 0) {
          overlays.add(activityId, "flowNodeState", {
            position: {
              bottom: 9,
              right: 0,
            },
            html: `<div class="flow-node-incident">${active}</div>`,
          });
        }
      })
      // console.log(res)
    }})

    // this.http.get("http://localhost:8079/api/v1/onboarding/customers", {headers})
    // .subscribe({next:(res:any) => {
    //   console.log(res)
    // }})
  }

  // callApi() {
  //   //POST API
  //   // Replace with your actual API URL
  //   const apiUrl = 'https://api.example.com/data';

  //   this.http.get(apiUrl).subscribe({
  //     next: (response) => {
  //       console.log('API Response:', response);
  //       // Handle the response here
  //     },
  //     error: (error) => {
  //       console.error('Error:', error);
  //       // Handle the error here
  //     }
  //   });
  // }

  // postData() {
  //   const apiUrl = 'http://localhost:8080//api/v1/deployment-service/start-deployment';  // Replace with your API URL
  //   const body = { key: 'value' };  // The data you want to send

  //   this.http.post(apiUrl, body).subscribe({
  //     next: (response) => {
  //       console.log('POST Response:', response);
  //     },
  //     error: (error) => {
  //       console.error('Error:', error);
  //     }
  //   });
  // }

  postDataDeploy() {
    const apiUrl = 'http://localhost:8080/api/v1/deployment-service/start-deployment';  // Replace with your correct API URL
    const body = {};  // Empty body since the controller does not expect any specific data

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)  // Convert the empty body object to a JSON string
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok');
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
 }

 postDataProcess() {
  const apiUrl = 'http://localhost:8080/api/v1/deployment-service/start-process';  // Replace with your correct API URL
  const body = {};  // Empty body since the controller does not expect any specific data

  fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)  // Convert the empty body object to a JSON string
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      }
      throw new Error('Network response was not ok');
  })
  .then(data => {
      console.log('Success:', data);
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

}



