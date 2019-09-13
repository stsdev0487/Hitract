import * as Data from '../Data';
import ProtocolPrototype from './ProtocolPrototype';
import { fieldComponent, fieldDefaultProps, fieldPropTypes, formInputs, formProperty } from '../Controller';

//Handles state changes of nested component belonging to a form controller
//and assigns the computed value to the combined form data as changes occur
export default function FieldProtocol(Interface = ProtocolPrototype){
	return class extends Interface{
		static defaultProps = {...Interface.defaultProps, ...fieldDefaultProps}
		static propTypes = {...Interface.propTypes, ...fieldPropTypes}
		static [fieldComponent]: true
		get form(){ return Data.get(this, `props.${formProperty}`) }
		formInputs = formInputs
	}
}