export interface ButtonConfig {
  label: string;
  value?: string;
  action?: 'increment' | 'decrement' | 'clear' | 'equal';
  className?: string;
}

export const buttons: ButtonConfig[] = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '+', value: '+', className: 'operator' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '-', value: '-', className: 'operator' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: 'x', value: '*', className: 'operator' },
  { label: '0', value: '0' },
  { label: ',', value: '.' },
  { label: '=', action: 'equal' },
  { label: '÷', value: '/', className: 'operator' },
  { label: 'С', action: 'clear', className: 'clear' },
];

export default buttons;
