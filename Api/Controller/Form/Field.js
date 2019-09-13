import Type from 'prop-types';

//Following form events are triggered when:
export const formEvents = {
	//Change of an entry already set in form => ({from:lastEntry, to:newEntry})
	change: 'change',
	//Entry is emitted from an input component - (internally set by form)
	entry: 'entry',
	//All fields are valid & data is submittable form => (from.data)
	submit: 'submit'
}


export const formEventProperty = 'formEvent';
export const formEventValue = formEvents.entry;
export const formFieldProperty = 'formField';
export const formInstance = Symbol('Form instance');
export const formMount = Symbol.for('FormController Component original componentDidMount function');
export const formProperty = 'form';
export const formTimer = Symbol('Form timer');
export const formTimerDuration = 400;
export const formUnmount = Symbol.for('FormController Component original componentWillUnmount function');

export const fieldComponent = Symbol('Form Field Component like TextInput');
export const fieldPropTypes = {[formProperty]: Type.object, [formEventProperty]: Type.string.isRequired, [formFieldProperty]: Type.string, onChange:Type.func};
export const fieldDefaultProps = {[formEventProperty]: formEventValue };

export const fieldsetComponent = Symbol.for('Fieldset Component');
export const fieldsetPropTypes = {[formProperty]: Type.object, [formEventProperty]: Type.string.isRequired};
export const fieldsetDefaultProps = {[formEventProperty]: formEventValue};





