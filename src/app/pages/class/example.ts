import * as bpmn from "bpmn-js-properties-panel/dist/index.esm"
import * as panel from "@bpmn-io/properties-panel"


export class ExamplePropertiesProvider {

  static $inject=["propertiesPanel"]
    constructor(propertiesPanel) {
      propertiesPanel.registerProvider(500, this);
      console.log("bpmn: ", bpmn)
      console.log("panel: ", panel)
    }
  
    getGroups(element) {
        // console.log(element)
        
      return (groups) => {
  
        // add, modify or remove groups
        // ...
        console.log(groups)
        try{
          console.log(groups[3].entries[0].component)
          console.log(groups[4].entries[0].component)
        } catch(err){
          console.log(err)
        }
        
        // if (groups[3]?.label == "Forms"){
        //   console.log(groups[3].entries[0].component({updateModdleProperties:1, get:(a)=>a}))
        //   // console.log(groups[3].entries[0].component.getOptions())
        // }
  
        return groups;
      };
    }
  }

  // function FormType(props) {
  //   const {
  //     element
  //   } = props;
  //   const translate = useService('translate');
  //   const bpmnFactory = useService('bpmnFactory');
  //   const businessObject = getBusinessObject(element);
  //   const commandStack = useService('commandStack');
  //   let extensionElements = businessObject.get('extensionElements');
  //   const getValue = () => {
  //     if (isDefined(businessObject.get('camunda:formKey'))) {
  //       return 'formKey';
  //     } else if (isDefined(businessObject.get('camunda:formRef'))) {
  //       return 'formRef';
  //     } else if (getFormData(element)) {
  //       return 'formData';
  //     }
  //     return '';
  //   };
  //   const setValue = value => {
  //     const commands = removePropertiesCommands(element);
  //     if (value === 'formData') {
  //       // (1) ensure extension elements
  //       if (!extensionElements) {
  //         extensionElements = createElement('bpmn:ExtensionElements', {
  //           values: []
  //         }, businessObject, bpmnFactory);
  //         commands.push({
  //           cmd: 'element.updateModdleProperties',
  //           context: {
  //             element,
  //             moddleElement: businessObject,
  //             properties: {
  //               extensionElements
  //             }
  //           }
  //         });
  //       }
  
  //       // (2) create camunda:FormData
  //       const parent = extensionElements;
  //       const formData = createElement('camunda:FormData', {
  //         fields: []
  //       }, parent, bpmnFactory);
  //       commands.push({
  //         cmd: 'element.updateModdleProperties',
  //         context: {
  //           element,
  //           moddleElement: extensionElements,
  //           properties: {
  //             values: [...extensionElements.get('values'), formData]
  //           }
  //         }
  //       });
  //     } else if (value === 'formKey') {
  //       commands.push({
  //         cmd: 'element.updateModdleProperties',
  //         context: {
  //           element,
  //           moddleElement: businessObject,
  //           properties: {
  //             'camunda:formKey': ''
  //           }
  //         }
  //       });
  //     } else if (value === 'formRef') {
  //       commands.push({
  //         cmd: 'element.updateModdleProperties',
  //         context: {
  //           element,
  //           moddleElement: businessObject,
  //           properties: {
  //             'camunda:formRef': ''
  //           }
  //         }
  //       });
  //     }
  //     commandStack.execute('properties-panel.multi-command-executor', commands);
  //   };
  //   const getOptions = () => {
  //     return [{
  //       value: '',
  //       label: translate('<none>')
  //     }, {
  //       value: 'formRef',
  //       label: translate('Camunda Forms')
  //     }, {
  //       value: 'formKey',
  //       label: translate('Embedded or External Task Forms')
  //     }, {
  //       value: 'formData',
  //       label: translate('Generated Task Forms')
  //     }];
  //   };
  //   return SelectEntry({
  //     element,
  //     id: 'formType',
  //     label: translate('Type'),
  //     getValue,
  //     setValue,
  //     getOptions
  //   });
  // }

  // function createElement(type, properties, parent, bpmnFactory) {
  //   const element = bpmnFactory.create(type, properties);
  //   if (parent) {
  //     element.$parent = parent;
  //   }
  //   return element;
  // }