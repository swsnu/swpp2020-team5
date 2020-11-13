import React from 'react';
import { shallow, mount } from 'enzyme';
import SignUp from './SignUp';

jest.mock('./CreateID/CreateID', () => {
  return jest.fn(props => {
    return (
      <div className='spyCreateID'>
        <button onClick={() => props.onChangeStageHandler({
          username: 'SUG_NAME',
          email: 'SUG_EMAIL',
          password: 'SUG_PASSWORD',
        })}></button>
      </div>
    )
  })
})

jest.mock('./CreatePreferenceVector/CreatePreferenceVector', () => {
  return jest.fn(props => {
    return (
      <div className='spyCreatePreferenceVector'>
        <button onClick={() => props.onChangeStageHandler({})}></button>      
      </div>
    ) 
  })
})

describe('<SignUp />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should render SignUp', () => {
    const component = shallow(<SignUp />);
  })

  it('should render CreateID', () => {
    const component = mount(<SignUp />);
    expect(component.find('.spyCreateID').length).toBe(1);
    component.find('.spyCreateID').find('button').simulate('click');
    expect(component.state().signUpMode).toBe('CreatePreferenceVector');
    expect(component.state().username).toBe('SUG_NAME');
    expect(component.state().email).toBe('SUG_EMAIL');
    expect(component.state().password).toBe('SUG_PASSWORD');

    expect(() => {component.setState({signUpMode: 'invalidMode'})}).toThrow(Error)
    expect(() => {component.find('.spyCreatePreferenceVector').find('button').simulate('click')}).toThrow(Error)
  })
  
})
